import styles from './avatar.module.scss';
import goldIcon from '../../../../assets/images/gold-icon.png';
import iconEdit from '../../../../assets/images/icon-edit.png';

type TProps = {
    link?: string;
    handleClick?: () => void;
};

function Avatar({ link = goldIcon, handleClick }: TProps): JSX.Element {
    return (
        <div className={styles.container} onClick={handleClick}>
            <img className={styles.avatar} src={link} alt="avatar" />
            <span className={styles.avatarChange}>
                <img className={styles.icon} src={iconEdit} alt="icon" />
            </span>
        </div>
    );
}

export default Avatar;
