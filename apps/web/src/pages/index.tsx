export default function Web() {
  return (
    <div>
      <h1>Check My Menu</h1>
    </div>
  )
}

export const getServerSideProps = () => {
  return {
    redirect: {
      destination: '/login',
      permanent: false,
    },
  }
}
