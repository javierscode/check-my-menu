import { RestaurantNotExistException } from '@application/exceptions/restaurant-not-exist.exception'
import { RestaurantDeletionUsecase } from '@application/use-cases/restaurant-deletion.usecase'
import { DomainFormatException } from '@domain/exceptions/domain-format.exception'
import { RestaurantMother } from '@test/domain/mothers/restaurant.entity.mother'
import { RestaurantRepositoryMock } from '@test/infrastructure/repositories/restaurant-repository.mock'

import { RestaurantDeletionRequestMother } from '../mothers/restaurant-deletion-request.mother'

let restaurantRepository: RestaurantRepositoryMock
let usecase: RestaurantDeletionUsecase

beforeEach(() => {
  restaurantRepository = new RestaurantRepositoryMock()
  usecase = new RestaurantDeletionUsecase(restaurantRepository)
})

describe(' Restaurant Deletion - Use Case', () => {
  describe('When a valid request is sent', () => {
    it('should create a new Restaurant', async () => {
      const expectedRestaurant = RestaurantMother.random()
      restaurantRepository.setExpectedRestaurant(expectedRestaurant)
      const request = RestaurantDeletionRequestMother.create(expectedRestaurant.id)

      await usecase.run(request)
      restaurantRepository.assertRemoveHaveBeenCalledWith(expectedRestaurant.id)
    })
  })

  describe('When a invalid request is sent', () => {
    it('should throw an Error', async () => {
      await expect(async () => {
        const expectedRestaurant = RestaurantMother.random()
        restaurantRepository.setExpectedRestaurant(expectedRestaurant)
        const request = RestaurantDeletionRequestMother.invalidRequest()

        await usecase.run(request)
      }).rejects.toThrow(DomainFormatException)
    })
  })

  describe('When the restaurant doesnt exist', () => {
    it('should throw an Error', async () => {
      await expect(async () => {
        const expectedRestaurant = RestaurantMother.random()
        const request = RestaurantDeletionRequestMother.create(expectedRestaurant.id)
        await usecase.run(request)
      }).rejects.toThrow(RestaurantNotExistException)
    })
  })
})
