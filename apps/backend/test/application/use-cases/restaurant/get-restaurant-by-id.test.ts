import { ApplicationConflictException } from '@application/exceptions/application-conflict.exception'
import { GetRestaurantByIdUsecase } from '@application/use-cases/restaurant/get-restaurant-by-id.usecase'
import { DomainFormatException } from '@domain/exceptions/domain-format.exception'
import { GetRestaurantByIdRequestMother } from '@test/application/mothers/restaurant/get-restaurant-by-id-request'
import { RestaurantMother } from '@test/domain/mothers/restaurant.entity.mother'
import { RestaurantRepositoryMock } from '@test/infrastructure/repositories/restaurant-repository.mock'

let restaurantRepository: RestaurantRepositoryMock
let usecase: GetRestaurantByIdUsecase

beforeEach(() => {
  restaurantRepository = new RestaurantRepositoryMock()
  usecase = new GetRestaurantByIdUsecase(restaurantRepository)
})

describe('Get Restaurants by Owner - Use Case', () => {
  describe('When a valid request is sent', () => {
    it('should return an array of restaurants', async () => {
      const expectedRestaurant = RestaurantMother.random()
      restaurantRepository.setExpectedRestaurant(expectedRestaurant)
      const request = GetRestaurantByIdRequestMother.create(expectedRestaurant.id)

      const listOfRestaurants = await usecase.run(request)
      restaurantRepository.assertFindByIdHaveBeenCalledWith(expectedRestaurant.id)
      expect(listOfRestaurants).toEqual(expectedRestaurant)
    })
  })

  describe('When a invalid request is sent', () => {
    it('should throw an Error', async () => {
      await expect(async () => {
        const expectedRestaurant = RestaurantMother.random()
        restaurantRepository.setExpectedRestaurant(expectedRestaurant)
        const request = GetRestaurantByIdRequestMother.invalidRequest()

        await usecase.run(request)
      }).rejects.toThrow(DomainFormatException)
    })
  })

  describe('When the onwer doesnt exist', () => {
    it('should throw am Error', async () => {
      await expect(async () => {
        const expectedRestaurant = RestaurantMother.random()
        const request = GetRestaurantByIdRequestMother.create(expectedRestaurant.id)
        await usecase.run(request)

        restaurantRepository.assertFindByIdHaveBeenCalledWith(expectedRestaurant.id)
      }).rejects.toThrow(ApplicationConflictException)
    })
  })
})
