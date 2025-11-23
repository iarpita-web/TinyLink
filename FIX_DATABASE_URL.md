# Fix "getaddrinfo ENOTFOUND base" Error

## The Problem

The error "getaddrinfo ENOTFOUND base" means your `DATABASE_URL` in Vercel is:
- Set to a placeholder value like "base" or "your_connection_string"
- Incomplete or corrupted
- Not a valid PostgreSQL connection string

## Solution: Update DATABASE_URL in Vercel

### Step 1: Get Correct Connection String from Neon

1. Go to https://console.neon.tech
2. Sign in and open your project
3. Click **"Connection Details"** or look for connection string
4. **IMPORTANT:** Select **"Direct connection"** (NOT "Pooled connection")
5. Copy the **entire** connection string

**Correct format should be:**
```
postgresql://neondb_owner:your_password@ep-xxx-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require
```

**NOT:**
- `postgresql://...@ep-xxx-xxx-pooler...` (pooler connection)
- `base` or `your_connection_string` (placeholders)
- Any string shorter than 50 characters

### Step 2: Update in Vercel

1. Go to https://vercel.com/dashboard
2. Click your project: **tiny-link-woad**
3. Go to **Settings** → **Environment Variables**
4. Find `DATABASE_URL` in the list
5. Click the **pencil/edit icon** (or delete and recreate)
6. **Delete the old value** (which probably says "base" or similar)
7. **Paste your correct Neon connection string**
8. Make sure all environments are selected:
   - ✅ Production
   - ✅ Preview
   - ✅ Development
9. Click **"Save"**

### Step 3: Verify the Value

Before saving, make sure:
- ✅ Starts with `postgresql://` or `postgres://`
- ✅ Contains `@ep-xxx-xxx.us-east-1.aws.neon.tech` (or similar region)
- ✅ Ends with `?sslmode=require`
- ✅ Is at least 80-100 characters long
- ✅ NO placeholder text like "base", "your_connection_string", etc.

### Step 4: Redeploy

- Vercel will auto-redeploy after saving
- Or manually redeploy from Deployments tab
- Wait 1-2 minutes

### Step 5: Test

Visit https://tiny-link-woad.vercel.app/
- Error should be gone
- Dashboard should load
- You can create links

## Common Mistakes

❌ **Using pooled connection** - Use "Direct connection" instead
❌ **Leaving placeholder text** - Make sure it's the actual connection string
❌ **Adding quotes** - Don't wrap the value in quotes
❌ **Line breaks** - Must be on a single line
❌ **Wrong environment** - Make sure Production is selected

## Still Having Issues?

1. **Double-check in Neon:**
   - Make sure database is not paused
   - Resume it if needed
   - Get a fresh connection string

2. **Verify in Vercel:**
   - Go to Settings → Environment Variables
   - Check that DATABASE_URL value looks correct (it will be hidden/masked)
   - Delete and recreate if unsure

3. **Test locally first:**
   - Add to `.env.local`
   - Run `npm run test-db`
   - If it works locally, use the same string in Vercel

