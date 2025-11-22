# Database Setup Guide

This guide will help you set up a free PostgreSQL database for TinyLink.

## Option 1: Neon (Recommended - Free PostgreSQL)

1. **Sign up for Neon**
   - Go to https://neon.tech
   - Click "Sign Up" (you can use GitHub, Google, or email)
   - It's completely free!

2. **Create a New Project**
   - After signing in, click "Create Project"
   - Choose a project name (e.g., "tinylink")
   - Select a region closest to you
   - Click "Create Project"

3. **Get Your Connection String**
   - Once your project is created, you'll see a connection string
   - It looks like: `postgresql://username:password@ep-xxx-xxx.region.neon.tech/dbname?sslmode=require`
   - Click "Copy" to copy the connection string

4. **Add to Your Project**
   - Create a file named `.env.local` in the project root
   - Add this line (replace with your actual connection string):
     ```
     DATABASE_URL=postgresql://username:password@ep-xxx-xxx.region.neon.tech/dbname?sslmode=require
     ```

5. **Test the Connection**
   - Run: `npm run test-db` (or use the test script we created)
   - If successful, you're all set!

## Option 2: Supabase (Alternative Free PostgreSQL)

1. Go to https://supabase.com
2. Sign up and create a new project
3. Go to Settings → Database
4. Copy the connection string
5. Add it to `.env.local` as `DATABASE_URL`

## Option 3: Railway (Alternative)

1. Go to https://railway.app
2. Sign up and create a new PostgreSQL database
3. Copy the connection string
4. Add it to `.env.local`

## After Setup

Once you've added your `DATABASE_URL` to `.env.local`:

1. **Restart your dev server** (if it's running):
   ```bash
   # Stop the server (Ctrl+C)
   npm run dev
   ```

2. **The database will auto-initialize** when you first use the app (create a link)

3. **Verify it's working**:
   - Visit http://localhost:3000
   - Try creating a short link
   - If it works, you're done!

## Troubleshooting

- **"DATABASE_URL is not set"**: Make sure `.env.local` exists and has the correct variable name
- **Connection timeout**: Check your internet connection and firewall settings
- **SSL errors**: Make sure your connection string includes `?sslmode=require` for Neon

## Security Note

- Never commit `.env.local` to git (it's already in `.gitignore`)
- Keep your connection string secret
- For production, use environment variables in your hosting platform (Vercel, etc.)


