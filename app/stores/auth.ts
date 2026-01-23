import type { User } from "@/services/api/auth/models";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthStore = {
	user: User | null;
	setUser: (user: User | null) => void;
};

export const useAuthStore = create<AuthStore>()(
	persist(
		(set) => ({
			user: null,
			setUser: (user) => set({ user}),
		}),
		{
			name: "auth-store",
		},
	),
);
