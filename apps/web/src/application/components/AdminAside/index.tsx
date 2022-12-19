import Link from 'next/link'
import { useRouter } from 'next/router'

import styles from './AdminAside.module.css'

type Props = {
  restaurantName: string
  restaurantDomain: string
}

export function AdminAside({ restaurantName, restaurantDomain }: Props) {
  const router = useRouter()

  const restaurantId = router.query.restaurantId as string
  const currentPath = router.asPath

  const pathToCategories = `/admin/${restaurantId}/categories`
  const pathToDishes = `/admin/${restaurantId}/dishes`
  const pathToRestaurants = `/admin/`
  const pathToPreview = `/${restaurantDomain}`

  return (
    <aside className={styles.aside}>
      <div className={styles.title}>
        <h2>{restaurantName}</h2>
        <hr />
      </div>

      <div className={styles.links}>
        <Link
          href={pathToCategories}
          className={currentPath === pathToCategories ? styles.selected : ''}
        >
          Categories
        </Link>
        <Link href={pathToDishes}>Dishes</Link>
      </div>

      <div className={styles.footer}>
        <Link href={pathToRestaurants}>Back to restaurants</Link>
        <Link href={pathToPreview} target='_blank'>
          <button>See Preview</button>
        </Link>
        <button>Download QR</button>
      </div>
    </aside>
  )
}
