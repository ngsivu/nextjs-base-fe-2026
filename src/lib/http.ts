import ky, { HTTPError } from 'ky';
import { toApiError } from '@/lib/apiError';

export const http = ky.create({
	prefix: process.env.NEXT_PUBLIC_API_URL,
	timeout: 30_000,
	retry: {
		limit: 2,
		methods: ['get'],
		statusCodes: [408, 429, 500, 502, 503, 504],
	},
	hooks: {
		beforeRequest: [
			({ request }) => {
				// Chỗ gắn token khi làm auth (spec mục 9).
				// Chưa triển khai vì base này không bao gồm auth.
				request.headers.set('Accept', 'application/json');
			},
		],
		beforeError: [
			({ error }) => {
				if (!(error instanceof HTTPError)) return error;

				// ky 2.0 tự parse body lỗi vào error.data và đã consume stream —
				// response.json() sẽ KHÔNG hoạt động, bắt buộc dùng error.data.
				return toApiError(error.response.status, error.data);
			},
		],
	},
});
