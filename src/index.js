import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// 🔍 Debug logs to check if Netlify env vars are available
console.log("SUPABASE_URL:", process.env.REACT_APP_SUPABASE_URL);
console.log("SUPABASE_ANON_KEY:", process.env.REACT_APP_SUPABASE_ANON_KEY);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
