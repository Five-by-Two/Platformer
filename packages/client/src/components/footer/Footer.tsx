import styles from './styles.module.scss';
import { ThemeSwitcher } from '../themeSwitcher';

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.switcherWrapper}>
                <ThemeSwitcher />
            </div>
            <div className={styles.footer__items}>
                <p className={styles.footer__item}>© {currentYear} 5x2</p>
                <a
                    className={`${styles.footer__item} ${styles.footer__item_link}`}
                    href="https://github.com/Five-by-Two/Platformer"
                    target="_blank"
                    rel="noreferrer">
                    GitHub
                </a>
            </div>
        </footer>
    );
};
