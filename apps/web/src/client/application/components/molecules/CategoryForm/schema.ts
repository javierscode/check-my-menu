import * as yup from 'yup'

export const CategorySchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
})
