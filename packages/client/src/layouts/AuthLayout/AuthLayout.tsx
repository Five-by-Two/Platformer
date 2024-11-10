import { FC, ReactNode } from 'react';
import { Outlet } from 'react-router';
import styles from '../styles.module.scss';

type LayoutProps = {
    children?: ReactNode;
};

export const AuthLayout: FC<LayoutProps> = props => {
    return (
        <div className={styles.layoutContainer}>
            <main className={styles.content}>{props.children || <Outlet />}</main>
        </div>
    );
};
