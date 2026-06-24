# Super Admin Portal

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

- ✅ Login with hardcoded super admin credentials
- ✅ Create new organizations
- ✅ List all organizations with IDs
- ✅ Clean UI with Tailwind CSS
- ✅ TypeScript

## Default Credentials

- Email: `admin@system.com`
- Password: `SuperAdmin@123`

## File Structure

```
src/
├── components/          # UI components
│   ├── LoginForm.tsx
│   ├── CreateOrgModal.tsx
│   ├── OrgList.tsx
│   └── Header.tsx
├── context/             # Auth context
│   └── AuthContext.tsx
├── pages/               # Page components
│   ├── Auth.tsx         # Login page
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

- `POST /api/org/login` - Super admin login
- `POST /api/org/create` - Create organization
- `GET /api/org/list` - List all organizations

## Usage

1. Login with hardcoded credentials
2. Click "+ Create Organization" button
3. Enter organization name
4. View list of all organizations with their IDs
5. Share organization IDs with admins for signup in Admin App
