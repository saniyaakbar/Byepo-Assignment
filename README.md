<img width="1908" height="725" alt="image" src="https://github.com/user-attachments/assets/e269ca09-a5e9-4b41-8267-95c6edc8ae1d" />

<img width="1422" height="740" alt="image" src="https://github.com/user-attachments/assets/eb6deb5a-53ce-42f2-bf16-03145ec88490" />

<img width="1882" height="831" alt="image" src="https://github.com/user-attachments/assets/2f799ea4-7e2c-46ca-b3e1-af63153a5965" />

<img width="1846" height="860" alt="image" src="https://github.com/user-attachments/assets/1fc6ef4a-8778-4784-9c2a-28fed4336c0d" />


# Feature Flag Management System

A **production-ready** full-stack multi-tenant application for managing feature flags with role-based access control, JWT authentication, TypeScript strict mode, and comprehensive security hardening. Built with React 18, Express 4, MongoDB, and Tailwind CSS.

**Status**: ✅ Production-ready | ✅ Zero TypeScript errors | ✅ Security hardened | ✅ End-to-end tested

---

## 1. Project Overview

This system enables organizations to manage feature flags for A/B testing, gradual feature rollouts, and feature management. The application follows a **three-tiered role-based architecture**:

- **Super Admins** - Create and manage organizations
- **Organization Admins** - Create, toggle, and manage feature flags for their organization  
- **End Users** - Check if specific features are enabled for their organization

**Key Features:**
- Complete multi-tenancy with data isolation per organization
- JWT-based stateless authentication with 7-day token expiry
- Type-safe React applications with strict TypeScript
- Clean, minimal Tailwind CSS UI
- Production-ready error handling with user-friendly messages
- Full E2E workflows (Super Admin → Admin → User)
- Edge case handling (invalid IDs, expired tokens, network failures)

---

## 2. Tech Stack

### Backend
| Component | Version | Purpose |
|-----------|---------|---------|
| Node.js | v16+ | Runtime |
| Express | 4.18.2 | Web framework |
| MongoDB + Mongoose | 7.5.0 | Database & ODM |
| JWT (jsonwebtoken) | 9.0.0 | Authentication |
| bcryptjs | 2.4.3 | Password hashing (10 salt rounds) |
| CORS | - | Cross-origin requests |
| nodemon | 3.1.14 | Development auto-restart |

### Frontend (All 3 Apps)
| Component | Version | Purpose |
|-----------|---------|---------|
| React | 18.2.0 | UI framework |
| TypeScript | 5.2.0 | Type safety (strict mode) |
| Vite | 5.0.0 | Build tool with HMR |
| Tailwind CSS | 3.3.0 | Utility-first CSS styling |
| Axios | 1.5.0 | HTTP client with interceptors |
| React Router | 6.14.0 | Navigation (admin/superadmin apps) |

---

## 3. Features & Capabilities

### Super Admin App (Port 3002)
- ✅ Login with super admin credentials
- ✅ Create new organizations
- ✅ View list of all organizations with creation timestamps
- ✅ User-friendly error messages for all operations

### Admin App (Port 3001)
- ✅ Signup with valid organization ID
- ✅ Login to admin dashboard
- ✅ Create new feature flags
- ✅ View all feature flags for organization
- ✅ Toggle feature flags on/off in real-time
- ✅ Automatic UI updates on flag changes

### User App (Port 3003)
- ✅ Public feature flag checker (no authentication required)
- ✅ Enter organization ID and feature key to check status
- ✅ Instant response with feature enabled/disabled status
- ✅ Helpful status display with visual feedback

### Security & Data Integrity
- ✅ Passwords hashed with bcryptjs (10 rounds)
- ✅ JWT tokens with 7-day expiry
- ✅ Organization-based data isolation
- ✅ Role-based access control (RBAC)
- ✅ Input validation on all endpoints
- ✅ MongoDB ObjectId validation for all references
- ✅ Secure error handling (never exposes internal details)

---

## 4. Architecture

### Project Structure
```
Byepo assignment/
├── backend/                    # Express API server
│   ├── src/
│   │   ├── index.js           # Server entry point
│   │   ├── models/            # Mongoose schemas (User, Organization, FeatureFlag)
│   │   ├── routes/            # API endpoints
│   │   ├── middleware/        # Auth, CORS, error handling
│   │   └── utils/             # Validation helpers
│   ├── .env.example           # Environment template
│   ├── package.json
│   └── node_modules/
│
├── admin-app/                  # Admin React SPA
│   ├── src/
│   │   ├── components/        # Reusable React components
│   │   ├── pages/             # Page components (Auth, Dashboard)
│   │   ├── services/          # API client with interceptors
│   │   ├── context/           # AuthContext for state
│   │   ├── types/             # TypeScript interfaces
│   │   ├── App.tsx            # Main app component
│   │   └── index.css          # Tailwind CSS
│   ├── tailwind.config.js     # Tailwind configuration
│   ├── tsconfig.json          # TypeScript strict mode
│   └── vite.config.ts         # Vite build config
│
├── superadmin-app/            # Super Admin React SPA (same structure)
├── user-app/                  # Public User React SPA (same structure)
└── README.md                  # This file
```

