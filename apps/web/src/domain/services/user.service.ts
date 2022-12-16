import { UserData } from '@domain/entities/user'

export interface UserService {
  login(email: string, password: string): Promise<{ token: string }>
  logout(): Promise<void>
  getProfile(token: string): Promise<UserData>
}
