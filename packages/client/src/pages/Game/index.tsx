import GameStart from '@/pages/Game/Components/GameStart';
import { useNavigate } from 'react-router-dom';
import { EPageRoutes } from '@/router/Enums';
import GameOver from '@/pages/Game/Components/GameOver';
import { useCallback, useEffect, useRef } from 'react';
import { initGame } from '@/pages/Game/scripts/initGame';
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks';
import { gameOver, restartGame, startGame } from '@/store/gameSlice';
import styles from '@/pages/Game/index.module.scss';

export function GamePage(): JSX.Element {
    const dispatch = useAppDispatch();
    const { isGameStarted, isGameOver } = useAppSelector(state => state.game);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const setStartGameState = useCallback(() => {
        dispatch(startGame());
    }, [dispatch]);

    const setGameOverState = useCallback(() => {
        dispatch(gameOver());
    }, [dispatch]);

    const setRestartGameState = useCallback(() => {
        dispatch(restartGame());
    }, [dispatch]);

    useEffect(() => {
        const canvas = canvasRef.current;
        console.log(canvas);
        if (canvas) {
            initGame(canvas, isGameStarted, setGameOverState);
        }
    }, [isGameStarted, setGameOverState]);

    const navigate = useNavigate();

    const backToMenu = () => {
        setRestartGameState();
        navigate(`/${EPageRoutes.HOME_PAGE}`);
    };

    return (
        <>
            <section className={styles['game-start']}>
                <canvas ref={canvasRef}></canvas>
            </section>

            {!isGameStarted && (
                <GameStart
                    onStart={setStartGameState}
                    onBackToMenu={backToMenu}
                />
            )}

            {isGameOver && isGameStarted && (
                <GameOver
                    onStart={setRestartGameState}
                    onBackToMenu={backToMenu}
                    score={1}
                    bestScore={1000}
                />
            )}
        </>
    );
}
