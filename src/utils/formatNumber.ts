import BigNumber from '@/lib/bignumber';
import { DEFAULT_LOCALE, DECIMAL_SEPARATOR, THOUSAND_SEPARATOR } from '@/constants/format';

export type FormatNumberOptions = {
	/** Số chữ số thập phân tối đa. Mặc định 2. */
	decimals?: number;
	/** Luôn hiện đủ số chữ số thập phân (1000 → "1.000,00"). Mặc định false. */
	fixedDecimals?: boolean;
	/** Chuỗi trả về khi giá trị không hợp lệ. Mặc định ''. */
	fallback?: string;
	/** Hậu tố, ví dụ ' đ' hoặc '%'. */
	suffix?: string;
	/** Tiền tố, ví dụ '$'. */
	prefix?: string;
};

/**
 * Định dạng số dùng BigNumber.js — tránh sai số dấu phẩy động của JS.
 *
 * Lý do không dùng Number/toLocaleString trực tiếp: `0.1 + 0.2 !== 0.3`, và
 * số lớn quá Number.MAX_SAFE_INTEGER sẽ mất chính xác. BigNumber giữ đúng
 * giá trị, đặc biệt quan trọng với tiền tệ.
 *
 * @example
 * formatNumber(1234567.891)                    // '1.234.567,89'
 * formatNumber('9007199254740993')             // '9.007.199.254.740.993'
 * formatNumber(1000, { fixedDecimals: true })  // '1.000,00'
 * formatNumber(0.1 + 0.2, { decimals: 2 })     // '0,3'
 * formatNumber(50000, { suffix: ' đ' })        // '50.000 đ'
 * formatNumber(null, { fallback: '—' })        // '—'
 */
export function formatNumber(value: BigNumber.Value | null | undefined, options: FormatNumberOptions = {}): string {
	const { decimals = 2, fixedDecimals = false, fallback = '', suffix = '', prefix = '' } = options;

	if (value === null || value === undefined || value === '') return fallback;

	// BigNumber NÉM lỗi (không trả NaN) với chuỗi không parse được, ví dụ 'abc'.
	// Không bắt ở đây thì một giá trị bẩn từ API đủ làm crash cả trang.
	let amount: BigNumber;
	try {
		amount = new BigNumber(value);
	} catch {
		return fallback;
	}

	if (!amount.isFinite()) return fallback;

	const format = {
		decimalSeparator: DECIMAL_SEPARATOR,
		groupSeparator: THOUSAND_SEPARATOR,
		groupSize: 3,
	};

	// toFormat(dp) luôn hiện đủ dp chữ số; muốn cắt số 0 thừa thì
	// làm tròn trước rồi để BigNumber tự quyết số chữ số thực tế.
	const formatted = fixedDecimals
		? amount.toFormat(decimals, BigNumber.ROUND_HALF_UP, format)
		: amount.decimalPlaces(decimals, BigNumber.ROUND_HALF_UP).toFormat(format);

	return `${prefix}${formatted}${suffix}`;
}

/**
 * Định dạng tiền tệ. Mặc định VND — không có phần thập phân.
 *
 * @example
 * formatCurrency(1500000)  // '1.500.000 ₫'
 */
export function formatCurrency(
	value: BigNumber.Value | null | undefined,
	options: FormatNumberOptions & { currency?: string } = {},
): string {
	const { currency = '₫', decimals = 0, ...rest } = options;
	return formatNumber(value, { ...rest, decimals, suffix: ` ${currency}` });
}

/**
 * Chuyển chuỗi người dùng nhập (đã có dấu phân cách) về BigNumber.
 * Dùng khi đọc lại giá trị từ input đã định dạng.
 *
 * @example
 * parseNumber('1.234.567,89')  // BigNumber(1234567.89)
 */
export function parseNumber(value: string | null | undefined): BigNumber {
	if (!value) return new BigNumber(NaN);

	const normalized = value
		.split(THOUSAND_SEPARATOR)
		.join('')
		.replace(DECIMAL_SEPARATOR, '.')
		.replace(/[^\d.-]/g, '');

	try {
		return new BigNumber(normalized);
	} catch {
		return new BigNumber(Number.NaN);
	}
}

export { DEFAULT_LOCALE };
