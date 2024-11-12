import { Button } from '@/ui';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import YandexButtonIcon from '../../../../assets/icons/yandex-button.svg';
import { EPageRoutes } from '@/router/Enums';
import AuthService from '@/services/AuthService/AuthService';
import styles from './index.module.scss';
import IFormData from './Models/IFormData';
export default function LoginForm() {
    const { register, handleSubmit } = useForm<IFormData>();
    const [errorText, setErrorText] = useState<string | null>(null);

    const navigate = useNavigate();

    const onSumbit: SubmitHandler<IFormData> = async data => {
        await AuthService.SignIn(data)
            .then(result => {
                if (result) {
                    navigate(`/${EPageRoutes.HOME_PAGE}`);
                }
            })
            .catch((error: Error) => setErrorText(error.message));
    };

    const onYandexOAuth = () => {
        AuthService.SignInByYandex().then(url => {
            if (url) window.location.href = url;
        });
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSumbit)}>
            <h1>Авторизация</h1>
            <input {...register('login')} placeholder="Логин" required />
            <input {...register('password')} placeholder="Пароль" type="password" required />
            {errorText && <span className={styles.errorText}>{errorText}</span>}
            <div className={styles.actions}>
                <Button type="submit">Войти</Button>
                <button
                    className={styles.button_secondary}
                    type="button"
                    onClick={() => navigate(`/${EPageRoutes.SIGN_UP_PAGE}`)}>
                    Регистрация
                </button>
            </div>
            <div className={styles.oauthContainer}>
                <YandexButtonIcon className={styles.oauthButton} onClick={onYandexOAuth} />
            </div>
        </form>
    );
}
