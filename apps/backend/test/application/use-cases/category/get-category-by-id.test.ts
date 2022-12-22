import { ApplicationConflictException } from '@application/exceptions/application-conflict.exception'
import { GetCategoryByIdUsecase } from '@application/use-cases/category/get-category-by-id.usecase'
import { DomainFormatException } from '@domain/exceptions/domain-format.exception'
import { GetCategoryByIdRequestMother } from '@test/application/mothers/category/get-category-by-id-request.mother'
import { CategoryMother } from '@test/domain/mothers/category.entity.mother'
import { CategoryRepositoryMock } from '@test/infrastructure/repositories/category-repository.mock'

let CategoryRepository: CategoryRepositoryMock
let usecase: GetCategoryByIdUsecase

beforeEach(() => {
  CategoryRepository = new CategoryRepositoryMock()
  usecase = new GetCategoryByIdUsecase(CategoryRepository)
})

describe('Get Category by id - Use Case', () => {
  describe('When a valid request is sent', () => {
    it('should return an Category', async () => {
      const expectedCategory = CategoryMother.random()
      CategoryRepository.setExpectedCategory(expectedCategory)
      const request = GetCategoryByIdRequestMother.create(expectedCategory.id)

      const listOfCategories = await usecase.run(request)
      CategoryRepository.assertFindByIdHaveBeenCalledWith(expectedCategory.id)
      expect(listOfCategories).toEqual(expectedCategory)
    })
  })

  describe('When a invalid request is sent', () => {
    it('should throw an Error', async () => {
      await expect(async () => {
        const expectedCategory = CategoryMother.random()
        CategoryRepository.setExpectedCategory(expectedCategory)
        const request = GetCategoryByIdRequestMother.invalidRequest()

        await usecase.run(request)
      }).rejects.toThrow(DomainFormatException)
    })
  })

  describe('When the id doesnt exist', () => {
    it('should throw an Error', async () => {
      await expect(async () => {
        const expectedCategory = CategoryMother.random()
        const request = GetCategoryByIdRequestMother.create(expectedCategory.id)
        const listOfCategories = await usecase.run(request)

        CategoryRepository.assertFindByIdHaveBeenCalledWith(expectedCategory.id)
        expect(listOfCategories).toEqual([])
      }).rejects.toThrow(ApplicationConflictException)
    })
  })
})
