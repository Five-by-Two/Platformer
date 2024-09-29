import styles from './button.module.scss';

type TProps = {
    text: string;
    onClick?: VoidFunction;
};

function Button({ text, onClick }: TProps) {
    return (
        <button className={`${styles.button}`} onClick={onClick}>
            {text}
        </button>
    );
}

export default Button;
