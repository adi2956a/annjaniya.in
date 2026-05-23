"use client";

import { useState } from "react";
import { Container } from "@/components/layout/Container";

export default function LoginPage() {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"mobile" | "otp">("mobile");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const sendOtp = async () => {
    setLoading(true);
    const response = await fetch("/api/auth/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobile })
    });

    const payload = await response.json();
    setLoading(false);

    if (!response.ok) {
      setMessage(payload.error);
      return;
    }

    setMessage("OTP भेज दिया गया है।");
    setStep("otp");
  };

  const verifyOtp = async () => {
    setLoading(true);
    const response = await fetch("/api/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobile, otp })
    });

    const payload = await response.json();
    setLoading(false);

    if (!response.ok) {
      setMessage(payload.error);
      return;
    }

    window.location.href = payload.redirectTo;
  };

  return (
    <Container className="py-16">
      <div className="mx-auto max-w-md rounded-[2rem] bg-white p-8 shadow-card">
        <h1 className="text-3xl font-bold">OTP लॉगिन</h1>
        <p className="mt-2 text-sm text-ink/65">
          मोबाइल नंबर डालें। पासवर्ड की जरूरत नहीं है।
        </p>

        <div className="mt-8 space-y-4">
          <input
            value={mobile}
            onChange={(event) => setMobile(event.target.value.replace(/\D/g, "").slice(0, 10))}
            className="w-full rounded-2xl border border-black/10 px-4 py-3"
            placeholder="मोबाइल नंबर"
            inputMode="numeric"
          />

          {step === "otp" ? (
            <input
              value={otp}
              onChange={(event) => setOtp(event.target.value.replace(/\D/g, "").slice(0, 6))}
              className="w-full rounded-2xl border border-black/10 px-4 py-3 tracking-[0.4em]"
              placeholder="6 अंकों का OTP"
              inputMode="numeric"
            />
          ) : null}

          <button
            onClick={step === "mobile" ? sendOtp : verifyOtp}
            disabled={loading}
            className="w-full rounded-2xl bg-ink px-4 py-3 font-semibold text-white"
          >
            {loading ? "कृपया प्रतीक्षा करें..." : step === "mobile" ? "OTP भेजें" : "OTP सत्यापित करें"}
          </button>

          {message ? <p className="text-sm text-warm">{message}</p> : null}
        </div>
      </div>
    </Container>
  );
}

