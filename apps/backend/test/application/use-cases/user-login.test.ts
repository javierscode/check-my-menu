import { InvalidUserLoginException } from '@application/exceptions/invalid-user-login.exception'
import { UserLoginUsecase } from '@application/use-cases/user-login.usecase'
import { PasswordVOMother } from '@test/domain/mothers/password.vo.mother'
import { UserMother } from '@test/domain/mothers/user.entity.mother'
import { UserRepositoryMock } from '@test/infrastructure/repositories/user-repository.mock'

import { UserLoginRequestMother } from '../mothers/user-login-request.mother'

let repository: UserRepositoryMock
let usecase: UserLoginUsecase

beforeEach(() => {
  repository = new UserRepositoryMock()
  usecase = new UserLoginUsecase(repository)
})

describe('User Login - Use Case', () => {
  it('should login with a valid email and password', async () => {
    const expectedUser = await UserMother.random()
    repository.setExpectedUser(expectedUser)

    const request = UserLoginRequestMother.create(expectedUser.email, expectedUser.password)

    const userId = await usecase.run(request)

    repository.assertFindByEmailHaveBeenCalledWith(expectedUser.email)

    expect(userId).toEqual(expectedUser.id.value)
  })

  it("should throw error if email doesn't exist", async () => {
    await expect(async () => {
      const expectedUser = await UserMother.random()
      const request = UserLoginRequestMother.create(expectedUser.email, expectedUser.password)

      const userId = await usecase.run(request)

      repository.assertFindByEmailHaveBeenCalledWith(expectedUser.email)

      expect(userId).toEqual(expectedUser.id.value)
    }).rejects.toThrow(InvalidUserLoginException)
  })

  it("should throw error if password doesn't match", async () => {
    await expect(async () => {
      const expectedUser = await UserMother.random()
      repository.setExpectedUser(expectedUser)

      const anotherPassword = await PasswordVOMother.random()
      const request = UserLoginRequestMother.create(expectedUser.email, anotherPassword)

      const userId = await usecase.run(request)

      repository.assertFindByEmailHaveBeenCalledWith(expectedUser.email)

      expect(userId).toEqual(expectedUser.id.value)
    }).rejects.toThrow(InvalidUserLoginException)
  })
})
