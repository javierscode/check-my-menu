import { AggregateRoot } from '@domain/entities/root.entity'

/**
 * Root repository
 */
export interface RootRepository<T extends AggregateRoot> {
  /**
   * Finds by id
   * @param id Entity id
   * @returns Domain entity
   */
  findById(id: T['id']): Promise<T | null>

  /**
   * Persists a new entity
   * @param domainEntity Domain entity
   */
  create(domainEntity: T): Promise<void>

  /**
   * Updates a entity
   * @param domainEntity Domain entity
   */
  update(domainEntity: T): Promise<void>

  /**
   * Remove a entity
   * @param id Entity id
   */
  remove(id: T['id']): Promise<void>
}
