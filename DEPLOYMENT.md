# Vercel Deployment Guide

This guide explains how to deploy the entire full-stack Feature Flags system on Vercel.

## Project Structure

```
/api                        # Serverless API handler
/backend                    # Express backend (source)
/admin-app                  # React admin dashboard
/superadmin-app             # React super admin dashboard
/user-app                   # React user app
/vercel.json                # Vercel configuration
```

## Deployment Architecture

### Backend (Serverless)
- Runs as a Vercel serverless function
- Hosted at: `https://your-project.vercel.app/api`
- Routes: `/api/org/*`, `/api/auth/*`, `/api/feature/*`

### Frontends (Static/SPAs)
- Three separate Vite applications
- Can be deployed as separate Vercel projects or combined
- Each frontend calls the backend API via `VITE_API_URL`

## Prerequisites

1. **Vercel Account**: [Sign up at vercel.com](https://vercel.com)
2. **MongoDB Atlas**: [Set up a cluster](https://mongodb.com/cloud/atlas)
3. **GitHub Repository**: Push this project to GitHub
4. **Node.js 18+**: Required for building

## Step 1: Set Up MongoDB Atlas

1. Create a MongoDB Atlas cluster
2. Get your connection string: `mongodb+srv://user:password@cluster.mongodb.net/dbname`
3. Save this for later

## Step 2: Deploy Backend API

### Option A: Deploy Backend Only (Recommended)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import this repository
3. Select "Monorepo" setup
4. In **Root Directory**, leave as `.`
5. Override the build command:
   ```
   cd backend && npm install && npm run build:vercel
   ```
6. Add **Environment Variables**:
   ```
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/dbname
   JWT_SECRET=<generate-strong-random-string>
   SUPERADMIN_EMAIL=admin@system.com
   SUPERADMIN_PASSWORD=<strong-password>
   ```
7. Deploy

**Note**: You need a build script for backend. Add this to `backend/package.json`:
```json
"build:vercel": "echo 'Backend ready for Vercel'"
```

### Option B: Deploy Full Monorepo with Frontends

Use the `vercel.json` configuration already created. The backend will be at `/api`.

## Step 3: Configure Frontends

### For Each Frontend App (admin-app, superadmin-app, user-app)

#### Option A: Separate Vercel Projects

1. Create a new Vercel project for each frontend
2. Select the root directory: `admin-app`, `superadmin-app`, or `user-app`
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. Add Environment Variables:
   ```
   VITE_API_URL=https://your-backend-api.vercel.app/api
   ```

#### Option B: Combined Deployment

The `vercel.json` is already configured to handle all three frontends.

## Step 4: Environment Variables Reference

### Backend (.env)
```
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/dbname
JWT_SECRET=your-strong-secret-key-here
JWT_EXPIRE=7d
SUPERADMIN_EMAIL=admin@system.com
SUPERADMIN_PASSWORD=strong-admin-password
```

### Frontend Apps (.env)
```
VITE_API_URL=https://your-api-url.vercel.app/api
```

For local development:
```
VITE_API_URL=http://localhost:5000/api
```

## Step 5: Deploy Frontends

### If using separate Vercel projects:

1. **admin-app**:
   ```bash
   vercel --prod
   ```
   Set `VITE_API_URL` to your backend API URL

2. **superadmin-app**:
   ```bash
   vercel --prod
   ```
   Set `VITE_API_URL` to your backend API URL

3. **user-app**:
   ```bash
   vercel --prod
   ```
   Set `VITE_API_URL` to your backend API URL

## Step 6: Verify Deployment

1. **Test Backend Health**:
   ```bash
   curl https://your-project.vercel.app/api/health
   ```
   Expected response:
   ```json
   {"status": "OK", "timestamp": "2024-01-01T12:00:00Z"}
   ```

2. **Test Frontends**:
   - Visit each frontend URL in browser
   - Check console for API connectivity
   - Try login flow

3. **Test E2E Flow**:
   - Super Admin login: `admin@system.com` / `SuperAdmin@123`
   - Create organization
   - Create admin account
   - Login as admin
   - Create feature flag
   - Test in user app

## Troubleshooting

### Issue: 404 on API routes

**Solution**: Ensure `vercel.json` routes are configured correctly:
```json
{
  "routes": [
    { "src": "/api/(.*)", "dest": "/api/index.js" }
  ]
}
```

### Issue: CORS errors

**Solution**: Backend enables CORS for all origins. If needed, restrict in `backend/src/index.js`:
```javascript
app.use(cors({
  origin: ['https://your-admin.vercel.app', 'https://your-user.vercel.app'],
  credentials: true
}));
```

### Issue: 401 Unauthorized

**Solution**: Check JWT_SECRET is the same across deployments

### Issue: MongoDB connection fails

**Solution**: 
1. Verify connection string is correct
2. Whitelist Vercel IPs in MongoDB Atlas (or allow all: `0.0.0.0/0`)
3. Check database name matches

### Issue: Frontend shows "Something went wrong"

**Solution**:
1. Check VITE_API_URL is set correctly
2. Verify backend is running at that URL
3. Check browser console for actual error messages
4. Verify CORS settings

## Local Development

Before deploying, test locally:

```bash
# Install dependencies
cd backend && npm install
cd ../admin-app && npm install
cd ../superadmin-app && npm install
cd ../user-app && npm install

# Terminal 1: Start backend
cd backend
npm run dev

# Terminal 2-4: Start frontends
cd admin-app && npm run dev
cd superadmin-app && npm run dev
cd user-app && npm run dev
```

Access:
- Admin: http://localhost:3001
- SuperAdmin: http://localhost:3002
- User: http://localhost:3003
- Backend: http://localhost:5000

## Security Checklist

Before production deployment:

- [ ] Change JWT_SECRET to a strong random value
- [ ] Change SUPERADMIN_PASSWORD to a strong password
- [ ] Use MongoDB Atlas with IP whitelist (or strong auth)
- [ ] Enable HTTPS (Vercel does this automatically)
- [ ] Set NODE_ENV=production
- [ ] Review CORS settings
- [ ] Verify no `.env` files are committed (only `.env.example`)
- [ ] Set strong MongoDB credentials
- [ ] Enable MongoDB backups

## Advanced Configuration

### Custom Domain

1. Go to Vercel project settings
2. Add custom domain
3. Update DNS records as instructed
4. Update frontend API URLs if needed

### CI/CD

Vercel automatically deploys on:
- Push to main branch
- Pull requests (preview deployments)

Configure in `vercel.json` or Vercel dashboard settings.

### Scaling

- **Backend**: Vercel serverless scales automatically
- **Frontends**: CDN-distributed static files (automatic)
- **Database**: Scale MongoDB Atlas cluster as needed

## Support

For issues:
1. Check Vercel logs: `vercel logs`
2. Check browser console for frontend errors
3. Review backend logs in Vercel dashboard
4. Test locally first

## References

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Express Serverless](https://vercel.com/guides/using-express-with-vercel)
