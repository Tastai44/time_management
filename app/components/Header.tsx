'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const router = usePathname();
  if (router === "/" || router === "/login") return null;

  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-background/80 backdrop-blur-md border-b border-border px-4 md:px-8 py-3 flex justify-between items-center transition-all duration-300">
      <div className="text-xl font-bold tracking-tight text-foreground">
        <span className="text-primary">Time</span>Master
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-8">
        <NavLink href="/home" active={router === '/home'}>Home</NavLink>
        <NavLink href="/calendar" active={router === '/calendar'}>Calendar</NavLink>
        <NavLink href="/history" active={router === '/history'}>History</NavLink>
        <NavLink href="/profile" active={router === '/profile'}>Profile</NavLink>
      </nav>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        <div className="hidden md:block">
          <Link href="/addEditTask" className="bg-primary text-primary-foreground hover:bg-primary/90 px-5 py-2.5 rounded-full text-sm font-medium transition-all shadow-lg hover:shadow-primary/25">
            + New Task
          </Link>
        </div>
      </div>
    </header>
  );
}

function NavLink({ href, children, active }: { href: string; children: React.ReactNode; active: boolean; }) {
  return (
    <Link href={href} className={`text-sm font-medium transition-colors ${active ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}>
      {children}
    </Link>
  );
}
