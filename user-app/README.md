# User Portal App

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

- ✅ Check feature flag status without authentication
- ✅ Input organization ID and feature key
- ✅ Display enabled/disabled status
- ✅ Clean UI with Tailwind CSS
- ✅ TypeScript
- ✅ Simple, single-page app

## File Structure

```
src/
├── pages/
│   └── Home.tsx         # Main check page
├── services/            # API client
│   └── apiClient.ts
├── types/               # TypeScript types
│   └── index.ts
├── App.tsx
├── main.tsx
└── index.css
```

## API Endpoint Used

- `POST /api/feature/check` - Check if feature is enabled

## Usage

1. Enter Organization ID (from Super Admin)
2. Enter Feature Key (created by Admin)
3. Click "Check Status"
4. See if feature is enabled or disabled

## Example

- Organization ID: `507f1f77bcf86cd799439011`
- Feature Key: `new_dashboard`
- Result: ✓ ENABLED or ✗ DISABLED
