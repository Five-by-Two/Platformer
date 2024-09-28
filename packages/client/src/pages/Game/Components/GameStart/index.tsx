import { useEffect, FC } from 'react';
import styles from './index.module.scss';
import Button from '../../../../components/button';

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
            <div className={styles['wrap']}>
                <h2 className={styles['title']}>Начать игру</h2>
                <p className={styles['blinking-text']}>
                    Нажмите любую клавишу, чтобы начать игру
                </p>
                <Button text="Выйти в главное меню" onClick={onBackToMenu} />
            </div>
        </section>
    );
};

export default GameStart;
