# Complete API Specifications

## 🌐 Base Configuration

### Server URLs

- **Production**: `https://dapi.adscloud.org`
- **Development**: `https://dapi-test.adscloud.org:8443`

### Authentication

- **Type**: Bearer Token (JWT)
- **Header**: `Authorization: Bearer {sessionId}`
- **Content-Type**: `application/json`

### Response Format

All API responses follow this standard format:

```json
{
  "success": boolean,
  "message": string,
  "data": object | array | null,
  "errors": object (optional, for validation errors)
}
```

## 🔐 Authentication Endpoints

### 1. Get Provider Categories

**GET** `/api/auth/provider/categories`

**Description**: Fetch all available provider categories in hierarchical structure

**Request**: No body required

**Response** (200 OK):

```json
[
  {
    "id": 1,
    "title": "Healthcare",
    "parentId": null
  },
  {
    "id": 16,
    "title": "General Practice",
    "parentId": 1
  }
]
```

**Notes**:

- Returns 15 parent categories (parentId: null)
- Returns 66 child categories (parentId: parent category ID)
- Some API responses may have empty titles - app uses fallback categories

### 2. Request Email OTP

**POST** `/api/auth/request-email-otp`

**Description**: Request OTP for provider registration

**Request Body**:

```json
{
  "email": "provider@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "password": "password123",
  "isProviderRegistration": true,
  "providerCategoryId": 1,
  "businessName": "My Business",
  "phone": "+1234567890"
}
```

**Response** (200 OK):

```json
{
  "success": true,
  "message": "OTP sent successfully"
}
```

### 3. Complete Provider Registration

**POST** `/api/auth/provider/verify-otp-register`

**Description**: Complete provider registration with OTP verification

**Request Body**:

```json
{
  "otp": "123456",
  "identifier": "provider@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "providerCategoryId": 1,
  "businessName": "My Business",
  "phone": "+1234567890",
  "email": "provider@example.com"
}
```

**Response** (201 Created):

```json
{
  "message": "Provider registered successfully",
  "user": {
    "id": "f63f6d7f-4fde-46d8-98f6-b35209418f5f",
    "email": "provider@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "CUSTOMER"
  },
  "provider": {
    "id": 2,
    "userId": "f63f6d7f-4fde-46d8-98f6-b35209418f5f",
    "providerCategoryId": 1,
    "title": "My Business",
    "phone": "0558880157",
    "isSetupComplete": false
  },
  "sessionId": "r62dicmfc7hgto6oqllprwm3oyzt44sjqitax6we"
}
```

### 4. Provider Login

**POST** `/api/auth/provider/login`

**Description**: Authenticate provider and get session token

**Request Body**:

```json
{
  "identifier": "provider@example.com",
  "password": "password123"
}
```

**Response** (200 OK):

```json
{
  "sessionId": "gfpyz37dllbkyc5n6s2fl7oiqm5upfcxgii65lla",
  "user": {
    "id": "c318cff7-b668-40eb-a8c8-c1ac05fc2593",
    "email": "provider@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "CUSTOMER"
  },
  "provider": {
    "id": 1,
    "userId": "c318cff7-b668-40eb-a8c8-c1ac05fc2593",
    "title": "My Business",
    "phone": "0558880156",
    "providerCategoryId": 1,
    "category": {
      "id": 1,
      "title": "Healthcare",
      "parentId": null
    }
  }
}
```

### 5. Refresh Token

**POST** `/api/auth/refresh-token`

**Description**: Refresh expired session token

**Request Body**:

```json
{
  "refreshToken": "refresh_token_here"
}
```

**Response** (200 OK):

```json
{
  "success": true,
  "data": {
    "accessToken": "new_access_token",
    "refreshToken": "new_refresh_token",
    "expiresIn": 3600
  }
}
```

### 6. Logout

**POST** `/api/auth/logout`

**Description**: Invalidate current session

**Request**: No body required (uses Authorization header)

**Response** (200 OK):

```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

## 🏢 Location Management

### 1. Get Locations

**GET** `/api/auth/providers/locations`

**Description**: Get all locations for the authenticated provider

**Query Parameters**:

- `isActive` (boolean, optional): Filter by active status
- `search` (string, optional): Search by location name

**Response** (200 OK):

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Main Clinic",
      "address": "123 Main Street",
      "city": "Algiers",
      "isMobileHidden": false,
      "parking": true,
      "elevator": false,
      "handicapAccess": true
    }
  ]
}
```

