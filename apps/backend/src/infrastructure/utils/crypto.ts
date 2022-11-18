import { compare as bcryptCompare, hash as bcryptHash } from 'bcrypt'

const HASH_SALT = 10
const ENVIRONMENT = process.env.NODE_ENV || 'dev'
const isTestingMode = ENVIRONMENT === 'test'

export function compare(data: string, encrypted: string): Promise<boolean> {
  if (isTestingMode) {
    return Promise.resolve(data === encrypted)
  }
  return bcryptCompare(data, encrypted)
}

export function hash(data: string): Promise<string> {
  if (isTestingMode) return Promise.resolve(data)
  else return bcryptHash(data, HASH_SALT)
}
