export default function Footer() {
  return (
    <footer className="bg-white border-t mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} TinyLink. URL Shortener Service.
          </p>
          <div className="flex gap-4 text-sm text-gray-600">
            <a href="/" className="hover:text-gray-900 transition-colors">
              Dashboard
            </a>
            <a href="/healthz" className="hover:text-gray-900 transition-colors">
              Health
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}




