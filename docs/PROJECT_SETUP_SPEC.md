# Project Setup Specification - Dalti Provider React Native

## 📋 **Overview**

This document outlines the comprehensive project setup for migrating Dalti Provider from Flutter to
React Native using Expo and 2025's latest technologies.

## 🎯 **Project Goals**

### Primary Objectives

1. **Modern Tech Stack**: Implement using 2025's latest stable versions
2. **Clean Architecture**: Establish scalable, maintainable code structure
3. **Developer Experience**: Optimize development workflow and tooling
4. **Quality Assurance**: Implement comprehensive testing and CI/CD
5. **Security First**: Integrate security best practices from the start

### Success Criteria

- [ ] All dependencies use 2025 latest stable versions
- [ ] Clean architecture implementation with proper separation of concerns
- [ ] Comprehensive development environment setup
- [ ] Automated testing and quality gates
- [ ] Security measures integrated throughout

## 🏗️ **Technical Architecture**

### Technology Stack (2025 Latest)

```json
{
  "framework": "Expo SDK 53.x",
  "runtime": "React Native 0.79.6",
  "language": "TypeScript 5.8.3",
  "navigation": "Expo Router 5.1.5",
  "stateManagement": "Zustand 5.x + TanStack Query v5",
  "httpClient": "Axios 1.7.0",
  "storage": "Expo SecureStore + MMKV 3.x",
  "realtime": "Socket.IO Client 4.8.0",
  "firebase": "@react-native-firebase/* v20.0.0",
  "testing": "Jest + React Native Testing Library",
  "linting": "ESLint 9.x + TypeScript ESLint",
  "formatting": "Prettier 3.x"
}
```

### Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── common/          # Generic components (Button, Input, etc.)
│   ├── forms/           # Form-specific components
│   └── navigation/      # Navigation components
├── features/            # Feature-based modules
│   ├── auth/           # Authentication feature
│   ├── dashboard/      # Dashboard feature
│   ├── appointments/   # Appointment management
│   ├── locations/      # Location management
│   ├── services/       # Service management
│   ├── customers/      # Customer management
│   ├── messages/       # Messaging system
│   ├── notifications/  # Notification management
│   ├── profile/        # User profile
│   ├── settings/       # App settings
│   └── shared/         # Shared feature components
├── hooks/              # Custom React hooks
├── navigation/         # Navigation configuration
├── services/           # API and external services
│   ├── api/           # HTTP client and API services
│   ├── storage/       # Storage services
│   ├── firebase/      # Firebase integration
│   └── websocket/     # WebSocket services
├── stores/             # State management (Zustand)
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── constants/          # App constants
└── assets/             # Static assets
```

## 🔧 **Development Environment Setup**

### Required Tools

1. **Node.js**: v20.x LTS (2025 recommended)
2. **npm/yarn**: Latest package manager
3. **Expo CLI**: Latest version
4. **EAS CLI**: For builds and deployments
5. **Git**: Version control
6. **VS Code**: Recommended IDE with extensions

### VS Code Extensions

- Expo Tools
- TypeScript and JavaScript Language Features
- ESLint
- Prettier
- React Native Tools
- GitLens
- Auto Rename Tag
- Bracket Pair Colorizer

### Environment Variables

```env
# API Configuration
API_BASE_URL=https://dapi-test.adscloud.org:8443
API_TIMEOUT=30000

# Firebase Configuration
FIREBASE_API_KEY=AIzaSyC946kqiZ2Eoc88vslGXFxVa-6yrWicVec
FIREBASE_PROJECT_ID=dalti-prod
FIREBASE_MESSAGING_SENDER_ID=1060372851323

