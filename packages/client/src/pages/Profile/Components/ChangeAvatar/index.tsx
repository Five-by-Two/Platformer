import styles from './changeAvatar.module.scss';
import ChangeAvatarForm from './Components/ChangeAvatarForm';

type TProps = {
    setDisabledWindowChangeAvatar: React.Dispatch<
        React.SetStateAction<boolean>
    >;
};

function ChangeAvatar({ setDisabledWindowChangeAvatar }: TProps) {
    return (
        <div
            className={styles.windowWrapper}
            onClick={() => setDisabledWindowChangeAvatar(true)}>
            <div
                className={styles.container}
                onClick={evt => evt.stopPropagation()}>
                <h2>Смена аватара</h2>
                <ChangeAvatarForm
                    setDisabledWindowChangeAvatar={
                        setDisabledWindowChangeAvatar
                    }
                />
            </div>
        </div>
    );
}

export default ChangeAvatar;
