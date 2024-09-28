import styles from './avatar.module.scss';
import avatar from '../../../../assets/images/avatar.png';
import iconEdit from '../../../../assets/images/icon-edit.png';

type TProps = {
    link?: string;
    onClick?: () => void;
};

function Avatar({ link = avatar, onClick }: TProps): JSX.Element {
    return (
        <div className={styles.container} onClick={onClick}>
            <img className={styles.avatar} src={link} alt="avatar" />
            <span className={styles.avatarChange}>
                <img className={styles.icon} src={iconEdit} alt="icon" />
            </span>
        </div>
    );
}

export default Avatar;
