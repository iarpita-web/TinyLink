'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LinkForm from '@/components/LinkForm';
import LinkTable from '@/components/LinkTable';

export default function Dashboard() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchLinks = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/links');
      const data = await response.json();
      
      if (!response.ok) {
        // Show error message instead of redirecting
        if (response.status === 503) {
          throw new Error('Database connection error. Please check your DATABASE_URL environment variable in Vercel settings.');
        }
        throw new Error(data.error || 'Failed to fetch links');
      }
      
      setLinks(data);
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to load links. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const handleDelete = (code) => {
    setLinks(links.filter((link) => link.code !== code));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Create and manage your short links</p>
        </div>

        <div className="mb-8">
          <LinkForm onSuccess={fetchLinks} />
        </div>

        {loading ? (
          <div className="bg-white p-12 rounded-lg shadow-md text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-500">Loading links...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            <p className="font-medium">Error loading links</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        ) : (
          <LinkTable links={links} onDelete={handleDelete} onRefresh={fetchLinks} />
        )}
      </main>
      <Footer />
    </div>
  );
}



