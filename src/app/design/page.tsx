import type { Metadata } from 'next';
import { ChartPreview } from '@/components/design/ChartPreview';
import { ColorTokens } from '@/components/design/ColorTokens';
import { ComponentPreview } from '@/components/design/ComponentPreview';
import { FormPreview } from '@/components/design/FormPreview';
import { MotionTokens } from '@/components/design/MotionTokens';
import { PatternPreview } from '@/components/design/PatternPreview';
import { type Section, SectionNav } from '@/components/design/SectionNav';
import { SpacingTokens } from '@/components/design/SpacingTokens';
import { StatePreview } from '@/components/design/StatePreview';
import { TypeScale } from '@/components/design/TypeScale';
import { SiteHeader } from '@/components/home/SiteHeader';
import { FadeIn } from '@/components/layout/FadeIn';

export const metadata: Metadata = {
	title: 'Design — Base FE',
	description: 'Token màu, thang chữ, khoảng cách, thành phần và chuyển động của base.',
};

/** Mục lục trang. Thứ tự đi từ nền tảng tới thành phần rồi tới chuyển động. */
const SECTIONS: Section[] = [
	{ id: 'mau', label: 'Màu' },
	{ id: 'chu', label: 'Chữ' },
	{ id: 'nen-tang', label: 'Nền tảng' },
	{ id: 'dieu-khien', label: 'Điều khiển' },
	{ id: 'bieu-mau', label: 'Biểu mẫu' },
	{ id: 'mau-hinh', label: 'Mẫu hình' },
	{ id: 'trang-thai', label: 'Trạng thái' },
	{ id: 'bieu-do', label: 'Biểu đồ' },
	{ id: 'chuyen-dong', label: 'Chuyển động' },
];

export default function DesignSystemPage() {
	return (
		<>
			<SiteHeader />

			<main className="px-4 py-10 md:px-6 md:py-12 mx-auto w-full max-w-[1400px]">
				<FadeIn>
					<h1 className="md:text-display-lg max-w-[20ch] text-display-md text-foreground">Hệ thiết kế</h1>
					<p className="mt-3 max-w-[65ch] text-body-lg text-ink-muted">
						Token màu, thang chữ, khoảng cách, thành phần và chuyển động của base. Đổi theme ở góc trên để
						kiểm tra cả hai chế độ. Quy tắc đầy đủ nằm trong{' '}
						<code className="font-mono text-body">DESIGN.md</code> ở thư mục gốc.
					</p>
					<p className="mt-2 max-w-[65ch] text-body text-muted-foreground">
						Trang này nói về <strong>tầng token</strong>. Muốn xem từng component UI một thì sang{' '}
						<code className="font-mono text-body">/components</code>.
					</p>
				</FadeIn>

				{/* Cột phải là mục lục dính, chỉ dựng từ lg; dưới lg nó thu thành ô chọn
				    nằm ngay trên nội dung.
				    KHÔNG đặt lg:items-start ở đây: nó làm aside co lại bằng chiều cao nội dung
				    nên sticky của mục lục hết chỗ bám và biến mất ngay khi cuộn qua. Để grid
				    stretch mặc định thì aside cao bằng cả hàng và mục lục bám suốt trang. */}
				<div className="mt-8 lg:grid lg:grid-cols-[minmax(0,1fr)_200px] lg:gap-8 flex flex-col">
					<div className="space-y-6">
						<ColorTokens />
						<TypeScale />
						<SpacingTokens />
						<ComponentPreview />
						<FormPreview />
						<PatternPreview />
						<StatePreview />
						<ChartPreview />
						<MotionTokens />
					</div>

					{/* Dưới lg container là flex-col nên aside phải order-first mới nằm trên
					    nội dung; ở lg trả về order mặc định để grid xếp nó vào cột phải. */}
					<aside className="mb-6 lg:order-none lg:mb-0 order-first">
						<SectionNav sections={SECTIONS} />
					</aside>
				</div>
			</main>
		</>
	);
}
