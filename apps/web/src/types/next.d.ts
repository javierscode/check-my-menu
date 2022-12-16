/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserData } from '@domain/entities/user'
import type { GetServerSidePropsContext } from 'next/types'

export type AuthProps = {
  token?: string | null
  profile?: UserData | null
}

export type CustomGetServerSideProps<T extends { [key: string]: any }> = (
  context: GetServerSidePropsContext,
  auth: AuthProps
) => Promise<GetServerSideProps<T & { auth: AuthProps }>>
