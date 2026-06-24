# Multi-Tenant Feature Flag Management System - Backend

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── database.js        # MongoDB connection
│   │   └── constants.js       # App constants (roles, etc.)
│   ├── controllers/
│   │   ├── orgController.js         # Super admin org operations
│   │   ├── authController.js        # Admin auth (signup/login)
│   │   └── featureFlagController.js # Feature flag CRUD & checking
│   ├── middleware/
│   │   ├── auth.js            # JWT protection & role authorization
│   │   └── errorHandler.js    # Global error handling
│   ├── models/
│   │   ├── Organization.js    # Organization schema
│   │   ├── User.js            # User schema with password hashing
│   │   └── FeatureFlag.js     # Feature flag schema
│   ├── routes/
│   │   ├── orgRoutes.js       # Super admin routes
│   │   ├── authRoutes.js      # Admin auth routes
│   │   └── featureFlagRoutes.js # Feature flag routes
│   ├── utils/
│   │   └── tokenUtils.js      # JWT token generation
│   └── index.js               # Express app setup
├── .env.example               # Environment template
├── .gitignore
├── package.json
└── README.md
```

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Set Up Environment Variables
```bash
cp .env.example .env
```

Edit `.env` with your values:
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/feature-flags-db
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
SUPERADMIN_EMAIL=admin@system.com
SUPERADMIN_PASSWORD=SuperAdmin@123
```

### 3. Start MongoDB
```bash
# If using MongoDB locally
mongod
```

### 4. Run the Server
```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

Server will run on `http://localhost:5000`

---

## API Documentation

### Authentication Header
For protected routes, include:
```
Authorization: Bearer <your_jwt_token>
```

---

## Super Admin APIs

### 1. Super Admin Login
**POST** `/api/org/login`

Authenticate as super admin using hardcoded credentials.

**Request:**
```json
{
  "email": "admin@system.com",
  "password": "SuperAdmin@123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "superadmin-id",
    "email": "admin@system.com",
    "role": "superadmin",
    "organizationId": null
  }
}
```

---

### 2. Create Organization
**POST** `/api/org/create`

Create a new organization (Super Admin only).

**Headers:**
```
Authorization: Bearer <superadmin_token>
```

**Request:**
```json
{
  "name": "Acme Corporation"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Acme Corporation",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### 3. List All Organizations
**GET** `/api/org/list`

Get all organizations (Super Admin only).

**Headers:**
```
Authorization: Bearer <superadmin_token>
```

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Acme Corporation",
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    },
    {
      "_id": "507f1f77bcf86cd799439012",
      "name": "TechStart Inc",
      "createdAt": "2024-01-15T11:00:00Z",
      "updatedAt": "2024-01-15T11:00:00Z"
    }
  ]
}
```

---

## Admin APIs (Organization Admin)

### 1. Admin Signup
**POST** `/api/auth/signup`

Register a new admin for an organization.

**Request:**
```json
{
  "email": "admin@acme.com",
  "password": "SecurePass@123",
  "organizationId": "507f1f77bcf86cd799439011"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439020",
    "email": "admin@acme.com",
    "role": "admin",
    "organizationId": "507f1f77bcf86cd799439011"
  }
}
```

---

### 2. Admin Login
**POST** `/api/auth/login`

Login as an organization admin.

**Request:**
```json
{
  "email": "admin@acme.com",
  "password": "SecurePass@123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439020",
    "email": "admin@acme.com",
    "role": "admin",
    "organizationId": "507f1f77bcf86cd799439011"
  }
}
```

---

### 3. Create Feature Flag
**POST** `/api/feature/create`

Create a new feature flag (Admin only).

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Request:**
```json
{
  "key": "new_dashboard",
  "enabled": false
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439030",
    "key": "new_dashboard",
    "enabled": false,
    "organizationId": "507f1f77bcf86cd799439011",
    "createdAt": "2024-01-15T12:00:00Z",
    "updatedAt": "2024-01-15T12:00:00Z"
  }
}
```

---

### 4. Toggle Feature Flag
**PUT** `/api/feature/:flagId`

Update (toggle) a feature flag (Admin only).

**Headers:**
```
Authorization: Bearer <admin_token>
```

**URL Parameters:**
- `flagId`: The ID of the feature flag

**Request:**
```json
{
  "enabled": true
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439030",
    "key": "new_dashboard",
    "enabled": true,
    "organizationId": "507f1f77bcf86cd799439011",
    "createdAt": "2024-01-15T12:00:00Z",
    "updatedAt": "2024-01-15T12:10:00Z"
  }
}
```

---

### 5. List Feature Flags
**GET** `/api/feature/list`

Get all feature flags for the admin's organization (Admin only).

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439030",
      "key": "new_dashboard",
      "enabled": true,
      "organizationId": "507f1f77bcf86cd799439011",
      "createdAt": "2024-01-15T12:00:00Z",
      "updatedAt": "2024-01-15T12:10:00Z"
    },
    {
      "_id": "507f1f77bcf86cd799439031",
      "key": "dark_mode",
      "enabled": false,
      "organizationId": "507f1f77bcf86cd799439011",
      "createdAt": "2024-01-15T12:05:00Z",
      "updatedAt": "2024-01-15T12:05:00Z"
    }
  ]
}
```

---

## End User API

### Check Feature Flag Status
**POST** `/api/feature/check`

Check if a feature flag is enabled for an organization (Public - no auth required).

**Request:**
```json
{
  "organizationId": "507f1f77bcf86cd799439011",
  "featureKey": "new_dashboard"
}
```

**Response (Feature Enabled):**
```json
{
  "success": true,
  "enabled": true
}
```

**Response (Feature Disabled or Not Found):**
```json
{
  "success": true,
  "enabled": false,
  "message": "Feature flag not found, returning disabled"
}
```

---

## Error Responses

All errors follow this format:

```json
{
  "success": false,
  "message": "Error description"
}
```

### Common Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (missing/invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Server Error

---

## Database Models

### Organization
```javascript
{
  _id: ObjectId,
  name: String,
  createdAt: Date,
  updatedAt: Date
}
```

### User
```javascript
{
  _id: ObjectId,
  email: String (unique),
  password: String (hashed),
  role: "superadmin" | "admin",
  organizationId: ObjectId (null for superadmin),
  createdAt: Date,
  updatedAt: Date
}
```

### FeatureFlag
```javascript
{
  _id: ObjectId,
  key: String,
  enabled: Boolean,
  organizationId: ObjectId,
  createdAt: Date,
  updatedAt: Date
}
```

Unique index: `{ key: 1, organizationId: 1 }`

---

## Key Features

✅ **Multi-Tenant Architecture** - Organizations are isolated
✅ **JWT Authentication** - Stateless auth with token-based access
✅ **Role-Based Access Control** - Super Admin, Admin, User roles
✅ **Password Hashing** - Bcryptjs for secure password storage
✅ **Error Handling** - Centralized error middleware
✅ **Environment Variables** - Configurable via .env
✅ **Input Validation** - Schema-level validation with Mongoose
✅ **Unique Constraints** - Feature keys are unique per organization

---

## Next Steps: Frontend Setup

After backend is working, we'll build three React + TypeScript apps:
1. **Admin Dashboard** - For organization admins (create/toggle feature flags)
2. **Super Admin Portal** - For system admins (manage organizations)
3. **User Portal** - For end users (check feature flag status)

Each will be a separate repository/folder with independent build/deployment.
