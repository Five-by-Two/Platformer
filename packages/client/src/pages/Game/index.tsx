import GameStart from './Components/GameStart';
import { useNavigate } from 'react-router-dom';
import { EPageRoutes } from '../../router/Enums';
import GameOver from './Components/GameOver';
import styles from './index.module.scss';
import { useCallback, useEffect, useRef } from 'react';
import { initGame } from './GameLogic/scripts/initGame';
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks';
import { gameOverSelector, gameStartedSelector } from '@/store/gameSlice/Selectors';
import { setGameOverAction, setGameStartedAction } from '@/store/gameSlice/Actions';

export function GamePage(): JSX.Element {
    const isGameStarted = useAppSelector(gameStartedSelector);
    const isGameOver = useAppSelector(gameOverSelector);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const canvas = canvasRef.current;

        if (canvas) {
            initGame(canvas);
        }
    }, []);

    const navigate = useNavigate();

    const backToMenu = () => {
        navigate(`/${EPageRoutes.HOME_PAGE}`);
    };

    const startGame = useCallback(() => {
        dispatch(setGameStartedAction(true));
        dispatch(setGameOverAction(false));
    }, [dispatch]);

    return (
        <>
            <section className={`${styles['game-start']} ${isGameStarted ? '' : styles['hidden']}`}>
                <canvas className={styles['canvas']} ref={canvasRef}></canvas>
            </section>

            {isGameStarted ? (
                <></>
            ) : (
                <>
                    <GameStart onStart={startGame} onBackToMenu={backToMenu} />
                </>
            )}

            {isGameOver && <GameOver onStart={startGame} onBackToMenu={backToMenu} score={1} bestScore={1000} />}
        </>
    );
}
