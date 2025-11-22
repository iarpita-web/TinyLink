# Quick Start Guide

## Step 1: Set Up Database (2 minutes)

### Option A: Use the Setup Script (Easiest)
```bash
node scripts/setup-env.js
```
This will guide you through creating your `.env.local` file.

### Option B: Manual Setup
1. **Get a free PostgreSQL database:**
   - Go to https://neon.tech (recommended)
   - Sign up (free, no credit card needed)
   - Create a new project
   - Copy your connection string

2. **Create `.env.local` file:**
   ```bash
   # Create the file
   echo DATABASE_URL=your_connection_string_here > .env.local
   ```
   Or manually create `.env.local` and add:
   ```
   DATABASE_URL=postgresql://username:password@host.neon.tech/dbname?sslmode=require
   ```

## Step 2: Test Database Connection
```bash
npm run test-db
```
If you see ✅ success messages, you're good to go!

## Step 3: Start the App
```bash
npm run dev
```

## Step 4: Open in Browser
Visit: http://localhost:3000

The database will automatically create the required tables on first use.

---

## Troubleshooting

**"DATABASE_URL is not set"**
- Make sure `.env.local` exists in the project root
- Check that it contains `DATABASE_URL=...`

**Connection failed**
- Run `npm run test-db` to see detailed error messages
- Verify your connection string is correct
- Check your internet connection

**Still having issues?**
- See `SETUP_DATABASE.md` for detailed instructions
- Check the terminal for error messages


