'use client';

import { useState, useSyncExternalStore } from 'react';
import NumberFlow from '@number-flow/react';
import { RotateCwIcon } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { Panel, Row, Spec } from '@/components/design/Panel';
import { Button } from '@/components/ui/button';
import { cn } from '@/utils/cn';

import { EASE_OUT } from '@/constants/motion';

type DurationKind = 'feedback' | 'state' | 'alive';

const DURATIONS: { kind: DurationKind; value: string; use: string }[] = [
	{ kind: 'feedback', value: '0.2s', use: 'Phản hồi tương tác: hover, nhấn nút, đóng mở menu.' },
	{ kind: 'state', value: '0.3s', use: 'Đổi trạng thái: nội dung mới hiện ra, panel mở, chuyển tab.' },
	{ kind: 'alive', value: '2.4s', use: 'Nhịp trạng thái đang sống: chỉ báo đang xử lý, đang đồng bộ.' },
];

const NUMBER_VI = new Intl.NumberFormat('vi-VN');
const STORY = ['Tải lên', 'Xử lý', 'Hoàn tất'];

/* Server không đọc được prefers-reduced-motion nên phải dựng bản tĩnh trước rồi mới bật chuyển động:
   (1) markup của server và của lần hydrate đầu khớp nhau, (2) người bật giảm chuyển động không kịp
   thấy khung nào chạy. Dùng useSyncExternalStore thay cho setState trong effect để khỏi render thừa. */
const subscribeNever = () => () => {};

/** Ô demo cho một bậc thời lượng. `animate` false thì trả về đúng khung tĩnh, không dựng motion. */
function DurationDemo({ kind, animate, runKey }: { kind: DurationKind; animate: boolean; runKey: number }) {
	const track = 'flex h-8 w-24 shrink-0 items-center rounded-xs border border-border bg-secondary px-2';

	if (!animate) {
		return (
			<div className={track} aria-hidden>
				<span className={cn('size-4 rounded-xs bg-primary', kind === 'feedback' && 'ml-auto')} />
			</div>
		);
	}

	return (
		<div className={track} aria-hidden>
			{kind === 'feedback' && (
				<motion.span
					key={runKey}
					className="size-4 rounded-xs bg-primary"
					initial={{ x: 0 }}
					animate={{ x: 56 }}
					transition={{ duration: 0.2, ease: EASE_OUT }}
				/>
			)}
			{kind === 'state' && (
				<motion.span
					key={runKey}
					className="size-4 mx-auto rounded-xs bg-primary"
					initial={{ opacity: 0, scale: 0.6 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.3, ease: EASE_OUT }}
				/>
			)}
			{kind === 'alive' && (
				<motion.span
					className="size-4 mx-auto rounded-xs bg-primary"
					animate={{ opacity: [1, 0.4, 1], scale: [1, 0.8, 1] }}
					transition={{ duration: 2.4, ease: 'easeInOut', repeat: Infinity }}
				/>
			)}
		</div>
	);
}

