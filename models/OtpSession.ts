import { Schema, model, models, type InferSchemaType } from "mongoose";

const otpSessionSchema = new Schema(
  {
    mobile: { type: String, required: true, index: true },
    otp: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    verified: { type: Boolean, default: false },
    attempts: { type: Number, default: 0 },
    lockedUntil: { type: Date, default: null },
    createdAt: { type: Date, default: Date.now, expires: 3600 }
  },
  { versionKey: false }
);

export type OtpSessionDocument = InferSchemaType<typeof otpSessionSchema> & {
  _id: string;
};
export const OtpSession =
  models.OtpSession || model("OtpSession", otpSessionSchema);

