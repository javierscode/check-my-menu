import { User } from '@domain/entities/user.entity'
import { UserRepository } from '@domain/repositories/user.repository'
import { EmailVO } from '@domain/value-objects/email.vo'
import { UuidVO } from '@domain/value-objects/uuid.vo'
import { UserMother } from '@test/domain/mothers/user.entity.mother'

export class UserRepositoryMock implements UserRepository {
  private findByIdMock: jest.Mock<Promise<User> | null, [id: UuidVO]>
  private findByEmailMock: jest.Mock<Promise<User> | null, [email: EmailVO]>
  private createMock: jest.Mock
  private updateMock: jest.Mock
  private expectedUser?: User

  constructor() {
    this.findByIdMock = jest.fn((id: UuidVO) => {
      if (!id || this.createMock.mock.calls.length <= 0) return null
      if (this.expectedUser) return Promise.resolve(this.expectedUser)
      else return UserMother.random()
    })
    this.findByEmailMock = jest.fn((email: EmailVO) => {
      if (!email || this.createMock.mock.calls.length <= 0) return null
      if (this.expectedUser) return Promise.resolve(this.expectedUser)
      else return UserMother.random()
    })
    this.createMock = jest.fn()
    this.updateMock = jest.fn()
  }

  remove(): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async findById(id: UuidVO): Promise<User | null> {
    return await this.findByIdMock(id)
  }

  async findByEmail(email: EmailVO): Promise<User | null> {
    return await this.findByEmailMock(email)
  }

  async create(domainUser: User): Promise<void> {
    await Promise.resolve(this.createMock(domainUser))
  }

  async update(domainUser: User): Promise<void> {
    await Promise.resolve(this.updateMock(domainUser))
  }

  assertFindByIdHaveBeenCalledWith(expected: UuidVO): void {
    expect(this.findByIdMock).toHaveBeenCalledWith(expected)
  }

  assertFindByEmailHaveBeenCalledWith(expected: EmailVO): void {
    expect(this.findByEmailMock).toHaveBeenCalledWith(expected)
  }

  assertCreateHaveBeenCalledWith(expected: User): void {
    expect(this.createMock).toHaveBeenCalledWith(expected)
  }

  assertUpdateHaveBeenCalledWith(expected: User): void {
    expect(this.updateMock).toHaveBeenCalledWith(expected)
  }

  setExpectedUser(expectedUser: User) {
    this.createMock(expectedUser)
    this.expectedUser = expectedUser
  }
}
