import { z } from "zod";

// Ekspor schema agar bisa digunakan ulang di sisi Client maupun Server
export const themeSchema = z.object({
  fontFamily: z.enum(["Geist Variable", "Inter", "Serif", "Mono"]),
  primaryColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid Hex"),
  backgroundColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid Hex"),
  cardColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid Hex"),
  accentColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid Hex"),
  textColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid Hex"),
});

export type ThemePayload = z.infer<typeof themeSchema>;

export async function updateThemeApi(payload: ThemePayload, request: Request) {
  // Hanya berjalan di Server, sehingga aman dari browser pengguna
  const apiUrl = process.env.API_URL || "http://localhost:3001";
  
  // Karena berjalan di server, kita butuh manual passing cookie agar Backend membaca session login
  const cookie = request.headers.get("Cookie");

  const res = await fetch(`${apiUrl}/api/custom`, {
    method: "PATCH",
    headers: { 
      "Content-Type": "application/json",
      ...(cookie ? { "Cookie": cookie } : {})
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Gagal mengupdate tema");
  }

  return res.json();
}