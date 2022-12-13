import { GetDishesByRestaurantUsecase } from '@application/use-cases/dish/get-dishes-by-restaurant.usecase'
import { DomainFormatException } from '@domain/exceptions/domain-format.exception'
import { GetDishesByRestaurantRequestMother } from '@test/application/mothers/dish/get-dishes-by-restaurant-request.mother'
import { DishMother } from '@test/domain/mothers/dish.entity.mother'
import { DishRepositoryMock } from '@test/infrastructure/repositories/dish-repository.mock'

let dishRepository: DishRepositoryMock
let usecase: GetDishesByRestaurantUsecase

beforeEach(() => {
  dishRepository = new DishRepositoryMock()
  usecase = new GetDishesByRestaurantUsecase(dishRepository)
})

describe('Get Dishes by Restaurant - Use Case', () => {
  describe('When a valid request is sent', () => {
    it('should return an array of dishes', async () => {
      const expectedDish = DishMother.random()
      dishRepository.setExpectedDish(expectedDish)
      const request = GetDishesByRestaurantRequestMother.create(expectedDish.restaurantId)

      const listOfDishs = await usecase.run(request)
      dishRepository.assertFindByRestaurantHaveBeenCalledWith(expectedDish.restaurantId)
      expect(listOfDishs).toEqual([expectedDish])
    })
  })

  describe('When a invalid request is sent', () => {
    it('should throw an Error', async () => {
      await expect(async () => {
        const expectedDish = DishMother.random()
        dishRepository.setExpectedDish(expectedDish)
        const request = GetDishesByRestaurantRequestMother.invalidRequest()

        await usecase.run(request)
      }).rejects.toThrow(DomainFormatException)
    })
  })

  describe('When the onwer doesnt exist', () => {
    it('should return an empty array', async () => {
      const expectedDish = DishMother.random()
      const request = GetDishesByRestaurantRequestMother.create(expectedDish.restaurantId)
      const listOfDishs = await usecase.run(request)

      dishRepository.assertFindByRestaurantHaveBeenCalledWith(expectedDish.restaurantId)
      expect(listOfDishs).toEqual([])
    })
  })
})
