import { RestaurantOwnerIdNotExistException } from '@application/exceptions/restaurant-owner-id-not-exist.exception'
import { RestaurantIdAlreadyInUseException } from '@application/exceptions/restaurant-slug-already-in-use.exception'
import { RestaurantCreationUsecase } from '@application/use-cases/restaurant-creation.usecase'
import { DomainFormatException } from '@domain/exceptions/domain-format.exception'
import { RestaurantMother } from '@test/domain/mothers/restaurant.entity.mother'
import { UserMother } from '@test/domain/mothers/user.entity.mother'
import { RestaurantRepositoryMock } from '@test/infrastructure/repositories/restaurant-repository.mock'
import { UserRepositoryMock } from '@test/infrastructure/repositories/user-repository.mock'

import { RestaurantCreationRequestMother } from '../mothers/restaurant-creation-request.mother'

let userRepository: UserRepositoryMock
let restaurantRepository: RestaurantRepositoryMock
let usecase: RestaurantCreationUsecase

beforeEach(() => {
  userRepository = new UserRepositoryMock()
  restaurantRepository = new RestaurantRepositoryMock()
  usecase = new RestaurantCreationUsecase(restaurantRepository, userRepository)
})

describe(' Restaurant Creation - Use Case', () => {
  describe('When a valid request is sent', () => {
    it('should create a new Restaurant', async () => {
      const expectedOwner = await UserMother.random()
      userRepository.setExpectedUser(expectedOwner)

      const expectedRestaurant = RestaurantMother.random()
      const request = RestaurantCreationRequestMother.create(
        expectedRestaurant.id,
        expectedRestaurant.name,
        expectedRestaurant.domain,
        expectedRestaurant.location,
        expectedRestaurant.description,
        expectedRestaurant.ownerId
      )

      await usecase.run(request)

      userRepository.assertFindByIdHaveBeenCalledWith(expectedRestaurant.ownerId)
      restaurantRepository.assertCreateHaveBeenCalledWith(expectedRestaurant)
    })
  })
  describe('When a invalid request is sent', () => {
    it('should throw an Error', async () => {
      await expect(async () => {
        const expectedOwner = await UserMother.random()
        userRepository.setExpectedUser(expectedOwner)

        const request = RestaurantCreationRequestMother.invalidRequest()

        await usecase.run(request)
      }).rejects.toThrow(DomainFormatException)
    })
  })

  describe('When a the ownerId doenst exist', () => {
    it('should throw an Error', async () => {
      await expect(async () => {
        const expectedRestaurant = RestaurantMother.random()
        const request = RestaurantCreationRequestMother.create(
          expectedRestaurant.id,
          expectedRestaurant.name,
          expectedRestaurant.domain,
          expectedRestaurant.location,
          expectedRestaurant.description,
          expectedRestaurant.ownerId
        )
        await usecase.run(request)
      }).rejects.toThrow(RestaurantOwnerIdNotExistException)
    })
  })

  describe('When a the restaurant already exist', () => {
    it('should throw an Error', async () => {
      await expect(async () => {
        const expectedOwner = await UserMother.random()
        userRepository.setExpectedUser(expectedOwner)

        const expectedRestaurant = RestaurantMother.random()
        restaurantRepository.setExpectedRestaurant(expectedRestaurant)

        const request = RestaurantCreationRequestMother.create(
          expectedRestaurant.id,
          expectedRestaurant.name,
          expectedRestaurant.domain,
          expectedRestaurant.location,
          expectedRestaurant.description,
          expectedRestaurant.ownerId
        )
        await usecase.run(request)
      }).rejects.toThrow(RestaurantIdAlreadyInUseException)
    })
  })
})
