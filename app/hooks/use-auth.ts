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
  // Workaround because of our auth simulation storing null user
	const authenticatedUser = user as User;

	return {
		user: authenticatedUser,
		isAuthenticated,
		handleLogin,
		handleLogout,
	};
}
