import styles from './avatar.module.scss';

type TProps = {
    link?: string;
};

function Avatar({ link }: TProps): JSX.Element {
    return (
        <div className={styles.container}>
            <img src={link} alt="avatar" />
        </div>
    );
}

export default Avatar;
