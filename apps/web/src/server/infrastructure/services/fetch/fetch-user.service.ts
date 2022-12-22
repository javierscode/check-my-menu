import { UserService } from '@server/domain/services/user.service'
import { UserData } from '@shared/domain/entities/user'
import { BACKEND_URL } from '@shared/infrastructure/constants'
import { Fetcher } from '@shared/infrastructure/fetcher'
import uuid from 'uuid-random'

export class FetchUserService implements UserService {
  async login(email: string, password: string): Promise<{ token: string }> {
    const { error, data } = await Fetcher.post<{ token: string }>(BACKEND_URL + '/user/login', {
      body: { email, password },
    })
    if (error || !data) throw new Error('Error logging in')
    return data
  }

  async register(name: string, lastname: string, email: string, password: string): Promise<void> {
    const newUser = {
      id: uuid(),
      name,
      lastname,
      email,
      password,
    }

    const { error } = await Fetcher.post<void>(BACKEND_URL + '/user/register', {
      body: newUser,
    })
    if (error) throw new Error('Error registering')
  }

  async getProfile(token: string): Promise<UserData> {
    const { error, data } = await Fetcher.get<UserData>(BACKEND_URL + '/user/profile', {
      authToken: token,
    })
    if (error || !data) throw new Error('Error fetching profile')
    return data
  }
}
