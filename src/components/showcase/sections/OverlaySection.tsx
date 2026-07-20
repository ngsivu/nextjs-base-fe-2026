'use client';

import { useState } from 'react';
import {
	BellIcon,
	CalendarIcon,
	CopyIcon,
	CreditCardIcon,
	DownloadIcon,
	FileTextIcon,
	InfoIcon,
	PencilIcon,
	SettingsIcon,
	ShareIcon,
	TrashIcon,
	UserIcon,
} from 'lucide-react';

import { Row, ShowcaseGroup, ShowcaseSection } from '@/components/showcase/ShowcaseSection';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
	Command,
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
} from '@/components/ui/command';
import {
	ContextMenu,
	ContextMenuCheckboxItem,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuLabel,
	ContextMenuSeparator,
	ContextMenuShortcut,
	ContextMenuSub,
	ContextMenuSubContent,
	ContextMenuSubTrigger,
	ContextMenuTrigger,
} from '@/components/ui/context-menu';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Menubar,
	MenubarCheckboxItem,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarRadioGroup,
	MenubarRadioItem,
	MenubarSeparator,
	MenubarShortcut,
	MenubarTrigger,
} from '@/components/ui/menubar';
import {
	Popover,
	PopoverContent,
	PopoverDescription,
	PopoverHeader,
	PopoverTitle,
	PopoverTrigger,
} from '@/components/ui/popover';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export function OverlaySection() {
	// Tất cả overlay đều đóng mặc định; chỉ CommandDialog cần state vì
	// nó không có trigger riêng.
	const [commandOpen, setCommandOpen] = useState(false);
	const [showInline, setShowInline] = useState(false);
	const [showHidden, setShowHidden] = useState(false);
	const [density, setDensity] = useState('comfortable');

	return (
		<ShowcaseGroup id="group-overlay" title="Overlay & Menu">
			<ShowcaseSection
				id="dialog"
				title="Dialog"
				description="Hộp thoại modal có tiêu đề, mô tả và footer hành động."
			>
				<Row>
					<Dialog>
						<DialogTrigger asChild>
							<Button variant="outline">Sửa hồ sơ</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Sửa hồ sơ</DialogTitle>
								<DialogDescription>
									Thay đổi thông tin hiển thị của bạn. Nhấn Lưu khi hoàn tất.
								</DialogDescription>
							</DialogHeader>
							<div className="gap-3 py-2 flex flex-col">
								<div className="gap-1.5 flex flex-col">
									<Label htmlFor="dialog-name">Tên hiển thị</Label>
									<Input id="dialog-name" defaultValue="Nguyễn Minh" />
								</div>
								<div className="gap-1.5 flex flex-col">
									<Label htmlFor="dialog-email">Email</Label>
									<Input id="dialog-email" type="email" defaultValue="minh@zyntrix.vn" />
								</div>
							</div>
							<DialogFooter>
								<DialogClose asChild>
									<Button variant="outline">Hủy</Button>
								</DialogClose>
								<DialogClose asChild>
									<Button>Lưu thay đổi</Button>
								</DialogClose>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</Row>
			</ShowcaseSection>

			<ShowcaseSection
				id="alert-dialog"
				title="Alert Dialog"
				description="Hộp thoại xác nhận cho hành động không thể hoàn tác — buộc người dùng chọn."
			>
				<Row>
					<AlertDialog>
						<AlertDialogTrigger asChild>
							<Button variant="destructive">Xóa dự án</Button>
						</AlertDialogTrigger>
						<AlertDialogContent>
							<AlertDialogHeader>
								<AlertDialogTitle>Xóa dự án này?</AlertDialogTitle>
								<AlertDialogDescription>
									Toàn bộ 12 tài liệu và lịch sử triển khai sẽ bị xóa vĩnh viễn. Hành động này không
									thể hoàn tác.
								</AlertDialogDescription>
							</AlertDialogHeader>
							<AlertDialogFooter>
								<AlertDialogCancel>Giữ lại</AlertDialogCancel>
								<AlertDialogAction variant="destructive">Xóa vĩnh viễn</AlertDialogAction>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>
				</Row>
			</ShowcaseSection>

			<ShowcaseSection
				id="sheet"
				title="Sheet"
				description="Panel trượt từ cạnh màn hình, dùng cho form phụ hoặc bộ lọc."
			>
				<Row>
					<Sheet>
						<SheetTrigger asChild>
							<Button variant="outline">Mở panel phải</Button>
						</SheetTrigger>
						<SheetContent>
							<SheetHeader>
								<SheetTitle>Bộ lọc đơn hàng</SheetTitle>
								<SheetDescription>Thu hẹp danh sách theo trạng thái và thời gian.</SheetDescription>
							</SheetHeader>
							<div className="gap-3 px-4 flex flex-col">
								<div className="gap-1.5 flex flex-col">
									<Label htmlFor="sheet-keyword">Từ khóa</Label>
									<Input id="sheet-keyword" placeholder="Mã đơn, tên khách..." />
								</div>
								<div className="gap-1.5 flex flex-col">
									<Label htmlFor="sheet-from">Từ ngày</Label>
									<Input id="sheet-from" type="date" />
								</div>
							</div>
							<SheetFooter>
								<SheetClose asChild>
									<Button>Áp dụng</Button>
								</SheetClose>
							</SheetFooter>
						</SheetContent>
					</Sheet>

					<Sheet>
						<SheetTrigger asChild>
							<Button variant="outline">Mở panel trái</Button>
						</SheetTrigger>
						<SheetContent side="left">
							<SheetHeader>
								<SheetTitle>Danh mục</SheetTitle>
								<SheetDescription>Điều hướng nhanh giữa các khu vực quản trị.</SheetDescription>
							</SheetHeader>
							<div className="gap-2 px-4 text-sm flex flex-col text-muted-foreground">
								<span>Tổng quan</span>
								<span>Đơn hàng</span>
								<span>Khách hàng</span>
								<span>Báo cáo</span>
							</div>
						</SheetContent>
					</Sheet>
				</Row>
			</ShowcaseSection>

			<ShowcaseSection
				id="drawer"
				title="Drawer"
				description="Ngăn kéo kéo-thả (vaul), hợp với thao tác trên thiết bị cảm ứng."
			>
				<Row>
					<Drawer>
						<DrawerTrigger asChild>
							<Button variant="outline">Mở drawer</Button>
						</DrawerTrigger>
						<DrawerContent>
							<DrawerHeader>
								<DrawerTitle>Chia sẻ báo cáo</DrawerTitle>
								<DrawerDescription>
									Người nhận sẽ xem được bản báo cáo tháng 7 ở chế độ chỉ đọc.
								</DrawerDescription>
							</DrawerHeader>
							<div className="px-4">
								<Label htmlFor="drawer-email">Email người nhận</Label>
								<Input id="drawer-email" type="email" placeholder="ten@congty.vn" className="mt-1.5" />
							</div>
							<DrawerFooter>
								<DrawerClose asChild>
									<Button>Gửi lời mời</Button>
								</DrawerClose>
								<DrawerClose asChild>
									<Button variant="outline">Đóng</Button>
								</DrawerClose>
							</DrawerFooter>
						</DrawerContent>
					</Drawer>
				</Row>
			</ShowcaseSection>

			<ShowcaseSection
				id="popover"
				title="Popover"
				description="Bảng nổi neo theo trigger, chứa được nội dung tương tác."
			>
				<Row>
					<Popover>
						<PopoverTrigger asChild>
							<Button variant="outline">
								<SettingsIcon />
								Kích thước khung
							</Button>
						</PopoverTrigger>
						<PopoverContent>
							<PopoverHeader>
								<PopoverTitle>Kích thước khung</PopoverTitle>
								<PopoverDescription>Đặt chiều rộng và chiều cao vùng xem trước.</PopoverDescription>
							</PopoverHeader>
							<div className="gap-2 flex flex-col">
								<div className="gap-2 grid grid-cols-3 items-center">
									<Label htmlFor="popover-width">Rộng</Label>
									<Input id="popover-width" defaultValue="1280" className="h-8 col-span-2" />
								</div>
								<div className="gap-2 grid grid-cols-3 items-center">
									<Label htmlFor="popover-height">Cao</Label>
									<Input id="popover-height" defaultValue="720" className="h-8 col-span-2" />
								</div>
							</div>
						</PopoverContent>
					</Popover>
				</Row>
			</ShowcaseSection>

			<ShowcaseSection
				id="hover-card"
				title="Hover Card"
				description="Xem trước thông tin khi rê chuột vào liên kết — không dùng cho hành động."
			>
				<Row>
					<HoverCard>
						<HoverCardTrigger asChild>
							<Button variant="ghost">@minh.nguyen</Button>
						</HoverCardTrigger>
						<HoverCardContent>
							<div className="gap-1.5 flex flex-col">
								<p className="font-medium">Nguyễn Minh</p>
								<p className="text-muted-foreground">
									Kỹ sư nền tảng, phụ trách hệ thống thiết kế và thư viện component.
								</p>
								<p className="gap-1.5 text-xs flex items-center text-muted-foreground">
									<CalendarIcon className="size-3.5" />
									Tham gia từ tháng 3/2023
								</p>
							</div>
						</HoverCardContent>
					</HoverCard>
				</Row>
			</ShowcaseSection>

			<ShowcaseSection
				id="tooltip"
				title="Tooltip"
				description="Nhãn phụ ngắn khi rê chuột hoặc focus. Cần bọc trong TooltipProvider."
			>
				<TooltipProvider>
					<Row>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button variant="outline" size="icon" aria-label="Sao chép liên kết">
									<CopyIcon />
								</Button>
							</TooltipTrigger>
							<TooltipContent>Sao chép liên kết</TooltipContent>
						</Tooltip>

						<Tooltip>
							<TooltipTrigger asChild>
								<Button variant="outline" size="icon" aria-label="Tải xuống">
									<DownloadIcon />
								</Button>
							</TooltipTrigger>
							<TooltipContent side="bottom">Tải bản CSV</TooltipContent>
						</Tooltip>

						<Tooltip>
							<TooltipTrigger asChild>
								<Button variant="outline" size="icon" aria-label="Thông tin gói cước">
									<InfoIcon />
								</Button>
							</TooltipTrigger>
							<TooltipContent side="right">Gói hiện tại giới hạn 5 dự án</TooltipContent>
						</Tooltip>
					</Row>
				</TooltipProvider>
			</ShowcaseSection>

			<ShowcaseSection
				id="dropdown-menu"
				title="Dropdown Menu"
				description="Menu hành động mở từ nút bấm, hỗ trợ nhóm, phím tắt và menu con."
			>
				<Row>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline">Tài khoản</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="start" className="w-56">
							<DropdownMenuLabel>Tài khoản của tôi</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								<DropdownMenuItem>
									<UserIcon />
									Hồ sơ
									<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<CreditCardIcon />
									Thanh toán
								</DropdownMenuItem>
								<DropdownMenuItem>
									<BellIcon />
									Thông báo
								</DropdownMenuItem>
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							<DropdownMenuSub>
								<DropdownMenuSubTrigger>
									<ShareIcon />
									Mời thành viên
								</DropdownMenuSubTrigger>
								<DropdownMenuSubContent>
									<DropdownMenuItem>Qua email</DropdownMenuItem>
									<DropdownMenuItem>Qua liên kết mời</DropdownMenuItem>
								</DropdownMenuSubContent>
							</DropdownMenuSub>
							<DropdownMenuSeparator />
							<DropdownMenuItem variant="destructive">
								<TrashIcon />
								Xóa workspace
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</Row>
			</ShowcaseSection>

			<ShowcaseSection
				id="context-menu"
				title="Context Menu"
				description="Menu chuột phải gắn với một vùng nội dung."
			>
				<ContextMenu>
					<ContextMenuTrigger className="h-32 text-sm flex items-center justify-center rounded-md border border-dashed border-border text-muted-foreground">
						Bấm chuột phải vào vùng này
					</ContextMenuTrigger>
					<ContextMenuContent className="w-56">
						<ContextMenuLabel>bao-cao-thang-7.pdf</ContextMenuLabel>
						<ContextMenuSeparator />
						<ContextMenuItem>
							<PencilIcon />
							Đổi tên
							<ContextMenuShortcut>F2</ContextMenuShortcut>
						</ContextMenuItem>
						<ContextMenuItem>
							<CopyIcon />
							Nhân bản
							<ContextMenuShortcut>⌘D</ContextMenuShortcut>
						</ContextMenuItem>
						<ContextMenuSub>
							<ContextMenuSubTrigger>
								<ShareIcon />
								Chia sẻ
							</ContextMenuSubTrigger>
							<ContextMenuSubContent>
								<ContextMenuItem>Sao chép liên kết</ContextMenuItem>
								<ContextMenuItem>Gửi qua email</ContextMenuItem>
							</ContextMenuSubContent>
						</ContextMenuSub>
						<ContextMenuSeparator />
						<ContextMenuCheckboxItem checked={showHidden} onCheckedChange={setShowHidden}>
							Hiện tệp ẩn
						</ContextMenuCheckboxItem>
						<ContextMenuSeparator />
						<ContextMenuItem variant="destructive">
							<TrashIcon />
							Chuyển vào thùng rác
						</ContextMenuItem>
					</ContextMenuContent>
				</ContextMenu>
			</ShowcaseSection>

			<ShowcaseSection
				id="menubar"
				title="Menubar"
				description="Thanh menu ngang kiểu ứng dụng desktop. Các menu đều đóng cho tới khi bấm."
			>
				<Menubar>
					<MenubarMenu>
						<MenubarTrigger>Tệp</MenubarTrigger>
						<MenubarContent>
							<MenubarItem>
								<FileTextIcon />
								Tài liệu mới
								<MenubarShortcut>⌘N</MenubarShortcut>
							</MenubarItem>
							<MenubarItem>
								Mở gần đây
								<MenubarShortcut>⌘O</MenubarShortcut>
							</MenubarItem>
							<MenubarSeparator />
							<MenubarItem>
								<DownloadIcon />
								Xuất PDF
							</MenubarItem>
						</MenubarContent>
					</MenubarMenu>
					<MenubarMenu>
						<MenubarTrigger>Sửa</MenubarTrigger>
						<MenubarContent>
							<MenubarItem>
								Hoàn tác
								<MenubarShortcut>⌘Z</MenubarShortcut>
							</MenubarItem>
							<MenubarItem>
								Làm lại
								<MenubarShortcut>⇧⌘Z</MenubarShortcut>
							</MenubarItem>
							<MenubarSeparator />
							<MenubarItem>Tìm và thay thế</MenubarItem>
						</MenubarContent>
					</MenubarMenu>
					<MenubarMenu>
						<MenubarTrigger>Hiển thị</MenubarTrigger>
						<MenubarContent>
							<MenubarCheckboxItem checked={showHidden} onCheckedChange={setShowHidden}>
								Hiện thanh bên
							</MenubarCheckboxItem>
							<MenubarSeparator />
							<MenubarRadioGroup value={density} onValueChange={setDensity}>
								<MenubarRadioItem value="comfortable">Mật độ thoáng</MenubarRadioItem>
								<MenubarRadioItem value="compact">Mật độ gọn</MenubarRadioItem>
							</MenubarRadioGroup>
						</MenubarContent>
					</MenubarMenu>
				</Menubar>
			</ShowcaseSection>

			<ShowcaseSection
				id="command"
				title="Command"
				description="Danh sách lệnh có tìm kiếm. Dùng inline hoặc trong CommandDialog."
			>
				<div className="gap-4 flex flex-col">
					{/* Render inline theo yêu cầu, KHÔNG render sẵn lúc tải trang.
					    cmdk gọi scrollIntoView lên item đang chọn ngay khi mount,
					    khiến cả trang bị kéo xuống giữa gallery. */}
					{showInline ? (
						<div className="max-w-md rounded-xl border border-border">
							<Command>
								<CommandInput placeholder="Tìm lệnh hoặc dự án..." />
								<CommandList>
									<CommandEmpty>Không có kết quả phù hợp.</CommandEmpty>
									<CommandGroup heading="Gợi ý">
										<CommandItem>
											<FileTextIcon />
											Tạo tài liệu mới
											<CommandShortcut>⌘N</CommandShortcut>
										</CommandItem>
										<CommandItem>
											<CalendarIcon />
											Xem lịch tuần này
										</CommandItem>
									</CommandGroup>
									<CommandSeparator />
									<CommandGroup heading="Cài đặt">
										<CommandItem>
											<UserIcon />
											Hồ sơ cá nhân
										</CommandItem>
										<CommandItem>
											<SettingsIcon />
											Tùy chọn hệ thống
										</CommandItem>
									</CommandGroup>
								</CommandList>
							</Command>
						</div>
					) : null}

					<Row>
						<Button variant="outline" onClick={() => setShowInline((value) => !value)}>
							{showInline ? 'Ẩn bản inline' : 'Hiện bản inline'}
						</Button>
						<Button variant="outline" onClick={() => setCommandOpen(true)}>
							Mở command palette
						</Button>
					</Row>

					<CommandDialog
						open={commandOpen}
						onOpenChange={setCommandOpen}
						title="Bảng lệnh"
						description="Tìm và chạy một lệnh bất kỳ."
					>
						<Command>
							<CommandInput placeholder="Nhập lệnh..." />
							<CommandList>
								<CommandEmpty>Không có kết quả phù hợp.</CommandEmpty>
								<CommandGroup heading="Điều hướng">
									<CommandItem onSelect={() => setCommandOpen(false)}>
										<FileTextIcon />
										Đến trang Tài liệu
									</CommandItem>
									<CommandItem onSelect={() => setCommandOpen(false)}>
										<CreditCardIcon />
										Đến trang Thanh toán
									</CommandItem>
								</CommandGroup>
								<CommandSeparator />
								<CommandGroup heading="Hành động">
									<CommandItem onSelect={() => setCommandOpen(false)}>
										<ShareIcon />
										Chia sẻ workspace
									</CommandItem>
								</CommandGroup>
							</CommandList>
						</Command>
					</CommandDialog>
				</div>
			</ShowcaseSection>
		</ShowcaseGroup>
	);
}
