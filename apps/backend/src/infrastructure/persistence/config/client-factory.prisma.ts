import { PrismaClient } from '@prisma/client'

export class PrismaClientFactory {
  private static _client: PrismaClient | null = null

  static createClient(): PrismaClient {
    if (PrismaClientFactory._client) return PrismaClientFactory._client
    console.log('Creating Prisma client...')
    this._client = new PrismaClient()
    return this._client
  }
}
