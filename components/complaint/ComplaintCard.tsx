import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { complaintBadgeColor, formatDate } from "@/lib/utils";
import type { ComplaintListItem } from "@/types";

export function ComplaintCard({ complaint }: { complaint: ComplaintListItem }) {
  return (
    <article className="rounded-3xl border border-black/5 bg-white p-5 shadow-card">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <Badge className="bg-stone-100 text-stone-700">{complaint.complaintId}</Badge>
        <Badge className={complaintBadgeColor(complaint.status)}>
          {statusLabel(complaint.status)}
        </Badge>
      </div>
      <h3 className="mb-2 text-lg font-semibold">{complaint.title}</h3>
      <p className="mb-4 line-clamp-2 text-sm text-ink/70">{complaint.description}</p>
      <div className="mb-4 flex flex-wrap gap-4 text-sm text-ink/70">
        <span>श्रेणी: {categoryLabel(complaint.category)}</span>
        <span>स्थान: {complaint.location}</span>
        <span>समर्थन: {complaint.supportCount}</span>
        <span>जवाब: {complaint.messageCount}</span>
      </div>
      <div className="flex items-center justify-between text-sm">
        <div className="text-ink/60">
          <div>{complaint.isAnonymous ? "अज्ञात नागरिक" : complaint.authorName}</div>
          <div>{formatDate(complaint.createdAt)}</div>
        </div>
        <Link
          href={`/complaints/${complaint._id}`}
          className="rounded-full bg-accent px-4 py-2 font-semibold text-white"
        >
          चैट देखें
        </Link>
      </div>
    </article>
  );
}

function statusLabel(status: string) {
  switch (status) {
    case "in_progress":
      return "प्रगति पर";
    case "resolved":
      return "समाधान हुआ";
    case "rejected":
      return "अस्वीकृत";
    case "reopened":
      return "फिर खुली";
    default:
      return "नई";
  }
}

function categoryLabel(category: string) {
  switch (category) {
    case "electricity":
      return "बिजली";
    case "water":
      return "पानी";
    case "road":
      return "सड़क";
    case "sanitation":
      return "स्वच्छता";
    case "ration":
      return "राशन";
    default:
      return "अन्य";
  }
}

