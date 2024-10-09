import GameStart from './Components/GameStart';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { EPageRoutes } from '../../router/Enums';
import GameOver from './Components/GameOver';
import styles from './index.module.scss';
import { useEffect, useRef } from 'react';
import { initGame } from './GameLogic/scripts/initGame';

export function GamePage(): JSX.Element {
    const [isGameStarted, setIsGameStarted] = useState(true);
    const [isGameOver, setIsGameOver] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            initGame(canvas);
        }
    }, []);

    const navigate = useNavigate();
    const startGame = () => {
        setIsGameStarted(true);
        setIsGameOver(false);
    };
    const backToMenu = () => {
        navigate(`/${EPageRoutes.HOME_PAGE}`);
    };
    const toLeaderBoard = () => {
        navigate(`/${EPageRoutes.LEADER_BOARD_PAGE}`);
    };

    return (
        <>
            <section
                className={`${styles['game-start']} ${
                    isGameStarted ? '' : styles['hidden']
                }`}>
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
