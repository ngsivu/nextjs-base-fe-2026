'use client';

import { motion } from 'motion/react';

/** Bọc nội dung bằng hiệu ứng mờ dần đi lên khi xuất hiện. */
export function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 8 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.25, delay, ease: 'easeOut' }}
		>
			{children}
		</motion.div>
	);
}
