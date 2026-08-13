import { cn } from '@/utils/cn';

/**
 * Khung section chung: eyebrow + tiêu đề + nội dung.
 *
 * Eyebrow dùng tracking dương (+0.4px) đối lập với tracking âm của tiêu đề —
 * theo DESIGN.md, tương phản đó đánh dấu eyebrow là nhãn phân loại.
 */
export function Section({
	eyebrow,
	title,
	description,
	children,
	className,
}: {
	eyebrow: string;
	title: string;
	description?: string;
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<section className={cn('py-16 sm:py-24 border-t border-border', className)}>
			<p className="mb-3 text-eyebrow text-primary-text uppercase">{eyebrow}</p>
			<h2 className="text-headline">{title}</h2>
			{description ? <p className="mt-3 max-w-2xl text-muted-foreground">{description}</p> : null}
			<div className="mt-8">{children}</div>
		</section>
	);
}
