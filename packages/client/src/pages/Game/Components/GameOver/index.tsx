import { FC } from 'react';
import Button from '../../../../components/button';
import trophyIcon from '../../../../assets/icons/trophy.png';
import styles from './index.module.scss';

type GameOverProps = {
    onStart: VoidFunction;
    onBackToMenu: VoidFunction;
    onToLeaderboard: VoidFunction;
    score: number;
    bestScore: number;
};
const GameOver: FC<GameOverProps> = ({
    onStart,
    onBackToMenu,
    onToLeaderboard,
    score,
    bestScore,
}) => {
    return (
        <section className={styles['game-start']}>
            <div className={`${styles.wrap} ${styles['game-over-wrap']}`}>
                <img
                    src={trophyIcon}
                    className={styles.trophy}
                    alt="Иконка трофея"
                />
                <h2 className={styles['title-score']}>Счёт: {score}</h2>
                <p className={styles['title-best-score']}>
                    Ваш лучший результат: {bestScore}
                </p>
                <div className={styles['buttons-wrap']}>
                    <Button text="Повторить" onClick={onStart} />
                    <Button text="Таблица лидеров" onClick={onToLeaderboard} />
                    <Button
                        text="Выйти в главное меню"
                        onClick={onBackToMenu}
                    />
                </div>
            </div>
        </section>
    );
};

export default GameOver;
