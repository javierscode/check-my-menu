import { Listbox as ListBox, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { Allergen } from 'src/shared/domain/entities/allergen'
import { Category } from 'src/shared/domain/entities/category'

import styles from './ListBox.module.css'

type Props = {
  items: Category[] | Allergen[]
  value: string[]
  onChange: (value: string[]) => void
  title?: string
  error?: string
}

export const Listbox = ({ items, value, onChange, title, error }: Props) => {
  return (
    <ListBox value={value} onChange={onChange} multiple as={'div'} className={styles.box}>
      {title && <p className={styles.title}>{title}</p>}
      <ListBox.Button
        className={styles.button}
        placeholder={value && value.length > 0 ? 'false' : 'true'}
      >
        {value && value.length > 0
          ? value
              .map(id => {
                let foundItem: Category | Allergen | undefined

                if (typeof items[0] === 'string') {
                  foundItem = (items as Allergen[]).find(item => item === id)
                } else {
                  foundItem = (items as Category[]).find(item => item.id === id)
                }
                if (!foundItem) return ''
                return typeof foundItem === 'string' ? foundItem : foundItem.name
              })
              .join(', ')
          : title
          ? `Select ${title.toLowerCase()}`
          : '...'}
      </ListBox.Button>
      <p className={styles.error}>{error}</p>
      <Transition
        as={Fragment}
        leave='transition ease-in duration-100'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
      >
        <ListBox.Options className={styles.options}>
          {items.map(item => {
            const key = typeof item === 'string' ? item : item.id
            const title = typeof item === 'string' ? item : item.name

            return (
              <ListBox.Option key={key} value={key}>
                {title}
              </ListBox.Option>
            )
          })}
        </ListBox.Options>
      </Transition>
    </ListBox>
  )
}
