'use client';

import Link from 'next/link';

export default function DatabaseSetupPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">🔌</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Database Setup Required</h1>
          <p className="text-gray-600">You need to configure your database connection to use TinyLink.</p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-blue-900 mb-3">Quick Setup (2 minutes)</h2>
          <ol className="list-decimal list-inside space-y-2 text-blue-800">
            <li>Get a free PostgreSQL database from <a href="https://neon.tech" target="_blank" rel="noopener noreferrer" className="underline font-semibold">Neon.tech</a></li>
            <li>Sign up and create a new project</li>
            <li>Copy your connection string</li>
            <li>Add it to <code className="bg-blue-100 px-2 py-1 rounded">.env.local</code> file as <code className="bg-blue-100 px-2 py-1 rounded">DATABASE_URL=your_connection_string</code></li>
            <li>Restart the server: <code className="bg-blue-100 px-2 py-1 rounded">npm run dev</code></li>
          </ol>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Option 1: Use Setup Script</h3>
            <div className="bg-gray-50 p-4 rounded border">
              <code className="text-sm">node scripts/setup-env.js</code>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Option 2: Manual Setup</h3>
            <div className="bg-gray-50 p-4 rounded border space-y-2">
              <p className="text-sm text-gray-700">1. Create/edit <code className="bg-gray-200 px-1 rounded">.env.local</code> in project root</p>
              <p className="text-sm text-gray-700">2. Add this line:</p>
              <code className="block text-sm bg-gray-800 text-green-400 p-2 rounded">
                DATABASE_URL=postgresql://username:password@host.neon.tech/dbname?sslmode=require
              </code>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Test Your Connection</h3>
            <div className="bg-gray-50 p-4 rounded border">
              <code className="text-sm">npm run test-db</code>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t">
          <p className="text-sm text-gray-600 mb-4">
            <strong>Need help?</strong> See <code className="bg-gray-100 px-2 py-1 rounded">SETUP_DATABASE.md</code> or <code className="bg-gray-100 px-2 py-1 rounded">QUICK_START.md</code> for detailed instructions.
          </p>
          <Link 
            href="/" 
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}


