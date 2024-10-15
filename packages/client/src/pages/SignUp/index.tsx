import RegisterForm from './Components/RegistrationForm';
import styles from './index.module.scss';

export function SignUpPage(): JSX.Element {
    return (
        <section className={styles.background}>
            <RegisterForm />
        </section>
    );
}
