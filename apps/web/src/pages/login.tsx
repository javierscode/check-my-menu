import { UserData } from '@domain/entities/user'
import { useAuthContext } from '@infrastructure/contexts/auth.context'
import { requireNoAuth } from '@infrastructure/gssp/require-no-auth.gssp'
import { Fetcher } from '@infrastructure/services/fetcher'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { updateAuth, token } = useAuthContext()

  const router = useRouter()

  if (token) router.push('/admin')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      Fetcher.post<{
        token: string
        profile: UserData
      }>('/api/auth/login', { body: { email, password } }).then(({ error, data }) => {
        if (error || !data) {
          console.error(error)
          return
        }
        const { token, profile } = data
        updateAuth(token, profile)
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='email'>Email</label>
        <input type='email' id='email' value={email} onChange={e => setEmail(e.target.value)} />
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          id='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export const getServerSideProps = requireNoAuth()
