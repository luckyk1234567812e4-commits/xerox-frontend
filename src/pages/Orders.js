import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { handleOrder } from "../api/jobs";
import { createClient } from "@supabase/supabase-js";

// Initialize the Supabase client using environment variables
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Function to fetch cost from an external API
const fetchCost = async (payload) => {
  try {
    const response = await fetch(
      "https://xerox-backend-1.onrender.com/calculate-cost",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data.totalCost;
  } catch (error) {
    console.error("Error calculating cost:", error);
    return null;
  }
};

const Orders = () => {
  const navigate = useNavigate();
  const [pages, setPages] = useState(0);
  const [size, setSize] = useState("A4");
  const [color, setColor] = useState("bw");
  const [binding, setBinding] = useState(false);
  const [photoSets, setPhotoSets] = useState(0);
  const [pdfFile, setPdfFile] = useState(null);
  const [totalCost, setTotalCost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (pages > 0 || photoSets > 0 || binding) {
      setLoading(true);
      fetchCost({
        pages: Number(pages),
        size,
        color,
        binding,
        photoSets: Number(photoSets),
      }).then((cost) => {
        setTotalCost(cost);
        setLoading(false);
      });
    } else {
      setTotalCost(null);
    }
  }, [pages, size, color, binding, photoSets]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
    } else {
      setPdfFile(null);
    }
  };

  const handleProceed = async () => {
    if (!pdfFile) {
      alert("Please upload a PDF file.");
      return;
    }

    try {
      setSubmitting(true);
      // Pass the Supabase client and other data to the handleOrder function
      const result = await handleOrder(supabase, pdfFile, {
        pages,
        size,
        color,
        binding,
        photoSets,
        totalCost,
      });

      console.log("✅ Job created:", result);

      navigate("/summary", {
        state: {
          pages,
          size,
          color,
          binding,
          photoSets,
          pdfFileName: pdfFile.name,
          fileUrl: result.file_url,
          totalCost,
        },
      });
    } catch (err) {
      console.error("❌ Failed to create order:", err.message);
      alert("Upload failed, check console for details.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl w-full max-w-sm border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Xerox Order</h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload PDF</label>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-50 file:text-indigo-600
              hover:file:bg-indigo-100"
            />
            {pdfFile && (
              <p className="text-sm text-gray-600 mt-2">
                Selected: <span className="font-semibold">{pdfFile.name}</span>
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pages</label>
            <input
              type="number"
              value={pages}
              onChange={(e) => setPages(e.target.value)}
              className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              placeholder="e.g., 50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Paper Size</label>
            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            >
              <option value="A4">A4</option>
              <option value="A3">A3</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
            <select
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            >
              <option value="bw">Black & White</option>
              <option value="color">Color</option>
            </select>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={binding}
              onChange={(e) => setBinding(e.target.checked)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label className="ml-2 text-sm font-medium text-gray-700">Binding</label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Photo Sets</label>
            <input
              type="number"
              value={photoSets}
              onChange={(e) => setPhotoSets(e.target.value)}
              className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              placeholder="e.g., 2"
            />
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-200 space-y-4">
          {loading ? (
            <p className="text-center text-gray-500 font-medium">Calculating...</p>
          ) : totalCost !== null ? (
            <div className="flex items-center justify-between text-2xl font-bold text-gray-900">
              <span>Total Cost</span>
              <span className="text-indigo-600">₹{totalCost}</span>
            </div>
          ) : (
            <p className="text-center text-gray-500 font-medium">Enter details to get cost</p>
          )}
          <button
            onClick={handleProceed}
            disabled={totalCost === null || submitting}
            className="w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {submitting ? "Uploading..." : "Proceed to Summary"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Orders;