import { FC, ReactNode } from 'react';
import { Header } from '@/components/header/Header';
import { Footer } from '@/components/footer/Footer';
import { Outlet } from 'react-router';
import styles from '../styles.module.scss';

type LayoutProps = {
    children?: ReactNode;
};
export const MainLayout: FC<LayoutProps> = props => {
    return (
        <div className={styles.layoutContainer}>
            <Header />
            <main className={styles.content}>
                {props.children && props.children}
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};
