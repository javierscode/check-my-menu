import { useAuthContext } from '@client/infrastructure/contexts/auth.context'
import { useRouter } from 'next/router'

import { logout } from '../../../../infrastructure/api/user/logout.fetch'
import { LogoutIcon } from '../../../icons/LogoutIcon'
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
