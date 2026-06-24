# Admin Dashboard App

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

## Environment Variables

Edit `.env`:
```
VITE_API_URL=http://localhost:5000/api
```

## Features

- ✅ Signup/Login for organization admins
- ✅ Create feature flags
- ✅ Toggle flags on/off
- ✅ List all flags
- ✅ JWT token storage (localStorage)
- ✅ Clean UI with Tailwind CSS
- ✅ TypeScript

## File Structure

```
src/
├── components/          # Reusable UI components
│   ├── LoginForm.tsx
│   ├── SignupForm.tsx
│   ├── Header.tsx
│   ├── CreateFlagModal.tsx
│   ├── FlagList.tsx
│   └── ProtectedRoute.tsx
├── context/             # Auth context
│   └── AuthContext.tsx
├── pages/               # Page components
│   ├── Auth.tsx         # Login/Signup page
│   └── Dashboard.tsx    # Main dashboard
├── services/            # API client
│   └── apiClient.ts
├── types/               # TypeScript types
│   └── index.ts
├── App.tsx
├── main.tsx
└── index.css
```

## API Endpoints Used

- `POST /api/auth/signup` - Admin signup
- `POST /api/auth/login` - Admin login
- `POST /api/feature/create` - Create flag
- `GET /api/feature/list` - List flags
- `PUT /api/feature/:flagId` - Toggle flag

## Key Features

### Authentication
- Signup with email, password, and organizationId
- Login with email and password
- JWT token stored in localStorage
- Auto-redirect to dashboard if logged in

### Feature Flag Management
- Create new flags (disabled by default)
- Toggle flags on/off
- View all flags in a table
- See creation date and current status

### Error Handling
- User-friendly error messages
- Try-catch blocks on all API calls
- Loading states

### UI/UX
- Clean, minimal Tailwind CSS design
- Loading indicators
- Form validation
- Modal for creating flags
- Responsive layout
