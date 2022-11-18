import { ApplicationUnauthorizedException } from '@application/exceptions/application-unauthorized.exception'
import { UserGetProfileUsecase } from '@application/use-cases/user-get-profile.usecase'
import { UserMother } from '@test/domain/mothers/user.entity.mother'
import { UserRepositoryMock } from '@test/infrastructure/repositories/user-repository.mock'

import { UserGetProfileRequestMother } from '../mothers/user-get-profile.mother'

let repository: UserRepositoryMock
let usecase: UserGetProfileUsecase

beforeEach(() => {
  repository = new UserRepositoryMock()
  usecase = new UserGetProfileUsecase(repository)
})

describe('User GetProfile - Use Case', () => {
  it('should return the profile of a valid userId', async () => {
    const expectedUser = await UserMother.random()
    repository.setExpectedUser(expectedUser)

    const request = UserGetProfileRequestMother.create(expectedUser.id)

    const userPrimitives = await usecase.run(request)

    repository.assertFindByIdHaveBeenCalledWith(expectedUser.id)

    expect(userPrimitives).toEqual(expectedUser.toPrimitives())
  })

  it("should throw error if user doesn't exist with that id", async () => {
    await expect(async () => {
      const expectedUser = await UserMother.random()
      const request = UserGetProfileRequestMother.create(expectedUser.id)

      const userPrimitives = await usecase.run(request)

      repository.assertFindByIdHaveBeenCalledWith(expectedUser.id)

      expect(userPrimitives).toEqual(expectedUser.toPrimitives())
    }).rejects.toThrow(ApplicationUnauthorizedException)
  })
})
