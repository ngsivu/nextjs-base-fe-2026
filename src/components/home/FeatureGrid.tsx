const FEATURES = [
	{
		title: 'HTTP layer',
		body: 'Một instance ky duy nhất. Đổi backend hay cách xác thực chỉ sửa một file. Lỗi chuẩn hoá thành ApiError.',
		libs: 'ky · ApiError',
	},
	{
		title: 'State management',
		body: 'Ba tầng tách bạch để không còn cảnh dữ liệu server nằm lẫn trong useState.',
		libs: 'TanStack Query · nuqs · Zustand',
	},
	{
		title: 'Form',
		body: 'Schema dùng chung cho validate client và suy ra type. Lỗi 422 từ server map thẳng vào field.',
		libs: 'React Hook Form · Zod',
	},
	{
		title: 'UI',
		body: '62 component nằm sẵn trong repo, sửa trực tiếp được. Design token dùng chung cho light và dark.',
		libs: 'shadcn/ui · Radix · Tailwind 4',
	},
	{
		title: 'Number & Currency',
		body: 'Tính tiền không sai số. Số vượt MAX_SAFE_INTEGER vẫn giữ nguyên giá trị, không rơi về ký hiệu mũ.',
		libs: 'BigNumber.js · react-number-format',
	},
	{
		title: 'Testing',
		body: 'Unit, component và E2E đã cấu hình xong. E2E chạy port riêng nên không đụng dev server.',
		libs: 'Vitest · Testing Library · Playwright',
	},
];

export function FeatureGrid() {
	return (
		<div className="gap-4 sm:grid-cols-2 lg:grid-cols-3 grid">
			{FEATURES.map((feature) => (
				<article key={feature.title} className="p-6 rounded-lg border border-border bg-card">
					<h3 className="font-medium text-[22px] tracking-[-0.4px]">{feature.title}</h3>
					<p className="mt-3 text-sm leading-6 text-muted-foreground">{feature.body}</p>
					<p className="mt-4 text-xs font-mono text-muted-foreground">{feature.libs}</p>
				</article>
			))}
		</div>
	);
}
