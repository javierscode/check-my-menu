import { Allergen } from '@domain/entities/allergen'

import styles from './AllergenBullet.module.css'

type Props = {
  allergen: Allergen
}

export function AllergenBullet({ allergen }: Props) {
  const firstLetter = allergen.charAt(0).toUpperCase()

  return <span className={styles.bullet}>{firstLetter}</span>
}
