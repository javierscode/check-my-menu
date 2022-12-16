import { requireNoAuth } from '@infrastructure/gssp/require-no-auth.gssp'

export default function RegisterPage() {
  return (
    <div>
      <h1>Register</h1>
    </div>
  )
}

export const getServerSideProps = requireNoAuth()
