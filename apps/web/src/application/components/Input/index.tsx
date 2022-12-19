import React from 'react'

import styles from './Input.module.css'

type Props = {
  id: string
  placeholder: string
  type: React.InputHTMLAttributes<HTMLInputElement>['type']
  title?: string
  error?: string
} & React.InputHTMLAttributes<HTMLInputElement>
function BaseInput(
  { id, placeholder, type, error, title, ...restOfProps }: Props,
  ref: React.LegacyRef<HTMLInputElement>
) {
  return (
    <label htmlFor={id} className={styles.label}>
      {title && <p className={styles.title}>{title}</p>}
      <input ref={ref} id={id} type={type} placeholder={placeholder} {...restOfProps} />
      <p className={styles.error}>{error}</p>
    </label>
  )
}

export const Input = React.forwardRef<HTMLInputElement, Props>(BaseInput)
