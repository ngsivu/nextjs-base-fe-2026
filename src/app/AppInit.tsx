'use client';

import { SplashScreen } from '@/components/layout/SplashScreen';
import { useHydrateStore } from '@/hooks/useHydrateStore';

/**
 * Nơi chạy các hook khởi tạo ứng dụng. Nằm BÊN TRONG Providers nên dùng
 * được mọi context (QueryClient, theme).
 *
 * Thêm hook init mới vào đây, ví dụ:
 *   useInitAuth()
 *   useInitConfig()
 */
export function AppInit({ children }: { children: React.ReactNode }) {
	const hydrated = useHydrateStore();

	if (!hydrated) return <SplashScreen />;

	return <>{children}</>;
}
