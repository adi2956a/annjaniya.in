import { Schema, model, models, type InferSchemaType } from "mongoose";

const complaintSchema = new Schema(
  {
    complaintId: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true, maxlength: 100 },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: ["electricity", "water", "road", "sanitation", "ration", "other"],
      required: true,
      index: true
    },
    location: { type: String, required: true },
    photos: { type: [String], default: [] },
    voiceNote: { type: String, default: "" },
    authorId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    authorName: { type: String, required: true },
    isAnonymous: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["new", "in_progress", "resolved", "rejected", "reopened"],
      default: "new",
      index: true
    },
    assignedTo: { type: Schema.Types.ObjectId, ref: "User", default: null, index: true },
    supportCount: { type: Number, default: 0 },
    supportedBy: { type: [Schema.Types.ObjectId], default: [] },
    viewCount: { type: Number, default: 0 },
    messageCount: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now, index: true },
    updatedAt: { type: Date, default: Date.now },
    isDeleted: { type: Boolean, default: false }
  },
  { versionKey: false }
);

complaintSchema.index({ status: 1, createdAt: -1 });

export type ComplaintDocument = InferSchemaType<typeof complaintSchema> & {
  _id: string;
};
export const Complaint = models.Complaint || model("Complaint", complaintSchema);

