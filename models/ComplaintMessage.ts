import { Schema, model, models, type InferSchemaType } from "mongoose";

const complaintMessageSchema = new Schema(
  {
    complaintId: {
      type: Schema.Types.ObjectId,
      ref: "Complaint",
      required: true,
      index: true
    },
    senderId: { type: Schema.Types.ObjectId, ref: "User", default: null },
    senderName: { type: String, required: true },
    senderRole: { type: String, required: true },
    isAnonymous: { type: Boolean, default: false },
    messageType: {
      type: String,
      enum: ["text", "image", "voice", "system"],
      default: "text"
    },
    content: { type: String, required: true },
    mediaUrl: { type: String, default: "" },
    isSystemMessage: { type: Boolean, default: false },
    systemEvent: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now }
  },
  { versionKey: false }
);

complaintMessageSchema.index({ complaintId: 1, createdAt: 1 });

export type ComplaintMessageDocument = InferSchemaType<
  typeof complaintMessageSchema
> & { _id: string };
export const ComplaintMessage =
  models.ComplaintMessage || model("ComplaintMessage", complaintMessageSchema);

