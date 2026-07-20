<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Base FE

Next.js starter dùng lại cho dự án mới. Trỏ `NEXT_PUBLIC_API_URL` tới API của bạn và dùng các hook React Query có sẵn trong `src/hooks/`.

Thiết kế chi tiết: `docs/superpowers/specs/2026-07-20-base-fe-design.md`

## Lệnh

```bash
pnpm dev              # dev server (port 3000) — dùng .env.dev
pnpm dev:local        # dùng .env
pnpm build            # dùng .env.production
pnpm build:dev        # dùng .env.dev
pnpm build:staging    # dùng .env.staging
pnpm typecheck
pnpm lint
pnpm format
pnpm test             # vitest (base không giữ file test — xem mục Test)
pnpm test:e2e         # playwright, port 3001 riêng
```

**Dùng pnpm, không dùng npm/yarn.**

Biến môi trường nạp qua **env-cmd**, không dùng cơ chế `.env.local` mặc định của Next. Muốn thêm môi trường thì tạo file `.env.<tên>` và thêm script tương ứng.

Truy cập biến bằng `process.env.NEXT_PUBLIC_*` trực tiếp — base không còn lớp validate env.

## 🎨 Thiết kế — ĐỌC DESIGN.md TRƯỚC KHI LÀM UI

**Bắt buộc:** trước khi viết mới hoặc sửa bất kỳ giao diện nào (component, page, layout, màu, khoảng cách, typography), **PHẢI đọc `DESIGN.md` ở thư mục gốc**. Không làm UI theo cảm tính hay theo mặc định của shadcn.

`DESIGN.md` là nguồn chuẩn duy nhất cho thiết kế. Token của nó đã được áp vào `src/app/globals.scss`:

| Khái niệm trong DESIGN.md      | Biến CSS                          |
| ------------------------------ | --------------------------------- |
| `colors.canvas` #010102        | `--background` (dark)             |
| `colors.surface-1` #0f1011     | `--card` (dark)                   |
| `colors.surface-2` #141516     | `--popover`, `--secondary` (dark) |
| `colors.ink` #f7f8f8           | `--foreground` (dark)             |
| `colors.primary` #5e6ad2       | `--primary`                       |
| `colors.primary-focus` #5e69d1 | `--ring`                          |
| `colors.hairline` #23252a      | `--border` (dark)                 |
| `colors.inverse-*`             | bộ token light mode               |

Luật rút gọn (chi tiết xem mục Do's and Don'ts trong DESIGN.md):

- **Lavender `--primary` là accent DUY NHẤT** — chỉ dùng cho brand mark, CTA chính, focus ring, link nhấn mạnh. **Không** dùng làm nền section hay fill card.
- **Không thêm màu accent thứ hai** (cam, hồng, xanh lá cho trang trí).
- **Không dùng `#000` true black** làm nền — canvas là `#010102`.
- Phân cấp bằng **thang surface** (canvas → surface-1 → 2 → 3 → 4) và viền hairline 1px, **không dùng đổ bóng**.
- **Không bo tròn dạng pill cho CTA** — button dùng `rounded-md` (8px), card `rounded-lg` (12px).
- Display weight 600, body weight 400. Không dùng weight 700+ cho display.
- Không dùng gradient khí quyển hay spotlight card.

**KHÔNG dùng opacity trên chữ.** `text-muted-foreground/50` hay `/60` làm chữ chìm hẳn vào nền tối, không đọc được. Phân cấp chữ bằng token, không bằng độ mờ:

| Cấp | Class                   | Dùng cho                                             |
| --- | ----------------------- | ---------------------------------------------------- |
| 1   | `text-foreground`       | Tiêu đề, nội dung chính                              |
| 2   | `text-ink-muted`        | Mô tả phụ trên panel                                 |
| 3   | `text-muted-foreground` | Meta, caption, code inline — vẫn đạt WCAG AA (6.4:1) |

Opacity chỉ dùng cho nền và viền (`bg-accent/50`, `border-primary/50`), không dùng cho chữ.

⚠️ DESIGN.md là hệ **dark-first** (bản gốc Linear không có light mode). Light mode ở đây được dựng từ bộ token `inverse-*`. Khi thêm màu mới, phải định nghĩa cho **cả hai** theme.

## Quy ước đặt tên file

| Loại                | Quy ước        | Ví dụ                           |
| ------------------- | -------------- | ------------------------------- |
| React component     | **PascalCase** | `UserTable.tsx`, `AppInit.tsx`  |
| Hook                | **camelCase**  | `useDebounce.ts`                |
| Store, lib, util    | **camelCase**  | `appStore.ts`, `queryClient.ts` |
| Route file của Next | theo Next      | `page.tsx`, `layout.tsx`        |

**Ngoại lệ: `src/components/ui/` giữ kebab-case** — file do `npx shadcn add` sinh. Không đổi tên, không sửa nội dung.

