import { Input } from '@application/components/Input'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuthContext } from '@infrastructure/contexts/auth.context'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { registerNewUser } from './register'
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
  const [registerError, setRegisterError] = useState<string | null>(null)

  const onSubmit: SubmitHandler<Inputs> = ({ name, lastname, email, password }) => {
    try {
      setRegisterError(null)
      registerNewUser({ name, lastname, email, password, updateAuth })
    } catch (error) {
      setRegisterError('Something went wrong')
    }
  }

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
      {registerError && <p className={styles.error}>{registerError}</p>}
    </form>
  )
}
