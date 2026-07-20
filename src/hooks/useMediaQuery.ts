'use client';

import { useCallback, useSyncExternalStore } from 'react';

/**
 * Theo dõi một media query.
 *
 * Dùng useSyncExternalStore thay vì useState + useEffect: tránh gọi setState
 * trong effect (React Compiler cảnh báo), đồng thời an toàn với SSR —
 * getServerSnapshot trả false nên server và client khớp nhau ở lần render đầu.
 */
export function useMediaQuery(query: string): boolean {
	const subscribe = useCallback(
		(onChange: () => void) => {
			const list = window.matchMedia(query);
			list.addEventListener('change', onChange);
			return () => list.removeEventListener('change', onChange);
		},
		[query],
	);

	const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);
	const getServerSnapshot = useCallback(() => false, []);

	return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
