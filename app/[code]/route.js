import { NextRequest, NextResponse } from 'next/server';
import { getPool, initDatabase } from '@/lib/db';

// Initialize database on first API call
let dbInitialized = false;
let dbInitializing = false;

async function ensureDbInitialized() {
  if (dbInitialized) {
    return;
  }
  
  if (dbInitializing) {
    await new Promise(resolve => setTimeout(resolve, 100));
    return ensureDbInitialized();
  }
  
  dbInitializing = true;
  try {
    await initDatabase();
    dbInitialized = true;
  } catch (error) {
    if (error.code === '42P07' || error.message.includes('already exists')) {
      dbInitialized = true;
    } else {
      throw error;
    }
  } finally {
    dbInitializing = false;
  }
}

// Redirect handler for /:code
export async function GET(request, { params }) {
  try {
    await ensureDbInitialized();
    const { code } = params;
    const pool = getPool();

    const result = await pool.query(
      'SELECT target_url FROM links WHERE code = $1',
      [code]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Link not found' },
        { status: 404 }
      );
    }

    const targetUrl = result.rows[0].target_url;

    // Update click count and last clicked time
    await pool.query(
      'UPDATE links SET click_count = click_count + 1, last_clicked_at = CURRENT_TIMESTAMP WHERE code = $1',
      [code]
    );

    // Return 302 redirect
    return NextResponse.redirect(targetUrl, { status: 302 });
  } catch (error) {
    console.error('Error redirecting:', error);
    const errorMessage = error.message || 'Internal server error';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}