## Kiến trúc

Tổ chức theo **loại file**, không theo feature. Component nhóm theo **page** dùng nó.

```
src/
├── app/                    # route + Providers.tsx + AppInit.tsx + globals.scss
│   └── components/page.tsx # gallery UI
├── components/
│   ├── ui/                 # shadcn sinh ra — KHÔNG sửa, kebab-case
│   ├── layout/             # dùng chung mọi page
│   └── <page>/             # component riêng của từng trang
├── hooks/                  # TẤT CẢ hook, kể cả hook gọi API (endpoint viết thẳng trong đây)
├── types.ts                # TẤT CẢ type + zod schema, một file duy nhất
├── constants/              # hằng số dùng chung
├── utils/                  # function dùng chung (cn, formatNumber)
├── lib/                    # hạ tầng: http, queryClient, apiError, bignumber
└── stores/                 # appStore (bộ nhớ) + localStore (localStorage)
```

Quy tắc đặt file:

| Viết gì                         | Đặt ở đâu                                     |
| ------------------------------- | --------------------------------------------- |
| Component chỉ dùng cho một page | `components/<page>/`                          |
| Component dùng nhiều page       | `components/layout/`                          |
| Hook bất kỳ (kể cả React Query) | `hooks/`                                      |
| Lời gọi API (`http.get`…)       | Viết thẳng trong hook, **không** tách service |
| Type, zod schema                | `types.ts` (một file duy nhất)                |
| Hằng số                         | `constants/`                                  |
| Hàm thuần dùng chung            | `utils/`                                      |

### Ba tầng state — đừng nhầm lẫn

| Tầng         | Công cụ        | Chứa gì                 |
| ------------ | -------------- | ----------------------- |
| Server state | TanStack Query | Dữ liệu từ API          |
| URL state    | nuqs           | Filter, phân trang, tab |
| Client state | Zustand        | Còn lại                 |

Zustand có 2 store:

- **`stores/appStore.ts`** — chỉ trong bộ nhớ, mất khi reload (sidebar, modal)
- **`stores/localStore.ts`** — persist xuống localStorage (token, cài đặt)

Quy tắc chọn: _"reload xong còn cần giữ không?"_ → cần thì `localStore`, không thì `appStore`.

### Khởi tạo app

`layout.tsx` → `Providers` → `AppInit` → page

- **`Providers.tsx`** — chỉ bọc context (QueryClient, nuqs, theme, Toaster)
- **`AppInit.tsx`** — nơi viết hook khởi tạo (`useInitAuth`, `useInitConfig`...). Nằm _bên trong_ Providers nên dùng được mọi context.

### Mọi request đi qua `src/lib/http.ts`

Một instance `ky` duy nhất. Đổi backend / cách xác thực / format lỗi → chỉ sửa file này. Lỗi được chuẩn hoá thành `ApiError` (`src/lib/apiError.ts`) có `status`, `code`, `message`, `details`.

## Quy ước gọi API — BẮT BUỘC

### 1. Viết endpoint thẳng trong hook, không tách file service

Không tạo `services/`, không tạo object `xxxApi`. Mỗi hook React Query tự gọi `http` bên trong `queryFn` / `mutationFn`.

```ts
// ✅ ĐÚNG — src/hooks/useUsers.ts
export function useUserList(params: UserListParams) {
	return useQuery({
		queryKey: userKeys.list(params),
		queryFn: () => http.get('users', { searchParams }).json<UserListResponse>(),
	});
}

// ❌ SAI — tách thêm một lớp trung gian không cần thiết
// src/services/userApi.ts → export const userApi = { list: () => http.get(...) }
```

Mỗi resource một file hook (`useUsers.ts`, `useProducts.ts`), kèm một `xxxKeys` factory cho query key.

### 2. Mutation: luôn `try/catch` + `await mutateAsync`, KHÔNG dùng `onSuccess`/`onError`

Nơi gọi mutation phải xử lý kết quả bằng `try/catch`, không truyền callback.

```tsx
// ✅ ĐÚNG
async function onSubmit(values: UserFormValues) {
	try {
		await createUser.mutateAsync(values);
		toast.success('Đã thêm người dùng mới');
		onOpenChange(false);
	} catch (error) {
		if (error instanceof ApiError && error.status === 422) {
			// map lỗi vào field
			return;
		}
		toast.error(error instanceof ApiError ? error.message : 'Lưu không thành công');
	}
}

// ❌ SAI
createUser.mutate(values, {
	onSuccess: () => toast.success('...'),
	onError: () => toast.error('...'),
});
```

Lý do: luồng đọc từ trên xuống, biết chắc thứ tự chạy, và `return` sớm trong `catch` hoạt động đúng như mong đợi — điều mà callback không làm được.