# Development
NODE_ENV=development
EXPO_PUBLIC_ENV=development
```

## 📦 **Dependencies Configuration**

### Core Dependencies (2025 Latest)

```json
{
  "expo": "~53.0.22",
  "react": "19.0.0",
  "react-native": "0.79.6",
  "typescript": "~5.8.3",
  "expo-router": "~5.1.5"
}
```

### State Management

```json
{
  "zustand": "^5.0.0",
  "@tanstack/react-query": "^5.0.0",
  "@tanstack/react-query-devtools": "^5.0.0"
}
```

### UI & Styling

```json
{
  "react-native-reanimated": "~3.17.4",
  "react-native-gesture-handler": "~2.24.0",
  "expo-font": "~13.3.2",
  "expo-image": "~2.4.0"
}
```

### Storage & Security

```json
{
  "expo-secure-store": "~14.0.0",
  "react-native-mmkv": "^3.0.0",
  "expo-crypto": "~14.0.0"
}
```

### Firebase Integration

```json
{
  "@react-native-firebase/app": "^20.0.0",
  "@react-native-firebase/messaging": "^20.0.0",
  "@react-native-firebase/analytics": "^20.0.0",
  "@react-native-firebase/storage": "^20.0.0"
}
```

### Development Dependencies

```json
{
  "@types/react": "~19.0.10",
  "@typescript-eslint/eslint-plugin": "^8.0.0",
  "@typescript-eslint/parser": "^8.0.0",
  "eslint": "^9.25.0",
  "eslint-config-expo": "~9.2.0",
  "prettier": "^3.0.0",
  "jest": "^29.0.0",
  "@testing-library/react-native": "^12.0.0"
}
```

## 🔐 **Security Configuration**

### Secure Storage Setup

- Use Expo SecureStore for sensitive data (tokens, credentials)
- Implement proper encryption for local data
- Configure certificate pinning for API calls

### Environment Security

- Separate environment configurations
- Secure API key management
- Implement proper authentication flows

## 🧪 **Testing Strategy**

### Testing Framework

- **Unit Tests**: Jest + React Native Testing Library
- **Integration Tests**: Component integration testing
- **E2E Tests**: Detox (future implementation)

### Test Coverage Goals

- Minimum 80% code coverage
- 100% coverage for critical business logic
- All API integrations tested

## 🚀 **CI/CD Pipeline**

### GitHub Actions Workflow

1. **Code Quality**: Linting, formatting, type checking
2. **Testing**: Unit and integration tests
3. **Build**: EAS Build for iOS/Android
4. **Deployment**: Automatic deployment to staging

### Quality Gates

- All tests must pass
- Code coverage threshold met
- No linting errors
- TypeScript compilation successful

## 📱 **Platform Configuration**

### iOS Configuration

- Minimum iOS 15.0
- Proper Info.plist configuration
- App Store Connect setup

### Android Configuration

- Minimum API Level 24 (Android 7.0)
- Proper permissions configuration
- Google Play Console setup

## 🔄 **Development Workflow**

### Git Workflow

1. Feature branches from `develop`
2. Commit messages with Jira IDs
3. Pull requests with code review
4. Merge to `develop` after approval
5. Release branches to `main`

### Code Standards

- TypeScript strict mode
- ESLint configuration enforced
- Prettier formatting
- Conventional commit messages

## 📊 **Monitoring & Analytics**

### Performance Monitoring

- React Native Performance monitoring
- Firebase Performance
- Custom metrics tracking

### Error Tracking

- Firebase Crashlytics
- Custom error reporting
- User feedback integration

## 🎯 **Implementation Phases**

### Phase 1: Foundation (Current)

- Project setup and configuration
- Development environment
- Basic architecture implementation

### Phase 2: Core Features

- Authentication system
- Navigation structure
- Basic UI components

### Phase 3: Business Logic

- API integration
- State management
- Core business features

### Phase 4: Advanced Features

- Real-time functionality
- Push notifications
- Advanced UI components

### Phase 5: Optimization

- Performance optimization
- Security hardening
- Production deployment

## ✅ **Acceptance Criteria**

### Technical Requirements

- [ ] All 2025 latest versions implemented
- [ ] Clean architecture structure established
- [ ] TypeScript strict mode enabled
- [ ] Comprehensive testing setup
- [ ] CI/CD pipeline functional
- [ ] Security measures implemented

### Quality Requirements

- [ ] Code passes all quality gates
- [ ] Documentation complete and accurate
- [ ] Development environment reproducible
- [ ] Performance benchmarks met
- [ ] Security audit passed

## 📞 **Support & Resources**

### Documentation

- Technical specifications in `/docs`
- API documentation
- Architecture decision records

### Team Resources

- Development team contacts
- Code review guidelines
- Troubleshooting guides

---

_This specification serves as the foundation for the Dalti Provider React Native project setup and
should be referenced throughout the development process._
