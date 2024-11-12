import React, { FC, ReactNode, useState, useRef, useEffect } from 'react';
import styles from './styles.module.scss';
import { LinkProps, NavLink } from 'react-router-dom';

interface Props extends LinkProps {
    children: ReactNode;
    tooltip?: string;
}

export const IconLink: FC<Props> = ({ children, tooltip, ...props }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
    const iconRef = useRef<HTMLDivElement | null>(null);
    const tooltipRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (showTooltip && iconRef.current && tooltipRef.current) {
            const rect = iconRef.current.getBoundingClientRect();
            const tooltipRect = tooltipRef.current.getBoundingClientRect();
            let top = rect.top - 30; // Смещаем подсказку выше иконки
            let left = rect.left + rect.width / 2;

            // Проверка, чтобы подсказка не вышла за границы экрана
            if (left - tooltipRect.width / 2 < 0) {
                left = tooltipRect.width / 2; // Выравниваем по левому краю
            } else if (left + tooltipRect.width / 2 > window.innerWidth) {
                left = window.innerWidth - tooltipRect.width / 2; // Выравниваем по правому краю
            }

            if (top < 0) {
                top = rect.bottom + 10; // Смещаем подсказку ниже иконки, если не хватает места сверху
            }

            setTooltipPosition({ top, left });
        }
    }, [showTooltip]);

    return (
        <div
            ref={iconRef}
            className={styles['tooltip-container']}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}>
            <NavLink className={({ isActive }) => `${styles['nav-icon']} ${isActive ? styles.active : ''}`} {...props}>
                {children}
            </NavLink>
            {tooltip && showTooltip && (
                <div
                    ref={tooltipRef}
                    className={styles['tooltip']}
                    style={{ top: `${tooltipPosition.top}px`, left: `${tooltipPosition.left}px` }}>
                    {tooltip}
                </div>
            )}
        </div>
    );
};
