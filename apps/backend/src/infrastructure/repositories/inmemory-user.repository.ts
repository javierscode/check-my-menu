import { User } from '@domain/entities/user.entity'
import { UserRepository } from '@domain/repositories/user.repository'
import { EmailVO } from '@domain/value-objects/email.vo'
import { UuidVO } from '@domain/value-objects/uuid.vo'

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = []

  async findById(id: UuidVO): Promise<User | null> {
    const foundUser = await Promise.resolve(this.users.find(user => user.id.equals(id)))
    if (!foundUser) return null
    return foundUser
  }

  async findByEmail(email: EmailVO): Promise<User | null> {
    const foundUser = await Promise.resolve(this.users.find(user => user.email.equals(email)))
    if (!foundUser) return null
    return foundUser
  }

  async create(domainUser: User): Promise<void> {
    await Promise.resolve(this.users.push(domainUser))
  }

  async update(domainUser: User): Promise<void> {
    const foundIndex = await Promise.resolve(
      this.users.findIndex(user => user.id.equals(domainUser.id))
    )
    if (foundIndex) this.users[foundIndex] = domainUser
  }
}
