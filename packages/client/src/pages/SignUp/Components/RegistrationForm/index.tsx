import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import styles from './index.module.scss';
import { useNavigate } from 'react-router';
import { EPageRoutes } from '../../../../router/Enums';
import IFormData from './Models/IFormData';
import FormInput from './Components/FormInput';
import AuthService from '../../../../services/AuthService/AuthService';
import ValidationConstants from './Models/ValidationConstants';
import { Button } from '@/ui';

export default function RegisterForm() {
    const methods = useForm<IFormData>();
    const { handleSubmit } = methods;
    const navigate = useNavigate();

    const onSumbit: SubmitHandler<IFormData> = async data => {
        AuthService.SignUp(data).then(result => {
            if (result) {
                navigate(`/${EPageRoutes.HOME_PAGE}`);
            }
        });
    };

    return (
        <FormProvider {...methods}>
            <form className={styles.form} onSubmit={handleSubmit(onSumbit)}>
                <h1>Регистрация</h1>
                <FormInput
                    placeholder="Email"
                    name="email"
                    required={true}
                    pattern={ValidationConstants.EMAIL_PATTERN}
                    validateErrorText={ValidationConstants.EMAIL_ERROR}
                />
                <FormInput
                    placeholder="Фамилия"
                    name="second_name"
                    required={true}
                    pattern={ValidationConstants.LASTNAME_PATTERN}
                    validateErrorText={ValidationConstants.LASTNAME_ERROR}
                />
                <FormInput
                    placeholder="Имя"
                    name="first_name"
                    required={true}
                    pattern={ValidationConstants.FIRSTNAME_PATTERN}
                    validateErrorText={ValidationConstants.FIRSTNAME_ERROR}
                />
                <FormInput
                    placeholder="Номер телефона"
                    name="phone"
                    required={true}
                    pattern={ValidationConstants.PHONE_PATTERN}
                    validateErrorText={ValidationConstants.PHONE_ERROR}
                />
                <FormInput
                    placeholder="Логин"
                    name="login"
                    required={true}
                    pattern={ValidationConstants.LOGIN_PATTERN}
                    validateErrorText={ValidationConstants.LOGIN_ERROR}
                />
                <FormInput
                    placeholder="Пароль"
                    name="password"
                    type="password"
                    required={true}
                    pattern={ValidationConstants.PASSWORD_PATTERN}
                    validateErrorText={ValidationConstants.PASSWORD_ERROR}
                />
                <div className={styles.actions}>
                    <Button type="submit">Регистрация</Button>
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
