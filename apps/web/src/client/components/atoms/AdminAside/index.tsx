import { generateQr } from '@client/services/generate-qr.fetch'
import Link from 'next/link'
import { useRouter } from 'next/router'

import styles from './AdminAside.module.css'

export type AdminAsideProps = {
  restaurantId: string
  restaurantName: string
  restaurantDomain: string
}

export function AdminAside({ restaurantId, restaurantName, restaurantDomain }: AdminAsideProps) {
  const router = useRouter()
  const currentPath = router.asPath

  const pathToCategories = `/admin/${restaurantId}/categories`
  const pathToDishes = `/admin/${restaurantId}/dishes`
  const pathToRestaurants = `/admin/`
  const pathToPreview = `/${restaurantDomain}`

  const handleDownload = async () => {
    const origin = window.location.origin
    const qr = await generateQr(origin + pathToPreview)
    const link = document.createElement('a')
    link.href = qr
    link.download = 'qr.png'
    link.click()
  }

  return (
    <aside className={styles.aside} role='menu'>
      <div className={styles.title}>
        <h2>{restaurantName}</h2>
        <hr />
      </div>

      <div className={styles.links} role='navigation'>
        <Link
          href={pathToCategories}
          className={currentPath === pathToCategories ? styles.selected : ''}
        >
          Categories
        </Link>
        <Link href={pathToDishes} className={currentPath === pathToDishes ? styles.selected : ''}>
          Dishes
        </Link>
      </div>

      <div className={styles.footer} role='complementary'>
        <Link href={pathToRestaurants}>Back to restaurants</Link>
        <Link href={pathToPreview} target='_blank'>
          <button>See Preview</button>
        </Link>
        <button onClick={handleDownload}>Download QR</button>
      </div>
    </aside>
  )
}
