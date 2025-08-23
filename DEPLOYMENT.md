# 🚀 CharchaHub Deployment Guide

This guide will help you deploy CharchaHub to Render (backend) and Vercel (frontend).

## 📋 Prerequisites

1. **GitHub Account**: Code repository
2. **MongoDB Atlas Account**: Cloud database
3. **Render Account**: Backend hosting
4. **Vercel Account**: Frontend hosting

## 🔧 Pre-Deployment Setup

### 1. MongoDB Atlas Setup
1. Create a MongoDB Atlas cluster
2. Get your connection string (replace username/password)
3. Whitelist all IP addresses (0.0.0.0/0) for Render

### 2. Environment Variables Setup

#### Backend Environment Variables (for Render):
```bash
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/charchahub?retryWrites=true&w=majority&appName=Cluster0&ssl=true&authSource=admin&connectTimeoutMS=10000&socketTimeoutMS=10000
CORS_ALLOWED_ORIGINS=https://your-app-name.vercel.app
SERVER_PORT=8080
```

#### Frontend Environment Variables (for Vercel):
```bash
REACT_APP_API_URL=https://your-backend-app.onrender.com/api
```

## 🚀 Deployment Steps

### Step 1: Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Deploy CharchaHub: Add Docker support and environment variables"

# Add remote origin (replace with your repo URL)
git remote add origin https://github.com/yourusername/CharchaHub.git

# Push to main branch
git push -u origin main
```

### Step 2: Deploy Backend to Render

1. **Go to [Render](https://render.com)** and sign in
2. **Click "New" → "Web Service"**
3. **Connect your GitHub repository**
4. **Configuration**:
   - Name: `charchahub-backend`
   - Root Directory: `backend`
   - Build Command: *Auto-detected (Docker)*
   - Start Command: *Auto-detected (Docker)*
5. **Add Environment Variables**:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `CORS_ALLOWED_ORIGINS`: `https://your-app-name.vercel.app` (update after deploying frontend)
   - `SERVER_PORT`: `8080`
6. **Click "Create Web Service"**
7. **Wait for deployment** (takes 5-10 minutes)
8. **Note your backend URL**: `https://your-backend-app.onrender.com`

### Step 3: Deploy Frontend to Vercel

1. **Go to [Vercel](https://vercel.com)** and sign in
2. **Click "New Project"**
3. **Import your GitHub repository**
4. **Configuration**:
   - Framework Preset: Create React App
   - Root Directory: `frontend`
   - Build Command: `npm run build` (auto-detected)
   - Install Command: `npm install` (auto-detected)
5. **Add Environment Variables**:
   - `REACT_APP_API_URL`: `https://your-backend-app.onrender.com/api`
6. **Click "Deploy"**
7. **Wait for deployment** (takes 2-5 minutes)
8. **Note your frontend URL**: `https://your-app-name.vercel.app`

### Step 4: Update CORS Settings

1. **Go back to Render** (backend service)
2. **Update Environment Variables**:
   - Change `CORS_ALLOWED_ORIGINS` to your actual Vercel URL
3. **Redeploy** the backend service

## 🧪 Testing Your Deployment

1. **Visit your frontend URL**
2. **Create a new room** - should work
3. **Join the room** - should connect
4. **Send messages** - should work in real-time
5. **Upload images** - should work
6. **Check browser console** for any errors

## 🔧 Troubleshooting

### Common Issues:

1. **CORS Errors**:
   - Ensure `CORS_ALLOWED_ORIGINS` matches your Vercel URL exactly
   - No trailing slash in the URL

2. **MongoDB Connection Issues**:
   - Check MongoDB Atlas network access (whitelist 0.0.0.0/0)
   - Verify connection string format
   - Ensure database user has proper permissions

3. **WebSocket Connection Fails**:
   - Check that both HTTP and WebSocket endpoints use the same base URL
   - Verify Render service is running and healthy

4. **Build Failures**:
   - Check Render build logs for Java/Docker issues
   - Check Vercel build logs for React/Node issues

### Health Checks:

- **Backend Health**: `https://your-backend-app.onrender.com/api/health`
- **Frontend**: Should load the main page

## 🎉 Success!

Once deployed, your CharchaHub application will be live with:
- ✅ Real-time messaging
- ✅ Image sharing
- ✅ Cartoon avatars
- ✅ Theme switching
- ✅ Mobile-responsive design
- ✅ Auto-expiring rooms (24 hours)

## 🔄 Future Updates

To update your deployment:

1. **Make changes locally**
2. **Commit and push** to GitHub
3. **Render and Vercel** will auto-deploy from main branch

---

**Need help?** Check the GitHub repository issues or create a new issue for support!
