import { Allergen } from '@shared/domain/entities/allergen'

import styles from './AllergenBullet.module.css'

export type AllergenBulletProps = {
  allergen: Allergen
}

export function AllergenBullet({ allergen }: AllergenBulletProps) {
  const firstLetter = allergen.charAt(0).toUpperCase()

  return (
    <div className={styles.bullet} role='contentinfo'>
      {firstLetter}
      <span role={'tooltip'} className={styles.tooltip}>
        {allergen}
      </span>
    </div>
  )
}
