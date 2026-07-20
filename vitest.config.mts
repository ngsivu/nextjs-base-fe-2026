import react from '@vitejs/plugin-react';
import { defaultExclude, defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [react()],
	resolve: {
		tsconfigPaths: true,
	},
	test: {
		environment: 'jsdom',
		globals: true,
		setupFiles: ['./vitest.setup.ts'],
		// PHẢI trải defaultExclude. Nếu chỉ viết exclude: ['node_modules', 'e2e']
		// thì mất toàn bộ default và Vitest KHÔNG tìm thấy file test nào —
		// `pnpm test` sẽ báo "No test files found" dù test có tồn tại.
		exclude: [...defaultExclude, 'e2e/**'],
	},
});
