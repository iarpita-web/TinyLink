import { Pool } from 'pg';

let pool = null;

export function getPool() {
  const dbUrl = process.env.DATABASE_URL;
  
  if (!dbUrl || dbUrl.trim() === '') {
    const error = new Error('DATABASE_URL environment variable is not set or is empty.');
    error.code = 'MISSING_DATABASE_URL';
    throw error;
  }
  
  // Clean up the connection string - remove psql command prefix if present
  let cleanUrl = dbUrl.trim();
  
  // Remove psql command prefix if present (e.g., "psql 'postgresql://..." -> "postgresql://...")
  if (cleanUrl.startsWith('psql')) {
    // Extract the connection string from psql command
    const match = cleanUrl.match(/['"](postgresql?:\/\/[^'"]+)['"]/);
    if (match && match[1]) {
      cleanUrl = match[1];
    } else {
      // Try to find postgresql:// in the string
      const pgIndex = cleanUrl.indexOf('postgresql://');
      if (pgIndex !== -1) {
        cleanUrl = cleanUrl.substring(pgIndex);
        // Remove trailing quote if present
        cleanUrl = cleanUrl.replace(/['"]$/, '');
      }
    }
  }
  
  // Remove surrounding quotes if present
  cleanUrl = cleanUrl.replace(/^['"]|['"]$/g, '');
  
  // Validate connection string format
  if (!cleanUrl.startsWith('postgresql://') && !cleanUrl.startsWith('postgres://')) {
    const error = new Error(`Invalid DATABASE_URL format. It should start with 'postgresql://' but got: ${dbUrl.substring(0, 30)}... Please use only the connection string, not the psql command.`);
    error.code = 'INVALID_DATABASE_URL';
    throw error;
  }
  
  // Check for placeholder values
  if (cleanUrl.includes('your_connection_string') || cleanUrl.includes('base') || cleanUrl.length < 50) {
    const error = new Error('DATABASE_URL appears to be a placeholder or incomplete. Please set a valid PostgreSQL connection string.');
    error.code = 'INVALID_DATABASE_URL';
    throw error;
  }
  
  // Use the cleaned URL
  const finalUrl = cleanUrl;
  
  if (!pool) {
    pool = new Pool({
      connectionString: finalUrl,
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



