import styles from './button.module.scss'

type TProps = {
  text: string
  onClick?: () => void
}

function Button({ text, onClick }: TProps) {
  return (
    <button className={`${styles.button}`} onClick={onClick}>
      {text}
    </button>
  )
}

export default Button
