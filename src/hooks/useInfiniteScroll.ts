'use client';

import { useInfiniteQuery, type QueryKey } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

type Options<TItem> = {
	queryKey: QueryKey;
	queryFn: (page: number) => Promise<{ items: TItem[]; total: number }>;
	pageSize: number;
};

/**
 * Gộp useInfiniteQuery với IntersectionObserver: gắn `sentinelRef` vào
 * một phần tử cuối danh sách, khi nó lọt vào viewport thì tự tải trang tiếp.
 */
export function useInfiniteScroll<TItem>({ queryKey, queryFn, pageSize }: Options<TItem>) {
	const query = useInfiniteQuery({
		queryKey,
		queryFn: ({ pageParam }) => queryFn(pageParam),
		initialPageParam: 1,
		getNextPageParam: (lastPage, allPages) => {
			const loaded = allPages.reduce((sum, page) => sum + page.items.length, 0);
			return loaded < lastPage.total ? allPages.length + 1 : undefined;
		},
	});

	// rootMargin: tải trước khi người dùng cuộn tới đáy, cảm giác mượt hơn
	const { ref: sentinelRef, inView } = useInView({ rootMargin: '200px' });

	const { fetchNextPage, hasNextPage, isFetchingNextPage } = query;

	useEffect(() => {
		// Guard bắt buộc: thiếu nó thì sentinel còn trong viewport
		// sẽ gọi fetchNextPage liên tục
		if (inView && hasNextPage && !isFetchingNextPage) {
			fetchNextPage();
		}
	}, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

	const items = query.data?.pages.flatMap((page) => page.items) ?? [];

	return {
		items,
		sentinelRef,
		isPending: query.isPending,
		isError: query.isError,
		isFetchingNextPage,
		hasNextPage: Boolean(hasNextPage),
		total: query.data?.pages[0]?.total ?? 0,
		pageSize,
	};
}
