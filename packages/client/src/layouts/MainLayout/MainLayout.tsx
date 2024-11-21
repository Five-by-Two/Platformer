import { FC } from 'react';
import { Header } from '@/components/header/Header';
import { Footer } from '@/components/footer/Footer';
import { Outlet } from 'react-router';
import styles from '../styles.module.scss';

export const MainLayout: FC = () => {
    return (
        <div className={styles.layoutContainer}>
            <Header />
            <main className={styles.content}>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};
