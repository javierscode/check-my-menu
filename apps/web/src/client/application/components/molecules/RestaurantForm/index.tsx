import { useRestaurantForm } from '@client/infrastructure/hooks/use-restaurant-form'
import { Restaurant } from '@shared/domain/entities/restaurant'

import { Input } from '../../atoms/Input'
import { TextArea } from '../../atoms/TextArea'
import styles from './RestaurantForm.module.css'

type Props = {
  item?: Restaurant
  onCloseForm?: (newRestaurant?: Restaurant) => void
}

export function RestaurantForm({ item: restaurant, onCloseForm }: Props) {
  const { handleSubmit, editingMode, register, errors, isLoading } = useRestaurantForm(
    restaurant,
    onCloseForm
  )

  return (
    <form onSubmit={handleSubmit} className={styles.form} role='form'>
      <h1 className={styles.title}>{editingMode ? 'Edit' : 'Create'} Restaurant</h1>
      <Input
        id='name'
        title='Name'
        placeholder='Restaurant name'
        type='text'
        {...register('name', { required: true })}
        error={errors.name?.message}
      />
      <Input
        id='domain'
        title='Domain'
        placeholder='restaurant-domain'
        type='text'
        {...register('domain', { required: true })}
        error={errors.domain?.message}
      />
      <Input
        id='location'
        title='Location'
        placeholder='Location'
        type='text'
        {...register('location', { required: true })}
        error={errors.location?.message}
      />
      <TextArea
        id='description'
        title='Description'
        placeholder='Description'
        {...register('description', { required: true })}
        error={errors.description?.message}
      />
      <button type='submit' disabled={isLoading}>
        {isLoading ? 'Loading...' : editingMode ? 'Update' : 'Create'}
      </button>
    </form>
  )
}
