import { useNavigate } from 'react-router';
import Button from '../../components/button';
import Avatar from './Components/Avatar';
import styles from './profie.module.scss';
import ProfileForm from './Components/ProfileForm';
import ChangePassword from './Components/ChangePassword';
import { useEffect, useState } from 'react';
import ChangeAvatar from './Components/ChangeAvatar';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import authService from '../../services/AuthService/AuthService';
import { setUser } from '../../store/userSlice';
import { EPageRoutes } from '../../router/Enums';

export function ProfilePage(): JSX.Element {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const userLogin = useAppSelector(state => state.user.user.login);
    const userAvatar = useAppSelector(state => state.user.user.avatar);

    const [disabledWindowChangePassword, setDisabledWindowChangePassword] =
        useState(true);
    const [disabledWindowChangeAvatar, setDisabledWindowChangeAvatar] =
        useState(true);

    function handleClickButtonBack() {
        navigate(-1);
    }

    function handleClickButtonLogout() {
        authService.LogOut().then(res => {
            if (res === true) {
                navigate(`/${EPageRoutes.SIGN_IN_PAGE}`);
            }
        });
    }

    useEffect(() => {
        authService.GetUser().then(res => {
            if (res) {
                dispatch(setUser(res));
            }
        });
    }, []);

    return (
        <section className={`${styles.profile}`}>
            <div className={`${styles.container}`}>
                <Button
                    text="Назад"
                    className={styles.buttonBack}
                    onClick={handleClickButtonBack}
                />
                <Button
                    text="Выйти"
                    className={styles.buttonLogout}
                    onClick={handleClickButtonLogout}
                />
                <Avatar
                    link={userAvatar}
                    onClick={() => setDisabledWindowChangeAvatar(false)}
                />
                <h2 className={styles.login}>{userLogin}</h2>
                <div>
                    <ProfileForm />
                </div>
                <Button
                    text="Сменить пароль"
                    className={styles.button}
                    onClick={() => {
                        setDisabledWindowChangePassword(false);
                    }}
                />
            </div>
            {!disabledWindowChangePassword && (
                <ChangePassword
                    setDisabledWindowChangePassword={
                        setDisabledWindowChangePassword
                    }
                />
            )}
            {!disabledWindowChangeAvatar && (
                <ChangeAvatar
                    setDisabledWindowChangeAvatar={
                        setDisabledWindowChangeAvatar
                    }
                />
            )}
        </section>
    );
}
