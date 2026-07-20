'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Row, ShowcaseGroup, ShowcaseSection } from '@/components/showcase/ShowcaseSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import {
	Attachment,
	AttachmentAction,
	AttachmentActions,
	AttachmentContent,
	AttachmentDescription,
	AttachmentGroup,
	AttachmentMedia,
	AttachmentTitle,
} from '@/components/ui/attachment';
import {
	Breadcrumb,
	BreadcrumbEllipsis,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Bubble, BubbleContent, BubbleGroup, BubbleReactions } from '@/components/ui/bubble';
import { Button } from '@/components/ui/button';
import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from '@/components/ui/button-group';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { DirectionProvider } from '@/components/ui/direction';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Marker, MarkerContent, MarkerIcon } from '@/components/ui/marker';
import {
	Message,
	MessageAvatar,
	MessageContent,
	MessageFooter,
	MessageGroup,
	MessageHeader,
} from '@/components/ui/message';
import {
	MessageScroller,
	MessageScrollerButton,
	MessageScrollerContent,
	MessageScrollerItem,
	MessageScrollerProvider,
	MessageScrollerViewport,
} from '@/components/ui/message-scroller';
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuBadge,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
} from '@/components/ui/sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Toggle } from '@/components/ui/toggle';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import {
	BellIcon,
	BoldIcon,
	CheckIcon,
	ChevronDownIcon,
	DownloadIcon,
	FileTextIcon,
	HomeIcon,
	ImageIcon,
	InboxIcon,
	ItalicIcon,
	SettingsIcon,
	SparklesIcon,
	TrashIcon,
	UnderlineIcon,
	UsersIcon,
} from 'lucide-react';

const BUTTON_VARIANTS = ['default', 'outline', 'secondary', 'ghost', 'destructive', 'link'] as const;
const BUTTON_SIZES = ['xs', 'sm', 'default', 'lg'] as const;
const BUTTON_ICON_SIZES = ['icon-xs', 'icon-sm', 'icon', 'icon-lg'] as const;

const CHAT_MESSAGES = Array.from({ length: 12 }, (_, index) => ({
	id: `msg-${index + 1}`,
	text: `Tin nhắn số ${index + 1} — cuộn lên xuống để thấy nút quay lại cuối danh sách.`,
}));

const profileSchema = z.object({
	username: z.string().min(3, 'Tên đăng nhập cần tối thiểu 3 ký tự.'),
	email: z.email('Email không hợp lệ.'),
});

type ProfileValues = z.infer<typeof profileSchema>;

function ProfileFormDemo() {
	const [submitted, setSubmitted] = React.useState<ProfileValues | null>(null);

	const form = useForm<ProfileValues>({
		resolver: zodResolver(profileSchema),
		defaultValues: { username: '', email: '' },
	});

	function handleSubmit(values: ProfileValues) {
		setSubmitted(values);
	}

	return (
		<Form {...form}>
			<form noValidate onSubmit={form.handleSubmit(handleSubmit)} className="max-w-sm space-y-5">
				<FormField
					control={form.control}
					name="username"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Tên đăng nhập</FormLabel>
							<FormControl>
								<Input placeholder="nguyenvana" {...field} />
							</FormControl>
							<FormDescription>Tên hiển thị công khai của bạn.</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input type="email" placeholder="ban@vidu.com" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Row>
					<Button type="submit">Gửi</Button>
					<Button
						type="button"
						variant="ghost"
						onClick={() => {
							form.reset();
							setSubmitted(null);
						}}
					>
						Đặt lại
					</Button>
				</Row>

				{submitted ? (
					<p className="text-sm text-muted-foreground">
						Đã gửi: <span className="font-medium text-foreground">{submitted.username}</span> —{' '}
						<span className="font-medium text-foreground">{submitted.email}</span>
					</p>
				) : null}
			</form>
		</Form>
	);
}

