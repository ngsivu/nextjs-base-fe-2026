import { cn } from '@/utils/cn';

/**
 * Nhãn trạng thái — component trình bày thuần, không biết gì về nghiệp vụ.
 *
 * Màu semantic LUÔN đi kèm chữ: người mù màu và bản in đen trắng vẫn phải đọc
 * được trạng thái. Chấm màu ở đây hợp lệ vì nó mang trạng thái thật chứ không
 * phải trang trí (xem mục Technical trong DESIGN.md).
 *
 * Class viết đủ chuỗi trong map để Tailwind quét được; đừng ghép chuỗi động.
 */
const TONE = {
	neutral: { chip: 'bg-secondary text-ink-muted', dot: 'bg-muted-foreground' },
	info: { chip: 'bg-info-subtle text-info', dot: 'bg-info' },
	success: { chip: 'bg-success-subtle text-success', dot: 'bg-success' },
	warning: { chip: 'bg-warning-subtle text-warning', dot: 'bg-warning' },
	danger: { chip: 'bg-danger-subtle text-danger', dot: 'bg-danger' },
} as const;

export type StatusTone = keyof typeof TONE;

export function StatusBadge({
	tone = 'neutral',
	children,
	className,
}: {
	tone?: StatusTone;
	children: React.ReactNode;
	className?: string;
}) {
	const { chip, dot } = TONE[tone];

	return (
		<span
			className={cn(
				'gap-1.5 px-2 py-0.5 font-medium inline-flex items-center rounded-sm text-caption',
				chip,
				className,
			)}
		>
			<span className={cn('size-1.5 shrink-0 rounded-full', dot)} aria-hidden />
			{children}
		</span>
	);
}
