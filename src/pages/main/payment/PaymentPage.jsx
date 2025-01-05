import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Outlet } from "react-router-dom";
// import "../../../styles/Payment.css";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripePromise = loadStripe("pk_test_f3duw0VsAEM2TJFMtWQ90QAT");

const PaymentPage = () => {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt", amount: 1000 }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: "stripe",
  };
  // Enable the skeleton loader UI for optimal loading.
  const loader = "auto";

  return (
    <div className="App">
      {/* a */}
      {clientSecret && (
        <Elements
          options={{ clientSecret, appearance, loader }}
          stripe={stripePromise}
        >
          <Outlet />
          {/* <Routes>
              <Route path="/checkout" element={<CheckoutForm />} />
              <Route path="/complete" element={<CompletePage />} />
            </Routes> */}
        </Elements>
      )}
    </div>
  );
};

export default PaymentPage;
