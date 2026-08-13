'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Panel, Row, Spec } from '@/components/design/Panel';
import {
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
	type ChartConfig,
} from '@/components/ui/chart';

/* dữ liệu mẫu */
const MONTHLY = [
	{ thang: 'T1', taiLieuMoi: 128, daXuLy: 96 },
	{ thang: 'T2', taiLieuMoi: 144, daXuLy: 112 },
	{ thang: 'T3', taiLieuMoi: 96, daXuLy: 88 },
	{ thang: 'T4', taiLieuMoi: 176, daXuLy: 132 },
	{ thang: 'T5', taiLieuMoi: 160, daXuLy: 148 },
	{ thang: 'T6', taiLieuMoi: 192, daXuLy: 156 },
];

/* Nhãn gắn theo THỰC THỂ: taiLieuMoi luôn là chart-1, daXuLy luôn là chart-2,
   bất kể tháng nào đang cao hơn. Không xoay màu theo thứ hạng. */
const CHART_CONFIG = {
	taiLieuMoi: { label: 'Bản ghi mới' },
	daXuLy: { label: 'Đã xử lý' },
} satisfies ChartConfig;

/* dữ liệu mẫu */
const STAGES = [
	{ name: 'Tải lên', value: 96, className: 'bg-stage-1' },
	{ name: 'Xử lý', value: 64, className: 'bg-stage-2' },
	{ name: 'Kiểm tra', value: 40, className: 'bg-stage-3' },
	{ name: 'Lưu trữ', value: 24, className: 'bg-stage-4' },
];

const STAGE_TOTAL = STAGES.reduce((sum, s) => sum + s.value, 0);

const AXIS_TICK = { fill: 'var(--muted-foreground)', fontSize: 12 };

export function ChartPreview() {
	return (
		<Panel
			id="bieu-do"
			title="Biểu đồ"
			intro="Bộ categorical dùng đúng thứ tự slot chart-1..5, mỗi series gắn cứng một màu theo thực thể. Thang ordinal stage-1..4 dành riêng cho tiến trình nhiều chặng."
		>
			<Row
				title="Cột theo thời gian"
				note="Một trục y duy nhất cho cả hai series, vì hai thang y đặt cạnh nhau cho phép vẽ ra bất kỳ tương quan nào ta muốn. Lưới chỉ kẻ ngang, nét mảnh màu hairline, để cột đứng trước còn lưới lùi lại sau."
			>
				<ChartContainer config={CHART_CONFIG} className="h-64 aspect-auto w-full">
					<BarChart accessibilityLayer data={MONTHLY} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
						<CartesianGrid vertical={false} stroke="var(--border)" strokeWidth={1} />
						<XAxis dataKey="thang" tickLine={false} axisLine={false} tickMargin={8} tick={AXIS_TICK} />
						<YAxis width={40} tickLine={false} axisLine={false} allowDecimals={false} tick={AXIS_TICK} />
						<ChartTooltip cursor content={<ChartTooltipContent />} />
						<ChartLegend content={<ChartLegendContent />} />
						<Bar dataKey="taiLieuMoi" name="taiLieuMoi" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
						<Bar dataKey="daXuLy" name="daXuLy" fill="var(--chart-2)" radius={[4, 4, 0, 0]} />
					</BarChart>
				</ChartContainer>
			</Row>

			<Row
				title="Bảng dữ liệu kèm theo"
				note="Bắt buộc, không phải trang trí. Ở light mode chart-3/4/5 chỉ đạt dưới 3:1 trên nền trắng, nên màu không được phép tự nói: mỗi biểu đồ phải kèm nhãn trực tiếp hoặc bảng dữ liệu để người đọc tra được con số mà không dựa vào việc phân biệt sắc độ."
			>
				<div className="overflow-x-auto rounded-md border border-border">
					<table className="w-full border-collapse text-body">
						<thead>
							<tr className="border-b border-hairline-strong">
								<th className="px-3 py-2 font-medium text-left text-foreground">Tháng</th>
								<th className="numeric px-3 py-2 font-medium text-right text-foreground">
									Bản ghi mới
								</th>
								<th className="numeric px-3 py-2 font-medium text-right text-foreground">Đã xử lý</th>
							</tr>
						</thead>
						<tbody>
							{MONTHLY.map((r) => (
								<tr key={r.thang} className="border-b border-border last:border-b-0">
									<td className="px-3 py-2 text-ink-muted">
										<span className="gap-2 flex items-center">
											<span className="size-2 rounded-xs bg-chart-1" aria-hidden />
											{r.thang}
										</span>
									</td>
									<td className="numeric px-3 py-2 text-right font-mono text-foreground">
										{r.taiLieuMoi}
									</td>
									<td className="numeric px-3 py-2 text-right font-mono text-foreground">
										{r.daXuLy}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</Row>

			<Row
				title="Thanh tiến độ nhiều chặng"
				note="Thang ordinal một hue, sáng đến đậm, vì bốn chặng có thứ tự trước sau. Khác hẳn bộ categorical ở trên: ở đó năm hue rời nhau vì các series không xếp hạng được với nhau."
			>
				<div className="h-2 flex w-full overflow-hidden rounded-xs" role="presentation">
					{STAGES.map((s) => (
						<span
							key={s.name}
							className={s.className}
							style={{ width: `${(s.value / STAGE_TOTAL) * 100}%` }}
						/>
					))}
				</div>
				{/* Nhãn tách xuống lưới riêng: đoạn hẹp nhất không đủ chỗ chứa chữ. */}
				<div className="mt-3 gap-3 sm:grid-cols-4 grid grid-cols-2">
					{STAGES.map((s) => (
						<div key={s.name} className="min-w-0">
							<span className="gap-2 flex items-center">
								<span className={`size-2 shrink-0 rounded-xs ${s.className}`} aria-hidden />
								<span className="truncate text-caption text-ink-muted">{s.name}</span>
							</span>
							<p className="numeric mt-1 font-mono text-body text-foreground">{s.value}</p>
						</div>
					))}
				</div>
				<p className="mt-3">
					<Spec>stage-1 → stage-4 · tổng {STAGE_TOTAL} bản ghi</Spec>
				</p>
			</Row>

			<p className="pt-4 border-t border-border text-caption text-muted-foreground">
				Ba luật không thương lượng: một trục y duy nhất, không bao giờ dựng thang y thứ hai; màu gán theo thực
				thể chứ không theo thứ hạng, nên &quot;Bản ghi mới&quot; giữ chart-1 kể cả khi nó tụt xuống cuối; series
				thứ 6 trở đi gộp vào &quot;Khác&quot; chứ không sinh thêm hue mới ngoài thang đã validate.
			</p>
		</Panel>
	);
}
