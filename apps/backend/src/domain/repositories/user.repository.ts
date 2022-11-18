import { User } from '@domain/entities/user.entity'

import { EmailVO } from '../value-objects/email.vo'
import { UuidVO } from '../value-objects/uuid.vo'

/**
 * User repository
 */
export interface UserRepository {
  /**
   * Finds a user by id
   * @param id User id
   * @returns Domain user
   */
  findById(id: UuidVO): Promise<User | null>

  /**
   * Finds a user by email
   * @param email User email
   * @returns Domain user
   */
  findByEmail(email: EmailVO): Promise<User | null>

  /**
   * Persists a new user
   * @param domainUser Domain user
   */
  create(domainUser: User): Promise<void>

  /**
   * Updates a user
   * @param domainUser Domain user
   */
  update(domainUser: User): Promise<void>
}
