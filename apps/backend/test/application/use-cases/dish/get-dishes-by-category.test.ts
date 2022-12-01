import { GetDishesByCategoryUsecase } from '@application/use-cases/dish/get-dishes-by-category.usecase'
import { DomainFormatException } from '@domain/exceptions/domain-format.exception'
import { GetDishesByCategoryRequestMother } from '@test/application/mothers/dish/get-dishes-by-category-request.mother'
import { DishMother } from '@test/domain/mothers/dish.entity.mother'
import { DishRepositoryMock } from '@test/infrastructure/repositories/dish-repository.mock'

let dishRepository: DishRepositoryMock
let usecase: GetDishesByCategoryUsecase

beforeEach(() => {
  dishRepository = new DishRepositoryMock()
  usecase = new GetDishesByCategoryUsecase(dishRepository)
})

describe('Get Dishes by Category - Use Case', () => {
  describe('When a valid request is sent', () => {
    it('should return an array of dishes', async () => {
      const expectedDish = DishMother.random()
      dishRepository.setExpectedDish(expectedDish)
      const request = GetDishesByCategoryRequestMother.create(expectedDish.categoryIds[0])

      const listOfDishs = await usecase.run(request)
      dishRepository.assertFindbyCategoryHaveBeenCalledWith(expectedDish.categoryIds[0])
      expect(listOfDishs).toEqual([expectedDish])
    })
  })

  describe('When a invalid request is sent', () => {
    it('should throw an Error', async () => {
      await expect(async () => {
        const expectedDish = DishMother.random()
        dishRepository.setExpectedDish(expectedDish)
        const request = GetDishesByCategoryRequestMother.invalidRequest()

        await usecase.run(request)
      }).rejects.toThrow(DomainFormatException)
    })
  })

  describe('When the onwer doesnt exist', () => {
    it('should return an empty array', async () => {
      const expectedDish = DishMother.random()
      const request = GetDishesByCategoryRequestMother.create(expectedDish.categoryIds[0])
      const listOfDishs = await usecase.run(request)

      dishRepository.assertFindbyCategoryHaveBeenCalledWith(expectedDish.categoryIds[0])
      expect(listOfDishs).toEqual([])
    })
  })
})
