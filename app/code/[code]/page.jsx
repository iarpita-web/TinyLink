'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function StatsPage() {
  const params = useParams();
  const router = useRouter();
  const code = params.code;
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/links/${code}`);
        if (!response.ok) {
          if (response.status === 404) {
            setError('Link not found');
          } else {
            setError('Failed to load stats');
          }
          return;
        }
        const data = await response.json();
        setStats(data);
      } catch (err) {
        setError('Error loading stats');
      } finally {
        setLoading(false);
      }
    };

    if (code) {
      fetchStats();
    }
  }, [code]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white p-12 rounded-lg shadow-md text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-500">Loading stats...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            <p className="font-medium">Error</p>
            <p className="text-sm mt-1">{error || 'Link not found'}</p>
          </div>
          <button
            onClick={() => router.push('/')}
            className="mt-4 text-blue-600 hover:text-blue-700 transition-colors underline-offset-2 hover:underline"
          >
            ← Back to Dashboard
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  const shortUrl = typeof window !== 'undefined' ? `${window.location.origin}/${stats.code}` : '';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => router.push('/')}
          className="mb-4 text-blue-600 hover:text-blue-700 flex items-center gap-2"
        >
          ← Back to Dashboard
        </button>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Link Statistics</h1>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Short Code</label>
              <div className="flex items-center gap-2">
                <code className="text-lg font-mono text-blue-600">{stats.code}</code>
                <button
                  onClick={() => copyToClipboard(stats.code)}
                  className="text-gray-400 hover:text-gray-600"
                  title="Copy code"
                >
                  📋
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Short URL</label>
              <div className="flex items-center gap-2">
                <code className="text-lg font-mono text-blue-600 break-all">{shortUrl}</code>
                <button
                  onClick={() => copyToClipboard(shortUrl)}
                  className="text-gray-400 hover:text-gray-600 flex-shrink-0"
                  title="Copy short URL"
                >
                  📋
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Target URL</label>
              <div className="flex items-center gap-2">
                <a
                  href={stats.target_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 break-all"
                >
                  {stats.target_url}
                </a>
                <button
                  onClick={() => copyToClipboard(stats.target_url)}
                  className="text-gray-400 hover:text-gray-600 flex-shrink-0"
                  title="Copy target URL"
                >
                  📋
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Total Clicks</label>
                <p className="text-2xl font-bold text-gray-900">{stats.click_count}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Created At</label>
                <p className="text-gray-900">{formatDate(stats.created_at)}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Last Clicked</label>
                <p className="text-gray-900">
                  {stats.last_clicked_at ? formatDate(stats.last_clicked_at) : 'Never'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}