**Note**: Response does NOT include `isActive`, `description`, or `coordinates`

### 2. Create Location

**POST** `/api/auth/providers/locations`

**Description**: Create a new location

**Request Body**:

```json
{
  "name": "New Clinic",
  "address": "456 Oak Avenue",
  "city": "Oran",
  "country": "Algeria",
  "postalCode": "31000",
  "latitude": 35.6976,
  "longitude": -0.6337,
  "parking": true,
  "elevator": false,
  "handicapAccess": true
}
```

**Response** (201 Created):

```json
{
  "success": true,
  "message": "Location created successfully",
  "data": {
    "id": 2,
    "name": "New Clinic",
    "address": "456 Oak Avenue",
    "city": "Oran",
    "isMobileHidden": false,
    "parking": true,
    "elevator": false,
    "handicapAccess": true
  }
}
```

### 3. Update Location

**PUT** `/api/auth/providers/locations/{id}`

**Description**: Update an existing location

**Request Body**: Same as create location

**Response** (200 OK):

```json
{
  "success": true,
  "message": "Location updated successfully",
  "data": {
    "id": 1,
    "name": "Updated Clinic Name",
    "address": "123 Main Street",
    "city": "Algiers",
    "isMobileHidden": false,
    "parking": true,
    "elevator": true,
    "handicapAccess": true
  }
}
```

### 4. Delete Location

**DELETE** `/api/auth/providers/locations/{id}`

**Description**: Delete a location

**Response** (200 OK):

```json
{
  "success": true,
  "message": "Location deleted successfully"
}
```

**Error** (500 Internal Server Error - if location has dependencies):

```json
{
  "success": false,
  "message": "Cannot delete location with existing opening hours"
}
```

## 🛠️ Service Management

### 1. Get Services

**GET** `/api/auth/providers/services`

**Description**: Get all services for the authenticated provider

**Query Parameters**:

- `isActive` (boolean, optional): Filter by active status
- `categoryId` (integer, optional): Filter by category

**Response** (200 OK):

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "General Consultation",
      "duration": 30,
      "color": "#4ECDC4",
      "acceptOnline": true,
      "acceptNew": true,
      "notificationOn": true,
      "pointsRequirements": 0
    }
  ]
}
```

**Note**: Response does NOT include `description`, `price`, `isActive`, or `categoryId`

### 2. Create Service

**POST** `/api/auth/providers/services`

**Description**: Create a new service

**Request Body**:

```json
{
  "title": "Dental Cleaning",
  "description": "Professional dental cleaning service",
  "duration": 45,
  "price": 150.0,
  "categoryId": 16,
  "color": "#FFE66D",
  "acceptOnline": true,
  "acceptNew": true,
  "notificationOn": true
}
```

**Response** (201 Created):

```json
{
  "success": true,
  "message": "Service created successfully",
  "data": {
    "id": 2,
    "title": "Dental Cleaning",
    "duration": 45,
    "color": "#FFE66D",
    "acceptOnline": true,
    "acceptNew": true,
    "notificationOn": true,
    "pointsRequirements": 0
  }
}
```

### 3. Update Service

**PUT** `/api/auth/providers/services/{id}`

**Description**: Update an existing service

**Request Body**: Same as create service

**Response** (200 OK):

```json
{
  "success": true,
  "message": "Service updated successfully",
  "data": {
    "id": 1,
    "title": "Updated Service Name",
    "duration": 60,
    "color": "#15424E",
    "acceptOnline": false,
    "acceptNew": true,
    "notificationOn": true,
    "pointsRequirements": 5
  }
}
```

### 4. Delete Service

**DELETE** `/api/auth/providers/services/{id}`

**Description**: Delete a service

**Response** (200 OK):

```json
{
  "success": true,
  "message": "Service deleted successfully"
}
```

## 🗂️ Queue Management

### 1. Get Queues

**GET** `/api/auth/providers/queues`

**Description**: Get all queues for the authenticated provider

**Query Parameters**:

- `isActive` (boolean, optional): Filter by active status
- `locationId` (integer, optional): Filter by location

**Response** (200 OK):

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Main Queue",
      "sProvidingPlaceId": 1,
      "serviceIds": [1, 2, 3],
      "isActive": true,
      "maxCapacity": 10,
      "currentCount": 3
    }
  ]
}
```

