import Link from 'next/link';
import { FadeIn } from '@/components/FadeIn';
import { DemoLinks } from '@/components/home/DemoLinks';
import { FeatureGrid } from '@/components/home/FeatureGrid';
import { FileTree } from '@/components/home/FileTree';
import { QuickStart } from '@/components/home/QuickStart';
import { Section } from '@/components/home/Section';
import { SiteFooter } from '@/components/home/SiteFooter';
import { SiteHeader } from '@/components/home/SiteHeader';
import { StateLayers } from '@/components/home/StateLayers';
import { Button } from '@/components/ui/button';

export default function Home() {
	return (
		<>
			<SiteHeader />

			<main className="max-w-6xl px-6 mx-auto">
				{/* Hero — cây thư mục đứng ngang hàng với lời giới thiệu,
				    vì với một boilerplate thì cấu trúc chính là sản phẩm. */}
				<section className="gap-12 py-16 sm:py-24 lg:grid-cols-2 grid items-center">
					<FadeIn>
						<div>
							<h1 className="font-semibold sm:text-[56px] text-[40px] leading-[1.1] tracking-[-1.8px]">
								Base FE
							</h1>
							<p className="mt-5 text-lg leading-7 max-w-md text-muted-foreground">
								Next.js starter đã dựng sẵn HTTP layer, state management, form validation và design
								system. Trỏ sang API của bạn là bắt đầu viết tính năng được.
							</p>

							<div className="mt-8 gap-3 flex flex-wrap items-center">
								<Button asChild>
									<Link href="/components">Xem components</Link>
								</Button>
								<Button asChild variant="outline">
									<a
										href="https://github.com/ngsivu/nextjs-base-fe-2026"
										target="_blank"
										rel="noreferrer"
									>
										GitHub
									</a>
								</Button>
							</div>

							<p className="mt-8 text-xs font-mono text-muted-foreground">
								Next.js 16 · React 19 · TypeScript 5.9 · Tailwind 4
							</p>
						</div>
					</FadeIn>

					<FadeIn delay={0.1}>
						<FileTree />
					</FadeIn>
				</section>

				<Section
					eyebrow="Có sẵn"
					title="Sáu thứ không phải dựng lại"
					description="Mỗi phần đều đã chạy trong trang demo, không phải cấu hình để đó."
				>
					<FeatureGrid />
				</Section>

				<Section
					eyebrow="Nguyên tắc"
					title="Ba tầng state, không dùng lẫn"
					description="Chọn đúng tầng trước khi viết. Đây là ranh giới giúp code không rối lên sau vài tháng."
				>
					<StateLayers />
				</Section>

				<Section eyebrow="Demo" title="Xem toàn bộ component">
					<DemoLinks />
				</Section>

				<Section eyebrow="Bắt đầu" title="Ba lệnh">
					<QuickStart />
				</Section>

				<SiteFooter />
			</main>
		</>
	);
}