### 3. Invalidate cache nằm TRONG `mutationFn`

Vì không dùng `onSuccess`, việc làm mới cache phải nằm trong chính `mutationFn`, để nơi gọi không phải nhớ:

```ts
export function useCreateUser() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (values: UserFormValues) => {
			const created = await http.post('users', { json: values }).json<User>();
			queryClient.invalidateQueries({ queryKey: userKeys.all });
			return created;
		},
	});
}
```

Không `await` lời gọi invalidate — để mutation trả kết quả ngay, không chờ refetch xong.

> Ngoại lệ duy nhất: `QueryCache.onError` trong `lib/queryClient.ts` — đó là handler **toàn cục** cho query lỗi (hiện toast chung), không phải callback của từng mutation. Giữ nguyên.

## Component gallery

Trang `/components` liệt kê toàn bộ component trong `src/components/ui/`.

Khi thêm component mới bằng `pnpm dlx shadcn@latest add <tên>`, nhớ cập nhật cả hai chỗ:

1. `src/components/showcase/navGroups.ts` — thêm `{ id, label }` vào đúng nhóm. `id` phải trùng tên file component.
2. `src/components/showcase/sections/*.tsx` — thêm một `<ShowcaseSection id="<tên file>">` với demo.

Sidebar dùng `IntersectionObserver` khớp theo `id`, nên hai chỗ trên lệch nhau là link sẽ nhảy hụt.

## ⚠️ Cạm bẫy đã gặp — đừng lặp lại

**1. ky 2.0 khác hẳn 1.x.** Blog/tutorial trên mạng phần lớn còn theo 1.x:

- `prefixUrl` → **`prefix`**
- Hook nhận object `{ request, options, error, retryCount }`, không phải tham số rời
- **`error.response.json()` KHÔNG hoạt động** — ky tự parse body lỗi vào **`error.data`** và đã consume stream

**2. Form phải có `noValidate`.** `<Input type="email">` kích hoạt constraint validation của trình duyệt, chặn submit _trước khi_ Zod kịp chạy → không có thông báo lỗi nào hiện ra.

**3. Zustand persist phải `skipHydration: true`.** Next render trên server (không có `localStorage`) → tự đọc lúc khởi tạo sẽ gây hydration mismatch. Việc rehydrate do `useHydrateStore` đảm nhiệm, `AppInit` render `SplashScreen` cho tới khi xong.

**4. KHÔNG nâng TypeScript lên 6.x hay 7.x.** `typescript-eslint@8` khai báo peer `typescript >=4.8.4 <6.1.0`. Giữ `5.9.3`.

**5. KHÔNG nâng ESLint lên 10.** `eslint-plugin-react@7.37.5` (dependency của `eslint-config-next`) chưa tương thích, ném `TypeError: contextOrFilename.getFilename is not a function`. Giữ `9.39.5`.

**6. Zod: tránh `.pipe()` và `.superRefine()` cho field của form.** Chúng làm mất `path` của issue hoặc bọc schema thành effects, khiến react-hook-form không map lỗi vào đúng field. Dùng `z.email({ error: (issue) => ... })`.

**7. TanStack Table + React Compiler.** `useReactTable` trả về function không memo hoá an toàn được → component dùng nó phải có directive `'use no memo'`.

**8. Tailwind v4 không còn `tailwind.config.ts`.** Token khai báo bằng `@theme` trong `src/app/globals.scss`. Ví dụ trên mạng phần lớn còn theo v3.

**9. SCSS: `@import` của Tailwind phải bọc `url()`.** Style chính là `src/app/globals.scss`. Sass coi `@import 'tailwindcss'` là lệnh import file SCSS trên đĩa và báo `Can't find stylesheet to import`. Bọc thành `@import url('tailwindcss')` thì Sass để nguyên cho PostCSS xử lý. Ba dòng đầu file đều phải giữ dạng này.

**10. BigNumber NÉM lỗi với chuỗi không parse được.** `new BigNumber('abc')` throw chứ không trả `NaN` — một giá trị bẩn từ API đủ làm crash cả trang. Luôn bọc `try/catch` (xem `utils/formatNumber.ts`).

**11. Import BigNumber từ `@/lib/bignumber`, KHÔNG từ `bignumber.js`.** File đó cấu hình `EXPONENTIAL_AT: [-1e9, 1e9]` để số lớn/bé không bị in thành `1e+21`. Import thẳng package sẽ mất cấu hình.

Đã kiểm chứng `formatNumber` không trả ký hiệu mũ với: số 501 chữ số, `1e308`, input dạng chuỗi `'1e50'`, và số bé tới `1e-100`.

⚠️ Nhưng số bé hơn `decimals` sẽ **làm tròn thành `'0'`** — `formatNumber(1e-20)` trả `'0'` vì mặc định `decimals: 2`. Đúng về toán học nhưng dễ gây hiểu nhầm với tỷ lệ/lãi suất/crypto. Truyền `decimals` đủ lớn ở nơi cần độ chính xác cao.

