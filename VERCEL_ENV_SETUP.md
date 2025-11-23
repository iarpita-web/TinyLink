# How to Add DATABASE_URL to Vercel

## Quick Steps

### Step 1: Get Your Connection String from Neon

1. Go to https://console.neon.tech
2. Sign in to your account
3. Click on your project (the one you created earlier)
4. Click **"Connection Details"** or look for the connection string
5. **Important:** Select **"Direct connection"** (NOT "Pooled connection")
6. Copy the connection string

**Example format:**
```
postgresql://neondb_owner:password@ep-xxx-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require
```

### Step 2: Add to Vercel

1. Go to https://vercel.com/dashboard
2. Click on your project: **tiny-link-woad**
3. Go to **Settings** (top menu)
4. Click **Environment Variables** (left sidebar)
5. Click **"Add New"** button
6. Fill in:
   - **Name:** `DATABASE_URL`
   - **Value:** Paste your connection string from Neon
   - **Environments:** Check all three:
     - ✅ Production
     - ✅ Preview  
     - ✅ Development
7. Click **"Save"**

### Step 3: Redeploy

After saving:
- Vercel will automatically trigger a new deployment
- Or go to **Deployments** tab and click **"Redeploy"** on the latest deployment

### Step 4: Verify

1. Wait for deployment to complete (1-2 minutes)
2. Visit: https://tiny-link-woad.vercel.app/
3. The error should be gone and dashboard should load

## Troubleshooting

**Still seeing "Database not configured"?**
- Double-check the environment variable name is exactly `DATABASE_URL` (case-sensitive)
- Make sure you added it for Production environment
- Check that the connection string has no spaces or line breaks
- Verify the connection string starts with `postgresql://`

**Connection timeout errors?**
- Make sure you're using "Direct connection" not "Pooled connection"
- Check if your Neon database is paused (resume it if needed)
- Verify the connection string includes `?sslmode=require`

**Need to check if it's set?**
- In Vercel, go to Settings → Environment Variables
- You should see `DATABASE_URL` listed
- The value will be hidden (shows as dots) for security

## Quick Checklist

- [ ] Got connection string from Neon (Direct connection)
- [ ] Added DATABASE_URL to Vercel environment variables
- [ ] Selected all environments (Production, Preview, Development)
- [ ] Saved the environment variable
- [ ] Redeployed (or waited for auto-redeploy)
- [ ] Checked the site - error should be gone

