import GameStart from './GameStart';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { EPageRoutes } from '../../../router/Enums';
import GameOver from './GameOver';

export function GamePage(): JSX.Element {
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
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
            <h1>This is Game Page</h1>
            {!isGameStarted && (
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
