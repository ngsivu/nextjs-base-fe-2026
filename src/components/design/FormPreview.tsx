'use client';

import { useState } from 'react';
import { CircleAlertIcon } from 'lucide-react';
import { Panel, Row, Spec } from '@/components/design/Panel';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';

/* NativeSelect nhận className ở lớp bọc ngoài chứ không phải thẻ select, nên
   muốn ô rộng hết hàng thì phải với vào con. */
const SELECT_FIELD = 'w-full [&_select]:w-full';

const FOLDERS = ['Bản ghi chung', 'Bản nháp', 'Đã chia sẻ', 'Lưu trữ'];

const SCOPES = [
	{ value: 'rieng-tu', label: 'Riêng tư', note: 'Chỉ mình bạn xem được' },
	{ value: 'chia-se', label: 'Chia sẻ theo liên kết', note: 'Ai có liên kết đều xem được' },
	{ value: 'to-chuc', label: 'Toàn tổ chức', note: 'Mọi tài khoản đã đăng nhập' },
];

/** Một trường đầy đủ: nhãn trên ô, ô, rồi dòng mô tả phụ dưới ô. */
function Field({
	htmlFor,
	label,
	hint,
	children,
}: {
	htmlFor: string;
	label: string;
	hint: string;
	children: React.ReactNode;
}) {
	return (
		<div className="space-y-2">
			<Label htmlFor={htmlFor} className="text-body">
				{label}
			</Label>
			{children}
			<p className="text-caption text-muted-foreground">{hint}</p>
		</div>
	);
}

/** Ô minh hoạ một trạng thái của trường nhập, kèm tên trạng thái dạng eyebrow. */
function StateCell({ name, children }: { name: string; children: React.ReactNode }) {
	return (
		<div className="p-4 rounded-md border border-border bg-background">
			<p className="text-eyebrow text-muted-foreground uppercase">{name}</p>
			<div className="mt-3 space-y-2">{children}</div>
		</div>
	);
}

