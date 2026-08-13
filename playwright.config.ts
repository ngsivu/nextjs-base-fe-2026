import { defineConfig, devices } from '@playwright/test';

// Hai chế độ chạy:
//
// `pnpm test:e2e`       — Playwright tự khởi một dev server riêng ở port 3010.
//   Sạch và độc lập, nhưng Next chỉ cho MỘT dev server mỗi THƯ MỤC nên phải
//   tắt `pnpm dev` của repo này trước, đổi port không giúp gì.
//
// `pnpm test:e2e:reuse` — chạy vào server đang chạy sẵn, không tự khởi gì cả.
//   Không vướng khoá thư mục và nhanh hơn nhiều, nhưng test đúng trạng thái của
//   server đó: server chạy với node_modules cũ sẽ cho kết quả fail sai lệch.
//   Mặc định port 3000 (port của `pnpm dev`), đổi bằng E2E_PORT.
const E2E_REUSE = process.env.E2E_REUSE === '1';
const E2E_PORT = Number(process.env.E2E_PORT ?? (E2E_REUSE ? 3000 : 3010));
const E2E_URL = `http://localhost:${E2E_PORT}`;

export default defineConfig({
	testDir: './e2e',
	fullyParallel: true,
	forbidOnly: Boolean(process.env.CI),
	retries: process.env.CI ? 2 : 0,
	reporter: 'list',
	// Dev server compile route theo yêu cầu (Turbopack), lần đầu chạm một route
	// có thể mất vài giây. Timeout mặc định 5s của expect quá ngắn.
	timeout: 60_000,
	expect: { timeout: 15_000 },
	use: {
		baseURL: E2E_URL,
		trace: 'on-first-retry',
	},
	projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
	webServer: E2E_REUSE
		? undefined
		: {
				command: `env-cmd -f .env.dev next dev -p ${E2E_PORT}`,
				url: E2E_URL,
				// false: luôn tự khởi server riêng, không tái dùng server lạ ở cùng port
				reuseExistingServer: false,
				timeout: 120_000,
			},
});
