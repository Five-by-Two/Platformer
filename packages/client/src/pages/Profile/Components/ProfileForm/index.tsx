import { FormProvider, useForm } from 'react-hook-form';
import Input from '../../Components/Input';
import styles from './profileForm.module.scss';
import { TFormProfileData } from '../../Models/IFormProfileData';
import { useEffect, useState } from 'react';
import Button from '../../../../components/button';
import { updateUserData } from '../../../../api/user';
import { getUser } from '../../../../api/auth';
import profileFormData from './profileFormData';

function ProfileForm() {
    const methods = useForm<TFormProfileData>({
        mode: 'onBlur',
    });

    const { reset, handleSubmit } = methods;

    const [textButtonChangeData, setTextButtonChangeData] =
        useState('Изменить данные');
    const [isInputDisabled, setIsInputDisabled] = useState(true);

    function submitForm(data: TFormProfileData) {
        if (!isInputDisabled) {
            console.log(data);

            setTextButtonChangeData('Изменить данные');
        } else {
            setTextButtonChangeData('Сохранить данные');
        }

        setIsInputDisabled(!isInputDisabled);
    }

    useEffect(() => {
        reset(profileFormData);
    }, []);

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
