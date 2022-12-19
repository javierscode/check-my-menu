import styles from './ConfirmationForm.module.css'

type Props = {
  title: string
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmationForm({ title, onConfirm, onCancel }: Props) {
  return (
    <div className={styles.confirmation}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.actions}>
        <button onClick={onConfirm} className={styles.button}>
          Confirm
        </button>
        <button onClick={onCancel} className={styles.button + ' ' + styles.cancel}>
          Cancel
        </button>
      </div>
    </div>
  )
}
