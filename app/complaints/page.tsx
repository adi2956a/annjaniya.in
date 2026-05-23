"use client";

import { useEffect, useState } from "react";
import { ComplaintCard } from "@/components/complaint/ComplaintCard";
import { Container } from "@/components/layout/Container";
import type { ComplaintListItem } from "@/types";

export default function ComplaintsPage() {
  const [complaints, setComplaints] = useState<ComplaintListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const response = await fetch("/api/complaints");
      const payload = await response.json();
      setComplaints(payload.complaints ?? []);
      setLoading(false);
    };

    void load();
  }, []);

  return (
    <Container className="py-10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">सभी शिकायतें</h1>
        <p className="mt-2 text-sm text-ink/65">
          सार्वजनिक सूची, स्थिति और आगे की बातचीत देखें।
        </p>
      </div>

      {loading ? (
        <div className="rounded-3xl bg-white p-6 shadow-card">लोड हो रहा है...</div>
      ) : complaints.length ? (
        <div className="grid gap-4">
          {complaints.map((complaint) => (
            <ComplaintCard key={complaint._id} complaint={complaint} />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl bg-white p-6 shadow-card">
          अभी तक कोई शिकायत उपलब्ध नहीं है।
        </div>
      )}
    </Container>
  );
}

