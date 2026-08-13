import { Panel, Row, Spec } from '@/components/design/Panel';
import { cn } from '@/utils/cn';

/* Class viết đủ chuỗi để Tailwind quét được. Đừng ghép `bg-navy-${n}`. */
const NAVY = [
	{ name: '50', className: 'bg-navy-50' },
	{ name: '100', className: 'bg-navy-100' },
	{ name: '200', className: 'bg-navy-200' },
	{ name: '300', className: 'bg-navy-300' },
	{ name: '400', className: 'bg-navy-400' },
	{ name: '500', className: 'bg-navy-500' },
	{ name: '600', className: 'bg-navy-600' },
	{ name: '700', className: 'bg-navy-700' },
	{ name: '800', className: 'bg-navy-800' },
	{ name: '900', className: 'bg-navy-900' },
	{ name: '950', className: 'bg-navy-950' },
];

const SURFACES = [
	{ name: 'canvas', token: '--background', className: 'bg-background' },
	{ name: 'surface-1', token: '--card', className: 'bg-card' },
	{ name: 'surface-2', token: '--secondary', className: 'bg-secondary' },
	// Light chỉ cần 3 bậc vì nền trắng đã là mốc; dark cần 4 để tách nhiều lớp.
	{ name: 'surface-3 / 4', token: '--accent', className: 'bg-accent' },
];

const SEMANTIC = [
	{ name: 'success', label: 'Hoàn tất', chip: 'bg-success-subtle text-success' },
	{ name: 'warning', label: 'Chờ xử lý', chip: 'bg-warning-subtle text-warning' },
	{ name: 'danger', label: 'Từ chối', chip: 'bg-danger-subtle text-danger' },
	{ name: 'info', label: 'Đang chạy', chip: 'bg-info-subtle text-info' },
];

const CHART = ['bg-chart-1', 'bg-chart-2', 'bg-chart-3', 'bg-chart-4', 'bg-chart-5'];
const STAGE = ['bg-stage-1', 'bg-stage-2', 'bg-stage-3', 'bg-stage-4'];

function Chips({ items, prefix }: { items: string[]; prefix: string }) {
	return (
		<div className="gap-2 flex flex-wrap">
			{items.map((className, i) => (
				<div key={className} className="gap-2 px-2 py-1 flex items-center rounded-sm border border-border">
					<span className={cn('size-4 rounded-xs', className)} aria-hidden />
					<Spec>{`${prefix}-${i + 1}`}</Spec>
				</div>
			))}
		</div>
	);
}

export function ColorTokens() {
	return (
		<Panel
			id="mau"
			title="Màu"
			intro="Anchor thương hiệu là navy-800. Mọi bậc xám của app đều mang hue 220 nên chrome và nội dung nằm cùng một họ màu."
		>
			<Row
				title="Thương hiệu và màu hành động là hai việc khác nhau"
				note="--brand giữ đúng #203868 ở CẢ HAI theme vì logo là nhận diện, không phải điều khiển. --primary đổi bậc theo theme vì nút bấm bắt buộc đạt tương phản 3:1 với nền."
			>
				<div className="gap-3 sm:grid-cols-2 grid grid-cols-1">
					<div className="p-4 rounded-md border border-border bg-background">
						<div className="gap-3 flex items-center">
							<span
								className="size-8 font-semibold flex items-center justify-center rounded-sm border border-brand-edge bg-brand text-body text-brand-foreground"
								aria-hidden
							>
								V
							</span>
							<div>
								<p className="font-medium text-body text-foreground">--brand</p>
								<Spec>#203868 · bất biến</Spec>
							</div>
						</div>
					</div>
					<div className="p-4 rounded-md border border-border bg-background">
						<div className="gap-3 flex items-center">
							<span className="size-8 rounded-sm bg-primary" aria-hidden />
							<div>
								<p className="font-medium text-body text-foreground">--primary</p>
								<Spec>#203868 light · #3a65bb dark</Spec>
							</div>
						</div>
					</div>
				</div>
			</Row>

			<Row
				title="Thang navy"
				note="Bậc 800 là anchor. Light dùng nó cho primary; dark chuyển lên bậc 500 vì bậc 800 trên nền tối chỉ đạt 1.7:1, dưới ngưỡng 3:1 của WCAG."
			>
				<div className="gap-1 sm:grid-cols-11 grid grid-cols-6">
					{NAVY.map((c) => (
						<div key={c.name} className="min-w-0">
							<div
								className={cn(
									'h-12 rounded-sm border border-border',
									c.className,
									c.name === '800' && 'ring-2 ring-ring ring-offset-2 ring-offset-card',
								)}
							/>
							<Spec className="mt-2 block truncate">{c.name}</Spec>
						</div>
					))}
				</div>
			</Row>

			<Row title="Thang surface" note="Phân cấp bằng bậc nền cộng viền 1px, không đổ bóng.">
				<div className="gap-3 sm:grid-cols-4 grid grid-cols-2">
					{SURFACES.map((s) => (
						<div key={s.name} className={cn('p-3 rounded-md border border-border', s.className)}>
							<p className="font-medium text-caption text-foreground">{s.name}</p>
							<Spec className="mt-1 block">{s.token}</Spec>
						</div>
					))}
				</div>
			</Row>

			<Row
				title="Semantic"
				note="Bốn màu, chỉ dành cho trạng thái nghiệp vụ thật. Luôn kèm nhãn chữ, không bao giờ để màu đứng một mình. Mọi cặp chữ trên nền đều đạt tối thiểu 5.2:1."
			>
				<div className="gap-3 sm:grid-cols-4 grid grid-cols-2">
					{SEMANTIC.map((s) => (
						<div key={s.name} className="p-3 rounded-md border border-border">
							<span className={cn('px-2 py-1 font-medium inline-block rounded-sm text-caption', s.chip)}>
								{s.label}
							</span>
							<Spec className="mt-2 block">{s.name}</Spec>
						</div>
					))}
				</div>
			</Row>

			<Row
				title="Biểu đồ"
				note="Bộ categorical đã qua validator của skill dataviz ở cả hai theme. Gán theo thứ tự cố định, không xoay vòng. Ở light mode ba slot cuối dưới 3:1 trên nền trắng nên biểu đồ bắt buộc kèm nhãn trực tiếp hoặc bảng dữ liệu."
			>
				<Chips items={CHART} prefix="chart" />
			</Row>

			<Row title="Tiến trình" note="Một hue, sáng đến đậm, dùng cho thanh nhiều chặng và funnel.">
				<Chips items={STAGE} prefix="stage" />
			</Row>
		</Panel>
	);
}
