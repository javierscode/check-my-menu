import { Category } from '@domain/entities/category.entity'
import { Dish } from '@domain/entities/dish.entity'
import { Restaurant } from '@domain/entities/restaurant.entity'
import { User } from '@domain/entities/user.entity'
import { myContainer } from '@infrastructure/dependency-injection/container'
import { ContainerSymbols } from '@infrastructure/dependency-injection/symbols'
import { CreateCategoryDTO } from '@infrastructure/dtos/category/create-category.dto'
import { EditCategoryDTO } from '@infrastructure/dtos/category/edit-category.dto'
import { GetCategoriesByRestaurantDTO } from '@infrastructure/dtos/category/get-categories-by-restaurant.dto'
import { CreateDishDTO } from '@infrastructure/dtos/dish/create-dish.dto'
import { EditDishDTO } from '@infrastructure/dtos/dish/edit-dish.dto'
import { GetDishesByCategoryDTO } from '@infrastructure/dtos/dish/get-dishes-by-category.dto'
import { CreateRestaurantDTO } from '@infrastructure/dtos/restaurant/create-restaurant.dto'
import { EditRestaurantDTO } from '@infrastructure/dtos/restaurant/edit-restaurant.dto'
import { UserLoginDTO } from '@infrastructure/dtos/user/user-login.dto'
import { UserRegisterDTO } from '@infrastructure/dtos/user/user-register.dto'
import { InMemoryCategoryRepository } from '@infrastructure/repositories/inmemory-category.repository'
import { InMemoryDishRepository } from '@infrastructure/repositories/inmemory-dish.repository'
import { InMemoryRestaurantRepository } from '@infrastructure/repositories/inmemory-restaurant.repository'
import { InMemoryUserRepository } from '@infrastructure/repositories/inmemory-user.repository'
import { StatusCodes } from '@infrastructure/utils/status-code'
import { CategoryMother } from '@test/domain/mothers/category.entity.mother'
import { DishMother } from '@test/domain/mothers/dish.entity.mother'
import { EmailVOMother } from '@test/domain/mothers/email.vo.mother'
import { PasswordVOMother } from '@test/domain/mothers/password.vo.mother'
import { RestaurantMother } from '@test/domain/mothers/restaurant.entity.mother'
import { UserMother } from '@test/domain/mothers/user.entity.mother'
import { UuidVOMother } from '@test/domain/mothers/uuid.vo.mother'
import app from 'src/app'
import { Primitives } from 'src/types/primitives'
import request from 'supertest'

let UserToTest: User
let UserToken: string
let RestaurantToTest: Restaurant
let CategoryToTest: Category
let DishToTest: Dish

beforeAll(async () => {
  UserToTest = await UserMother.random()
  myContainer.rebind(ContainerSymbols.UserRepository).to(InMemoryUserRepository)
  RestaurantToTest = RestaurantMother.random()
  myContainer.rebind(ContainerSymbols.RestaurantRepository).to(InMemoryRestaurantRepository)
  CategoryToTest = CategoryMother.random()
  myContainer.rebind(ContainerSymbols.CategoryRepository).to(InMemoryCategoryRepository)
  DishToTest = DishMother.random()
  myContainer.rebind(ContainerSymbols.DishRepository).to(InMemoryDishRepository)
})

/** --- USER --- */

describe('User Register - Controller', () => {
  describe('POST /user/register', () => {
    describe('When a valid request is sent', () => {
      it('should register a new user', async () => {
        const requestBody: UserRegisterDTO = UserToTest.toPrimitives()

        await request(app).post('/user/register').send(requestBody).expect(StatusCodes.CREATED)
      })
    })

    describe('When a invalid request is sent', () => {
      it('should return BAD_REQUEST', async () => {
        const requestBody = { id: UuidVOMother.random().value }

        await request(app).post('/user/register').send(requestBody).expect(StatusCodes.BAD_REQUEST)
      })
    })
  })
})

describe('User login - Controller', () => {
  describe('POST /user/login', () => {
    describe('When a valid request is sent', () => {
      it('should return a user token', async () => {
        const requestBody: UserLoginDTO = {
          email: UserToTest.email.value,
          password: UserToTest.password.value,
        }

        await request(app)
          .post('/user/login')
          .send(requestBody)
          .expect(StatusCodes.OK)
          .then(response => {
            expect(response.body).toHaveProperty('token')
            const { token } = response.body as Record<string, string>
            token && (UserToken = token)
          })
      })
    })

    describe('When a invalid request is sent', () => {
      it('should return BAD_REQUEST', async () => {
        const requestBody = {
          email: UserToTest.email.value,
        }

        await request(app).post('/user/login').send(requestBody).expect(StatusCodes.BAD_REQUEST)
      })
    })

    describe('When a invalid email or password is sent', () => {
      it('should return UNAUTHORIZED', async () => {
        const password = await PasswordVOMother.random()
        const requestBody: UserLoginDTO = {
          email: EmailVOMother.random().value,
          password: password.value,
        }

        await request(app).post('/user/login').send(requestBody).expect(StatusCodes.UNAUTHORIZED)
      })
    })
  })
})

