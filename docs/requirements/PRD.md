# Dalti Provider React Native - Project Requirements Document (PRD)

## 📋 Project Overview

### Product Vision
Migrate the Dalti Provider Flutter application to React Native using **2025's latest technologies** while maintaining complete feature parity, design consistency, and performance standards. The new React Native application will serve as a comprehensive business management platform for service providers.

**🚀 2025 Technology Focus**: This project leverages the most current and stable versions of React Native ecosystem tools available in 2025 to ensure optimal performance, security, and future-proofing.

### Project Goals
1. **Complete Feature Migration** - Implement all existing Flutter app functionality
2. **Design Consistency** - Maintain current UI/UX design system
3. **Performance Optimization** - Ensure optimal performance on iOS and Android
4. **Code Quality** - Implement clean architecture and best practices
5. **Maintainability** - Create scalable and maintainable codebase

## 🎯 Target Users

### Primary Users
- **Service Providers** - Healthcare professionals, beauty specialists, consultants
- **Business Owners** - Small to medium business owners offering appointment-based services
- **Clinic Managers** - Managing multiple locations and staff

### User Personas
1. **Dr. Sarah** - Medical professional managing patient appointments
2. **Ahmed** - Beauty salon owner with multiple locations
3. **Fatima** - Consultant offering both in-person and remote services

## 🚀 Core Features

### 1. Authentication & Onboarding
**Priority**: Critical
**Complexity**: Medium

#### Requirements
- Multi-step registration with provider category selection
- Phone/email verification via OTP
- Comprehensive onboarding wizard (6 steps)
- JWT-based authentication with secure token storage
- Password reset functionality

#### User Stories
- As a new provider, I want to register and set up my business profile
- As a returning user, I want to securely log in to access my dashboard
- As a user, I want to reset my password if I forget it

### 2. Business Management
**Priority**: Critical
**Complexity**: High

#### Location Management
- Multiple business location support
- GPS integration for location coordinates
- Opening hours configuration with multiple time slots
- Location-specific settings and preferences

#### Service Management
- Service creation with pricing and duration
- Service categories and hierarchical organization
- Delivery type selection (at location/at customer/both)
- Service availability and status management

#### Queue Management
- Queue creation and configuration
- Real-time queue status monitoring
- Queue-location associations
- Queue analytics and performance metrics

### 3. Appointment System
**Priority**: Critical
**Complexity**: High

#### Calendar Management
- Multiple calendar views (monthly, weekly, daily)
- Appointment creation and editing
- Real-time appointment updates
- Appointment status tracking

#### Customer Integration
- Customer selection and management
- Appointment history tracking
- Customer communication integration

### 4. Dashboard & Analytics
**Priority**: High
**Complexity**: Medium

#### Business Overview
- Revenue tracking and analytics
- Appointment metrics and trends
- Queue performance indicators
- Customer satisfaction metrics

#### Real-time Updates
- Live appointment status
- Queue monitoring
- Notification alerts
- Performance dashboards

### 5. Communication System
**Priority**: High
**Complexity**: Medium

#### Messaging
- Real-time chat with customers
- Message history and threading
- Push notification integration
- Message status tracking

#### Notifications
- Firebase Cloud Messaging integration
- Local notification support
- Notification categories and preferences
- Real-time alert system

## 🔧 Technical Requirements

### Platform Support (2025 Standards)
- **iOS**: iOS 15.0+ (Latest supported by React Native 0.75+)
- **Android**: API Level 24+ (Android 7.0) - 2025 minimum standard
- **Performance**: 120 FPS on supported devices, 60 FPS minimum
- **Bundle Size**: Optimized with 2025 bundling techniques

### Architecture Requirements (2025 Best Practices)
- **Clean Architecture** implementation with 2025 patterns
- **Modular structure** with feature-based organization
- **Type Safety** with TypeScript 5.x (Latest 2025 version)
- **State Management** with Zustand 5.x + TanStack Query v5
- **Navigation** with React Navigation 7.x (2025 release)

### Data Management (2025 Technologies)
- **Local Storage**: MMKV 3.x (Latest 2025 version) for performance-critical data
- **Secure Storage**: React Native Keychain 9.x (2025 compatible)
- **Caching Strategy**: TanStack Query v5 with enhanced offline support
- **Real-time Updates**: WebSocket with modern connection management

### Security Requirements
- **Authentication**: JWT token management
- **Data Encryption**: Sensitive data encryption at rest
- **API Security**: Request signing and validation
- **Input Validation**: Comprehensive input sanitization
- **Secure Communication**: HTTPS/WSS only

## 🌐 API Specifications

### Base Configuration
- **Base URL**: `https://dapi-test.adscloud.org:8443`
- **Authentication**: Bearer token (JWT)
- **Content Type**: `application/json`
- **Timeout**: 30 seconds for standard requests

### Core Endpoints

#### Authentication
```
POST /api/auth/provider/login
POST /api/auth/provider/register
POST /api/auth/request-email-otp
POST /api/auth/provider/verify-otp-register
POST /api/auth/refresh-token
```

#### Business Management
```
GET /api/auth/providers/locations
POST /api/auth/providers/locations
PUT /api/auth/providers/locations/{id}
DELETE /api/auth/providers/locations/{id}

GET /api/auth/providers/services
POST /api/auth/providers/services
PUT /api/auth/providers/services/{id}
DELETE /api/auth/providers/services/{id}

GET /api/auth/providers/queues
POST /api/auth/providers/queues
PUT /api/auth/providers/queues/{id}
DELETE /api/auth/providers/queues/{id}
```

