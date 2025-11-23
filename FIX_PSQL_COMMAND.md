# Fix: "psql 'postgresql://..." Error

## The Problem

You copied the **psql command** instead of just the **connection string**.

**What you have (WRONG):**
```
psql 'postgresql://neondb_owner:password@host.neon.tech/dbname?sslmode=require'
```

**What you need (CORRECT):**
```
postgresql://neondb_owner:password@host.neon.tech/dbname?sslmode=require
```

## Quick Fix

### Step 1: Get Just the Connection String

1. Go to https://console.neon.tech
2. Open your project
3. Click **"Connection Details"**
4. Select **"Direct connection"**
5. You'll see something like:
   ```
   psql 'postgresql://neondb_owner:password@ep-xxx-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require'
   ```
6. **Copy ONLY the part inside the quotes:**
   ```
   postgresql://neondb_owner:password@ep-xxx-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require
   ```
   - Don't copy `psql`
   - Don't copy the quotes `'` or `"`
   - Just copy the `postgresql://...` part

### Step 2: Update in Vercel

1. Go to https://vercel.com/dashboard
2. Click **tiny-link-woad** project
3. **Settings** → **Environment Variables**
4. Find `DATABASE_URL`
5. Click **Edit**
6. **Delete everything** in the value field
7. **Paste ONLY the connection string** (without `psql` and quotes)
8. Should look like:
   ```
   postgresql://neondb_owner:password@ep-xxx-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require
   ```
9. **Save**

### Step 3: Verify

Before saving, check:
- ✅ Starts with `postgresql://` (no `psql` before it)
- ✅ No quotes around it
- ✅ No `psql` command
- ✅ Is 80-100+ characters long
- ✅ Contains `@ep-xxx-xxx.us-east-1.aws.neon.tech`
- ✅ Ends with `?sslmode=require`

### Step 4: Redeploy

- Vercel will auto-redeploy
- Wait 1-2 minutes
- Visit your site - error should be gone!

## Visual Guide

**❌ WRONG (what you have now):**
```
psql 'postgresql://neondb_owner:password@host.neon.tech/dbname?sslmode=require'
```

**✅ CORRECT (what you need):**
```
postgresql://neondb_owner:password@host.neon.tech/dbname?sslmode=require
```

Just copy the part between the quotes!

