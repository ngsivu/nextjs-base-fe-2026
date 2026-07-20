'use client';

import { useState } from 'react';

import { Row, ShowcaseGroup, ShowcaseSection } from '@/components/showcase/ShowcaseSection';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import {
	Combobox,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxInput,
	ComboboxItem,
	ComboboxList,
} from '@/components/ui/combobox';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
	InputGroupText,
} from '@/components/ui/input-group';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp';
import { Label } from '@/components/ui/label';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';
import { NumberInput } from '@/components/ui/number-input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { SearchIcon } from 'lucide-react';

const TINH_THANH = ['Hà Nội', 'Đà Nẵng', 'Hải Phòng', 'Cần Thơ', 'TP. Hồ Chí Minh'];

export function FormSection() {
	const [checked, setChecked] = useState(true);
	const [radio, setRadio] = useState('ca-nhan');
	const [selectValue, setSelectValue] = useState('');
	const [switchOn, setSwitchOn] = useState(true);
	const [slider, setSlider] = useState([40]);
	const [range, setRange] = useState([20, 70]);
	const [otp, setOtp] = useState('');
	const [amount, setAmount] = useState('1500000');
	const [city, setCity] = useState<string | null>(null);
	const [date, setDate] = useState<Date | undefined>(new Date());

	return (
		<ShowcaseGroup id="group-form" title="Form">
			<ShowcaseSection
				id="input"
				title="Input"
				description="Ô nhập liệu một dòng, hỗ trợ mọi type của thẻ input."
			>
				<Row>
					<Input placeholder="Nhập họ và tên" className="w-56" />
					<Input type="password" defaultValue="matkhau" className="w-40" />
					<Input placeholder="Đang khoá" disabled className="w-40" />
					<Input placeholder="Email không hợp lệ" aria-invalid className="w-48" />
				</Row>
			</ShowcaseSection>

			<ShowcaseSection id="textarea" title="Textarea" description="Ô nhập liệu nhiều dòng.">
				<Row className="items-start">
					<Textarea placeholder="Nhập nội dung ghi chú" className="w-64" />
					<Textarea placeholder="Đang khoá" disabled className="w-48" />
					<Textarea placeholder="Nội dung chưa hợp lệ" aria-invalid className="w-48" />
				</Row>
			</ShowcaseSection>

			<ShowcaseSection id="label" title="Label" description="Nhãn gắn với một control qua thuộc tính htmlFor.">
				<div className="gap-2 flex flex-col">
					<Label htmlFor="showcase-label-input">Số điện thoại</Label>
					<Input id="showcase-label-input" placeholder="09xx xxx xxx" className="w-56" />
				</div>
			</ShowcaseSection>

			<ShowcaseSection
				id="field"
				title="Field"
				description="Bố cục chuẩn cho một trường: nhãn, mô tả và thông báo lỗi."
			>
				<FieldGroup className="max-w-sm">
					<Field>
						<FieldLabel htmlFor="showcase-field-email">Email</FieldLabel>
						<Input id="showcase-field-email" placeholder="ten@congty.vn" />
						<FieldDescription>Dùng để nhận thông báo về đơn hàng.</FieldDescription>
					</Field>
					<Field data-invalid="true">
						<FieldLabel htmlFor="showcase-field-tax">Mã số thuế</FieldLabel>
						<Input id="showcase-field-tax" defaultValue="123" aria-invalid />
						<FieldError>Mã số thuế phải có 10 hoặc 13 chữ số.</FieldError>
					</Field>
					<Field orientation="horizontal">
						<Switch id="showcase-field-switch" defaultChecked />
						<FieldLabel htmlFor="showcase-field-switch">Nhận bản tin hàng tuần</FieldLabel>
					</Field>
				</FieldGroup>
			</ShowcaseSection>

			<ShowcaseSection id="checkbox" title="Checkbox" description="Ô chọn nhiều, có trạng thái khoá và lỗi.">
				<Row className="gap-6">
					<div className="gap-2 flex items-center">
						<Checkbox
							id="cb-1"
							checked={checked}
							onCheckedChange={(value: boolean | 'indeterminate') => setChecked(value === true)}
						/>
						<Label htmlFor="cb-1">Đồng ý điều khoản</Label>
					</div>
					<div className="gap-2 flex items-center">
						<Checkbox id="cb-2" disabled />
						<Label htmlFor="cb-2">Đang khoá</Label>
					</div>
					<div className="gap-2 flex items-center">
						<Checkbox id="cb-3" disabled checked />
						<Label htmlFor="cb-3">Khoá và đã chọn</Label>
					</div>
					<div className="gap-2 flex items-center">
						<Checkbox id="cb-4" aria-invalid />
						<Label htmlFor="cb-4">Bắt buộc chọn</Label>
					</div>
				</Row>
			</ShowcaseSection>

			<ShowcaseSection id="radio-group" title="Radio Group" description="Chọn một giá trị trong nhóm.">
				<RadioGroup value={radio} onValueChange={setRadio} className="gap-3 flex flex-col">
					<div className="gap-2 flex items-center">
						<RadioGroupItem value="ca-nhan" id="rd-1" />
						<Label htmlFor="rd-1">Khách hàng cá nhân</Label>
					</div>
					<div className="gap-2 flex items-center">
						<RadioGroupItem value="doanh-nghiep" id="rd-2" />
						<Label htmlFor="rd-2">Khách hàng doanh nghiệp</Label>
					</div>
					<div className="gap-2 flex items-center">
						<RadioGroupItem value="dai-ly" id="rd-3" disabled />
						<Label htmlFor="rd-3">Đại lý (đang khoá)</Label>
					</div>
				</RadioGroup>
			</ShowcaseSection>

			<ShowcaseSection id="select" title="Select" description="Danh sách chọn tuỳ biến, có portal và bàn phím.">
				<Row>
					<Select value={selectValue} onValueChange={setSelectValue}>
						<SelectTrigger className="w-56">
							<SelectValue placeholder="Chọn tỉnh / thành phố" />
						</SelectTrigger>
						<SelectContent>
							{TINH_THANH.map((item) => (
								<SelectItem key={item} value={item}>
									{item}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<Select disabled>
						<SelectTrigger className="w-40">
							<SelectValue placeholder="Đang khoá" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="none">Không có</SelectItem>
						</SelectContent>
					</Select>
				</Row>
			</ShowcaseSection>

			<ShowcaseSection
				id="native-select"
				title="Native Select"
				description="Dùng thẻ select gốc của trình duyệt, hợp với form dài và mobile."
			>
				<Row>
					<NativeSelect defaultValue="Hà Nội">
						{TINH_THANH.map((item) => (
							<NativeSelectOption key={item} value={item}>
								{item}
							</NativeSelectOption>
						))}
					</NativeSelect>
					<NativeSelect size="sm" defaultValue="Đà Nẵng">
						{TINH_THANH.map((item) => (
							<NativeSelectOption key={item} value={item}>
								{item}
							</NativeSelectOption>
						))}
					</NativeSelect>
					<NativeSelect disabled defaultValue="Cần Thơ">
						<NativeSelectOption value="Cần Thơ">Cần Thơ</NativeSelectOption>
					</NativeSelect>
				</Row>
			</ShowcaseSection>

			<ShowcaseSection id="switch" title="Switch" description="Công tắc bật / tắt, có hai kích thước.">
				<Row className="gap-6">
					<div className="gap-2 flex items-center">
						<Switch id="sw-1" checked={switchOn} onCheckedChange={setSwitchOn} />
						<Label htmlFor="sw-1">Nhận thông báo</Label>
					</div>
					<div className="gap-2 flex items-center">
						<Switch id="sw-2" size="sm" defaultChecked />
						<Label htmlFor="sw-2">Kích thước nhỏ</Label>
					</div>
					<div className="gap-2 flex items-center">
						<Switch id="sw-3" disabled />
						<Label htmlFor="sw-3">Đang khoá</Label>
					</div>
				</Row>
			</ShowcaseSection>

			<ShowcaseSection id="slider" title="Slider" description="Thanh trượt chọn một giá trị hoặc một khoảng.">
				<div className="max-w-sm gap-6 flex flex-col">
					<div className="gap-2 flex flex-col">
						<Label>Mức âm lượng: {slider[0]}%</Label>
						<Slider value={slider} onValueChange={setSlider} max={100} step={1} />
					</div>
					<div className="gap-2 flex flex-col">
						<Label>
							Khoảng giá: {range[0]} - {range[1]}
						</Label>
						<Slider value={range} onValueChange={setRange} max={100} step={5} />
					</div>
					<div className="gap-2 flex flex-col">
						<Label className="text-muted-foreground">Đang khoá</Label>
						<Slider defaultValue={[30]} max={100} disabled />
					</div>
				</div>
			</ShowcaseSection>

			<ShowcaseSection id="input-otp" title="Input OTP" description="Ô nhập mã xác thực, tự nhảy ô khi gõ.">
				<div className="gap-3 flex flex-col">
					<InputOTP maxLength={6} value={otp} onChange={setOtp}>
						<InputOTPGroup>
							<InputOTPSlot index={0} />
							<InputOTPSlot index={1} />
							<InputOTPSlot index={2} />
						</InputOTPGroup>
						<InputOTPSeparator />
						<InputOTPGroup>
							<InputOTPSlot index={3} />
							<InputOTPSlot index={4} />
							<InputOTPSlot index={5} />
						</InputOTPGroup>
					</InputOTP>
					<p className="text-sm text-muted-foreground">Đã nhập: {otp || 'chưa có'}</p>
				</div>
			</ShowcaseSection>

			<ShowcaseSection
				id="input-group"
				title="Input Group"
				description="Ghép input với icon, chữ hoặc nút ở hai đầu."
			>
				<div className="max-w-sm gap-3 flex flex-col">
					<InputGroup>
						<InputGroupAddon align="inline-start">
							<SearchIcon />
						</InputGroupAddon>
						<InputGroupInput placeholder="Tìm kiếm sản phẩm" />
					</InputGroup>
					<InputGroup>
						<InputGroupInput placeholder="0" inputMode="numeric" />
						<InputGroupAddon align="inline-end">
							<InputGroupText>VNĐ</InputGroupText>
						</InputGroupAddon>
					</InputGroup>
					<InputGroup>
						<InputGroupInput placeholder="Mã giảm giá" />
						<InputGroupAddon align="inline-end">
							<InputGroupButton variant="outline">Áp dụng</InputGroupButton>
						</InputGroupAddon>
					</InputGroup>
				</div>
			</ShowcaseSection>

			<ShowcaseSection
				id="number-input"
				title="Number Input"
				description="Ô nhập số tự chèn dấu phân cách hàng nghìn, trả về chuỗi thô."
			>
				<div className="max-w-sm gap-2 flex flex-col">
					<Label htmlFor="ni-1">Số tiền</Label>
					<NumberInput id="ni-1" value={amount} onChange={setAmount} placeholder="0" />
					<p className="text-sm text-muted-foreground">Giá trị thô: {amount || 'trống'}</p>
				</div>
			</ShowcaseSection>

			<ShowcaseSection
				id="combobox"
				title="Combobox"
				description="Ô nhập có gợi ý, lọc danh sách theo từ khoá đang gõ."
			>
				<div className="max-w-sm gap-2 flex flex-col">
					<Combobox items={TINH_THANH} value={city} onValueChange={setCity}>
						<ComboboxInput placeholder="Chọn tỉnh / thành phố" />
						<ComboboxContent>
							<ComboboxEmpty>Không tìm thấy kết quả.</ComboboxEmpty>
							<ComboboxList>
								{TINH_THANH.map((item) => (
									<ComboboxItem key={item} value={item}>
										{item}
									</ComboboxItem>
								))}
							</ComboboxList>
						</ComboboxContent>
					</Combobox>
					<p className="text-sm text-muted-foreground">Đã chọn: {city ?? 'chưa có'}</p>
				</div>
			</ShowcaseSection>

			<ShowcaseSection id="calendar" title="Calendar" description="Lịch chọn ngày, dựng trên react-day-picker.">
				<Row className="items-start">
					<Calendar
						mode="single"
						selected={date}
						onSelect={setDate}
						className="rounded-lg border border-border"
					/>
					<Calendar
						mode="single"
						captionLayout="dropdown"
						selected={date}
						onSelect={setDate}
						className="rounded-lg border border-border"
					/>
				</Row>
			</ShowcaseSection>
		</ShowcaseGroup>
	);
}
