import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
	index("routes/sign-up.tsx"),
	route("main", "guard-layout.tsx", [
		index("routes/main.tsx"),
	]),
] satisfies RouteConfig;
