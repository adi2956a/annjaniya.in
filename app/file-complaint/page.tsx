"use client";

import { useState } from "react";
import { Container } from "@/components/layout/Container";

export default function FileComplaintPage() {
  const [form, setForm] = useState({
    category: "electricity",
    location: "",
    title: "",
    description: "",
    isAnonymous: false
  });
  const [message, setMessage] = useState("");

  const submitComplaint = async () => {
    const response = await fetch("/api/complaints", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const payload = await response.json();

    if (!response.ok) {
      setMessage(payload.error);
      return;
    }

    setMessage(`शिकायत सफलतापूर्वक दर्ज हुई: ${payload.complaintId}`);
    setForm({
      category: "electricity",
      location: "",
      title: "",
      description: "",
      isAnonymous: false
    });
  };

  return (
    <Container className="py-10">
      <div className="mx-auto max-w-3xl rounded-[2rem] bg-white p-8 shadow-card">
        <h1 className="text-3xl font-bold">नई शिकायत दर्ज करें</h1>
        <p className="mt-2 text-sm text-ink/65">
          यह सुविधा केवल सत्यापित नागरिकों के लिए है।
        </p>

        <div className="mt-8 grid gap-4">
          <select
            className="rounded-2xl border border-black/10 px-4 py-3"
            value={form.category}
            onChange={(event) => setForm((prev) => ({ ...prev, category: event.target.value }))}
          >
            <option value="electricity">बिजली</option>
            <option value="water">पानी</option>
            <option value="road">सड़क</option>
            <option value="sanitation">स्वच्छता</option>
            <option value="ration">राशन</option>
            <option value="other">अन्य</option>
          </select>
          <input
            className="rounded-2xl border border-black/10 px-4 py-3"
            value={form.location}
            onChange={(event) => setForm((prev) => ({ ...prev, location: event.target.value }))}
            placeholder="स्थान / वार्ड / गली"
          />
          <input
            className="rounded-2xl border border-black/10 px-4 py-3"
            value={form.title}
            onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
            placeholder="संक्षिप्त शीर्षक"
          />
          <textarea
            className="min-h-36 rounded-2xl border border-black/10 px-4 py-3"
            value={form.description}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, description: event.target.value }))
            }
            placeholder="समस्या का पूरा विवरण"
          />
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.isAnonymous}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, isAnonymous: event.target.checked }))
              }
            />
            सार्वजनिक सूची में नाम छुपाएं
          </label>
          <button
            onClick={submitComplaint}
            className="rounded-2xl bg-accent px-4 py-3 font-semibold text-white"
          >
            शिकायत जमा करें
          </button>
          {message ? <p className="text-sm text-warm">{message}</p> : null}
        </div>
      </div>
    </Container>
  );
}

