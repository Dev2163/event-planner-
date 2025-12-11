/**
 * Mobile UI Enhancements
 * Super optimized for mobile devices with gestures and animations
 */

import { useEffect, useState } from 'react';

// Detect if user is on mobile device
export const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return isMobile;
};

// Detect device type
export const useDeviceType = () => {
    const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

    useEffect(() => {
        const checkDevice = () => {
            const width = window.innerWidth;
            if (width < 640) setDeviceType('mobile');
            else if (width < 1024) setDeviceType('tablet');
            else setDeviceType('desktop');
        };

        checkDevice();
        window.addEventListener('resize', checkDevice);
        return () => window.removeEventListener('resize', checkDevice);
    }, []);

    return deviceType;
};

// Touch gesture detection
export const useTouchGesture = (onSwipeLeft?: () => void, onSwipeRight?: () => void) => {
    useEffect(() => {
        let touchStartX = 0;
        let touchEndX = 0;

        const handleTouchStart = (e: TouchEvent) => {
            touchStartX = e.changedTouches[0].screenX;
        };

        const handleTouchEnd = (e: TouchEvent) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        };

        const handleSwipe = () => {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0 && onSwipeLeft) {
                    onSwipeLeft();
                } else if (diff < 0 && onSwipeRight) {
                    onSwipeRight();
                }
            }
        };

        document.addEventListener('touchstart', handleTouchStart);
        document.addEventListener('touchend', handleTouchEnd);

        return () => {
            document.removeEventListener('touchstart', handleTouchStart);
            document.removeEventListener('touchend', handleTouchEnd);
        };
    }, [onSwipeLeft, onSwipeRight]);
};

// Scroll direction detection
export const useScrollDirection = () => {
    const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY) {
                setScrollDirection('down');
            } else if (currentScrollY < lastScrollY) {
                setScrollDirection('up');
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return scrollDirection;
};

// Viewport height fix for mobile browsers
export const useViewportHeight = () => {
    useEffect(() => {
        const setVH = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };

        setVH();
        window.addEventListener('resize', setVH);
        return () => window.removeEventListener('resize', setVH);
    }, []);
};

// Prevent zoom on double tap (iOS)
export const usePreventZoom = () => {
    useEffect(() => {
        let lastTouchEnd = 0;

        const preventZoom = (e: TouchEvent) => {
            const now = Date.now();
            if (now - lastTouchEnd <= 300) {
                e.preventDefault();
            }
            lastTouchEnd = now;
        };

        document.addEventListener('touchend', preventZoom, { passive: false });
        return () => document.removeEventListener('touchend', preventZoom);
    }, []);
};

// Safe area insets for notched devices
export const useSafeArea = () => {
    const [safeArea, setSafeArea] = useState({
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    });

    useEffect(() => {
        const updateSafeArea = () => {
            const style = getComputedStyle(document.documentElement);
            setSafeArea({
                top: parseInt(style.getPropertyValue('--sat') || '0'),
                right: parseInt(style.getPropertyValue('--sar') || '0'),
                bottom: parseInt(style.getPropertyValue('--sab') || '0'),
                left: parseInt(style.getPropertyValue('--sal') || '0'),
            });
        };

        updateSafeArea();
        window.addEventListener('resize', updateSafeArea);
        return () => window.removeEventListener('resize', updateSafeArea);
    }, []);

    return safeArea;
};

// Network status detection
export const useNetworkStatus = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    return isOnline;
};

// Battery status (if available)
export const useBatteryStatus = () => {
    const [battery, setBattery] = useState<{
        level: number;
        charging: boolean;
    } | null>(null);

    useEffect(() => {
        if ('getBattery' in navigator) {
            (navigator as any).getBattery().then((battery: any) => {
                const updateBattery = () => {
                    setBattery({
                        level: battery.level,
                        charging: battery.charging,
                    });
                };

                updateBattery();
                battery.addEventListener('levelchange', updateBattery);
                battery.addEventListener('chargingchange', updateBattery);
            });
        }
    }, []);

    return battery;
};

// Haptic feedback (vibration)
export const useHaptic = () => {
    const vibrate = (pattern: number | number[] = 10) => {
        if ('vibrate' in navigator) {
            navigator.vibrate(pattern);
        }
    };

    const lightTap = () => vibrate(10);
    const mediumTap = () => vibrate(20);
    const heavyTap = () => vibrate(30);
    const doubleTap = () => vibrate([10, 50, 10]);
    const success = () => vibrate([10, 50, 10, 50, 10]);
    const error = () => vibrate([50, 100, 50]);

    return {
        vibrate,
        lightTap,
        mediumTap,
        heavyTap,
        doubleTap,
        success,
        error,
    };
};

// Pull to refresh
export const usePullToRefresh = (onRefresh: () => Promise<void>) => {
    const [isPulling, setIsPulling] = useState(false);
    const [pullDistance, setPullDistance] = useState(0);

    useEffect(() => {
        let startY = 0;
        let currentY = 0;

        const handleTouchStart = (e: TouchEvent) => {
            if (window.scrollY === 0) {
                startY = e.touches[0].clientY;
            }
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (window.scrollY === 0 && startY > 0) {
                currentY = e.touches[0].clientY;
                const distance = currentY - startY;

                if (distance > 0) {
                    setPullDistance(distance);
                    setIsPulling(true);
                }
            }
        };

        const handleTouchEnd = async () => {
            if (pullDistance > 80) {
                await onRefresh();
            }
            setIsPulling(false);
            setPullDistance(0);
            startY = 0;
        };

        document.addEventListener('touchstart', handleTouchStart);
        document.addEventListener('touchmove', handleTouchMove);
        document.addEventListener('touchend', handleTouchEnd);

        return () => {
            document.removeEventListener('touchstart', handleTouchStart);
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
        };
    }, [pullDistance, onRefresh]);

    return { isPulling, pullDistance };
};

// Share API
export const useShare = () => {
    const canShare = 'share' in navigator;

    const share = async (data: {
        title?: string;
        text?: string;
        url?: string;
    }) => {
        if (canShare) {
            try {
                await navigator.share(data);
                return true;
            } catch (error) {
                console.error('Share failed:', error);
                return false;
            }
        }
        return false;
    };

    return { canShare, share };
};

// Install PWA prompt
export const useInstallPrompt = () => {
    const [installPrompt, setInstallPrompt] = useState<any>(null);
    const [isInstallable, setIsInstallable] = useState(false);

    useEffect(() => {
        const handleBeforeInstallPrompt = (e: Event) => {
            e.preventDefault();
            setInstallPrompt(e);
            setIsInstallable(true);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    const promptInstall = async () => {
        if (!installPrompt) return false;

        installPrompt.prompt();
        const { outcome } = await installPrompt.userChoice;

        if (outcome === 'accepted') {
            setIsInstallable(false);
            return true;
        }

        return false;
    };

    return { isInstallable, promptInstall };
};

export default {
    useIsMobile,
    useDeviceType,
    useTouchGesture,
    useScrollDirection,
    useViewportHeight,
    usePreventZoom,
    useSafeArea,
    useNetworkStatus,
    useBatteryStatus,
    useHaptic,
    usePullToRefresh,
    useShare,
    useInstallPrompt,
};
