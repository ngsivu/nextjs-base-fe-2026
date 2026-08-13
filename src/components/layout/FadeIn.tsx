'use client';

import { motion, useReducedMotion } from 'motion/react';
import { EASE_OUT, MOTION_STATE } from '@/constants/motion';

/**
 * Bọc nội dung bằng hiệu ứng mờ dần đi lên khi xuất hiện.
 *
 * Trả về đúng khung tĩnh khi người dùng yêu cầu giảm chuyển động, không dựng
 * motion. Thời lượng và easing lấy từ thang chung để không sinh ra bậc thứ tư.
 */
export function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
	const reduce = useReducedMotion();

	if (reduce) return <>{children}</>;

	return (
		<motion.div
			initial={{ opacity: 0, y: 8 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: MOTION_STATE, delay, ease: EASE_OUT }}
		>
			{children}
		</motion.div>
	);
}
