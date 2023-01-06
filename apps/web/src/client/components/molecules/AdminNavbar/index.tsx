import { useAuthContext } from '@client/contexts/auth.context'
import { LogoutIcon } from '@client/icons/LogoutIcon'
import { logout } from '@client/services/user/logout.fetch'
import { useRouter } from 'next/router'

import styles from './AdminNavbar.module.css'

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
        <LogoutIcon
          name='logout'
          data-testid='logout-icon'
          onClick={() => logout({ updateAuth, router })}
        />
      </div>
    </nav>
  )
}
