import { UserAccessLayout } from '@client/application/components/atoms/UserAccessLayout'
import { LoginForm } from '@client/application/components/molecules/LoginForm'
import { requireNoAuth } from '@server/infrastructure/gssp/require-no-auth.gssp'

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
