import styles from './styles.module.scss';
import { EPageRoutes } from '@/router/Enums';
import { Button, IconAccount, IconHome, IconLink } from '@/ui';
import { FC, useState } from 'react';

export const Header: FC = () => {
    const [fullscreen, setFullscreen] = useState(false);
    function toggleFullScreen() {
        if (!document.fullscreenElement) {
            setFullscreen(true);
            document.documentElement.requestFullscreen();
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
            setFullscreen(false);
        }
    }

    return (
        <header className={styles.header}>
            <IconLink to={`/${EPageRoutes.HOME_PAGE}`} tooltip="На главную">
                <IconHome width={24} height={24} />
            </IconLink>
            <Button variant={fullscreen ? 'secondary' : 'primary'} onClick={toggleFullScreen}>
                {fullscreen ? 'Выйти из полноэкранного режима' : 'Полноэкранный режим'}
            </Button>
            <div className={styles['header-right']}>
                <IconLink to={`/${EPageRoutes.PROFILE_PAGE}`} tooltip="Профиль">
                    <IconAccount width={24} height={24} />
                </IconLink>
            </div>
        </header>
    );
};
