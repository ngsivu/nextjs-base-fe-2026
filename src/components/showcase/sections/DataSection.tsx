'use client';

import * as React from 'react';
import { AlertTriangle, ArrowUpRight, Command, FolderOpen, Info, Plus, ShieldCheck, Wallet } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import { toast } from 'sonner';

import { Row, ShowcaseGroup, ShowcaseSection } from '@/components/showcase/ShowcaseSection';
import { Alert, AlertAction, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Avatar, AvatarBadge, AvatarFallback, AvatarGroup, AvatarGroupCount } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from '@/components/ui/item';
import { Kbd, KbdGroup } from '@/components/ui/kbd';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { Spinner } from '@/components/ui/spinner';
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

const currency = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 });

const invoices = [
	{ id: 'HD-1042', customer: 'Nguyễn Thị Mai', status: 'Đã thanh toán', amount: 12_500_000 },
	{ id: 'HD-1043', customer: 'Trần Quốc Bảo', status: 'Chờ xử lý', amount: 4_800_000 },
	{ id: 'HD-1044', customer: 'Lê Hoàng Anh', status: 'Quá hạn', amount: 21_000_000 },
];

const revenueData = [
	{ month: 'Tháng 1', revenue: 182_000_000 },
	{ month: 'Tháng 2', revenue: 149_000_000 },
	{ month: 'Tháng 3', revenue: 236_000_000 },
	{ month: 'Tháng 4', revenue: 204_000_000 },
	{ month: 'Tháng 5', revenue: 291_000_000 },
	{ month: 'Tháng 6', revenue: 318_000_000 },
];

const revenueChartConfig = {
	revenue: {
		label: 'Doanh thu',
		color: 'var(--chart-1)',
	},
} satisfies ChartConfig;

