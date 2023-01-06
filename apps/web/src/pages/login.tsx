import { UserAccessLayout } from '@client/components/atoms/UserAccessLayout'
import { LoginForm } from '@client/components/molecules/LoginForm'
import { requireNoAuth } from '@server/infrastructure/gssp/require-no-auth.gssp'
import Head from 'next/head'

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Login | Check my menu</title>
      </Head>
      <UserAccessLayout
        imageUrl='/login.jpeg'
        title='Login'
        subTitle='Welcome back!'
        link={{ introduction: "You don't have an account?", text: 'Sign up', to: '/register' }}
      >
        <LoginForm />
      </UserAccessLayout>
    </>
  )
}

export const getServerSideProps = requireNoAuth()
