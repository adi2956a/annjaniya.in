export type UserRole = "guest" | "member" | "verified" | "officer" | "admin";

export type ComplaintStatus =
  | "new"
  | "in_progress"
  | "resolved"
  | "rejected"
  | "reopened";

export type ComplaintCategory =
  | "electricity"
  | "water"
  | "road"
  | "sanitation"
  | "ration"
  | "other";

export interface SessionUser {
  userId: string;
  mobile: string;
  role: UserRole;
  isVerified: boolean;
  displayName?: string;
}

export interface ComplaintListItem {
  _id: string;
  complaintId: string;
  title: string;
  description: string;
  category: ComplaintCategory;
  location: string;
  authorName: string;
  isAnonymous: boolean;
  status: ComplaintStatus;
  supportCount: number;
  messageCount: number;
  createdAt: string;
}

