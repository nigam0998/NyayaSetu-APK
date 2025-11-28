import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Settings } from 'lucide-react';
import { cn } from '../lib/utils';

export default function AdminMobileNav() {
    const navItems = [
        { icon: LayoutDashboard, label: 'Overview', path: '/admin' },
        { icon: Users, label: 'Users', path: '/admin/users' },
        { icon: Settings, label: 'Settings', path: '/admin/settings' },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-dark-bg/80 backdrop-blur-xl border-t border-glass-border pb-safe">
            <div className="flex items-center justify-around h-16 px-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.path === '/admin'}
                        className={({ isActive }) => cn(
                            "flex flex-col items-center justify-center w-full h-full gap-1 transition-all duration-300",
                            isActive ? "text-neon-purple" : "text-slate-600 dark:text-slate-400 hover:text-white"
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
                                    <span className="absolute -top-[1px] w-8 h-[2px] bg-neon-purple rounded-full shadow-[0_0_10px_#bc13fe]" />
                                )}
                            </>
                        )}
                    </NavLink>
                ))}
            </div>
        </div>
    );
}
