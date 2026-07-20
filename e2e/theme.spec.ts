import { expect, test } from '@playwright/test';

test.describe('Dark mode', () => {
	test('chuyển được giữa sáng và tối', async ({ page }) => {
		await page.goto('/');

		const html = page.locator('html');
		await page.getByRole('button', { name: 'Chuyển chế độ sáng tối' }).click();
		await expect(html).toHaveClass(/dark/);

		await page.getByRole('button', { name: 'Chuyển chế độ sáng tối' }).click();
		await expect(html).not.toHaveClass(/dark/);
	});

	test('giữ nguyên theme sau khi reload, không có lỗi hydration', async ({ page }) => {
		const consoleErrors: string[] = [];
		page.on('console', (message) => {
			if (message.type() === 'error') consoleErrors.push(message.text());
		});

		await page.goto('/');
		await page.getByRole('button', { name: 'Chuyển chế độ sáng tối' }).click();
		await expect(page.locator('html')).toHaveClass(/dark/);

		await page.reload();

		await expect(page.locator('html')).toHaveClass(/dark/);

		const hydrationErrors = consoleErrors.filter(
			(text) => text.includes('hydration') || text.includes('did not match'),
		);
		expect(hydrationErrors).toEqual([]);
	});
});
