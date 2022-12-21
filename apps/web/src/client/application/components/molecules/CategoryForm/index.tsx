import { createCategory } from '@client/infrastructure/api/category/create-category.fetch'
import { editCategory } from '@client/infrastructure/api/category/edit-category.fetch'
import { uploadImage } from '@client/infrastructure/api/upload-image.fetch'
import { yupResolver } from '@hookform/resolvers/yup'
import { Category } from '@shared/domain/entities/category'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Input } from '../../atoms/Input'
import { TextArea } from '../../atoms/TextArea'
import styles from './CategoryForm.module.css'
import { CategorySchema } from './schema'

type Inputs = {
  name: string
  description: string
  image: FileList
}

type Props = {
  item?: Category
  onCloseForm?: (newCategory?: Category) => void
}

export function CategoryForm({ item: category, onCloseForm }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      name: category?.name,
      description: category?.description,
    },
    resolver: yupResolver(CategorySchema),
  })
  const router = useRouter()
  const restaurantId = router.query.restaurantId as string

  const editingMode = !!category

  const onSubmit: SubmitHandler<Inputs> = async ({ name, description, image: ImageFile }) => {
    let image: string | undefined
    if (ImageFile.length > 0) {
      image = await uploadImage(ImageFile[0], 'category')
      if (!image) return
    }

    let newCategory: Category | undefined
    if (editingMode) {
      newCategory = await editCategory({
        id: category?.id,
        name,
        description,
        image: image || category?.image,
        restaurantId,
      })
    } else {
      if (!image) return
      newCategory = await createCategory({ name, description, image, restaurantId })
    }

    onCloseForm?.(newCategory)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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
      <button type='submit'>{editingMode ? 'Update' : 'Create'}</button>
    </form>
  )
}
