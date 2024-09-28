import { useNavigate } from 'react-router';
import Button from '../../components/button';
import Avatar from './Components/Avatar';
import styles from './profie.module.scss';
import ProfileForm from './Components/ProfileForm';
import ChangePassword from './Components/ChangePassword';
import { useState } from 'react';
import ChangeAvatar from './Components/ChangeAvatar';

export function ProfilePage(): JSX.Element {
    const navigate = useNavigate();

    const [disabledWindowChangePassword, setDisabledWindowChangePassword] =
        useState(true);
    const [disabledWindowChangeAvatar, setDisabledWindowChangeAvatar] =
        useState(true);

    function handleClickButtonBack() {
        navigate(-1);
    }

    return (
        <section className={`${styles.profile}`}>
            <div className={`${styles.container}`}>
                <Button
                    text="BACK"
                    className={styles.buttonBack}
                    onClick={handleClickButtonBack}
                />
                <Avatar onClick={() => setDisabledWindowChangeAvatar(false)} />
                <h2 className={styles.login}>Ivan12</h2>
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
