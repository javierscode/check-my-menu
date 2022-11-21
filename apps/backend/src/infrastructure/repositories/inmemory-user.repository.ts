import { User } from '@domain/entities/user.entity'
import { UserRepository } from '@domain/repositories/user.repository'
import { EmailVO } from '@domain/value-objects/email.vo'
import { UuidVO } from '@domain/value-objects/uuid.vo'
import { injectable } from 'inversify'

const USERS_DDBB: User[] = []

@injectable()
export class InMemoryUserRepository implements UserRepository {
  async findById(id: UuidVO): Promise<User | null> {
    const foundUser = await Promise.resolve(USERS_DDBB.find(user => user.id.equals(id)))
    if (!foundUser) return null
    return foundUser
  }

  async findByEmail(email: EmailVO): Promise<User | null> {
    const foundUser = await Promise.resolve(USERS_DDBB.find(user => user.email.equals(email)))
    if (!foundUser) return null
    return foundUser
  }

  async create(domainUser: User): Promise<void> {
    await Promise.resolve(USERS_DDBB.push(domainUser))
  }

  async update(domainUser: User): Promise<void> {
    const foundIndex = await Promise.resolve(
      USERS_DDBB.findIndex(user => user.id.equals(domainUser.id))
    )
    if (foundIndex) USERS_DDBB[foundIndex] = domainUser
  }
}