### 2. Create Queue

**POST** `/api/auth/providers/queues`

**Description**: Create a new queue

**Request Body**:

```json
{
  "title": "Emergency Queue",
  "sProvidingPlaceId": 1,
  "serviceIds": [1, 2],
  "maxCapacity": 5,
  "isActive": true
}
```

**Response** (201 Created):

```json
{
  "success": true,
  "message": "Queue created successfully",
  "data": {
    "id": 2,
    "title": "Emergency Queue",
    "sProvidingPlaceId": 1,
    "serviceIds": [1, 2],
    "isActive": true,
    "maxCapacity": 5,
    "currentCount": 0
  }
}
```

### 3. Update Queue

**PUT** `/api/auth/providers/queues/{id}`

**Description**: Update an existing queue

**Request Body**: Same as create queue

**Response** (200 OK):

```json
{
  "success": true,
  "message": "Queue updated successfully",
  "data": {
    "id": 1,
    "title": "Updated Queue Name",
    "sProvidingPlaceId": 1,
    "serviceIds": [1, 2, 3, 4],
    "isActive": true,
    "maxCapacity": 15,
    "currentCount": 3
  }
}
```

### 4. Delete Queue

**DELETE** `/api/auth/providers/queues/{id}`

**Description**: Delete a queue

**Response** (200 OK):

```json
{
  "success": true,
  "message": "Queue deleted successfully"
}
```

**Error** (500 Internal Server Error - if queue has future appointments):

```json
{
  "success": false,
  "message": "Cannot delete queue with future appointments"
}
```

## 📅 Appointment Management

### 1. Get Appointments

**GET** `/api/auth/providers/appointments`

**Description**: Get appointments for the authenticated provider

**Query Parameters**:

- `startDate` (string, ISO date): Filter appointments from date
- `endDate` (string, ISO date): Filter appointments to date
- `status` (string): Filter by status (scheduled, in-progress, completed, cancelled)
- `locationId` (integer): Filter by location
- `page` (integer): Page number for pagination
- `pageSize` (integer): Number of items per page

**Response** (200 OK):

```json
{
  "success": true,
  "data": {
    "appointments": [
      {
        "id": 1,
        "customerUserId": "f63f6d7f-4fde-46d8-98f6-b35209418f5f",
        "serviceId": 1,
        "placeId": 1,
        "queueId": 1,
        "startTime": "2024-01-15T10:00:00Z",
        "endTime": "2024-01-15T10:30:00Z",
        "status": "scheduled",
        "notes": "Regular checkup",
        "customer": {
          "firstName": "John",
          "lastName": "Doe",
          "phone": "+1234567890",
          "email": "john@example.com"
        },
        "service": {
          "title": "General Consultation",
          "duration": 30
        }
      }
    ],
    "pagination": {
      "page": 1,
      "pageSize": 20,
      "total": 1,
      "totalPages": 1
    }
  }
}
```

### 2. Create Appointment

**POST** `/api/auth/providers/appointments`

**Description**: Create a new appointment

**Request Body**:

```json
{
  "customerUserId": "f63f6d7f-4fde-46d8-98f6-b35209418f5f",
  "serviceId": 1,
  "placeId": 1,
  "queueId": 1,
  "startTime": "2024-01-15T14:00:00Z",
  "endTime": "2024-01-15T14:30:00Z",
  "notes": "Follow-up appointment"
}
```

**Response** (201 Created):

```json
{
  "success": true,
  "message": "Appointment created successfully",
  "data": {
    "id": 2,
    "customerUserId": "f63f6d7f-4fde-46d8-98f6-b35209418f5f",
    "serviceId": 1,
    "placeId": 1,
    "queueId": 1,
    "startTime": "2024-01-15T14:00:00Z",
    "endTime": "2024-01-15T14:30:00Z",
    "status": "scheduled",
    "notes": "Follow-up appointment"
  }
}
```

### 3. Update Appointment

