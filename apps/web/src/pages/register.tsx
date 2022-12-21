import { UserAccessLayout } from '@client/application/components/atoms/UserAccessLayout'
import { RegisterForm } from '@client/application/components/molecules/RegisterForm'
import { requireNoAuth } from '@server/infrastructure/gssp/require-no-auth.gssp'

export default function RegisterPage() {
  return (
    <UserAccessLayout
      imageUrl='/register.webp'
      title='Register'
      subTitle='Create your account'
      link={{ introduction: 'Do you have an account', text: 'Sign in', to: '/login' }}
    >
      <RegisterForm />
    </UserAccessLayout>
  )
}

export const getServerSideProps = requireNoAuth()
