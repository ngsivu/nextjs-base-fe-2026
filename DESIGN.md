---
version: 1.0
name: base-fe-design-system
description: 'Hệ thiết kế mặc định của base Next.js. Dành cho ứng dụng nghiệp vụ nội bộ: dày dữ liệu, dùng nhiều giờ mỗi ngày. Light-first, dựng quanh navy #203868 làm accent duy nhất, với toàn bộ thang xám lệch hue 220 để chrome và bản ghi nằm cùng một họ màu. Ngôn ngữ thị giác là technical (mono cho mã bản ghi và thời gian, chữ số đều cột, hairline 1px thay đổi phân cấp, không đổ bóng) cộng visualize (tiến trình nhiều bước hiện thành stepper và timeline, trạng thái bản ghi mã hoá bằng bộ semantic bốn màu kèm nhãn chữ, biểu đồ dùng palette categorical đã qua kiểm định mù màu). Mật độ ở mức ứng dụng nghiệp vụ, không phải trang marketing.'

colors:
    navy-50: '#eff3fb'
    navy-100: '#dbe4f5'
    navy-200: '#b8c9ea'
    navy-300: '#8aa5db'
    navy-400: '#5b81cd'
    navy-500: '#3a65bb'
    navy-600: '#30549c'
    navy-700: '#284581'
    navy-800: '#203868'
    navy-900: '#182a4e'
    navy-950: '#0f1b33'
    brand: '#203868'
    on-brand: '#ffffff'
    brand-edge: 'transparent'
    dark-brand: '#203868'
    dark-brand-edge: '#374562'
    primary: '#203868'
    on-primary: '#ffffff'
    primary-hover: '#284581'
    primary-active: '#182a4e'
    primary-text: '#203868'
    primary-focus: '#30549c'
    canvas: '#ffffff'
    surface-1: '#f4f6fa'
    surface-2: '#edf1f7'
    surface-3: '#e6ebf3'
    ink: '#0b1220'
    ink-muted: '#3a4356'
    ink-subtle: '#5b6679'
    hairline: '#dde3ed'
    hairline-strong: '#c3ccdb'
    control-edge: '#7d8899'
    hairline-tertiary: '#eaeef5'
    dark-primary: '#3a65bb'
    dark-primary-hover: '#446fc5'
    dark-primary-active: '#30549c'
    dark-primary-text: '#8aa5db'
    dark-primary-focus: '#5b81cd'
    dark-canvas: '#080b12'
    dark-surface-1: '#0d121c'
    dark-surface-2: '#121926'
    dark-surface-3: '#182030'
    dark-surface-4: '#1d2739'
    dark-ink: '#eef1f7'
    dark-ink-muted: '#c3ccdd'
    dark-ink-subtle: '#8794ac'
    dark-hairline: '#273249'
    dark-hairline-strong: '#374562'
    dark-control-edge: '#5b6883'
    dark-hairline-tertiary: '#1e2740'
    success: '#15683f'
    success-subtle: '#e3f3ea'
    warning: '#8a5a00'
    warning-subtle: '#fbf0dc'
    danger: '#a32219'
    danger-subtle: '#fbe6e4'
    info: '#203868'
    info-subtle: '#dbe4f5'
    dark-success: '#4fbe84'
    dark-success-subtle: '#10261b'
    dark-warning: '#d6a045'
    dark-warning-subtle: '#2a2013'
    dark-danger: '#e9837a'
    dark-danger-subtle: '#2c1715'
    dark-info: '#8aa5db'
    dark-info-subtle: '#16203a'

typography:
    display-lg:
        fontFamily: Geist Sans
        fontSize: 40px
        fontWeight: 600
        lineHeight: 48px
        letterSpacing: -1px
    display-md:
        fontFamily: Geist Sans
        fontSize: 32px
        fontWeight: 600
        lineHeight: 40px
        letterSpacing: -1px
    headline:
        fontFamily: Geist Sans
        fontSize: 24px
        fontWeight: 600
        lineHeight: 32px
        letterSpacing: -1px
    section:
        fontFamily: Geist Sans
        fontSize: 20px
        fontWeight: 600
        lineHeight: 28px
        letterSpacing: 0px
    title:
        fontFamily: Geist Sans
        fontSize: 18px
        fontWeight: 500
        lineHeight: 24px
        letterSpacing: 0px
    body-lg:
        fontFamily: Geist Sans
        fontSize: 16px
        fontWeight: 400
        lineHeight: 24px
        letterSpacing: 0px
    body:
        fontFamily: Geist Sans
        fontSize: 14px
        fontWeight: 400
        lineHeight: 20px
        letterSpacing: 0px
    caption:
        fontFamily: Geist Sans
        fontSize: 12px
        fontWeight: 400
        lineHeight: 16px
        letterSpacing: 0px
    eyebrow:
        fontFamily: Geist Sans
        fontSize: 12px
        fontWeight: 500
        lineHeight: 16px
        letterSpacing: 1px

rounded:
    2xs: 2px
    xs: 4px
    sm: 6px
    md: 8px
    lg: 12px
    xl: 16px
    xxl: 24px
    pill: 9999px
    full: 9999px

spacing:
    xxs: 4px
    xs: 8px
    sm: 12px
    md: 16px
    lg: 24px
    xl: 32px
    xxl: 48px
    section: 64px

