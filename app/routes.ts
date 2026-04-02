import { type RouteConfig, index } from "@react-router/dev/routes";
import { route } from "@react-router/dev/routes";
export default [
  index("routes/Home/page.tsx"),
  route("/api/*", "routes/api.$.tsx"),
] satisfies RouteConfig;
