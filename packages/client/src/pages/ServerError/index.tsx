import Button from '../../components/button';
import styles from './index.module.scss';
import { useNavigate } from 'react-router';

export function ServerErrorPage(): JSX.Element {
    const navigate = useNavigate();

    const handleClick = (): void => {
        navigate('..');
    };

    return (
        <div className={`${styles.container}`}>
            <section className={`${styles.content_section}`}>
                <div>
                    <h1>500</h1>
                    <p>Ошибка обращения к серверу</p>
                </div>
                <Button text="На главную" onClick={handleClick} />
            </section>
        </div>
    );
}
