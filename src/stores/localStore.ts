import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type TableDensity = 'compact' | 'comfortable';

type LocalState = {
	token: string | null;
	setToken: (token: string | null) => void;
	tableDensity: TableDensity;
	setTableDensity: (density: TableDensity) => void;
};

/**
 * State được lưu xuống localStorage. Thay cho việc gọi localStorage rải rác.
 * Quy tắc: reload xong vẫn cần giữ thì để ở đây.
 *
 * skipHydration: true là BẮT BUỘC — Next render trên server nơi không có
 * localStorage, tự đọc lúc khởi tạo sẽ gây hydration mismatch.
 * Việc đọc lại do useHydrateStore đảm nhiệm.
 */
export const useLocalStore = create<LocalState>()(
	persist(
		(set) => ({
			token: null,
			setToken: (token) => set({ token }),
			tableDensity: 'comfortable',
			setTableDensity: (density) => set({ tableDensity: density }),
		}),
		{
			name: 'base-fe',
			storage: createJSONStorage(() => localStorage),
			partialize: (state) => ({
				token: state.token,
				tableDensity: state.tableDensity,
			}),
			skipHydration: true,
		},
	),
);
