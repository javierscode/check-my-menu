import { createRestaurant } from '@client/infrastructure/api/restaurant/create-restaurant.fetch'
import { editRestaurant } from '@client/infrastructure/api/restaurant/edit-restaurant.fetch'
import { yupResolver } from '@hookform/resolvers/yup'
import { Restaurant } from '@shared/domain/entities/restaurant'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Input } from '../../atoms/Input'
import { TextArea } from '../../atoms/TextArea'
import styles from './RestaurantForm.module.css'
import { RestaurantSchema } from './schema'

type Inputs = {
  name: string
  domain: string
  location: string
  description: string
}

type Props = {
  item?: Restaurant
  onCloseForm?: (newRestaurant?: Restaurant) => void
}

export function RestaurantForm({ item: restaurant, onCloseForm }: Props) {
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

  const editingMode = !!restaurant

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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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
      <button type='submit'>{editingMode ? 'Update' : 'Create'}</button>
    </form>
  )
}
