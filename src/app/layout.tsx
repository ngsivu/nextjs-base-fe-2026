import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { AppInit } from '@/app/AppInit';
import { Providers } from '@/app/Providers';
import './globals.scss';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Base FE',
	description: 'Base frontend cho dự án mới',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="vi"
			className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
			suppressHydrationWarning
		>
			<body className="flex min-h-full flex-col">
				<Providers>
					<AppInit>{children}</AppInit>
				</Providers>
			</body>
		</html>
	);
}