export function FormPreview() {
	const [autoSave, setAutoSave] = useState(true);
	const [scope, setScope] = useState('rieng-tu');
	const [notify, setNotify] = useState(false);

	return (
		<Panel
			id="bieu-mau"
			title="Biểu mẫu"
			intro="Một trường gồm ba phần cố định: nhãn nằm trên ô, ô nhập, dòng mô tả phụ. Thứ tự này không đổi giữa các màn hình để người dùng luôn biết tìm thông tin ở đâu."
		>
			<Row
				title="Trường nhập"
				note="Chuỗi do máy sinh như mã bản ghi dùng font mono để dễ đối chiếu từng ký tự; chữ người nhập dùng font sans. Trên thiết bị cảm ứng ô tự cao lên 44px, không cần ép tay."
			>
				<div className="gap-4 sm:grid-cols-2 grid grid-cols-1">
					<Field htmlFor="bm-ten" label="Tên bản ghi" hint="Hiện trong danh sách và kết quả tìm kiếm.">
						{/* dữ liệu mẫu */}
						<Input id="bm-ten" defaultValue="Bản ghi mẫu" />
					</Field>

					<Field htmlFor="bm-ma" label="Mã bản ghi" hint="Hệ thống cấp tự động, không sửa được.">
						{/* dữ liệu mẫu */}
						<Input id="bm-ma" className="font-mono" defaultValue="REF-2026-0148" readOnly />
					</Field>

					<Field htmlFor="bm-thu-muc" label="Thư mục" hint="Quyết định nơi lưu và quyền truy cập mặc định.">
						<NativeSelect id="bm-thu-muc" className={SELECT_FIELD} defaultValue="Bản ghi chung">
							{FOLDERS.map((t) => (
								<NativeSelectOption key={t} value={t}>
									{t}
								</NativeSelectOption>
							))}
						</NativeSelect>
					</Field>

					<Field htmlFor="bm-ghi-chu" label="Ghi chú" hint="Ô tự giãn theo nội dung, tối thiểu ba dòng.">
						{/* dữ liệu mẫu */}
						<Textarea
							id="bm-ghi-chu"
							className="min-h-20"
							defaultValue="Bản cập nhật thay cho tệp tải lên hôm trước."
						/>
					</Field>
				</div>
			</Row>

			<Row
				title="Trạng thái trường"
				note="Bốn trạng thái của cùng một ô. Trạng thái focus ở đây được vẽ sẵn để xem cạnh nhau, thực tế nó chỉ hiện khi ô nhận con trỏ hoặc phím Tab."
			>
				<div className="gap-3 sm:grid-cols-2 lg:grid-cols-4 grid grid-cols-1">
					<StateCell name="Bình thường">
						<Label htmlFor="bm-tt-thuong" className="text-body">
							Mã bản ghi
						</Label>
						{/* dữ liệu mẫu */}
						<Input id="bm-tt-thuong" className="font-mono" defaultValue="REF-2026-0148" />
						<Spec className="block">border-input</Spec>
					</StateCell>

					<StateCell name="Đang focus">
						<Label htmlFor="bm-tt-focus" className="text-body">
							Mã bản ghi
						</Label>
						{/* dữ liệu mẫu */}
						<Input
							id="bm-tt-focus"
							className="border-ring font-mono ring-2 ring-ring/50"
							defaultValue="REF-2026-0148"
						/>
						<Spec className="block">border-ring + ring-2</Spec>
					</StateCell>

					<StateCell name="Vô hiệu">
						<Label htmlFor="bm-tt-disabled" className="text-body">
							Mã bản ghi
						</Label>
						{/* dữ liệu mẫu */}
						<Input id="bm-tt-disabled" className="font-mono" defaultValue="REF-2026-0148" disabled />
						<Spec className="block">disabled</Spec>
					</StateCell>

					<StateCell name="Lỗi">
						<Label htmlFor="bm-tt-loi" className="text-body">
							Mã bản ghi
						</Label>
						{/* dữ liệu mẫu */}
						<Input
							id="bm-tt-loi"
							className="font-mono"
							defaultValue="REF-2026"
							aria-invalid
							aria-describedby="bm-tt-loi-error"
						/>
						<p id="bm-tt-loi-error" className="gap-2 flex items-start text-caption text-danger">
							<CircleAlertIcon className="mt-0.5 size-4 shrink-0" aria-hidden />
							Mã bản ghi phải có dạng REF-2026-0148.
						</p>
					</StateCell>
				</div>
			</Row>

			<Row
				title="Lựa chọn"
				note="Checkbox cho lựa chọn độc lập, radio cho một trong nhiều, switch cho công tắc có hiệu lực ngay. Nhãn luôn bấm được nên vùng chạm rộng hơn chính ô đánh dấu."
			>
				<div className="gap-3 sm:grid-cols-3 grid grid-cols-1">
					<div className="p-4 rounded-md border border-border bg-background">
						<p className="text-eyebrow text-muted-foreground uppercase">Checkbox</p>
						<div className="mt-3 min-h-10 gap-3 flex items-center">
							<Checkbox
								id="bm-auto-save"
								checked={autoSave}
								/* Radix cho phép trạng thái 'indeterminate' nên phải so sánh thẳng với true. */
								onCheckedChange={(v: boolean | 'indeterminate') => setAutoSave(v === true)}
							/>
							<Label htmlFor="bm-auto-save" className="text-body">
								Lưu bản nháp mỗi 5 phút
							</Label>
						</div>
						<p className="mt-2 text-caption text-muted-foreground">
							Đang {autoSave ? 'bật' : 'tắt'}. Một lựa chọn độc lập, không ràng buộc lựa chọn khác.
						</p>
					</div>

					<div className="p-4 rounded-md border border-border bg-background">
						<p className="text-eyebrow text-muted-foreground uppercase">Radio</p>
						<RadioGroup value={scope} onValueChange={setScope} className="mt-3 gap-1">
							{SCOPES.map((p) => (
								<div key={p.value} className="min-h-10 gap-3 flex items-center">
									<RadioGroupItem id={`bm-scope-${p.value}`} value={p.value} />
									<Label htmlFor={`bm-scope-${p.value}`} className="text-body">
										{p.label}
									</Label>
								</div>
							))}
						</RadioGroup>
						<p className="mt-2 text-caption text-muted-foreground">
							{SCOPES.find((p) => p.value === scope)?.note}
						</p>
					</div>

					<div className="p-4 rounded-md border border-border bg-background">
						<p className="text-eyebrow text-muted-foreground uppercase">Switch</p>
						<div className="mt-3 min-h-10 gap-3 flex items-center">
							<Switch id="bm-notify" checked={notify} onCheckedChange={setNotify} />
							<Label htmlFor="bm-notify" className="text-body">
								Nhận thông báo khi có thay đổi
							</Label>
						</div>
						<p className="mt-2 text-caption text-muted-foreground">
							Switch có hiệu lực ngay khi gạt, không cần bấm Lưu. Hiện đang {notify ? 'bật' : 'tắt'}.
						</p>
					</div>
				</div>
			</Row>

			<p className="pt-4 border-t border-border text-caption text-muted-foreground">
				Nhãn luôn nằm trên ô và không bao giờ dùng placeholder thay nhãn, vì placeholder biến mất ngay khi người
				dùng gõ chữ đầu tiên. Lỗi hiện inline ngay dưới ô đúng chỗ sai, không dùng toast: toast tự tắt và không
				chỉ được ra trường nào hỏng. Chiều cao ô theo thang cho chuột; trên thiết bị cảm ứng globals.scss tự
				nâng lên 44px, không ép bằng tay.
			</p>
		</Panel>
	);
}
