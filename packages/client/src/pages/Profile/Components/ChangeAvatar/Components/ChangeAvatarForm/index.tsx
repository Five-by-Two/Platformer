import { FormProvider, useForm } from 'react-hook-form';
import styles from './changeAvatarForm.module.scss';
import Input from '../../../Input';
import Button from '../../../../../../components/button';
import { TFormAvatarData } from '../../../../Models/IFormProfileData';
import { updateAvatar } from '../../../../../../api/user';

type TProps = {
    setDisabledWindowChangeAvatar: React.Dispatch<
        React.SetStateAction<boolean>
    >;
};

function ChangeAvatarForm({ setDisabledWindowChangeAvatar }: TProps) {
    const methods = useForm<TFormAvatarData>({
        mode: 'onBlur',
    });

    const { handleSubmit } = methods;

    function submitForm(data: TFormAvatarData) {
        console.log(data.avatar.length);
        if (data.avatar.length !== 0) {
            updateAvatar(data);
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