### API Architecture
```
All three apps → Express Backend (Port 5000)
                     ↓
              MongoDB Atlas
```

### Data Models
1. **User** - Email, password hash, organization ID, role
2. **Organization** - Name, created timestamp
3. **FeatureFlag** - Key, enabled status, organization ID, timestamps

---

## 5. Setup Instructions

### Prerequisites
- Node.js v16+ and npm
- MongoDB Atlas account (free tier available)
- Modern web browser

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables** (see Section 6)

4. **Start development server:**
   ```bash
   npm run dev
   ```
   Server runs on `http://localhost:5000`

### Admin App Setup

1. **Navigate to admin-app directory:**
   ```bash
   cd admin-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables** (see Section 6)

4. **Start development server:**
   ```bash
   npm run dev
   ```
   App runs on `http://localhost:3001`

### Super Admin App Setup

1. **Navigate to superadmin-app directory:**
   ```bash
   cd superadmin-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables** (see Section 6)

4. **Start development server:**
   ```bash
   npm run dev
   ```
   App runs on `http://localhost:3002`

### User App Setup

1. **Navigate to user-app directory:**
   ```bash
   cd user-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables** (see Section 6)

4. **Start development server:**
   ```bash
   npm run dev
   ```
   App runs on `http://localhost:3003`

---

## 6. Environment Variables

### Backend (.env)
```
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/feature-flags-db?retryWrites=true&w=majority

# Authentication
JWT_SECRET=your-super-secret-key-here
JWT_EXPIRE=7d

# Super Admin
SUPERADMIN_EMAIL=admin@system.com
SUPERADMIN_PASSWORD=SuperAdmin@123
```

### Frontend Apps (.env)
```
VITE_API_URL=http://localhost:5000/api
```

**Note:** Never commit `.env` files. Use `.env.example` as template.

---

## 7. How to Run

### Running All Services (Recommended)

1. **Terminal 1 - Start Backend:**
   ```bash
   cd backend
   npm run dev
   ```
   Wait for: "Server running on port 5000"

2. **Terminal 2 - Start Admin App:**
   ```bash
   cd admin-app
   npm run dev
   ```

3. **Terminal 3 - Start Super Admin App:**
   ```bash
   cd superadmin-app
   npm run dev
   ```

4. **Terminal 4 - Start User App:**
   ```bash
   cd user-app
   npm run dev
   ```

### Building for Production

Each app can be built independently:

```bash
# Backend (no build step - runs directly)

# Admin App
cd admin-app
npm run build

# Super Admin App
cd superadmin-app
npm run build

# User App
cd user-app
npm run build
```

### Running Tests

```bash
# TypeScript compilation check (all apps)
npm run build  # Fails if TypeScript errors exist

# Backend only has runtime - test via API calls
# Frontend apps must be visually tested in browser
```

---

## 8. API Endpoints

### Organization Management (Super Admin)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/org/login` | Login as super admin | None |
| POST | `/api/org/create` | Create new organization | JWT |
| GET | `/api/org/list` | List all organizations | JWT |

### User Management (Admin)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/signup` | Admin signup with organization ID | None |
| POST | `/api/auth/login` | Admin login | None |

### Feature Flags (Admin)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/feature/create` | Create new feature flag | JWT |
| GET | `/api/feature/list` | List all flags for organization | JWT |
| PUT | `/api/feature/:flagId` | Toggle feature flag on/off | JWT |

