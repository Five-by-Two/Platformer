import { useContext } from 'react';
import styles from './index.module.scss';
import { ThemeContext } from '@/contexts/ThemeContext/ThemeContext';

export function ThemeSwitcher(): JSX.Element {
    const { theme, setTheme } = useContext(ThemeContext);

    const themeHandler = () => {
        if (theme === `light`) {
            setTheme(`dark`);
        } else {
            setTheme(`light`);
        }
    };

    return (
        <div className={styles.container}>
            <input
                checked={theme === 'light' ? true : false}
                onChange={themeHandler}
                className={styles.checkbox}
                id={`checkboxSwitch`}
                type="checkbox"
            />
            <label className={styles.background} htmlFor={`checkboxSwitch`}>
                <div className={styles.button}></div>
            </label>
        </div>
    );
}
