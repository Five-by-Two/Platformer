import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import styles from './index.module.scss';
import { useNavigate } from 'react-router';
import { EPageRoutes } from '../../../../router/Enums';
import IFormData from './Models/IFormData';
import FormInput from './Components/FormInput';

export default function RegisterForm() {
    const methods = useForm<IFormData>();
    const { handleSubmit } = methods;
    const navigate = useNavigate();

    const onSumbit: SubmitHandler<IFormData> = data => {
        //TODO: Обработка отправки формы
        console.log(data);
    };

    return (
        <FormProvider {...methods}>
            <form className={styles.form} onSubmit={handleSubmit(onSumbit)}>
                <h1>Регистрация</h1>
                <FormInput placeholder="Email" name="email" required={true} />
                <FormInput
                    placeholder="Фамилия"
                    name="second_name"
                    required={true}
                />
                <FormInput
                    placeholder="Имя"
                    name="first_name"
                    required={true}
                />
                <FormInput
                    placeholder="Номер телефона"
                    name="phone"
                    required={true}
                />
                <FormInput placeholder="Логин" name="login" required={true} />
                <FormInput
                    placeholder="Пароль"
                    name="password"
                    type="password"
                    required={true}
                />
                <div className={styles.actions}>
                    <button className={styles.button_primary} type="submit">
                        Регистрация
                    </button>
                    <button
                        className={styles.button_secondary}
                        type="button"
                        onClick={() =>
                            navigate(`/${EPageRoutes.SIGN_IN_PAGE}`)
                        }>
                        Войти
                    </button>
                </div>
            </form>
        </FormProvider>
    );
}
