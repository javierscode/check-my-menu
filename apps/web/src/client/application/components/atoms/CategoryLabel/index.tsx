import { Category } from '@shared/domain/entities/category'
import Link from 'next/link'

import styles from './CategoryLabel.module.css'

type Props = {
  categoryName: Category['name']
  href: string
}

export function CategoryLabel({ categoryName, href }: Props) {
  const hashTag = categoryName.split(' ').map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1)
  })

  return (
    <Link className={styles.label} href={href}>
      #{hashTag}
    </Link>
  )
}
