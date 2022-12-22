import { UserData } from '@shared/domain/entities/user'

export interface UserService {
  login(email: string, password: string): Promise<{ token: string }>
  register(name: string, lastname: string, email: string, password: string): Promise<void>
  getProfile(token: string): Promise<UserData>
}
