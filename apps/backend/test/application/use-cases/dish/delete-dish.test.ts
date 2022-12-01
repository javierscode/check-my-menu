import { DishNotExistException } from '@application/exceptions/dish/dish-not-exist.exception'
import { DeleteDishUsecase } from '@application/use-cases/dish/delete-dish.usecase'
import { DomainFormatException } from '@domain/exceptions/domain-format.exception'
import { DeleteDishRequestMother } from '@test/application/mothers/dish/delete-dish-request.mother'
import { DishMother } from '@test/domain/mothers/dish.entity.mother'
import { DishRepositoryMock } from '@test/infrastructure/repositories/dish-repository.mock'

let dishRepository: DishRepositoryMock
let usecase: DeleteDishUsecase

beforeEach(() => {
  dishRepository = new DishRepositoryMock()
  usecase = new DeleteDishUsecase(dishRepository)
})

describe('Delete Dish - Use Case', () => {
  describe('When a valid request is sent', () => {
    it('should create a new Dish', async () => {
      const expectedDish = DishMother.random()
      dishRepository.setExpectedDish(expectedDish)
      const request = DeleteDishRequestMother.create(expectedDish.id)

      await usecase.run(request)
      dishRepository.assertRemoveHaveBeenCalledWith(expectedDish.id)
    })
  })

  describe('When a invalid request is sent', () => {
    it('should throw an Error', async () => {
      await expect(async () => {
        const expectedDish = DishMother.random()
        dishRepository.setExpectedDish(expectedDish)
        const request = DeleteDishRequestMother.invalidRequest()

        await usecase.run(request)
      }).rejects.toThrow(DomainFormatException)
    })
  })

  describe('When the Dish doesnt exist', () => {
    it('should throw an Error', async () => {
      await expect(async () => {
        const expectedDish = DishMother.random()
        const request = DeleteDishRequestMother.create(expectedDish.id)
        await usecase.run(request)
      }).rejects.toThrow(DishNotExistException)
    })
  })
})
