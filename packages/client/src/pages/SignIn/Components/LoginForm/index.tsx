import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './index.module.scss';
import { useNavigate } from 'react-router';
import { EPageRoutes } from '../../../../router/Enums';

interface IFormData {
    login: string;
    password: string;
}

export default function LoginForm() {
    const { register, handleSubmit } = useForm<IFormData>();
    const navigate = useNavigate();

    const onSumbit: SubmitHandler<IFormData> = data => {
        //TODO: Обработка отправки формы
        console.log(data);
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
