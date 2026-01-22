import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthStore = {
	username: string;
	setUsername: (name: string) => void;
};

export const useAuthStore = create<AuthStore>()(
	persist(
		(set) => ({
			username: "",
			setUsername: (username) => set({ username }),
		}),
		{
			name: "auth-store",
		}
	)
);
