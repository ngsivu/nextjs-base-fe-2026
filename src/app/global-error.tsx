'use client';

// Không dùng component shadcn ở đây: nếu lỗi nằm ở tầng CSS/provider
// thì chúng cũng hỏng theo. global-error thay thế cả root layout
// nên phải tự render <html> và <body>.
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
	return (
		<html lang="vi">
			<body>
				<main style={{ display: 'grid', placeItems: 'center', minHeight: '100vh', gap: '1rem' }}>
					<h2>Ứng dụng gặp sự cố</h2>
					<p>{error.message}</p>
					<button onClick={reset}>Tải lại</button>
				</main>
			</body>
		</html>
	);
}
