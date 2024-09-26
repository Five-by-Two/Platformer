import LoginForm from './Components/LoginForm';
import styles from './index.module.scss';

export function SignInPage(): JSX.Element {
    return (
        <section className={styles.background}>
            <LoginForm />
        </section>
    );
}
