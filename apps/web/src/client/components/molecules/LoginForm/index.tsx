import { useLoginForm } from '@client/hooks/use-login-form'

import { Input } from '../../atoms/Input'
import styles from './LoginForm.module.css'

export function LoginForm() {
  const { register, handleSubmit, errors, loginError, isLoading } = useLoginForm()

  return (
    <form onSubmit={handleSubmit} className={styles.form} role='form'>
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
        {isLoading ? 'Loading...' : 'Sign in'}
      </button>
      {loginError && <p className={styles.error}>Wrong credencials</p>}
    </form>
  )
}
