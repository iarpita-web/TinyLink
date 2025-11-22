# TinyLink - URL Shortener

A modern URL shortener web application built with Next.js, PostgreSQL, and Tailwind CSS. Similar to bit.ly, it allows users to shorten URLs, view click statistics, and manage links.

## Features

- ✅ Create short links with optional custom codes
- ✅ URL validation before saving
- ✅ Redirect functionality with click tracking
- ✅ Delete links (returns 404 after deletion)
- ✅ Dashboard with table view, search, and filtering
- ✅ Individual stats page for each link
- ✅ Health check endpoint
- ✅ Clean, responsive UI with proper error states
- ✅ Form validation and user feedback

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: JavaScript
- **Database**: PostgreSQL (Neon)
- **Styling**: Tailwind CSS
- **Deployment**: Vercel (recommended)

## Prerequisites

- Node.js 18+ installed
- PostgreSQL database (Neon, Supabase, or any PostgreSQL provider)
- npm or yarn package manager

## Quick Start

**New to this project?** See [QUICK_START.md](./QUICK_START.md) for a step-by-step guide.

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Database

**Option A: Interactive Setup (Recommended)**
```bash
node scripts/setup-env.js
```

**Option B: Manual Setup**

1. Get a free PostgreSQL database:
   - [Neon](https://neon.tech) (recommended - free)
   - [Supabase](https://supabase.com) (free tier available)
   - [Railway](https://railway.app) (free tier available)

2. Create `.env.local` file:
   ```env
   DATABASE_URL=your_postgresql_connection_string
   ```

3. Test your connection:
   ```bash
   npm run test-db
   ```

For detailed database setup instructions, see [SETUP_DATABASE.md](./SETUP_DATABASE.md).

### 3. Initialize Database

The database schema will be automatically created on first API call. The application creates a `links` table with the following structure:

- `id` (SERIAL PRIMARY KEY)
- `code` (VARCHAR(8) UNIQUE) - Short code (6-8 alphanumeric characters)
- `target_url` (TEXT) - Original URL
- `click_count` (INTEGER) - Number of clicks
- `created_at` (TIMESTAMP) - Creation time
- `last_clicked_at` (TIMESTAMP) - Last click time

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production

```bash
npm run build
npm start
```

## API Endpoints

### Create Link
- **POST** `/api/links`
- Body: `{ "url": "https://example.com", "code": "optional" }`
- Returns: 201 with link data, or 409 if code exists

### List All Links
- **GET** `/api/links`
- Returns: Array of all links

### Get Link Stats
- **GET** `/api/links/:code`
- Returns: Link data or 404 if not found

### Delete Link
- **DELETE** `/api/links/:code`
- Returns: Success or 404 if not found

## Pages & Routes

- `/` - Dashboard (list, add, delete links)
- `/code/:code` - Stats page for a specific link
- `/:code` - Redirect to original URL (302) or 404
- `/healthz` - Health check endpoint

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add `DATABASE_URL` environment variable
4. Deploy!

### Database Setup (Neon)

1. Sign up at [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string
4. Add it to your Vercel environment variables

## Code Validation Rules

- Custom codes must be 6-8 alphanumeric characters: `[A-Za-z0-9]{6,8}`
- URLs must be valid HTTP/HTTPS URLs
- Codes are globally unique across all users

## Testing Checklist

- [x] `/healthz` returns 200
- [x] Creating a link works
- [x] Duplicate codes return 409
- [x] Redirect works and increments click count
- [x] Deletion stops redirect (404)
- [x] UI meets expectations (layout, states, validation, responsiveness)

## Project Structure

```
tinylink/
├── app/
│   ├── api/
│   │   ├── links/
│   │   │   ├── route.ts          # POST, GET /api/links
│   │   │   └── [code]/route.ts   # GET, DELETE /api/links/:code
│   ├── [code]/
│   │   └── route.ts              # Redirect handler
│   ├── code/
│   │   └── [code]/page.tsx       # Stats page
│   ├── healthz/
│   │   ├── route.ts              # Health API
│   │   └── page.tsx              # Health page
│   ├── layout.tsx
│   ├── page.tsx                  # Dashboard
│   └── globals.css
├── components/
│   ├── Header.tsx
│   ├── LinkForm.tsx
│   └── LinkTable.tsx
├── lib/
│   ├── db.ts                     # Database connection
│   └── utils.ts                  # Utility functions
└── package.json
```

## Notes

- The application uses Next.js App Router
- Database connection pooling is handled automatically
- All API routes follow RESTful conventions
- UI is fully responsive and includes proper loading/error states
- Form validation happens both client-side and server-side

## License

This project is created for educational purposes.