export function LayoutSection() {
	const [collapsibleOpen, setCollapsibleOpen] = React.useState(false);

	return (
		<>
			<ShowcaseGroup id="group-action" title="Hành động">
				<ShowcaseSection
					id="button"
					title="Button"
					description="6 variant và 8 size (4 size chữ + 4 size icon) khai báo trong buttonVariants."
				>
					<div className="space-y-5">
						<div>
							<p className="mb-2.5 text-xs text-muted-foreground">variant</p>
							<Row>
								{BUTTON_VARIANTS.map((variant) => (
									<Button key={variant} variant={variant}>
										{variant}
									</Button>
								))}
							</Row>
						</div>

						<div>
							<p className="mb-2.5 text-xs text-muted-foreground">size</p>
							<Row>
								{BUTTON_SIZES.map((size) => (
									<Button key={size} size={size}>
										{size}
									</Button>
								))}
							</Row>
						</div>

						<div>
							<p className="mb-2.5 text-xs text-muted-foreground">size icon</p>
							<Row>
								{BUTTON_ICON_SIZES.map((size) => (
									<Button key={size} size={size} variant="outline" aria-label={size}>
										<SettingsIcon />
									</Button>
								))}
							</Row>
						</div>

						<div>
							<p className="mb-2.5 text-xs text-muted-foreground">kèm icon, disabled, asChild</p>
							<Row>
								<Button>
									<DownloadIcon data-icon="inline-start" />
									Tải xuống
								</Button>
								<Button variant="outline" disabled>
									Vô hiệu hóa
								</Button>
								<Button variant="link" asChild>
									<a href="#button">Là thẻ a</a>
								</Button>
							</Row>
						</div>
					</div>
				</ShowcaseSection>

				<ShowcaseSection
					id="button-group"
					title="Button Group"
					description="Gom nhóm nút liền mạch, hỗ trợ orientation ngang/dọc, ButtonGroupText và ButtonGroupSeparator."
				>
					<div className="space-y-5">
						<Row>
							<ButtonGroup>
								<Button variant="outline">Trước</Button>
								<Button variant="outline">Giữa</Button>
								<Button variant="outline">Sau</Button>
							</ButtonGroup>

							<ButtonGroup>
								<ButtonGroupText>https://</ButtonGroupText>
								<Button variant="outline">zyntrix.vn</Button>
							</ButtonGroup>

							<ButtonGroup>
								<Button variant="outline">Lưu</Button>
								<ButtonGroupSeparator />
								<Button variant="outline" size="icon" aria-label="Thêm lựa chọn">
									<ChevronDownIcon />
								</Button>
							</ButtonGroup>
						</Row>

						<ButtonGroup orientation="vertical" className="w-40">
							<Button variant="outline">Trên</Button>
							<Button variant="outline">Giữa</Button>
							<Button variant="outline">Dưới</Button>
						</ButtonGroup>
					</div>
				</ShowcaseSection>

				<ShowcaseSection
					id="toggle"
					title="Toggle"
					description="Nút hai trạng thái. variant: default | outline. size: sm | default | lg."
				>
					<Row>
						<Toggle aria-label="In đậm">
							<BoldIcon />
						</Toggle>
						<Toggle variant="outline" aria-label="In nghiêng">
							<ItalicIcon />
						</Toggle>
						<Toggle size="sm" variant="outline" aria-label="Gạch chân size sm">
							<UnderlineIcon />
						</Toggle>
						<Toggle size="lg" variant="outline" defaultPressed>
							Bật sẵn
						</Toggle>
						<Toggle disabled>Vô hiệu hóa</Toggle>
					</Row>
				</ShowcaseSection>

				<ShowcaseSection
					id="toggle-group"
					title="Toggle Group"
					description="type single/multiple, spacing=0 để các item dính liền, orientation dọc/ngang."
				>
					<div className="space-y-5">
						<div>
							<p className="mb-2.5 text-xs text-muted-foreground">multiple + outline</p>
							<ToggleGroup type="multiple" variant="outline" defaultValue={['bold']}>
								<ToggleGroupItem value="bold" aria-label="In đậm">
									<BoldIcon />
								</ToggleGroupItem>
								<ToggleGroupItem value="italic" aria-label="In nghiêng">
									<ItalicIcon />
								</ToggleGroupItem>
								<ToggleGroupItem value="underline" aria-label="Gạch chân">
									<UnderlineIcon />
								</ToggleGroupItem>
							</ToggleGroup>
						</div>

						<div>
							<p className="mb-2.5 text-xs text-muted-foreground">single + spacing 0</p>
							<ToggleGroup type="single" variant="outline" spacing={0} defaultValue="thang">
								<ToggleGroupItem value="ngay">Ngày</ToggleGroupItem>
								<ToggleGroupItem value="tuan">Tuần</ToggleGroupItem>
								<ToggleGroupItem value="thang">Tháng</ToggleGroupItem>
							</ToggleGroup>
						</div>

						<div>
							<p className="mb-2.5 text-xs text-muted-foreground">orientation dọc</p>
							<ToggleGroup type="single" variant="outline" orientation="vertical" spacing={0}>
								<ToggleGroupItem value="a">Lựa chọn A</ToggleGroupItem>
								<ToggleGroupItem value="b">Lựa chọn B</ToggleGroupItem>
							</ToggleGroup>
						</div>
					</div>
				</ShowcaseSection>
			</ShowcaseGroup>

			<ShowcaseGroup id="group-nav" title="Điều hướng">
				<ShowcaseSection
					id="tabs"
					title="Tabs"
					description="TabsList có variant default (nền muted) và line (gạch chân). Tabs hỗ trợ orientation dọc."
				>
					<div className="space-y-6">
						<Tabs defaultValue="tong-quan">
							<TabsList>
								<TabsTrigger value="tong-quan">Tổng quan</TabsTrigger>
								<TabsTrigger value="hoat-dong">Hoạt động</TabsTrigger>
								<TabsTrigger value="cai-dat">Cài đặt</TabsTrigger>
							</TabsList>
							<TabsContent value="tong-quan" className="pt-3 text-muted-foreground">
								Nội dung tổng quan.
							</TabsContent>
							<TabsContent value="hoat-dong" className="pt-3 text-muted-foreground">
								Nhật ký hoạt động gần đây.
							</TabsContent>
							<TabsContent value="cai-dat" className="pt-3 text-muted-foreground">
								Tùy chỉnh cài đặt tại đây.
							</TabsContent>
						</Tabs>

						<Tabs defaultValue="ban-nhap">
							<TabsList variant="line">
								<TabsTrigger value="ban-nhap">Bản nháp</TabsTrigger>
								<TabsTrigger value="da-xuat-ban">Đã xuất bản</TabsTrigger>
							</TabsList>
							<TabsContent value="ban-nhap" className="pt-3 text-muted-foreground">
								Danh sách bản nháp.
							</TabsContent>
							<TabsContent value="da-xuat-ban" className="pt-3 text-muted-foreground">
								Danh sách đã xuất bản.
							</TabsContent>
						</Tabs>

						<Tabs defaultValue="ho-so" orientation="vertical">
							<TabsList>
								<TabsTrigger value="ho-so">Hồ sơ</TabsTrigger>
								<TabsTrigger value="bao-mat">Bảo mật</TabsTrigger>
							</TabsList>
							<TabsContent value="ho-so" className="px-3 text-muted-foreground">
								Thông tin hồ sơ.
							</TabsContent>
							<TabsContent value="bao-mat" className="px-3 text-muted-foreground">
								Thiết lập bảo mật.
							</TabsContent>
						</Tabs>
					</div>
				</ShowcaseSection>

				<ShowcaseSection
					id="breadcrumb"
					title="Breadcrumb"
					description="Đường dẫn phân cấp. BreadcrumbEllipsis rút gọn các cấp ở giữa, BreadcrumbPage là trang hiện tại."
				>
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem>
								<BreadcrumbLink href="#breadcrumb">Trang chủ</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								<BreadcrumbEllipsis />
							</BreadcrumbItem>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								<BreadcrumbLink href="#breadcrumb">Tài liệu</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								<BreadcrumbPage>Breadcrumb</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</ShowcaseSection>

				<ShowcaseSection
					id="navigation-menu"
					title="Navigation Menu"
					description="Thanh điều hướng có panel xổ xuống. navigationMenuTriggerStyle() dùng cho link phẳng không có panel."
				>
					<NavigationMenu>
						<NavigationMenuList>
							<NavigationMenuItem>
								<NavigationMenuTrigger>Sản phẩm</NavigationMenuTrigger>
								<NavigationMenuContent>
									<ul className="gap-1 md:grid-cols-2 grid w-[420px]">
										<li>
											<NavigationMenuLink href="#navigation-menu">
												<SparklesIcon />
												<div>
													<p className="font-medium">Bảng điều khiển</p>
													<p className="text-xs text-muted-foreground">
														Theo dõi chỉ số theo thời gian thực.
													</p>
												</div>
											</NavigationMenuLink>
										</li>
										<li>
											<NavigationMenuLink href="#navigation-menu">
												<UsersIcon />
												<div>
													<p className="font-medium">Nhóm</p>
													<p className="text-xs text-muted-foreground">
														Quản lý thành viên và phân quyền.
													</p>
												</div>
											</NavigationMenuLink>
										</li>
									</ul>
								</NavigationMenuContent>
							</NavigationMenuItem>

							<NavigationMenuItem>
								<NavigationMenuTrigger>Tài nguyên</NavigationMenuTrigger>
								<NavigationMenuContent>
									<ul className="gap-1 grid w-[260px]">
										<li>
											<NavigationMenuLink href="#navigation-menu">Tài liệu</NavigationMenuLink>
										</li>
										<li>
											<NavigationMenuLink href="#navigation-menu">Hướng dẫn</NavigationMenuLink>
										</li>
									</ul>
								</NavigationMenuContent>
							</NavigationMenuItem>

							<NavigationMenuItem>
								<NavigationMenuLink href="#navigation-menu" className={navigationMenuTriggerStyle()}>
									Bảng giá
								</NavigationMenuLink>
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>
				</ShowcaseSection>

				<ShowcaseSection
					id="pagination"
					title="Pagination"
					description="PaginationLink dựng trên Button (isActive đổi sang variant outline). Prop text đổi nhãn Previous/Next."
				>
					<Pagination>
						<PaginationContent>
							<PaginationItem>
								<PaginationPrevious href="#pagination" text="Trước" />
							</PaginationItem>
							<PaginationItem>
								<PaginationLink href="#pagination">1</PaginationLink>
							</PaginationItem>
							<PaginationItem>
								<PaginationLink href="#pagination" isActive>
									2
								</PaginationLink>
							</PaginationItem>
							<PaginationItem>
								<PaginationLink href="#pagination">3</PaginationLink>
							</PaginationItem>
							<PaginationItem>
								<PaginationEllipsis />
							</PaginationItem>
							<PaginationItem>
								<PaginationNext href="#pagination" text="Sau" />
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				</ShowcaseSection>

				<ShowcaseSection
					id="sidebar"
					title="Sidebar"
					description="Bộ khung sidebar đầy đủ trong src/components/ui/sidebar.tsx — cần bọc SidebarProvider và thường chiếm cả layout trang."
				>
					<div className="space-y-4">
						<p className="text-sm text-muted-foreground">
							Mặc định (<code className="text-xs font-mono">collapsible=&quot;offcanvas&quot;</code>)
							sidebar dùng <code className="text-xs font-mono">position: fixed</code> và chiều cao{' '}
							<code className="text-xs font-mono">svh</code>, nên không thể nhúng nguyên vẹn vào gallery.
							Bản thu nhỏ bên dưới dùng{' '}
							<code className="text-xs font-mono">collapsible=&quot;none&quot;</code> — nhánh render tĩnh,
							an toàn trong khung cố định. Các phần còn lại (SidebarTrigger, SidebarRail, SidebarInset,
							variant floating/inset, chế độ mobile mở bằng Sheet) chỉ hoạt động đúng ở cấp layout.
						</p>

						<div className="h-64 overflow-hidden rounded-lg border border-border">
							<SidebarProvider
								className="min-h-0 h-full"
								style={{ '--sidebar-width': '15rem' } as React.CSSProperties}
							>
								<Sidebar collapsible="none" className="h-full border-r border-border">
									<SidebarHeader className="text-sm font-medium">Zyntrix</SidebarHeader>
									<SidebarContent>
										<SidebarGroup>
											<SidebarGroupLabel>Chung</SidebarGroupLabel>
											<SidebarGroupContent>
												<SidebarMenu>
													<SidebarMenuItem>
														<SidebarMenuButton isActive>
															<HomeIcon />
															<span>Trang chủ</span>
														</SidebarMenuButton>
													</SidebarMenuItem>
													<SidebarMenuItem>
														<SidebarMenuButton>
															<InboxIcon />
															<span>Hộp thư</span>
														</SidebarMenuButton>
														<SidebarMenuBadge>8</SidebarMenuBadge>
													</SidebarMenuItem>
													<SidebarMenuItem>
														<SidebarMenuButton>
															<SettingsIcon />
															<span>Cài đặt</span>
														</SidebarMenuButton>
													</SidebarMenuItem>
												</SidebarMenu>
											</SidebarGroupContent>
										</SidebarGroup>
									</SidebarContent>
								</Sidebar>
								<div className="p-4 text-sm flex-1 text-muted-foreground">
									Vùng nội dung chính (ở layout thật sẽ là SidebarInset).
								</div>
							</SidebarProvider>
						</div>
					</div>
				</ShowcaseSection>
			</ShowcaseGroup>

			<ShowcaseGroup id="group-layout" title="Bố cục">
				<ShowcaseSection
					id="accordion"
					title="Accordion"
					description="type single (kèm collapsible) hoặc multiple. Icon chevron tự đổi chiều theo trạng thái."
				>
					<Accordion type="single" collapsible defaultValue="item-1">
						<AccordionItem value="item-1">
							<AccordionTrigger>Dự án này dùng design token thế nào?</AccordionTrigger>
							<AccordionContent>
								Toàn bộ màu đi qua biến CSS trong globals.scss và được dùng lại bằng class Tailwind như
								<code className="text-xs font-mono"> bg-primary</code>,
								<code className="text-xs font-mono"> text-muted-foreground</code>. Không hardcode mã hex
								trong component.
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-2">
							<AccordionTrigger>Có hỗ trợ mở nhiều mục cùng lúc không?</AccordionTrigger>
							<AccordionContent>
								Có — đặt <code className="text-xs font-mono">type=&quot;multiple&quot;</code> trên
								Accordion.
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-3">
							<AccordionTrigger>Có animation không?</AccordionTrigger>
							<AccordionContent>
								Có, dùng keyframe accordion-down / accordion-up khai báo sẵn trong theme.
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</ShowcaseSection>

				<ShowcaseSection
					id="collapsible"
					title="Collapsible"
					description="Đóng/mở một khối nội dung. Chỉ có 3 phần: Collapsible, CollapsibleTrigger, CollapsibleContent."
				>
					<Collapsible
						open={collapsibleOpen}
						onOpenChange={setCollapsibleOpen}
						className="max-w-sm space-y-2"
					>
						<Row className="justify-between">
							<span className="text-sm font-medium">3 kho lưu trữ gần đây</span>
							<CollapsibleTrigger asChild>
								<Button variant="ghost" size="icon-sm" aria-label="Đóng/mở danh sách">
									<ChevronDownIcon
										className={
											collapsibleOpen ? 'rotate-180 transition-transform' : 'transition-transform'
										}
									/>
								</Button>
							</CollapsibleTrigger>
						</Row>
						<div className="px-3 py-2 text-sm rounded-lg border border-border font-mono">
							@zyntrix/base-fe
						</div>
						<CollapsibleContent className="space-y-2">
							<div className="px-3 py-2 text-sm rounded-lg border border-border font-mono">
								@zyntrix/ui-kit
							</div>
							<div className="px-3 py-2 text-sm rounded-lg border border-border font-mono">
								@zyntrix/api-client
							</div>
						</CollapsibleContent>
					</Collapsible>
				</ShowcaseSection>

				<ShowcaseSection
					id="separator"
					title="Separator"
					description="Đường kẻ ngăn cách, orientation horizontal | vertical. decorative mặc định true (ẩn khỏi screen reader)."
				>
					<div className="space-y-4">
						<div>
							<p className="text-sm font-medium">Thư viện component</p>
							<p className="text-sm text-muted-foreground">Bộ component dùng chung của Zyntrix.</p>
							<Separator className="my-3" />
							<Row className="h-5 text-sm text-muted-foreground">
								<span>Tài liệu</span>
								<Separator orientation="vertical" />
								<span>Mã nguồn</span>
								<Separator orientation="vertical" />
								<span>Giấy phép</span>
							</Row>
						</div>
					</div>
				</ShowcaseSection>

				<ShowcaseSection
					id="scroll-area"
					title="Scroll Area"
					description="Vùng cuộn với thanh cuộn tùy biến. ScrollBar dọc được render sẵn; thêm orientation horizontal nếu cần."
				>
					<ScrollArea className="h-56 max-w-sm p-4 w-full rounded-lg border border-border">
						<div className="space-y-2">
							{Array.from({ length: 25 }, (_, index) => (
								<div key={index} className="text-sm">
									Dòng nội dung số {index + 1}
									<Separator className="mt-2" />
								</div>
							))}
						</div>
					</ScrollArea>
				</ShowcaseSection>

				<ShowcaseSection
					id="resizable"
					title="Resizable"
					description="Bọc react-resizable-panels v4: dùng prop orientation (không phải direction) trên ResizablePanelGroup."
				>
					<div className="space-y-5">
						<ResizablePanelGroup orientation="horizontal" className="h-48 rounded-lg border border-border">
							<ResizablePanel defaultSize="35">
								<div className="p-4 text-sm flex h-full items-center justify-center text-muted-foreground">
									Bảng trái
								</div>
							</ResizablePanel>
							<ResizableHandle withHandle />
							<ResizablePanel>
								<div className="p-4 text-sm flex h-full items-center justify-center text-muted-foreground">
									Bảng phải
								</div>
							</ResizablePanel>
						</ResizablePanelGroup>

						<ResizablePanelGroup orientation="vertical" className="h-48 rounded-lg border border-border">
							<ResizablePanel>
								<div className="p-4 text-sm flex h-full items-center justify-center text-muted-foreground">
									Bảng trên
								</div>
							</ResizablePanel>
							<ResizableHandle withHandle />
							<ResizablePanel defaultSize="30">
								<div className="p-4 text-sm flex h-full items-center justify-center text-muted-foreground">
									Bảng dưới
								</div>
							</ResizablePanel>
						</ResizablePanelGroup>
					</div>
				</ShowcaseSection>
			</ShowcaseGroup>

			<ShowcaseGroup id="group-misc" title="Khác">
				<ShowcaseSection
					id="form"
					title="Form"
					description="Wrapper của react-hook-form: Form là FormProvider, FormField là Controller, FormMessage tự lấy lỗi từ fieldState."
				>
					<div className="space-y-4">
						<p className="text-sm text-muted-foreground">
							Bấm Gửi khi form trống để thấy lỗi validate từ zodResolver. Thẻ{' '}
							<code className="text-xs font-mono">&lt;form&gt;</code> đặt{' '}
							<code className="text-xs font-mono">noValidate</code> theo quy ước dự án để trình duyệt
							không tự hiện tooltip validate.
						</p>
						<ProfileFormDemo />
					</div>
				</ShowcaseSection>

				<ShowcaseSection
					id="bubble"
					title="Bubble"
					description="Bong bóng chat. Bubble nhận variant + align; màu nền được áp cho BubbleContent bên trong qua selector data-slot."
				>
					<div className="space-y-5">
						<BubbleGroup className="max-w-md">
							<Bubble align="end">
								<BubbleContent>Chào bạn, cho mình hỏi về gói doanh nghiệp nhé?</BubbleContent>
							</Bubble>
							<Bubble variant="secondary">
								<BubbleContent>Chào bạn! Mình sẵn sàng hỗ trợ.</BubbleContent>
							</Bubble>
							<Bubble variant="muted" className="mb-4">
								<BubbleContent>Bạn cần bao nhiêu chỗ ngồi?</BubbleContent>
								<BubbleReactions>👍 2</BubbleReactions>
							</Bubble>
						</BubbleGroup>

						<div>
							<p className="mb-2.5 text-xs text-muted-foreground">variant</p>
							<div className="gap-2 flex flex-col items-start">
								{(
									[
										'default',
										'secondary',
										'muted',
										'tinted',
										'outline',
										'ghost',
										'destructive',
									] as const
								).map((variant) => (
									<Bubble key={variant} variant={variant}>
										<BubbleContent>{variant}</BubbleContent>
									</Bubble>
								))}
							</div>
						</div>
					</div>
				</ShowcaseSection>

				<ShowcaseSection
					id="message"
					title="Message"
					description="Khung một lượt hội thoại: avatar + header/nội dung/footer. align='end' tự đảo chiều hàng và căn nội dung sang phải."
				>
					<MessageGroup className="max-w-lg gap-6">
						<Message>
							<MessageAvatar className="size-8">
								<SparklesIcon className="size-4" />
							</MessageAvatar>
							<MessageContent>
								<MessageHeader>Trợ lý</MessageHeader>
								<Bubble variant="muted">
									<BubbleContent>Mình đã tổng hợp báo cáo tuần này cho bạn.</BubbleContent>
								</Bubble>
								<MessageFooter>09:12</MessageFooter>
							</MessageContent>
						</Message>

						<Message align="end">
							<MessageAvatar className="size-8 text-xs font-medium">NV</MessageAvatar>
							<MessageContent>
								<MessageHeader>Bạn</MessageHeader>
								<Bubble align="end">
									<BubbleContent>Cảm ơn, gửi mình bản PDF nhé.</BubbleContent>
								</Bubble>
								<MessageFooter>09:13</MessageFooter>
							</MessageContent>
						</Message>
					</MessageGroup>
				</ShowcaseSection>

				<ShowcaseSection
					id="message-scroller"
					title="Message Scroller"
					description="Bọc @shadcn/react/message-scroller: vùng cuộn tự bám đáy khi có tin nhắn mới, kèm nút quay lại cuối danh sách."
				>
					<div className="space-y-4">
						<p className="text-sm text-muted-foreground">
							Bắt buộc bọc <code className="text-xs font-mono">MessageScrollerProvider</code> (giữ state
							autoScroll) rồi tới Root → Viewport → Content → Item. Cuộn lên trên để{' '}
							<code className="text-xs font-mono">MessageScrollerButton</code> hiện ra. Ngoài ra còn 3
							hook <code className="text-xs font-mono">useMessageScroller</code>,{' '}
							<code className="text-xs font-mono">useMessageScrollerScrollable</code>,{' '}
							<code className="text-xs font-mono">useMessageScrollerVisibility</code> để điều khiển bằng
							code.
						</p>

						<div className="h-64 overflow-hidden rounded-lg border border-border">
							<MessageScrollerProvider defaultScrollPosition="end">
								<MessageScroller>
									<MessageScrollerViewport>
										<MessageScrollerContent className="gap-3 p-4">
											{CHAT_MESSAGES.map((message) => (
												<MessageScrollerItem key={message.id} messageId={message.id}>
													<Bubble variant="muted">
														<BubbleContent>{message.text}</BubbleContent>
													</Bubble>
												</MessageScrollerItem>
											))}
										</MessageScrollerContent>
									</MessageScrollerViewport>
									<MessageScrollerButton />
								</MessageScroller>
							</MessageScrollerProvider>
						</div>
					</div>
				</ShowcaseSection>

				<ShowcaseSection
					id="attachment"
					title="Attachment"
					description="Thẻ tệp đính kèm. state: idle | uploading | processing | error | done. size: xs | sm | default. orientation: horizontal | vertical."
				>
					<div className="space-y-5">
						<Row className="items-stretch">
							<Attachment>
								<AttachmentMedia>
									<FileTextIcon />
								</AttachmentMedia>
								<AttachmentContent>
									<AttachmentTitle>bao-cao-quy-3.pdf</AttachmentTitle>
									<AttachmentDescription>1,2 MB</AttachmentDescription>
								</AttachmentContent>
								<AttachmentActions>
									<AttachmentAction aria-label="Xóa tệp">
										<TrashIcon />
									</AttachmentAction>
								</AttachmentActions>
							</Attachment>

							<Attachment state="uploading">
								<AttachmentMedia>
									<ImageIcon />
								</AttachmentMedia>
								<AttachmentContent>
									<AttachmentTitle>anh-bia.png</AttachmentTitle>
									<AttachmentDescription>Đang tải lên…</AttachmentDescription>
								</AttachmentContent>
							</Attachment>

							<Attachment state="error">
								<AttachmentMedia>
									<FileTextIcon />
								</AttachmentMedia>
								<AttachmentContent>
									<AttachmentTitle>hop-dong.docx</AttachmentTitle>
									<AttachmentDescription>Tải lên thất bại</AttachmentDescription>
								</AttachmentContent>
							</Attachment>
						</Row>

						<div>
							<p className="mb-2.5 text-xs text-muted-foreground">size sm / xs và orientation vertical</p>
							<AttachmentGroup>
								<Attachment size="sm">
									<AttachmentMedia>
										<FileTextIcon />
									</AttachmentMedia>
									<AttachmentContent>
										<AttachmentTitle>ghi-chu.txt</AttachmentTitle>
									</AttachmentContent>
								</Attachment>
								<Attachment size="xs">
									<AttachmentMedia>
										<FileTextIcon />
									</AttachmentMedia>
									<AttachmentContent>
										<AttachmentTitle>readme.md</AttachmentTitle>
									</AttachmentContent>
								</Attachment>
								<Attachment orientation="vertical">
									<AttachmentMedia>
										<ImageIcon />
									</AttachmentMedia>
									<AttachmentContent>
										<AttachmentTitle>so-do.png</AttachmentTitle>
										<AttachmentDescription>420 KB</AttachmentDescription>
									</AttachmentContent>
								</Attachment>
							</AttachmentGroup>
						</div>
					</div>
				</ShowcaseSection>

				<ShowcaseSection
					id="marker"
					title="Marker"
					description="Dòng chú thích phụ trong luồng hội thoại. variant: default | separator (kẻ hai bên) | border (kẻ dưới)."
				>
					<div className="max-w-md space-y-4">
						<Marker>
							<MarkerIcon>
								<CheckIcon />
							</MarkerIcon>
							<MarkerContent>Đã gửi lúc 09:14</MarkerContent>
						</Marker>

						<Marker variant="separator">
							<MarkerContent>Hôm nay</MarkerContent>
						</Marker>

						<Marker variant="border">
							<MarkerIcon>
								<BellIcon />
							</MarkerIcon>
							<MarkerContent>Trợ lý đã bật thông báo cho cuộc trò chuyện này.</MarkerContent>
						</Marker>
					</div>
				</ShowcaseSection>

				<ShowcaseSection
					id="direction"
					title="Direction"
					description="Provider hướng đọc của Radix. Không render UI — chỉ cấp giá trị dir cho các primitive bên trong."
				>
					<div className="space-y-4">
						<p className="text-sm text-muted-foreground">
							Nhận <code className="text-xs font-mono">dir</code> hoặc alias{' '}
							<code className="text-xs font-mono">direction</code> (
							<code className="text-xs font-mono">&quot;ltr&quot; | &quot;rtl&quot;</code>), và export
							hook <code className="text-xs font-mono">useDirection()</code> để đọc lại giá trị. Các
							primitive Radix (menu, slider, tabs…) dùng giá trị này để đảo chiều bàn phím và animation.
							Lưu ý phải đặt thêm thuộc tính <code className="text-xs font-mono">dir</code> trên DOM để
							CSS logical property đổi theo.
						</p>

						<DirectionProvider direction="rtl">
							<div dir="rtl" className="max-w-sm p-4 rounded-lg border border-border">
								<Tabs defaultValue="mot">
									<TabsList>
										<TabsTrigger value="mot">التبويب الأول</TabsTrigger>
										<TabsTrigger value="hai">التبويب الثاني</TabsTrigger>
									</TabsList>
									<TabsContent value="mot" className="pt-3 text-muted-foreground">
										المحتوى الأول
									</TabsContent>
									<TabsContent value="hai" className="pt-3 text-muted-foreground">
										المحتوى الثاني
									</TabsContent>
								</Tabs>
							</div>
						</DirectionProvider>
					</div>
				</ShowcaseSection>
			</ShowcaseGroup>
		</>
	);
}
