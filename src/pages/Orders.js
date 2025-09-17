import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";

function Orders() {
  const [files, setFiles] = useState([]);
  const [copies, setCopies] = useState(1);
  const [color, setColor] = useState("bw");
  const [size, setSize] = useState("A4");
  const [binding, setBinding] = useState(false);
  const [price, setPrice] = useState(0);

  const navigate = useNavigate();

  // Dropzone handler
  const onDrop = (acceptedFiles) => {
    setFiles(acceptedFiles);
  };
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  // 🔗 Real-time cost calculation
  useEffect(() => {
    const calculateCost = async () => {
      try {
        const response = await fetch("http://localhost:5000/calculate-cost", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            pages: files.length, // still 1 page/file assumption
            size,
            color,
            binding,
            photoSets: 0,
          }),
        });

        const result = await response.json();
        setPrice(result.totalCost * copies); // ✅ handle multiple copies
      } catch (error) {
        console.error("Error calculating cost:", error);
      }
    };

    calculateCost();
  }, [files, copies, color, size, binding]); // 🔥 runs whenever any option changes

  // 🚀 Proceed to payment
  const handlePayment = () => {
    navigate("/payment");
  };

  return (
    <div className="flex flex-col items-center p-6 bg-green-50 min-h-screen">
      <h1 className="text-3xl font-bold text-green-800 mb-6">
        📑 Upload Your Documents
      </h1>

      {/* File Upload */}
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-green-500 p-10 w-96 text-center bg-white rounded-lg cursor-pointer"
      >
        <input {...getInputProps()} />
        <p className="text-gray-600">
          Drag & Drop files here, or click to select
        </p>
      </div>

      <ul className="mt-4 text-gray-700">
        {files.map((file) => (
          <li key={file.path}>{file.path}</li>
        ))}
      </ul>

      {/* Options */}
      <div className="mt-6 space-y-4">
        {/* Copies */}
        <div>
          <label className="mr-2 font-semibold">Copies:</label>
          <input
            type="number"
            value={copies}
            onChange={(e) => setCopies(Number(e.target.value))}
            className="border rounded p-1 w-20"
            min="1"
          />
        </div>

        {/* Color */}
        <div>
          <label className="mr-2 font-semibold">Color:</label>
          <select
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="border rounded p-1"
          >
            <option value="bw">Black & White</option>
            <option value="color">Color</option>
          </select>
        </div>

        {/* Paper Size */}
        <div>
          <label className="mr-2 font-semibold">Size:</label>
          <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="border rounded p-1"
          >
            <option value="A4">A4</option>
            <option value="A3">A3</option>
          </select>
        </div>

        {/* Binding */}
        <div>
          <label className="mr-2 font-semibold">Spiral Binding:</label>
          <input
            type="checkbox"
            checked={binding}
            onChange={() => setBinding(!binding)}
          />
        </div>
      </div>

      {/* Real-time Price */}
      <div className="mt-6 p-4 bg-green-100 rounded-lg text-center">
        <h2 className="text-xl font-bold">💰 Total Price: ₹{price}</h2>
        {price > 0 && (
          <button
            onClick={handlePayment}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
          >
            Proceed to Payment
          </button>
        )}
      </div>
    </div>
  );
}

export default Orders;
