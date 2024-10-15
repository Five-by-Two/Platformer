import styles from './changePassword.module.scss';
import ChangePasswordForm from './Components/ChangePasswordForm';

type TProps = {
    setDisabledWindowChangePassword: React.Dispatch<
        React.SetStateAction<boolean>
    >;
};

function ChangePassword({ setDisabledWindowChangePassword }: TProps) {
    function handleClickwindowWrapper() {
        setDisabledWindowChangePassword(true);
    }

    return (
        <div
            className={styles.windowWrapper}
            onClick={handleClickwindowWrapper}>
            <div
                className={styles.container}
                onClick={evt => evt.stopPropagation()}>
                <h2>Смена пароля</h2>
                <ChangePasswordForm
                    setDisabledWindowChangePassword={
                        setDisabledWindowChangePassword
                    }
                />
            </div>
        </div>
    );
}

export default ChangePassword;
