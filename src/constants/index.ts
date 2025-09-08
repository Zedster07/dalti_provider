// Application constants

// API Configuration
export const API_CONFIG = {
  BASE_URL: 'https://dapi-test.adscloud.org:8443',
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
} as const;

// Firebase Configuration
export const FIREBASE_CONFIG = {
  API_KEY: 'AIzaSyC946kqiZ2Eoc88vslGXFxVa-6yrWicVec',
  PROJECT_ID: 'dalti-prod',
  MESSAGING_SENDER_ID: '1060372851323',
  APP_ID: '1:1060372851323:web:690318c8147b5c8a0690de',
} as const;

// Design System Colors
export const COLORS = {
  // Brand Colors
  PRIMARY: '#15424E',
  PRIMARY_VARIANT: '#0D3339',
  SECONDARY: '#4ECDC4',
  ACCENT: '#FFE66D',

  // Neutral Colors
  SURFACE: '#FAFAFA',
  BACKGROUND: '#FFFFFF',
  ERROR: '#E74C3C',
  SUCCESS: '#27AE60',
  WARNING: '#F39C12',

  // Text Colors
  TEXT_PRIMARY: '#2C3E50',
  TEXT_SECONDARY: '#7F8C8D',
  TEXT_ON_PRIMARY: '#FFFFFF',

  // Dark Theme Colors
  DARK_BACKGROUND: '#0F1419',
  DARK_SURFACE: '#1C2127',
  DARK_PRIMARY: '#257587',
  DARK_TEXT: '#F8F9FA',
} as const;

// Typography
export const TYPOGRAPHY = {
  FONT_FAMILY: 'Changa',
  FONT_WEIGHTS: {
    LIGHT: '300',
    REGULAR: '400',
    MEDIUM: '500',
    SEMIBOLD: '600',
    BOLD: '700',
    EXTRABOLD: '800',
  },
  FONT_SIZES: {
    XS: 10,
    SM: 12,
    MD: 14,
    LG: 16,
    XL: 18,
    XXL: 20,
    XXXL: 24,
  },
} as const;

// Spacing
export const SPACING = {
  XS: 4,
  SM: 8,
  MD: 12,
  LG: 16,
  XL: 20,
  XXL: 24,
  XXXL: 32,
  XXXXL: 40,
} as const;

// Border Radius
export const BORDER_RADIUS = {
  NONE: 0,
  XS: 2,
  SM: 4,
  MD: 8,
  LG: 12,
  XL: 16,
  XXL: 20,
  FULL: 9999,
} as const;

// Animation Durations
export const ANIMATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  SLOWER: 750,
} as const;

// Screen Dimensions
export const SCREEN = {
  BREAKPOINTS: {
    SM: 480,
    MD: 768,
    LG: 1024,
    XL: 1280,
  },
} as const;

// Storage Keys
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_DATA: 'user_data',
  PROVIDER_DATA: 'provider_data',
  THEME_PREFERENCE: 'theme_preference',
  LANGUAGE_PREFERENCE: 'language_preference',
  ONBOARDING_COMPLETED: 'onboarding_completed',
} as const;

// Route Names
export const ROUTES = {
  // Auth Routes
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  OTP_VERIFICATION: '/otp-verification',

  // Main App Routes
  DASHBOARD: '/(tabs)/dashboard',
  APPOINTMENTS: '/(tabs)/appointments',
  CUSTOMERS: '/(tabs)/customers',
  PROFILE: '/(tabs)/profile',

  // Modal Routes
  APPOINTMENT_CREATE: '/modal/appointment-create',
  LOCATION_EDIT: '/modal/location-edit',
  SERVICE_EDIT: '/modal/service-edit',
} as const;

// Validation Rules
export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 8,
  PHONE_MIN_LENGTH: 10,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^\+?[1-9]\d{1,14}$/,
} as const;

// App Configuration
export const APP_CONFIG = {
  NAME: 'Dalti Provider',
  VERSION: '1.0.0',
  BUNDLE_ID: 'org.adscloud.dalti.provider',
  SUPPORTED_LANGUAGES: ['en', 'fr', 'ar'],
  DEFAULT_LANGUAGE: 'en',
  PAGINATION_SIZE: 20,
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR:
    'Network connection error. Please check your internet connection.',
  UNAUTHORIZED: 'Your session has expired. Please log in again.',
  FORBIDDEN: 'You do not have permission to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  SERVER_ERROR: 'An unexpected error occurred. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Welcome back!',
  LOGOUT_SUCCESS: 'You have been logged out successfully.',
  PROFILE_UPDATED: 'Your profile has been updated successfully.',
  PASSWORD_CHANGED: 'Your password has been changed successfully.',
  DATA_SAVED: 'Your changes have been saved successfully.',
} as const;
