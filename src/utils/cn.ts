import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/**
 * Token cỡ chữ tự đặt trong `globals.scss`.
 *
 * BẮT BUỘC khai ở đây. tailwind-merge chỉ biết thang mặc định (xs, sm, base…),
 * gặp `text-caption` nó đoán đó là MÀU chữ nên khi gộp với `text-muted-foreground`
 * nó xoá luôn cỡ chữ - class biến mất khỏi DOM và phần tử rơi về 16px mặc định.
 * Lỗi này không được typecheck hay lint bắt, chỉ lộ ra khi đo trên trình duyệt.
 *
 * Thêm token cỡ chữ mới vào `globals.scss` thì nhớ thêm vào đây.
 */
const FONT_SIZE_TOKENS = [
	'display-lg',
	'display-md',
	'headline',
	'section',
	'title',
	'body-lg',
	'body',
	'caption',
	'eyebrow',
];

const twMerge = extendTailwindMerge({
	extend: {
		classGroups: {
			'font-size': [{ text: FONT_SIZE_TOKENS }],
		},
	},
});

/** Gộp class Tailwind, class sau ghi đè class trước khi trùng nhóm. */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
