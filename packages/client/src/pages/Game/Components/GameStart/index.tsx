import { useEffect, FC } from 'react';
import styles from './index.module.scss';

type GameStartProps = {
    onStart: VoidFunction;
    onBackToMenu: VoidFunction;
};

const GameStart: FC<GameStartProps> = ({ onStart, onBackToMenu }) => {
    useEffect(() => {
        window.addEventListener('keypress', onStart);
        return () => {
            window.removeEventListener('keypress', onStart);
        };
    }, []);

    return (
        <section className={styles['game-start']}>
            <div className={styles['game-start__wrap']}>
                <h2 className={styles['game-start__title']}>Начать игру</h2>
                <p className={styles['blinking-text']}>
                    Нажмите любую клавишу, чтобы начать игру
                </p>
                <button
                    className={styles['back-to-menu-btn']}
                    onClick={onBackToMenu}>
                    Выйти в главное меню
                </button>
            </div>
        </section>
    );
};

export default GameStart;
