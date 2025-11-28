import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

export default function AshokaChakra({ className, animate = true }) {
    return (
        <motion.div
            className={cn("relative flex items-center justify-center", className)}
            animate={animate ? { rotate: 360 } : {}}
            transition={animate ? {
                duration: 8,
                repeat: Infinity,
                ease: "linear"
            } : {}}
        >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-india-saffron">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <circle cx="12" cy="12" r="2" fill="currentColor" />
                {[...Array(24)].map((_, i) => (
                    <line
                        key={i}
                        x1="12"
                        y1="12"
                        x2="12"
                        y2="2"
                        stroke="currentColor"
                        strokeWidth="1"
                        transform={`rotate(${i * 15} 12 12)`}
                    />
                ))}
            </svg>
        </motion.div>
    );
}
