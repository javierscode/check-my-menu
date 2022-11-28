import { RestaurantIdAlreadyInUseException } from '@application/exceptions/restaurant/restaurant-slug-already-in-use.exception'
import { CreateRestaurantUsecase } from '@application/use-cases/restaurant/create-restaurant.usecase'
import { DomainFormatException } from '@domain/exceptions/domain-format.exception'
import { RestaurantMother } from '@test/domain/mothers/restaurant.entity.mother'
import { RestaurantRepositoryMock } from '@test/infrastructure/repositories/restaurant-repository.mock'

import { CreateRestaurantRequestMother } from '../../mothers/restaurant/create-restaurant-request.mother'

let restaurantRepository: RestaurantRepositoryMock
let usecase: CreateRestaurantUsecase

beforeEach(() => {
  restaurantRepository = new RestaurantRepositoryMock()
  usecase = new CreateRestaurantUsecase(restaurantRepository)
})

describe('Create Restaurant - Use Case', () => {
  describe('When a valid request is sent', () => {
    it('should create a new Restaurant', async () => {
      const expectedRestaurant = RestaurantMother.random()
      const request = CreateRestaurantRequestMother.create(
        expectedRestaurant.id,
        expectedRestaurant.name,
        expectedRestaurant.domain,
        expectedRestaurant.location,
        expectedRestaurant.description,
        expectedRestaurant.ownerId
      )

      await usecase.run(request)

      restaurantRepository.assertCreateHaveBeenCalledWith(expectedRestaurant)
    })
  })
  describe('When a invalid request is sent', () => {
    it('should throw an Error', async () => {
      await expect(async () => {
        const request = CreateRestaurantRequestMother.invalidRequest()

        await usecase.run(request)
      }).rejects.toThrow(DomainFormatException)
    })
  })

  describe('When a the restaurant already exist', () => {
    it('should throw an Error', async () => {
      await expect(async () => {
        const expectedRestaurant = RestaurantMother.random()
        restaurantRepository.setExpectedRestaurant(expectedRestaurant)

        const request = CreateRestaurantRequestMother.create(
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