components:
    button-primary:
        backgroundColor: '{colors.primary}'
        textColor: '{colors.on-primary}'
        typography: '{typography.body}'
        rounded: '{rounded.md}'
        padding: 8px 14px
    button-primary-hover:
        backgroundColor: '{colors.primary-hover}'
        textColor: '{colors.on-primary}'
        typography: '{typography.body}'
        rounded: '{rounded.md}'
    button-primary-active:
        backgroundColor: '{colors.primary-active}'
        textColor: '{colors.on-primary}'
        typography: '{typography.body}'
        rounded: '{rounded.md}'
    button-secondary:
        backgroundColor: '{colors.surface-2}'
        borderColor: '{colors.control-edge}'
        textColor: '{colors.ink}'
        typography: '{typography.body}'
        rounded: '{rounded.md}'
        padding: 8px 14px
    button-outline:
        backgroundColor: '{colors.canvas}'
        borderColor: '{colors.control-edge}'
        textColor: '{colors.ink}'
        typography: '{typography.body}'
        rounded: '{rounded.md}'
        padding: 8px 14px
    button-ghost:
        backgroundColor: 'transparent'
        textColor: '{colors.ink-muted}'
        typography: '{typography.body}'
        rounded: '{rounded.md}'
        padding: 8px 14px
    text-input:
        backgroundColor: '{colors.canvas}'
        textColor: '{colors.ink}'
        typography: '{typography.body}'
        rounded: '{rounded.md}'
        padding: 8px 12px
    panel:
        backgroundColor: '{colors.surface-1}'
        textColor: '{colors.ink}'
        typography: '{typography.body}'
        rounded: '{rounded.lg}'
        padding: 24px
    panel-nested:
        backgroundColor: '{colors.surface-2}'
        textColor: '{colors.ink}'
        typography: '{typography.body}'
        rounded: '{rounded.md}'
        padding: 16px
    table-row:
        backgroundColor: '{colors.canvas}'
        textColor: '{colors.ink}'
        typography: '{typography.body}'
        rounded: '{rounded.xs}'
        padding: 12px 16px
    stat-tile:
        backgroundColor: '{colors.surface-1}'
        textColor: '{colors.ink}'
        typography: '{typography.display-md}'
        rounded: '{rounded.lg}'
        padding: 20px
    status-badge:
        backgroundColor: '{colors.success-subtle}'
        textColor: '{colors.success}'
        typography: '{typography.caption}'
        rounded: '{rounded.sm}'
        padding: 2px 8px
    stepper-node-done:
        backgroundColor: '{colors.primary}'
        textColor: '{colors.on-primary}'
        typography: '{typography.caption}'
        rounded: '{rounded.full}'
    stepper-node-current:
        backgroundColor: '{colors.canvas}'
        textColor: '{colors.primary-text}'
        typography: '{typography.caption}'
        rounded: '{rounded.full}'
    stepper-node-todo:
        backgroundColor: '{colors.surface-2}'
        textColor: '{colors.ink-subtle}'
        typography: '{typography.caption}'
        rounded: '{rounded.full}'
    top-nav:
        backgroundColor: '{colors.canvas}'
        textColor: '{colors.ink}'
        typography: '{typography.body}'
        rounded: '{rounded.xs}'
        height: 56px
    sidebar:
        backgroundColor: '{colors.surface-1}'
        textColor: '{colors.ink-muted}'
        typography: '{typography.body}'
        rounded: '{rounded.xs}'
        padding: 12px
---

> **Xem trực tiếp:** chạy `pnpm dev` rồi mở **`/design`** — trang đó render toàn bộ thang màu,
> thang chữ và các thành phần dùng chung của file này, ở cả light lẫn dark. Đổi token thì đối chiếu
> ở đó trước khi bàn giao.
>
> **Trạng thái áp dụng**
>
> Toàn bộ palette trong file này **đã được áp vào** `src/app/globals.scss`.
> `:root` giữ bộ light (theme mặc định), `.dark` giữ bộ `dark-*`.
>
> Ánh xạ token → biến CSS:
>
> | DESIGN.md                                 | Biến CSS                                          |
> | ----------------------------------------- | ------------------------------------------------- |
> | `navy-50` … `navy-950`                    | utility `bg-navy-*`, `text-navy-*`                |
> | `canvas` / `dark-canvas`                  | `--background`                                    |
> | `surface-1` / `dark-surface-1`            | `--card`, `--muted` (light)                       |
> | `surface-2` / `dark-surface-2`            | `--secondary`, `--popover` (dark)                 |
> | `surface-3` / `dark-surface-3`            | `--accent` (light), `--muted` (dark)              |
> | `dark-surface-4`                          | `--accent` (dark)                                 |
> | `ink` / `dark-ink`                        | `--foreground`                                    |
> | `ink-muted`                               | `--ink-muted`                                     |
> | `ink-subtle`                              | `--muted-foreground`                              |
> | `primary`                                 | `--primary`                                       |
> | `primary-text`                            | `--primary-text` (chữ màu primary)                |
> | `primary-hover`                           | `--primary-hover`                                 |
> | `primary-active`                          | `--primary-active`                                |
> | `primary-focus`                           | `--ring`                                          |
> | `hairline`                                | `--border`                                        |
> | `control-edge`                            | `--control-edge` (cạnh của điều khiển)            |
> | `hairline-strong`                         | `--hairline-strong`, `--input`                    |
> | `hairline-tertiary`                       | `--hairline-tertiary`                             |
> | `success` / `warning` / `danger` / `info` | `--success` … `--info` + `-foreground`, `-subtle` |
>
> Thang `rounded` đặt giá trị tuyệt đối trong `@theme`, **không** dẫn xuất bằng
> `calc(var(--radius) * n)` — cách đó cho 7.2px/9.6px, lệch khỏi thang 6/8/16.
>
> Font dùng **Geist Sans** và **Geist Mono** qua `next/font` trong `layout.tsx`.

