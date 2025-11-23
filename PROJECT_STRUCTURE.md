# Project Structure

This document explains the organization of the TinyLink project.

## 📁 Folder Structure

```
TinyLink/
├── app/                    # Next.js App Router (Frontend + API Routes)
│   ├── api/               # Backend API Routes (Server-side)
│   │   └── links/         # Link management API endpoints
│   ├── [code]/            # Dynamic route for redirects (Server-side)
│   ├── code/              # Stats page (Frontend)
│   ├── page.jsx           # Dashboard page (Frontend)
│   └── layout.jsx         # Root layout (Frontend)
│
├── components/            # React Components (Frontend)
│   ├── Header.jsx         # Navigation header
│   ├── Footer.jsx         # Footer component
│   ├── LinkForm.jsx       # Form to create short links
│   └── LinkTable.jsx      # Table to display links
│
├── client/                # Client-side utilities (Frontend)
│   └── utils.js           # Client utility functions
│
├── server/                # Server-side utilities (Backend)
│   └── utils.js           # Server utility functions (validation, code generation)
│
├── database/              # Database related files
│   └── schema.sql         # Database schema documentation
│
├── lib/                   # Shared libraries
│   └── database/          # Database connection and initialization
│       └── connection.js  # PostgreSQL connection pool
│
├── scripts/               # Utility scripts
│   ├── setup-env.js       # Environment setup helper
│   ├── test-db.js         # Database connection tester
│   └── ...
│
└── Configuration files
    ├── package.json        # Dependencies and scripts
    ├── next.config.js     # Next.js configuration
    ├── tailwind.config.js # Tailwind CSS configuration
    └── jsconfig.json      # JavaScript/TypeScript path aliases
```

## 🎯 Separation of Concerns

### Frontend (Client-side)
- **Location**: `app/` (pages), `components/`, `client/`
- **Purpose**: User interface, React components, client-side logic
- **Files**:
  - `app/page.jsx` - Dashboard
  - `app/code/[code]/page.jsx` - Stats page
  - `components/*.jsx` - React components
  - `client/utils.js` - Client utilities (truncate, format, copy)

### Backend (Server-side)
- **Location**: `app/api/`, `server/`, `lib/database/`
- **Purpose**: API endpoints, business logic, database operations
- **Files**:
  - `app/api/links/route.js` - Link CRUD operations
  - `app/[code]/route.js` - Redirect handler
  - `server/utils.js` - Server utilities (validation, code generation)
  - `lib/database/connection.js` - Database connection

### Database
- **Location**: `database/`, `lib/database/`
- **Purpose**: Database schema, connection management
- **Files**:
  - `database/schema.sql` - Schema documentation
  - `lib/database/connection.js` - Connection pool and initialization

## 🔄 Data Flow

```
User Action (Frontend)
    ↓
React Component (components/)
    ↓
API Request (fetch)
    ↓
API Route (app/api/)
    ↓
Server Utils (server/utils.js)
    ↓
Database Connection (lib/database/connection.js)
    ↓
PostgreSQL Database
```

## 📝 Import Paths

### Frontend Components
```javascript
import { truncateUrl } from '@/client/utils';
```

### Backend API Routes
```javascript
import { getPool, initDatabase } from '@/lib/database/connection';
import { generateShortCode, validateCode } from '@/server/utils';
```

## 🚀 Key Files Explained

### Frontend
- **`app/page.jsx`**: Main dashboard page
- **`components/LinkForm.jsx`**: Form to create new short links
- **`components/LinkTable.jsx`**: Table displaying all links with actions
- **`client/utils.js`**: Client-side helper functions

### Backend
- **`app/api/links/route.js`**: API endpoints for creating and listing links
- **`app/api/links/[code]/route.js`**: API endpoints for getting and deleting specific links
- **`app/[code]/route.js`**: Redirect handler (302 redirect to target URL)
- **`server/utils.js`**: Server-side validation and code generation

### Database
- **`lib/database/connection.js`**: PostgreSQL connection pool and table initialization
- **`database/schema.sql`**: Database schema documentation

## 🎓 Learning Points

1. **Separation**: Frontend and backend code are clearly separated
2. **Reusability**: Utilities are organized by where they're used (client vs server)
3. **Next.js Structure**: Uses Next.js App Router conventions
4. **Database Layer**: Database logic is isolated in its own module
5. **API Routes**: All backend logic is in `app/api/` following REST conventions

