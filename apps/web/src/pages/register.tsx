import { UserAccessLayout } from '@client/components/atoms/UserAccessLayout'
import { RegisterForm } from '@client/components/molecules/RegisterForm'
import { requireNoAuth } from '@server/infrastructure/gssp/require-no-auth.gssp'
import Head from 'next/head'

export default function RegisterPage() {
  return (
    <>
      <Head>
        <title>Register | Check my menu</title>
      </Head>
      <UserAccessLayout
        imageUrl='/register.webp'
        title='Register'
        subTitle='Create your account'
        link={{ introduction: 'Do you have an account', text: 'Sign in', to: '/login' }}
      >
        <RegisterForm />
      </UserAccessLayout>
    </>
  )
}

export const getServerSideProps = requireNoAuth()
