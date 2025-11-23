# Vercel Deployment Setup

## Quick Fix for Database Connection

The error `getaddrinfo ENOTFOUND` usually means:
1. Database is paused (Neon pauses inactive databases)
2. Using wrong connection string (pooler vs direct)

## Steps to Fix:

### 1. Check Neon Database
- Go to https://console.neon.tech
- Check if your database shows "Paused"
- If paused, click "Resume" or "Start"

### 2. Get Correct Connection String
- In Neon dashboard, go to your project
- Click "Connection Details"
- **Use "Direct connection"** (not "Pooled connection")
- Copy the connection string

### 3. Update Vercel Environment Variables
- Go to Vercel dashboard → Your Project → Settings → Environment Variables
- Add/Update: `DATABASE_URL`
- Paste your **direct connection string** from Neon
- Make sure to add for: Production, Preview, and Development
- **Important:** No quotes, no spaces, single line

### 4. Connection String Format
Should look like:
```
postgresql://neondb_owner:password@ep-xxx-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require
```

NOT:
```
postgresql://...@ep-xxx-xxx-pooler.c-2.us-east-1.aws.neon.tech/...
```

### 5. Redeploy
- After updating environment variables, trigger a new deployment
- Or push a new commit to trigger auto-deploy

## Build Error Fix

The healthz route conflict is already fixed (page.jsx deleted).

Make sure only `app/healthz/route.js` exists for the API endpoint.

## Testing After Deployment

1. Visit: `https://your-app.vercel.app/healthz`
   - Should return: `{"ok":true,"version":"1.0","uptime":...}`

2. Visit: `https://your-app.vercel.app/`
   - Should show dashboard

3. Create a test link
   - Should work if database connection is correct

## Common Issues

**Database paused:**
- Resume in Neon dashboard
- Wait 30 seconds for it to start

**Wrong connection string:**
- Use "Direct connection" not "Pooled connection"
- Make sure it includes `?sslmode=require`

**Environment variable not set:**
- Double-check in Vercel Settings → Environment Variables
- Make sure it's added for the right environment (Production)

