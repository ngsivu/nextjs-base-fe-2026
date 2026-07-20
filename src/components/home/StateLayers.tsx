const LAYERS = [
	{
		name: 'Server state',
		lib: 'TanStack Query',
		holds: 'Dữ liệu đến từ API',
		detail: 'Cache, retry, invalidate. Không nhân bản vào useState.',
	},
	{
		name: 'URL state',
		lib: 'nuqs',
		holds: 'Filter, pagination, tab',
		detail: 'Reload không mất, gửi link cho đồng nghiệp là họ thấy đúng màn hình đó.',
	},
	{
		name: 'Client state',
		lib: 'Zustand',
		holds: 'Phần còn lại',
		detail: 'appStore mất khi reload, localStore giữ lại. Hỏi "reload xong còn cần không?" để chọn.',
	},
];

/**
 * Ba tầng state — thứ phân biệt base này với một starter chỉ gom sẵn thư viện.
 * Trình bày ngang hàng để thấy rõ ranh giới, không đánh số vì chúng không theo thứ tự.
 */
export function StateLayers() {
	return (
		<div className="lg:grid-cols-3 lg:divide-x lg:divide-y-0 grid divide-y divide-border rounded-lg border border-border">
			{LAYERS.map((layer) => (
				<div key={layer.name} className="p-6">
					<div className="gap-3 flex items-baseline justify-between">
						<h3 className="font-medium">{layer.name}</h3>
						<span className="text-xs font-mono text-muted-foreground">{layer.lib}</span>
					</div>
					<p className="mt-4 text-sm text-primary">{layer.holds}</p>
					<p className="mt-2 text-sm leading-6 text-muted-foreground">{layer.detail}</p>
				</div>
			))}
		</div>
	);
}
