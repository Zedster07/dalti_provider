# Coding Standards and Best Practices (2025 Edition)

## 📝 TypeScript Standards (2025 Latest)

### Type Safety Requirements (TypeScript 5.x)
```typescript
// ✅ Always use explicit types with 2025 TypeScript features
interface UserProfile {
  id: number;
  email: string;
  businessName: string;
  createdAt: Date;
}

// ✅ Use strict TypeScript 5.x configuration (2025)
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true,
    "noUncheckedIndexedAccess": true
  }
}

// ❌ Avoid any types
const userData: any = response.data; // Bad

// ✅ Use proper typing
const userData: UserProfile = response.data; // Good
```

### Naming Conventions
```typescript
// Components: PascalCase
export const LoginForm: React.FC<LoginFormProps> = () => {};

// Hooks: camelCase with 'use' prefix
export const useAuth = () => {};

// Constants: SCREAMING_SNAKE_CASE
export const API_BASE_URL = 'https://api.example.com';

// Variables/Functions: camelCase
const handleSubmit = () => {};
const isAuthenticated = true;

// Types/Interfaces: PascalCase
interface ApiResponse<T> {
  data: T;
  success: boolean;
}

// Enums: PascalCase
enum UserRole {
  ADMIN = 'admin',
  PROVIDER = 'provider',
  CUSTOMER = 'customer',
}
```

## 🏗️ Component Standards

### Component Structure
```typescript
// Component file structure
interface ComponentProps {
  // Props interface first
  title: string;
  onPress?: () => void;
  disabled?: boolean;
}

// Component implementation
export const Component: React.FC<ComponentProps> = ({
  title,
  onPress,
  disabled = false,
}) => {
  // Hooks at the top
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  
  // Event handlers
  const handlePress = useCallback(() => {
    if (onPress && !disabled) {
      onPress();
    }
  }, [onPress, disabled]);
  
  // Early returns
  if (!user) {
    return <LoginPrompt />;
  }
  
  // Main render
  return (
    <TouchableOpacity onPress={handlePress} disabled={disabled}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};
```

### Hook Standards
```typescript
// Custom hook structure
export const useApiData = <T>(endpoint: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiClient.get<T>(endpoint);
      setData(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [endpoint]);
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  return { data, loading, error, refetch: fetchData };
};
```

## 🎨 Styling Standards

### Styled Components Pattern
```typescript
import styled from 'styled-components/native';

// Use design tokens
export const Container = styled.View`
  padding: ${({ theme }) => theme.spacing.lg}px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.md}px;
`;

// Conditional styling
export const Button = styled.TouchableOpacity<{ variant: 'primary' | 'secondary' }>`
  padding: ${({ theme }) => theme.spacing.md}px ${({ theme }) => theme.spacing.xl}px;
  background-color: ${({ theme, variant }) => 
    variant === 'primary' ? theme.colors.primary : 'transparent'
  };
  border: ${({ theme, variant }) => 
    variant === 'secondary' ? `1px solid ${theme.colors.primary}` : 'none'
  };
`;
```

### StyleSheet Pattern (Alternative)
```typescript
import { StyleSheet } from 'react-native';
import { theme } from '../constants/theme';

export const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.lg,
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.md,
  },
  button: {
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.sm,
  },
  buttonPrimary: {
    backgroundColor: theme.colors.primary,
  },
  buttonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
});
```

## 🔄 State Management Standards

### Zustand Store Pattern
```typescript
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

interface AuthActions {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState & AuthActions>()(
  devtools(
    (set, get) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,
      
      // Actions
      login: async (credentials) => {
        try {
          set({ loading: true, error: null });
          const user = await authService.login(credentials);
          set({ user, isAuthenticated: true, loading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Login failed',
            loading: false 
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

### React Query Pattern
```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Query hook
export const useLocations = () => {
  return useQuery({
    queryKey: ['locations'],
    queryFn: locationService.getLocations,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Mutation hook
export const useCreateLocation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: locationService.createLocation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['locations'] });
    },
    onError: (error) => {
      console.error('Failed to create location:', error);
    },
  });
};
```

## 🧪 Testing Standards

### Unit Testing
```typescript
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { LoginForm } from '../LoginForm';

