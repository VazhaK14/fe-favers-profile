import { data, type ActionFunctionArgs } from "react-router";
import { updateThemeApi, themeSchema } from "../../../lib/api/theme";

export async function action({ request }: ActionFunctionArgs) {
  if (request.method === "PATCH") {
    try {
      const payload = await request.json();
      
      // Validasi ulang di sisi server untuk keamanan ekstra
      const validPayload = themeSchema.parse(payload);
      const result = await updateThemeApi(validPayload, request);
      
      return data({ success: true, theme: result.theme });
    } catch (error: any) {
      return data({ success: false, error: error.message }, { status: 400 });
    }
  }
  return null;
}