## Overview

Base này nhắm tới ứng dụng nghiệp vụ nội bộ: người dùng mở nó tám tiếng một ngày để tra cứu và xử lý dữ liệu. Hệ thiết kế phục vụ đúng việc đó, không phục vụ ấn tượng đầu tiên.

**Light-first.** Canvas là trắng thuần `{colors.canvas}` vì nội dung chính là bản ghi, và bản ghi đọc trên nền sáng. Dark mode là bộ token đầy đủ song song, không phải bản đảo màu tự động.

**Navy là họ màu nhấn duy nhất**, nhưng mỗi vai trò lấy một **bậc khác nhau** trong cùng thang, vì mỗi vai trò có một ràng buộc tương phản riêng: nút chính và node stepper đã xong dùng `--primary`, focus ring dùng `--ring` (navy-600 ở light, navy-400 ở dark), chart slot 1 dùng navy-500, chữ màu primary dùng `--primary-text`. Không dùng navy làm nền section hay fill card.

**Thang xám lệch navy.** Mọi bậc surface và mọi bậc chữ đều mang hue 220°, không phải xám trung tính. Khác biệt nhỏ nhưng làm cả app đọc như một họ màu thay vì navy dán lên nền xám.

**Phân cấp bằng surface và hairline, không bằng đổ bóng.** Thang ba bậc ở light (`canvas → surface-1 → surface-2 → surface-3`) và bốn bậc ở dark, cộng viền 1px.

**Hai trụ ngôn ngữ thị giác** là **technical** và **visualize**, mô tả riêng ở mục dưới.

## Colors

### Brand và Primary là hai việc khác nhau

Đây là điểm dễ nhầm nhất của hệ này, nên nói trước tất cả.

|             | `--brand`                                                               | `--primary`                                                                                                        |
| ----------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Việc nó làm | Nhận diện thương hiệu                                                   | Màu hành động                                                                                                      |
| Dùng ở đâu  | Dấu logo, và chỉ ở đó                                                   | Nút chính và node stepper đã xong. Focus ring dùng `--ring`, chart slot 1 dùng navy-500, chữ dùng `--primary-text` |
| Light       | `#203868`                                                               | `#203868`                                                                                                          |
| Dark        | **`#203868`** (giữ nguyên)                                              | `#3a65bb` (navy-500)                                                                                               |
| Vì sao      | Logo không phải điều khiển nên không chịu ràng buộc tương phản của WCAG | Nút bắt buộc tách khỏi nền tối thiểu 3:1                                                                           |

`#203868` trên canvas tối `#080b12` chỉ đạt **1.7:1**. Với một cái nút thì đó là lỗi accessibility, nút gần như tàng hình. Với dấu logo thì không: nó không phải thứ người dùng bấm, chữ trắng bên trong vẫn đạt 11.5:1, và `--brand-edge` vẽ một viền hairline ở dark để thấy cạnh.

Nên **màu thương hiệu bạn nhìn thấy trên logo luôn đúng `#203868` ở cả hai theme**. Chỉ màu nút mới đổi bậc.

Dùng `BrandMark` (`src/components/layout/BrandMark.tsx`) cho logo, đừng tự dựng bằng `bg-primary`.

### Thang navy

`{colors.navy-800}` #203868 là anchor thương hiệu. Toàn bộ thang giữ hue 220°, chỉ đổi lightness và saturation.

| Bậc                 | Hex     | Dùng cho                                   |
| ------------------- | ------- | ------------------------------------------ |
| `{colors.navy-50}`  | #eff3fb | nền nhấn rất nhạt ở light                  |
| `{colors.navy-100}` | #dbe4f5 | `info-subtle` ở light                      |
| `{colors.navy-200}` | #b8c9ea | viền nhấn, thanh chart nhạt                |
| `{colors.navy-300}` | #8aa5db | `info` ở dark, stage-1 light, stage-4 dark |
| `{colors.navy-400}` | #5b81cd | focus ring dark, chart-1 dark              |
| `{colors.navy-500}` | #3a65bb | **primary ở dark**, chart-1 light          |
| `{colors.navy-600}` | #30549c | focus ring light, primary-active dark      |
| `{colors.navy-700}` | #284581 | primary-hover light                        |
| `{colors.navy-800}` | #203868 | **primary ở light — anchor thương hiệu**   |
| `{colors.navy-900}` | #182a4e | primary-active light                       |
| `{colors.navy-950}` | #0f1b33 | nền navy đặc, hiếm dùng                    |

**Vì sao primary đổi bậc giữa hai theme.** Navy-800 có luminance 0.041. Trên canvas dark #080b12 nó chỉ tách khỏi nền **1.7:1**, dưới ngưỡng WCAG 3:1 cho ranh giới component — nút sẽ gần như tàng hình. Nên dark mode dùng navy-500, đạt **3.5:1** với canvas và **5.6:1** cho chữ trắng. Cùng hue, cùng thương hiệu, khác bậc.

### Surface

| Vai trò                         | Light    | Dark    |
| ------------------------------- | -------- | ------- |
| canvas                          | #ffffff  | #080b12 |
| surface-1 (panel, sidebar)      | #f4f6fa  | #0d121c |
| surface-2 (panel lồng, popover) | #edf1f7  | #121926 |
| surface-3                       | #e6ebf3  | #182030 |
| surface-4                       | không có | #1d2739 |

Light chỉ cần ba bậc vì nền trắng đã là mốc; dark cần bốn vì phải tách nhiều lớp trên nền tối.

### Text

