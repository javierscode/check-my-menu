import { LoginForm } from '@application/components/LoginForm'
import { UserAccessLayout } from '@application/components/UserAccessLayout'
import { requireNoAuth } from '@infrastructure/gssp/require-no-auth.gssp'

export default function LoginPage() {
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
