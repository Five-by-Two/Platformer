import { useState, useEffect } from 'react';

export const useFullScreen = () => {
    const [isFullScreen, setIsFullScreen] = useState<boolean>(!!document.fullscreenElement);

    const toggleFullScreen = async () => {
        if (!document.fullscreenElement) {
            await document.documentElement.requestFullscreen();
            setIsFullScreen(true);
        } else if (document.exitFullscreen) {
            await document.exitFullscreen();
            setIsFullScreen(false);
        }
    };

    useEffect(() => {
        const handleFullScreenChange = () => {
            setIsFullScreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', handleFullScreenChange);

        return () => {
            document.removeEventListener('fullscreenchange', handleFullScreenChange);
        };
    }, []);

    return {
        isFullScreen,
        toggleFullScreen,
    };
};
