import { useCategoryForm } from '@client/infrastructure/hooks/use-category-form'
import { Category } from '@shared/domain/entities/category'
import Image from 'next/image'

import { Input } from '../../atoms/Input'
import { TextArea } from '../../atoms/TextArea'
import styles from './CategoryForm.module.css'

type Props = {
  item?: Category
  onCloseForm?: (newCategory?: Category) => void
}

export function CategoryForm({ item: category, onCloseForm }: Props) {
  const { handleSubmit, editingMode, register, errors, isLoading } = useCategoryForm(
    category,
    onCloseForm
  )

  return (
    <form onSubmit={handleSubmit} className={styles.form} role='form'>
      <h1 className={styles.title}>{editingMode ? 'Edit' : 'Create'} Category</h1>
      <Input
        id='name'
        title='Name'
        placeholder='Category name'
        type='text'
        {...register('name', { required: true })}
        error={errors.name?.message}
      />
      <TextArea
        id='description'
        title='Description'
        placeholder='Description'
        {...register('description', { required: true })}
        error={errors.description?.message}
      />
      {editingMode && category?.image && (
        <div className={styles.label}>
          <p>Current image preview</p>
          <div className={styles.image}>
            <Image src={category.image} alt={category.name} fill />
          </div>
        </div>
      )}
      <Input
        id='image'
        title={editingMode ? 'Change image' : 'Image'}
        type='file'
        accept='image/*'
        {...register('image', { required: true })}
        error={errors.image?.message}
      />
      <button type='submit' disabled={isLoading}>
        {isLoading ? 'Loading...' : editingMode ? 'Update' : 'Create'}
      </button>
    </form>
  )
}
