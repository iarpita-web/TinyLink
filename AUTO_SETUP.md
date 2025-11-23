# 🚀 Automated Database Setup Guide

## Step 1: Get Your Neon Database (2 minutes)

I cannot do this for you, but here's the exact steps:

1. **Open this link**: https://neon.tech
2. **Click "Sign Up"** (top right)
   - You can use GitHub, Google, or email
   - It's 100% free, no credit card needed
3. **After signing in, click "Create Project"**
   - Project name: `tinylink` (or any name)
   - Region: Choose closest to you
   - Click "Create Project"
4. **Copy the connection string**
   - After project creation, you'll see a connection string
   - It looks like: `postgresql://neondb_owner:xxxxx@ep-xxx-xxx.region.neon.tech/neondb?sslmode=require`
   - Click the "Copy" button next to it

## Step 2: Add It Automatically

Once you have your connection string, run this command (replace with YOUR actual string):

```bash
node scripts/add-db-url.js "YOUR_CONNECTION_STRING_HERE"
```

## Step 3: Test & Start

```bash
# Test the connection
npm run test-db

# If test passes, start the server
npm run dev
```

## That's it! 🎉

Your app will be running at http://localhost:3000

---

## Quick Copy-Paste Commands

**After you get your connection string from Neon:**

1. Copy your connection string from Neon dashboard
2. Run this (replace YOUR_STRING with what you copied):
   ```bash
   node scripts/add-db-url.js "YOUR_STRING"
   ```
3. Test it:
   ```bash
   npm run test-db
   ```
4. Start the app:
   ```bash
   npm run dev
   ```

---

## Need Help?

- The connection string should start with `postgresql://`
- Make sure to include the quotes when running the command
- If you see errors, run `npm run test-db` to see what's wrong




