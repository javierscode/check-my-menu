import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useAuthContext } from '../contexts/auth.context'
import { login } from '../services/user/login.fetch'

type Inputs = {
  email: string
  password: string
}

const LoginSchema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required()

export function useLoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(LoginSchema),
  })
  const router = useRouter()
  const { updateAuth } = useAuthContext()
  const [loginError, setLoginError] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onSubmit: SubmitHandler<Inputs> = ({ email, password }) =>
    login({ email, password, updateAuth, setError: setLoginError, router })

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
    loginError,
    isLoading,
  }
}
