import { LeftArrowIcon } from '@client/application/icons/LeftArrowIcon'
import Link from 'next/link'

import styles from './Navbar.module.css'

type Props = {
  restaurantTitle: string
  backTo?: string
  currentLocation?: string
}

export function Navbar({ restaurantTitle, backTo, currentLocation }: Props) {
  return (
    <nav className={styles.navigation}>
      <div className={styles.container}>
        <div className={styles.row}>
          {backTo && (
            <Link href={backTo}>
              <LeftArrowIcon />
            </Link>
          )}
          {backTo && currentLocation ? <h1>{currentLocation}</h1> : <h1>Check my menu</h1>}
        </div>
        <h2>{restaurantTitle}</h2>
      </div>
    </nav>
  )
}
