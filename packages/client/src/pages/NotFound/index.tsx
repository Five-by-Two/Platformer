import { useNavigate } from 'react-router';
import Button from '../../components/button';
import styles from './index.module.scss';
import { Link } from 'react-router-dom';

export function NotFoundPage(): JSX.Element {
    const navigate = useNavigate();

    const handleClick = (): void => {
        navigate('..');
    };

    return (
        <div className={`${styles.container}`}>
            <section className={`${styles.content_section}`}>
                <h1>404</h1>
                <p>
                    Ooops! <br /> Похоже, страница, которую вы ищете, не
                    найдена!
                </p>
                <Button text="К предыдущей странице" onClick={handleClick} />

                <Link to="/">На главную</Link>
            </section>
        </div>
    );
}
