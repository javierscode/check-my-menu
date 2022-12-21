import * as yup from 'yup'

export const RestaurantSchema = yup.object().shape({
  name: yup.string().required(),
  domain: yup
    .string()
    .required()
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid domain'),
  location: yup.string().required(),
  description: yup.string().required(),
})
