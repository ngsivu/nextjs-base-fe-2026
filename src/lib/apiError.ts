const DEFAULT_MESSAGE = 'Đã có lỗi xảy ra, vui lòng thử lại.';

const CODE_BY_STATUS: Record<number, string> = {
	400: 'BAD_REQUEST',
	401: 'UNAUTHORIZED',
	403: 'FORBIDDEN',
	404: 'NOT_FOUND',
	409: 'CONFLICT',
	422: 'VALIDATION_FAILED',
	429: 'TOO_MANY_REQUESTS',
};

export class ApiError extends Error {
	readonly status: number;
	readonly code: string;
	readonly details?: unknown;

	constructor(status: number, code: string, message: string, details?: unknown) {
		super(message);
		this.name = 'ApiError';
		this.status = status;
		this.code = code;
		this.details = details;
	}
}

function defaultCode(status: number): string {
	if (CODE_BY_STATUS[status]) return CODE_BY_STATUS[status];
	if (status >= 500) return 'SERVER_ERROR';
	return 'UNKNOWN';
}

export function toApiError(status: number, body: unknown): ApiError {
	const payload = typeof body === 'object' && body !== null ? (body as Record<string, unknown>) : {};

	const code = typeof payload.code === 'string' ? payload.code : defaultCode(status);
	const message = typeof payload.message === 'string' ? payload.message : DEFAULT_MESSAGE;

	return new ApiError(status, code, message, payload.details);
}
