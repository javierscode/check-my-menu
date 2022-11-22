import { UserIdAlreadyInUseException } from '@application/exceptions/user-id-already-in-use.exception'
import { UserRegisterUsecase } from '@application/use-cases/user-register.usecase'
import { VOFormatException } from '@domain/exceptions/vo-format.exception'
import { UserMother } from '@test/domain/mothers/user.entity.mother'
import { UserRepositoryMock } from '@test/infrastructure/repositories/user-repository.mock'

import { UserRegisterRequestMother } from '../mothers/user-register-request.mother'

let repository: UserRepositoryMock
let usecase: UserRegisterUsecase

beforeEach(() => {
  repository = new UserRepositoryMock()
  usecase = new UserRegisterUsecase(repository)
})

describe('User Register - Use Case', () => {
  it('should create a valid user', async () => {
    const request = await UserRegisterRequestMother.random()

    const expectedUser = await UserMother.fromRequest(request)

    await usecase.run(request)

    repository.assertCreateHaveBeenCalledWith(expectedUser)
  })

  it('should throw error if email is invalid', async () => {
    await expect(async () => {
      const request = await UserRegisterRequestMother.invalidRequest()

      const user = await UserMother.fromRequest(request)

      await usecase.run(request)
      repository.assertCreateHaveBeenCalledWith(user)
    }).rejects.toThrow(VOFormatException)
  })

  it('should throw error if the user is already added', async () => {
    await expect(async () => {
      const request = await UserRegisterRequestMother.random()

      const user = await UserMother.fromRequest(request)

      await usecase.run(request)
      await usecase.run(request)

      repository.assertCreateHaveBeenCalledWith(user)
    }).rejects.toThrow(UserIdAlreadyInUseException)
  })
})
