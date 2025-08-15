# 🚀 Deployment Guide - Farm Management Software

## Deploying Backend to Render

### Step 1: Prepare Your Repository
1. **Push your code to GitHub** (make sure it's public or you have Render connected to your GitHub)
2. **Ensure all files are committed** including the updated CORS configuration

### Step 2: Create Render Account
1. Go to https://render.com
2. Sign up with your GitHub account
3. Connect your GitHub repository

### Step 3: Create Web Service
1. **Click "New +"** → **"Web Service"**
2. **Connect your repository** (farm-management-software)
3. **Configure the service:**
   - **Name:** `farm-app-backend`
   - **Region:** Choose closest to your users
   - **Branch:** `main` (or your default branch)
   - **Root Directory:** `backend`
   - **Runtime:** `Node`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`

### Step 4: Environment Variables
In the Render dashboard, add these environment variables:

**Required Variables:**
```
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/farm-app
JWT_SECRET=your-super-secret-jwt-key-make-it-very-long-and-random
JWT_EXPIRES_IN=7d
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

**Optional Variables:**
```
WEATHER_API_KEY=your-weather-api-key
GOOGLE_MAPS_API_KEY=your-google-maps-api-key
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### Step 5: MongoDB Setup
**Option A: MongoDB Atlas (Recommended)**
1. Go to https://mongodb.com/atlas
2. Create free cluster
3. Create database user
4. Whitelist Render's IP addresses (or use 0.0.0.0/0 for all IPs)
5. Get connection string and add to MONGODB_URI

**Option B: MongoDB on Render**
1. Create a new service → Database → MongoDB
2. Use the internal connection string

### Step 6: Deploy
1. **Click "Create Web Service"**
2. **Wait for deployment** (usually 2-5 minutes)
3. **Check logs** for any errors
4. **Test the health endpoint:** `https://your-app.onrender.com/health`

### Step 7: Update Frontend CORS
Once deployed, update your frontend to use the new backend URL:
```javascript
// In your frontend API configuration
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend.onrender.com/api'
  : 'http://localhost:3001/api'
```

---

## Deploying Frontend to Vercel

### Step 1: Prepare Frontend
1. **Update API URLs** in your frontend code
2. **Build and test locally:** `npm run build`

### Step 2: Deploy to Vercel
1. Go to https://vercel.com
2. Import your GitHub repository
3. **Configure:**
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

### Step 3: Environment Variables
Add these to Vercel:
```
VITE_API_URL=https://your-backend.onrender.com/api
VITE_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
```

### Step 4: Update Backend CORS
Update your backend CORS configuration with your Vercel URL:
```typescript
origin: [
  'https://your-frontend.vercel.app',
  'http://localhost:5173'
]
```

---

## Post-Deployment Checklist

### ✅ Backend Verification
- [ ] Health endpoint responds: `/health`
- [ ] API endpoints work: `/api/farms`
- [ ] Database connection successful
- [ ] CORS headers present
- [ ] Authentication working

### ✅ Frontend Verification
- [ ] App loads without errors
- [ ] API calls successful
- [ ] Authentication flow works
- [ ] All features functional

### ✅ Security Checklist
- [ ] Environment variables secured
- [ ] CORS properly configured
- [ ] HTTPS enabled
- [ ] Database access restricted
- [ ] JWT secrets are strong

---

## Troubleshooting

### Common Issues

**Build Fails:**
- Check Node.js version compatibility
- Ensure all dependencies are in package.json
- Check TypeScript compilation errors

**CORS Errors:**
- Verify frontend URL in CORS configuration
- Check environment variables
- Ensure credentials: true is set

**Database Connection:**
- Verify MongoDB URI format
- Check network access settings
- Ensure database user has correct permissions

**Environment Variables:**
- Double-check variable names (case-sensitive)
- Ensure no trailing spaces
- Verify values are correct

### Render-Specific Issues

**Service Won't Start:**
- Check build logs in Render dashboard
- Verify start command is correct
- Ensure PORT environment variable is set

**Slow Cold Starts:**
- Free tier has cold starts after inactivity
- Consider upgrading to paid plan for production

---

## Monitoring & Maintenance

### Health Monitoring
- Use `/health` endpoint for uptime monitoring
- Set up alerts for service downtime
- Monitor response times

### Logs
- Check Render logs for errors
- Set up log aggregation if needed
- Monitor database performance

### Updates
- Use GitHub integration for automatic deployments
- Test changes in staging environment first
- Keep dependencies updated

---

## Cost Optimization

### Free Tier Limits
- **Render Free:** 750 hours/month, sleeps after 15min inactivity
- **MongoDB Atlas Free:** 512MB storage, shared clusters
- **Vercel Free:** 100GB bandwidth, unlimited static sites

### Upgrade Considerations
- **Render Starter ($7/month):** No sleep, custom domains
- **MongoDB Atlas Shared ($9/month):** Dedicated resources
- **Vercel Pro ($20/month):** More bandwidth, analytics

---

**Your backend will be available at:** `https://your-app-name.onrender.com`
**Your frontend will be available at:** `https://your-app-name.vercel.app`
