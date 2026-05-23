"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/layout/Container";
import { complaintBadgeColor, formatDate } from "@/lib/utils";

interface ComplaintDetail {
  complaint: {
    complaintId: string;
    title: string;
    description: string;
    category: string;
    location: string;
    authorName: string;
    isAnonymous: boolean;
    status: string;
    supportCount: number;
    createdAt: string;
  };
  messages: Array<{
    _id: string;
    senderName: string;
    senderRole: string;
    content: string;
    isSystemMessage: boolean;
    createdAt: string;
  }>;
}

export default function ComplaintDetailPage({
  params
}: {
  params: { id: string };
}) {
  const [data, setData] = useState<ComplaintDetail | null>(null);

  useEffect(() => {
    const load = async () => {
      const response = await fetch(`/api/complaints/${params.id}`);
      const payload = await response.json();
      setData(payload);
    };

    void load();
  }, [params.id]);

  if (!data) {
    return (
      <Container className="py-10">
        <div className="rounded-3xl bg-white p-6 shadow-card">लोड हो रहा है...</div>
      </Container>
    );
  }

  return (
    <Container className="py-10">
      <div className="grid gap-6 lg:grid-cols-[0.95fr,1.05fr]">
        <section className="rounded-[2rem] bg-white p-6 shadow-card">
          <div className="mb-3 flex items-center gap-2">
            <Badge className="bg-stone-100 text-stone-700">
              {data.complaint.complaintId}
            </Badge>
            <Badge className={complaintBadgeColor(data.complaint.status)}>
              {data.complaint.status}
            </Badge>
          </div>
          <h1 className="text-3xl font-bold">{data.complaint.title}</h1>
          <p className="mt-4 whitespace-pre-wrap text-ink/80">
            {data.complaint.description}
          </p>
          <div className="mt-6 space-y-2 text-sm text-ink/65">
            <div>स्थान: {data.complaint.location}</div>
            <div>
              नागरिक: {data.complaint.isAnonymous ? "अज्ञात नागरिक" : data.complaint.authorName}
            </div>
            <div>समर्थन: {data.complaint.supportCount}</div>
            <div>दर्ज समय: {formatDate(data.complaint.createdAt)}</div>
          </div>
        </section>

        <section className="rounded-[2rem] bg-white p-6 shadow-card">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">चर्चा धागा</h2>
            <Badge className="bg-amber-100 text-amber-900">लॉगिन के बाद जवाब दें</Badge>
          </div>
          <div className="space-y-4">
            {data.messages.length ? (
              data.messages.map((message) =>
                message.isSystemMessage ? (
                  <div
                    key={message._id}
                    className="rounded-full bg-stone-100 px-4 py-2 text-center text-sm text-ink/70"
                  >
                    {message.content}
                  </div>
                ) : (
                  <div key={message._id} className="rounded-3xl bg-stone-50 p-4">
                    <div className="text-sm font-semibold">
                      {message.senderName}
                      <span className="ml-2 text-xs text-ink/55">{message.senderRole}</span>
                    </div>
                    <p className="mt-2 text-sm text-ink/80">{message.content}</p>
                    <div className="mt-2 text-xs text-ink/50">
                      {formatDate(message.createdAt)}
                    </div>
                  </div>
                )
              )
            ) : (
              <div className="rounded-3xl bg-stone-50 p-4 text-sm text-ink/65">
                अभी कोई संदेश उपलब्ध नहीं है।
              </div>
            )}
          </div>
        </section>
      </div>
    </Container>
  );
}

