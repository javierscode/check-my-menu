import { Input } from '@application/components/Input'
import { Category } from '@domain/entities/category'
import { yupResolver } from '@hookform/resolvers/yup'
import { uploadImage } from '@infrastructure/api/upload-image'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'

import { TextArea } from '../TextArea'
import styles from './CategoryForm.module.css'
import { createCategory } from './create-category'
import { editCategory } from './edit-category'
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
    console.log('onSubmit', { name, description, ImageFile, restaurantId })

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
    console.log('newCategory', newCategory)

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
