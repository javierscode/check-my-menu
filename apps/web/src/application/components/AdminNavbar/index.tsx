import { LogoutIcon } from '@application/icons/LogoutIcon'
import { useAuthContext } from '@infrastructure/contexts/auth.context'
import { useRouter } from 'next/router'

import styles from './AdminNavbar.module.css'
import { logout } from './logout'

export function AdminNavbar() {
  const { updateAuth, profile } = useAuthContext()
  const router = useRouter()

  return (
    <nav className={styles.navigation}>
      <h1>Check my menu</h1>
      <div className={styles.row}>
        <h2>
          {profile?.name} {profile?.lastname}
        </h2>
        <LogoutIcon onClick={() => logout({ updateAuth, router })} />
      </div>
    </nav>
  )
}
