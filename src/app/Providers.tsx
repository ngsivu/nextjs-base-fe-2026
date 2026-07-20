'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from '@/components/ui/sonner';
import { getQueryClient } from '@/lib/queryClient';

export function Providers({ children }: { children: React.ReactNode }) {
	const queryClient = getQueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<NuqsAdapter>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					{children}
					<Toaster richColors position="top-right" />
				</ThemeProvider>
			</NuqsAdapter>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}
