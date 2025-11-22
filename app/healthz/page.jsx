'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function HealthPage() {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const response = await fetch('/healthz');
        const data = await response.json();
        setHealth(data);
      } catch (err) {
        setHealth({ ok: false, version: '1.0' });
      } finally {
        setLoading(false);
      }
    };

    fetchHealth();
    const interval = setInterval(fetchHealth, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const formatUptime = (seconds) => {
    if (!seconds) return 'N/A';
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${days}d ${hours}h ${minutes}m ${secs}s`;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">System Health</h1>

        {loading ? (
          <div className="bg-white p-12 rounded-lg shadow-md text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-500">Loading health status...</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-4 h-4 rounded-full ${
                    health?.ok ? 'bg-green-500' : 'bg-red-500'
                  }`}
                />
                <span className="text-lg font-medium">
                  Status: {health?.ok ? 'Healthy' : 'Unhealthy'}
                </span>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Version</label>
                <p className="text-gray-900">{health?.version || 'N/A'}</p>
              </div>

              {health?.uptime !== undefined && (
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Uptime</label>
                  <p className="text-gray-900">{formatUptime(health.uptime)}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}



