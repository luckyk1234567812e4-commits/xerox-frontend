import { Link } from "react-router-dom";

function SuccessPage() {
  const jobToken = Math.floor(100000 + Math.random() * 900000); // random 6-digit token

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50">
      <h1 className="text-3xl font-bold text-green-800">🎉 Payment Successful!</h1>
      <p className="mt-4 text-lg text-gray-700">
        Your Xerox job has been confirmed.
      </p>

      {/* Show Job Token */}
      <div className="mt-6 p-4 bg-white border rounded-lg shadow-md text-center">
        <h2 className="text-xl font-semibold">Your Job Token</h2>
        <p className="text-2xl font-bold text-green-700 mt-2">#{jobToken}</p>
      </div>

      {/* Back to Home */}
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        🏠 Go Home
      </Link>
    </div>
  );
}

export default SuccessPage;
