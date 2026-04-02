import type { LoaderFunctionArgs } from "react-router";
import { members } from "../../../src/modules/HomeModule/const";

export async function loader({ request }: LoaderFunctionArgs) {
  let theme = null;
  
  try {
    const apiUrl = process.env.API_URL || "http://localhost:3001";
    const res = await fetch(`${apiUrl}/api/custom`);
    if (res.ok) {
      theme = await res.json();
    }
  } catch (error) {
    console.error("Failed to load theme configuration:", error);
  }
  
  return { members, theme };
}