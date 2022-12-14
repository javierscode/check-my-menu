import Image from 'next/image'

import styles from './Banner.module.css'

type Props = {
  src: string
  alt: string
}

export function Banner({ src, alt }: Props) {
  return (
    <picture className={styles.banner}>
      <Image src={src} alt={alt} fill />
    </picture>
  )
}
