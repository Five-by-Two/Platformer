import { FormProvider, useForm } from 'react-hook-form';
import styles from './changeAvatarForm.module.scss';
import Input from '../../../Input';
import Button from '../../../../../../components/button';
import { TFormAvatarData } from '../../../../Models/IFormProfileData';

type TProps = {
    setDisabledWindowChangeAvatar: React.Dispatch<
        React.SetStateAction<boolean>
    >;
};

type file = {
    avatar: File[];
};

function ChangeAvatarForm({ setDisabledWindowChangeAvatar }: TProps) {
    const methods = useForm<TFormAvatarData>({
        mode: 'onBlur',
    });

    const { handleSubmit } = methods;

    function submitForm(data: file) {
        console.log(data);
        setDisabledWindowChangeAvatar(true);
    }

    return (
        <FormProvider {...methods}>
            <form className={styles.form} onSubmit={handleSubmit(submitForm)}>
                <Input
                    name="avatar"
                    type="file"
                    placeholder="Ввставтье ссылку"
                />
                <Button text="Отправить" className={styles.button} />
            </form>
        </FormProvider>
    );
}

export default ChangeAvatarForm;
