# Base FE — Thiết kế

**Ngày:** 2026-07-20
**Trạng thái:** Chờ review

## 1. Mục tiêu

Dựng một base frontend dùng lại được cho dự án mới sau này. Base **trung tính ở tầng backend**: chưa xác định backend nên không cài sẵn auth, ORM hay code-gen. Mọi thứ liên quan backend đi qua một lớp HTTP duy nhất để sau này thay đổi chỉ sửa một chỗ.

Không kế thừa gì từ `zyntrix.valuation.fe`.

### Phạm vi

**Trong phạm vi:** scaffold dự án, cấu hình build/lint/test, design system, lớp HTTP, state management, một trang demo CRUD làm khuôn mẫu.

**Ngoài phạm vi:** auth, database, i18n, biểu đồ, error tracking, Docker, CI/CD. Tất cả thêm sau khi có yêu cầu cụ thể.

### Tiêu chí thành công

Base coi là hoàn tất khi:

1. `pnpm dev` chạy được ở **port 3000**. E2E dùng port 3100 riêng để không bám nhầm app khác.
2. `pnpm build` thành công.
3. `pnpm lint` và `pnpm typecheck` sạch.
4. `pnpm test` pass.
5. `pnpm test:e2e` pass.
6. Trang demo chạy đủ: bảng dữ liệu có sort/filter (filter lưu trên URL), form thêm/sửa có validate, toast phản hồi, danh sách cuộn vô hạn, chuyển dark/light mode, dữ liệu lấy từ MSW.
7. Reload trang khi đang ở dark mode + có filter trên URL: không nháy giao diện, không mất filter, không có cảnh báo hydration mismatch trong console.

## 2. Stack

Version lấy từ npm ngày 2026-07-20.

### Core

| Gói                           | Version | Lý do                                                    |
| ----------------------------- | ------- | -------------------------------------------------------- |
| `next`                        | 16.2.10 | App Router, React Server Components                      |
| `react` / `react-dom`         | 19.2.7  |                                                          |
| `typescript`                  | 5.9.3   | Xem mục 2.1                                              |
| `tailwindcss`                 | 4.3.3   | Config bằng CSS `@theme`, không còn `tailwind.config.ts` |
| `shadcn` (CLI)                | 4.13.1  | Component copy vào repo, không phải dependency           |
| `babel-plugin-react-compiler` | 1.0.0   | Tự memo hoá, bỏ được phần lớn `useMemo`/`useCallback`    |
| pnpm                          | —       | Nhanh, strict, sẵn sàng cho monorepo                     |

#### 2.1 Ghi chú TypeScript

`latest` trên npm hiện là `7.0.2` (bản native Go). Không dùng vì `typescript-eslint@8.64.0` khai báo peer `typescript >=4.8.4 <6.1.0` — chọn TS 7 sẽ làm ESLint không chạy được với TypeScript.

Chọn `5.9.3` thay vì `6.0.3` vì 5.9.3 còn dư địa nâng cấp trong range được hỗ trợ, trong khi 6.0.3 là cận trên. Đây cũng là version `ixartz/Next-js-Boilerplate` (13k sao) đang dùng.

### Data & State

| Gói                           | Version | Vai trò                                |
| ----------------------------- | ------- | -------------------------------------- |
| `@tanstack/react-query`       | 5.101.2 | Server state: cache, retry, invalidate |
| `zustand`                     | 5.0.14  | Client state                           |
| `nuqs`                        | 2.9.1   | State đồng bộ với URL query params     |
| `ky`                          | 2.0.2   | HTTP client                            |
| `react-intersection-observer` | 10.1.0  | Trigger cho infinite query             |

#### 2.2 Ghi chú chọn ky thay axios

|                                            | ky 2.0.2      | axios 1.18.1                |
| ------------------------------------------ | ------------- | --------------------------- |
| Kích thước unpacked                        | 396 KB        | 1.73 MB                     |
| Nền tảng                                   | `fetch` chuẩn | XHR (browser) / http (Node) |
| Chạy trong Server Component / Edge         | Được          | Nặng, không tối ưu          |
| Dùng được cache & `revalidate` của Next 16 | Được          | **Không**                   |
| Retry, timeout                             | Có sẵn        | Cần `axios-retry`           |

