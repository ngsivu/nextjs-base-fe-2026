'use client';

import { useState } from 'react';
import { cn } from '@/utils/cn';

type Node = {
	/** Độ sâu để thụt lề */
	depth: number;
	name: string;
	/** Chú thích hiện ở cột phải khi hover hoặc trên mobile */
	note?: string;
	kind: 'dir' | 'file';
};

const TREE: Node[] = [
	{ depth: 0, name: 'src/', kind: 'dir' },
	{ depth: 1, name: 'app/', kind: 'dir', note: 'Route, Providers, AppInit' },
	{ depth: 1, name: 'components/', kind: 'dir' },
	{ depth: 2, name: 'ui/', kind: 'dir', note: '62 component shadcn' },
	{ depth: 2, name: 'layout/', kind: 'dir', note: 'Dùng chung mọi page' },
	{ depth: 2, name: 'home/', kind: 'dir', note: 'Riêng của trang chủ' },
	{ depth: 1, name: 'hooks/', kind: 'dir', note: 'Cả hook gọi API' },
	{ depth: 1, name: 'stores/', kind: 'dir', note: 'Zustand: bộ nhớ + localStorage' },
	{ depth: 1, name: 'lib/', kind: 'dir', note: 'http, queryClient, apiError' },
	{ depth: 1, name: 'utils/', kind: 'dir', note: 'cn, formatNumber' },
	{ depth: 1, name: 'constants/', kind: 'dir' },
	{ depth: 1, name: 'types.ts', kind: 'file', note: 'Toàn bộ type + zod schema' },
];

/**
 * Cây thư mục của chính dự án này.
 *
 * Đây là "ảnh chụp sản phẩm" của một boilerplate — thứ dev cần thấy đầu tiên
 * khi đánh giá một base. Hover từng dòng để đọc chú thích.
 */
export function FileTree() {
	const [active, setActive] = useState<number | null>(null);

	return (
		<div className="rounded-lg border border-border bg-card">
			<div className="gap-2 px-4 py-3 flex items-center border-b border-border">
				<span className="size-2 rounded-full bg-muted-foreground/40" />
				<span className="size-2 rounded-full bg-muted-foreground/40" />
				<span className="size-2 rounded-full bg-muted-foreground/40" />
				<span className="ml-2 text-xs font-mono text-muted-foreground">base-fe</span>
			</div>

			<ul className="p-2 leading-6 font-mono text-[13px]" onMouseLeave={() => setActive(null)}>
				{TREE.map((node, index) => (
					<li key={node.name + index}>
						<div
							className={cn(
								'gap-4 px-2 py-0.5 flex items-center justify-between rounded-sm transition-colors',
								active === index ? 'bg-accent' : 'bg-transparent',
							)}
							onMouseEnter={() => setActive(index)}
						>
							<span
								className={cn(node.kind === 'dir' ? 'text-foreground' : 'text-muted-foreground')}
								style={{ paddingLeft: `${node.depth * 16}px` }}
							>
								{node.name}
							</span>

							{node.note ? (
								<span
									className={cn(
										'text-xs sm:block hidden shrink-0 text-right transition-colors',
										active === index ? 'text-primary' : 'text-muted-foreground',
									)}
								>
									{node.note}
								</span>
							) : null}
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}
