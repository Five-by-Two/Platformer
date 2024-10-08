import { FormProvider, useForm } from 'react-hook-form';
import Input from '../../Components/Input';
import styles from './profileForm.module.scss';
import { TFormProfileData } from '../../Models/IFormProfileData';
import { useEffect, useState } from 'react';
import Button from '../../../../components/button';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux-hooks';
import { changeUser } from '@/store/thunks';

function ProfileForm() {
    const dispatch = useAppDispatch();

    const methods = useForm<TFormProfileData>({
        mode: 'onBlur',
    });

    const userData = useAppSelector(state => state.user.user);

    const { reset, handleSubmit } = methods;

    const [textButtonChangeData, setTextButtonChangeData] =
        useState('Изменить данные');
    const [isInputDisabled, setIsInputDisabled] = useState(true);

    function submitForm(data: TFormProfileData) {
        if (!isInputDisabled) {
            dispatch(changeUser(data));

            setTextButtonChangeData('Изменить данные');
        } else {
            setTextButtonChangeData('Сохранить данные');
        }

        setIsInputDisabled(!isInputDisabled);
    }

    useEffect(() => {
        reset({
            first_name: userData.first_name,
            second_name: userData.second_name,
            display_name: userData.display_name,
            phone: userData.phone,
            login: userData.login,
            email: userData.email,
        });
    }, [userData]);

    return (
        <FormProvider {...methods}>
            <form className={styles.form} onSubmit={handleSubmit(submitForm)}>
                <div className={styles.container}>
                    <p>email:</p>
                    <Input
                        name="email"
                        type="text"
                        placeholder="email"
                        disabled={isInputDisabled}
                    />
                </div>
                <div className={styles.container}>
                    <p>Имя:</p>
                    <Input
                        name="first_name"
                        type="text"
                        placeholder="Имя"
                        disabled={isInputDisabled}
                    />
                </div>
                <div className={styles.container}>
                    <p>Фамилия:</p>
                    <Input
                        name="second_name"
                        type="text"
                        placeholder="Фамилия"
                        disabled={isInputDisabled}
                    />
                </div>
                <div className={styles.container}>
                    <p>Имя в игре:</p>
                    <Input
                        name="display_name"
                        type="text"
                        placeholder="Имя в игре"
                        disabled={isInputDisabled}
                    />
                </div>
                <div className={styles.container}>
                    <p>Телефон:</p>
                    <Input
                        name="phone"
                        type="text"
                        placeholder="Телефон"
                        disabled={isInputDisabled}
                    />
                </div>
                <div className={styles.container}>
                    <p>Логин:</p>
                    <Input
                        name="login"
                        type="text"
                        placeholder="Логин"
                        disabled={isInputDisabled}
                    />
                </div>
                <Button text={textButtonChangeData} className={styles.button} />
            </form>
        </FormProvider>
    );
}

export default ProfileForm;
