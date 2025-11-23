import { NextRequest, NextResponse } from 'next/server';
import { getPool, initDatabase } from '@/lib/database/connection';

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

// GET /api/links/:code - Get stats for a specific code
export async function GET(request, { params }) {
  try {
    await ensureDbInitialized();
    const { code } = params;
    const pool = getPool();

    const result = await pool.query(
      'SELECT code, target_url, click_count, created_at, last_clicked_at FROM links WHERE code = $1',
      [code]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Link not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching link:', error);
    const errorMessage = error.message || 'Internal server error';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

// DELETE /api/links/:code - Delete a link
export async function DELETE(request, { params }) {
  try {
    await ensureDbInitialized();
    const { code } = params;
    const pool = getPool();

    const result = await pool.query(
      'DELETE FROM links WHERE code = $1 RETURNING *',
      [code]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Link not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting link:', error);
    const errorMessage = error.message || 'Internal server error';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}



