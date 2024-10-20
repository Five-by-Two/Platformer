import React, { FC, ReactNode } from 'react';
import styles from './styles.module.scss';

interface ButtonProps {
    onClick: VoidFunction;
    children: ReactNode;
    leftIcon: ReactNode;
    rightIcon: ReactNode;
    color: string;
    className: string;
    variant: 'primary' | 'secondary';
    disabled: boolean;
    type: 'button' | 'submit' | 'reset';
}

export const Button: FC<Partial<ButtonProps>> = ({
    onClick,
    children,
    leftIcon,
    rightIcon,
    className = '',
    variant = 'primary',
    disabled = false,
    type = 'button',
}) => {
    
    return (
        <button
            className={`${styles.button} ${styles[variant]} ${className}`}
            onClick={onClick}
            disabled={disabled}
            type={type}>
            {leftIcon && <span className={styles.icon}>{leftIcon}</span>}
            {typeof children === 'string' ? (
                <span className={styles.text}>{children}</span>
            ) : (
                <span className={styles.icon}>{children}</span>
            )}
            {rightIcon && <span className={styles.icon}>{rightIcon}</span>}
        </button>
    );
};