describe('User GetProfile - Controller', () => {
  describe('GET /user/profile', () => {
    describe('When a valid user ID is sent', () => {
      it('should return a user profile', async () => {
        const expectedBody = UserToTest.toPrimitives()

        await request(app)
          .get('/user/profile')
          .set('Authorization', `Bearer ${UserToken}`)
          .send()
          .expect(StatusCodes.OK)
          .then(response => {
            expect(response.body).toStrictEqual(expectedBody)
          })
      })
    })

    describe('When a invalid request is sent', () => {
      it('should return UNAUTHORIZED', async () => {
        await request(app).get('/user/profile').send().expect(StatusCodes.UNAUTHORIZED)
      })
    })
  })
})

/** --- RESTAURANT --- */

describe('Create Restaurant - Controller', () => {
  describe('POST /restaurant/', () => {
    describe('When a valid restaurant is send', () => {
      it('should return a CREATED', async () => {
        const body: CreateRestaurantDTO = {
          id: RestaurantToTest.id.value,
          name: RestaurantToTest.name.value,
          description: RestaurantToTest.description.value,
          domain: RestaurantToTest.domain.value,
          location: RestaurantToTest.location.value,
        }

        await request(app)
          .post('/restaurant/')
          .set('Authorization', `Bearer ${UserToken}`)
          .send(body)
          .expect(StatusCodes.CREATED)
      })
    })

    describe('When a invalid request is sent', () => {
      it('should return UNAUTHORIZED', async () => {
        await request(app).post('/restaurant/').send().expect(StatusCodes.UNAUTHORIZED)
      })
    })
  })
})

describe('Edit Restaurant - Controller', () => {
  describe('PUT /restaurant/', () => {
    describe('When a valid restaurant is send', () => {
      it('should return a CREATED', async () => {
        const body: EditRestaurantDTO = {
          id: RestaurantToTest.id.value,
          name: RestaurantToTest.name.value,
          description: RestaurantToTest.description.value,
          domain: RestaurantToTest.domain.value,
          location: 'Location changed',
        }

        await request(app)
          .put('/restaurant/')
          .set('Authorization', `Bearer ${UserToken}`)
          .send(body)
          .expect(StatusCodes.OK)
      })
    })

    describe('When a invalid request is sent', () => {
      it('should return UNAUTHORIZED', async () => {
        await request(app).put('/restaurant/').send().expect(StatusCodes.UNAUTHORIZED)
      })
    })
  })
})

describe('Get Restaurants by Owner - Controller', () => {
  describe('Get /restaurant/', () => {
    describe('When a valid userToken is send', () => {
      it('should return an array of restaurants', async () => {
        const expectedBody = [
          {
            ...RestaurantToTest.toPrimitives(),
            location: 'Location changed',
            ownerId: UserToTest.id.value,
          },
        ]
        await request(app)
          .get('/restaurant/')
          .set('Authorization', `Bearer ${UserToken}`)
          .send()
          .expect(StatusCodes.OK)
          .then(response => {
            expect(response.body).toStrictEqual(expectedBody)
          })
      })
    })

    describe('When a invalid request is sent', () => {
      it('should return UNAUTHORIZED', async () => {
        await request(app).get('/restaurant/').send().expect(StatusCodes.UNAUTHORIZED)
      })
    })
  })
})

/** --- CATEGORY --- */

describe('Create Category - Controller', () => {
  describe('POST /category/', () => {
    describe('When a valid Category is send', () => {
      it('should return a CREATED', async () => {
        const body: CreateCategoryDTO = {
          id: CategoryToTest.id.value,
          name: CategoryToTest.name.value,
          description: CategoryToTest.description.value,
          image: CategoryToTest.image.value,
          restaurantId: RestaurantToTest.id.value,
        }

        await request(app)
          .post('/category/')
          .set('Authorization', `Bearer ${UserToken}`)
          .send(body)
          .expect(StatusCodes.CREATED)
      })
    })

    describe('When a invalid request is sent', () => {
      it('should return UNAUTHORIZED', async () => {
        await request(app).post('/category/').send().expect(StatusCodes.UNAUTHORIZED)
      })
    })
  })
})

describe('Edit Category - Controller', () => {
  describe('PUT /category/', () => {
    describe('When a valid Category is send', () => {
      it('should return a CREATED', async () => {
        const body: EditCategoryDTO = {
          id: CategoryToTest.id.value,
          name: CategoryToTest.name.value,
          description: 'Description changed for test',
          image: CategoryToTest.image.value,
        }

        await request(app)
          .put('/category/')
          .set('Authorization', `Bearer ${UserToken}`)
          .send(body)
          .expect(StatusCodes.OK)
      })
    })

    describe('When a invalid request is sent', () => {
      it('should return UNAUTHORIZED', async () => {
        await request(app).put('/category/').send().expect(StatusCodes.UNAUTHORIZED)
      })
    })
  })
})

