import { UserData } from '@domain/entities/user'
import { UserService } from '@domain/services/user.service'

import { fakeUsers } from './constants'

export class MockUserService implements UserService {
  login(email: string, password: string): Promise<{ token: string }> {
    const user = fakeUsers.find(u => u.email === email && u.password === password)
    if (!user) {
      throw new Error('User not found')
    }
    const token = user.id
    return Promise.resolve({ token })
  }

  logout(): Promise<void> {
    throw new Error('Method not implemented.')
  }

  getProfile(token: string): Promise<UserData> {
    const user = fakeUsers.find(u => u.id === token)
    if (!user) {
      throw new Error('User not found')
    }
    return Promise.resolve(user)
  }
}
