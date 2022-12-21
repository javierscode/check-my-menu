import { EditIcon } from '@client/application/icons/EditIcon'
import { EnterIcon } from '@client/application/icons/EnterIcon'
import { RemoveIcon } from '@client/application/icons/RemoveIcon'
import Link from 'next/link'

import styles from './AdminCard.module.css'

type Props = {
  title: string
  linkTo?: string
  onEdit: () => void
  onDelete: () => void
}

export function AdminCard({ title, linkTo, onEdit, onDelete }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        {linkTo ? (
          <Link href={linkTo}>
            <EnterIcon />
            <p>{title}</p>
          </Link>
        ) : (
          <p>{title}</p>
        )}
      </div>
      <div className={styles.actions}>
        <button onClick={onEdit}>
          <EditIcon />
        </button>
        <button onClick={onDelete}>
          <RemoveIcon />
        </button>
      </div>
    </div>
  )
}
