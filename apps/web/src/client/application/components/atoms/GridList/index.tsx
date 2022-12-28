import styles from './GridList.module.css'

export const DEFAULT_GAP = 0

export type GridListProps = {
  children: React.ReactNode
  gap?: number
}

export function GridList({ children, gap = DEFAULT_GAP }: GridListProps) {
  const customStyles = {
    '--gap': `${gap}rem`,
  } as React.CSSProperties

  return (
    <div className={styles.list} style={customStyles} role={'list'}>
      {children}
    </div>
  )
}
