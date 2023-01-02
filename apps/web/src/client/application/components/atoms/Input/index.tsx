import React from 'react'

import styles from './Input.module.css'

export type InputProps = {
  id: string
  placeholder?: string
  type: React.InputHTMLAttributes<HTMLInputElement>['type']
  title?: string
  error?: string
} & React.InputHTMLAttributes<HTMLInputElement>
function BaseInput(
  { id, placeholder, type, error, title, ...restOfProps }: InputProps,
  ref: React.LegacyRef<HTMLInputElement>
) {
  return (
    <label htmlFor={id} className={styles.label} role={'label'}>
      {title && <p className={styles.title}>{title}</p>}
      <input
        ref={ref}
        id={id}
        type={type}
        placeholder={placeholder}
        {...restOfProps}
        step={type === 'number' ? '.01' : undefined}
      />
      <p className={styles.error}>{error}</p>
    </label>
  )
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(BaseInput)
