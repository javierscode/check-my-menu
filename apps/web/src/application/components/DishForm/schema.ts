import * as yup from 'yup'

export const DishSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  price: yup.string().required(),
  categoryIds: yup.array().of(yup.string()).required(),
  allergens: yup.array().of(yup.string()).required(),
})
