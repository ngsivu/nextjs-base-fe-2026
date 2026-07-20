import type { NavGroup } from '@/components/showcase/ShowcaseNav';

/**
 * Danh sách điều hướng của gallery.
 *
 * `id` phải trùng `id` của ShowcaseSection tương ứng và trùng tên file
 * trong `src/components/ui/` — nhờ vậy anchor và mốc cuộn luôn khớp nhau.
 */
export const NAV_GROUPS: NavGroup[] = [
	{
		id: 'group-action',
		title: 'Hành động',
		items: [
			{ id: 'button', label: 'button' },
			{ id: 'button-group', label: 'button-group' },
			{ id: 'toggle', label: 'toggle' },
			{ id: 'toggle-group', label: 'toggle-group' },
		],
	},
	{
		id: 'group-form',
		title: 'Form',
		items: [
			{ id: 'input', label: 'input' },
			{ id: 'textarea', label: 'textarea' },
			{ id: 'label', label: 'label' },
			{ id: 'field', label: 'field' },
			{ id: 'checkbox', label: 'checkbox' },
			{ id: 'radio-group', label: 'radio-group' },
			{ id: 'select', label: 'select' },
			{ id: 'native-select', label: 'native-select' },
			{ id: 'switch', label: 'switch' },
			{ id: 'slider', label: 'slider' },
			{ id: 'input-otp', label: 'input-otp' },
			{ id: 'input-group', label: 'input-group' },
			{ id: 'number-input', label: 'number-input' },
			{ id: 'combobox', label: 'combobox' },
			{ id: 'calendar', label: 'calendar' },
		],
	},
	{
		id: 'group-overlay',
		title: 'Overlay & Menu',
		items: [
			{ id: 'dialog', label: 'dialog' },
			{ id: 'alert-dialog', label: 'alert-dialog' },
			{ id: 'sheet', label: 'sheet' },
			{ id: 'drawer', label: 'drawer' },
			{ id: 'popover', label: 'popover' },
			{ id: 'hover-card', label: 'hover-card' },
			{ id: 'tooltip', label: 'tooltip' },
			{ id: 'dropdown-menu', label: 'dropdown-menu' },
			{ id: 'context-menu', label: 'context-menu' },
			{ id: 'menubar', label: 'menubar' },
			{ id: 'command', label: 'command' },
		],
	},
	{
		id: 'group-data',
		title: 'Hiển thị & Phản hồi',
		items: [
			{ id: 'table', label: 'table' },
			{ id: 'card', label: 'card' },
			{ id: 'badge', label: 'badge' },
			{ id: 'avatar', label: 'avatar' },
			{ id: 'item', label: 'item' },
			{ id: 'empty', label: 'empty' },
			{ id: 'aspect-ratio', label: 'aspect-ratio' },
			{ id: 'carousel', label: 'carousel' },
			{ id: 'chart', label: 'chart' },
			{ id: 'alert', label: 'alert' },
			{ id: 'sonner', label: 'sonner' },
			{ id: 'progress', label: 'progress' },
			{ id: 'skeleton', label: 'skeleton' },
			{ id: 'spinner', label: 'spinner' },
			{ id: 'kbd', label: 'kbd' },
		],
	},
	{
		id: 'group-nav',
		title: 'Điều hướng',
		items: [
			{ id: 'tabs', label: 'tabs' },
			{ id: 'breadcrumb', label: 'breadcrumb' },
			{ id: 'navigation-menu', label: 'navigation-menu' },
			{ id: 'pagination', label: 'pagination' },
			{ id: 'sidebar', label: 'sidebar' },
		],
	},
	{
		id: 'group-layout',
		title: 'Bố cục',
		items: [
			{ id: 'accordion', label: 'accordion' },
			{ id: 'collapsible', label: 'collapsible' },
			{ id: 'separator', label: 'separator' },
			{ id: 'scroll-area', label: 'scroll-area' },
			{ id: 'resizable', label: 'resizable' },
		],
	},
	{
		id: 'group-misc',
		title: 'Khác',
		items: [
			{ id: 'form', label: 'form' },
			{ id: 'bubble', label: 'bubble' },
			{ id: 'message', label: 'message' },
			{ id: 'message-scroller', label: 'message-scroller' },
			{ id: 'attachment', label: 'attachment' },
			{ id: 'marker', label: 'marker' },
			{ id: 'direction', label: 'direction' },
		],
	},
];
