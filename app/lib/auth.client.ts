import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // baseURL can be inferred if it is the same origin, or set manually
  baseURL: import.meta.env.VITE_BETTER_AUTH_URL || "http://localhost:5173",
});