| Cấp | Token                                  | Light   | Dark    | Tương phản trên canvas   |
| --- | -------------------------------------- | ------- | ------- | ------------------------ |
| 1   | `ink` → `text-foreground`              | #0b1220 | #eef1f7 | ≥ 16:1                   |
| 2   | `ink-muted` → `text-ink-muted`         | #3a4356 | #c3ccdd | 9.9:1 light              |
| 3   | `ink-subtle` → `text-muted-foreground` | #5b6679 | #8794ac | 5.8:1 light · 6.4:1 dark |

**KHÔNG dùng opacity trên chữ.** `text-muted-foreground/60` phá tương phản đã tính. Phân cấp bằng ba token trên.

### Semantic

Bốn màu, chỉ dành cho **trạng thái nghiệp vụ thật** của bản ghi.

| Trạng thái             | Token     | Light                | Dark                 |
| ---------------------- | --------- | -------------------- | -------------------- |
| Hoàn tất, đã lưu trữ   | `success` | #15683f trên #e3f3ea | #4fbe84 trên #10261b |
| Chờ xử lý, sắp hết hạn | `warning` | #8a5a00 trên #fbf0dc | #d6a045 trên #2a2013 |
| Từ chối, quá hạn, lỗi  | `danger`  | #a32219 trên #fbe6e4 | #e9837a trên #2c1715 |
| Đang xử lý, thông tin  | `info`    | #203868 trên #dbe4f5 | #8aa5db trên #16203a |

Mọi cặp chữ-trên-nền ở trên đều đạt tối thiểu **5.2:1**, qua WCAG AA.

**Luật dùng.** Semantic **luôn đi kèm nhãn chữ hoặc icon**, không bao giờ đứng một mình bằng màu. Người mù màu và người in đen trắng vẫn phải đọc được trạng thái bản ghi. Không dùng bốn màu này cho trang trí, cho series biểu đồ, hay cho phân loại phòng ban.

### Chart

Bộ categorical đã chạy qua `scripts/validate_palette.js` của skill `dataviz` và **pass toàn bộ** ở cả hai mode: dải lightness, sàn chroma, tách biệt mù màu (ΔE ≥ 8), sàn thị lực thường (ΔE ≥ 15), tương phản với nền.

| Slot        | Light   | Dark    |
| ----------- | ------- | ------- |
| `--chart-1` | #3a65bb | #5b81cd |
| `--chart-2` | #eb6834 | #d95926 |
| `--chart-3` | #1baf7a | #199e70 |
| `--chart-4` | #eda100 | #c98500 |
| `--chart-5` | #e87ba4 | #d55181 |

**Gán màu theo thứ tự cố định, không xoay vòng.** Series thứ 6 trở đi gộp vào "Khác" hoặc tách thành small multiples, không sinh thêm hue.

⚠️ **Relief rule ở light mode.** `--chart-3`, `--chart-4`, `--chart-5` nằm dưới 3:1 trên nền trắng. Biểu đồ dùng chúng **bắt buộc** có nhãn trực tiếp hoặc bảng dữ liệu kèm theo. Không được để màu tự nói. Dark mode cả 5 slot đều ≥ 3:1 nên không cần.

### Ordinal — tiến trình

Một hue, sáng → đậm, dùng cho stepper, funnel, thanh tiến độ nhiều chặng. Đã validate `--ordinal`: đơn điệu về lightness, khoảng cách bậc ≥ 0.06, đầu nhạt vẫn ≥ 2:1 với nền.

| Bậc         | Light   | Dark    |
| ----------- | ------- | ------- |
| `--stage-1` | #8aa5db | #30549c |
| `--stage-2` | #5b81cd | #3a65bb |
| `--stage-3` | #3a65bb | #5b81cd |
| `--stage-4` | #284581 | #8aa5db |

Bậc nhạt hơn `navy-200` **không** dùng được ở light: #b8c9ea chỉ đạt 1.67:1 trên trắng, dưới sàn 2:1.

## Typography

**Geist Sans** cho mọi chữ, **Geist Mono** cho dữ liệu máy. Không dùng serif. Không dùng font thứ ba.

### Thang chữ toàn số nguyên

Mọi giá trị dưới đây là **số nguyên chẵn**. Không có 11px, 13px, cũng không có tracking thập phân kiểu -0.3px hay +0.8px.

`line-height` đặt bằng **px trên lưới 4px** thay vì tỷ lệ thập phân (1.15, 1.55…), nên mọi dòng chữ luôn khớp lưới dọc. `letter-spacing` chỉ nhận đúng ba giá trị: **-1px, 0, +1px**.

| Token                     | Size | Line-height | Tracking | Weight | Utility           | Dùng cho                      |
| ------------------------- | ---- | ----------- | -------- | ------ | ----------------- | ----------------------------- |
| `{typography.display-lg}` | 40px | 48px        | -1px     | 600    | `text-display-lg` | Tiêu đề trang lớn nhất        |
| `{typography.display-md}` | 32px | 40px        | -1px     | 600    | `text-display-md` | Số liệu trong stat tile       |
| `{typography.headline}`   | 24px | 32px        | -1px     | 600    | `text-headline`   | Tiêu đề trang                 |
| `{typography.section}`    | 20px | 28px        | 0        | 600    | `text-section`    | Tiêu đề khối                  |
| `{typography.title}`      | 18px | 24px        | 0        | 500    | `text-title`      | Tiêu đề card, tên bản ghi     |
| `{typography.body-lg}`    | 16px | 24px        | 0        | 400    | `text-body-lg`    | Đoạn dẫn                      |
| `{typography.body}`       | 14px | 20px        | 0        | 400    | `text-body`       | **Mặc định toàn app**         |
| `{typography.caption}`    | 12px | 16px        | 0        | 400    | `text-caption`    | Meta, nhãn badge, mô tả phụ   |
| `{typography.eyebrow}`    | 12px | 16px        | +1px     | 500    | `text-eyebrow`    | Nhãn phân loại khối, viết hoa |