export function MotionTokens() {
	const shouldReduceMotion = useReducedMotion();
	const mounted = useSyncExternalStore(
		subscribeNever,
		() => true,
		() => false,
	);
	const [runKey, setRunKey] = useState(0);
	const [count, setCount] = useState(1284);

	const animate = mounted && !shouldReduceMotion;
	const status = mounted ? (shouldReduceMotion ? 'có' : 'không') : 'đang kiểm tra';

	return (
		<Panel
			id="chuyen-dong"
			title="Chuyển động"
			intro="Cường độ chuyển động của app đặt ở mức 4 trên 10: đủ để giải thích cái gì vừa đổi, không đủ để bắt người dùng chờ. Chỉ animate transform và opacity, tuyệt đối không animate width, height, top hay left."
		>
			<Row
				title="Thang thời lượng"
				note="Ba bậc, không có bậc thứ tư. Quá 0.3s cho một tương tác là người dùng bắt đầu thấy phải chờ."
				action={
					<Button size="sm" variant="outline" onClick={() => setRunKey((k) => k + 1)}>
						<RotateCwIcon />
						Chạy lại
					</Button>
				}
			>
				<div className="rounded-md border border-border bg-background">
					{DURATIONS.map((d, i) => (
						<div
							key={d.kind}
							className={cn('gap-3 p-4 flex flex-wrap items-center', i > 0 && 'border-t border-border')}
						>
							<Spec className="w-12 shrink-0">{d.value}</Spec>
							<DurationDemo kind={d.kind} animate={animate} runKey={runKey} />
							<p className="min-w-[24ch] flex-1 text-body text-ink-muted">{d.use}</p>
						</div>
					))}
				</div>

				<div className="mt-3 gap-x-6 gap-y-1 flex flex-wrap">
					<Spec>ease mặc định: cubic-bezier(0.16, 1, 0.3, 1)</Spec>
					<Spec>spring: type spring · stiffness 100 · damping 20</Spec>
				</div>
			</Row>

			<Row
				title="Bốn lý do hợp lệ"
				note="Chỉ thêm chuyển động khi rơi vào một trong bốn lý do dưới đây. Ngoài bốn lý do này thì không animate, kể cả khi trông đẹp."
			>
				<div className="gap-3 sm:grid-cols-2 grid grid-cols-1">
					<div className="p-4 rounded-md border border-border bg-background">
						<p className="font-medium text-body text-foreground">Phân cấp</p>
						<p className="mt-1 text-caption text-muted-foreground">
							Dẫn mắt tới thứ quan trọng trước. Chỉ chạy một lần khi khối vào tầm nhìn.
						</p>
						<div className="mt-3">
							{animate ? (
								<motion.p
									className="text-body text-ink-muted"
									initial={{ opacity: 0, y: 8 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.3, ease: EASE_OUT }}
								>
									Khối này mờ dần hiện lên khi cuộn tới.
								</motion.p>
							) : (
								<p className="text-body text-ink-muted">Khối này mờ dần hiện lên khi cuộn tới.</p>
							)}
						</div>
					</div>

					<div className="p-4 rounded-md border border-border bg-background">
						<p className="font-medium text-body text-foreground">Kể chuyện</p>
						<p className="mt-1 text-caption text-muted-foreground">
							Trình tự có ý nghĩa thì hiện theo trình tự. Stagger 0.06s, không hơn.
						</p>
						<ul className="mt-3 space-y-1">
							{STORY.map((label, i) =>
								animate ? (
									<motion.li
										key={label}
										className="text-body text-ink-muted"
										initial={{ opacity: 0, x: -8 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ duration: 0.3, delay: i * 0.06, ease: EASE_OUT }}
									>
										{label}
									</motion.li>
								) : (
									<li key={label} className="text-body text-ink-muted">
										{label}
									</li>
								),
							)}
						</ul>
					</div>

					<div className="p-4 rounded-md border border-border bg-background">
						<p className="font-medium text-body text-foreground">Phản hồi</p>
						<p className="mt-1 text-caption text-muted-foreground">
							Xác nhận thao tác đã ăn. Đây là CSS thuần, không cần thư viện chuyển động.
						</p>
						<div className="mt-3">
							<Button size="sm" className="active:translate-y-px">
								Nhấn thử
							</Button>
						</div>
					</div>

					<div className="p-4 rounded-md border border-border bg-background">
						<p className="font-medium text-body text-foreground">Đổi trạng thái</p>
						<p className="mt-1 text-caption text-muted-foreground">
							Số đổi mà không báo thì người dùng không biết nó vừa đổi.
						</p>
						<div className="mt-3 gap-3 flex items-center">
							{animate ? (
								<NumberFlow
									value={count}
									locales="vi-VN"
									className="numeric text-headline text-foreground"
								/>
							) : (
								<span className="numeric text-headline text-foreground">{NUMBER_VI.format(count)}</span>
							)}
							<Button size="sm" variant="outline" onClick={() => setCount((c) => c + 12)}>
								Thêm bản ghi
							</Button>
						</div>
					</div>
				</div>
			</Row>

			<Row
				title="Giảm chuyển động"
				note="Bật thử trên macOS: System Settings > Accessibility > Display > Reduce motion. Bật xong tải lại trang, mọi demo ở trên phải đứng yên."
			>
				<div className="p-4 rounded-md border border-border bg-background">
					<p className="max-w-[65ch] text-body text-ink-muted">
						Người dùng bật giảm chuyển động không phải vì thấy phiền mà vì chuyển động gây chóng mặt hoặc
						buồn nôn thật. Mọi component có chuyển động bắt buộc gọi useReducedMotion() và trả về trạng thái
						tĩnh khi nó true. Vòng lặp vô hạn phải dừng hẳn, không chỉ chạy chậm lại.
					</p>
					<p className="mt-3 text-body text-foreground">
						Hệ thống đang yêu cầu giảm chuyển động:{' '}
						<span
							className={cn(
								'px-2 py-1 font-medium rounded-xs text-body',
								shouldReduceMotion && mounted
									? 'bg-info-subtle text-info'
									: 'bg-secondary text-ink-muted',
							)}
						>
							{status}
						</span>
					</p>
					<Spec className="mt-3 block">@media (prefers-reduced-motion: reduce)</Spec>
				</div>
			</Row>

			<p className="pt-4 border-t border-border text-caption text-muted-foreground">
				Chỉ animate transform và opacity: hai thuộc tính này chạy trên compositor nên không gây reflow. Mọi vòng
				lặp vô hạn phải dừng hẳn khi người dùng yêu cầu giảm chuyển động. Không dùng GSAP hay Lenis trong app
				nghiệp vụ vì chúng sinh ra cho scrolltelling của landing page, còn ở đây người dùng vào để làm việc chứ
				không để xem trình diễn.
			</p>
		</Panel>
	);
}
