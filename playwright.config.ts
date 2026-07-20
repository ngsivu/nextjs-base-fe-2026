import { defineConfig, devices } from '@playwright/test';

// E2E chạy trên port riêng 3001 để không đụng port 3000 của dự án khác.
const E2E_PORT = 3001;
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
	webServer: {
		command: `env-cmd -f .env.dev next dev -p ${E2E_PORT}`,
		url: E2E_URL,
		// false: luôn tự khởi server riêng, không tái dùng server lạ ở cùng port
		reuseExistingServer: false,
		timeout: 120_000,
	},
});
