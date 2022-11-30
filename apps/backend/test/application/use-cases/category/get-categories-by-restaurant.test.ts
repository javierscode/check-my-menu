import { GetCategoriesByRestaurantUsecase } from '@application/use-cases/category/get-categories-by-restaurant.usecase'
import { DomainFormatException } from '@domain/exceptions/domain-format.exception'
import { GetCategoriesByRestaurantRequestMother } from '@test/application/mothers/category/get-categories-by-restaurant-request.mother'
import { CategoryMother } from '@test/domain/mothers/category.entity.mother'
import { CategoryRepositoryMock } from '@test/infrastructure/repositories/category-repository.mock'

let CategoryRepository: CategoryRepositoryMock
let usecase: GetCategoriesByRestaurantUsecase

beforeEach(() => {
  CategoryRepository = new CategoryRepositoryMock()
  usecase = new GetCategoriesByRestaurantUsecase(CategoryRepository)
})

describe('Get Categories by Restaurant - Use Case', () => {
  describe('When a valid request is sent', () => {
    it('should return an array of Categories', async () => {
      const expectedCategory = CategoryMother.random()
      CategoryRepository.setExpectedCategory(expectedCategory)
      const request = GetCategoriesByRestaurantRequestMother.create(expectedCategory.restaurantId)

      const listOfCategories = await usecase.run(request)
      CategoryRepository.assertFindByRestaurantHaveBeenCalledWith(expectedCategory.restaurantId)
      expect(listOfCategories).toEqual([expectedCategory])
    })
  })

  describe('When a invalid request is sent', () => {
    it('should throw an Error', async () => {
      await expect(async () => {
        const expectedCategory = CategoryMother.random()
        CategoryRepository.setExpectedCategory(expectedCategory)
        const request = GetCategoriesByRestaurantRequestMother.invalidRequest()

        await usecase.run(request)
      }).rejects.toThrow(DomainFormatException)
    })
  })

  describe('When the onwer doesnt exist', () => {
    it('should return an empty array', async () => {
      const expectedCategory = CategoryMother.random()
      const request = GetCategoriesByRestaurantRequestMother.create(expectedCategory.restaurantId)
      const listOfCategories = await usecase.run(request)

      CategoryRepository.assertFindByRestaurantHaveBeenCalledWith(expectedCategory.restaurantId)
      expect(listOfCategories).toEqual([])
    })
  })
})
