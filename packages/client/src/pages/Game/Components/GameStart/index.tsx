import { useEffect, FC } from 'react';
import Button from '@/components/button';
import styles from '@/pages/Game/Components/GameStart/index.module.scss';

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
    }, [onStart]);

    return (
        <section className={styles['game-start']}>
            <div className={`${styles.wrap} ${styles['game-start-wrap']}`}>
                <h2 className={styles.title}>Начать игру</h2>
                <p className={styles['blinking-text']}>
                    Нажмите любую клавишу, чтобы начать игру
                </p>
                <Button text="Выйти в главное меню" onClick={onBackToMenu} />
            </div>
        </section>
    );
};

export default GameStart;
