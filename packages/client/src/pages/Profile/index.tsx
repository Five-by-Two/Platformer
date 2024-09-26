import Button from '../../components/button';
import Avatar from './Components/Avatar';
import styles from './profie.module.scss';

export function ProfilePage(): JSX.Element {
    return (
        <section className={`${styles.profile}`}>
            <div className={`${styles.container}`}>
                <Button text="BACK" className={styles.buttonBack} />
                <Avatar />
            </div>
        </section>
    );
}