**12. Biến font phải khớp giữa `layout.tsx` và `globals.scss`.** `layout.tsx` khai báo Geist dưới tên `--font-geist-sans`, còn preset shadcn sinh ra `--font-sans: var(--font-sans)` — tự trỏ vào chính nó nên CSS không hợp lệ và cả trang rơi về serif. Đã sửa thành `var(--font-geist-sans)`. Nếu chữ đột nhiên thành serif, kiểm tra chỗ này trước.

**13. KHÔNG khai báo `--spacing-<tên chữ>` trong `@theme`.** Tailwind v4 dùng namespace `--spacing-*` cho **mọi** utility cùng tên, không riêng `p-*`/`m-*`. Khai `--spacing-md: 16px` sẽ biến `max-w-md` từ 448px thành 16px, kéo theo `Dialog`, `Sheet`, `Drawer`, `Tooltip` co lại còn vài pixel — và E2E vẫn pass vì Playwright thao tác qua DOM, không kiểm tra kích thước. Spacing scale của DESIGN.md đều là bội số 4 nên dùng thẳng scale số của Tailwind: `4px=1 · 8px=2 · 12px=3 · 16px=4 · 24px=6 · 32px=8 · 48px=12 · 96px=24`.

**14. Next 16 chỉ cho phép MỘT dev server mỗi thư mục.** Chạy `next dev` lần hai trong cùng repo sẽ bị chặn kể cả khi khác port (`Another next dev server is already running`). Vì vậy `pnpm test:e2e` sẽ fail nếu đang có `pnpm dev` chạy — tắt dev server trước khi chạy E2E.

**15. cmdk (`Command`) tự `scrollIntoView` khi mount.** Render `Command` ở dạng inline sẽ khiến trình duyệt cuộn tới item đang chọn — trang dài như `/components` bị nhảy thẳng xuống giữa. Chỉ render `Command` khi người dùng yêu cầu (nút bấm), hoặc dùng `CommandDialog`.

**16. Radius phải đặt giá trị tuyệt đối, không dẫn xuất từ `--radius`.** Bản shadcn sinh ra khai `--radius-sm: calc(var(--radius) * 0.6)`… cho ra 7.2px/9.6px/16.8px, lệch khỏi thang 6/8/16 của DESIGN.md — và vì nó nằm SAU trong `@theme` nên ghi đè luôn token đặt trước. Giữ một khối radius duy nhất với giá trị tuyệt đối.

**17. `src/components/ui/button.tsx` có sửa tay theo DESIGN.md.** Hover của variant `default` dùng `hover:bg-primary-hover` (`#828fff`, lavender sáng hơn) thay cho `hover:bg-primary/80` mặc định — bản mặc định làm nút TỐI đi khi hover, ngược với DESIGN.md. Chạy `shadcn add button` sẽ ghi đè, nhớ sửa lại.

## Known issue (không phải bug của mình)

`next-themes@0.4.6` chèn `<script>` để set theme trước hydrate, React 19 log cảnh báo _"Encountered a script tag while rendering React component"_. **Chỉ xuất hiện ở dev build — production console sạch.** Đây là hành vi cần thiết để chống nháy trắng khi reload ở dark mode; chưa có bản vá upstream. Không cần xử lý.

## Test

**Quy tắc: viết test để verify, xong thì XOÁ file test.** Base không giữ file `*.test.ts` / `*.test.tsx` nào.

Khi làm tính năng mới:

1. Viết test cho phần logic (`utils/`, `hooks/`, `lib/`)
2. Chạy `pnpm test` cho tới khi pass
3. **Xoá file test** trước khi bàn giao

Hạ tầng test vẫn còn để dùng khi cần: Vitest + Testing Library.

E2E trong `e2e/` là smoke test xác nhận base chạy được — kiểm tra render và tương tác, không kiểm tra dữ liệu.

⚠️ Đánh đổi cần biết: không có test đơn vị nghĩa là sửa code sẽ không có gì cảnh báo khi làm hỏng chỗ khác. Với hàm xử lý số/tiền (`utils/formatNumber.ts`) nên viết test tạm để chạy thử rồi mới xoá — lỗi làm tròn không lộ ra khi nhìn UI.

## Chưa có trong base (cố ý)

Auth · ORM/database · i18n · orval · next-safe-action · biểu đồ · Sentry · Storybook · Dockerfile · CI/CD.

Thêm khi có yêu cầu cụ thể. Đừng cài trước — sẽ thành nợ kỹ thuật.

## Quy tắc làm việc

**Không tự chạy `git commit`.** Sau khi xong task: `git add` rồi in ra commit message gợi ý để user tự review và commit.
