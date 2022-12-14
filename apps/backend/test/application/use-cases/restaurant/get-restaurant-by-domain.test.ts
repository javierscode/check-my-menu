import { ApplicationConflictException } from '@application/exceptions/application-conflict.exception'
import { GetRestaurantByDomainUsecase } from '@application/use-cases/restaurant/get-restaurant-by-domain.usecase'
import { DomainFormatException } from '@domain/exceptions/domain-format.exception'
import { GetRestaurantByDomainRequestMother } from '@test/application/mothers/restaurant/get-restaurant-by-domain-request.mother'
import { RestaurantMother } from '@test/domain/mothers/restaurant.entity.mother'
import { RestaurantRepositoryMock } from '@test/infrastructure/repositories/restaurant-repository.mock'

let restaurantRepository: RestaurantRepositoryMock
let usecase: GetRestaurantByDomainUsecase

beforeEach(() => {
  restaurantRepository = new RestaurantRepositoryMock()
  usecase = new GetRestaurantByDomainUsecase(restaurantRepository)
})

describe('Get Restaurants by Owner - Use Case', () => {
  describe('When a valid request is sent', () => {
    it('should return an array of restaurants', async () => {
      const expectedRestaurant = RestaurantMother.random()
      restaurantRepository.setExpectedRestaurant(expectedRestaurant)
      const request = GetRestaurantByDomainRequestMother.create(expectedRestaurant.domain)

      const restaurant = await usecase.run(request)
      restaurantRepository.assertFindBySlugHaveBeenCalledWith(expectedRestaurant.domain)
      expect(restaurant).toEqual(expectedRestaurant)
    })
  })

  describe('When a invalid request is sent', () => {
    it('should throw an Error', async () => {
      await expect(async () => {
        const expectedRestaurant = RestaurantMother.random()
        restaurantRepository.setExpectedRestaurant(expectedRestaurant)
        const request = GetRestaurantByDomainRequestMother.invalidRequest()

        await usecase.run(request)
      }).rejects.toThrow(DomainFormatException)
    })
  })

  describe('When the onwer doesnt exist', () => {
    it('should return an empty array', async () => {
      await expect(async () => {
        const expectedRestaurant = RestaurantMother.random()
        const request = GetRestaurantByDomainRequestMother.create(expectedRestaurant.domain)
        await usecase.run(request)

        restaurantRepository.assertFindBySlugHaveBeenCalledWith(expectedRestaurant.domain)
      }).rejects.toThrow(ApplicationConflictException)
    })
  })
})
