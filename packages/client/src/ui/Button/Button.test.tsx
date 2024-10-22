import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/ui/Button';
import '@testing-library/jest-dom';

describe('Button component', () => {
    const onClick = jest.fn();

    test('renders button with text', () => {
        render(<Button onClick={onClick}>Click Me</Button>);

        expect(screen.getByText('Click Me')).toBeInTheDocument();
    });

    test('renders button with left icon', () => {
        render(
            <Button onClick={onClick} leftIcon={<span>🔍</span>}>
                Search
            </Button>,
        );

        expect(screen.getByText('Search')).toBeInTheDocument();
        expect(screen.getByText('🔍')).toBeInTheDocument();
    });

    test('renders button with right icon', () => {
        render(
            <Button onClick={onClick} rightIcon={<span>✔️</span>}>
                Submit
            </Button>,
        );

        expect(screen.getByText('Submit')).toBeInTheDocument();
        expect(screen.getByText('✔️')).toBeInTheDocument();
    });

    test('calls onClick when clicked', () => {
        render(<Button onClick={onClick}>Click Me</Button>);

        fireEvent.click(screen.getByText('Click Me'));

        expect(onClick).toHaveBeenCalledTimes(1);
    });

    test('renders disabled button', () => {
        render(
            <Button onClick={onClick} disabled={true}>
                Disabled
            </Button>,
        );

        // Проверка, что кнопка отключена
        const button = screen.getByRole('button');
        expect(button).toBeDisabled();
    });

    test('applies custom className', () => {
        render(
            <Button onClick={onClick} className="custom-class">
                Custom Class
            </Button>,
        );

        const button = screen.getByRole('button');
        expect(button).toHaveClass('custom-class');
    });
});
