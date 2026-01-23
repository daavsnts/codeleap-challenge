import type { User } from "@/services/api/auth/models";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthStore = {
	user: User | null;
	setUser: (user: User | null) => void;
	hasHydrated: boolean;
	setHasHydrated: (value: boolean) => void;
};

export const useAuthStore = create<AuthStore>()(
	persist(
		(set) => ({
			user: null,
			setUser: (user) => set({ user }),
			hasHydrated: false,
			setHasHydrated: (value) => set({ hasHydrated: value }),
		}),
		{
			name: "auth-store",
			onRehydrateStorage: () => (state) => {
				state?.setHasHydrated(true);
			},
		},
	),
);
