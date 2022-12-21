/* eslint-disable @typescript-eslint/no-explicit-any */
import type { GetServerSidePropsContext } from 'next/types'
import { UserData } from 'src/shared/domain/entities/user'

export type AuthProps = {
  token: string | null
  profile: UserData | null
}

export type CustomGetServerSideProps<T extends { [key: string]: any }> = (
  context: GetServerSidePropsContext,
  auth: AuthProps
) => Promise<GetServerSidePropsResult<T & { auth: AuthProps }>>
