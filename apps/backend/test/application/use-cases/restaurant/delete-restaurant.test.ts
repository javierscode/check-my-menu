import { RestaurantNotExistException } from '@application/exceptions/restaurant/restaurant-not-exist.exception'
import { DeleteRestaurantUsecase } from '@application/use-cases/restaurant/delete-restaurant.usecase'
import { DomainFormatException } from '@domain/exceptions/domain-format.exception'
import { DeleteRestaurantRequestMother } from '@test/application/mothers/restaurant/delete-restaurant-request.mother'
import { RestaurantMother } from '@test/domain/mothers/restaurant.entity.mother'
import { RestaurantRepositoryMock } from '@test/infrastructure/repositories/restaurant-repository.mock'

let restaurantRepository: RestaurantRepositoryMock
let usecase: DeleteRestaurantUsecase

beforeEach(() => {
  restaurantRepository = new RestaurantRepositoryMock()
  usecase = new DeleteRestaurantUsecase(restaurantRepository)
})

describe('Delete Restaurant - Use Case', () => {
  describe('When a valid request is sent', () => {
    it('should create a new Restaurant', async () => {
      const expectedRestaurant = RestaurantMother.random()
      restaurantRepository.setExpectedRestaurant(expectedRestaurant)
      const request = DeleteRestaurantRequestMother.create(expectedRestaurant.id)

      await usecase.run(request)
      restaurantRepository.assertRemoveHaveBeenCalledWith(expectedRestaurant.id)
    })
  })

  describe('When a invalid request is sent', () => {
    it('should throw an Error', async () => {
      await expect(async () => {
        const expectedRestaurant = RestaurantMother.random()
        restaurantRepository.setExpectedRestaurant(expectedRestaurant)
        const request = DeleteRestaurantRequestMother.invalidRequest()

        await usecase.run(request)
      }).rejects.toThrow(DomainFormatException)
    })
  })

  describe('When the restaurant doesnt exist', () => {
    it('should throw an Error', async () => {
      await expect(async () => {
        const expectedRestaurant = RestaurantMother.random()
        const request = DeleteRestaurantRequestMother.create(expectedRestaurant.id)
        await usecase.run(request)
      }).rejects.toThrow(RestaurantNotExistException)
    })
  })
})
