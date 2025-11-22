import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
            TinyLink
          </Link>
          <nav className="flex gap-4">
            <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors text-sm sm:text-base">
              Dashboard
            </Link>
            <Link href="/healthz" className="text-gray-600 hover:text-gray-900 transition-colors text-sm sm:text-base">
              Health
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}



