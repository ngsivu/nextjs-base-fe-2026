import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const DEMOS = [
	{
		href: '/components',
		title: 'Component gallery',
		body: 'Toàn bộ 62 component UI, có sidebar tìm và nhảy tới từng cái.',
	},
];

export function DemoLinks() {
	return (
		<div className="gap-4 sm:grid-cols-2 grid">
			{DEMOS.map((demo) => (
				<Link
					key={demo.href}
					href={demo.href}
					className="group p-6 rounded-lg border border-border bg-card transition-colors hover:border-primary/50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
				>
					<div className="gap-3 flex items-center justify-between">
						<h3 className="font-medium text-[22px] tracking-[-0.4px]">{demo.title}</h3>
						<ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
					</div>
					<p className="mt-3 text-sm leading-6 text-muted-foreground">{demo.body}</p>
					<p className="mt-4 text-xs font-mono text-muted-foreground">{demo.href}</p>
				</Link>
			))}
		</div>
	);
}
