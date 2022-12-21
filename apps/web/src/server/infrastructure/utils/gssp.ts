import { GetServerSidePropsContext } from 'next'

type Params = {
  req: GetServerSidePropsContext['req']
  resolvedUrl: string
}

export const isSSR = ({ req, resolvedUrl }: Params) => req.url === resolvedUrl
