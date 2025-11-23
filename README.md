# TinyLink - URL Shortener

A modern URL shortener service built with Next.js, PostgreSQL, and Tailwind CSS.

## 📁 Project Structure

The project is organized into clear client/server/database separation:

```
TinyLink/
├── app/                    # Next.js App Router
│   ├── api/               # Backend API Routes (Server-side)
│   │   └── links/         # Link management endpoints
│   ├── [code]/            # Redirect handler (Server-side)
│   ├── code/              # Stats pages (Frontend)
│   └── page.jsx           # Dashboard (Frontend)
│
├── components/            # React Components (Frontend)
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── LinkForm.jsx
│   └── LinkTable.jsx
│
├── client/                # Client-side utilities (Frontend)
│   └── utils.js          # Client utilities (truncate, format, copy)
│
├── server/                # Server-side utilities (Backend)
│   └── utils.js          # Server utilities (validation, code generation)
│
├── database/              # Database files
│   └── schema.sql        # Database schema documentation
│
└── lib/
    └── database/          # Database connection
        └── connection.js # PostgreSQL connection pool
```

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Database
```bash
# Option 1: Use setup script
node scripts/setup-env.js

# Option 2: Manual setup
# Create .env.local with:
DATABASE_URL=postgresql://user:pass@host.neon.tech/dbname?sslmode=require
```

### 3. Test Database Connection
```bash
npm run test-db
```

### 4. Run Development Server
```bash
npm run dev
```

Visit http://localhost:3000

## 📚 Understanding the Structure

### Frontend (Client-side)
- **`app/page.jsx`** - Main dashboard
- **`app/code/[code]/page.jsx`** - Link statistics page
- **`components/`** - Reusable React components
- **`client/utils.js`** - Client-side helper functions

### Backend (Server-side)
- **`app/api/links/route.js`** - API endpoints (GET, POST)
- **`app/api/links/[code]/route.js`** - API endpoints (GET, DELETE)
- **`app/[code]/route.js`** - Redirect handler (302 redirect)
- **`server/utils.js`** - Server-side validation and utilities

### Database
- **`lib/database/connection.js`** - PostgreSQL connection pool
- **`database/schema.sql`** - Database schema documentation

## 🔧 Features

- ✅ Create short links with optional custom codes
- ✅ View click statistics
- ✅ Delete links
- ✅ Search and filter links
- ✅ Responsive design
- ✅ Health check endpoint

## 📖 Documentation

- **`PROJECT_STRUCTURE.md`** - Detailed project structure explanation
- **`SETUP_DATABASE.md`** - Database setup guide
- **`DEPLOYMENT.md`** - Deployment instructions
- **`VERCEL_SETUP.md`** - Vercel-specific setup

## 🌐 Deployment

See `DEPLOYMENT.md` for detailed deployment instructions.

### Quick Deploy to Vercel

1. Push to GitHub
2. Import project in Vercel
3. Add `DATABASE_URL` environment variable
4. Deploy!

## 📝 License

MIT
