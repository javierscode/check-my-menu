import { ConfirmationForm } from '@application/components/ConfirmationForm'
import { Category } from '@domain/entities/category'
import { Dish } from '@domain/entities/dish'
import { Restaurant } from '@domain/entities/restaurant'
import { useState } from 'react'

type deleteApiMethod = (id: string) => Promise<void>

type Item = Restaurant | Category | Dish

type State<T extends Item> = {
  items: T[]
  showModal: boolean
  formToRender: JSX.Element | undefined
}

type ReturnValues<T> = {
  items: T[]
  onAdd: () => void
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  closeModal: () => void
  showModal: boolean
  formToRender: JSX.Element | undefined
}

export function useAdminItemList<T extends Item>(
  initialValue: T[],
  deleteApiMethod: deleteApiMethod,
  ItemForm: ({ item, onCloseForm }: { item?: T; onCloseForm: (newItem?: T) => void }) => JSX.Element
): ReturnValues<T> {
  const [{ items, showModal, formToRender }, setState] = useState<State<T>>({
    items: initialValue,
    showModal: false,
    formToRender: undefined,
  })

  const setItems = (items: T[]) => {
    setState(prev => ({
      ...prev,
      items,
    }))
  }

  const setShowModal = (showModal: boolean) => {
    setState(prev => ({
      ...prev,
      showModal,
    }))
  }

  const setFormToRender = (formToRender?: JSX.Element) => {
    setState(prev => ({
      ...prev,
      formToRender,
    }))
  }

  const closeModal = () => setShowModal(false)

  const addOrUpdateItem = (newItem: T) => {
    const foundItem = items.find(i => i.id === newItem.id)
    if (foundItem) {
      setItems(items.map(i => (i.id === newItem.id ? newItem : i)))
    } else setItems([...items, newItem])
  }

  const deleteItem = async (id: string) => {
    try {
      await deleteApiMethod(id)
      setItems(items.filter(i => i.id !== id))
    } catch (error) {
      console.error(error)
    }
  }

  const onCloseForm = (newItem?: T) => {
    newItem && addOrUpdateItem(newItem)
    closeModal()
  }

  const onAdd = () => {
    setShowModal(true)
    setFormToRender(<ItemForm onCloseForm={onCloseForm} />)
  }

  const onEdit = (id: string) => {
    setShowModal(true)
    const item = items.find(i => i.id === id)
    setFormToRender(<ItemForm item={item} onCloseForm={onCloseForm} />)
  }

  const onDelete = (id: string) => {
    setShowModal(true)
    setFormToRender(
      <ConfirmationForm
        title='Are you sure?'
        onConfirm={() => deleteItem(id).then(closeModal).catch(closeModal)}
        onCancel={closeModal}
      />
    )
  }

  return { items, onAdd, onEdit, onDelete, closeModal, showModal, formToRender }
}