Mono dùng chung cỡ với thang trên, chỉ đổi họ chữ: `font-mono text-body` cho mã bản ghi và ID, `font-mono text-caption` cho timestamp và số hiệu bước.

### Dùng utility, không viết giá trị tay

Mỗi token đã gói sẵn **size + line-height + tracking + weight** trong `globals.scss`, nên chỉ cần một class:

```tsx
// ✅ ĐÚNG
<h2 className="text-section text-foreground">Tiêu đề khối</h2>

// ❌ SAI — giá trị tay sẽ trôi khỏi thang, và đây chính là nguồn gốc của 11px/13px/0.3px
<h2 className="text-[18px] leading-[1.3] tracking-[-0.3px] font-semibold">Tiêu đề khối</h2>
```

Cần đổi weight thì thêm `font-medium` / `font-semibold`; đừng đổi size.

**Body mặc định là 14px, không phải 16px.** Đây là ứng dụng nghiệp vụ mật độ 6, không phải trang marketing. 16px chỉ dùng cho đoạn dẫn.

**Display tối đa weight 600.** Không dùng 700+.

**Eyebrow phải tiết chế.** Tối đa 1 eyebrow trên mỗi 3 khối trong cùng một màn hình. Phần lớn trường hợp tiêu đề khối tự đủ, bỏ eyebrow đi.

## Technical — trụ thứ nhất

"Technical" ở đây là quy tắc cụ thể, không phải cảm giác.

**Mono cho dữ liệu máy sinh.** Mã bản ghi (`REF-2026-0148`), ID người dùng, mã giao dịch, timestamp, số hiệu phiên bản — tất cả dùng ``font-mono` + cỡ từ thang chữ`. Chữ do người viết dùng sans. Ranh giới này phải nhất quán tuyệt đối: nhìn vào một chuỗi là biết ngay nó do hệ thống hay do người tạo ra.

**Chữ số đều cột.** Mọi cột số trong bảng, mọi stat tile, mọi bộ đếm dùng class `.numeric` (đã khai trong `globals.scss`). Không có nó, số nhảy lung tung khi giá trị đổi.

**Hairline là công cụ phân cấp chính.** Viền 1px `{colors.hairline}` chia vùng. Bề mặt nằm trong luồng (card, panel, tile) không đổ bóng; chỉ lớp nổi mới có bóng, xem mục Elevation.

**Bảng dùng đường kẻ tiết chế.** Chỉ `border-b` giữa các hàng, không kẻ cả trên lẫn dưới. Bảng trên 5 hàng cần header dính (`sticky`).

**Không trang trí giả kỹ thuật.** Cấm những thứ này vì chúng làm ra vẻ technical mà không mang thông tin:

- Nhãn phiên bản trang trí (`v1.4.2`, `build 0048`) ở nơi không phải trang phiên bản thật
- Chuỗi toạ độ, giờ, thời tiết trong header hay footer
- Đánh số khối kiểu `01 / TỔNG QUAN`, `002 · Bản ghi`
- Chấm màu đứng trước mọi mục danh sách hay mọi mục nav
- Đường kẻ ô vuông kiểu crosshair vẽ chỉ để trông "có thiết kế"

Chấm trạng thái **chỉ** hợp lệ khi nó biểu thị trạng thái bản ghi thật, và luôn kèm nhãn chữ.

**Số phải thật hoặc phải ghi rõ là mẫu.** Không bịa `92%`, `4.1×` cho đẹp. Dữ liệu demo phải có comment `{/* dữ liệu mẫu */}`.

## Visualize — trụ thứ hai

Một bộ bản ghi đi qua nhiều bước và nhiều vòng xử lý. Người dùng phải nhìn phát biết ngay: đang ở đâu, ai đang giữ, còn bao lâu.

**Tiến trình luôn hiện thành hình, không chỉ thành chữ.** Một bản ghi đang ở bước 2/4 phải có stepper, không phải dòng chữ "Bước 2". Ba dạng dùng theo ngữ cảnh:

| Dạng              | Dùng khi                                                    |
| ----------------- | ----------------------------------------------------------- |
| **Stepper ngang** | Quy trình ≤ 5 bước, hiện ở đầu trang chi tiết bản ghi       |
| **Timeline dọc**  | Lịch sử thao tác, mỗi mục có người, thời gian, hành động    |
| **Thanh tiến độ** | Trong hàng của bảng danh sách, nơi không đủ chỗ cho stepper |

**Ba trạng thái node của stepper** dùng `stepper-node-done` (nền primary), `stepper-node-current` (nền canvas, viền primary 2px, có ring), `stepper-node-todo` (nền surface-2, chữ ink-subtle). Node hiện tại là node duy nhất được phép có animation.

**Stat tile là số, không phải card.** Một stat tile gồm: nhãn `{typography.caption}` ở trên, số `{typography.display-md}` ở giữa, biến động `{typography.caption}` ở dưới. Không icon trang trí, không nền màu.

**Biểu đồ theo luật của skill `dataviz`:** một trục y duy nhất (không bao giờ hai thang), màu gán theo thực thể chứ không theo thứ hạng, legend luôn có khi từ 2 series, nhãn trực tiếp cho ≤ 4 series, lưới và trục lùi về sau.

