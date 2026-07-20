import { QueryCache, QueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { ApiError } from '@/lib/apiError';

function makeQueryClient() {
	return new QueryClient({
		queryCache: new QueryCache({
			onError: (error, query) => {
				// Query nào tự xử lý lỗi thì đặt meta.skipGlobalError = true
				if (query.meta?.skipGlobalError) return;

				const message = error instanceof ApiError ? error.message : 'Không tải được dữ liệu, vui lòng thử lại.';
				toast.error(message);
			},
		}),
		defaultOptions: {
			queries: {
				// Phải > 0 để tránh refetch ngay lập tức sau khi hydrate
				staleTime: 60 * 1000,
				retry: (failureCount, error) => {
					// Không retry lỗi 4xx — retry cũng vô ích
					if (error instanceof ApiError && error.status < 500) return false;
					return failureCount < 2;
				},
			},
		},
	});
}

let browserQueryClient: QueryClient | undefined;

export function getQueryClient() {
	if (typeof window === 'undefined') {
		// Server: mỗi request một client mới, không chia sẻ state giữa các request
		return makeQueryClient();
	}
	browserQueryClient ??= makeQueryClient();
	return browserQueryClient;
}
