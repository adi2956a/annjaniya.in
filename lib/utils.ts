import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import sanitizeHtml from "sanitize-html";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sanitizeText(value: string) {
  return sanitizeHtml(value, {
    allowedTags: [],
    allowedAttributes: {}
  }).trim();
}

export function maskMobile(mobile: string) {
  if (mobile.length !== 10) return mobile;
  return `${mobile.slice(0, 5)} XXXXX`;
}

export function formatDate(value: string | Date) {
  return new Intl.DateTimeFormat("hi-IN", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value));
}

export function complaintBadgeColor(status: string) {
  switch (status) {
    case "resolved":
      return "bg-emerald-100 text-emerald-800";
    case "in_progress":
      return "bg-amber-100 text-amber-900";
    case "rejected":
      return "bg-rose-100 text-rose-800";
    case "reopened":
      return "bg-sky-100 text-sky-800";
    default:
      return "bg-blue-100 text-blue-800";
  }
}

