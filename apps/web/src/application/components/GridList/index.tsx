import styles from './GridList.module.css'

type Props = {
  children: React.ReactNode
  gap?: number
}

export function GridList({ children, gap = 0 }: Props) {
  const customStyles = {
    '--gap': `${gap}rem`,
  } as React.CSSProperties

  return (
    <div className={styles.list} style={customStyles}>
      {children}
    </div>
  )
}
