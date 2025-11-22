/**
 * Test database connection script
 * Run with: node scripts/test-db.js
 */

require('dotenv').config({ path: '.env.local' });

async function testDatabase() {
  const { Pool } = require('pg');

  if (!process.env.DATABASE_URL) {
    console.error('❌ ERROR: DATABASE_URL is not set in .env.local');
    console.log('\n📝 Please create a .env.local file with:');
    console.log('   DATABASE_URL=your_postgresql_connection_string\n');
    process.exit(1);
  }

  console.log('🔌 Testing database connection...\n');

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  });

  try {
    // Test connection
    const result = await pool.query('SELECT NOW() as current_time, version() as pg_version');
    console.log('✅ Database connection successful!');
    console.log(`   Current time: ${result.rows[0].current_time}`);
    console.log(`   PostgreSQL: ${result.rows[0].pg_version.split(' ')[0]} ${result.rows[0].pg_version.split(' ')[1]}\n`);

    // Check if links table exists
    const tableCheck = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'links'
      );
    `);

    if (tableCheck.rows[0].exists) {
      console.log('✅ Links table already exists');
      
      // Get table info
      const count = await pool.query('SELECT COUNT(*) FROM links');
      console.log(`   Total links: ${count.rows[0].count}`);
    } else {
      console.log('ℹ️  Links table does not exist yet (will be created on first use)');
    }

    console.log('\n🎉 Database is ready to use!');
    await pool.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Database connection failed!');
    console.error(`   Error: ${error.message}\n`);
    
    if (error.message.includes('ENOTFOUND') || error.message.includes('getaddrinfo')) {
      console.log('💡 This looks like a network/DNS issue. Check:');
      console.log('   - Your internet connection');
      console.log('   - The database host in your connection string');
    } else if (error.message.includes('password authentication')) {
      console.log('💡 Authentication failed. Check:');
      console.log('   - Your username and password in the connection string');
    } else if (error.message.includes('does not exist')) {
      console.log('💡 Database does not exist. Check:');
      console.log('   - The database name in your connection string');
    } else {
      console.log('💡 Please verify your DATABASE_URL connection string is correct');
    }
    
    await pool.end();
    process.exit(1);
  }
}

testDatabase();

