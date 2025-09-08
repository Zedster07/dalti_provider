# React Native Project Structure (2025 Best Practices)

## 📁 Recommended Folder Structure

Based on **2025 React Native best practices** and clean architecture principles, here's the
recommended project structure for the Dalti Provider React Native application using the latest 2025
technologies and patterns:

```
dalti-provider-rn/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── common/          # Generic components
│   │   ├── forms/           # Form-specific components
│   │   └── navigation/      # Navigation components
│   ├── features/            # Feature-based modules
│   │   ├── auth/           # Authentication feature
│   │   ├── dashboard/      # Dashboard feature
│   │   ├── appointments/   # Appointment management
│   │   ├── locations/      # Location management
│   │   ├── services/       # Service management
│   │   └── shared/         # Shared feature components
│   ├── hooks/              # Custom React hooks
│   ├── navigation/         # Navigation configuration
│   ├── services/           # API and external services
│   ├── stores/             # State management (Zustand)
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Utility functions
│   ├── constants/          # App constants
│   ├── assets/             # Static assets
│   └── App.tsx             # Root component
├── android/                # Android-specific code
├── ios/                    # iOS-specific code
├── __tests__/              # Test files
├── docs/                   # Documentation
└── package.json            # Dependencies and scripts
```

## 🏗️ Detailed Structure

### `/src/components/` - Reusable Components

```
components/
├── common/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.styles.ts
│   │   ├── Button.types.ts
│   │   └── index.ts
│   ├── Input/
│   │   ├── TextInput.tsx
│   │   ├── Dropdown.tsx
│   │   ├── Input.styles.ts
│   │   └── index.ts
│   ├── Card/
│   ├── Modal/
│   ├── Loading/
│   └── index.ts
├── forms/
│   ├── FormField/
│   ├── FormWrapper/
│   └── index.ts
└── navigation/
    ├── TabBar/
    ├── Header/
    └── index.ts
```

### `/src/features/` - Feature Modules

Each feature follows a consistent structure:

```
features/
├── auth/
│   ├── components/         # Feature-specific components
│   │   ├── LoginForm/
│   │   ├── RegisterForm/
│   │   └── index.ts
│   ├── hooks/             # Feature-specific hooks
│   │   ├── useAuth.ts
│   │   ├── useLogin.ts
│   │   └── index.ts
│   ├── screens/           # Screen components
│   │   ├── LoginScreen.tsx
│   │   ├── RegisterScreen.tsx
│   │   ├── ForgotPasswordScreen.tsx
│   │   └── index.ts
│   ├── services/          # Feature API services
│   │   ├── authApi.ts
│   │   └── index.ts
│   ├── stores/            # Feature state management
│   │   ├── authStore.ts
│   │   └── index.ts
│   ├── types/             # Feature type definitions
│   │   ├── auth.types.ts
│   │   └── index.ts
│   └── index.ts
├── dashboard/
├── appointments/
├── locations/
├── services/
├── customers/
├── messages/
├── notifications/
├── profile/
├── settings/
└── shared/                # Shared across features
    ├── components/
    ├── hooks/
    ├── types/
    └── utils/
```

### `/src/services/` - External Services

```
services/
├── api/
│   ├── client.ts          # HTTP client configuration
│   ├── interceptors.ts    # Request/response interceptors
│   └── endpoints.ts       # API endpoint constants
├── storage/
│   ├── secureStorage.ts   # Secure storage service
│   ├── asyncStorage.ts    # Async storage service
│   └── index.ts
├── firebase/
│   ├── config.ts          # Firebase configuration
│   ├── messaging.ts       # FCM service
│   ├── analytics.ts       # Analytics service
│   └── index.ts
├── websocket/
│   ├── socketService.ts   # WebSocket service
│   └── index.ts
└── index.ts
```

### `/src/stores/` - State Management

```
stores/
├── auth/
│   ├── authStore.ts       # Authentication state
│   └── index.ts
├── app/
│   ├── appStore.ts        # Global app state
│   ├── themeStore.ts      # Theme state
│   └── index.ts
├── business/
│   ├── locationStore.ts   # Location state
│   ├── serviceStore.ts    # Service state
│   └── index.ts
└── index.ts               # Store exports
```

### `/src/navigation/` - Navigation Configuration

```
navigation/
├── types.ts               # Navigation type definitions
├── AppNavigator.tsx       # Root navigator
├── AuthNavigator.tsx      # Authentication flow
├── MainNavigator.tsx      # Main app navigation
├── TabNavigator.tsx       # Bottom tab navigation
└── index.ts
```

