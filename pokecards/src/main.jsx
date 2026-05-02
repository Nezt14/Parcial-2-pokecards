import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <PayPalScriptProvider
    options={{
      "client-id": "test",
      currency: "USD",
      intent: "capture",
    }}
  >
    <App />
  </PayPalScriptProvider>
);