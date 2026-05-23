import { z } from "zod";
import { connectDB } from "@/lib/mongodb";
import { generateOtp, hashOtp, isValidIndianMobile, sendOtpMessage } from "@/lib/otp";
import { jsonError, parseJson } from "@/lib/api";
import { OtpSession } from "@/models/OtpSession";

const schema = z.object({
  mobile: z.string()
});

export async function POST(request: Request) {
  const { mobile } = await parseJson(request, schema);

  if (!isValidIndianMobile(mobile)) {
    return jsonError("मान्य भारतीय मोबाइल नंबर दर्ज करें।");
  }

  await connectDB();

  const existing = await OtpSession.findOne({ mobile })
    .sort({ createdAt: -1 })
    .select("createdAt")
    .lean<{ createdAt?: Date } | null>();

  if (existing?.createdAt) {
    const secondsSinceLastOtp =
      (Date.now() - new Date(existing.createdAt).getTime()) / 1000;

    if (secondsSinceLastOtp < 60) {
      return jsonError("नया OTP 60 सेकंड बाद मांगें।", 429);
    }
  }

  const otp = generateOtp();

  await OtpSession.create({
    mobile,
    otp: await hashOtp(otp),
    expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    verified: false,
    attempts: 0
  });

  await sendOtpMessage(mobile, otp);

  return Response.json({
    success: true,
    message: "OTP भेज दिया गया है।",
    expiresIn: 600
  });
}
