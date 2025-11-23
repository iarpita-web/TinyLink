import { Pool } from 'pg';

let pool = null;

export function getPool() {
  const dbUrl = process.env.DATABASE_URL;
  
  if (!dbUrl || dbUrl.trim() === '') {
    const error = new Error('DATABASE_URL environment variable is not set or is empty.');
    error.code = 'MISSING_DATABASE_URL';
    throw error;
  }
  
  if (!pool) {
    pool = new Pool({
      connectionString: dbUrl,
      ssl: { rejectUnauthorized: false }, // Always use SSL for Neon
      connectionTimeoutMillis: 10000, // 10 second timeout
    });
  }
  return pool;
}

export async function initDatabase() {
  const pool = getPool();
  
  try {
    // Check if table already exists
    const tableExists = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'links'
      );
    `);
    
    if (tableExists.rows[0].exists) {
      // Table already exists, just ensure index exists
      await pool.query(`
        CREATE INDEX IF NOT EXISTS idx_links_code ON links(code);
      `);
      return;
    }
    
    // Create table and index
    await pool.query(`
      CREATE TABLE links (
        id SERIAL PRIMARY KEY,
        code VARCHAR(8) UNIQUE NOT NULL,
        target_url TEXT NOT NULL,
        click_count INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_clicked_at TIMESTAMP
      );
    `);
    
    await pool.query(`
      CREATE INDEX idx_links_code ON links(code);
    `);
  } catch (error) {
    // If table already exists (race condition), that's fine
    if (error.code === '42P07' || error.message.includes('already exists')) {
      // Table exists, ensure index exists
      try {
        await pool.query(`
          CREATE INDEX IF NOT EXISTS idx_links_code ON links(code);
        `);
      } catch (idxError) {
        // Index might already exist, that's fine
        if (!idxError.message.includes('already exists')) {
          throw idxError;
        }
      }
      return;
    }
    // Re-throw other errors
    throw error;
  }
}



