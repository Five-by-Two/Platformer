import { useNavigate } from 'react-router-dom';
import Button from '../../../../components/button';
import { EPageRoutes } from '../../../../router/Enums';
import styles from './index.module.scss';
import { useAppDispatch } from '@/hooks/redux-hooks';
import { deleteUser } from '@/store/thunks';

export default function MainMenu(): JSX.Element {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const onLogout = () => {
        dispatch(deleteUser()).then(res => {
            if (res.meta.requestStatus === 'fulfilled') {
                navigate(`/${EPageRoutes.SIGN_IN_PAGE}`);
            }
        });
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
                <Button
                    text="Играть"
                    onClick={() => handleNavigate(EPageRoutes.GAME_PAGE)}
                />
                <Button
                    text="Таблица лидеров"
                    onClick={() =>
                        handleNavigate(EPageRoutes.LEADER_BOARD_PAGE)
                    }
                />
                <Button
                    text="Профиль"
                    onClick={() => handleNavigate(EPageRoutes.PROFILE_PAGE)}
                />
                <Button
                    text="Форум"
                    onClick={() => handleNavigate(EPageRoutes.FORUM_PAGE)}
                />
                <Button text="Выйти" onClick={onLogout} />
            </div>
        </div>
    );
}
