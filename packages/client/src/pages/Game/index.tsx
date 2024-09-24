import { useEffect, useRef } from 'react';
import { initGame } from './scripts/initGame';

export function GamePage(): JSX.Element {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;

        if (canvas) {
            initGame(canvas);
        }
    }, []);

    return <canvas ref={canvasRef}></canvas>;
}