export function DataSection() {
	return (
		<ShowcaseGroup id="group-data" title="Hiển thị & Phản hồi">
			<ShowcaseSection id="table" title="Table" description="Bảng dữ liệu với header, body, footer và caption.">
				<Table>
					<TableCaption>Danh sách hóa đơn quý II/2026.</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead>Mã hóa đơn</TableHead>
							<TableHead>Khách hàng</TableHead>
							<TableHead>Trạng thái</TableHead>
							<TableHead className="text-right">Số tiền</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{invoices.map((invoice) => (
							<TableRow key={invoice.id}>
								<TableCell className="font-medium">{invoice.id}</TableCell>
								<TableCell>{invoice.customer}</TableCell>
								<TableCell>{invoice.status}</TableCell>
								<TableCell className="text-right tabular-nums">
									{currency.format(invoice.amount)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
					<TableFooter>
						<TableRow>
							<TableCell colSpan={3}>Tổng cộng</TableCell>
							<TableCell className="text-right tabular-nums">
								{currency.format(invoices.reduce((total, invoice) => total + invoice.amount, 0))}
							</TableCell>
						</TableRow>
					</TableFooter>
				</Table>
			</ShowcaseSection>

			<ShowcaseSection id="card" title="Card" description="Khối nội dung với header, action, content và footer.">
				<div className="gap-4 sm:grid-cols-2 grid">
					<Card>
						<CardHeader>
							<CardTitle>Doanh thu tháng 6</CardTitle>
							<CardDescription>Tổng hợp từ tất cả chi nhánh.</CardDescription>
							<CardAction>
								<Button variant="ghost" size="icon-sm" aria-label="Xem chi tiết">
									<ArrowUpRight />
								</Button>
							</CardAction>
						</CardHeader>
						<CardContent>
							<p className="text-2xl font-medium tabular-nums">{currency.format(318_000_000)}</p>
							<p className="mt-1 text-sm text-muted-foreground">Tăng 9,3% so với tháng trước.</p>
						</CardContent>
						<CardFooter>
							<Button variant="outline" size="sm">
								Xuất báo cáo
							</Button>
						</CardFooter>
					</Card>
					<Card size="sm">
						<CardHeader>
							<CardTitle>Gói dịch vụ</CardTitle>
							<CardDescription>Biến thể size “sm” cho khối gọn hơn.</CardDescription>
						</CardHeader>
						<CardContent>
							<p className="text-sm">Đang dùng gói Doanh nghiệp, gia hạn ngày 01/08/2026.</p>
						</CardContent>
					</Card>
				</div>
			</ShowcaseSection>

			<ShowcaseSection id="badge" title="Badge" description="Nhãn trạng thái, hỗ trợ 6 biến thể.">
				<Row>
					<Badge>Mặc định</Badge>
					<Badge variant="secondary">Thứ cấp</Badge>
					<Badge variant="destructive">Quá hạn</Badge>
					<Badge variant="outline">Viền</Badge>
					<Badge variant="ghost">Mờ</Badge>
					<Badge variant="link">Liên kết</Badge>
					<Badge variant="secondary">
						<ShieldCheck data-icon="inline-start" />
						Đã xác minh
					</Badge>
				</Row>
			</ShowcaseSection>

			<ShowcaseSection
				id="avatar"
				title="Avatar"
				description="Ảnh đại diện với fallback chữ cái, badge trạng thái và nhóm chồng."
			>
				<Row className="gap-6">
					<Row>
						<Avatar size="sm">
							<AvatarFallback>NM</AvatarFallback>
						</Avatar>
						<Avatar>
							<AvatarFallback>TB</AvatarFallback>
						</Avatar>
						<Avatar size="lg">
							<AvatarFallback>LA</AvatarFallback>
						</Avatar>
					</Row>
					<Avatar>
						<AvatarFallback>PT</AvatarFallback>
						<AvatarBadge className="bg-primary" />
					</Avatar>
					<AvatarGroup>
						<Avatar>
							<AvatarFallback>NM</AvatarFallback>
						</Avatar>
						<Avatar>
							<AvatarFallback>TB</AvatarFallback>
						</Avatar>
						<Avatar>
							<AvatarFallback>LA</AvatarFallback>
						</Avatar>
						<AvatarGroupCount>+8</AvatarGroupCount>
					</AvatarGroup>
				</Row>
			</ShowcaseSection>

			<ShowcaseSection
				id="item"
				title="Item"
				description="Dòng danh sách với media, tiêu đề, mô tả và hành động. Có 3 biến thể và 3 kích thước."
			>
				<ItemGroup className="gap-2">
					<Item variant="outline">
						<ItemMedia variant="icon">
							<Wallet />
						</ItemMedia>
						<ItemContent>
							<ItemTitle>Ví thanh toán</ItemTitle>
							<ItemDescription>Số dư khả dụng {currency.format(45_200_000)}.</ItemDescription>
						</ItemContent>
						<ItemActions>
							<Button variant="outline" size="sm">
								Nạp tiền
							</Button>
						</ItemActions>
					</Item>
					<Item variant="muted">
						<ItemMedia variant="icon">
							<ShieldCheck />
						</ItemMedia>
						<ItemContent>
							<ItemTitle>Xác thực hai lớp</ItemTitle>
							<ItemDescription>Đã bật cho tài khoản của Nguyễn Thị Mai.</ItemDescription>
						</ItemContent>
					</Item>
					<Item variant="outline" size="xs">
						<ItemMedia variant="icon">
							<Info />
						</ItemMedia>
						<ItemContent>
							<ItemTitle>Biến thể size “xs”</ItemTitle>
						</ItemContent>
					</Item>
				</ItemGroup>
			</ShowcaseSection>

			<ShowcaseSection id="empty" title="Empty" description="Trạng thái rỗng khi chưa có dữ liệu.">
				<Empty>
					<EmptyHeader>
						<EmptyMedia variant="icon">
							<FolderOpen />
						</EmptyMedia>
						<EmptyTitle>Chưa có hóa đơn nào</EmptyTitle>
						<EmptyDescription>Hóa đơn được tạo sẽ hiển thị tại đây để bạn theo dõi.</EmptyDescription>
					</EmptyHeader>
					<EmptyContent>
						<Button size="sm">
							<Plus data-icon="inline-start" />
							Tạo hóa đơn
						</Button>
					</EmptyContent>
				</Empty>
			</ShowcaseSection>

			<ShowcaseSection
				id="aspect-ratio"
				title="Aspect Ratio"
				description="Giữ tỉ lệ khung hình cho nội dung con. Dùng khối màu thay ảnh."
			>
				<div className="max-w-md gap-4 sm:grid-cols-2 grid">
					<div>
						<AspectRatio ratio={16 / 9}>
							<div className="text-xs flex size-full items-center justify-center rounded-lg bg-muted text-muted-foreground">
								16 / 9
							</div>
						</AspectRatio>
					</div>
					<div>
						<AspectRatio ratio={1}>
							<div className="text-xs flex size-full items-center justify-center rounded-lg bg-muted text-muted-foreground">
								1 / 1
							</div>
						</AspectRatio>
					</div>
				</div>
			</ShowcaseSection>

			<ShowcaseSection
				id="carousel"
				title="Carousel"
				description="Băng chuyền dựa trên Embla, điều hướng bằng nút trước/sau hoặc phím mũi tên."
			>
				<Carousel className="mx-12 max-w-md" opts={{ align: 'start' }}>
					<CarouselContent>
						{['Chi nhánh Hà Nội', 'Chi nhánh Đà Nẵng', 'Chi nhánh Cần Thơ', 'Chi nhánh Hải Phòng'].map(
							(branch) => (
								<CarouselItem key={branch} className="basis-1/2">
									<AspectRatio ratio={4 / 3}>
										<div className="p-3 text-xs flex size-full items-center justify-center rounded-lg bg-muted text-center text-muted-foreground">
											{branch}
										</div>
									</AspectRatio>
								</CarouselItem>
							),
						)}
					</CarouselContent>
					<CarouselPrevious />
					<CarouselNext />
				</Carousel>
			</ShowcaseSection>

			<ShowcaseSection
				id="chart"
				title="Chart"
				description="Lớp bọc quanh Recharts: ChartContainer nhận config để ánh xạ nhãn và màu qua biến --color-*."
			>
				<ChartContainer config={revenueChartConfig} className="max-h-64 w-full">
					<BarChart data={revenueData}>
						<CartesianGrid vertical={false} />
						<XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
						<ChartTooltip
							content={
								<ChartTooltipContent
									formatter={(value) => (
										<span className="font-mono tabular-nums">{currency.format(Number(value))}</span>
									)}
								/>
							}
						/>
						<Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
					</BarChart>
				</ChartContainer>
			</ShowcaseSection>

			<ShowcaseSection id="alert" title="Alert" description="Thông báo tĩnh trong luồng nội dung, có 2 biến thể.">
				<div className="gap-3 grid">
					<Alert>
						<Info />
						<AlertTitle>Kỳ đối soát sắp kết thúc</AlertTitle>
						<AlertDescription>Vui lòng hoàn tất đối soát trước 17:00 ngày 25/07/2026.</AlertDescription>
						<AlertAction>
							<Button variant="outline" size="xs">
								Đối soát
							</Button>
						</AlertAction>
					</Alert>
					<Alert variant="destructive">
						<AlertTriangle />
						<AlertTitle>Hóa đơn HD-1044 đã quá hạn</AlertTitle>
						<AlertDescription>Khoản {currency.format(21_000_000)} chưa được thanh toán.</AlertDescription>
					</Alert>
				</div>
			</ShowcaseSection>

			<ShowcaseSection
				id="sonner"
				title="Sonner"
				description="Toast dạng xếp chồng. <Toaster /> đã được gắn sẵn trong Providers, ở đây chỉ gọi hàm toast."
			>
				<Row>
					<Button
						variant="outline"
						size="sm"
						onClick={() => {
							toast.success('Đã lưu hóa đơn HD-1042.');
						}}
					>
						Thành công
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => {
							toast.error('Không kết nối được máy chủ đối soát.');
						}}
					>
						Lỗi
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => {
							toast.info('Kỳ đối soát tháng 7 bắt đầu từ ngày 01/08/2026.');
						}}
					>
						Thông tin
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => {
							toast('Đã xóa hóa đơn nháp.', {
								description: 'Bản nháp của Trần Quốc Bảo.',
								action: {
									label: 'Hoàn tác',
									onClick: () => {
										toast.success('Đã khôi phục bản nháp.');
									},
								},
							});
						}}
					>
						Kèm hành động
					</Button>
				</Row>
			</ShowcaseSection>

			<ShowcaseSection
				id="progress"
				title="Progress"
				description="Thanh tiến trình cho tác vụ có tỉ lệ xác định."
			>
				<ProgressDemo />
			</ShowcaseSection>

			<ShowcaseSection
				id="skeleton"
				title="Skeleton"
				description="Khung xương giữ chỗ, dựng theo đúng bố cục nội dung thật khi đang tải."
			>
				<div className="gap-3 flex items-center">
					<Skeleton className="size-10 rounded-full" />
					<div className="gap-2 grid flex-1">
						<Skeleton className="h-4 w-40" />
						<Skeleton className="h-3 w-64" />
					</div>
					<Skeleton className="h-8 w-24 rounded-lg" />
				</div>
			</ShowcaseSection>

			<ShowcaseSection
				id="spinner"
				title="Spinner"
				description="Vòng quay cho tác vụ chưa biết tỉ lệ hoàn thành. Kích thước theo class size-*."
			>
				<Row className="gap-6">
					<Spinner className="size-4" />
					<Spinner className="size-6" />
					<Spinner className="size-8 text-muted-foreground" />
					<Button size="sm" disabled>
						<Spinner />
						Đang đối soát
					</Button>
				</Row>
			</ShowcaseSection>

			<ShowcaseSection
				id="kbd"
				title="Kbd"
				description="Hiển thị phím tắt; KbdGroup gộp nhiều phím thành tổ hợp."
			>
				<Row className="gap-6">
					<Kbd>Esc</Kbd>
					<KbdGroup>
						<Kbd>
							<Command />
						</Kbd>
						<Kbd>K</Kbd>
					</KbdGroup>
					<KbdGroup>
						<Kbd>Ctrl</Kbd>
						<Kbd>Shift</Kbd>
						<Kbd>P</Kbd>
					</KbdGroup>
				</Row>
			</ShowcaseSection>
		</ShowcaseGroup>
	);
}

function ProgressDemo() {
	const [value, setValue] = React.useState(35);

	return (
		<div className="gap-4 grid">
			<Progress value={value} />
			<Row className="justify-between">
				<span className="text-sm text-muted-foreground tabular-nums">Đã tải {value}%</span>
				<Row>
					<Button
						variant="outline"
						size="sm"
						onClick={() => {
							setValue((current) => Math.max(0, current - 20));
						}}
					>
						Giảm
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => {
							setValue((current) => Math.min(100, current + 20));
						}}
					>
						Tăng
					</Button>
				</Row>
			</Row>
		</div>
	);
}
