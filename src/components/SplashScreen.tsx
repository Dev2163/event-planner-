import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

interface SplashScreenProps {
    onComplete: () => void;
    duration?: number;
}

const SplashScreen = ({ onComplete, duration = 3000 }: SplashScreenProps) => {
    const [progress, setProgress] = useState(0);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        // Animate progress bar
        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return prev + 2;
            });
        }, duration / 50);

        // Fade out and complete
        const fadeTimer = setTimeout(() => {
            setFadeOut(true);
        }, duration - 500);

        const completeTimer = setTimeout(() => {
            onComplete();
        }, duration);

        return () => {
            clearInterval(progressInterval);
            clearTimeout(fadeTimer);
            clearTimeout(completeTimer);
        };
    }, [duration, onComplete]);

    return (
        <div
            className={`fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f1e] transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'
                }`}
        >
            {/* Animated Background Particles */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 bg-primary/30 rounded-full animate-float"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${3 + Math.random() * 4}s`,
                        }}
                    />
                ))}
            </div>

            {/* Main Content */}
            <div className="relative z-10 text-center px-6">
                {/* Logo/Icon */}
                <div className="mb-8 animate-scale-in">
                    <div className="relative inline-block">
                        {/* Glowing Ring */}
                        <div className="absolute inset-0 animate-pulse">
                            <div className="w-32 h-32 rounded-full border-4 border-primary/30 animate-spin-slow" />
                        </div>

                        {/* Center Icon */}
                        <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/50 rounded-full blur-xl opacity-50 animate-pulse" />
                            <Sparkles className="w-16 h-16 text-primary relative z-10 animate-bounce-slow" />
                        </div>
                    </div>
                </div>

                {/* Brand Name */}
                <div className="mb-2 animate-fade-up" style={{ animationDelay: '0.2s' }}>
                    <h1 className="font-display text-5xl md:text-6xl font-bold mb-2">
                        <span className="gold-gradient-text">Elegance</span>
                    </h1>
                    <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground/90">
                        Events
                    </h2>
                </div>

                {/* Tagline */}
                <p
                    className="text-muted-foreground text-lg mb-8 animate-fade-up"
                    style={{ animationDelay: '0.4s' }}
                >
                    Creating Magical Moments
                </p>

                {/* Progress Bar */}
                <div
                    className="w-64 mx-auto animate-fade-up"
                    style={{ animationDelay: '0.6s' }}
                >
                    <div className="h-1 bg-muted/30 rounded-full overflow-hidden backdrop-blur-sm">
                        <div
                            className="h-full bg-gradient-to-r from-primary via-primary/80 to-primary rounded-full transition-all duration-300 ease-out relative"
                            style={{ width: `${progress}%` }}
                        >
                            {/* Shimmer Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                        </div>
                    </div>

                    {/* Loading Text */}
                    <p className="text-xs text-muted-foreground mt-3 font-medium">
                        {progress < 30 && 'Preparing your experience...'}
                        {progress >= 30 && progress < 60 && 'Loading beautiful designs...'}
                        {progress >= 60 && progress < 90 && 'Almost ready...'}
                        {progress >= 90 && 'Welcome!'}
                    </p>
                </div>
               
            </div>

            {/* Bottom Decoration */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
        </div>
    );
};

export default SplashScreen;
