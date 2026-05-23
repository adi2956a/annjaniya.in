import bcrypt from "bcryptjs";

export function isValidIndianMobile(mobile: string) {
  return /^[6-9]\d{9}$/.test(mobile);
}

export function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function hashOtp(otp: string) {
  return bcrypt.hash(otp, 10);
}

export async function compareOtp(otp: string, hash: string) {
  return bcrypt.compare(otp, hash);
}

export async function sendOtpMessage(mobile: string, otp: string) {
  if (!process.env.FAST2SMS_API_KEY) {
    console.log(`[OTP MOCK] ${mobile}: ${otp}`);
    return { mocked: true };
  }

  const response = await fetch("https://www.fast2sms.com/dev/bulkV2", {
    method: "POST",
    headers: {
      authorization: process.env.FAST2SMS_API_KEY,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      route: "q",
      message: `आपका OTP है: ${otp}`,
      language: "unicode",
      flash: 0,
      numbers: mobile
    })
  });

  if (!response.ok) {
    throw new Error("OTP SMS could not be sent.");
  }

  return response.json();
}

