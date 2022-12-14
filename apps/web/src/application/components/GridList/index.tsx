import styles from './GridList.module.css'

type Props = {
  children: React.ReactNode
}

export function GridList({ children }: Props) {
  return <div className={styles.list}>{children}</div>
}
