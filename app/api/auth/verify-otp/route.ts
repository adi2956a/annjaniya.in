import { z } from "zod";
import { connectDB } from "@/lib/mongodb";
import { setSessionCookie, signSessionToken } from "@/lib/auth";
import { compareOtp, isValidIndianMobile } from "@/lib/otp";
import { jsonError, parseJson } from "@/lib/api";
import { OtpSession } from "@/models/OtpSession";
import { User } from "@/models/User";

const schema = z.object({
  mobile: z.string(),
  otp: z.string().length(6)
});

export async function POST(request: Request) {
  const { mobile, otp } = await parseJson(request, schema);

  if (!isValidIndianMobile(mobile)) {
    return jsonError("मान्य मोबाइल नंबर दर्ज करें।");
  }

  await connectDB();

  const session = await OtpSession.findOne({ mobile, verified: false })
    .sort({ createdAt: -1 })
    .exec();

  if (!session) {
    return jsonError("OTP सत्र नहीं मिला।", 404);
  }

  if (session.lockedUntil && new Date(session.lockedUntil) > new Date()) {
    return jsonError("बहुत कोशिशें हो चुकी हैं। 30 मिनट बाद पुनः प्रयास करें।", 423);
  }

  if (new Date(session.expiresAt) < new Date()) {
    return jsonError("OTP समाप्त हो चुका है।", 410);
  }

  const matched = await compareOtp(otp, session.otp);

  if (!matched) {
    session.attempts += 1;
    if (session.attempts >= 5) {
      session.lockedUntil = new Date(Date.now() + 30 * 60 * 1000);
    }
    await session.save();
    return jsonError("गलत OTP।", 400);
  }

  session.verified = true;
  await session.save();

  let user = await User.findOne({ mobile }).exec();

  if (!user) {
    user = await User.create({
      mobile,
      displayName: `नागरिक ${mobile.slice(-4)}`,
      role: "member",
      isVerified: false
    });
  }

  user.lastActiveAt = new Date();
  await user.save();

  const token = await signSessionToken({
    userId: user._id.toString(),
    mobile: user.mobile,
    role: user.role,
    isVerified: user.isVerified,
    displayName: user.displayName
  });

  setSessionCookie(token);

  return Response.json({
    user: {
      id: user._id.toString(),
      displayName: user.displayName,
      role: user.role,
      isVerified: user.isVerified
    },
    redirectTo: user.role === "admin" ? "/admin" : "/"
  });
}
