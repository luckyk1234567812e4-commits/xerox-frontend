// src/pages/Admin.js
import React, { useState } from "react";

export default function Admin() {
  // Dummy orders (later we’ll fetch from backend)
  const [orders, setOrders] = useState([
    { id: 1, customer: "Alice", file: "doc1.pdf", copies: 2, type: "Color", status: "Pending" },
    { id: 2, customer: "Bob", file: "thesis.docx", copies: 5, type: "B&W", status: "Pending" },
    { id: 3, customer: "Charlie", file: "notes.pdf", copies: 1, type: "B&W", status: "Pending" },
  ]);

  const updateStatus = (id, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">⚙️ Admin Dashboard</h1>

      <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="py-3 px-4 text-left">Customer</th>
            <th className="py-3 px-4 text-left">File</th>
            <th className="py-3 px-4 text-left">Copies</th>
            <th className="py-3 px-4 text-left">Type</th>
            <th className="py-3 px-4 text-left">Status</th>
            <th className="py-3 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b">
              <td className="py-3 px-4">{order.customer}</td>
              <td className="py-3 px-4">{order.file}</td>
              <td className="py-3 px-4">{order.copies}</td>
              <td className="py-3 px-4">{order.type}</td>
              <td className="py-3 px-4 font-semibold">{order.status}</td>
              <td className="py-3 px-4 flex gap-2">
                <button
                  onClick={() => updateStatus(order.id, "Accepted")}
                  className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Accept
                </button>
                <button
                  onClick={() => updateStatus(order.id, "Rejected")}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Reject
                </button>
                <button
                  onClick={() => updateStatus(order.id, "Completed")}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Complete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
