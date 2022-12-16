import { requireNoAuth } from '@infrastructure/gssp/require-no-auth.gssp'
import { Button } from 'ui'

export default function Web() {
  return (
    <div>
      <h1>Check My Menu</h1>
      <h2>Find the best restaurants in your area</h2>
      <a href='/test'>Test</a>
      <p>Check out the menu below</p>
      <Button />
    </div>
  )
}

export const getServerSideProps = requireNoAuth()
