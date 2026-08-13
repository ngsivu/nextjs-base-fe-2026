/**
 * Thang chuyển động dùng chung. Khai một chỗ duy nhất để không sinh ra bậc
 * thứ tư, và để đổi cả hệ chỉ bằng một lần sửa.
 *
 * Chi tiết luật xem mục Motion trong DESIGN.md.
 */

/** Phản hồi tương tác: hover, nhấn nút, đóng mở menu. */
export const MOTION_FEEDBACK = 0.2;

/** Đổi trạng thái: nội dung mới hiện ra, panel mở, chuyển tab. */
export const MOTION_STATE = 0.3;

/** Nhịp của trạng thái đang sống: chỉ báo đang xử lý, đang đồng bộ. */
export const MOTION_ALIVE = 2.4;

/**
 * Easing mặc định. Khai kiểu tuple tường minh vì `motion` nhận
 * `[number, number, number, number]`, còn `as const` cho ra kiểu readonly.
 */
export const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Cấu hình spring khi cần cảm giác vật lý. */
export const SPRING = { type: 'spring', stiffness: 100, damping: 20 } as const;
