import { ApplicationConflictException } from '@application/exceptions/application-conflict.exception'
import { GetDishByIdUsecase } from '@application/use-cases/dish/get-dish-by-id.usecase'
import { DomainFormatException } from '@domain/exceptions/domain-format.exception'
import { GetDishByIdRequestMother } from '@test/application/mothers/dish/get-dish-by-id-request.mother'
import { DishMother } from '@test/domain/mothers/dish.entity.mother'
import { DishRepositoryMock } from '@test/infrastructure/repositories/dish-repository.mock'

let dishRepository: DishRepositoryMock
let usecase: GetDishByIdUsecase

beforeEach(() => {
  dishRepository = new DishRepositoryMock()
  usecase = new GetDishByIdUsecase(dishRepository)
})

describe('Get Dishes by Restaurant - Use Case', () => {
  describe('When a valid request is sent', () => {
    it('should return a dish', async () => {
      const expectedDish = DishMother.random()
      dishRepository.setExpectedDish(expectedDish)
      const request = GetDishByIdRequestMother.create(expectedDish.id)

      const listOfDishs = await usecase.run(request)
      dishRepository.assertFindByIdHaveBeenCalledWith(expectedDish.id)
      expect(listOfDishs).toEqual(expectedDish)
    })
  })

  describe('When a invalid request is sent', () => {
    it('should throw an Error', async () => {
      await expect(async () => {
        const expectedDish = DishMother.random()
        dishRepository.setExpectedDish(expectedDish)
        const request = GetDishByIdRequestMother.invalidRequest()

        await usecase.run(request)
      }).rejects.toThrow(DomainFormatException)
    })
  })

  describe('When the onwer doesnt exist', () => {
    it('should throw an Error', async () => {
      await expect(async () => {
        const expectedDish = DishMother.random()
        const request = GetDishByIdRequestMother.create(expectedDish.id)
        await usecase.run(request)

        dishRepository.assertFindByIdHaveBeenCalledWith(expectedDish.id)
      }).rejects.toThrow(ApplicationConflictException)
    })
  })
})
