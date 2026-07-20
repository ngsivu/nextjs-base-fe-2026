import { cn } from '@/utils/cn';

/**
 * Khung cho một component trong gallery. `id` dùng làm mốc cuộn cho sidebar.
 */
export function ShowcaseSection({
	id,
	title,
	description,
	children,
	className,
}: {
	id: string;
	title: string;
	description?: string;
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<section id={id} className="scroll-mt-20 py-10 first:pt-0 border-t border-border first:border-t-0">
			<div className="gap-4 flex items-baseline justify-between">
				<h3 className="text-lg font-medium tracking-[-0.3px]">{title}</h3>
				<code className="text-xs shrink-0 font-mono text-muted-foreground">{id}</code>
			</div>
			{description ? <p className="mt-1.5 text-sm text-muted-foreground">{description}</p> : null}

			<div className={cn('mt-5 p-6 rounded-lg border border-border bg-card', className)}>{children}</div>
		</section>
	);
}

/** Nhóm nhiều component cùng loại. */
export function ShowcaseGroup({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
	// Không dùng first:pt-0 — nhóm đầu tiên nằm ngay dưới viền của header,
	// bỏ padding sẽ khiến tiêu đề dán sát vào vạch kẻ.
	return (
		<div id={id} className="scroll-mt-20 pt-16">
			<h2 className="mb-8 font-medium text-[13px] tracking-[0.4px] text-primary uppercase">{title}</h2>
			{/* Bọc children trong div riêng để section đầu tiên thực sự là :first-child.
			    Nếu để {children} nằm cạnh <h2>, section đầu là con THỨ HAI nên
			    first:border-t-0 không khớp và mỗi nhóm dính một vạch kẻ thừa. */}
			<div>{children}</div>
		</div>
	);
}

/** Hàng ngang cho các biến thể, tự xuống dòng trên màn hẹp. */
export function Row({ children, className }: { children: React.ReactNode; className?: string }) {
	return <div className={cn('gap-3 flex flex-wrap items-center', className)}>{children}</div>;
}
