# Deployment Guide

## Vercel Deployment

### Prerequisites
1. GitHub repository with your code
2. Vercel account (free)
3. Neon PostgreSQL database

### Steps

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to https://vercel.com
   - Click "Import Project"
   - Select your GitHub repository
   - Vercel will auto-detect Next.js

3. **Add Environment Variables**
   - In Vercel dashboard, go to Settings → Environment Variables
   - Add: `DATABASE_URL` with your Neon connection string
   - Make sure to add it for Production, Preview, and Development

4. **Important: Fix Healthz Route**
   - Make sure only `app/healthz/route.js` exists (not `page.jsx`)
   - The route.js provides the API endpoint
   - If you need a UI page, use a different path like `/health`

5. **Redeploy**
   - After adding environment variables, redeploy
   - Your app should be live!

## Database Connection Issues

### If you see "getaddrinfo ENOTFOUND" error:

1. **Check if database is paused**
   - Go to Neon dashboard
   - Check if your database is paused
   - Resume it if needed

2. **Use direct connection (not pooler)**
   - In Neon dashboard, get the "Direct connection" string
   - Not the "Pooled connection" string
   - Direct connection format: `postgresql://user:pass@ep-xxx-xxx.region.aws.neon.tech/neondb?sslmode=require`

3. **Verify connection string**
   - Make sure there are no line breaks
   - Make sure it starts with `postgresql://`
   - Check SSL mode is set: `?sslmode=require`

## Environment Variables for Vercel

Add these in Vercel dashboard (Settings → Environment Variables):

```
DATABASE_URL=postgresql://username:password@host.neon.tech/dbname?sslmode=require
```

Make sure to:
- Add for all environments (Production, Preview, Development)
- Use the exact connection string from Neon
- No quotes around the value
- No spaces

## Troubleshooting

### Build Fails
- Check build logs in Vercel
- Make sure all dependencies are in package.json
- Verify Next.js version compatibility

### Database Connection Fails
- Verify DATABASE_URL is set in Vercel
- Check if database is paused in Neon
- Try direct connection instead of pooler
- Check Neon dashboard for connection issues

### Healthz Route Error
- Make sure only `app/healthz/route.js` exists
- Delete `app/healthz/page.jsx` if it exists
- The route.js provides the API endpoint

