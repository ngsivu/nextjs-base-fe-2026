'use client';

import { useEffect, useState } from 'react';
import { useLocalStore } from '@/stores/localStore';

/**
 * Đọc localStorage vào localStore sau khi component đã mount ở client.
 * Trả về false cho tới khi đọc xong.
 *
 * QUAN TRỌNG — luôn set hydrated dù rehydrate thành công hay thất bại:
 * khi trình duyệt chặn localStorage (Safari private mode, cookie bị tắt,
 * iframe sandbox không có allow-same-origin), zustand trả về `undefined`
 * thay vì Promise. Nếu chỉ dùng `?.then()` thì callback không bao giờ chạy,
 * `hydrated` kẹt ở false và AppInit treo SplashScreen vĩnh viễn —
 * người dùng thấy spinner quay mãi, không có lỗi nào được ném ra để bắt.
 */
export function useHydrateStore(): boolean {
	const [hydrated, setHydrated] = useState(false);

	useEffect(() => {
		let cancelled = false;

		Promise.resolve(useLocalStore.persist.rehydrate())
			.catch(() => {
				// Không đọc được localStorage thì dùng giá trị mặc định của store.
				// App vẫn phải chạy được.
			})
			.finally(() => {
				if (!cancelled) setHydrated(true);
			});

		return () => {
			cancelled = true;
		};
	}, []);

	return hydrated;
}
