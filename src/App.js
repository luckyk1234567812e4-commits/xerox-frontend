import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Page imports
import Home from "./pages/Home";
import Orders from "./pages/Orders";
import Admin from "./pages/Admin";
import PaymentPage from "./pages/PaymentPage";
import SuccessPage from "./pages/SuccessPage";
import OrderSummary from "./pages/OrderSummary";

function App() {
  return (
    <Router>
      {/* 🌐 Navigation Bar */}
      <nav className="bg-gray-800 text-white p-4 flex gap-6 shadow-md">
        <Link to="/" className="hover:text-green-400">Home</Link>
        <Link to="/orders" className="hover:text-green-400">Orders</Link>
        <Link to="/admin" className="hover:text-green-400">Admin</Link>
      </nav>

      {/* 🧪 Tailwind Test */}
      <div className="p-4">
        <h1 className="text-3xl font-bold text-red-500">Tailwind OK ✅</h1>
      </div>

      {/* 📌 Page Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/summary" element={<OrderSummary />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
    </Router>
  );
}

export default App;
