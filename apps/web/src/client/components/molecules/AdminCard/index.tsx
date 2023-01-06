import { EditIcon } from '@client/icons/EditIcon'
import { EnterIcon } from '@client/icons/EnterIcon'
import { RemoveIcon } from '@client/icons/RemoveIcon'
import Link from 'next/link'

import styles from './AdminCard.module.css'

export type AdminCardProps = {
  title: string
  linkTo?: string
  onEdit: () => void
  onDelete: () => void
}

export function AdminCard({ title, linkTo, onEdit, onDelete }: AdminCardProps) {
  return (
    <div className={styles.card} role={'listitem'}>
      <div className={styles.header}>
        {linkTo ? (
          <Link href={linkTo} legacyBehavior>
            <a>
              <EnterIcon />
              <p>{title}</p>
            </a>
          </Link>
        ) : (
          <p>{title}</p>
        )}
      </div>
      <div className={styles.actions}>
        <button onClick={onEdit} name='Edit' data-testid='edit-button'>
          <EditIcon />
        </button>
        <button onClick={onDelete} name='Delete' data-testid='delete-button'>
          <RemoveIcon />
        </button>
      </div>
    </div>
  )
}
