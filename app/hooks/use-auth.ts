import type { User } from "@/services/api/auth/models";
import { useAuthStore } from "@/stores/auth";
import { useNavigate } from "react-router";

export function useAuth() {
	const { user, setUser } = useAuthStore();
	const navigate = useNavigate();

	function handleLogin(user: User) {
		setUser(user);
		navigate("/main");
	}

	function handleLogout() {
		setUser(null);
		navigate("/");
	}

	const isAuthenticated = Boolean(user);

	return { user, isAuthenticated, handleLogin, handleLogout };
}
