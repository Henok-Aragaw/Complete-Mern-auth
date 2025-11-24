export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="text-lg">Oops, the page you're looking for doesn't exist.</p>
      <a
        href="/"
        className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800"
      >
        Go Home
      </a>
    </div>
  );
}