### Public Feature Flag Checking (User)

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/feature/check` | Check if feature is enabled | None |

**Response Format:**
```json
{
  "success": true,
  "message": "Feature flag retrieved",
  "data": { /* response data */ },
  "_id": "MongoDB ObjectId",
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

---

## 9. Assumptions & Design Decisions

### Architectural Assumptions
1. **Multi-Tenancy:** All operations are isolated by `organizationId` - each org sees only their own data
2. **Stateless Authentication:** JWT tokens eliminate need for server-side sessions
3. **Three Separate SPAs:** Each user role has a dedicated frontend app for better UX and security boundaries
4. **Single Backend:** All three apps share the same API to maintain consistency and simplify deployment

### Security Assumptions
1. **HTTPS in Production:** The `.env` files contain sensitive data - must use HTTPS in production
2. **Token Expiry:** 7-day JWT expiry requires users to re-authenticate weekly
3. **Password Hashing:** All passwords are hashed with 10 salt rounds before storage
4. **No API Keys:** The system uses JWT only - no separate API key management

### Data Assumptions
1. **ObjectId Format:** Organization IDs must be valid MongoDB ObjectIds (24 hex characters)
2. **Feature Keys:** Unique per organization - cannot create duplicate keys
3. **Timestamps:** All records include `createdAt` and `updatedAt` timestamps
4. **Soft Delete:** No soft delete implemented - deletions are hard
5. **Audit Logging:** No audit logs - operations are not tracked historically

### Error Handling Assumptions
1. **User-Friendly Messages:** All errors shown to users are generic, never exposing technical details
2. **No Stack Traces:** Backend never exposes stack traces to frontend
3. **Graceful Degradation:** Frontend handles network failures with fallback messages
4. **Input Validation:** All user inputs are validated before processing

### Deployment Assumptions
1. **MongoDB Atlas:** Uses cloud MongoDB - no local database needed
2. **Environment Variables:** All sensitive data via `.env` files
3. **CORS Enabled:** Frontend apps on different ports require CORS middleware
4. **No Database Seeding:** Uses default super admin credentials only
5. **Hot Reload:** Development uses nodemon (backend) and Vite HMR (frontend)

---

## 10. Troubleshooting & Notes

### Common Issues

**Port Already in Use**
```bash
# Kill process on port (Windows)
taskkill /F /IM node.exe

# Kill process on port (Mac/Linux)
lsof -ti:5000 | xargs kill -9
```

**MongoDB Connection Failed**
- Check MONGODB_URI is correct in `.env`
- Verify MongoDB Atlas cluster is running
- Ensure IP address is whitelisted in MongoDB Atlas

**TypeScript Errors**
- Run `npm run build` to see all errors
- Check that all imports are correct
- Verify no `any` types are used (strict mode enabled)

**API 404 Errors**
- Verify backend is running on port 5000
- Check `VITE_API_URL` environment variable in frontend
- Ensure request method (GET/POST/PUT) is correct

**Auth Token Expired**
- Logout and login again to get new token
- Tokens expire after 7 days
- Clear localStorage if issues persist

### Production Readiness Checklist
- ✅ Zero TypeScript compilation errors
- ✅ All `any` types eliminated
- ✅ Error messages user-friendly (no technical details)
- ✅ Input validation on all endpoints
- ✅ MongoDB ObjectId validation on all references
- ✅ JWT authentication with 7-day expiry
- ✅ CORS properly configured
- ✅ Environment variables properly configured
- ✅ All three apps build successfully
- ✅ E2E workflows tested (Super Admin → Admin → User)

---

## Quick Start (TL;DR)

```bash
# 1. Backend
cd backend && npm install && npm run dev

# 2. Admin App (new terminal)
cd admin-app && npm install && npm run dev

# 3. Super Admin App (new terminal)
cd superadmin-app && npm install && npm run dev

# 4. User App (new terminal)
cd user-app && npm install && npm run dev

# 5. Visit in browser
# Super Admin: http://localhost:3002 (admin@system.com / SuperAdmin@123)
# Admin: http://localhost:3001 (after signup with org ID)
# User: http://localhost:3003 (check feature status)
```

---

**Built with ❤️ for technical interview submission** | TypeScript • React • Express • MongoDB

---

## ?? Features

### Super Admin
- ?? Hardcoded login (email: admin@system.com, password: SuperAdmin@123)
- ? Create organizations
- ?? View all organizations
- ?? Manage multi-tenant system

### Admin
- ?? Sign up with organization ID
- ?? Login with email/password
- ? Create feature flags
- ?? Toggle flags (enable/disable)
- ?? View all flags for organization
- ??? Role-based access control

### End User
- ?? Check feature flag status
- ?? View enabled/disabled status
- ?? No authentication required (public API)

Note:
For simplicity and per assignment requirements, the User App allows checking feature flags using orgId + featureKey without authentication.

In a real-world system, users would be authenticated and scoped to their organization via JWT.

### System Features
- ?? **Multi-tenancy** - Complete data isolation per organization
- ??? **Role-based Access Control** - ADMIN, SUPERADMIN roles
- ?? **JWT Authentication** - Secure API endpoints
- ? **Error Handling** - Clean, user-friendly error messages
- ??? **MongoDB Atlas** - Cloud-based persistence
- ?? **Responsive UI** - Works on desktop and mobile

#   B y e p o - A s s i g n m e n t 
 
 
