import styles from './styles.module.scss';
import { EPageRoutes } from '@/router/Enums';
import { Button, IconAccount, IconHome, IconLink } from '@/ui';
import { FC } from 'react';
import { useFullScreen } from '@/hooks/full-screen';

export const Header: FC = () => {
    const { isFullScreen, toggleFullScreen } = useFullScreen();

    return (
        <header className={styles.header}>
            <div className={styles['header-left']}>
                <IconLink to={`/${EPageRoutes.HOME_PAGE}`} tooltip="На главную">
                    <IconHome width={24} height={24} />
                </IconLink>
            </div>

            <Button variant={isFullScreen ? 'secondary' : 'primary'} onClick={toggleFullScreen}>
                {isFullScreen ? 'Выйти из полноэкранного режима' : 'Полноэкранный режим'}
            </Button>

            <div className={styles['header-right']}>
                <IconLink to={`/${EPageRoutes.PROFILE_PAGE}`} tooltip="Профиль">
                    <IconAccount width={24} height={24} />
                </IconLink>
            </div>
        </header>
    );
};