**PUT** `/api/auth/providers/appointments/{id}`

**Description**: Update an existing appointment

**Request Body**: Same as create appointment

**Response** (200 OK):

```json
{
  "success": true,
  "message": "Appointment updated successfully",
  "data": {
    "id": 1,
    "customerUserId": "f63f6d7f-4fde-46d8-98f6-b35209418f5f",
    "serviceId": 1,
    "placeId": 1,
    "queueId": 1,
    "startTime": "2024-01-15T15:00:00Z",
    "endTime": "2024-01-15T15:30:00Z",
    "status": "scheduled",
    "notes": "Rescheduled appointment"
  }
}
```

### 4. Cancel Appointment

**PUT** `/api/auth/providers/appointments/{id}/cancel`

**Description**: Cancel an appointment

**Request Body**:

```json
{
  "reason": "Patient requested cancellation"
}
```

**Response** (200 OK):

```json
{
  "success": true,
  "message": "Appointment cancelled successfully",
  "data": {
    "id": 1,
    "status": "cancelled",
    "cancelReason": "Patient requested cancellation"
  }
}
```

### 5. Get Calendar View

**GET** `/api/auth/providers/appointments/calendar`

**Description**: Get appointments in calendar format

**Query Parameters**:

- `month` (integer): Month (1-12)
- `year` (integer): Year
- `locationId` (integer, optional): Filter by location

**Response** (200 OK):

````json
{
  "success": true,
  "data": {
    "2024-01-15": [
      {
        "id": 1,
        "startTime": "10:00",
        "endTime": "10:30",
        "customerName": "John Doe",
        "serviceName": "General Consultation",
        "status": "scheduled"
      }
    ],
    "2024-01-16": []
  }
}

## 👥 Customer Management

### 1. Get Customers
**GET** `/api/auth/providers/customers`

**Description**: Get customers for the authenticated provider

**Query Parameters**:
- `search` (string): Search by name, phone, or email
- `page` (integer): Page number for pagination
- `pageSize` (integer): Number of items per page

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "customers": [
      {
        "id": "f63f6d7f-4fde-46d8-98f6-b35209418f5f",
        "firstName": "John",
        "lastName": "Doe",
        "email": "john@example.com",
        "mobileNumber": "+1234567890",
        "nationalId": "1234567890",
        "dateOfBirth": "1990-01-15",
        "address": "123 Main St",
        "city": "Algiers",
        "notes": "Regular customer",
        "totalAppointments": 5,
        "lastAppointment": "2024-01-10T10:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "pageSize": 20,
      "total": 1,
      "totalPages": 1
    }
  }
}
````

### 2. Create Customer

**POST** `/api/auth/providers/customers`

**Description**: Create a new customer

**Request Body**:

```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane@example.com",
  "mobileNumber": "+1234567891",
  "nationalId": "1234567891",
  "dateOfBirth": "1985-05-20",
  "address": "456 Oak Ave",
  "city": "Oran",
  "notes": "New customer"
}
```

**Response** (201 Created):

```json
{
  "success": true,
  "message": "Customer created successfully",
  "data": {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "jane@example.com",
    "mobileNumber": "+1234567891",
    "nationalId": "1234567891",
    "dateOfBirth": "1985-05-20",
    "address": "456 Oak Ave",
    "city": "Oran",
    "notes": "New customer",
    "totalAppointments": 0,
    "lastAppointment": null
  }
}
```

### 3. Update Customer

**PUT** `/api/auth/providers/customers/{id}`

**Description**: Update an existing customer

**Request Body**: Same as create customer

**Response** (200 OK):

```json
{
  "success": true,
  "message": "Customer updated successfully",
  "data": {
    "id": "f63f6d7f-4fde-46d8-98f6-b35209418f5f",
    "firstName": "John",
    "lastName": "Doe Updated",
    "email": "john.updated@example.com",
    "mobileNumber": "+1234567890",
    "nationalId": "1234567890",
    "dateOfBirth": "1990-01-15",
    "address": "123 Main St Updated",
    "city": "Algiers",
    "notes": "Updated customer info",
    "totalAppointments": 5,
    "lastAppointment": "2024-01-10T10:00:00Z"
  }
}
```

### 4. Get Customer Details

**GET** `/api/auth/providers/customers/{id}`

