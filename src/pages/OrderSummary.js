import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OrderSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Order data passed from Orders.js
  const orderData = location.state;

  if (!orderData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-gray-700 font-medium">
          No order details found. Please place an order first.
        </p>
      </div>
    );
  }

  const handleConfirm = () => {
    // Later this will trigger payment
    navigate("/payment", { state: orderData });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h2>
        
        <div className="space-y-3 text-gray-700">
          <p><strong>Pages:</strong> {orderData.pages}</p>
          <p><strong>Paper Size:</strong> {orderData.size}</p>
          <p><strong>Color:</strong> {orderData.color === "bw" ? "Black & White" : "Color"}</p>
          <p><strong>Binding:</strong> {orderData.binding ? "Yes" : "No"}</p>
          <p><strong>Photo Sets:</strong> {orderData.photoSets}</p>
          <p className="text-xl font-bold text-indigo-600">
            Total: ₹{orderData.totalCost}
          </p>
        </div>

        <button
          onClick={handleConfirm}
          className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
        >
          Confirm & Pay
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
