import type { Metadata } from 'next';
import { SiteHeader } from '@/components/home/SiteHeader';
import { NAV_GROUPS } from '@/components/showcase/navGroups';
import { ShowcaseNav } from '@/components/showcase/ShowcaseNav';
import { DataSection } from '@/components/showcase/sections/DataSection';
import { FormSection } from '@/components/showcase/sections/FormSection';
import { LayoutSection } from '@/components/showcase/sections/LayoutSection';
import { OverlaySection } from '@/components/showcase/sections/OverlaySection';

export const metadata: Metadata = {
	title: 'Components — Base FE',
	description: 'Toàn bộ component UI có sẵn trong base.',
};

const TOTAL = NAV_GROUPS.reduce((sum, group) => sum + group.items.length, 0);

export default function ComponentsPage() {
	return (
		<>
			<SiteHeader />

			<div className="max-w-7xl px-6 mx-auto">
				<div className="lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-12">
					{/* Sidebar: dính màn hình trên desktop, xếp trên nội dung ở mobile */}
					<aside className="py-8 lg:sticky lg:top-14 lg:h-[calc(100vh-3.5rem)] lg:border-r lg:pr-6 border-border">
						<ShowcaseNav groups={NAV_GROUPS} />
					</aside>

					<main className="min-w-0 py-8 lg:py-12">
						<header className="pb-8 border-b border-border">
							<p className="mb-3 font-medium text-[13px] tracking-[0.4px] text-primary uppercase">
								Gallery
							</p>
							<h1 className="font-semibold sm:text-[40px] text-[32px] tracking-[-1px]">Components</h1>
							<p className="mt-3 max-w-2xl text-muted-foreground">
								{TOTAL} component có sẵn trong{' '}
								<code className="text-sm font-mono">src/components/ui/</code>. Toàn bộ nằm trong repo
								nên sửa trực tiếp được, không phải chờ bản phát hành của thư viện.
							</p>
						</header>

						<div className="pb-24">
							<LayoutSection />
							<FormSection />
							<OverlaySection />
							<DataSection />
						</div>
					</main>
				</div>
			</div>
		</>
	);
}
