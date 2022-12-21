import { yupResolver } from '@hookform/resolvers/yup'
import { Restaurant } from '@shared/domain/entities/restaurant'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { createRestaurant } from '../api/restaurant/create-restaurant.fetch'
import { editRestaurant } from '../api/restaurant/edit-restaurant.fetch'

type Inputs = {
  name: string
  domain: string
  location: string
  description: string
}

const RestaurantSchema = yup.object().shape({
  name: yup.string().required(),
  domain: yup
    .string()
    .required()
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid domain'),
  location: yup.string().required(),
  description: yup.string().required(),
})

export function useRestaurantForm(
  restaurant?: Restaurant,
  onCloseForm?: (newRestaurant?: Restaurant) => void
) {
  const editingMode = !!restaurant

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      name: restaurant?.name,
      domain: restaurant?.domain,
      location: restaurant?.location,
      description: restaurant?.description,
    },
    resolver: yupResolver(RestaurantSchema),
  })

  const onSubmit: SubmitHandler<Inputs> = async ({ name, domain, location, description }) => {
    let newRestaurant: Restaurant | undefined
    if (editingMode) {
      newRestaurant = await editRestaurant({
        id: restaurant?.id,
        name,
        domain,
        location,
        description,
      })
    } else {
      newRestaurant = await createRestaurant({ name, domain, location, description })
    }
    onCloseForm?.(newRestaurant)
  }

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    editingMode,
    errors,
  }
}
