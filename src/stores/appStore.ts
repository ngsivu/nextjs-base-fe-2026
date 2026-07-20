import { create } from 'zustand';

type AppState = {
	sidebarOpen: boolean;
	toggleSidebar: () => void;
	setSidebarOpen: (open: boolean) => void;
};

/**
 * State toàn ứng dụng, chỉ tồn tại trong bộ nhớ. Mất khi reload.
 * Quy tắc: reload xong không cần giữ thì để ở đây.
 */
export const useAppStore = create<AppState>((set) => ({
	sidebarOpen: true,
	toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
	setSidebarOpen: (open) => set({ sidebarOpen: open }),
}));
