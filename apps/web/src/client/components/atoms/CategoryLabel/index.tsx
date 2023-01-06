import { Category } from '@shared/domain/entities/category'
import Link from 'next/link'

import styles from './CategoryLabel.module.css'

export type CategoryLabelProps = {
  categoryName: Category['name']
  href: string
}

export function CategoryLabel({ categoryName, href }: CategoryLabelProps) {
  const hashTag = categoryName.split(' ').map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1)
  })

  return (
    <Link href={href} legacyBehavior>
      <a className={styles.label}>#{hashTag}</a>
    </Link>
  )
}