**Description**: Get detailed information about a specific customer

**Response** (200 OK):

````json
{
  "success": true,
  "data": {
    "id": "f63f6d7f-4fde-46d8-98f6-b35209418f5f",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "mobileNumber": "+1234567890",
    "nationalId": "1234567890",
    "dateOfBirth": "1990-01-15",
    "address": "123 Main St",
    "city": "Algiers",
    "notes": "Regular customer",
    "totalAppointments": 5,
    "lastAppointment": "2024-01-10T10:00:00Z",
    "appointmentHistory": [
      {
        "id": 1,
        "date": "2024-01-10T10:00:00Z",
        "serviceName": "General Consultation",
        "status": "completed"
      }
    ]
  }
}

## 💬 Messaging System

### 1. Get Conversations
**GET** `/api/auth/mobile/conversations`

**Description**: Get all conversations for the authenticated provider

**Query Parameters**:
- `search` (string, optional): Search conversations
- `page` (integer): Page number for pagination
- `pageSize` (integer): Number of items per page

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "conversations": [
      {
        "id": 1,
        "customerId": "f63f6d7f-4fde-46d8-98f6-b35209418f5f",
        "customerName": "John Doe",
        "lastMessage": "Thank you for the appointment",
        "lastMessageTime": "2024-01-15T10:30:00Z",
        "unreadCount": 2,
        "isActive": true
      }
    ],
    "pagination": {
      "page": 1,
      "pageSize": 20,
      "total": 1,
      "totalPages": 1
    }
  }
}
````

### 2. Get Messages

**GET** `/api/auth/mobile/conversations/{conversationId}/messages`

**Description**: Get messages for a specific conversation

**Query Parameters**:

- `page` (integer): Page number for pagination
- `pageSize` (integer): Number of items per page

**Response** (200 OK):

```json
{
  "success": true,
  "data": {
    "messages": [
      {
        "id": 1,
        "conversationId": 1,
        "senderId": "provider_id",
        "senderType": "provider",
        "content": "Hello, how can I help you?",
        "timestamp": "2024-01-15T10:00:00Z",
        "isRead": true,
        "messageType": "text"
      },
      {
        "id": 2,
        "conversationId": 1,
        "senderId": "f63f6d7f-4fde-46d8-98f6-b35209418f5f",
        "senderType": "customer",
        "content": "I need to reschedule my appointment",
        "timestamp": "2024-01-15T10:15:00Z",
        "isRead": false,
        "messageType": "text"
      }
    ],
    "pagination": {
      "page": 1,
      "pageSize": 50,
      "total": 2,
      "totalPages": 1
    }
  }
}
```

### 3. Send Message

**POST** `/api/auth/mobile/conversations/{conversationId}/messages`

**Description**: Send a message in a conversation

**Request Body**:

```json
{
  "content": "Your appointment is confirmed for tomorrow at 10 AM",
  "messageType": "text"
}
```

**Response** (201 Created):

```json
{
  "success": true,
  "message": "Message sent successfully",
  "data": {
    "id": 3,
    "conversationId": 1,
    "senderId": "provider_id",
    "senderType": "provider",
    "content": "Your appointment is confirmed for tomorrow at 10 AM",
    "timestamp": "2024-01-15T10:30:00Z",
    "isRead": false,
    "messageType": "text"
  }
}
```

## 🔔 Notification Management

### 1. Get Notifications

**GET** `/api/auth/notifications`

**Description**: Get notifications for the authenticated provider

**Query Parameters**:

- `isRead` (boolean, optional): Filter by read status
- `type` (string, optional): Filter by notification type
- `page` (integer): Page number for pagination
- `pageSize` (integer): Number of items per page

**Response** (200 OK):

```json
{
  "success": true,
  "data": {
    "notifications": [
      {
        "id": 1,
        "title": "New Appointment",
        "message": "You have a new appointment scheduled for tomorrow",
        "type": "appointment",
        "isRead": false,
        "timestamp": "2024-01-15T09:00:00Z",
        "data": {
          "appointmentId": 1,
          "customerId": "f63f6d7f-4fde-46d8-98f6-b35209418f5f"
        }
      }
    ],
    "pagination": {
      "page": 1,
      "pageSize": 20,
      "total": 1,
      "totalPages": 1
    }
  }
}
```

