// Common types used across the application

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T = unknown> {
  success: boolean;
  data: {
    items: T[];
    pagination: {
      page: number;
      pageSize: number;
      total: number;
      totalPages: number;
    };
  };
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

export interface Provider {
  id: number;
  userId: string;
  title: string;
  phone: string;
  providerCategoryId: number;
  category?: ProviderCategory;
  isSetupComplete: boolean;
}

export interface ProviderCategory {
  id: number;
  title: string;
  parentId: number | null;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface AuthState {
  user: User | null;
  provider: Provider | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Navigation types
export interface RootStackParamList {
  '(auth)': undefined;
  '(tabs)': undefined;
  modal: { screen: string; params?: Record<string, unknown> };
}

export interface TabParamList {
  dashboard: undefined;
  appointments: undefined;
  customers: undefined;
  profile: undefined;
}

// Common component props
export interface BaseComponentProps {
  testID?: string;
  accessibilityLabel?: string;
}

// Form types
export interface FormFieldError {
  message: string;
  type: string;
}

export interface FormState<T = Record<string, unknown>> {
  values: T;
  errors: Record<keyof T, FormFieldError | undefined>;
  touched: Record<keyof T, boolean>;
  isSubmitting: boolean;
  isValid: boolean;
}

// API Error types
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  status?: number;
}

// Environment types
export interface AppConfig {
  apiBaseUrl: string;
  apiTimeout: number;
  firebaseConfig: {
    apiKey: string;
    projectId: string;
    messagingSenderId: string;
  };
  environment: 'development' | 'staging' | 'production';
}

// Utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Re-export commonly used React Native types
export type { ViewStyle, TextStyle, ImageStyle } from 'react-native';
