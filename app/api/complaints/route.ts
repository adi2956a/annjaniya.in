import { z } from "zod";
import { connectDB } from "@/lib/mongodb";
import { jsonError, parseJson, requireUser } from "@/lib/api";
import { sanitizeText } from "@/lib/utils";
import { Complaint } from "@/models/Complaint";
import { User } from "@/models/User";

const createComplaintSchema = z.object({
  title: z.string().min(5).max(100),
  description: z.string().min(20),
  category: z.enum(["electricity", "water", "road", "sanitation", "ration", "other"]),
  location: z.string().min(2),
  isAnonymous: z.boolean().optional().default(false)
});

export async function GET(request: Request) {
  await connectDB();

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const category = searchParams.get("category");
  const limit = Number(searchParams.get("limit") ?? "20");

  const query: Record<string, unknown> = { isDeleted: false };

  if (status && status !== "all") {
    query.status = status;
  }

  if (category && category !== "all") {
    query.category = category;
  }

  const [complaints, stats] = await Promise.all([
    Complaint.find(query).sort({ createdAt: -1 }).limit(limit).lean(),
    Complaint.aggregate([
      { $match: { isDeleted: false } },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ])
  ]);

  const mappedStats = {
    total: complaints.length,
    new: 0,
    in_progress: 0,
    resolved: 0,
    rejected: 0
  };

  for (const stat of stats) {
    if (stat._id in mappedStats) {
      mappedStats[stat._id as keyof typeof mappedStats] = stat.count;
    }
  }

  const total = await Complaint.countDocuments({ isDeleted: false });
  mappedStats.total = total;

  return Response.json({ complaints, total, stats: mappedStats });
}

export async function POST(request: Request) {
  const user = await requireUser(["verified", "admin"]);
  if (user instanceof Response) return user;

  await connectDB();

  const payload = await parseJson(request, createComplaintSchema);
  const author = await User.findById(user.userId).exec();

  if (!author) {
    return jsonError("उपयोगकर्ता नहीं मिला।", 404);
  }

  const complaintCount = await Complaint.countDocuments();
  const complaintId = `ANJ-${new Date().getFullYear()}-${String(complaintCount + 1).padStart(4, "0")}`;

  const complaint = await Complaint.create({
    complaintId,
    title: sanitizeText(payload.title),
    description: sanitizeText(payload.description),
    category: payload.category,
    location: sanitizeText(payload.location),
    authorId: author._id,
    authorName: author.displayName || "नागरिक",
    isAnonymous: payload.isAnonymous,
    status: "new",
    createdAt: new Date(),
    updatedAt: new Date()
  });

  return Response.json({
    complaint,
    complaintId: complaint.complaintId
  });
}
