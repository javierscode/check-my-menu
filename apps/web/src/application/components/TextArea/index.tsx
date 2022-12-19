import React from 'react'

import styles from './TextArea.module.css'

type Props = {
  id: string
  placeholder: string
  title?: string
  error?: string
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>
function BaseTextArea(
  { id, placeholder, error, title, ...restOfProps }: Props,
  ref: React.LegacyRef<HTMLTextAreaElement>
) {
  return (
    <label htmlFor={id} className={styles.label}>
      {title && <p className={styles.title}>{title}</p>}
      <textarea rows={3} ref={ref} id={id} placeholder={placeholder} {...restOfProps} />
      <p className={styles.error}>{error}</p>
    </label>
  )
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, Props>(BaseTextArea)
