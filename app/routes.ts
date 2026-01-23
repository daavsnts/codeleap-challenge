import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
	index("routes/sign-up/route.tsx"),
	route("main", "routes/main/route.tsx"),
] satisfies RouteConfig;