Next.js patch hàm `fetch` để cắm cache, `revalidate`, `tags`. Axios đi qua XHR nên nằm ngoài cơ chế đó.

**Đánh đổi đã chấp nhận:** axios có `onUploadProgress` chạy mọi trình duyệt; ky làm được nhưng cần request streams (`duplex: 'half'`) mà Safari/Firefox chưa hỗ trợ. Base này không có yêu cầu progress bar upload. Nếu sau này cần, viết một hàm `XMLHttpRequest` riêng (~30 dòng) cho riêng phần upload, không kéo cả axios vào.

### Form & Validation

| Gói                   | Version  |
| --------------------- | -------- |
| `zod`                 | 4.4.3    |
| `react-hook-form`     | 7.82.0   |
| `@hookform/resolvers` | 5.2.2    |
| `@t3-oss/env-nextjs`  | mới nhất |

`@t3-oss/env-nextjs` validate biến môi trường lúc build — thiếu biến thì build fail, không phải chờ tới runtime production.

### UI

| Gói                     | Version  |
| ----------------------- | -------- |
| `next-themes`           | mới nhất |
| `lucide-react`          | 1.25.0   |
| `sonner`                | mới nhất |
| `@tanstack/react-table` | 8.21.3   |
| `motion`                | 12.42.2  |

#### 2.3 Ghi chú toast

Dùng `sonner`, không dùng component `toast` cũ của shadcn. Docs chính thức ghi rõ: _"The toast component has been deprecated. Use the sonner component instead."_ (ui.shadcn.com/docs/components/toast). Component `toast` cũ đã bị gỡ khỏi registry và không còn được maintain.

### Chất lượng code

| Gói                                       | Version  | Vai trò                       |
| ----------------------------------------- | -------- | ----------------------------- |
| `eslint`                                  | 10.7.0   | Lint                          |
| `eslint-config-next`                      | 16.2.10  | Rule riêng của Next           |
| `prettier`                                | 3.9.5    | Format                        |
| `prettier-plugin-tailwindcss`             | mới nhất | Sắp xếp class Tailwind        |
| `vitest`                                  | 4.1.10   | Unit / component test         |
| `@testing-library/react`                  | mới nhất |                               |
| `@playwright/test`                        | 1.61.1   | E2E                           |
| `msw`                                     | 2.15.0   | Mock API                      |
| `lefthook`                                | mới nhất | Git hooks                     |
| `knip`                                    | mới nhất | Dò dead code, dependency thừa |
| `@commitlint/cli` + `config-conventional` | mới nhất | Chuẩn hoá commit message      |

Chọn ESLint + Prettier thay vì Biome: giữ trọn bộ rule của `eslint-config-next` và hệ sinh thái quen thuộc. Đánh đổi: chậm hơn Biome, nhiều file config hơn.

Không dùng git hooks (lefthook), commitlint và knip — bỏ theo yêu cầu để base gọn hơn.

#### 2.4 Ghi chú ESLint

Thiết kế ban đầu chọn `eslint@10.7.0`. Thực tế **không dùng được**: `eslint-plugin-react@7.37.5` (dependency của `eslint-config-next`) chưa tương thích API ESLint 10 và ném `TypeError: contextOrFilename.getFilename is not a function`. Dùng `9.39.5` — đúng version `create-next-app` sinh ra.

#### 2.5 Ghi chú ky 2.0

ky 2.0 đổi API so với 1.x, tài liệu và ví dụ trên mạng phần lớn còn theo 1.x:

- `prefixUrl` → **`prefix`** (và chấp nhận cả `'users'` lẫn `'/users'`)
- Hook nhận object `{ request, options, error, retryCount }` thay vì tham số rời
- `error.response.json()` **không hoạt động** — ky tự parse body lỗi vào **`error.data`** và đã consume stream

### Cố ý không đưa vào

Auth · ORM/database · i18n · orval · next-safe-action · Recharts · Sentry · Storybook · Dockerfile · CI/CD.

