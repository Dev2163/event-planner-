import { useState } from 'react';
import SplashScreen from '@/components/SplashScreen';

interface AppWrapperProps {
    children: React.ReactNode;
}

const AppWrapper = ({ children }: AppWrapperProps) => {
    const [showSplash, setShowSplash] = useState(true);

    const handleSplashComplete = () => {
        setShowSplash(false);
    };

    if (showSplash) {
        return <SplashScreen onComplete={handleSplashComplete} duration={3000} />;
    }

    return <>{children}</>;
};

export default AppWrapper;
