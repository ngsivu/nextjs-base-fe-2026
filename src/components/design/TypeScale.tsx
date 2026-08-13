import { Panel, Row } from '@/components/design/Panel';

/**
 * Thang chữ. Mỗi dòng dùng ĐÚNG utility token, không viết text-[..px] tay,
 * nên trang này luôn phản ánh giá trị thật trong globals.scss.
 */
const SCALE = [
	{ token: 'text-display-lg', spec: '40 / 48 / -1', className: 'text-display-lg' },
	{ token: 'text-display-md', spec: '32 / 40 / -1', className: 'text-display-md' },
	{ token: 'text-headline', spec: '24 / 32 / -1', className: 'text-headline' },
	{ token: 'text-section', spec: '20 / 28 / 0', className: 'text-section' },
	{ token: 'text-title', spec: '18 / 24 / 0', className: 'text-title' },
	{ token: 'text-body-lg', spec: '16 / 24 / 0', className: 'text-body-lg' },
	{ token: 'text-body', spec: '14 / 20 / 0', className: 'text-body' },
	{ token: 'text-caption', spec: '12 / 16 / 0', className: 'text-caption' },
];

export function TypeScale() {
	return (
		<Panel
			id="chu"
			title="Chữ"
			intro="Geist Sans cho mọi chữ, Geist Mono cho chuỗi do máy sinh. Body mặc định 14px vì đây là app nghiệp vụ, không phải trang marketing."
		>
			<Row
				title="Thang"
				note="Cỡ chữ toàn số chẵn, line-height đặt bằng px trên lưới 4px thay vì tỷ lệ thập phân, letter-spacing chỉ nhận -1, 0, +1. Cột giữa ghi cỡ / line-height / tracking."
			>
				<dl className="divide-y divide-border">
					{SCALE.map((t) => (
						<div key={t.token} className="gap-1 py-3 sm:flex-row sm:items-baseline sm:gap-6 flex flex-col">
							<dt className="w-40 shrink-0 font-mono text-caption text-muted-foreground">{t.token}</dt>
							<dd className="numeric w-24 shrink-0 font-mono text-caption text-muted-foreground">
								{t.spec}
							</dd>
							<dd className={`min-w-0 truncate text-foreground ${t.className}`}>
								Bản ghi được lưu trữ an toàn
							</dd>
						</div>
					))}
				</dl>
			</Row>

			<Row
				title="Vai trò riêng"
				note="Ba token dưới đây dùng chung cỡ với thang trên nhưng khác họ chữ hoặc khác cách viết."
			>
				<dl className="divide-y divide-border">
					<div className="gap-1 py-3 sm:flex-row sm:items-baseline sm:gap-6 flex flex-col">
						<dt className="w-40 shrink-0 font-mono text-caption text-muted-foreground">font-mono</dt>
						<dd className="numeric w-24 shrink-0 font-mono text-caption text-muted-foreground">14 / 20</dd>
						<dd className="numeric min-w-0 truncate font-mono text-body text-foreground">
							REF-2026-0148 · 2026-08-13 09:12
						</dd>
					</div>
					<div className="gap-1 py-3 sm:flex-row sm:items-baseline sm:gap-6 flex flex-col">
						<dt className="w-40 shrink-0 font-mono text-caption text-muted-foreground">text-eyebrow</dt>
						<dd className="numeric w-24 shrink-0 font-mono text-caption text-muted-foreground">
							12 / 16 / +1
						</dd>
						<dd className="min-w-0 truncate text-eyebrow text-muted-foreground uppercase">
							Nhãn phân loại khối
						</dd>
					</div>
					<div className="gap-1 py-3 sm:flex-row sm:items-baseline sm:gap-6 flex flex-col">
						<dt className="w-40 shrink-0 font-mono text-caption text-muted-foreground">.numeric</dt>
						<dd className="numeric w-24 shrink-0 font-mono text-caption text-muted-foreground">tnum</dd>
						<dd className="numeric min-w-0 truncate font-mono text-body text-foreground">
							1.284.500 · 37 · 96
						</dd>
					</div>
				</dl>
			</Row>

			<p className="pt-4 border-t border-border text-caption text-muted-foreground">
				Ranh giới sans và mono là tuyệt đối: chuỗi do máy sinh dùng mono, chuỗi do người viết dùng sans. Mọi cột
				số đặt class <code className="font-mono">.numeric</code> để chữ số đều cột.
			</p>
		</Panel>
	);
}
