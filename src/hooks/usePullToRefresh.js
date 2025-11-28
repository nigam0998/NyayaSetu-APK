import { useState, useEffect } from 'react';

export function usePullToRefresh(onRefresh) {
    const [startY, setStartY] = useState(0);
    const [pullDistance, setPullDistance] = useState(0);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const threshold = 150; // Distance to pull to trigger refresh

    useEffect(() => {
        const handleTouchStart = (e) => {
            if (window.scrollY === 0) {
                setStartY(e.touches[0].clientY);
            }
        };

        const handleTouchMove = (e) => {
            if (window.scrollY === 0 && startY > 0) {
                const currentY = e.touches[0].clientY;
                const distance = currentY - startY;
                if (distance > 0) {
                    setPullDistance(distance);
                    // Prevent default scrolling only if pulling down at top
                    if (distance < threshold) {
                        // e.preventDefault(); // Optional: might block normal scroll if not careful
                    }
                }
            }
        };

        const handleTouchEnd = () => {
            if (pullDistance > threshold) {
                setIsRefreshing(true);
                if (onRefresh) {
                    onRefresh().finally(() => {
                        setIsRefreshing(false);
                        setPullDistance(0);
                    });
                } else {
                    // Simulate refresh if no handler provided
                    setTimeout(() => {
                        setIsRefreshing(false);
                        setPullDistance(0);
                    }, 2000);
                }
            } else {
                setPullDistance(0);
            }
            setStartY(0);
        };

        window.addEventListener('touchstart', handleTouchStart);
        window.addEventListener('touchmove', handleTouchMove);
        window.addEventListener('touchend', handleTouchEnd);

        return () => {
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, [startY, pullDistance, onRefresh]);

    return { isRefreshing, pullDistance };
}
