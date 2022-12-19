import { Input } from '@application/components/Input'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuthContext } from '@infrastructure/contexts/auth.context'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { login } from './login'
import styles from './LoginForm.module.css'
import { LoginSchema } from './schema'

type Inputs = {
  email: string
  password: string
}

export function LoginForm() {
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

  const onSubmit: SubmitHandler<Inputs> = ({ email, password }) =>
    login({ email, password, updateAuth, setError: setLoginError, router })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <Input
        id='email'
        placeholder='Email'
        type='email'
        {...register('email', { required: true })}
        error={errors.email?.message}
      />
      <Input
        id='password'
        placeholder='Password'
        type='password'
        {...register('password', { required: true })}
        error={errors.password?.message}
      />
      <button type='submit'>Sign in</button>
      {loginError && <p className={styles.error}>Wrong credencials</p>}
    </form>
  )
}
