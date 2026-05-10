"use client";

import { useState } from "react";

interface Props {
  lookupKey: string;
  children: React.ReactNode;
  className?: string;
}

export default function CheckoutButton({ lookupKey, children, className }: Props) {
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lookupKey }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setLoading(false);
      }
    } catch {
      setLoading(false);
    }
  }

  return (
    <button onClick={handleCheckout} disabled={loading} className={className}>
      {loading ? "Aguarde..." : children}
    </button>
  );
}
