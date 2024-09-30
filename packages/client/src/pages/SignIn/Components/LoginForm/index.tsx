import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './index.module.scss';
import { useNavigate } from 'react-router';
import { EPageRoutes } from '../../../../router/Enums';
import IFormData from './Models/IFormData';
import AuthService from '../../../../services/AuthService/AuthService';
import { setIsAuth } from '../../../../store/authSlice';
import { useAppDispatch } from '../../../../hooks/redux-hooks';
import { useState } from 'react';

export default function LoginForm() {
    const { register, handleSubmit } = useForm<IFormData>();
    const [errorText, setErrorText] = useState<string | null>(null);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const onSumbit: SubmitHandler<IFormData> = async data => {
        await AuthService.SignIn(data)
            .then(result => dispatch(setIsAuth(result)))
            .then(() => {
                navigate(`/${EPageRoutes.HOME_PAGE}`);
            })
            .catch((error: string) => setErrorText(error));
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSumbit)}>
            <h1>Авторизация</h1>
            <input {...register('login')} placeholder="Логин" required />
            <input
                {...register('password')}
                placeholder="Пароль"
                type="password"
                required
            />
            {errorText && <span className={styles.errorText}>{errorText}</span>}
            <div className={styles.actions}>
                <button className={styles.button_primary} type="submit">
                    Войти
                </button>
                <button
                    className={styles.button_secondary}
                    type="button"
                    onClick={() => navigate(`/${EPageRoutes.SIGN_UP_PAGE}`)}>
                    Регистрация
                </button>
            </div>
        </form>
    );
}
