import type { LoaderFunctionArgs } from "react-router";
import { members } from "../../../src/modules/HomeModule/const";
import { auth } from "~/lib/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (session) {
    console.log("✅ User terdeteksi di Backend:", session.user.email);
  } else {
    console.log("❌ Tidak ada user login di Backend");
  }

  return { 
    members, 
    user: session?.user || null,
    session 
  };
}
