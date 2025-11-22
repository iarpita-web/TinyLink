/**
 * Simple script to add DATABASE_URL to .env.local
 * Usage: node scripts/add-db-url.js "your_connection_string_here"
 */

const fs = require('fs');
const path = require('path');

const connectionString = process.argv[2];

if (!connectionString) {
  console.log('❌ Error: Please provide a connection string');
  console.log('\nUsage: node scripts/add-db-url.js "postgresql://..."');
  console.log('\nOr manually edit .env.local and add:');
  console.log('DATABASE_URL=your_connection_string_here\n');
  process.exit(1);
}

const envPath = path.join(process.cwd(), '.env.local');
let envContent = '';

// Read existing .env.local if it exists
if (fs.existsSync(envPath)) {
  envContent = fs.readFileSync(envPath, 'utf8');
  
  // Check if DATABASE_URL already exists
  if (envContent.includes('DATABASE_URL=')) {
    // Replace existing DATABASE_URL
    envContent = envContent.replace(/DATABASE_URL=.*/g, `DATABASE_URL=${connectionString}`);
  } else {
    // Append DATABASE_URL
    envContent += `\nDATABASE_URL=${connectionString}\n`;
  }
} else {
  // Create new .env.local
  envContent = `# Database Connection String
DATABASE_URL=${connectionString}
`;
}

try {
  fs.writeFileSync(envPath, envContent);
  console.log('✅ Success! Added DATABASE_URL to .env.local');
  console.log('\n📝 Next steps:');
  console.log('1. Test your connection: npm run test-db');
  console.log('2. Restart your dev server: npm run dev');
  console.log('3. Visit: http://localhost:3000\n');
} catch (error) {
  console.error('❌ Error writing to .env.local:', error.message);
  process.exit(1);
}

