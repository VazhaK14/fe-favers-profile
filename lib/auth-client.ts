import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // baseURL untuk auth tetap butuh VITE_PUBLIC agar fitur login berfungsi di sisi client
  baseURL: import.meta.env.VITE_PUBLIC_API_URL || "http://localhost:3001",
});

// Infer base session types
export type Session = typeof authClient.$Infer.Session;

// Extend User type untuk mencakup custom field `role` dari backend
export type ActiveUser = typeof authClient.$Infer.Session.user & {
  role?: "USER" | "MEMBER";
};