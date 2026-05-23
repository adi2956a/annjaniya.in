import { Schema, model, models, type InferSchemaType } from "mongoose";

const userSchema = new Schema(
  {
    mobile: { type: String, required: true, unique: true, index: true },
    displayName: { type: String, default: "" },
    role: {
      type: String,
      enum: ["member", "verified", "officer", "admin"],
      default: "member",
      index: true
    },
    isVerified: { type: Boolean, default: false, index: true },
    ward: { type: String, default: "" },
    officerTitle: { type: String, default: "" },
    officerDept: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now },
    lastActiveAt: { type: Date, default: Date.now },
    isBlocked: { type: Boolean, default: false },
    blockedReason: { type: String, default: "" }
  },
  { versionKey: false }
);

export type UserDocument = InferSchemaType<typeof userSchema> & { _id: string };
export const User = models.User || model("User", userSchema);

