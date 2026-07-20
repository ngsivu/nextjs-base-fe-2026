'use client';

import { useMediaQuery } from '@/hooks/useMediaQuery';

export const MOBILE_BREAKPOINT = 768;

/**
 * Đang ở viewport mobile hay không.
 *
 * Bản shadcn sinh ra dùng useState + useEffect nên vi phạm rule
 * react-hooks/set-state-in-effect của React Compiler. Ở đây dùng lại
 * useMediaQuery (chạy trên useSyncExternalStore) — vừa hết lỗi lint,
 * vừa không lặp logic.
 */
export function useIsMobile(): boolean {
	return useMediaQuery(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
}