#### Appointments
```
GET /api/auth/providers/appointments
POST /api/auth/providers/appointments
PUT /api/auth/providers/appointments/{id}
DELETE /api/auth/providers/appointments/{id}
GET /api/auth/providers/appointments/calendar
```

#### Customers
```
GET /api/auth/providers/customers
POST /api/auth/providers/customers
PUT /api/auth/providers/customers/{id}
GET /api/auth/providers/customers/{id}
```

### Response Format
```json
{
  "success": boolean,
  "data": object | array,
  "error": {
    "code": string,
    "message": string,
    "details": object
  },
  "pagination": {
    "page": number,
    "pageSize": number,
    "total": number,
    "totalPages": number
  }
}
```

**📋 Complete API Documentation**: For detailed endpoint specifications, request/response schemas, and implementation examples, see [`api-specifications.md`](./api-specifications.md)

## 🔥 Firebase Integration

### Firebase Services
- **Project ID**: `dalti-prod`
- **Cloud Messaging**: Push notifications
- **Analytics**: User behavior tracking
- **Storage**: File uploads and media
- **Crashlytics**: Error reporting and monitoring

### FCM Configuration
- **Topic Subscriptions**: Provider-specific notifications
- **Message Types**: Appointment alerts, system notifications
- **Platform Support**: iOS, Android with proper VAPID setup

## 📱 UI/UX Requirements

### Design System
- **Primary Color**: #15424E (Stormy Sea)
- **Secondary Color**: #4ECDC4 (Teal Breeze)
- **Accent Color**: #FFE66D (Golden Yellow)
- **Typography**: Changa font family
- **Design Language**: Material Design 3 principles

### Responsive Design
- **Mobile First**: Optimized for mobile devices
- **Tablet Support**: Adaptive layouts for larger screens
- **Accessibility**: WCAG 2.1 AA compliance
- **RTL Support**: Arabic language support

### Animation & Interactions
- **Smooth Transitions**: 60 FPS animations
- **Gesture Support**: Swipe, pinch, long-press
- **Feedback**: Haptic feedback and visual indicators
- **Loading States**: Skeleton screens and progress indicators

## 🌍 Internationalization

### Supported Languages
- **English** (en) - Primary language
- **French** (fr) - Secondary language
- **Arabic** (ar) - RTL support required

### Localization Requirements
- **Text Translation**: All user-facing text
- **Date/Time Formatting**: Locale-specific formatting
- **Number Formatting**: Currency and numeric values
- **RTL Layout**: Proper layout mirroring for Arabic

## 📊 Performance Requirements

### Performance Metrics
- **App Launch Time**: < 3 seconds cold start
- **Screen Transitions**: < 300ms
- **API Response Handling**: < 1 second for standard requests
- **Memory Usage**: Optimized for low-end devices

### Optimization Strategies
- **Code Splitting**: Feature-based bundle splitting
- **Image Optimization**: WebP format with fallbacks
- **Caching**: Aggressive caching for static content
- **Bundle Analysis**: Regular bundle size monitoring

## 🔄 Migration Timeline

### Phase 1: Foundation (Weeks 1-3)
- Project setup and architecture implementation
- Authentication system migration
- Core navigation structure
- Basic UI components and design system

### Phase 2: Core Features (Weeks 4-7)
- Business management (locations, services, queues)
- Dashboard implementation
- Profile management
- Settings and preferences

### Phase 3: Advanced Features (Weeks 8-11)
- Appointment management system
- Customer management
- Calendar integration
- Real-time updates

### Phase 4: Communication (Weeks 12-14)
- Messaging system implementation
- Notification system
- WebSocket integration
- Push notification setup

### Phase 5: Polish & Testing (Weeks 15-16)
- Performance optimization
- Testing and bug fixes
- App store preparation
- Documentation completion

## ✅ Acceptance Criteria

### Functional Requirements
- [ ] All Flutter app features implemented
- [ ] API integration complete and tested
- [ ] Real-time features working correctly
- [ ] Offline functionality where applicable
- [ ] Push notifications operational

### Non-Functional Requirements
- [ ] Performance meets specified metrics
- [ ] Security requirements implemented
- [ ] Accessibility standards met
- [ ] Internationalization complete
- [ ] Code quality standards achieved

### Quality Assurance
- [ ] Unit test coverage > 80%
- [ ] Integration tests for critical flows
- [ ] End-to-end testing complete
- [ ] Performance testing passed
- [ ] Security audit completed

## 📋 Success Metrics

### User Experience
- **App Store Rating**: Maintain 4.5+ stars
- **User Retention**: 90% day-1, 70% day-7, 50% day-30
- **Crash Rate**: < 0.1%
- **Performance Score**: 90+ on mobile performance audits

### Business Metrics
- **Feature Adoption**: 95% of current features used
- **User Satisfaction**: 90%+ positive feedback
- **Migration Success**: 100% feature parity achieved
- **Performance Improvement**: 20% faster than Flutter version

This PRD serves as the comprehensive guide for implementing the Dalti Provider React Native application with complete feature parity and enhanced performance.
