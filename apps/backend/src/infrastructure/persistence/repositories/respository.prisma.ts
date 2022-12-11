import { PrismaClient } from '@prisma/client'
import { injectable } from 'inversify'

import { PrismaClientFactory } from '../config/client-factory.prisma'

@injectable()
export abstract class PrismaRepository {
  protected client: PrismaClient
  constructor() {
    this.client = PrismaClientFactory.createClient()
  }
}
