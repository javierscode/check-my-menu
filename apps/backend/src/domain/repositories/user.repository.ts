import { User } from '@domain/entities/user.entity'

import { EmailVO } from '../value-objects/email.vo'
import { RootRepository } from './root.repository'

/**
 * User repository
 */
export interface UserRepository extends RootRepository<User> {
  /**
   * Finds a user by email
   * @param email User email
   * @returns Domain user
   */
  findByEmail(email: EmailVO): Promise<User | null>
}
