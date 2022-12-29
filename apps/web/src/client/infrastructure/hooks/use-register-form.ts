import { registerNewUser } from '@client/infrastructure/api/user/register.fetch'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useAuthContext } from '../contexts/auth.context'

type Inputs = {
  name: string
  lastname: string
  email: string
  password: string
}

const RegisterSchema = yup
  .object({
    name: yup.string().required(),
    lastname: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
  })
  .required()

export function useRegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(RegisterSchema),
  })
  const { updateAuth } = useAuthContext()
  const router = useRouter()
  const [registerError, setRegisterError] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onSubmit: SubmitHandler<Inputs> = ({ name, lastname, email, password }) =>
    registerNewUser({
      name,
      lastname,
      email,
      password,
      updateAuth,
      setError: setRegisterError,
      router,
    })

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
    registerError,
    isLoading,
  }
}
