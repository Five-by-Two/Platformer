import MainMenu from './Components/MainMenu';
import styles from './index.module.scss';

export function HomePage(): JSX.Element {
    return (
        <section className={styles['home-page']}>
            <MainMenu />
        </section>
    );
}
