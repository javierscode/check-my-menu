import { Allergen } from '@shared/domain/entities/allergen'

import styles from './AllergenBullet.module.css'

type Props = {
  allergen: Allergen
}

export function AllergenBullet({ allergen }: Props) {
  const firstLetter = allergen.charAt(0).toUpperCase()

  return (
    <div className={styles.bullet}>
      {firstLetter}
      <span className={styles.tooltip}>{allergen}</span>
    </div>
  )
}