**Không visualize thứ không cần.** Một con số duy nhất thì hiện số, đừng vẽ donut một lát. Hai giá trị so sánh thì viết hai số cạnh nhau, đừng vẽ cột.

## Motion

`MOTION_INTENSITY` của dự án đặt ở mức **4/10**: có chuyển động, nhưng mọi chuyển động phải trả lời được câu "nó truyền đạt cái gì".

**Thư viện.** `motion` (import từ `motion/react`) cho mọi thứ. `@number-flow/react` cho số biến động. Không dùng GSAP, Lenis hay Locomotive — chúng dành cho scrolltelling landing page, nhét vào app nghiệp vụ chỉ làm nặng bundle và giật bảng dữ liệu dài.

**Bốn lý do hợp lệ** để thêm animation, ngoài ra thì không:

1. **Phân cấp** — kéo mắt về node hiện tại của stepper
2. **Kể chuyện** — timeline hiện dần theo thứ tự thời gian
3. **Phản hồi** — nút lún 1px khi nhấn, toast trượt vào khi lưu xong
4. **Chuyển trạng thái** — số đổi khi lọc, hàng bảng trượt khi sắp xếp

**Thông số mặc định:** `duration 0.2s` cho phản hồi tương tác, `0.3s` cho chuyển trạng thái, easing `[0.16, 1, 0.3, 1]`. Spring `{ type: 'spring', stiffness: 100, damping: 20 }` cho chuyển động vật lý.

**Chỉ animate `transform` và `opacity`.** Không animate `width`, `height`, `top`, `left`.

**`prefers-reduced-motion` là bắt buộc.** Dùng `useReducedMotion()` của Motion và trả về trạng thái tĩnh. Vòng lặp vô hạn phải dừng hẳn.

**Cấm:** `window.addEventListener('scroll')`, `useState` cho giá trị liên tục (dùng `useMotionValue`), animation vòng lặp vô hạn trên phần tử không mang trạng thái sống, marquee, scroll hijack, con trỏ chuột tuỳ biến.

## Layout

**Base unit 4px.** Token: `{spacing.xxs}` 4 · `{spacing.xs}` 8 · `{spacing.sm}` 12 · `{spacing.md}` 16 · `{spacing.lg}` 24 · `{spacing.xl}` 32 · `{spacing.xxl}` 48 · `{spacing.section}` 64.

**Mật độ 6/10.** Khoảng cách giữa các khối là 32-48px, không phải 96px của trang marketing. Padding panel 24px, panel lồng 16px, ô bảng 12px dọc.

**Container** tối đa 1400px, căn giữa, `px-4` ở mobile và `px-6` từ `md` trở lên.

**Grid, không phải flex math.** Dùng `grid grid-cols-1 md:grid-cols-3 gap-4`, không dùng `w-[calc(33%-1rem)]`.

**Chiều cao viewport** dùng `min-h-[100dvh]`, không dùng `h-screen`.

**Layout đối xứng.** `DESIGN_VARIANCE` của dự án là **3/10**. App nghiệp vụ cần bố cục đoán trước được: lưới đều, căn trái, không lệch nghệ thuật, không masonry.

## Elevation

| Bậc | Xử lý                                    | Dùng cho                        |
| --- | ---------------------------------------- | ------------------------------- |
| 0   | Không viền, không nền                    | Chữ trên canvas                 |
| 1   | `surface-1` + viền 1px `hairline`        | Panel, sidebar, card            |
| 2   | `surface-2` + viền 1px `hairline-strong` | Panel lồng, popover, hàng hover |
| 3   | `surface-3` (light) / `surface-4` (dark) | Dòng đang hover, mục đang chọn  |
| 4   | Ring 2px `ring` ở 50% (`ring-2`)         | Phần tử đang focus              |

**Bậc 0 đến 4 là các lớp NẰM TRONG luồng bản ghi và không đổ bóng.** Chiều sâu do thang surface và viền hairline tạo ra. Popover, dropdown, tooltip, dialog, sheet không nằm trong thang này - chúng là lớp nổi, xem mục ngay dưới.

### Cạnh của điều khiển khác cạnh chia vùng

`--border` (hairline) chỉ có nhiệm vụ **chia vùng**, nên nó mờ là đúng: 1.3:1 với nền. Nhưng một cái nút thì cần cạnh nói được "thứ này bấm được", và WCAG 1.4.11 yêu cầu ranh giới của component đạt **3:1**.

Đo bản shadcn gốc: `secondary` chỉ đạt **1.13:1**, `outline` **1.29:1**, `destructive` **1.25:1** - nghĩa là chúng chỉ nhận ra được nhờ chữ bên trong, còn hình dáng nút thì gần như tàng hình trên nền sáng.

Nên có token riêng `--control-edge`, đậm hơn hairline:

|                                    | Light                 | Dark                  |
| ---------------------------------- | --------------------- | --------------------- |
| `--border` (chia vùng)             | `#dde3ed` · 1.3:1     | `#273249`             |
| `--control-edge` (cạnh điều khiển) | `#7d8899` · **3.6:1** | `#5b6883` · **3.5:1** |

Áp cho `secondary` và `outline`. `destructive` dùng `border-destructive/60` để cạnh mang đúng màu cảnh báo mà vẫn đạt 3.2:1.

**`ghost` và `link` cố ý KHÔNG có cạnh.** Chúng sống trong thanh công cụ và hàng bảng, nơi ngữ cảnh xung quanh đã nói chúng bấm được. Thêm cạnh cho hai variant này là hiểu sai công dụng của chúng.

