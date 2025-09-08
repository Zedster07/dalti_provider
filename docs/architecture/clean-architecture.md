# Clean Architecture Implementation

## 🏗️ Architecture Overview

The Dalti Provider React Native application follows Clean Architecture principles to ensure
maintainability, testability, and scalability. This architecture separates concerns into distinct
layers with clear dependencies.

## 📐 Architecture Layers

### 1. Presentation Layer

**Location**: `src/features/*/screens/`, `src/components/` **Responsibility**: UI components,
screens, and user interactions

```typescript
// Example: LoginScreen.tsx
import React from 'react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { LoginForm } from '@/features/auth/components/LoginForm';

export const LoginScreen: React.FC = () => {
  const { login, loading, error } = useAuth();

  return (
    <LoginForm
      onSubmit={login}
      loading={loading}
      error={error}
    />
  );
};
```

### 2. Business Logic Layer

**Location**: `src/features/*/hooks/`, `src/stores/` **Responsibility**: Application business rules
and state management

```typescript
// Example: useAuth.ts
import { useAuthStore } from '@/stores/auth/authStore';
import { authService } from '@/services/api/authService';

export const useAuth = () => {
  const { user, setUser, setLoading, setError } = useAuthStore();

  const login = async (credentials: LoginCredentials) => {
    try {
      setLoading(true);
      const response = await authService.login(credentials);
      setUser(response.user);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { login, user, loading: useAuthStore(state => state.loading) };
};
```

### 3. Data Layer

**Location**: `src/services/` **Responsibility**: Data access, API calls, and external service
integration

```typescript
// Example: authService.ts
import { apiClient } from '@/services/api/client';
import { LoginCredentials, AuthResponse } from '@/types/auth.types';

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>('/auth/provider/login', credentials);
    return response.data;
  },

  async logout(): Promise<void> {
    await apiClient.post('/auth/logout');
  },
};
```

## 🔄 Dependency Flow

```
Presentation Layer (UI)
        ↓
Business Logic Layer (Hooks/Stores)
        ↓
Data Layer (Services/API)
```

### Dependency Rules

1. **Inner layers don't know about outer layers**
2. **Dependencies point inward**
3. **Business logic is independent of frameworks**
4. **Data layer abstracts external concerns**

## 🏛️ Feature-Based Architecture

### Feature Structure

```
features/
├── auth/
│   ├── components/         # Feature-specific UI components
│   ├── hooks/             # Business logic hooks
│   ├── screens/           # Screen components
│   ├── services/          # Feature-specific services
│   ├── stores/            # Feature state management
│   ├── types/             # Feature type definitions
│   └── index.ts           # Feature exports
```

### Feature Implementation Example

#### 1. Types Definition

```typescript
// features/auth/types/auth.types.ts
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  id: number;
  email: string;
  businessName: string;
  isVerified: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}
```

#### 2. Service Layer

```typescript
// features/auth/services/authService.ts
import { apiClient } from '@/services/api/client';
import { LoginCredentials, User } from '../types/auth.types';

export interface AuthService {
  login(credentials: LoginCredentials): Promise<User>;
  logout(): Promise<void>;
  refreshToken(): Promise<string>;
}

export const authService: AuthService = {
  async login(credentials) {
    const response = await apiClient.post('/auth/provider/login', credentials);
    return response.data.user;
  },

  async logout() {
    await apiClient.post('/auth/logout');
  },

  async refreshToken() {
    const response = await apiClient.post('/auth/refresh-token');
    return response.data.accessToken;
  },
};
```

#### 3. Store Layer

```typescript
// features/auth/stores/authStore.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { AuthState } from '../types/auth.types';
import { authService } from '../services/authService';

interface AuthActions {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState & AuthActions>()(
  devtools(
    (set, get) => ({
      // State
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,

      // Actions
      login: async credentials => {
        try {
          set({ loading: true, error: null });
          const user = await authService.login(credentials);
          set({ user, isAuthenticated: true, loading: false });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Login failed',
            loading: false,
          });
        }
      },

      logout: () => {
        authService.logout();
        set({ user: null, isAuthenticated: false, error: null });
      },

      clearError: () => set({ error: null }),
    }),
    { name: 'auth-store' }
  )
);
```

#### 4. Hook Layer

