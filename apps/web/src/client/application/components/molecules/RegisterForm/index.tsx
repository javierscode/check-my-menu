import { registerNewUser } from '@client/infrastructure/api/user/register.fetch'
import { useAuthContext } from '@client/infrastructure/contexts/auth.context'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Input } from '../../atoms/Input'
import styles from './RegisterForm.module.css'
import { RegisterSchema } from './schema'

type Inputs = {
  name: string
  lastname: string
  email: string
  password: string
}

export function RegisterForm() {
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.row}>
        <Input
          id='name'
          placeholder='Name'
          type='text'
          {...register('name', { required: true })}
          error={errors.name?.message}
        />
        <Input
          id='lastname'
          placeholder='Lastname'
          type='text'
          {...register('lastname', { required: true })}
          error={errors.lastname?.message}
        />
      </div>
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
      <button type='submit'>Sign up</button>
      {registerError && <p className={styles.error}>Something went wrong</p>}
    </form>
  )
}