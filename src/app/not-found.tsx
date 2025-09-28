// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 text-gray-800 px-4">
      <div className="text-center">
        <h1 className="text-7xl font-extrabold mb-4 animate-bounce text-purple-600">
          404
        </h1>
        <h2 className="text-3xl font-bold mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-6">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block bg-purple-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-purple-700 transition-colors duration-300"
        >
          Go Back Home
        </Link>
      </div>
      <div className="mt-10">
        <img
          src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
          alt="404 illustration"
          className="w-80 max-w-full mx-auto"
        />
      </div>
    </div>
  );
}
