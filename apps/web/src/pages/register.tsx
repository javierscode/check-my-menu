import { UserAccessLayout } from '@application/components/UserAccessLayout'
import { RegisterForm } from '@application/RegisterForm'
import { requireNoAuth } from '@infrastructure/gssp/require-no-auth.gssp'

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
