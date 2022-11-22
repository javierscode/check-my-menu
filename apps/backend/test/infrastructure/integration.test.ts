import { User } from '@domain/entities/user.entity'
import { myContainer } from '@infrastructure/dependency-injection/container'
import { ContainerSymbols } from '@infrastructure/dependency-injection/symbols'
import { UserLoginDTO } from '@infrastructure/dtos/user-login.dto'
import { UserRegisterDTO } from '@infrastructure/dtos/user-register.dto'
import { UserTokenDTO } from '@infrastructure/dtos/user-token.dto'
import { InMemoryUserRepository } from '@infrastructure/repositories/inmemory-user.repository'
import { StatusCodes } from '@infrastructure/utils/status-code'
import { EmailVOMother } from '@test/domain/mothers/email.vo.mother'
import { PasswordVOMother } from '@test/domain/mothers/password.vo.mother'
import { UserMother } from '@test/domain/mothers/user.entity.mother'
import { UuidVOMother } from '@test/domain/mothers/uuid.vo.mother'
import app from 'src/app'
import request from 'supertest'

let UserToTest: User

beforeAll(async () => {
  UserToTest = await UserMother.random()
  myContainer.rebind(ContainerSymbols.UserRepository).to(InMemoryUserRepository)
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

describe('User GetProfile - Controller', () => {
  describe('GET /user/profile', () => {
    describe('When a valid user ID is sent', () => {
      it('should return a user profile', async () => {
        const requestBody: UserTokenDTO = { id: UserToTest.id.value }
        const expectedBody = UserToTest.toPrimitives()

        await request(app)
          .get('/user/profile')
          .send(requestBody)
          .expect(StatusCodes.OK)
          .then(response => {
            expect(response.body).toStrictEqual(expectedBody)
          })
      })
    })

    describe('When a invalid user ID is sent', () => {
      it('should return UNAUTHORIZED', async () => {
        const requestBody: UserTokenDTO = { id: UuidVOMother.random().value }

        await request(app).get('/user/profile').send(requestBody).expect(StatusCodes.UNAUTHORIZED)
      })
    })

    describe('When a invalid request is sent', () => {
      it('should return BAD_REQUEST', async () => {
        const requestBody = {}

        await request(app).get('/user/profile').send(requestBody).expect(StatusCodes.BAD_REQUEST)
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
