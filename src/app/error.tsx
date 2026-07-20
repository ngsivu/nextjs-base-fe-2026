'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<main className="gap-4 p-6 flex min-h-screen flex-col items-center justify-center">
			<h2 className="text-xl font-semibold">Đã có lỗi xảy ra</h2>
			<p className="text-sm text-muted-foreground">{error.message}</p>
			<Button onClick={reset}>Thử lại</Button>
		</main>
	);
}
