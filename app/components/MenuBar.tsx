'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MenuBar() {
    const router = usePathname();
    // Only show on main pages
    if (router === "/" || router === "/login" || router === "/addTask") return null;

    return (
        <div className="fixed bottom-0 left-0 w-full z-50 px-4 pb-4 pointer-events-none md:sticky md:top-0 md:bg-transparent md:pointer-events-none">
            {/* Mobile Bottom Bar */}
            <div className="bg-card/90 backdrop-blur-md border border-border/50 shadow-2xl rounded-2xl mx-auto max-w-md md:hidden">
                <div className="relative flex justify-between items-center px-6 py-3">
                    <NavItem href="/home" icon="fa-home" active={router === '/home'} />
                    <NavItem href="/calendar" icon="fa-calendar-alt" active={router === '/calendar'} />

                    {/* Floating Add Button Wrapper */}
                    <div className="relative -top-8">
                        <div className='bg-background w-14 h-14 rounded-full flex justify-center items-center shadow-sm ring-1 ring-border'>
                            <Link href="/addEditTask" className="w-12 h-12 bg-primary text-primary-foreground rounded-full shadow-lg flex justify-center items-center hover:bg-primary/90 transition-all transform hover:scale-105 active:scale-95">
                                <span className="text-3xl font-light mb-1">+</span>
                            </Link>
                        </div>
                    </div>

                    <NavItem href="/history" icon="fa-book" active={router === '/history'} />
                    <NavItem href="/profile" icon="fa-user" active={router === '/profile'} />
                </div>
            </div>

            {/* Desktop Navigation Placeholder (if needed in future, currently focusing on mobile-first refactor of existing bar) */}
            {/* On desktop, this bar is hidden by md:hidden above. 
                Ideally, we would have a Sidebar for desktop. For now, we focus on the requested styling update. 
            */}
        </div>
    );
}

function NavItem({ href, icon, active }: { href: string; icon: string; active: boolean; }) {
    return (
        <Link href={href} className={`flex flex-col items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 ${active
            ? 'text-primary bg-primary/10'
            : 'text-muted-foreground hover:text-primary hover:bg-muted'
            }`}>
            <i className={`fas ${icon} text-lg mb-0.5`}></i>
        </Link>
    );
}

