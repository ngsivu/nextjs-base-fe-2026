import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const eslintConfig = defineConfig([
	...nextVitals,
	...nextTs,
	globalIgnores([
		// Default ignores của eslint-config-next:
		'.next/**',
		'out/**',
		'build/**',
		'next-env.d.ts',
	]),
	{
		// Component do shadcn CLI sinh ra: mình không maintain, và mọi sửa tay
		// sẽ bị ghi đè ở lần `shadcn add` tiếp theo. Một số file (vd carousel)
		// dùng pattern setState-trong-effect mà React Compiler cảnh báo —
		// tắt riêng rule đó ở đây thay vì sửa upstream.
		files: ['src/components/ui/**'],
		rules: {
			'react-hooks/set-state-in-effect': 'off',
		},
	},
	{
		// Rule tắt theo quy ước của team
		rules: {
			'react-hooks/exhaustive-deps': 'off',
			'import/no-anonymous-default-export': 'off',
			'@typescript-eslint/no-unused-vars': 'off',
			'@typescript-eslint/no-explicit-any': 'off',
			'@next/next/no-img-element': 'off',
			'jsx-a11y/alt-text': 'off',
			// Cảnh báo khi dùng thư viện trả về function không memo hoá an toàn được
			// (vd useReactTable của TanStack Table). Đã xử lý đúng cách bằng directive
			// 'use no memo' trong component, nên warning này chỉ còn gây nhiễu.
			'react-hooks/incompatible-library': 'off',
		},
	},
]);

export default eslintConfig;
