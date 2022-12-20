import { Allergen } from '@domain/entities/allergen'
import { Category } from '@domain/entities/category'
import { Dish } from '@domain/entities/dish'
import { yupResolver } from '@hookform/resolvers/yup'
import { uploadImage } from '@infrastructure/api/upload-image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { createDish } from './create-dish'
import { editDish } from './edit-dish'
import { getAvailableCategories } from './get-available-categories'
import { DishSchema } from './schema'

type Inputs = {
  name: string
  description: string
  price: number
  categoryIds: string[]
  allergens: Allergen[]
  image: FileList
}

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

  return {
    control,
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    availableCategories,
    editingMode,
  }
}

function useAvailableCategories(restaurantId: string) {
  const [categories, setCategories] = useState<Category[]>([])
  useEffect(() => {
    const fetch = async () => {
      const availableCategories: Category[] = await getAvailableCategories(restaurantId)
      setCategories(availableCategories)
    }
    if (categories.length > 0 || !restaurantId) return
    fetch()
  }, [restaurantId, categories.length])
  return categories
}
