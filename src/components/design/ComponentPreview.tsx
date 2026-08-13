'use client';

import { CheckIcon, PlusIcon, TrashIcon } from 'lucide-react';
import { Panel, Row, Spec } from '@/components/design/Panel';
import { StatusBadge } from '@/components/layout/StatusBadge';
import { Button } from '@/components/ui/button';
import {
	Popover,
	PopoverContent,
	PopoverDescription,
	PopoverHeader,
	PopoverTitle,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const VARIANTS = [
	{ variant: 'default', label: 'Nút chính', note: 'Hành động chính, tối đa một cái mỗi màn' },
	{ variant: 'secondary', label: 'Nút phụ', note: 'Hành động thứ cấp' },
	{ variant: 'outline', label: 'Viền', note: 'Hành động ngang hàng nhau' },
	{ variant: 'ghost', label: 'Trong suốt', note: 'Trong thanh công cụ, trong hàng bảng' },
	{ variant: 'destructive', label: 'Xoá', note: 'Hành động phá huỷ, luôn kèm xác nhận' },
	{ variant: 'link', label: 'Liên kết', note: 'Điều hướng, không phải hành động' },
] as const;

const SIZES = [
	{ size: 'xs', label: 'Rất nhỏ', spec: 'h-6 · 24px' },
	{ size: 'sm', label: 'Nhỏ', spec: 'h-7 · 28px' },
	{ size: 'default', label: 'Mặc định', spec: 'h-8 · 32px' },
	{ size: 'lg', label: 'Lớn', spec: 'h-9 · 36px' },
] as const;

export function ComponentPreview() {
	return (
		<Panel
			id="dieu-khien"
			title="Điều khiển"
			intro="Nút, nhãn trạng thái và tab. Đây là những thứ người dùng bấm, nên chúng chịu ràng buộc tương phản chặt hơn phần trang trí."
		>
			<Row
				title="Biến thể nút"
				note="Nút luôn bo 8px, không bao giờ bo pill. Nhãn phải nằm gọn trên một dòng ở desktop, tối đa 3 từ cho hành động chính."
			>
				<div className="gap-3 sm:grid-cols-2 lg:grid-cols-3 grid grid-cols-1">
					{VARIANTS.map((v) => (
						<div key={v.variant} className="p-4 rounded-md border border-border bg-background">
							<Button variant={v.variant}>{v.label}</Button>
							<Spec className="mt-3 block">{v.variant}</Spec>
							<p className="mt-1 text-caption text-muted-foreground">{v.note}</p>
						</div>
					))}
				</div>
			</Row>

			<Row title="Cỡ nút" note="Bốn cỡ, tất cả đều là số chẵn chia hết cho 4.">
				<div className="gap-4 flex flex-wrap items-end">
					{SIZES.map((s) => (
						<div key={s.size}>
							<Button size={s.size}>{s.label}</Button>
							<Spec className="mt-2 block">{s.spec}</Spec>
						</div>
					))}
				</div>
			</Row>

			<Row
				title="Nút có icon và trạng thái"
				note="Icon lấy từ thư viện, không tự vẽ path SVG. Nút vô hiệu vẫn giữ nguyên chiều rộng để layout không nhảy."
			>
				<div className="gap-2 flex flex-wrap items-center">
					<Button>
						<PlusIcon />
						Thêm bản ghi
					</Button>
					<Button variant="outline">
						<CheckIcon />
						Xác nhận
					</Button>
					<Button variant="destructive">
						<TrashIcon />
						Xoá
					</Button>
					<Button disabled>Vô hiệu</Button>
				</div>
			</Row>

			<Row
				title="Nhãn trạng thái"
				note="Màu semantic luôn đi kèm chữ. Chấm màu chỉ hợp lệ khi nó mang trạng thái thật, và mọi cặp chữ trên nền ở đây đều đạt tối thiểu 5.2:1."
			>
				<div className="gap-2 flex flex-wrap items-center">
					<StatusBadge tone="neutral">Nháp</StatusBadge>
					<StatusBadge tone="warning">Chờ xử lý</StatusBadge>
					<StatusBadge tone="info">Đang chạy</StatusBadge>
					<StatusBadge tone="success">Hoàn tất</StatusBadge>
					<StatusBadge tone="danger">Từ chối</StatusBadge>
				</div>
			</Row>

			<Row
				title="Tab"
				note="Dùng để cắt một màn hình dày thành vài lát ngang hàng nhau. Không dùng tab để thay cho điều hướng giữa các trang."
			>
				<Tabs defaultValue="thong-tin">
					<TabsList>
						<TabsTrigger value="thong-tin">Thông tin</TabsTrigger>
						<TabsTrigger value="tep-dinh-kem">Tệp đính kèm</TabsTrigger>
						<TabsTrigger value="lich-su">Lịch sử</TabsTrigger>
					</TabsList>
					<TabsContent value="thong-tin" className="mt-4 text-body text-ink-muted">
						Nội dung lát thứ nhất.
					</TabsContent>
					<TabsContent value="tep-dinh-kem" className="mt-4 text-body text-ink-muted">
						Nội dung lát thứ hai.
					</TabsContent>
					<TabsContent value="lich-su" className="mt-4 text-body text-ink-muted">
						Nội dung lát thứ ba.
					</TabsContent>
				</Tabs>
			</Row>

			<Row
				title="Lớp nổi"
				note="Đây là chỗ DUY NHẤT được đổ bóng. Popover và tooltip không nằm trong luồng nội dung mà nổi lên trên nó, và trên nền trắng thì một đường viền 1px không đủ nói điều đó. Bóng nhuộm theo hue của mực chứ không dùng đen thuần."
			>
				<TooltipProvider>
					<div className="gap-2 flex flex-wrap items-center">
						<Popover>
							<PopoverTrigger asChild>
								<Button variant="outline">Mở popover</Button>
							</PopoverTrigger>
							<PopoverContent className="w-72">
								<PopoverHeader>
									<PopoverTitle>Lớp nổi</PopoverTitle>
									<PopoverDescription>
										Panel này bo 12px, có viền hairline và một lớp bóng rất nhẹ.
									</PopoverDescription>
								</PopoverHeader>
							</PopoverContent>
						</Popover>

						<Tooltip>
							<TooltipTrigger asChild>
								<Button variant="ghost">Di chuột để xem tooltip</Button>
							</TooltipTrigger>
							<TooltipContent>Tooltip cũng là lớp nổi</TooltipContent>
						</Tooltip>
					</div>
				</TooltipProvider>
			</Row>

			<p className="pt-4 border-t border-border text-caption text-muted-foreground">
				Một màn hình chỉ có MỘT nút chính. Hai nút cùng ý định trên cùng một màn là lỗi thiết kế: chọn một nhãn
				cho mỗi ý định rồi dùng nhất quán ở mọi nơi.
			</p>
		</Panel>
	);
}
