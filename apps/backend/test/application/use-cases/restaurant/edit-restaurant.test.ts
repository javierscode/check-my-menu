import { RestaurantNotExistException } from '@application/exceptions/restaurant/restaurant-not-exist.exception'
import { EditRestaurantUsecase } from '@application/use-cases/restaurant/edit-restaurant.usecase'
import { DomainFormatException } from '@domain/exceptions/domain-format.exception'
import { EditRestaurantRequestMother } from '@test/application/mothers/restaurant/edit-restaurant-request.mother'
import { RestaurantMother } from '@test/domain/mothers/restaurant.entity.mother'
import { RestaurantRepositoryMock } from '@test/infrastructure/repositories/restaurant-repository.mock'

let restaurantRepository: RestaurantRepositoryMock
let usecase: EditRestaurantUsecase

beforeEach(() => {
  restaurantRepository = new RestaurantRepositoryMock()
  usecase = new EditRestaurantUsecase(restaurantRepository)
})

describe('Edit Restaurant - Use Case', () => {
  describe('When a valid request is sent', () => {
    it('should create a new Restaurant', async () => {
      const expectedRestaurant = RestaurantMother.random()
      restaurantRepository.setExpectedRestaurant(expectedRestaurant)
      const request = EditRestaurantRequestMother.create(
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
        const request = EditRestaurantRequestMother.invalidRequest()

        await usecase.run(request)
      }).rejects.toThrow(DomainFormatException)
    })
  })

  describe('When the restaurant doesnt exist', () => {
    it('should throw an Error', async () => {
      await expect(async () => {
        const expectedRestaurant = RestaurantMother.random()
        const request = EditRestaurantRequestMother.create(
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
