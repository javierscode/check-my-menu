import { CreateRestaurantRequest } from '@application/use-cases/restaurant/create-restaurant.usecase'
import { Restaurant } from '@domain/entities/restaurant.entity'
import { User } from '@domain/entities/user.entity'
import { myContainer } from '@infrastructure/dependency-injection/container'
import { ContainerSymbols } from '@infrastructure/dependency-injection/symbols'
import { CreateRestaurantDTO } from '@infrastructure/dtos/restaurant/create-restaurant.dto'
import { EditRestaurantDTO } from '@infrastructure/dtos/restaurant/edit-restaurant.dto'
import { UserLoginDTO } from '@infrastructure/dtos/user/user-login.dto'
import { UserRegisterDTO } from '@infrastructure/dtos/user/user-register.dto'
import { InMemoryRestaurantRepository } from '@infrastructure/repositories/inmemory-restaurant.repository'
import { InMemoryUserRepository } from '@infrastructure/repositories/inmemory-user.repository'
import { StatusCodes } from '@infrastructure/utils/status-code'
import { CreateRestaurantRequestMother } from '@test/application/mothers/restaurant/create-restaurant-request.mother'
import { EmailVOMother } from '@test/domain/mothers/email.vo.mother'
import { PasswordVOMother } from '@test/domain/mothers/password.vo.mother'
import { RestaurantMother } from '@test/domain/mothers/restaurant.entity.mother'
import { UserMother } from '@test/domain/mothers/user.entity.mother'
import { UuidVOMother } from '@test/domain/mothers/uuid.vo.mother'
import { response } from 'express'
import app from 'src/app'
import request from 'supertest'

let UserToTest: User
let UserToken: string
let RestaurantToTest: Restaurant

beforeAll(async () => {
  UserToTest = await UserMother.random()
  myContainer.rebind(ContainerSymbols.UserRepository).to(InMemoryUserRepository)
  RestaurantToTest = RestaurantMother.random()
  myContainer.rebind(ContainerSymbols.RestaurantRepository).to(InMemoryRestaurantRepository)
})

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

describe('Delete Restaurant - Controller', () => {
  describe('DELETE /restaurant/', () => {
    describe('When a valid id restaurant is send', () => {
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
        await request(app).delete('/restaurant/').send().expect(StatusCodes.UNAUTHORIZED)
      })
    })
  })
})
