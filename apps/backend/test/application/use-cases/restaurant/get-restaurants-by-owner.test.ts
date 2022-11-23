import { GetRestaurantsByOwnerUsecase } from '@application/use-cases/restaurant/get-restaurants-by-owner.usecase'
import { DomainFormatException } from '@domain/exceptions/domain-format.exception'
import { GetRestaurantsByOwnerRequestMother } from '@test/application/mothers/restaurant/get-restaurants-by-owner-request.mother'
import { RestaurantMother } from '@test/domain/mothers/restaurant.entity.mother'
import { RestaurantRepositoryMock } from '@test/infrastructure/repositories/restaurant-repository.mock'

let restaurantRepository: RestaurantRepositoryMock
let usecase: GetRestaurantsByOwnerUsecase

beforeEach(() => {
  restaurantRepository = new RestaurantRepositoryMock()
  usecase = new GetRestaurantsByOwnerUsecase(restaurantRepository)
})

describe('Get Restaurants by Owner - Use Case', () => {
  describe('When a valid request is sent', () => {
    it('should return an array of restaurants', async () => {
      const expectedRestaurant = RestaurantMother.random()
      restaurantRepository.setExpectedRestaurant(expectedRestaurant)
      const request = GetRestaurantsByOwnerRequestMother.create(expectedRestaurant.ownerId)

      const listOfRestaurants = await usecase.run(request)
      restaurantRepository.assertFindbyOnwerHaveBeenCalledWith(expectedRestaurant.ownerId)
      expect(listOfRestaurants).toEqual([expectedRestaurant])
    })
  })

  describe('When a invalid request is sent', () => {
    it('should throw an Error', async () => {
      await expect(async () => {
        const expectedRestaurant = RestaurantMother.random()
        restaurantRepository.setExpectedRestaurant(expectedRestaurant)
        const request = GetRestaurantsByOwnerRequestMother.invalidRequest()

        await usecase.run(request)
      }).rejects.toThrow(DomainFormatException)
    })
  })

  describe('When the onwer doesnt exist', () => {
    it('should return an empty array', async () => {
      const expectedRestaurant = RestaurantMother.random()
      const request = GetRestaurantsByOwnerRequestMother.create(expectedRestaurant.id)
      const listOfRestaurants = await usecase.run(request)

      restaurantRepository.assertFindbyOnwerHaveBeenCalledWith(expectedRestaurant.id)
      expect(listOfRestaurants).toEqual([])
    })
  })
})