Lý do: backend chưa xác định. Cài trước là nợ kỹ thuật phải gỡ. Tất cả đều thêm sau dễ dàng.

## 3. Design system

`DESIGN.md` ở root repo, dùng khung **Linear** từ [getdesign.md](https://getdesign.md/) (`npx getdesign@latest add linear`).

Linear được chọn vì ngôn ngữ thiết kế của nó (tối giản, chính xác, dark mode tốt) gần với mặc định của shadcn/ui nhất — lấy về dùng được ngay, không phải sửa nhiều.

**Quan trọng:** chỉ lấy **khung** — spacing scale, type scale, pattern component, nguyên tắc motion. **Palette và font phải thay bằng bộ nhận diện của bạn.** Không copy nguyên nhận diện thương hiệu của Linear vào sản phẩm thương mại.

Token định nghĩa trong `src/app/globals.scss` qua directive `@theme` của Tailwind 4.

## 4. Kiến trúc

### 4.0 Quy ước đặt tên file

| Loại file                | Quy ước                | Ví dụ                                      |
| ------------------------ | ---------------------- | ------------------------------------------ |
| React component          | **PascalCase**         | `UserTable.tsx`, `AppInit.tsx`             |
| Hook                     | **camelCase**          | `useDebounce.ts`, `useInfiniteScroll.ts`   |
| Store, lib, util, config | **camelCase**          | `appStore.ts`, `queryClient.ts`, `http.ts` |
| Route file của Next      | Theo quy định của Next | `page.tsx`, `layout.tsx`, `error.tsx`      |

**Ngoại lệ duy nhất: `src/components/ui/`** giữ kebab-case (`dropdown-menu.tsx`, `alert-dialog.tsx`) vì file do `npx shadcn add` tự sinh. Đổi tên tay sẽ vỡ mỗi lần chạy lại CLI hoặc cập nhật component. Không sửa file trong thư mục này.

### 4.1 Cấu trúc thư mục

```
base-fe/
├── DESIGN.md
├── CLAUDE.md
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── Providers.tsx
│   │   ├── AppInit.tsx
│   │   ├── page.tsx
│   │   └── globals.scss
│   ├── features/
│   │   └── example/
│   │       ├── components/
│   │       ├── api/
│   │       ├── hooks/
│   │       └── schema.ts
│   ├── components/
│   │   ├── ui/            ← shadcn sinh ra, kebab-case, không sửa
│   │   └── layout/
│   ├── stores/
│   │   ├── appStore.ts    ← state toàn app, chỉ trong bộ nhớ
│   │   └── localStore.ts  ← persist xuống localStorage
│   ├── hooks/
│   │   ├── useHydrateStore.ts
│   │   ├── useInfiniteScroll.ts
│   │   ├── useDebounce.ts
│   │   └── useMediaQuery.ts
│   ├── lib/
│   │   ├── http.ts
│   │   ├── queryClient.ts
│   │   ├── env.ts
│   │   └── utils.ts
│   └── mocks/
│       ├── handlers.ts
│       ├── browser.ts
│       └── server.ts
└── e2e/
```

**Feature-based, không phải layer-based.** Code của một tính năng nằm gọn một chỗ: xoá tính năng là xoá một thư mục. Hook/component dùng chung mới lên `src/hooks/`, `src/components/`.

Ranh giới: `features/*` được import từ `lib/`, `hooks/`, `components/`. **Không** import chéo giữa các feature — nếu hai feature cần dùng chung thứ gì, đẩy thứ đó lên tầng chung.

### 4.2 Provider và khởi tạo

Tách làm hai file vì chúng có vòng đời khác nhau.

**`Providers.tsx`** — cấu trúc tĩnh, chỉ bọc các Provider:

```tsx
<QueryClientProvider client={queryClient}>
	<NuqsAdapter>
		<ThemeProvider attribute="class">
			{children}
			<Toaster />
		</ThemeProvider>
	</NuqsAdapter>
</QueryClientProvider>
```

**`AppInit.tsx`** — `'use client'`, nằm **bên trong** `Providers`, là nơi viết các hook khởi tạo:

```tsx
export function AppInit({ children }: { children: React.ReactNode }) {
	const hydrated = useHydrateStore();
	// Chỗ để thêm hook init sau này:
	// useInitAuth()
	// useInitConfig()

	if (!hydrated) return <SplashScreen />;
	return <>{children}</>;
}
```

Phải tách vì hook init cần truy cập context (QueryClient, theme) — mà context chỉ có sau khi Provider đã render. Gộp một file thì hook chạy trước Provider, không dùng được context.

`layout.tsx`:

```tsx
<Providers>
	<AppInit>{children}</AppInit>
</Providers>
```

### 4.3 Lớp HTTP — `lib/http.ts`

Một instance `ky` duy nhất cho toàn bộ ứng dụng:

```ts
export const http = ky.create({
	prefixUrl: env.NEXT_PUBLIC_API_URL,
	timeout: 30_000,
	retry: { limit: 2, methods: ['get'] },
	hooks: {
		beforeRequest: [/* gắn token từ persist store */],
		afterResponse: [/* bắt 401 → xoá token, redirect login */],
		beforeError: [/* chuẩn hoá error thành ApiError */],
	},
});
```

Mọi request đi qua đây. Đổi backend, đổi cách xác thực, đổi format lỗi — chỉ sửa một file.

Định nghĩa một class `ApiError` để tầng trên bắt lỗi theo kiểu thống nhất thay vì đoán hình dạng response.

### 4.4 State — ba tầng tách bạch

| Tầng         | Công cụ        | Chứa gì                                           |
| ------------ | -------------- | ------------------------------------------------- |
| Server state | TanStack Query | Dữ liệu từ API — có cache, có invalidate          |
| URL state    | nuqs           | Filter, phân trang, tab đang mở — share link được |
| Client state | Zustand        | Còn lại                                           |

Zustand chia hai store theo trách nhiệm:

**`stores/appStore.ts`** — state toàn ứng dụng, **chỉ trong bộ nhớ**. Mất khi reload. Chứa sidebar đóng/mở, modal đang hiện, trạng thái UI tạm thời.

**`stores/localStore.ts`** — **lưu xuống localStorage** qua `persist` middleware, thay cho việc gọi `localStorage` rải rác khắp code:

```ts
persist((set) => ({/* token, cài đặt người dùng */}), {
	name: 'base-fe',
	storage: createJSONStorage(() => localStorage),
	partialize: (s) => ({ token: s.token }),
	skipHydration: true,
});
```

Nguyên tắc phân biệt: hỏi "reload trang xong còn cần giữ không?" — cần thì vào `localStore`, không thì vào `appStore`.

#### Vấn đề hydration và cách xử lý

Next render trên server, nơi không có `localStorage`. Zustand persist đọc localStorage ở client. HTML server và client khác nhau → React báo hydration mismatch, giao diện nháy.

Xử lý:

1. Đặt `skipHydration: true` — store không tự đọc localStorage lúc khởi tạo.
2. Hook `useHydrateStore` gọi `useLocalStore.persist.rehydrate()` trong `useEffect`, trả về cờ `hydrated`.
3. `AppInit` render `<SplashScreen />` cho tới khi `hydrated === true`.

Server và client đều render `SplashScreen` ở lượt đầu → khớp nhau → không mismatch.

`appStore` không persist nên không dính vấn đề này.

### 4.5 Infinite scroll — `hooks/useInfiniteScroll.ts`

Gói sẵn combo `useInfiniteQuery` + `useInView`: khi phần tử sentinel lọt vào viewport thì gọi `fetchNextPage`, có guard `hasNextPage` và `isFetchingNextPage` để không gọi trùng.

Trả về `{ items, ref, isLoading, isFetchingNextPage, hasNextPage }` — component chỉ cần gắn `ref` vào sentinel ở cuối danh sách.

### 4.6 Mock API — `src/mocks/`

MSW dùng chung handler cho ba môi trường: dev trong browser (`browser.ts`), unit test trong Node (`server.ts`), và E2E.

Vì backend chưa xác định, MSW là thứ cho phép phát triển và kiểm thử FE mà không bị chặn. Khi có backend thật, tắt MSW bằng biến môi trường, không phải sửa code.

## 5. Xử lý lỗi

Ba tầng:

1. **Tầng HTTP** — `hooks.beforeError` của ky chuẩn hoá mọi lỗi thành `ApiError` có `status`, `code`, `message`.
2. **Tầng query** — `QueryCache.onError` toàn cục hiện toast cho lỗi không được xử lý riêng. Query nào cần xử lý riêng thì bắt tại chỗ.
3. **Tầng render** — `error.tsx` của Next cho từng route segment, cộng `global-error.tsx` ở root.

Lỗi form không đi qua ba tầng trên: Zod validate phía client, lỗi từ server (ví dụ 422) map ngược vào field qua `setError` của react-hook-form.

## 6. Kiểm thử

| Loại      | Công cụ                        | Phạm vi                          |
| --------- | ------------------------------ | -------------------------------- |
| Unit      | Vitest                         | Hàm thuần trong `lib/`, `utils/` |
| Component | Vitest + Testing Library + MSW | Component có logic, hook         |
| E2E       | Playwright                     | Luồng chính của trang demo       |

Base cần có test mẫu cho mỗi loại để làm khuôn — không đặt mục tiêu coverage.

## 7. Trang demo

Một trang `/example` chứng minh mọi mảnh ghép hoạt động cùng nhau, đồng thời làm khuôn mẫu để copy khi làm feature mới:

- Bảng dữ liệu (TanStack Table) có sort và filter
- Filter + phân trang lưu trên URL (nuqs) — reload không mất, share link được
- Form thêm/sửa (RHF + Zod) trong dialog shadcn
- Toast phản hồi thành công/thất bại (sonner)
- Danh sách cuộn vô hạn (`useInfiniteScroll`)
- Nút chuyển dark/light mode
- Toàn bộ dữ liệu từ MSW

## 8. Rủi ro đã biết

| Rủi ro                                                                    | Cách giảm                                                                           |
| ------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `localStore` (zustand persist) gây hydration mismatch                     | `skipHydration` + `useHydrateStore` + splash screen (mục 4.4)                       |
| React Compiler còn mới, có thể sinh lỗi khó lần                           | Bật ngay từ đầu để phát hiện sớm; tắt được bằng một dòng config nếu có sự cố        |
| Tailwind 4 đổi cách config, tài liệu/ví dụ trên mạng phần lớn còn theo v3 | Ghi rõ cách dùng `@theme` trong `CLAUDE.md`                                         |
| ky chưa hỗ trợ upload progress trên Safari/Firefox                        | Đã chấp nhận; viết XHR riêng nếu phát sinh nhu cầu (mục 2.2)                        |
| Base phình ra khi thêm thứ "phòng xa"                                     | Danh sách "cố ý không đưa vào" ở mục 2 là ranh giới; thêm gì phải có nhu cầu cụ thể |

## 9. Quyết định hoãn lại

Những điểm này **không chặn việc dựng base**. Ghi lại để khi dùng base cho dự án thật thì biết chỗ nào cần bổ sung.

| Điểm                           | Trạng thái                         | Ảnh hưởng khi làm                                                                                                                                                  |
| ------------------------------ | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Backend là gì**              | Chưa xác định                      | Nếu có OpenAPI spec thì thêm `orval` để sinh type + hooks tự động. Chưa có thì viết tay theo khuôn `features/example/api/`.                                        |
| **Auth**                       | Hoãn — không làm trong base này    | Dự kiến JWT. Khi làm sẽ chạm `lib/http.ts` (gắn token vào header, bắt 401) và `stores/localStore.ts` (lưu token). Cấu trúc hiện tại đã chừa sẵn chỗ ở cả hai file. |
| **Palette + font thương hiệu** | Tạm dùng token mặc định của shadcn | Khi có bộ nhận diện, chỉ sửa block `@theme` trong `src/app/globals.scss` và phần color/typography trong `DESIGN.md`. Không phải sửa component.                     |

Cả ba đều được thiết kế để thay đổi tập trung tại một chỗ, không lan ra toàn bộ code.
