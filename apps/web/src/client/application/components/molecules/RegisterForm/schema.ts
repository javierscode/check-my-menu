import * as yup from 'yup'

export const RegisterSchema = yup
  .object({
    name: yup.string().required(),
    lastname: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
  })
  .required()
