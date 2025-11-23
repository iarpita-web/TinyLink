import { NextRequest, NextResponse } from 'next/server';
import { getPool, initDatabase } from '@/lib/db';
import { generateShortCode, validateCode, validateUrl } from '@/lib/utils';

// Initialize database on first API call
let dbInitialized = false;
let dbInitializing = false;

async function ensureDbInitialized() {
  // If already initialized, return immediately
  if (dbInitialized) {
    return;
  }
  
  // If currently initializing, wait for it to complete
  if (dbInitializing) {
    // Wait a bit and check again
    await new Promise(resolve => setTimeout(resolve, 100));
    return ensureDbInitialized();
  }
  
  // Start initialization
  dbInitializing = true;
  try {
    await initDatabase();
    dbInitialized = true;
  } catch (error) {
    // If it's a "table already exists" error, that's fine
    if (error.code === '42P07' || error.message.includes('already exists')) {
      dbInitialized = true;
    } else {
      throw error;
    }
  } finally {
    dbInitializing = false;
  }
}

// POST /api/links - Create a new link
export async function POST(request) {
  try {
    await ensureDbInitialized();
    const body = await request.json();
    const { url, code: customCode } = body;

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      );
    }

    if (!validateUrl(url)) {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      );
    }

    const pool = getPool();
    let finalCode;

    if (customCode) {
      if (!validateCode(customCode)) {
        return NextResponse.json(
          { error: 'Code must be 6-8 alphanumeric characters' },
          { status: 400 }
        );
      }

      // Check if code already exists
      const existing = await pool.query(
        'SELECT code FROM links WHERE code = $1',
        [customCode]
      );

      if (existing.rows.length > 0) {
        return NextResponse.json(
          { error: 'Code already exists' },
          { status: 409 }
        );
      }

      finalCode = customCode;
    } else {
      // Generate unique code
      let attempts = 0;
      do {
        finalCode = generateShortCode();
        const existing = await pool.query(
          'SELECT code FROM links WHERE code = $1',
          [finalCode]
        );
        if (existing.rows.length === 0) break;
        attempts++;
        if (attempts > 10) {
          return NextResponse.json(
            { error: 'Failed to generate unique code' },
            { status: 500 }
          );
        }
      } while (true);
    }

    const result = await pool.query(
      'INSERT INTO links (code, target_url) VALUES ($1, $2) RETURNING *',
      [finalCode, url]
    );

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('Error creating link:', error);
    
    if (error.code === 'MISSING_DATABASE_URL') {
      return NextResponse.json(
        { 
          error: 'Database not configured',
          message: 'Please set DATABASE_URL environment variable in Vercel settings (for production) or .env.local file (for local development).'
        },
        { status: 503 }
      );
    }
    
    if (error.code === 'INVALID_DATABASE_URL') {
      return NextResponse.json(
        { 
          error: 'Invalid database connection string',
          message: error.message || 'DATABASE_URL format is incorrect. Please check your connection string in Vercel environment variables. It should start with "postgresql://" and be a complete connection string from Neon.'
        },
        { status: 503 }
      );
    }
    
    const errorMessage = error.message || 'Internal server error';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

// GET /api/links - List all links
export async function GET() {
  try {
    await ensureDbInitialized();
    const pool = getPool();
    const result = await pool.query(
      'SELECT code, target_url, click_count, created_at, last_clicked_at FROM links ORDER BY created_at DESC'
    );

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Error fetching links:', error);
    
    if (error.code === 'MISSING_DATABASE_URL') {
      return NextResponse.json(
        { 
          error: 'Database not configured',
          message: 'Please set DATABASE_URL environment variable in Vercel settings (for production) or .env.local file (for local development).'
        },
        { status: 503 }
      );
    }
    
    if (error.code === 'INVALID_DATABASE_URL') {
      return NextResponse.json(
        { 
          error: 'Invalid database connection string',
          message: error.message || 'DATABASE_URL format is incorrect. Please check your connection string in Vercel environment variables. It should start with "postgresql://" and be a complete connection string from Neon.'
        },
        { status: 503 }
      );
    }
    
    const errorMessage = error.message || 'Internal server error';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}



