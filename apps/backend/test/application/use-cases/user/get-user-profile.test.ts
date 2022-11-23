import { ApplicationUnauthorizedException } from '@application/exceptions/application-unauthorized.exception'
import { GetUserProfileUsecase } from '@application/use-cases/user/get-user-profile.usecase'
import { UserMother } from '@test/domain/mothers/user.entity.mother'
import { UserRepositoryMock } from '@test/infrastructure/repositories/user-repository.mock'

import { GetUserProfileRequestMother } from '../../mothers/user/get-user-profile.mother'

let repository: UserRepositoryMock
let usecase: GetUserProfileUsecase

beforeEach(() => {
  repository = new UserRepositoryMock()
  usecase = new GetUserProfileUsecase(repository)
})

describe('Get User Profile - Use Case', () => {
  it('should return the profile of a valid userId', async () => {
    const expectedUser = await UserMother.random()
    repository.setExpectedUser(expectedUser)

    const request = GetUserProfileRequestMother.create(expectedUser.id)

    const userPrimitives = await usecase.run(request)

    repository.assertFindByIdHaveBeenCalledWith(expectedUser.id)

    expect(userPrimitives).toEqual(expectedUser.toPrimitives())
  })

  it("should throw error if user doesn't exist with that id", async () => {
    await expect(async () => {
      const expectedUser = await UserMother.random()
      const request = GetUserProfileRequestMother.create(expectedUser.id)

      const userPrimitives = await usecase.run(request)

      repository.assertFindByIdHaveBeenCalledWith(expectedUser.id)

      expect(userPrimitives).toEqual(expectedUser.toPrimitives())
    }).rejects.toThrow(ApplicationUnauthorizedException)
  })
})
