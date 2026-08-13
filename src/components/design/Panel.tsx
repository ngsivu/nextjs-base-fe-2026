import { cn } from '@/utils/cn';

/**
 * Khuôn dùng chung cho MỌI khối của trang /design.
 *
 * Mọi section phải bọc bằng `Panel` và mọi khối con bọc bằng `Row` để trang
 * giữ một nhịp thống nhất. Không tự chế cấu trúc panel khác.
 */
export function Panel({
	id,
	title,
	intro,
	children,
}: {
	id?: string;
	title: string;
	intro?: string;
	children: React.ReactNode;
}) {
	return (
		<section id={id} className="scroll-mt-20 p-6 rounded-lg border border-border bg-card">
			<h2 className="text-section text-foreground">{title}</h2>
			{intro && <p className="mt-1 max-w-[65ch] text-body text-ink-muted">{intro}</p>}
			<div className="mt-6 space-y-6">{children}</div>
		</section>
	);
}

/**
 * Khối con bên trong một Panel: tiêu đề nhỏ, ghi chú tuỳ chọn, nội dung.
 *
 * `action` là chỗ đặt nút điều khiển demo của Row. Dùng nó
 * thay vì tự kéo nút lên bằng negative margin, vì cách đó vỡ khi tiêu đề xuống dòng.
 */
export function Row({
	title,
	note,
	action,
	children,
	className,
}: {
	title: string;
	note?: string;
	action?: React.ReactNode;
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<div className={className}>
			<div className="gap-3 flex flex-wrap items-start justify-between">
				<h3 className="font-medium text-body text-foreground">{title}</h3>
				{action && <div className="gap-2 flex shrink-0">{action}</div>}
			</div>
			{note && <p className="mt-1 max-w-[65ch] text-caption text-muted-foreground">{note}</p>}
			<div className="mt-3">{children}</div>
		</div>
	);
}

/** Nhãn mono cho tên token hoặc giá trị. Dùng thay cho việc tự đặt class mono. */
export function Spec({ children, className }: { children: React.ReactNode; className?: string }) {
	return <span className={cn('numeric font-mono text-caption text-muted-foreground', className)}>{children}</span>;
}
