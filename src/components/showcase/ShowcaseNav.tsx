'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/utils/cn';

export type NavGroup = {
	id: string;
	title: string;
	items: { id: string; label: string }[];
};

/**
 * Sidebar điều hướng gallery.
 *
 * Dùng IntersectionObserver để tô sáng mục đang xem thay vì bám vào
 * scroll event — ít tính toán hơn và không cần throttle.
 */
export function ShowcaseNav({ groups }: { groups: NavGroup[] }) {
	const [active, setActive] = useState<string>('');
	const [query, setQuery] = useState('');

	useEffect(() => {
		const ids = groups.flatMap((group) => group.items.map((item) => item.id));
		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter((entry) => entry.isIntersecting)
					.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
				if (visible[0]) setActive(visible[0].target.id);
			},
			// Chỉ tính vùng 1/5 phía trên màn hình để mục active khớp
			// với thứ người dùng đang thực sự nhìn
			{ rootMargin: '-80px 0px -80% 0px' },
		);

		for (const id of ids) {
			const el = document.getElementById(id);
			if (el) observer.observe(el);
		}
		return () => observer.disconnect();
	}, [groups]);

	const normalized = query.trim().toLowerCase();
	const filtered = groups
		.map((group) => ({
			...group,
			items: normalized ? group.items.filter((item) => item.id.includes(normalized)) : group.items,
		}))
		.filter((group) => group.items.length > 0);

	const total = groups.reduce((sum, group) => sum + group.items.length, 0);
	const shown = filtered.reduce((sum, group) => sum + group.items.length, 0);

	return (
		<nav className="flex h-full flex-col">
			<div className="pb-4">
				<Input
					type="search"
					placeholder="Tìm component..."
					aria-label="Tìm component"
					value={query}
					onChange={(event) => setQuery(event.target.value)}
					className="h-9"
				/>
				<p className="mt-2 text-xs font-mono text-muted-foreground">
					{normalized ? `${shown}/${total}` : `${total} component`}
				</p>
			</div>

			<div className="-mr-2 pr-2 flex-1 overflow-y-auto">
				{filtered.map((group) => (
					<div key={group.id} className="mb-6">
						<p className="mb-2 font-medium text-[11px] tracking-[0.4px] text-muted-foreground uppercase">
							{group.title}
						</p>
						<ul className="space-y-0.5">
							{group.items.map((item) => (
								<li key={item.id}>
									<a
										href={`#${item.id}`}
										className={cn(
											'px-2 py-1 block rounded-md font-mono text-[13px] transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
											active === item.id
												? 'bg-accent text-primary'
												: 'text-muted-foreground hover:bg-accent/50 hover:text-foreground',
										)}
									>
										{item.label}
									</a>
								</li>
							))}
						</ul>
					</div>
				))}

				{filtered.length === 0 ? (
					<p className="py-4 text-sm text-muted-foreground">Không tìm thấy component nào.</p>
				) : null}
			</div>
		</nav>
	);
}
