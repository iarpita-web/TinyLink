/**
 * Quick setup script - guides user through adding connection string
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function quickSetup() {
  console.log('\n🚀 TinyLink Database Quick Setup\n');
  console.log('═══════════════════════════════════════════════════════\n');
  
  console.log('📋 Step 1: Get your connection string from Neon.tech');
  console.log('   1. Go to: https://neon.tech');
  console.log('   2. Sign up (free, no credit card)');
  console.log('   3. Create a new project');
  console.log('   4. Copy the connection string\n');
  
  const hasString = await question('✅ Do you have your connection string ready? (y/n): ');
  
  if (hasString.toLowerCase() !== 'y') {
    console.log('\n📝 Please get your connection string first:');
    console.log('   → https://neon.tech');
    console.log('\n   Then run this script again.\n');
    rl.close();
    return;
  }
  
  console.log('\n📥 Paste your connection string below:');
  console.log('   (It should start with postgresql://)\n');
  
  const connectionString = await question('Connection string: ');
  
  if (!connectionString.trim()) {
    console.log('\n❌ Error: Connection string cannot be empty\n');
    rl.close();
    return;
  }
  
  if (!connectionString.trim().startsWith('postgresql://') && !connectionString.trim().startsWith('postgres://')) {
    console.log('\n⚠️  Warning: Connection string should start with "postgresql://"');
    const continueAnyway = await question('Continue anyway? (y/n): ');
    if (continueAnyway.toLowerCase() !== 'y') {
      console.log('\nSetup cancelled.\n');
      rl.close();
      return;
    }
  }
  
  // Update .env.local
  const envPath = path.join(process.cwd(), '.env.local');
  let envContent = '';
  
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf8');
    if (envContent.includes('DATABASE_URL=')) {
      envContent = envContent.replace(/DATABASE_URL=.*/g, `DATABASE_URL=${connectionString.trim()}`);
    } else {
      envContent += `\nDATABASE_URL=${connectionString.trim()}\n`;
    }
  } else {
    envContent = `# Database Connection String
DATABASE_URL=${connectionString.trim()}
`;
  }
  
  try {
    fs.writeFileSync(envPath, envContent);
    console.log('\n✅ Success! Connection string added to .env.local\n');
    console.log('🧪 Testing connection...\n');
    
    // Test the connection
    const { execSync } = require('child_process');
    try {
      execSync('npm run test-db', { stdio: 'inherit' });
      console.log('\n🎉 Setup complete! Your database is ready.\n');
      console.log('📝 Next: Start your server with: npm run dev\n');
    } catch (error) {
      console.log('\n⚠️  Connection test failed. Please check your connection string.\n');
      console.log('💡 Make sure:');
      console.log('   - The connection string is correct');
      console.log('   - You have internet connection');
      console.log('   - The database is accessible\n');
    }
  } catch (error) {
    console.error('\n❌ Error writing to .env.local:', error.message);
  }
  
  rl.close();
}

quickSetup();

