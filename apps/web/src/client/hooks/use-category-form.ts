import { yupResolver } from '@hookform/resolvers/yup'
import { Category } from '@shared/domain/entities/category'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { createCategory } from '../services/category/create-category.fetch'
import { editCategory } from '../services/category/edit-category.fetch'
import { uploadImage } from '../services/upload-image.fetch'

type Inputs = {
  name: string
  description: string
  image: FileList
}

export const CategorySchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
})

export function useCategoryForm(
  category?: Category,
  onCloseForm?: (newCategory?: Category) => void
) {
  const editingMode = !!category
  const router = useRouter()
  const restaurantId = router.query.restaurantId as string

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
  const [isLoading, setIsLoading] = useState(false)

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

  const onSubmitWithLoading = async (data: Inputs) => {
    setIsLoading(true)
    try {
      await onSubmit(data)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    register,
    handleSubmit: handleSubmit(onSubmitWithLoading),
    errors,
    editingMode,
    isLoading,
  }
}
