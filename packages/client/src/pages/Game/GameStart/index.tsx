import { useEffect, FC } from 'react';
import style from './GameStart.module.scss';

interface GameStartProps {
    onStart: () => void;
    onBackToMenu: () => void;
}

const GameStart: FC<GameStartProps> = ({ onStart, onBackToMenu }) => {
    useEffect(() => {
        window.addEventListener('keypress', onStart);
        return () => {
            window.removeEventListener('keypress', onStart);
        };
    }, []);

    return (
        <section className={style['game-start']}>
            <div className={style['game-start__wrap']}>
                <h2 className={style['game-start__title']}>Начать игру</h2>
                <p className={style['blinking-text']}>
                    Нажмите любую клавишу, чтобы начать игру
                </p>
                <button
                    className={style['back-to-menu-btn']}
                    onClick={onBackToMenu}>
                    Выйти в главное меню
                </button>
            </div>
        </section>
    );
};

export default GameStart;
