import type { FC } from 'react';
import styles from './styles.module.scss';
import { Outlet, useNavigate } from 'react-router';
import { IconArrowLeft, Button } from '@/ui';

export const Forum: FC = () => {
    const navigate = useNavigate();

    const handleToBack = () => {
        if (window.history.length > 1) {
            console.log('Going back');
            navigate(-1);
        } else {
            navigate('/');
        }
    };

    const handleCreateTopic = () => {
        navigate('create');
    };
    return (
        <div className={styles.forum}>
            <div className={styles.forum__container}>
                <header className={styles.forum__header}>
                    <nav className={styles.forum__navigation}>
                        <Button onClick={handleToBack} variant="secondary">
                            <IconArrowLeft width={24} height={24} />
                        </Button>
                    </nav>
                    <h1 className={styles.forum__title}>Форум</h1>
                    <div className={styles.forum__actions}>
                        <Button onClick={handleCreateTopic}>
                            Создать топик
                        </Button>
                    </div>
                </header>
                <section className={styles.forum__content}>
                    <Outlet />
                </section>
            </div>
        </div>
    );
};
