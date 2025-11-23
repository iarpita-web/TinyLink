/**
 * Fix .env.local file - show current value and help fix it
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

async function fixEnv() {
  const envPath = path.join(process.cwd(), '.env.local');
  
  if (!fs.existsSync(envPath)) {
    console.log('❌ .env.local file not found');
    rl.close();
    return;
  }

  const content = fs.readFileSync(envPath, 'utf8');
  const dbUrlMatch = content.match(/DATABASE_URL=(.*)/);
  
  if (dbUrlMatch) {
    const currentUrl = dbUrlMatch[1].trim();
    console.log('\n📋 Current DATABASE_URL value:');
    console.log(currentUrl || '(empty)');
    console.log('\n❌ This connection string appears to be invalid.');
  } else {
    console.log('\n❌ DATABASE_URL not found in .env.local');
  }

  console.log('\n📝 A valid connection string should look like:');
  console.log('postgresql://username:password@ep-xxx-xxx.region.neon.tech/dbname?sslmode=require');
  console.log('\n🔗 Get a free database from: https://neon.tech');
  console.log('   1. Sign up (free)');
  console.log('   2. Create a project');
  console.log('   3. Copy the connection string');
  
  const newUrl = await question('\n📥 Paste your correct connection string here (or press Enter to skip): ');
  
  if (newUrl.trim()) {
    let newContent = content;
    
    if (content.includes('DATABASE_URL=')) {
      newContent = content.replace(/DATABASE_URL=.*/g, `DATABASE_URL=${newUrl.trim()}`);
    } else {
      newContent += `\nDATABASE_URL=${newUrl.trim()}\n`;
    }
    
    fs.writeFileSync(envPath, newContent);
    console.log('\n✅ Updated .env.local file!');
    console.log('\n🧪 Test your connection: npm run test-db');
  } else {
    console.log('\n⚠️  No changes made. Please manually edit .env.local');
  }
  
  rl.close();
}

fixEnv();




