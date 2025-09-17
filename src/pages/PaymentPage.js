import { Link } from "react-router-dom";

function PaymentPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-50">
      <h1 className="text-3xl font-bold text-yellow-800">💳 Payment Page</h1>
      <p className="mt-4 text-lg text-gray-700">
        (In the real app, this will integrate UPI/QR. For now, just continue.)
      </p>

      {/* Simulate payment success */}
      <Link
        to="/success"
        className="mt-6 px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition"
      >
        ✅ Complete Payment
      </Link>
    </div>
  );
}

export default PaymentPage;
