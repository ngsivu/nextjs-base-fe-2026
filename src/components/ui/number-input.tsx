'use client';

import { NumericFormat, type NumericFormatProps } from 'react-number-format';
import { DECIMAL_SEPARATOR, THOUSAND_SEPARATOR } from '@/constants';
import { Input } from '@/components/ui/input';

// 'onChange' PHẢI nằm trong Omit. Thiếu nó thì kiểu cuối cùng là giao của
// (value: string) => void và ChangeEventHandler<HTMLInputElement>, khiến
// onChange={setValue} không compile được dù runtime vẫn chạy đúng.
type Props = Omit<NumericFormatProps, 'value' | 'onChange' | 'onValueChange' | 'customInput'> & {
	/** Giá trị thô, không có dấu phân cách. Dùng string để không mất chính xác với số lớn. */
	value: string;
	/** Trả về giá trị thô (vd '1234567'), không phải chuỗi đã định dạng. */
	onChange: (value: string) => void;
};

/**
 * Ô nhập số có tự chèn dấu phân cách hàng nghìn khi gõ.
 *
 * Nhận và trả về **string thô** thay vì number: số tiền lớn vượt
 * Number.MAX_SAFE_INTEGER sẽ mất chính xác nếu đi qua kiểu number.
 * Ghép thẳng vào react-hook-form được vì field cũng là string.
 */
export function NumberInput({ value, onChange, ...props }: Props) {
	return (
		<NumericFormat
			customInput={Input}
			value={value}
			onValueChange={(values) => onChange(values.value)}
			thousandSeparator={THOUSAND_SEPARATOR}
			decimalSeparator={DECIMAL_SEPARATOR}
			allowNegative={false}
			{...props}
		/>
	);
}
