import { useNavigate } from 'react-router-dom';
import { EPageRoutes } from '../../../../router/Enums';
import styles from './index.module.scss';

export default function MainMenu(): JSX.Element {
    const navigate = useNavigate();

    const onLogout = () => {
        //TODO: Обработка выхода из аккаунта
        console.count('Logout');
    };

    const handleNavigate = (path: string) => navigate(`/${path}`);

    return (
        <div className={styles['menu-wrap']}>
            <div className={styles['main-icon']}></div>
            <h1 className={styles.title}>Infinity Jump</h1>
            <p>
                Добро пожаловать в Infinity Jump - бесконечную 2D
                игру-платформер, где твоя цель - прыгать как можно выше и
                набирать максимальное количество очков!
            </p>
            <p>Готов ли ты к бесконечному прыжку?</p>
            <p>Нажми "Играть" и начни свой путь к вершине!</p>
            <div className={styles['buttons-wrap']}>
                <button
                    className={styles.button}
                    type="button"
                    onClick={() => handleNavigate(EPageRoutes.GAME_PAGE)}>
                    Играть
                </button>
                <button
                    className={styles.button}
                    type="button"
                    onClick={() =>
                        handleNavigate(EPageRoutes.LEADER_BOARD_PAGE)
                    }>
                    Таблица лидеров
                </button>
                <button
                    className={styles.button}
                    type="button"
                    onClick={() => handleNavigate(EPageRoutes.PROFILE_PAGE)}>
                    Профиль
                </button>
                <button
                    className={styles.button}
                    type="button"
                    onClick={() => handleNavigate(EPageRoutes.FORUM_PAGE)}>
                    Форум
                </button>
                <button
                    className={styles.button}
                    type="button"
                    onClick={onLogout}>
                    Выйти
                </button>
            </div>
        </div>
    );
}
