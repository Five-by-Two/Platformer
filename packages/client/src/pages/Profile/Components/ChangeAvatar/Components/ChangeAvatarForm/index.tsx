import { FormProvider, useForm } from 'react-hook-form';
import styles from './changeAvatarForm.module.scss';
import Input from '../../../Input';
import Button from '../../../../../../components/button';
import { TFormAvatarData } from '../../../../Models/IFormProfileData';
import userService from '../../../../../../services/UserService/UserService';
import { useAppDispatch } from '../../../../../../hooks/redux-hooks';
import { setUser } from '../../../../../../store/userSlice';

type TProps = {
    setDisabledWindowChangeAvatar: React.Dispatch<
        React.SetStateAction<boolean>
    >;
};

function ChangeAvatarForm({ setDisabledWindowChangeAvatar }: TProps) {
    const dispatch = useAppDispatch();

    const methods = useForm<TFormAvatarData>({
        mode: 'onBlur',
    });

    const { handleSubmit } = methods;

    function submitForm(data: TFormAvatarData) {
        if (data.avatar.length !== 0) {
            userService.UpdateAvatar(data).then(res => {
                if (res) {
                    dispatch(setUser(res));
                }
            });
            setDisabledWindowChangeAvatar(true);
        } else {
            alert('Вставьте картинку');
            throw Error('Вставьте картинку');
        }
    }

    return (
        <FormProvider {...methods}>
            <form className={styles.form} onSubmit={handleSubmit(submitForm)}>
                <Input
                    name="avatar"
                    type="file"
                    placeholder="Вставьте ссылку"
                />
                <Button text="Отправить" className={styles.button} />
            </form>
        </FormProvider>
    );
}

export default ChangeAvatarForm;
