<div align="center">

# Base FE

**Next.js starter dùng lại cho dự án mới.**

[![Next.js](https://img.shields.io/badge/Next.js-16.2-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.3-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-62%20components-000000)](https://ui.shadcn.com)

</div>

---

Bộ khung sẵn sàng để bắt tay viết tính năng ngay:

- **HTTP layer** — một instance `ky` duy nhất, lỗi chuẩn hoá thành `ApiError`
- **State management** — TanStack Query cho server state, nuqs cho URL state, Zustand cho client state
- **Form** — React Hook Form + Zod, lỗi từ server map thẳng vào field
- **UI** — 62 component shadcn/ui, design token có sẵn light/dark mode
- **Number & Currency** — BigNumber.js, không lo sai số khi tính tiền
- **Testing** — Vitest, Testing Library, Playwright đã cấu hình xong

Trỏ `NEXT_PUBLIC_API_URL` sang API của bạn là chạy được.

## Mục lục

- [Requirements](#requirements)
- [Quick Start](#quick-start)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [Conventions](#conventions)
- [Thêm một feature mới](#thêm-một-feature-mới)
- [Number & Currency](#number--currency)
- [Styling](#styling)
- [Testing](#testing)
- [Version constraints](#version-constraints)
- [Tài liệu thêm](#tài-liệu-thêm)

## Requirements

|         | Version     |
| ------- | ----------- |
| Node.js | `>= 20.9.0` |
| pnpm    | `10.x`      |

Dự án dùng **pnpm**. Cài bằng `npm` hay `yarn` sẽ sinh lockfile khác và dễ phát sinh lỗi do cấu trúc `node_modules` không giống nhau.

```bash
corepack enable   # nếu máy chưa có pnpm
```

## Quick Start

```bash
git clone https://github.com/ngsivu/nextjs-base-fe-2026.git
cd nextjs-base-fe-2026
pnpm install
pnpm dev
```

Mở <http://localhost:3000>.

Hai trang có sẵn:

| Route | Minh hoạ                    |
| ----- | --------------------------- |
| `/`   | Trang chủ, toggle dark mode |

## Environment Variables

Env nạp qua [env-cmd](https://github.com/toddbluhm/env-cmd) thay cho cơ chế `.env.local` mặc định của Next, để chọn file theo từng môi trường.

| Script               | Đọc file          |
| -------------------- | ----------------- |
| `pnpm dev`           | `.env.dev`        |
| `pnpm dev:local`     | `.env`            |
| `pnpm build`         | `.env.production` |
| `pnpm build:dev`     | `.env.dev`        |
| `pnpm build:staging` | `.env.staging`    |

Muốn thêm môi trường, tạo `.env.<tên>` rồi khai báo script tương ứng trong `package.json`. Trong code, đọc biến bằng `process.env.NEXT_PUBLIC_*`.

> [!WARNING]
> Repo này public, các file `.env.*` được commit chỉ chứa URL placeholder. Khi điền địa chỉ hạ tầng thật, dùng `.env` hoặc `.env.local` — hai file này đã được ignore. Git lưu toàn bộ lịch sử, nên đã commit rồi thì xoá ở commit sau vẫn xem lại được.

## Scripts

```bash
pnpm dev              # dev server, port 3000
pnpm build            # production build
pnpm start            # chạy bản đã build

pnpm typecheck        # tsc --noEmit
pnpm lint             # eslint
pnpm format           # prettier --write
pnpm format:check     # kiểm tra, không sửa

pnpm test             # vitest
pnpm test:watch
pnpm test:e2e         # playwright, tự khởi server riêng ở port 3001
pnpm test:e2e:ui
```

## Tech Stack

### Core

| Library                                      | Ver  | Vai trò                                                              |
| -------------------------------------------- | ---- | -------------------------------------------------------------------- |
| [Next.js](https://nextjs.org)                | 16.2 | App Router, React Server Components                                  |
| [React](https://react.dev)                   | 19.2 |                                                                      |
| [TypeScript](https://www.typescriptlang.org) | 5.9  | Bật `strict`                                                         |
| React Compiler                               | 1.0  | Auto-memoization, thay cho phần lớn `useMemo`/`useCallback` viết tay |

### UI

| Library                                                   | Ver   | Vai trò                                                             |
| --------------------------------------------------------- | ----- | ------------------------------------------------------------------- |
| [Tailwind CSS](https://tailwindcss.com)                   | 4.3   | Design token khai báo bằng `@theme`, không còn `tailwind.config.ts` |
| [shadcn/ui](https://ui.shadcn.com)                        | 4.13  | 62 component nằm trong `src/components/ui/`, sửa trực tiếp được     |
| [Radix UI](https://www.radix-ui.com)                      | 1.6   | Headless primitive, lo phần accessibility                           |
| [Sass](https://sass-lang.com)                             | 1.101 | Variable, nesting, mixin trong `globals.scss`                       |
| [Motion](https://motion.dev)                              | 12.42 | Animation (tên cũ: framer-motion)                                   |
| [lucide-react](https://lucide.dev)                        | 1.25  | Icon set                                                            |
| [next-themes](https://github.com/pacocoursey/next-themes) | 0.4   | Dark mode, không nháy trắng khi reload                              |
| [Sonner](https://sonner.emilkowal.ski)                    | 2.0   | Toast                                                               |

### Data & State Management

Ba tầng state tách bạch, chọn đúng tầng trước khi viết:

| Layer            | Library                                      | Ver   | Giữ gì                                                      |
| ---------------- | -------------------------------------------- | ----- | ----------------------------------------------------------- |
| **Server state** | [TanStack Query](https://tanstack.com/query) | 5.101 | Dữ liệu từ API — cache, retry, invalidate                   |
| **URL state**    | [nuqs](https://nuqs.dev)                     | 2.9   | Filter, pagination, tab — reload không mất, share link được |
| **Client state** | [Zustand](https://zustand.docs.pmnd.rs)      | 5.0   | Phần còn lại                                                |

| Library                                                                                  | Ver  | Vai trò                                                                                  |
| ---------------------------------------------------------------------------------------- | ---- | ---------------------------------------------------------------------------------------- |
| [ky](https://github.com/sindresorhus/ky)                                                 | 2.0  | HTTP client trên nền `fetch`, nhẹ hơn axios ~4x và dùng được cache/`revalidate` của Next |
| [TanStack Table](https://tanstack.com/table)                                             | 8.21 | Headless data table                                                                      |
| [BigNumber.js](https://mikemcl.github.io/bignumber.js)                                   | 11.1 | Tính toán chính xác, tránh floating-point error                                          |
| [react-number-format](https://s-yadav.github.io/react-number-format)                     | 5.4  | Input số có thousand separator                                                           |
| [react-intersection-observer](https://github.com/thebuilder/react-intersection-observer) | 10.1 | Trigger cho infinite scroll                                                              |

### Form & Tooling

| Tool                                                                          | Ver  | Vai trò                                    |
| ----------------------------------------------------------------------------- | ---- | ------------------------------------------ |
| [Zod](https://zod.dev)                                                        | 4.4  | Schema validation                          |
| [React Hook Form](https://react-hook-form.com)                                | 7.82 | Form state                                 |
| [ESLint](https://eslint.org)                                                  | 9.39 | Linting                                    |
| [Prettier](https://prettier.io)                                               | 3.9  | Formatting, kèm plugin sort class Tailwind |
| [Vitest](https://vitest.dev) + [Testing Library](https://testing-library.com) | 4.1  | Unit & component test                      |
| [Playwright](https://playwright.dev)                                          | 1.61 | E2E                                        |
| [env-cmd](https://github.com/toddbluhm/env-cmd)                               | 11.0 | Nạp `.env` theo môi trường                 |

## Project Structure

Tổ chức theo loại file; component gom theo page dùng nó.

```
src/
├── app/                    # routes + Providers.tsx + AppInit.tsx + globals.scss
│   └── components/         # gallery UI
├── components/
│   ├── ui/                 # shadcn, kebab-case
│   ├── layout/             # dùng chung mọi page
│   └── <page>/             # riêng của từng route
├── hooks/                  # toàn bộ hook — endpoint API viết thẳng trong đây
├── stores/                 # appStore (in-memory) + localStore (localStorage)
├── lib/                    # http, queryClient, apiError, bignumber
├── utils/                  # cn, formatNumber
├── constants/              # hằng số dùng chung
└── types.ts                # toàn bộ type + zod schema
```

Viết gì thì đặt ở đâu:

| Viết gì                         | Đặt ở đâu             |
| ------------------------------- | --------------------- |
| Component chỉ dùng cho một page | `components/<page>/`  |
| Component dùng nhiều page       | `components/layout/`  |
| Hook bất kỳ, kể cả hook gọi API | `hooks/`              |
| Lời gọi API (`http.get`…)       | Viết thẳng trong hook |
| Type, zod schema                | `types.ts`            |
| Hằng số                         | `constants/`          |
| Hàm thuần dùng chung            | `utils/`              |

**Naming:** component `PascalCase`, hook/util/store `camelCase`, route file theo quy định của Next. Riêng `src/components/ui/` giữ `kebab-case` theo shadcn CLI.

## Architecture

### HTTP layer

`src/lib/http.ts` là instance `ky` duy nhất của toàn app. Đổi backend, đổi cách xác thực hay đổi format lỗi đều chỉ sửa một file.

Lỗi được chuẩn hoá thành `ApiError` gồm `status`, `code`, `message`, `details`, nên tầng trên bắt lỗi theo một kiểu thống nhất.

### Error handling

| Tầng   | Ở đâu                                   | Làm gì                                                                |
| ------ | --------------------------------------- | --------------------------------------------------------------------- |
| HTTP   | `lib/http.ts`                           | Chuẩn hoá lỗi thành `ApiError`                                        |
| Query  | `lib/queryClient.ts`                    | Toast lỗi toàn cục; query nào tự xử lý thì đặt `meta.skipGlobalError` |
| Render | `app/error.tsx`, `app/global-error.tsx` | Error boundary theo route segment                                     |

Riêng form, Zod validate phía client, còn lỗi `422` từ server được map ngược vào đúng field qua `setError`.

### App initialization

```
layout.tsx → Providers → AppInit → page
```

`Providers.tsx` bọc context: QueryClient, nuqs, theme, Toaster. `AppInit.tsx` là nơi đặt các init hook (`useInitAuth`, `useInitConfig`…) — nó nằm bên trong Providers nên dùng được mọi context.

## Conventions

Hai quy ước khi làm việc với API. Ví dụ đầy đủ nằm trong [`AGENTS.md`](./AGENTS.md).

**1. Endpoint viết thẳng trong hook**

```ts
export function useUserList(params: UserListParams) {
	return useQuery({
		queryKey: userKeys.list(params),
		queryFn: () => http.get('users', { searchParams }).json<UserListResponse>(),
	});
}
```

**2. Mutation dùng `try/catch` + `await mutateAsync`**

```tsx
try {
	await createUser.mutateAsync(values);
	toast.success('Đã thêm người dùng mới');
	onOpenChange(false);
} catch (error) {
	toast.error(error instanceof ApiError ? error.message : 'Lưu không thành công');
}
```

Cách này cho luồng đọc từ trên xuống, thứ tự chạy rõ ràng, và `return` sớm trong `catch` hoạt động đúng như mong đợi.

`invalidateQueries` đặt bên trong `mutationFn` để nơi gọi không phải nhớ:

```ts
mutationFn: async (values: UserFormValues) => {
	const created = await http.post('users', { json: values }).json<User>();
	queryClient.invalidateQueries({ queryKey: userKeys.all });
	return created;
},
```

## Thêm một feature mới

Ví dụ thêm feature `products`:

**1. Type + schema** → `src/types.ts`

```ts
export type Product = { id: string; name: string; price: string };

export const productFormSchema = z.object({
	name: z.string().min(1, 'Vui lòng nhập tên'),
	price: z.string().min(1, 'Vui lòng nhập giá'),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;
```

**2. Hook** → `src/hooks/useProducts.ts`

```ts
export const productKeys = {
	all: ['products'] as const,
	list: () => [...productKeys.all, 'list'] as const,
};

export function useProductList() {
	return useQuery({
		queryKey: productKeys.list(),
		queryFn: () => http.get('products').json<Product[]>(),
	});
}

export function useCreateProduct() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (values: ProductFormValues) => {
			const created = await http.post('products', { json: values }).json<Product>();
			queryClient.invalidateQueries({ queryKey: productKeys.all });
			return created;
		},
	});
}
```

**3. Component** → `src/components/products/ProductTable.tsx`

**4. Route** → `src/app/products/page.tsx`

Thêm component shadcn:

```bash
pnpm dlx shadcn@latest add <component>
```

## Number & Currency

Dùng BigNumber.js thay `Number` để tránh floating-point error (`0.1 + 0.2 !== 0.3`) và mất chính xác với số vượt `Number.MAX_SAFE_INTEGER` — hai lỗi thường gặp khi tính tiền.

```ts
import { formatNumber, formatCurrency } from '@/utils/formatNumber';

formatNumber(1234567.891); // '1.234.567,89'
formatNumber('9007199254740993'); // '9.007.199.254.740.993'  ← Number sẽ sai
formatCurrency(1500000); // '1.500.000 ₫'
```

> [!IMPORTANT]
> Import BigNumber từ `@/lib/bignumber`, không phải `bignumber.js`. File đó cấu hình `EXPONENTIAL_AT` để số lớn không bị in thành `1e+21`.

Input số dùng `<NumberInput>` — tự chèn thousand separator khi gõ, nhận và trả string thô để không mất chính xác.

Lưu ý: số nhỏ hơn `decimals` sẽ được làm tròn thành `'0'` (`formatNumber(1e-20)` → `'0'`). Với tỷ lệ, lãi suất hay crypto, truyền `decimals` đủ lớn.

## Styling

Style chính nằm ở `src/app/globals.scss` — Tailwind và SCSS dùng chung một file.

Ưu tiên Tailwind, chỉ viết SCSS khi Tailwind diễn đạt dài dòng hoặc không làm được, chẳng hạn animation nhiều bước hay selector phức tạp. Xem `.splash-screen` cuối file làm ví dụ.

> [!CAUTION]
> Ba dòng `@import` đầu file phải bọc `url()`:
>
> ```scss
> @import url('tailwindcss'); // ✅ Sass để nguyên cho PostCSS xử lý
> @import 'tailwindcss'; // ❌ Sass đi tìm file .scss trên đĩa → build lỗi
> ```

Design token lấy từ [`DESIGN.md`](./DESIGN.md), đã áp vào `globals.scss` cho cả light lẫn dark mode. Đọc file đó trước khi làm UI.

## Testing

| Loại             | Tool                     | Phạm vi                             |
| ---------------- | ------------------------ | ----------------------------------- |
| Unit & component | Vitest + Testing Library | Hàm thuần, hook, component          |
| E2E              | Playwright               | Luồng chính, chạy ở port 3001 riêng |

Base theo quy ước viết test để verify rồi xoá file test — chi tiết trong [`AGENTS.md`](./AGENTS.md). Hạ tầng test vẫn còn nguyên, dùng được ngay khi cần.

## Version constraints

Hai package cố ý ghim, nâng lên sẽ vỡ toolchain:

| Package    | Ghim ở | Lý do                                                                                                                              |
| ---------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| TypeScript | `5.9`  | `typescript-eslint@8` khai báo peer `>=4.8.4 <6.1.0`                                                                               |
| ESLint     | `9.39` | `eslint-plugin-react@7.37.5` chưa tương thích API của ESLint 10 — ném `TypeError: contextOrFilename.getFilename is not a function` |

Base chưa gắn auth, database, i18n, mock API, Sentry, Storybook, Docker và CI/CD. Thêm khi dự án có yêu cầu cụ thể.

## Tài liệu thêm

| File                       | Nội dung                                                                                      |
| -------------------------- | --------------------------------------------------------------------------------------------- |
| [`AGENTS.md`](./AGENTS.md) | Conventions và 12 cạm bẫy đã gặp thực tế. Đọc trước khi sửa code. `CLAUDE.md` import file này |
| [`DESIGN.md`](./DESIGN.md) | Design system — color, typography, spacing, component pattern                                 |
| `docs/superpowers/specs/`  | Thiết kế chi tiết và lý do đằng sau từng quyết định                                           |
