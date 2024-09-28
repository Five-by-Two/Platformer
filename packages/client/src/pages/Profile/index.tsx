import { useNavigate } from 'react-router';
import Button from '../../components/button';
import Avatar from './Components/Avatar';
import styles from './profie.module.scss';
import ProfileForm from './Components/ProfileForm';

export function ProfilePage(): JSX.Element {
    const navigate = useNavigate();

    function handleClickButtonBack() {
        navigate(-1);
    }

    return (
        <section className={`${styles.profile}`}>
            <div className={`${styles.container}`}>
                <Button
                    text="BACK"
                    className={styles.buttonBack}
                    onClick={handleClickButtonBack}
                />
                <Avatar onClick={() => console.log('hello')} />
                <div>
                    <ProfileForm />
                </div>
            </div>
        </section>
    );
}
