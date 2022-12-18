import { LoginForm } from '@application/components/LoginForm'
import { UserAccessLayout } from '@application/components/UserAccessLayout'
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
    <UserAccessLayout
      imageUrl='/login.jpeg'
      title='Login'
      subTitle='Welcome back!'
      link={{ introduction: "You don't have an account?", text: 'Sign up', to: '/register' }}
    >
      <LoginForm />
    </UserAccessLayout>
  )
}

export const getServerSideProps = requireNoAuth()
