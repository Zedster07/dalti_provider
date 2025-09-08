# State Management Analysis

## 🏗️ Current Flutter Architecture

### Riverpod State Management

The current Flutter application uses **Riverpod 2.6.1** as the primary state management solution
with code generation for type safety and performance.

#### Provider Types Used

1. **StateNotifierProvider** - For complex state management
2. **FutureProvider** - For async data fetching
3. **StreamProvider** - For real-time data streams
4. **Provider** - For dependency injection
5. **StateProvider** - For simple state values

### Architecture Patterns

#### Repository Pattern

```dart
// Example: Location Repository
abstract class LocationRepository {
  Future<List<Location>> getLocations();
  Future<Location> createLocation(CreateLocationRequest request);
  Future<Location> updateLocation(int id, UpdateLocationRequest request);
  Future<void> deleteLocation(int id);
}

class LocationRepositoryImpl implements LocationRepository {
  final LocationApiService _apiService;
  LocationRepositoryImpl(this._apiService);
  // Implementation...
}
```

#### Provider Pattern with Code Generation

```dart
@riverpod
class LocationNotifier extends _$LocationNotifier {
  @override
  LocationData build() {
    return const LocationData(state: LocationState.initial);
  }

  Future<void> loadLocations() async {
    state = state.copyWith(state: LocationState.loading);
    try {
      final repository = ref.read(locationRepositoryProvider);
      final locations = await repository.getLocations();
      state = state.copyWith(
        state: LocationState.loaded,
        locations: locations,
      );
    } catch (error) {
      state = state.copyWith(
        state: LocationState.error,
        error: error.toString(),
      );
    }
  }
}
```

#### Data Models with Freezed

```dart
@freezed
class Location with _$Location {
  const factory Location({
    required int id,
    required String name,
    required String address,
    required String city,
    String? country,
    double? latitude,
    double? longitude,
    List<DayOpeningHours>? openingHours,
  }) = _Location;

  factory Location.fromJson(Map<String, dynamic> json) =>
      _$LocationFromJson(json);
}
```

## 🔄 Data Flow Architecture

### Request Flow

1. **UI Component** triggers action
2. **Provider/Notifier** handles business logic
3. **Repository** abstracts data source
4. **API Service** makes HTTP requests
5. **Response** flows back through layers
6. **UI** updates reactively

### State Structure

```dart
@freezed
class LocationData with _$LocationData {
  const factory LocationData({
    required LocationState state,
    @Default([]) List<Location> locations,
    Location? selectedLocation,
    String? error,
    @Default(false) bool isLoading,
  }) = _LocationData;
}

enum LocationState {
  initial,
  loading,
  loaded,
  error,
}
```

## 🌐 API Integration Patterns

### HTTP Client Configuration

- **Base Client**: Dio with interceptors
- **Authentication**: JWT token interceptor
- **Logging**: Request/response logging
- **Error Handling**: Centralized error processing
- **Retry Logic**: Automatic retry for failed requests

### API Service Pattern

```dart
class LocationApiService extends ApiService {
  LocationApiService(super.httpClient);

  Future<List<Location>> getLocations({
    bool? isActive,
    String? search,
  }) async {
    final response = await httpClient.get(
      '/api/auth/providers/locations',
      queryParameters: {
        if (isActive != null) 'isActive': isActive,
        if (search != null) 'search': search,
      },
    );

    return (response.data as List)
        .map((json) => Location.fromJson(json))
        .toList();
  }
}
```

## 🔄 Real-time Data Management

### WebSocket Integration

- **Service**: WebSocketService for Socket.IO connection
- **Providers**: Real-time data stream providers
- **State Sync**: Automatic state synchronization
- **Reconnection**: Automatic reconnection handling

### Stream Providers

```dart
@riverpod
Stream<List<Message>> realtimeMessages(RealtimeMessagesRef ref) {
  final webSocketService = ref.watch(webSocketServiceProvider);
  return webSocketService.messageStream;
}
```

## 💾 Local Storage Strategy

### Storage Services

1. **Hive** - Primary NoSQL database for complex data
2. **SharedPreferences** - Simple key-value storage
3. **SecureStorage** - Encrypted storage for sensitive data
4. **WebStorageService** - Web-specific storage handling

### Caching Strategy

- **API Response Caching** - Automatic response caching
- **Offline Support** - Local data persistence
- **Cache Invalidation** - Smart cache refresh logic
- **Storage Optimization** - Efficient data serialization

## 🔐 Authentication State Management

### JWT Token Management

```dart
@riverpod
class AuthNotifier extends _$AuthNotifier {
  @override
  AuthData build() {
    return const AuthData(state: AuthState.unauthenticated);
  }

  Future<bool> login(LoginRequest request) async {
    try {
      state = state.copyWith(state: AuthState.loading);

      final repository = ref.read(authRepositoryProvider);
      final response = await repository.login(request);

      // Store tokens securely
      await _storeTokens(response.tokens);

      state = state.copyWith(
        state: AuthState.authenticated,
        user: response.user,
        tokens: response.tokens,
      );

      return true;
    } catch (error) {
      state = state.copyWith(
        state: AuthState.error,
        error: error.toString(),
      );
      return false;
    }
  }
}
```

## 📱 UI State Management

### Form State Management

- **Form Controllers** - Text input management
- **Validation State** - Real-time form validation
- **Submission State** - Loading and error states
- **Auto-save** - Automatic form data persistence

### Navigation State

- **GoRouter** - Declarative routing
- **Route Guards** - Authentication-based navigation
- **Deep Linking** - URL-based navigation
- **State Preservation** - Navigation state persistence

## 🎯 React Native Migration Strategy (2025 Latest)

### Recommended State Management Stack (2025 Versions)

1. **Zustand 5.x** - Latest lightweight state management (2025)
2. **TanStack Query v5** - Advanced server state management (2025)
3. **React Hook Form 7.x** - Latest form state management (2025)
4. **React Navigation 7.x** - Modern navigation state (2025)

### Migration Mapping (2025 Technologies)

| Flutter (Riverpod)    | React Native 2025 Equivalent            |
| --------------------- | --------------------------------------- |
| StateNotifierProvider | Zustand 5.x store                       |
| FutureProvider        | TanStack Query v5 useQuery              |
| StreamProvider        | TanStack Query v5 useQuery with polling |
| Provider              | React Context (18.x)                    |
| StateProvider         | useState/Zustand 5.x                    |

### Proposed Architecture

```typescript
// Zustand Store Example
interface LocationStore {
  locations: Location[];
  selectedLocation: Location | null;
  isLoading: boolean;
  error: string | null;

  loadLocations: () => Promise<void>;
  selectLocation: (location: Location) => void;
  createLocation: (request: CreateLocationRequest) => Promise<void>;
}

const useLocationStore = create<LocationStore>((set, get) => ({
  locations: [],
  selectedLocation: null,
  isLoading: false,
  error: null,

  loadLocations: async () => {
    set({ isLoading: true, error: null });
    try {
      const locations = await locationApi.getLocations();
      set({ locations, isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  // Other methods...
}));
```

### React Query Integration

```typescript
// Server State Management
const useLocations = () => {
  return useQuery({
    queryKey: ['locations'],
    queryFn: locationApi.getLocations,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
};

const useCreateLocation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: locationApi.createLocation,
    onSuccess: () => {
      queryClient.invalidateQueries(['locations']);
    },
  });
};
```

This analysis provides the foundation for migrating the current Riverpod-based state management to a
React Native architecture while maintaining the same data flow patterns and business logic.
