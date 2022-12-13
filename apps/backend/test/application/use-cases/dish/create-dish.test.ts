import { DishIdAlreadyInUseException } from '@application/exceptions/dish/dish-id-already-in-use.exception'
import { CreateDishUsecase } from '@application/use-cases/dish/create-dish.usecase'
import { DomainFormatException } from '@domain/exceptions/domain-format.exception'
import { CreateDishRequestMother } from '@test/application/mothers/dish/create-dish-request.mother'
import { DishMother } from '@test/domain/mothers/dish.entity.mother'
import { DishRepositoryMock } from '@test/infrastructure/repositories/dish-repository.mock'

let dishRepository: DishRepositoryMock
let usecase: CreateDishUsecase

beforeEach(() => {
  dishRepository = new DishRepositoryMock()
  usecase = new CreateDishUsecase(dishRepository)
})

describe('Create Dish - Use Case', () => {
  describe('When a valid request is sent', () => {
    it('should create a new Dish', async () => {
      const expectedDish = DishMother.random()
      const request = CreateDishRequestMother.create(
        expectedDish.id,
        expectedDish.name,
        expectedDish.description,
        expectedDish.image,
        expectedDish.price,
        expectedDish.allergens,
        expectedDish.categoryIds,
        expectedDish.restaurantId,
        expectedDish.ownerId
      )

      await usecase.run(request)

      dishRepository.assertCreateHaveBeenCalledWith(expectedDish)
    })
  })
  describe('When a invalid request is sent', () => {
    it('should throw an Error', async () => {
      await expect(async () => {
        const request = CreateDishRequestMother.invalidRequest()

        await usecase.run(request)
      }).rejects.toThrow(DomainFormatException)
    })
  })

  describe('When a the Dish already exist', () => {
    it('should throw an Error', async () => {
      await expect(async () => {
        const expectedDish = DishMother.random()
        dishRepository.setExpectedDish(expectedDish)

        const request = CreateDishRequestMother.create(
          expectedDish.id,
          expectedDish.name,
          expectedDish.description,
          expectedDish.image,
          expectedDish.price,
          expectedDish.allergens,
          expectedDish.categoryIds,
          expectedDish.restaurantId,
          expectedDish.ownerId
        )
        await usecase.run(request)
      }).rejects.toThrow(DishIdAlreadyInUseException)
    })
  })
})
