import { DishNotExistException } from '@application/exceptions/dish/dish-not-exist.exception'
import { EditDishUsecase } from '@application/use-cases/dish/edit-dish.usecase'
import { DomainFormatException } from '@domain/exceptions/domain-format.exception'
import { EditDishRequestMother } from '@test/application/mothers/dish/edit-dish-request.mother'
import { DishMother } from '@test/domain/mothers/dish.entity.mother'
import { DishRepositoryMock } from '@test/infrastructure/repositories/dish-repository.mock'

let dishRepository: DishRepositoryMock
let usecase: EditDishUsecase

beforeEach(() => {
  dishRepository = new DishRepositoryMock()
  usecase = new EditDishUsecase(dishRepository)
})

describe('Edit Dish - Use Case', () => {
  describe('When a valid request is sent', () => {
    it('should create a new Dish', async () => {
      const expectedDish = DishMother.random()
      dishRepository.setExpectedDish(expectedDish)
      const request = EditDishRequestMother.create(
        expectedDish.id,
        expectedDish.name,
        expectedDish.description,
        expectedDish.image,
        expectedDish.price,
        expectedDish.allergens,
        expectedDish.categoryIds
      )

      await usecase.run(request)
      dishRepository.assertUpdateHaveBeenCalledWith(expectedDish)
    })
  })

  describe('When a invalid request is sent', () => {
    it('should throw an Error', async () => {
      await expect(async () => {
        const expectedDish = DishMother.random()
        dishRepository.setExpectedDish(expectedDish)
        const request = EditDishRequestMother.invalidRequest()

        await usecase.run(request)
      }).rejects.toThrow(DomainFormatException)
    })
  })

  describe('When the Dish doesnt exist', () => {
    it('should throw an Error', async () => {
      await expect(async () => {
        const expectedDish = DishMother.random()
        const request = EditDishRequestMother.create(
          expectedDish.id,
          expectedDish.name,
          expectedDish.description,
          expectedDish.image,
          expectedDish.price,
          expectedDish.allergens,
          expectedDish.categoryIds
        )
        await usecase.run(request)
      }).rejects.toThrow(DishNotExistException)
    })
  })
})
