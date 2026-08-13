'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';
import { cn } from '@/utils/cn';

export type Section = { id: string; label: string };

/**
 * Mục lục của riêng trang /design.
 *
 * Từ `lg` trở lên là cột dính bên phải có đánh dấu mục đang xem; dưới `lg` thu
 * thành một ô chọn để không ăn mất chiều ngang vốn đã hẹp.
 *
 * Mục đang xem lấy bằng IntersectionObserver chứ KHÔNG nghe sự kiện scroll:
 * listener scroll chạy mỗi khung hình và làm giật trang dài (xem mục Motion
 * trong DESIGN.md).
 */
export function SectionNav({ sections }: { sections: Section[] }) {
	const [active, setActive] = useState(sections[0]?.id ?? '');
	const reduce = useReducedMotion();

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				// Lấy mục cao nhất đang nằm trong dải quan sát, không lấy mục cuối cùng
				// vừa cắt qua, để đánh dấu không nhảy ngược khi cuộn nhanh.
				const visible = entries
					.filter((e) => e.isIntersecting)
					.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
				if (visible[0]) setActive(visible[0].target.id);
			},
			// Dải quan sát là 80px dưới header cho tới 60% chiều cao màn hình.
			{ rootMargin: '-80px 0px -60% 0px', threshold: 0 },
		);

		for (const s of sections) {
			const el = document.getElementById(s.id);
			if (el) observer.observe(el);
		}
		return () => observer.disconnect();
	}, [sections]);

	function goTo(id: string) {
		document.getElementById(id)?.scrollIntoView({
			behavior: reduce ? 'auto' : 'smooth',
			block: 'start',
		});
	}

	return (
		<>
			<div className="lg:hidden">
				<NativeSelect
					aria-label="Chuyển tới mục"
					className="[&_select]:h-10 w-full [&_select]:rounded-md [&_select]:text-body"
					value={active}
					onChange={(e) => goTo(e.target.value)}
				>
					{sections.map((s) => (
						<NativeSelectOption key={s.id} value={s.id}>
							{s.label}
						</NativeSelectOption>
					))}
				</NativeSelect>
			</div>

			<nav aria-label="Mục lục" className="top-20 lg:block sticky hidden">
				<p className="mb-2 text-eyebrow text-muted-foreground uppercase">Mục lục</p>
				<ul className="border-l border-border">
					{sections.map((s) => {
						const isActive = s.id === active;
						return (
							<li key={s.id}>
								<button
									type="button"
									onClick={() => goTo(s.id)}
									aria-current={isActive ? 'true' : undefined}
									className={cn(
										'py-1 pl-3 -ml-px block w-full border-l-2 text-left text-body outline-none focus-visible:ring-2 focus-visible:ring-ring/50',
										isActive
											? 'font-medium border-primary text-foreground'
											: 'border-transparent text-muted-foreground hover:text-foreground',
									)}
								>
									{s.label}
								</button>
							</li>
						);
					})}
				</ul>
			</nav>
		</>
	);
}
