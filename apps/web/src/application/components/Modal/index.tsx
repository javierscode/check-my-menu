import { CloseIcon } from '@application/icons/CloseIcon'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import style from './Modal.module.css'

type Props = {
  closeModal: () => void
  children: React.ReactNode
}

export function Modal({ closeModal, children }: Props) {
  const [container, setContainer] = useState<HTMLElement | null>(null)

  useEffect(() => {
    if (!children) return
    setContainer(document.getElementById('modal'))
    document.body.classList.add(style.bodyOverflow)
    return () => {
      document.body.classList.remove(style.bodyOverflow)
    }
  }, [children, setContainer])

  if (!children || !container) return null

  return createPortal(
    <div className={style.overlay}>
      <div className={style.modal}>
        <CloseIcon className={style.close} onClick={closeModal} />
        {children}
      </div>
    </div>,
    container
  )
}
