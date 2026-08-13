'use client';

import { useState } from 'react';
import { CheckIcon } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { Panel, Row } from '@/components/design/Panel';
import { StatusBadge, type StatusTone } from '@/components/layout/StatusBadge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/utils/cn';

import { EASE_OUT, MOTION_ALIVE } from '@/constants/motion';

const STEPS = ['Tải lên', 'Xử lý', 'Kiểm tra', 'Hoàn tất'];

/* dữ liệu mẫu */
const STATS = [
	{ label: 'Tổng bản ghi', value: '1.284', delta: '+128 so với kỳ trước' },
	{ label: 'Đang xử lý', value: '37', delta: '-4 so với kỳ trước' },
	{ label: 'Đã lưu trữ', value: '216', delta: '+18 so với kỳ trước' },
];

/* dữ liệu mẫu */
const DOCS: { code: string; title: string; size: string; updatedAt: string; tone: StatusTone; status: string }[] = [
	{
		code: 'REF-2026-0148',
		title: 'Bản ghi mẫu số một',
		size: '2 MB',
		updatedAt: '2026-08-13',
		tone: 'success',
		status: 'Hoàn tất',
	},
	{
		code: 'REF-2026-0147',
		title: 'Bản ghi mẫu số hai',
		size: '860 KB',
		updatedAt: '2026-08-12',
		tone: 'info',
		status: 'Đang chạy',
	},
	{
		code: 'REF-2026-0146',
		title: 'Bản ghi mẫu số ba',
		size: '132 KB',
		updatedAt: '2026-08-11',
		tone: 'warning',
		status: 'Chờ xử lý',
	},
	{
		code: 'REF-2026-0145',
		title: 'Danh mục tài sản.xlsx',
		size: '4 MB',
		updatedAt: '2026-08-09',
		tone: 'danger',
		status: 'Từ chối',
	},
	{
		code: 'REF-2026-0144',
		title: 'Bản ghi mẫu số năm',
		size: '18 MB',
		updatedAt: '2026-08-07',
		tone: 'neutral',
		status: 'Nháp',
	},
];

/** Stepper trình bày thuần: nhận bước hiện tại, không tự quyết cái gì. Ngang ở desktop, dọc ở mobile. */
function Stepper({ current }: { current: number }) {
	const reduce = useReducedMotion();

	return (
		<ol className="md:flex-row md:items-start flex flex-col">
			{STEPS.map((label, i) => {
				const state = i < current ? 'done' : i === current ? 'current' : 'todo';
				const isLast = i === STEPS.length - 1;

				return (
					<li key={label} className="gap-3 md:min-w-0 md:flex-1 md:flex-col md:gap-2 flex">
						<div className="md:w-full md:flex-row flex flex-col items-center">
							{/* Nửa đoạn nối bên trái, chỉ tồn tại ở layout ngang để node nằm giữa ô. */}
							<span
								className={cn(
									'md:block hidden h-px flex-1',
									i === 0 ? 'bg-transparent' : i <= current ? 'bg-primary' : 'bg-border',
								)}
							/>

							<span className="size-7 relative flex shrink-0 items-center justify-center">
								{/* Vòng nhịp CHỈ ở bước đang chạy: nó biểu thị trạng thái đang sống,
								    không phải hiệu ứng trang trí. Tắt hẳn khi người dùng giảm chuyển động. */}
								{state === 'current' && !reduce && (
									<motion.span
										aria-hidden
										className="inset-0 absolute rounded-full border border-primary"
										animate={{ scale: [1, 1.4, 1], opacity: [0.7, 0, 0.7] }}
										transition={{ duration: MOTION_ALIVE, repeat: Infinity, ease: EASE_OUT }}
									/>
								)}
								<span
									className={cn(
										'size-7 relative flex items-center justify-center rounded-full text-caption transition-colors duration-200',
										state === 'done' && 'bg-primary text-primary-foreground',
										state === 'current' &&
											'border-2 border-primary bg-background text-primary-text',
										state === 'todo' && 'bg-secondary font-mono text-muted-foreground',
									)}
								>
									{state === 'done' ? <CheckIcon className="size-4" strokeWidth={2.5} /> : i + 1}
								</span>
							</span>

							<span
								className={cn(
									'md:h-px md:w-auto w-px flex-1',
									isLast ? 'bg-transparent' : i < current ? 'bg-primary' : 'bg-border',
									// min-h-5 dựng chiều dài đoạn nối ở layout DỌC (mobile).
									// BẮT BUỘC reset md:min-h-0, nếu không đoạn nối ngang ở desktop
									// dày 20px thay vì hairline 1px.
									isLast ? 'min-h-0' : 'min-h-5 md:min-h-0',
								)}
							/>
						</div>

						<span
							className={cn(
								'md:text-center text-body',
								isLast ? 'pb-0' : 'pb-5 md:pb-0',
								state === 'todo' ? 'text-muted-foreground' : 'text-foreground',
								state === 'current' && 'font-medium',
							)}
						>
							{label}
						</span>
					</li>
				);
			})}
		</ol>
	);
}

