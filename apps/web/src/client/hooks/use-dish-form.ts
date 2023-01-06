import { yupResolver } from '@hookform/resolvers/yup'
import { Allergen } from '@shared/domain/entities/allergen'
import { Dish } from '@shared/domain/entities/dish'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { createDish } from '../services/dish/create-dish.fetch'
import { editDish } from '../services/dish/edit-dish.fetch'
import { uploadImage } from '../services/upload-image.fetch'
import { useAvailableCategories } from './use-available-categories'

export type Inputs = {
  name: string
  description: string
  price: number
  categoryIds: string[]
  allergens: Allergen[]
  image: FileList
}

export const DishSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  price: yup.string().required(),
  categoryIds: yup.array().of(yup.string()).required(),
  allergens: yup.array().of(yup.string()).required(),
})

export function useDishForm(dish?: Dish, onCloseForm?: (dish?: Dish) => void) {
  const editingMode = !!dish
  const router = useRouter()
  const restaurantId = router.query.restaurantId as string
  const availableCategories = useAvailableCategories(restaurantId)

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      name: dish?.name,
      description: dish?.description,
      price: dish?.price,
      categoryIds: dish?.categoryIds,
      allergens: dish?.allergens,
    },
    resolver: yupResolver(DishSchema),
  })
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit: SubmitHandler<Inputs> = async ({
    name,
    description,
    price,
    categoryIds,
    allergens,
    image: ImageFile,
  }) => {
    let image: string | undefined
    if (ImageFile.length > 0) {
      image = await uploadImage(ImageFile[0], 'dish')
      if (!image) return
    }

    let newDish: Dish | undefined
    if (editingMode) {
      newDish = await editDish({
        id: dish?.id,
        name,
        description,
        price,
        image: image || dish?.image,
        allergens,
        categoryIds,
        restaurantId,
      })
    } else {
      if (!image) return
      newDish = await createDish({
        name,
        description,
        price,
        image,
        allergens,
        categoryIds,
        restaurantId,
      })
    }

    onCloseForm?.(newDish)
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
    control,
    register,
    handleSubmit: handleSubmit(onSubmitWithLoading),
    errors,
    availableCategories,
    editingMode,
    isLoading,
  }
}
