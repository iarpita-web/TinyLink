# How to Add Your Database Connection String

## Quick Steps

### Step 1: Get Your Connection String

**From Neon (Recommended):**
1. Go to https://neon.tech
2. Sign up (free, no credit card)
3. Create a new project
4. Copy the connection string (it looks like: `postgresql://user:pass@ep-xxx-xxx.region.neon.tech/dbname?sslmode=require`)

### Step 2: Add to .env.local

**Method A: Using the script (Easiest)**
```bash
node scripts/add-db-url.js "your_connection_string_here"
```

**Method B: Manual Edit**
1. Open `.env.local` file in your project root
2. Find the line: `DATABASE_URL=`
3. Replace it with: `DATABASE_URL=your_connection_string_here`
4. Save the file

**Example .env.local:**
```
# Database Connection String
DATABASE_URL=postgresql://user:password@ep-xxx-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
```

### Step 3: Test Your Connection
```bash
npm run test-db
```

If you see ✅ success messages, you're all set!

### Step 4: Restart Your Server
```bash
# Stop the current server (Ctrl+C)
npm run dev
```

## Troubleshooting

**"DATABASE_URL is not set"**
- Make sure `.env.local` exists in the project root (same folder as `package.json`)
- Check that the line starts with `DATABASE_URL=` (no spaces)
- Make sure there are no quotes around the connection string

**Connection fails**
- Verify your connection string is correct
- Make sure it starts with `postgresql://` or `postgres://`
- Check your internet connection
- Run `npm run test-db` for detailed error messages

## Need a Database?

Get a free PostgreSQL database from:
- **Neon**: https://neon.tech (recommended)
- **Supabase**: https://supabase.com
- **Railway**: https://railway.app

