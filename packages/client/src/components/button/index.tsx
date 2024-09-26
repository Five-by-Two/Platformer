import styles from './button.module.scss';

type TProps = {
    text: string;
    className?: string;
    onClick?: () => void;
};

function Button({ text, className, onClick }: TProps) {
    return (
        <button className={`${styles.button} ${className}`} onClick={onClick}>
            {text}
        </button>
    );
}

export default Button;