```typescript
// features/auth/hooks/useAuth.ts
import { useAuthStore } from '../stores/authStore';
import { LoginCredentials } from '../types/auth.types';

export const useAuth = () => {
  const { user, isAuthenticated, loading, error, login, logout, clearError } = useAuthStore();

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login: (credentials: LoginCredentials) => login(credentials),
    logout,
    clearError,
  };
};
```

#### 5. Component Layer

```typescript
// features/auth/components/LoginForm.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../validation/authValidation';
import { LoginCredentials } from '../types/auth.types';

interface LoginFormProps {
  onSubmit: (credentials: LoginCredentials) => void;
  loading: boolean;
  error: string | null;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  loading,
  error,
}) => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  return (
    <View>
      <TextInput
        control={control}
        name="email"
        label="Email"
        error={errors.email?.message}
      />
      <TextInput
        control={control}
        name="password"
        label="Password"
        secureTextEntry
        error={errors.password?.message}
      />
      {error && <ErrorText>{error}</ErrorText>}
      <Button
        title="Login"
        onPress={handleSubmit(onSubmit)}
        loading={loading}
      />
    </View>
  );
};
```

## 🔌 Dependency Injection

### Service Container

```typescript
// services/container.ts
interface ServiceContainer {
  authService: AuthService;
  locationService: LocationService;
  apiClient: ApiClient;
}

export const container: ServiceContainer = {
  authService: new AuthServiceImpl(),
  locationService: new LocationServiceImpl(),
  apiClient: new ApiClientImpl(),
};

// Usage in hooks
export const useAuth = () => {
  const authService = container.authService;
  // Implementation
};
```

### Interface Segregation

```typescript
// Separate interfaces for different concerns
interface AuthenticationService {
  login(credentials: LoginCredentials): Promise<User>;
  logout(): Promise<void>;
}

interface TokenService {
  getToken(): Promise<string | null>;
  refreshToken(): Promise<string>;
  clearTokens(): Promise<void>;
}

interface UserService {
  getCurrentUser(): Promise<User>;
  updateProfile(data: UpdateProfileData): Promise<User>;
}
```

## 🧪 Testing Architecture

### Unit Testing

```typescript
// __tests__/useAuth.test.ts
import { renderHook, act } from '@testing-library/react-hooks';
import { useAuth } from '../hooks/useAuth';

// Mock the service layer
jest.mock('../services/authService');

describe('useAuth', () => {
  it('should login successfully', async () => {
    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.login({
        email: 'test@example.com',
        password: 'password123',
      });
    });

    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.user).toBeDefined();
  });
});
```

### Integration Testing

```typescript
// __tests__/authFlow.integration.test.ts
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { LoginScreen } from '../screens/LoginScreen';

describe('Auth Flow Integration', () => {
  it('should complete login flow', async () => {
    const { getByPlaceholderText, getByText } = render(<LoginScreen />);

    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
    fireEvent.press(getByText('Login'));

    await waitFor(() => {
      expect(getByText('Dashboard')).toBeTruthy();
    });
  });
});
```

## 📋 Architecture Benefits

### 1. Testability

- **Unit Testing**: Each layer can be tested in isolation
- **Mocking**: Easy to mock dependencies
- **Integration Testing**: Clear boundaries for integration tests

### 2. Maintainability

- **Separation of Concerns**: Each layer has a single responsibility
- **Loose Coupling**: Changes in one layer don't affect others
- **Clear Dependencies**: Easy to understand data flow

### 3. Scalability

- **Feature-Based**: Easy to add new features
- **Team Collaboration**: Multiple developers can work on different layers
- **Code Reusability**: Business logic can be reused across components

### 4. Flexibility

- **Framework Independence**: Business logic is not tied to React Native
- **Easy Migration**: Can switch UI frameworks without changing business logic
- **Service Swapping**: Easy to replace external services

## 🔄 Migration Strategy

### From Flutter (Riverpod) to React Native

1. **Identify Business Logic**: Extract business rules from Flutter widgets
2. **Create Service Interfaces**: Define contracts for data access
3. **Implement Stores**: Convert Riverpod providers to Zustand stores
4. **Build Hooks**: Create custom hooks for business logic
5. **Develop Components**: Build React Native UI components

This clean architecture ensures the React Native application is maintainable, testable, and scalable
while providing clear separation of concerns and dependency management.
