"use client";

import { useEffect, useState } from "react";
import { ComplaintCard } from "@/components/complaint/ComplaintCard";
import { Container } from "@/components/layout/Container";
import type { ComplaintListItem } from "@/types";

interface HomePayload {
  complaints: ComplaintListItem[];
  total: number;
  stats: {
    total: number;
    new: number;
    in_progress: number;
    resolved: number;
    rejected: number;
  };
}

export function HomeClient() {
  const [data, setData] = useState<HomePayload | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const response = await fetch("/api/complaints?limit=5");
      const payload = await response.json();
      setData(payload);
      setLoading(false);
    };

    void load();
  }, []);

  return (
    <Container className="py-10">
      <section className="grid gap-8 lg:grid-cols-[1.2fr,0.8fr]">
        <div className="rounded-[2rem] bg-ink p-8 text-white shadow-card">
          <div className="mb-4 inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">
            अंजनिया ग्राम पोर्टल
          </div>
          <h1 className="max-w-2xl text-4xl font-bold leading-tight">
            गांव की शिकायत, जवाब और सामुदायिक बातचीत अब एक ही जगह।
          </h1>
          <p className="mt-4 max-w-xl text-white/75">
            सार्वजनिक शिकायत सूची, OTP लॉगिन, सत्यापित नागरिकों के लिए दर्ज सुविधा,
            और Team anjaniya.in द्वारा पारदर्शी ट्रैकिंग।
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            ["कुल शिकायतें", data?.stats.total ?? 0],
            ["नई", data?.stats.new ?? 0],
            ["प्रगति पर", data?.stats.in_progress ?? 0],
            ["समाधान", data?.stats.resolved ?? 0]
          ].map(([label, value]) => (
            <div key={label} className="rounded-3xl bg-white p-5 shadow-card">
              <div className="text-sm text-ink/60">{label}</div>
              <div className="mt-2 text-3xl font-bold">{value}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">ताज़ा शिकायतें</h2>
        </div>
        {loading ? (
          <div className="rounded-3xl bg-white p-6 shadow-card">लोड हो रहा है...</div>
        ) : data?.complaints.length ? (
          <div className="grid gap-4">
            {data.complaints.map((complaint) => (
              <ComplaintCard key={complaint._id} complaint={complaint} />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl bg-white p-6 shadow-card">
            अभी कोई शिकायत दर्ज नहीं हुई है।
          </div>
        )}
      </section>
    </Container>
  );
}

