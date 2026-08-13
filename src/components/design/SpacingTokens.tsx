import { Panel, Row, Spec } from '@/components/design/Panel';
import { cn } from '@/utils/cn';

/* Class viết đủ chuỗi để Tailwind quét được. Đừng ghép `w-${n}`. */
const SPACING = [
	{ step: '1', px: '4px', className: 'w-1', use: 'khe giữa icon và nhãn' },
	{ step: '2', px: '8px', className: 'w-2', use: 'padding dọc của chip' },
	{ step: '3', px: '12px', className: 'w-3', use: 'khe giữa các field trong form' },
	{ step: '4', px: '16px', className: 'w-4', use: 'padding trong card' },
	{ step: '6', px: '24px', className: 'w-6', use: 'padding của panel' },
	{ step: '8', px: '32px', className: 'w-8', use: 'khe giữa hai nhóm nội dung' },
	{ step: '12', px: '48px', className: 'w-12', use: 'khe giữa hai section' },
	{ step: '16', px: '64px', className: 'w-16', use: 'lề dọc đầu trang' },
];

const RADIUS = [
	{ token: 'rounded-xs', px: '4px', use: 'chip, badge', className: 'rounded-xs' },
	{ token: 'rounded-sm', px: '6px', use: 'tag inline', className: 'rounded-sm' },
	{ token: 'rounded-md', px: '8px', use: 'nút, input', className: 'rounded-md' },
	{ token: 'rounded-lg', px: '12px', use: 'card, panel', className: 'rounded-lg' },
	{ token: 'rounded-xl', px: '16px', use: 'panel lớn', className: 'rounded-xl' },
	{ token: 'rounded-full', px: 'tròn', use: 'node stepper, avatar', className: 'rounded-full' },
];

const ELEVATION = [
	{
		level: 'Bậc 0',
		token: 'phẳng',
		use: 'nội dung chảy thẳng trên canvas, không cần khung',
		className: '',
	},
	{
		level: 'Bậc 1',
		token: 'bg-card + border',
		use: 'card bản ghi, panel nội dung',
		className: 'bg-card border border-border',
	},
	{
		level: 'Bậc 2',
		token: 'bg-secondary + hairline-strong',
		use: 'khối lồng bên trong card, header bảng',
		className: 'bg-secondary border border-hairline-strong',
	},
	{
		level: 'Bậc 3',
		token: 'bg-accent',
		use: 'dòng đang hover, mục đang chọn',
		className: 'bg-accent',
	},
	{
		level: 'Bậc 4',
		token: 'ring-2 ring-ring/50',
		use: 'phần tử đang nhận focus bàn phím',
		className: 'bg-card ring-2 ring-ring/50',
	},
];

const BREAKPOINTS = [
	{ token: 'sm', px: '640', change: 'Thẻ thống kê xếp hai cột, bộ lọc nằm cùng hàng với ô tìm kiếm.' },
	{ token: 'md', px: '768', change: 'Sidebar rời khỏi sheet để nằm cố định, stepper dọc chuyển thành ngang.' },
	{ token: 'lg', px: '1024', change: 'Danh sách dạng card chuyển thành bảng đầy đủ cột.' },
	{ token: 'xl', px: '1280', change: 'Mở thêm cột phải cho lịch sử thao tác và ghi chú.' },
	{ token: '2xl', px: '1536', change: 'Không đổi bố cục, chỉ giãn khoảng trắng hai bên.' },
];

export function SpacingTokens() {
	return (
		<Panel
			id="nen-tang"
			title="Nền tảng"
			intro="Khoảng cách, bo góc, phân lớp và breakpoint. Base unit là 4px nên mọi giá trị trong app đều rơi đúng lưới, không có số lẻ."
		>
			<Row
				title="Khoảng cách"
				note="Base unit 4px. Mọi giá trị là bội số của 4 nên dùng thẳng scale số của Tailwind, không viết giá trị tuỳ ý trong ngoặc vuông."
			>
				<dl className="divide-y divide-border">
					{SPACING.map((s) => (
						<div key={s.step} className="gap-2 py-3 sm:flex-row sm:items-center sm:gap-6 flex flex-col">
							{/* w-28 để nhãn dài nhất (p-16 · 64px) không xuống dòng */}
							<dt className="w-28 shrink-0">
								<Spec>{`p-${s.step} · ${s.px}`}</Spec>
							</dt>
							<dd className="flex-1">
								<span className={cn('h-2 block rounded-xs bg-primary', s.className)} aria-hidden />
							</dd>
							<dd className="sm:w-64 shrink-0 text-caption text-muted-foreground">{s.use}</dd>
						</div>
					))}
				</dl>
			</Row>

			<Row
				title="Bo góc"
				note="Nút và input luôn rounded-md. Bo tròn hoàn toàn chỉ dành cho node stepper và avatar, không dùng cho nút."
			>
				<div className="gap-4 sm:grid-cols-6 grid grid-cols-3">
					{RADIUS.map((r) => (
						<div key={r.token} className="min-w-0">
							<div className={cn('size-16 border border-border bg-secondary', r.className)} aria-hidden />
							<Spec className="mt-2 block truncate">{r.token}</Spec>
							<Spec className="block truncate">{`${r.px} · ${r.use}`}</Spec>
						</div>
					))}
				</div>
			</Row>

			<Row
				title="Phân lớp"
				note="Không đổ bóng ở bất kỳ bậc nào. Chiều sâu do bậc surface và viền hairline tạo ra, nên giao diện giữ được cạnh sắc ở cả hai theme."
			>
				<div className="gap-3 sm:grid-cols-5 grid grid-cols-1">
					{ELEVATION.map((e) => (
						<div key={e.level} className={cn('p-4 rounded-lg', e.className)}>
							<p className="font-medium text-body text-foreground">{e.level}</p>
							<Spec className="mt-1 block">{e.token}</Spec>
							<p className="mt-2 text-caption text-muted-foreground">{e.use}</p>
						</div>
					))}
				</div>
			</Row>

			<Row
				title="Breakpoint"
				note="Mặc định là mobile, mỗi mốc chỉ mô tả thay đổi thêm so với mốc trước. Không có breakpoint nào ẩn dữ liệu, chỉ đổi cách trình bày."
			>
				<dl className="divide-y divide-border">
					{BREAKPOINTS.map((b) => (
						<div key={b.token} className="gap-1 py-3 sm:flex-row sm:items-baseline sm:gap-6 flex flex-col">
							<dt className="w-16 shrink-0">
								<Spec>{b.token}</Spec>
							</dt>
							<dd className="w-16 shrink-0">
								<Spec>{b.px}</Spec>
							</dd>
							<dd className="min-w-0 text-body text-ink-muted">{b.change}</dd>
						</div>
					))}
				</dl>
				<p className="mt-4 pt-4 border-t border-border text-caption text-muted-foreground">
					Container tối đa <code className="numeric font-mono">max-w-[1400px]</code>, canh giữa và có lề
					ngang. Trên màn rộng hơn, phần dư thành khoảng trắng chứ không kéo giãn bảng.
				</p>
			</Row>
		</Panel>
	);
}
