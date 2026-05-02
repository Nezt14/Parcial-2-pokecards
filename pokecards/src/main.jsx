import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PayPalScriptProvider
      options={{
        "client-id": "test", // 👈 usa esto SOLO para probar visual
        currency: "USD",
        intent: "capture",
      }}
    >
      <App />
    </PayPalScriptProvider>
  </React.StrictMode>
);