### Lớp nổi là ngoại lệ duy nhất

Popover, dropdown, tooltip, dialog, sheet, command không nằm trong luồng bản ghi, chúng nổi lên trên nó. Trên canvas trắng thì một đường viền 1px không đủ nói rằng lớp đó ở trên, nên đây là chỗ duy nhất được đổ bóng.

Bóng nhuộm theo hue của mực (`--shadow-rgb: 11 18 32` ở light) chứ không dùng đen thuần, và rất tiết chế. Thang `--shadow-*` khai trong `globals.scss` đè lên thang mặc định của Tailwind, nên các class `shadow-md` / `shadow-lg` / `shadow-xl` có sẵn trong file shadcn tự nhận đúng giá trị này.

Ở dark, bóng nhuộm màu gần như vô hình nên chuyển sang đen thuần và tăng cường độ (`--shadow-strength: 2.5`).

**Đừng dùng `shadow-*` ngoài lớp nổi.** Card, panel, stat tile, hàng bảng đều phân cấp bằng surface và hairline.

## Shapes

Một hệ bo góc duy nhất, áp dụng khắp nơi:

| Token            | Value  | Dùng cho                       |
| ---------------- | ------ | ------------------------------ |
| `{rounded.2xs}`  | 2px    | Ô màu nhỏ dưới 12px            |
| `{rounded.xs}`   | 4px    | Hàng bảng, chip nhỏ            |
| `{rounded.sm}`   | 6px    | Status badge, tag              |
| `{rounded.md}`   | 8px    | **Mọi nút, mọi input**         |
| `{rounded.lg}`   | 12px   | Panel, card, stat tile         |
| `{rounded.xl}`   | 16px   | Panel lớn, khung xem bản ghi   |
| `{rounded.pill}` | 9999px | **Chỉ** node stepper và avatar |

**Không bo pill cho nút.** Nút luôn `{rounded.md}` 8px.

## Responsive

| Tên        | Width  | Thay đổi chính                                        |
| ---------- | ------ | ----------------------------------------------------- |
| Desktop-XL | 1440px | Bố cục đầy đủ, sidebar mở                             |
| Desktop    | 1280px | Sidebar mở, bảng đủ cột                               |
| Tablet     | 1024px | Sidebar thu thành icon, bảng ẩn cột phụ               |
| Mobile-Lg  | 768px  | Sidebar thành sheet, stepper ngang → dọc, bảng → card |
| Mobile     | 480px  | Một cột, stat tile xếp dọc, display-lg → headline     |

**Mỗi layout nhiều cột phải khai rõ cách sập ở `< 768px` ngay trong component**, không giả định Tailwind tự lo.

**Vùng chạm.** Thang chiều cao của điều khiển (24 / 28 / 32 / 36px) là thang cho chuột, đúng với mật độ của ứng dụng nghiệp vụ. Trên thiết bị trỏ thô, `globals.scss` nâng nút và các ô nhập (6 data-slot liệt kê trong file) lên tối thiểu 44px qua `@media (pointer: coarse)`, nên KHÔNG ép chiều cao bằng tay trong code.

## Do's and Don'ts

### Do

- Giữ navy cho nút chính, focus ring, node stepper đã xong và chart slot 1, mỗi vai trò một bậc trong cùng thang
- Phân cấp bằng thang surface và hairline 1px
- Dùng mono cho mọi chuỗi do máy sinh, sans cho mọi chuỗi do người viết
- Đặt `.numeric` lên mọi cột số
- Kèm nhãn chữ cho mọi màu semantic
- Định nghĩa màu mới cho **cả hai** theme cùng lúc
- Kiểm tra tương phản trước khi thêm bất kỳ cặp màu nào

### Don't

- Đừng dùng navy làm nền section hay fill card
- Đừng thêm accent thứ hai ngoài bộ semantic bốn màu đã định
- Đừng dùng opacity trên chữ để tạo phân cấp
- Đừng đổ bóng lên bề mặt nằm trong luồng (card, panel, tile)
- Đừng bo pill cho nút
- Đừng để một khối lật sang theme ngược với phần còn lại của trang
- Đừng dùng màu semantic cho series biểu đồ
- Đừng để biểu đồ light mode dùng chart-3/4/5 mà thiếu nhãn trực tiếp
- Đừng thêm animation không trả lời được "nó truyền đạt cái gì"

## Hoà giải với shadcn

`src/components/ui/` do `npx shadcn add` sinh ra và mặc định của nó không khớp hệ này. Có hai cách chữa, và **ưu tiên cách thứ nhất**.

### Cách 1 (ưu tiên): đè ở tầng token, không sửa file

Phần lớn lệch lạc chữa được bằng cách định nghĩa lại token trong `@theme` của `globals.scss`. Cách này không đụng file nào nên `shadcn add` chạy lại vẫn an toàn.

| Vấn đề                                                                      | Cách chữa                                                                                                                |
| --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| 43 file dùng `text-sm` / `text-xs` / `text-2xl`…                            | 5 trong 8 bậc của Tailwind đã trùng thang này sẵn. Chỉnh 3 bậc lệch (`lg`, `3xl`, `4xl`) là cả 43 file tự rơi đúng thang |
| `tracking-tight` / `tracking-widest` cho ra số thập phân                    | Ánh xạ toàn bộ `--tracking-*` về ba giá trị -1px / 0 / +1px                                                              |
| `shadow-md` / `shadow-lg` / `shadow-xl` mặc định quá nặng và dùng đen thuần | Định nghĩa lại thang `--shadow-*` thành bóng nhuộm theo hue của mực, rất tiết chế                                        |
| Điều khiển cao 24-36px, nhỏ hơn ngưỡng chạm 44px                            | Một khối `@media (pointer: coarse)` trong `@layer base` nâng min-height, không cần sửa component                         |

