import { expect, test } from '@playwright/test';

test.describe('Trang chủ', () => {
	test('render được hero và các mục chính', async ({ page }) => {
		await page.goto('/');

		await expect(page.getByRole('heading', { name: 'Base FE', level: 1 })).toBeVisible();
		await expect(page.getByRole('link', { name: 'Xem components' })).toBeVisible();
	});
});

test.describe('Component gallery', () => {
	test('mở ở đầu trang, không tự cuộn xuống', async ({ page }) => {
		await page.goto('/components');
		await expect(page.getByRole('heading', { name: 'Components', level: 1 })).toBeVisible();
		expect(await page.evaluate(() => window.scrollY)).toBe(0);
	});

	test('sidebar lọc được component theo tên', async ({ page }) => {
		await page.goto('/components');

		const nav = page.getByRole('navigation');
		await expect(nav.getByRole('link', { name: 'button', exact: true })).toBeVisible();

		await page.getByLabel('Tìm component').fill('dialog');
		await expect(nav.getByRole('link', { name: 'dialog', exact: true })).toBeVisible();
		await expect(nav.getByRole('link', { name: 'button', exact: true })).toBeHidden();
	});

	test('bấm mục ở sidebar thì nhảy tới đúng component', async ({ page }) => {
		await page.goto('/components');

		await page.getByRole('navigation').getByRole('link', { name: 'table', exact: true }).click();
		await expect(page).toHaveURL(/#table$/);
		await expect(page.locator('#table')).toBeInViewport();
	});
});
