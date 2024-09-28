import GameStart from './Components/GameStart';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { EPageRoutes } from '../../router/Enums';

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

    return (
        <>
            <h1>This is Game Page</h1>
            {!isGameStarted && (
                <GameStart onStart={startGame} onBackToMenu={backToMenu} />
            )}
            {isGameOver && <div>Game Over screen</div>}
        </>
    );
}
