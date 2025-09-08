import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { AuthState, User, Provider, AuthTokens } from '@/types';
import { secureStorage } from '@/services/storage/secureStorage';

interface AuthActions {
  // Authentication actions
  login: (
    user: User,
    provider: Provider | null,
    tokens: AuthTokens
  ) => Promise<void>;
  logout: () => Promise<void>;
  refreshTokens: (tokens: AuthTokens) => Promise<void>;

  // User actions
  updateUser: (user: Partial<User>) => void;
  updateProvider: (provider: Partial<Provider>) => void;

  // State management
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;

  // Initialization
  initializeAuth: () => Promise<void>;
  checkAuthStatus: () => Promise<boolean>;
}

type AuthStore = AuthState & AuthActions;

const initialState: AuthState = {
  user: null,
  provider: null,
  tokens: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        // Authentication actions
        login: async (
          user: User,
          provider: Provider | null,
          tokens: AuthTokens
        ) => {
          try {
            set({ isLoading: true, error: null });

            // Store tokens securely
            await secureStorage.setAccessToken(tokens.accessToken);
            await secureStorage.setRefreshToken(tokens.refreshToken);

            // Store user and provider data
            await secureStorage.setUserData(user);
            if (provider) {
              await secureStorage.setProviderData(provider);
            }

            set({
              user,
              provider,
              tokens,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
          } catch (error) {
            console.error('Login error:', error);
            set({
              isLoading: false,
              error: 'Failed to complete login process',
            });
            throw error;
          }
        },

        logout: async () => {
          try {
            set({ isLoading: true });

            // Clear secure storage
            await secureStorage.clearTokens();
            await secureStorage.removeItem('user_data');
            await secureStorage.removeItem('provider_data');

            set({
              ...initialState,
              isLoading: false,
            });
          } catch (error) {
            console.error('Logout error:', error);
            // Even if clearing storage fails, reset the state
            set({
              ...initialState,
              isLoading: false,
              error: 'Failed to complete logout process',
            });
          }
        },

        refreshTokens: async (tokens: AuthTokens) => {
          try {
            await secureStorage.setAccessToken(tokens.accessToken);
            await secureStorage.setRefreshToken(tokens.refreshToken);

            set({ tokens });
          } catch (error) {
            console.error('Token refresh error:', error);
            throw error;
          }
        },

        // User actions
        updateUser: (userUpdate: Partial<User>) => {
          const { user } = get();
          if (user) {
            const updatedUser = { ...user, ...userUpdate };
            set({ user: updatedUser });

            // Update secure storage
            secureStorage.setUserData(updatedUser).catch(console.error);
          }
        },

        updateProvider: (providerUpdate: Partial<Provider>) => {
          const { provider } = get();
          if (provider) {
            const updatedProvider = { ...provider, ...providerUpdate };
            set({ provider: updatedProvider });

            // Update secure storage
            secureStorage.setProviderData(updatedProvider).catch(console.error);
          }
        },

        // State management
        setLoading: (loading: boolean) => {
          set({ isLoading: loading });
        },

        setError: (error: string | null) => {
          set({ error });
        },

        clearError: () => {
          set({ error: null });
        },

        // Initialization
        initializeAuth: async () => {
          try {
            set({ isLoading: true });

            // Check for stored authentication data
            const [accessToken, refreshToken, userData, providerData] =
              await Promise.all([
                secureStorage.getAccessToken(),
                secureStorage.getRefreshToken(),
                secureStorage.getUserData<User>(),
                secureStorage.getProviderData<Provider>(),
              ]);

            if (accessToken && refreshToken && userData) {
              const tokens: AuthTokens = {
                accessToken,
                refreshToken,
                expiresIn: 0, // Will be updated on next API call
              };

              set({
                user: userData,
                provider: providerData,
                tokens,
                isAuthenticated: true,
                isLoading: false,
                error: null,
              });
            } else {
              set({
                ...initialState,
                isLoading: false,
              });
            }
          } catch (error) {
            console.error('Auth initialization error:', error);
            set({
              ...initialState,
              isLoading: false,
              error: 'Failed to initialize authentication',
            });
          }
        },

        checkAuthStatus: async (): Promise<boolean> => {
          const { tokens } = get();

          if (!tokens?.accessToken) {
            return false;
          }

          // TODO: Implement token validation with API
          // For now, just check if token exists
          return true;
        },
      }),
      {
        name: 'auth-store',
        // Only persist non-sensitive data
        partialize: state => ({
          isAuthenticated: state.isAuthenticated,
          // Don't persist sensitive data like tokens, user data
          // These are stored securely via SecureStore
        }),
      }
    ),
    {
      name: 'auth-store',
    }
  )
);

// Selectors for better performance
export const useAuthUser = () => useAuthStore(state => state.user);
export const useAuthProvider = () => useAuthStore(state => state.provider);
export const useAuthTokens = () => useAuthStore(state => state.tokens);
export const useIsAuthenticated = () =>
  useAuthStore(state => state.isAuthenticated);
export const useAuthLoading = () => useAuthStore(state => state.isLoading);
export const useAuthError = () => useAuthStore(state => state.error);
