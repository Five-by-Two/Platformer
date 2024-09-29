import { FormProvider, useForm } from 'react-hook-form';
import styles from './changePasswordForm.module.scss';
import Input from '../../../Input';
import Button from '../../../../../../components/button';
import { TFormPasswordData } from '../../../../Models/IFormProfileData';
import { updatePassword } from '../../../../../../api/user';

type TProps = {
    setDisabledWindowChangePassword: React.Dispatch<
        React.SetStateAction<boolean>
    >;
};

function ChangePasswordForm({ setDisabledWindowChangePassword }: TProps) {
    const methods = useForm<TFormPasswordData>({
        mode: 'onBlur',
    });

    const { handleSubmit } = methods;

    function submitForm(data: TFormPasswordData) {
        console.log(data);
        if (
            data.newPassword === data.newPasswordAgain &&
            data.oldPassword !== data.newPassword
        ) {
            updatePassword(data);
            setDisabledWindowChangePassword(true);
        } else {
            alert('Не корректный пароль');
            throw Error('Не корректный пароль');
        }
    }

    return (
        <FormProvider {...methods}>
            <form className={styles.form} onSubmit={handleSubmit(submitForm)}>
                <Input
                    name={'oldPassword'}
                    type="password"
                    placeholder="Введите старый пароль"
                />
                <Input
                    name={'newPassword'}
                    type="password"
                    placeholder="Введите новый пароль"
                />
                <Input
                    name={'newPasswordAgain'}
                    type="password"
                    placeholder="Повторите новый пароль"
                />
                <Button text="Изменить" className={styles.button} />
            </form>
        </FormProvider>
    );
}

export default ChangePasswordForm;
