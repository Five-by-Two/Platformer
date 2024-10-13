import GameStart from '@/pages/Game/Components/GameStart';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { EPageRoutes } from '@/router/Enums';
import GameOver from '@/pages/Game/Components/GameOver';
import styles from '@/pages/Game/index.module.scss';
import { useEffect, useRef } from 'react';
import { initGame } from '@/pages/Game/scripts/initGame';

export function GamePage(): JSX.Element {
    const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
    const [isGameOver, setIsGameOver] = useState<boolean>(false);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    // let animationId: number;
    const startGame = () => {
        setIsGameStarted(true);
        setIsGameOver(false);
        // animationId = window.requestAnimationFrame(animate);
    };

    const gameOver = () => {
        setIsGameStarted(true);
        setIsGameOver(true);
        // window.cancelAnimationFrame(animationId);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        console.log(canvas);
        if (canvas) {
            initGame(canvas, isGameStarted, startGame, gameOver);
        }
    }, [isGameStarted]);

    const navigate = useNavigate();

    const backToMenu = () => {
        navigate(`/${EPageRoutes.HOME_PAGE}`);
    };
    const toLeaderBoard = () => {
        navigate(`/${EPageRoutes.LEADER_BOARD_PAGE}`);
    };

    return (
        <>
            {/* <section
                className={`${styles['game-start']} ${
                    isGameStarted ? '' : styles['hidden']
                }`}>
                <canvas ref={canvasRef}></canvas>
            </section> */}

            <section className={styles['game-start']}>
                <canvas ref={canvasRef}></canvas>
            </section>

            {isGameStarted ? (
                <></>
            ) : (
                <GameStart onStart={startGame} onBackToMenu={backToMenu} />
            )}

            {isGameOver && (
                <GameOver
                    onStart={startGame}
                    onBackToMenu={backToMenu}
                    onToLeaderboard={toLeaderBoard}
                    score={1}
                    bestScore={1000}
                />
            )}
        </>
    );
}
