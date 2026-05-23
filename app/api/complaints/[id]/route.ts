import { connectDB } from "@/lib/mongodb";
import { Complaint } from "@/models/Complaint";
import { ComplaintMessage } from "@/models/ComplaintMessage";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();

  const complaint = await Complaint.findOne({
    _id: params.id,
    isDeleted: false
  }).lean<{ _id: string } & Record<string, unknown>>();

  if (!complaint) {
    return Response.json({ error: "शिकायत नहीं मिली।" }, { status: 404 });
  }

  const messages = await ComplaintMessage.find({
    complaintId: complaint._id
  })
    .sort({ createdAt: 1 })
    .limit(20)
    .lean();

  return Response.json({ complaint, messages });
}
