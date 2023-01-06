import { useDishForm } from '@client/hooks/use-dish-form'
import { Allergen } from '@shared/domain/entities/allergen'
import { Dish } from '@shared/domain/entities/dish'
import Image from 'next/image'
import { Controller } from 'react-hook-form'

import { Input } from '../../atoms/Input'
import { Listbox } from '../../atoms/ListBox'
import { TextArea } from '../../atoms/TextArea'
import styles from './DishForm.module.css'

type Props = {
  item?: Dish
  onCloseForm?: (newDish?: Dish) => void
}

export function DishForm({ item: dish, onCloseForm }: Props) {
  const { handleSubmit, editingMode, control, register, errors, availableCategories, isLoading } =
    useDishForm(dish, onCloseForm)

  return (
    <form onSubmit={handleSubmit} className={styles.form} role='form'>
      <h1 className={styles.title}>{editingMode ? 'Edit' : 'Create'} Dish</h1>
      <div className={styles.row}>
        <div className={styles.col}>
          <Input
            id='name'
            title='Name'
            placeholder='Category name'
            type='text'
            {...register('name', { required: true })}
            error={errors.name?.message}
          />
          <Input
            id='price'
            title='Price'
            placeholder='Price'
            type='number'
            {...register('price', { required: true })}
            error={errors.price?.message}
          />
          <TextArea
            id='description'
            title='Description'
            placeholder='Description'
            {...register('description', { required: true })}
            error={errors.description?.message}
          />
          {editingMode && dish?.image && (
            <div className={styles.label}>
              <p>Current image preview</p>
              <div className={styles.image}>
                <Image src={dish.image} alt={dish.name} fill />
              </div>
            </div>
          )}
        </div>
        <div className={styles.col}>
          <Controller
            control={control}
            name='categoryIds'
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <Listbox
                title='Categories'
                onChange={onChange} // send value to hook form
                value={value || []}
                items={availableCategories}
                error={errors.categoryIds?.message}
              />
            )}
          />
          <Controller
            control={control}
            name='allergens'
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <Listbox
                title='Allergens'
                onChange={onChange} // send value to hook form
                value={value || []}
                items={Object.values(Allergen)}
                error={errors.allergens?.message}
              />
            )}
          />
          <Input
            id='image'
            title={editingMode ? 'Change image' : 'Image'}
            type='file'
            accept='image/*'
            {...register('image', { required: true })}
            error={errors.image?.message}
          />
        </div>
      </div>
      <button className={styles.button} type='submit' disabled={isLoading}>
        {isLoading ? 'Loading...' : editingMode ? 'Update' : 'Create'}
      </button>
    </form>
  )
}