### Luật số: không có số lẻ, không có số thập phân

Áp cho **cả** code của app lẫn `src/components/ui/`. Bản shadcn sinh ra vi phạm ở khá nhiều chỗ và đã được dọn:

| Giá trị cũ                                              | Ở đâu                                      | Đổi thành                                                                  |
| ------------------------------------------------------- | ------------------------------------------ | -------------------------------------------------------------------------- |
| `ring-[3px]` và `ring-3`                                | 21 file, focus ring                        | `ring-2` (2px, vẫn đạt WCAG 2.2, và là chuẩn của Material, Fluent, Primer) |
| `h-[18.4px]`                                            | `switch.tsx`, chiều cao track              | `h-4.5` (18px), phép tính `translate-x` giữ nguyên                         |
| `text-[0.8rem]` (12.8px)                                | `button.tsx`, `toggle.tsx`, `calendar.tsx` | `text-xs` (12px)                                                           |
| `p-[3px]`                                               | `tabs.tsx`, `menubar.tsx`                  | `p-1` (4px)                                                                |
| `bottom-[-5px]`                                         | `tabs.tsx`, offset indicator               | `-bottom-1` (-4px)                                                         |
| `border-[1.5px]`                                        | `chart.tsx`, indicator dashed              | `border-2`                                                                 |
| `ml-[-0.3rem]` (-4.8px), `ml-[-0.15rem]` (-2.4px)       | `input-group.tsx`                          | `-ml-1`, `-ml-0.5`                                                         |
| `rounded-[2px]`, `rounded-[4px]`, `w-[2px]`, `py-[2px]` | nhiều file                                 | Đưa về token `rounded-2xs`, `rounded-xs`, `w-0.5`, `py-0.5`                |

Sau khi dọn, mọi giá trị px tuỳ ý còn lại trong `src/` đều là bội số của 4: `1400` (container), `100` (tay cầm drawer), `96` (bề rộng tối thiểu dropdown).

**Cách kiểm tra lại sau này** (lệnh này KHÔNG bắt được px nằm trong `calc()` hay `min()` - hiện còn 7px và 9px trong `input-group.tsx` do dẫn xuất từ `--radius`):

```bash
# Bắt số lẻ và số thập phân trong mọi giá trị tuỳ ý
grep -rnoE '\[-?[0-9]*[13579]px\]|\[-?[0-9]+\.[0-9]+px\]|\[-?[0-9.]+(rem|em)\]' src/
```

### Cách 2: sửa tay, chỉ khi cách 1 bất khả

Bo góc không chữa được ở tầng token vì shadcn dùng `rounded-lg` cho **cả** điều khiển lẫn panel, mà hệ này quy định 8px cho điều khiển và 12px cho panel. Nên các file sau đã sửa tay:

| File                                                                                                                         | Sửa gì                                           | Vì sao                                                                          |
| ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------- |
| `button.tsx`                                                                                                                 | `rounded-lg` → `rounded-md` (5 chỗ)              | Nút phải bo 8px                                                                 |
| `button.tsx`                                                                                                                 | `hover:bg-primary/80` → `hover:bg-primary-hover` | Bản mặc định chỉ giảm opacity nên nút lẫn vào nền thay vì đổi bậc navy          |
| `input.tsx` · `textarea.tsx` · `native-select.tsx` · `toggle.tsx` · `toggle-group.tsx` · `input-otp.tsx` · `input-group.tsx` | `rounded-lg` → `rounded-md`                      | Cùng lý do                                                                      |
| `select.tsx`                                                                                                                 | `rounded-lg` → `rounded-md` **chỉ ở trigger**    | Trigger là điều khiển (8px), content là panel nên giữ 12px                      |
| `combobox.tsx`                                                                                                               | `rounded-lg` → `rounded-md` **chỉ ở trigger**    | Cùng lý do                                                                      |
| `empty.tsx`                                                                                                                  | `text-sm/relaxed` → `text-sm`                    | `/relaxed` cho line-height 22.75px, lệch khỏi lưới 4px                          |
| `badge.tsx`                                                                                                                  | `rounded-4xl` → `rounded-sm`                     | Bo 40px biến badge thành hình pill, mà pill chỉ dành cho node stepper và avatar |
| `button.tsx` · `badge.tsx` · `empty.tsx` · `field.tsx` · `item.tsx`                                                          | `text-primary` → `text-primary-text`             | Primary làm chữ ở dark chỉ đạt 3.4:1, trượt AA                                  |
| 21 file (focus ring)                                                                                                         | `ring-3` và `ring-[3px]` → `ring-2`              | 3 là số lẻ; 2px là chuẩn công nghiệp và vẫn đạt WCAG 2.2                        |

⚠️ **Chạy lại `npx shadcn add <tên>` sẽ ghi đè các sửa đổi trên.** Sau mỗi lần thêm component mới, kiểm lại bảng này và áp lại phần liên quan.

## Known gaps

- **Chưa dựng:** xác thực, danh sách và chi tiết bản ghi - đó là việc của từng dự án dẫn xuất. Token và quy tắc ở đây đã sẵn cho chúng.
- **Chưa quyết:** cách phân trang bảng dữ liệu lớn.
- **Chưa có bản ghi:** trạng thái lỗi của form nhiều bước khi người dùng quay lại bước trước.
- Biểu đồ mới có bản mẫu ở `/design`; chưa tách thành component tái sử dụng.
