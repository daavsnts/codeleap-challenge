import { Outlet, useNavigate } from "react-router";
import { useAuth } from "@/hooks";
import { useEffect } from "react";

// Client auth guard layout for now
export default function GuardLayout() {
	const { isAuthenticated, hasHydrated } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (hasHydrated && !isAuthenticated) navigate("/", { replace: true });
	}, [isAuthenticated, hasHydrated, navigate]);

	if (!hasHydrated) return null;

	return isAuthenticated ? <Outlet /> : null;
}
