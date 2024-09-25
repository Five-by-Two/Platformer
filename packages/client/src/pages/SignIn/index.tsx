import Form from '../Components/Form';
import styles from './index.module.scss';

export function SignInPage(): JSX.Element {
    return (
        <section className={styles.background}>
            <Form></Form>
        </section>
    );
}
