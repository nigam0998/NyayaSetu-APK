import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, PlusSquare, Scale, User } from 'lucide-react';
import { cn } from '../lib/utils';

export default function MobileNav() {
    const navItems = [
        { icon: Home, label: 'Home', path: '/dashboard' },
        { icon: Search, label: 'Search', path: '/dashboard/results' },
        { icon: PlusSquare, label: 'Upload', path: '/dashboard/upload' },
        { icon: Scale, label: 'Legal Aid', path: '/dashboard/legal-aid' },
        { icon: User, label: 'Profile', path: '/dashboard/account' },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-[var(--bg-primary)]/80 backdrop-blur-xl border-t border-glass-border pb-safe">
            <div className="flex items-center justify-around h-16 px-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => cn(
                            "flex flex-col items-center justify-center w-full h-full gap-1 transition-all duration-300",
                            isActive ? "text-neon-blue" : "text-slate-600 dark:text-slate-400 hover:text-[var(--text-primary)]"
                        )}
                    >
                        {({ isActive }) => (
                            <>
                                <item.icon className={cn(
                                    "w-6 h-6 transition-transform duration-300",
                                    isActive && "scale-110"
                                )} strokeWidth={isActive ? 2.5 : 2} />
                                <span className="text-[10px] font-medium">{item.label}</span>
                                {isActive && (
                                    <span className="absolute -top-[1px] w-8 h-[2px] bg-neon-blue rounded-full shadow-[0_0_10px_#00f3ff]" />
                                )}
                            </>
                        )}
                    </NavLink>
                ))}
            </div>
        </div>
    );
}
