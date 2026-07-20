const STEPS = [
	{ cmd: 'git clone https://github.com/ngsivu/nextjs-base-fe-2026.git', note: 'Tải về' },
	{ cmd: 'pnpm install', note: 'Cài dependency' },
	{ cmd: 'pnpm dev', note: 'Chạy ở localhost:3000' },
];

/**
 * Ba bước cài đặt. Ở đây đánh số là hợp lý vì chúng thực sự chạy theo thứ tự —
 * khác với lưới tính năng phía trên, nơi thứ tự không mang thông tin gì.
 */
export function QuickStart() {
	return (
		<div className="overflow-hidden rounded-lg border border-border bg-card">
			{STEPS.map((step, index) => (
				<div
					key={step.cmd}
					className="gap-2 p-4 sm:flex-row sm:items-center sm:gap-6 flex flex-col border-b border-border last:border-b-0"
				>
					<span className="text-xs font-mono text-muted-foreground">
						{String(index + 1).padStart(2, '0')}
					</span>
					<code className="flex-1 overflow-x-auto font-mono text-[13px] whitespace-nowrap">{step.cmd}</code>
					<span className="text-xs shrink-0 text-muted-foreground">{step.note}</span>
				</div>
			))}
		</div>
	);
}