describe('LoginForm', () => {
  const mockOnSubmit = jest.fn();
  
  beforeEach(() => {
    mockOnSubmit.mockClear();
  });
  
  it('should render login form correctly', () => {
    const { getByPlaceholderText, getByText } = render(
      <LoginForm onSubmit={mockOnSubmit} />
    );
    
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByText('Login')).toBeTruthy();
  });
  
  it('should call onSubmit with correct data', async () => {
    const { getByPlaceholderText, getByText } = render(
      <LoginForm onSubmit={mockOnSubmit} />
    );
    
    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
    fireEvent.press(getByText('Login'));
    
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });
});
```

### Integration Testing
```typescript
import { renderHook, act } from '@testing-library/react-hooks';
import { useAuth } from '../useAuth';

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

## 📋 Code Quality Standards

### ESLint Configuration (2025 Latest)
```json
{
  "extends": [
    "@react-native-community",
    "@typescript-eslint/recommended",
    "@typescript-eslint/recommended-requiring-type-checking",
    "prettier"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/explicit-function-return-type": "warn",
    "@typescript-eslint/no-floating-promises": "error",
    "@typescript-eslint/await-thenable": "error",
    "react-hooks/exhaustive-deps": "error",
    "react-native/no-inline-styles": "error",
    "prefer-const": "error",
    "no-var": "error"
  }
}
```

### Prettier Configuration
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

### Husky Pre-commit Hooks
```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "pre-push": "npm run test"
    }
  },
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write",
      "git add"
    ]
  }
}
```

## 🚀 Performance Standards

### Optimization Guidelines
```typescript
// ✅ Use React.memo for expensive components
export const ExpensiveComponent = React.memo<Props>(({ data }) => {
  return <ComplexVisualization data={data} />;
});

// ✅ Use useCallback for event handlers
const handlePress = useCallback(() => {
  onPress?.(item.id);
}, [onPress, item.id]);

// ✅ Use useMemo for expensive calculations
const processedData = useMemo(() => {
  return data.map(item => expensiveTransformation(item));
}, [data]);

// ✅ Lazy load screens
const LazyScreen = lazy(() => import('./screens/LazyScreen'));
```

### Bundle Optimization
```typescript
// ✅ Use dynamic imports for large libraries
const loadHeavyLibrary = async () => {
  const { heavyFunction } = await import('./heavyLibrary');
  return heavyFunction;
};

// ✅ Tree shaking friendly imports
import { debounce } from 'lodash/debounce'; // Good
import _ from 'lodash'; // Avoid
```

## 📚 Documentation Standards

### Component Documentation
```typescript
/**
 * Primary button component for user interactions
 * 
 * @example
 * ```tsx
 * <Button
 *   title="Submit"
 *   onPress={handleSubmit}
 *   variant="primary"
 *   disabled={loading}
 * />
 * ```
 */
export interface ButtonProps {
  /** Button text content */
  title: string;
  /** Click handler function */
  onPress: () => void;
  /** Visual style variant */
  variant?: 'primary' | 'secondary' | 'text';
  /** Disabled state */
  disabled?: boolean;
}
```

### API Documentation
```typescript
/**
 * Authentication service for user login/logout
 */
export class AuthService {
  /**
   * Authenticate user with email and password
   * @param credentials - User login credentials
   * @returns Promise resolving to authenticated user
   * @throws {AuthError} When credentials are invalid
   */
  async login(credentials: LoginCredentials): Promise<User> {
    // Implementation
  }
}
```

This comprehensive coding standards document ensures consistent, maintainable, and high-quality code throughout the React Native application development process using **2025's latest best practices and technologies**.
