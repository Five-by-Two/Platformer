import { useLayoutEffect, type FC } from 'react';
import styles from './styles.module.scss';
import { Outlet, useNavigate } from 'react-router';
import { IconArrowLeft, Button } from '@/ui';
import { useAppDispatch } from '@/hooks/redux-hooks';
import { getTopics } from '@/store/forumSlice/forumThunks';

export const Forum: FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleToBack = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate('/');
        }
    };

    const handleCreateTopic = () => {
        navigate('create');
    };

    useLayoutEffect(() => {
        dispatch(getTopics());
    }, []);

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
                        <Button onClick={handleCreateTopic}>Создать топик</Button>
                    </div>
                </header>
                <section className={styles.forum__content}>
                    <Outlet />
                </section>
            </div>
        </div>
    );
};