describe('Get Categories by Restaurant - Controller', () => {
  describe('Get /Category/', () => {
    describe('When a valid userToken is send', () => {
      it('should return an array of categories', async () => {
        const body: GetCategoriesByRestaurantDTO = {
          restaurantId: RestaurantToTest.id.value,
        }
        const expectedBody: Array<Primitives<Category>> = [
          {
            ...CategoryToTest.toPrimitives(),
            description: 'Description changed for test',
            ownerId: UserToTest.id.value,
            restaurantId: RestaurantToTest.id.value,
          },
        ]
        await request(app)
          .get('/category/')
          .send(body)
          .expect(StatusCodes.OK)
          .then(response => {
            expect(response.body).toStrictEqual(expectedBody)
          })
      })
    })

    describe('When a invalid request is sent', () => {
      it('should return BAD_REQUEST', async () => {
        await request(app).get('/category/').send().expect(StatusCodes.BAD_REQUEST)
      })
    })
  })
})

/** --- DISH --- */
describe('Create Dish - Controller', () => {
  describe('POST /dish/', () => {
    describe('When a valid Dish is send', () => {
      it('should return a CREATED', async () => {
        const body: CreateDishDTO = {
          id: DishToTest.id.value,
          name: DishToTest.name.value,
          description: DishToTest.description.value,
          image: DishToTest.image.value,
          price: DishToTest.price.value,
          allergens: DishToTest.allergens.map(allergen => allergen.value),
          categoryIds: [CategoryToTest.id.value],
        }

        await request(app)
          .post('/dish/')
          .set('Authorization', `Bearer ${UserToken}`)
          .send(body)
          .expect(StatusCodes.CREATED)
      })
    })

    describe('When a invalid request is sent', () => {
      it('should return UNAUTHORIZED', async () => {
        await request(app).post('/category/').send().expect(StatusCodes.UNAUTHORIZED)
      })
    })
  })
})

describe('Edit Dish - Controller', () => {
  describe('PUT /dish/', () => {
    describe('When a valid Dish is send', () => {
      it('should return a CREATED', async () => {
        const body: EditDishDTO = {
          id: DishToTest.id.value,
          name: DishToTest.name.value,
          description: 'Description changed for test',
          image: DishToTest.image.value,
          price: DishToTest.price.value,
          allergens: DishToTest.allergens.map(allergen => allergen.value),
          categoryIds: [CategoryToTest.id.value],
        }

        await request(app)
          .put('/dish/')
          .set('Authorization', `Bearer ${UserToken}`)
          .send(body)
          .expect(StatusCodes.OK)
      })
    })

    describe('When a invalid request is sent', () => {
      it('should return UNAUTHORIZED', async () => {
        await request(app).put('/dish/').send().expect(StatusCodes.UNAUTHORIZED)
      })
    })
  })
})

describe('Get Dishes by Category - Controller', () => {
  describe('Get /dish/', () => {
    describe('When a valid userToken is send', () => {
      it('should return an array of dishes', async () => {
        const body: GetDishesByCategoryDTO = {
          categoryId: CategoryToTest.id.value,
        }
        const expectedBody: Array<Primitives<Dish>> = [
          {
            ...DishToTest.toPrimitives(),
            description: 'Description changed for test',
            categoryIds: [CategoryToTest.id.value],
            ownerId: UserToTest.id.value,
          },
        ]
        await request(app)
          .get('/dish/')
          .send(body)
          .expect(StatusCodes.OK)
          .then(response => {
            expect(response.body).toStrictEqual(expectedBody)
          })
      })
    })

    describe('When a invalid request is sent', () => {
      it('should return BAD_REQUEST', async () => {
        await request(app).get('/category/').send().expect(StatusCodes.BAD_REQUEST)
      })
    })
  })
})

/** --- DELETIONS RESTAURANT | CATEGORY | DISH --- */

describe('Delete Category - Controller', () => {
  describe('DELETE /category/', () => {
    describe('When a valid category id is send', () => {
      it('should return a OK', async () => {
        const id = CategoryToTest.id.value

        await request(app)
          .delete('/category/' + id)
          .set('Authorization', `Bearer ${UserToken}`)
          .send()
          .expect(StatusCodes.OK)
      })
    })

    describe('When a invalid request is sent', () => {
      it('should return UNAUTHORIZED', async () => {
        const id = CategoryToTest.id.value

        await request(app)
          .delete('/category/' + id)
          .send()
          .expect(StatusCodes.UNAUTHORIZED)
      })
    })
  })
})

describe('Delete Restaurant - Controller', () => {
  describe('DELETE /restaurant/', () => {
    describe('When a valid restaurant id is send', () => {
      it('should return a OK', async () => {
        const id = RestaurantToTest.id.value

        await request(app)
          .delete('/restaurant/' + id)
          .set('Authorization', `Bearer ${UserToken}`)
          .send()
          .expect(StatusCodes.OK)
      })
    })

    describe('When a invalid request is sent', () => {
      it('should return UNAUTHORIZED', async () => {
        const id = RestaurantToTest.id.value

        await request(app)
          .delete('/restaurant/' + id)
          .send()
          .expect(StatusCodes.UNAUTHORIZED)
      })
    })
  })
})
