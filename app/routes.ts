import { type RouteConfig, index } from "@react-router/dev/routes";
import { route } from "@react-router/dev/routes";
export default [
  index("routes/Home/page.tsx"),
  route("/auth", "routes/Auth/page.tsx"),
] satisfies RouteConfig;
