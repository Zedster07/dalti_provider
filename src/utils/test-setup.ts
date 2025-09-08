// Jest matchers are automatically extended in React Native Testing Library v12+

// Mock Expo modules
jest.mock('expo-constants', () => ({
  expoConfig: {
    extra: {
      apiUrl: 'http://localhost:3000',
    },
  },
}));

jest.mock('expo-secure-store', () => ({
  getItemAsync: jest.fn(),
  setItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}));

jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  useLocalSearchParams: () => ({}),
  Link: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock React Native modules
// Note: Specific React Native module mocks can be added here as needed

// Mock Firebase (when Firebase is installed)
// jest.mock('@react-native-firebase/app', () => ({
//   initializeApp: jest.fn(),
// }));

// jest.mock('@react-native-firebase/messaging', () => ({
//   getToken: jest.fn(),
//   onMessage: jest.fn(),
//   requestPermission: jest.fn(),
// }));

// Global test utilities
global.fetch = jest.fn();

// Silence console warnings in tests
global.console = {
  ...console,
  warn: jest.fn(),
  error: jest.fn(),
};