export function PatternPreview() {
	const [step, setStep] = useState(1);

	return (
		<Panel
			id="mau-hinh"
			title="Mẫu hình"
			intro="Ba mẫu hình lặp lại khắp Base FE: tiến trình nhiều bước, ô số liệu và bảng danh sách. Dựng sẵn ở đây để mọi màn hình dùng chung một cách trình bày."
		>
			<Row
				title="Tiến trình nhiều bước"
				action={
					<>
						<Button
							size="sm"
							variant="outline"
							onClick={() => setStep((s) => Math.max(0, s - 1))}
							disabled={step === 0}
						>
							Lùi
						</Button>
						<Button
							size="sm"
							onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
							disabled={step === STEPS.length - 1}
						>
							Tiến
						</Button>
					</>
				}
			>
				<div className="p-5 rounded-md border border-border bg-background">
					<Stepper current={step} />
				</div>
			</Row>

			<Row
				title="Ô số liệu"
				note="Nhãn ở trên, số ở giữa, biến động ở dưới. Không icon trang trí, không nền màu: con số phải là thứ nổi bật nhất trong ô."
			>
				<div className="gap-3 sm:grid-cols-3 grid grid-cols-1">
					{STATS.map((s) => (
						<div key={s.label} className="p-5 rounded-lg border border-border bg-background">
							<p className="text-caption text-muted-foreground">{s.label}</p>
							<p className="numeric mt-2 text-display-md text-foreground">{s.value}</p>
							<p className="numeric mt-1 font-mono text-caption text-muted-foreground">{s.delta}</p>
						</div>
					))}
				</div>
			</Row>

			<Row
				title="Bảng"
				note="Chỉ kẻ ngang giữa các hàng. Mã bản ghi và ngày là chuỗi do máy sinh nên dùng font mono kèm chữ số đều cột, không nhảy cột khi dữ liệu đổi."
			>
				<div className="overflow-x-auto rounded-md border border-border bg-background">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="text-caption">Mã bản ghi</TableHead>
								<TableHead className="text-caption">Tiêu đề</TableHead>
								<TableHead className="text-caption">Kích thước</TableHead>
								<TableHead className="text-caption">Cập nhật</TableHead>
								<TableHead className="text-caption">Trạng thái</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{DOCS.map((r) => (
								<TableRow key={r.code}>
									<TableCell className="numeric font-mono text-caption text-ink-muted">
										{r.code}
									</TableCell>
									<TableCell className="text-body text-foreground">{r.title}</TableCell>
									{/* Kích thước do máy sinh nên dùng mono kèm chữ số đều cột */}
									<TableCell className="numeric font-mono text-caption text-ink-muted">
										{r.size}
									</TableCell>
									<TableCell className="numeric font-mono text-caption text-muted-foreground">
										{r.updatedAt}
									</TableCell>
									<TableCell>
										<StatusBadge tone={r.tone}>{r.status}</StatusBadge>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</Row>

			<p className="pt-4 border-t border-border text-caption text-muted-foreground">
				Tiến trình luôn hiện thành hình chứ không chỉ thành chữ. Một bản ghi đang ở bước 2 trên 4 phải có
				stepper để người đọc thấy ngay còn bao nhiêu chặng nữa, chứ không phải một dòng chữ &quot;Bước 2&quot;
				bắt họ tự suy ra.
			</p>
		</Panel>
	);
}
