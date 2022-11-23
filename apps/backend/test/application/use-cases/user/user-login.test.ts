import { InvalidUserLoginException } from '@application/exceptions/user/invalid-user-login.exception'
import { UserLoginUsecase } from '@application/use-cases/user/user-login.usecase'
import { UserLoginRequestMother } from '@test/application/mothers/user/user-login-request.mother'
import { PasswordVOMother } from '@test/domain/mothers/password.vo.mother'
import { UserMother } from '@test/domain/mothers/user.entity.mother'
import { UserRepositoryMock } from '@test/infrastructure/repositories/user-repository.mock'

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
