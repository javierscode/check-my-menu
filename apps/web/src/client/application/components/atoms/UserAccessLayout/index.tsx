import Image from 'next/image'
import Link from 'next/link'

import styles from './UserAccessLayout.module.css'

export type UserAccessLayoutProps = {
  children: React.ReactNode
  imageUrl: string
  title: string
  subTitle: string
  link: {
    text: string
    to: string
    introduction: string
  }
}

export function UserAccessLayout({
  children,
  imageUrl,
  title,
  subTitle,
  link,
}: UserAccessLayoutProps) {
  return (
    <div className={styles.grid} role={'grid'}>
      <div className={styles.column}>
        <div className={styles.navigation}>
          <h1>Check My Menu</h1>
        </div>
        <div className={styles.container}>
          <h2>{title}</h2>
          <h3>{subTitle}</h3>
          {children}
        </div>
        <div className={styles.footer}>
          {link.introduction} <Link href={link.to}>{link.text}</Link>
        </div>
      </div>
      <div className={styles.picture}>
        <Image src={imageUrl} alt={title} fill />
      </div>
    </div>
  )
}