### `/src/hooks/` - Custom Hooks

```
hooks/
├── useApi.ts              # API request hook
├── useAuth.ts             # Authentication hook
├── useTheme.ts            # Theme hook
├── useLocalization.ts     # i18n hook
├── usePermissions.ts      # Device permissions
├── useWebSocket.ts        # WebSocket hook
└── index.ts
```

### `/src/types/` - TypeScript Definitions

```
types/
├── api.types.ts           # API response types
├── navigation.types.ts    # Navigation types
├── common.types.ts        # Common types
├── business.types.ts      # Business entity types
├── user.types.ts          # User types
└── index.ts
```

### `/src/utils/` - Utility Functions

```
utils/
├── validation/
│   ├── schemas.ts         # Validation schemas
│   └── validators.ts      # Validation functions
├── formatting/
│   ├── date.ts           # Date formatting
│   ├── currency.ts       # Currency formatting
│   └── phone.ts          # Phone formatting
├── helpers/
│   ├── storage.ts        # Storage helpers
│   ├── permissions.ts    # Permission helpers
│   └── device.ts         # Device info helpers
└── index.ts
```

### `/src/constants/` - Application Constants

```
constants/
├── api.ts                 # API constants
├── colors.ts              # Color constants
├── dimensions.ts          # Screen dimensions
├── fonts.ts               # Font constants
├── routes.ts              # Route names
└── index.ts
```

## 🎯 Architecture Principles

### 1. Feature-Based Organization

- Each feature is self-contained
- Clear separation of concerns
- Easy to scale and maintain
- Facilitates team collaboration

### 2. Clean Architecture Layers

```
Presentation Layer (Screens/Components)
    ↓
Business Logic Layer (Hooks/Stores)
    ↓
Data Layer (Services/API)
```

### 3. Dependency Flow

- Higher-level modules don't depend on lower-level modules
- Both depend on abstractions
- Abstractions don't depend on details

### 4. File Naming Conventions

- **Components**: PascalCase (e.g., `LoginForm.tsx`)
- **Hooks**: camelCase with "use" prefix (e.g., `useAuth.ts`)
- **Services**: camelCase (e.g., `authService.ts`)
- **Types**: camelCase with ".types" suffix (e.g., `auth.types.ts`)
- **Constants**: camelCase (e.g., `apiConstants.ts`)

### 5. Import/Export Patterns

```typescript
// Feature index.ts - barrel exports
export { LoginScreen } from './screens/LoginScreen';
export { useAuth } from './hooks/useAuth';
export { authStore } from './stores/authStore';
export type { LoginRequest, AuthUser } from './types/auth.types';

// Component index.ts
export { default } from './Button';
export type { ButtonProps } from './Button.types';
```

## 📱 Component Structure Example

### Button Component Structure

```
Button/
├── Button.tsx             # Main component
├── Button.styles.ts       # Styled components
├── Button.types.ts        # TypeScript interfaces
├── Button.test.tsx        # Unit tests
└── index.ts               # Barrel export
```

### Button Implementation

```typescript
// Button.types.ts
export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'text';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
}

// Button.tsx
import React from 'react';
import { ButtonProps } from './Button.types';
import { StyledButton, ButtonText } from './Button.styles';

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      disabled={disabled}
      onPress={onPress}
    >
      <ButtonText variant={variant} size={size}>
        {loading ? 'Loading...' : title}
      </ButtonText>
    </StyledButton>
  );
};

// index.ts
export { Button } from './Button';
export type { ButtonProps } from './Button.types';
```

## 🔧 Configuration Files

### Package.json Scripts (2025 Optimized)

```json
{
  "scripts": {
    "start": "react-native start",
    "android": "react-native run-android",
    "ios": "react-native run-ios",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
    "lint:fix": "eslint . --ext .js,.jsx,.ts,.tsx --fix",
    "type-check": "tsc --noEmit",
    "format": "prettier --write \"src/**/*.{js,jsx,ts,tsx,json,md}\"",
    "clean": "react-native clean-project-auto",
    "build:android": "cd android && ./gradlew assembleRelease",
    "build:ios": "cd ios && xcodebuild -workspace DaltiProvider.xcworkspace -scheme DaltiProvider -configuration Release",
    "bundle:analyze": "npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android-bundle.js --verbose"
  }
}
```

This structure provides a solid foundation for building a scalable, maintainable React Native
application while following **2025 industry best practices** and clean architecture principles with
the latest technology stack.
