import { RegisterForm } from '@application/components/RegisterForm'
import { UserAccessLayout } from '@application/components/UserAccessLayout'
import { useAuthContext } from '@infrastructure/contexts/auth.context'
import { requireNoAuth } from '@infrastructure/gssp/require-no-auth.gssp'
import { useRouter } from 'next/router'

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
