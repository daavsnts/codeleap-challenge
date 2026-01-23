import type { User } from "@/services/api/auth/models";
import { useAuthStore } from "@/stores/auth";
import { useNavigate } from "react-router";

export function useAuth() {
	const { user, setUser, hasHydrated } = useAuthStore();
	const navigate = useNavigate();

	function handleLogin(user: User) {
		setUser(user);
		navigate("/main");
	}

	function handleLogout() {
		useAuthStore.persist.clearStorage();
		setUser(null);
		navigate("/");
	}

	return {
		user: user as User,
		isAuthenticated: Boolean(user),
		hasHydrated,
		handleLogin,
		handleLogout,
	};
}