### 2. Mark Notification as Read

**PUT** `/api/auth/notifications/{id}/read`

**Description**: Mark a notification as read

**Response** (200 OK):

```json
{
  "success": true,
  "message": "Notification marked as read"
}
```

### 3. Mark All Notifications as Read

**PUT** `/api/auth/notifications/read-all`

**Description**: Mark all notifications as read

**Response** (200 OK):

````json
{
  "success": true,
  "message": "All notifications marked as read"
}

## 📊 Dashboard Analytics

### 1. Get Business Overview
**GET** `/api/provider/dashboard/overview`

**Description**: Get business metrics and KPIs

**Response** (200 OK):
```json
{
  "success": true,
  "data": {
    "todayRevenue": 1250.00,
    "todayAppointments": 12,
    "activeQueues": 3,
    "customerSatisfaction": 4.8,
    "weeklyTrends": {
      "revenue": [800, 950, 1100, 1250, 1400, 1200, 1350],
      "appointments": [8, 10, 12, 12, 15, 11, 14]
    },
    "monthlyStats": {
      "totalRevenue": 28500.00,
      "totalAppointments": 285,
      "newCustomers": 45,
      "repeatCustomers": 240
    }
  }
}
````

### 2. Get Today's Schedule

**GET** `/api/provider/dashboard/schedule/today`

**Description**: Get today's schedule and queue status

**Response** (200 OK):

```json
{
  "success": true,
  "data": {
    "nextAppointment": {
      "id": 1,
      "customerName": "John Doe",
      "serviceName": "General Consultation",
      "startTime": "2024-01-15T14:00:00Z",
      "location": "Main Clinic"
    },
    "queueStatuses": [
      {
        "queueId": 1,
        "queueName": "Main Queue",
        "currentCount": 3,
        "maxCapacity": 10,
        "estimatedWaitTime": 45
      }
    ],
    "todayHours": {
      "openTime": "08:00",
      "closeTime": "18:00",
      "isOpen": true
    },
    "totalAppointmentsToday": 15,
    "completedAppointments": 8,
    "upcomingAppointments": 7
  }
}
```

### 3. Get Quick Stats

**GET** `/api/provider/dashboard/quick-stats`

**Description**: Get real-time counters and quick statistics

**Response** (200 OK):

```json
{
  "success": true,
  "data": {
    "todayRevenue": 1250.0,
    "todayAppointments": 12,
    "waitingCustomers": 5,
    "activeQueues": 3,
    "unreadMessages": 8,
    "pendingReschedules": 2,
    "customerSatisfactionToday": 4.9,
    "averageWaitTime": 25
  }
}
```

## ❌ Error Responses

### Common Error Codes

#### 400 Bad Request

```json
{
  "success": false,
  "message": "Invalid request data",
  "errors": {
    "email": ["Email is required"],
    "password": ["Password must be at least 8 characters"]
  }
}
```

#### 401 Unauthorized

```json
{
  "success": false,
  "message": "Authentication required"
}
```

#### 403 Forbidden

```json
{
  "success": false,
  "message": "Access denied"
}
```

#### 404 Not Found

```json
{
  "success": false,
  "message": "Resource not found"
}
```

#### 422 Unprocessable Entity

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "field_name": ["Validation error message"]
  }
}
```

#### 500 Internal Server Error

```json
{
  "success": false,
  "message": "Internal server error"
}
```

## 🔧 API Behavior Notes

### Important Considerations

1. **Status Codes**: Validation errors may return 500 instead of 400
2. **Authentication**: Some auth errors return 400 instead of 401
3. **Foreign Keys**: Constraint violations return 500 status codes
4. **Response Fields**: Some documented fields may not be included in actual responses
5. **Required Fields**: Always check current API behavior for required fields

### Rate Limiting

- **Limit**: 1000 requests per hour per authenticated user
- **Headers**: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`

### Pagination

- **Default Page Size**: 20 items
- **Maximum Page Size**: 100 items
- **Response Format**: Includes `pagination` object with `page`, `pageSize`, `total`, `totalPages`

This comprehensive API specification provides all the endpoints, request/response formats, and
implementation details needed for the React Native migration.

```

```

```

```
