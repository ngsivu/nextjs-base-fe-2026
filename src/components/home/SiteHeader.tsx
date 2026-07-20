import Link from 'next/link';
import { ThemeToggle } from '@/components/layout/ThemeToggle';

export function SiteHeader() {
	return (
		<header className="top-0 backdrop-blur-sm sticky z-50 border-b border-border bg-background/80">
			<div className="h-14 max-w-6xl px-6 mx-auto flex items-center justify-between">
				<Link
					href="/"
					className="font-medium rounded-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
				>
					<span className="text-primary">◆</span> Base FE
				</Link>

				<nav className="gap-1 flex items-center">
					<Link
						href="/components"
						className="px-3 py-1.5 text-sm rounded-md text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
					>
						Components
					</Link>
					<a
						href="https://github.com/ngsivu/nextjs-base-fe-2026"
						target="_blank"
						rel="noreferrer"
						className="px-3 py-1.5 text-sm rounded-md text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
					>
						GitHub
					</a>
					<ThemeToggle />
				</nav>
			</div>
		</header>
	);
}
