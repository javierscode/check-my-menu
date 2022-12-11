import { User } from '@domain/entities/user.entity'
import { UserRepository } from '@domain/repositories/user.repository'
import { EmailVO } from '@domain/value-objects/email.vo'
import { NameVO } from '@domain/value-objects/name.vo'
import { PasswordVO } from '@domain/value-objects/password.vo'
import { UuidVO } from '@domain/value-objects/uuid.vo'
import { UserDB } from '@prisma/client'

import { PrismaRepository } from '../respository.prisma'

export class PostgreSQLUserRepository extends PrismaRepository implements UserRepository {
  private domainToInfrastucture(domainEntity: User): UserDB {
    return {
      id: domainEntity.id.value,
      name: domainEntity.name.value,
      lastname: domainEntity.lastname.value,
      email: domainEntity.email.value,
      password: domainEntity.password.value,
    }
  }

  private infrastuctureToDomain(infrastuctureEntity: UserDB): User {
    return new User(
      new UuidVO(infrastuctureEntity.id),
      new NameVO(infrastuctureEntity.name),
      new NameVO(infrastuctureEntity.lastname),
      new EmailVO(infrastuctureEntity.email),
      new PasswordVO(infrastuctureEntity.password)
    )
  }

  async findByEmail(email: EmailVO): Promise<User | null> {
    const user = await this.client.userDB.findUnique({
      where: { email: email.value },
    })
    return user ? this.infrastuctureToDomain(user) : null
  }

  async findById(id: UuidVO): Promise<User | null> {
    const user = await this.client.userDB.findUnique({
      where: { id: id.value },
    })
    return user ? this.infrastuctureToDomain(user) : null
  }

  async create(domainEntity: User): Promise<void> {
    await this.client.userDB.create({
      data: this.domainToInfrastucture(domainEntity),
    })
  }

  async update(domainEntity: User): Promise<void> {
    await this.client.userDB.update({
      where: { id: domainEntity.id.value },
      data: this.domainToInfrastucture(domainEntity),
    })
  }

  async remove(id: UuidVO): Promise<void> {
    await this.client.userDB.delete({
      where: { id: id.value },
    })
  }
}
