import { RestaurantNotExistException } from '@application/exceptions/restaurant-not-exist.exception'
import { RestaurantEditionUsecase } from '@application/use-cases/restaurant-edition.usecase'
import { DomainFormatException } from '@domain/exceptions/domain-format.exception'
import { RestaurantMother } from '@test/domain/mothers/restaurant.entity.mother'
import { RestaurantRepositoryMock } from '@test/infrastructure/repositories/restaurant-repository.mock'

import { RestaurantEditionRequestMother } from '../mothers/restaurant-edition-request.mother'

let restaurantRepository: RestaurantRepositoryMock
let usecase: RestaurantEditionUsecase

beforeEach(() => {
  restaurantRepository = new RestaurantRepositoryMock()
  usecase = new RestaurantEditionUsecase(restaurantRepository)
})

describe(' Restaurant Edition - Use Case', () => {
  describe('When a valid request is sent', () => {
    it('should create a new Restaurant', async () => {
      const expectedRestaurant = RestaurantMother.random()
      restaurantRepository.setExpectedRestaurant(expectedRestaurant)
      const request = RestaurantEditionRequestMother.create(
        expectedRestaurant.id,
        expectedRestaurant.name,
        expectedRestaurant.domain,
        expectedRestaurant.location,
        expectedRestaurant.description
      )

      await usecase.run(request)
      restaurantRepository.assertUpdateHaveBeenCalledWith(expectedRestaurant)
    })
  })

  describe('When a invalid request is sent', () => {
    it('should throw an Error', async () => {
      await expect(async () => {
        const expectedRestaurant = RestaurantMother.random()
        restaurantRepository.setExpectedRestaurant(expectedRestaurant)
        const request = RestaurantEditionRequestMother.invalidRequest()

        await usecase.run(request)
      }).rejects.toThrow(DomainFormatException)
    })
  })

  describe('When the restaurant doesnt exist', () => {
    it('should throw an Error', async () => {
      await expect(async () => {
        const expectedRestaurant = RestaurantMother.random()
        const request = RestaurantEditionRequestMother.create(
          expectedRestaurant.id,
          expectedRestaurant.name,
          expectedRestaurant.domain,
          expectedRestaurant.location,
          expectedRestaurant.description
        )
        await usecase.run(request)
      }).rejects.toThrow(RestaurantNotExistException)
    })
  })
})
