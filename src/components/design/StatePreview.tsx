'use client';

import { useState } from 'react';
import { AlertTriangleIcon, CheckCircle2Icon, FilePlus2Icon, InboxIcon, RotateCwIcon, XCircleIcon } from 'lucide-react';
import { Panel, Row, Spec } from '@/components/design/Panel';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Spinner } from '@/components/ui/spinner';

type StateKey = 'loading' | 'empty' | 'error';

const STATES: { key: StateKey; label: string }[] = [
	{ key: 'loading', label: 'Đang tải' },
	{ key: 'empty', label: 'Trống' },
	{ key: 'error', label: 'Lỗi' },
];

/**
 * Skeleton phải khớp HÌNH DẠNG của nội dung thật (ảnh đại diện vuông + hai dòng chữ),
 * không dùng vòng xoay chung chung: người dùng đoán được thứ sắp hiện ra.
 */
function LoadingState() {
	/* dữ liệu mẫu - độ dài thanh chữ mô phỏng tên và mã bản ghi có thật */
	const rows = [
		{ name: 'w-40', meta: 'w-24' },
		{ name: 'w-56', meta: 'w-20' },
		{ name: 'w-32', meta: 'w-28' },
	];

	return (
		<div className="space-y-4" aria-hidden>
			{rows.map((row, i) => (
				<div key={i} className="gap-3 flex items-center">
					<Skeleton className="size-10 shrink-0 rounded-md" />
					<div className="min-w-0 space-y-2 flex-1">
						<Skeleton className={`h-4 max-w-full ${row.name}`} />
						<Skeleton className={`h-3 max-w-full ${row.meta}`} />
					</div>
				</div>
			))}
		</div>
	);
}

/** Trạng thái trống phải chỉ đúng một hành động tiếp theo, không chỉ báo "không có gì". */
function EmptyState() {
	return (
		<div className="py-4 flex flex-col items-center text-center">
			<span className="size-12 flex items-center justify-center rounded-full bg-muted" aria-hidden>
				<InboxIcon className="size-6 text-ink-muted" />
			</span>
			<p className="mt-4 text-title text-foreground">Chưa có bản ghi nào</p>
			<p className="mt-2 max-w-[44ch] text-body text-ink-muted">
				Bộ lọc hiện tại chưa khớp bản ghi nào. Tải lên bản ghi đầu tiên để bắt đầu.
			</p>
			<Button className="mt-4">
				<FilePlus2Icon />
				Tải lên bản ghi
			</Button>
		</div>
	);
}

/** Lỗi phải nói rõ NGUYÊN NHÂN và cho một lối thoát, không chỉ "Đã có lỗi xảy ra". */
function ErrorState() {
	return (
		<div className="p-4 rounded-md bg-danger-subtle text-danger">
			<div className="gap-3 flex">
				<XCircleIcon className="mt-0.5 size-5 shrink-0" aria-hidden />
				<div className="min-w-0">
					<p className="font-medium text-body">Không tải được danh sách bản ghi</p>
					<p className="mt-1 max-w-[60ch] text-body">
						Máy chủ trả về lỗi 503 khi đọc kho bản ghi. Dữ liệu chưa mất, chỉ tạm thời không đọc được.
					</p>
					<Button variant="outline" size="sm" className="mt-3">
						<RotateCwIcon />
						Thử lại
					</Button>
				</div>
			</div>
		</div>
	);
}

/* dữ liệu mẫu - độ dài câu lấy sát thực tế để thấy thông báo chiếm bao nhiêu chỗ */
const TOASTS = [
	{
		key: 'success',
		Icon: CheckCircle2Icon,
		tone: 'bg-success-subtle text-success',
		title: 'Đã lưu thay đổi',
		desc: 'Bản mới đã ghi đè bản trước đó.',
		token: 'success-subtle',
	},
	{
		key: 'warning',
		Icon: AlertTriangleIcon,
		tone: 'bg-warning-subtle text-warning',
		title: 'Kho sắp đầy',
		desc: 'Hãy dọn bớt bản nháp cũ để giải phóng dung lượng.',
		token: 'warning-subtle',
	},
	{
		key: 'danger',
		Icon: XCircleIcon,
		tone: 'bg-danger-subtle text-danger',
		title: 'Tải lên thất bại',
		desc: 'Mất kết nối tới máy chủ, bản ghi vẫn ở trạng thái nháp.',
		token: 'danger-subtle',
	},
];

export function StatePreview() {
	const [state, setState] = useState<StateKey>('loading');

	return (
		<Panel
			id="trang-thai"
			title="Trạng thái"
			intro="Một màn hình không chỉ có lúc chạy tốt. Ba trạng thái tải, trống và lỗi đều phải được thiết kế, vì người dùng gặp chúng nhiều hơn ta tưởng."
		>
			<Row
				title="Ba trạng thái bắt buộc"
				note="Bấm để đổi trạng thái. Vùng nội dung giữ nguyên khung nên bố cục không nhảy khi chuyển giữa ba trạng thái."
			>
				<div className="mb-3 gap-2 flex flex-wrap">
					{STATES.map((s) => (
						<Button
							key={s.key}
							size="sm"
							variant={state === s.key ? 'default' : 'outline'}
							aria-pressed={state === s.key}
							onClick={() => setState(s.key)}
						>
							{s.label}
						</Button>
					))}
				</div>

				<div className="p-6 rounded-md border border-border bg-background">
					{state === 'loading' && <LoadingState />}
					{state === 'empty' && <EmptyState />}
					{state === 'error' && <ErrorState />}
				</div>
			</Row>

			<Row
				title="Tải trong nút"
				note="Nút đang xử lý phải giữ nguyên chiều rộng của nút bình thường. Nếu để nhãn co lại theo chữ mới, cả hàng nút bên cạnh sẽ dịch chỗ ngay lúc người dùng vừa bấm."
			>
				<div className="gap-3 flex flex-wrap items-center">
					<Button className="min-w-32">Lưu thay đổi</Button>
					<Button className="min-w-32" disabled>
						<Spinner />
						Đang lưu
					</Button>
				</div>
				<Spec className="mt-2 block">min-w-32 = 128px cho cả hai</Spec>
			</Row>

			<Row
				title="Thông báo thoáng qua"
				note="Toast chỉ dùng cho thông tin thoáng qua, đọc xong là bỏ. Lỗi của biểu mẫu PHẢI hiện inline ngay dưới ô nhập, không dùng toast, vì người dùng cần thấy lỗi cùng lúc với ô cần sửa."
			>
				<div className="space-y-3">
					{TOASTS.map(({ key, Icon, tone, title, desc, token }) => (
						<div key={key}>
							<div className={`gap-3 p-3 flex rounded-md ${tone}`}>
								<Icon className="mt-0.5 size-4 shrink-0" aria-hidden />
								<div className="min-w-0">
									<p className="font-medium text-body">{title}</p>
									<p className="mt-1 text-caption">{desc}</p>
								</div>
							</div>
							<Spec className="mt-1 block">{token}</Spec>
						</div>
					))}
				</div>
			</Row>

			<p className="pt-4 border-t border-border text-caption text-muted-foreground">
				Mọi màn hình thật phải dựng đủ ba trạng thái tải, trống và lỗi, không chỉ trạng thái thành công. Một màn
				hình chỉ có đường hạnh phúc coi như chưa xong.
			</p>
		</Panel>
	);
}
