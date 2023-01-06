import { useRegisterForm } from '@client/hooks/use-register-form'

import { Input } from '../../atoms/Input'
import styles from './RegisterForm.module.css'

export function RegisterForm() {
  const { register, handleSubmit, errors, registerError, isLoading } = useRegisterForm()

  return (
    <form onSubmit={handleSubmit} className={styles.form} role='form'>
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
      <button type='submit' disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Sign up'}
      </button>
      {registerError && <p className={styles.error}>Something went wrong</p>}
    </form>
  )
}
