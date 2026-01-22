import { useAuthStore } from "@/stores/auth";
import { useNavigate } from "react-router";

export function useAuth() {
	const { username, setUsername } = useAuthStore();
	const navigate = useNavigate();

	function handleLogin(username: string) {
		setUsername(username);
		navigate("/main");
	}

	function handleLogout() {
		setUsername("");
		navigate("/");
	}

	const isAuthenticated = Boolean(username);

	return { username, isAuthenticated, handleLogin, handleLogout };
}
