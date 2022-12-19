import { RestaurantService } from '@domain/services/restaurant.service'
import { COOKIE_AUTH_KEY } from '@infrastructure/constants'
import { MockRestaurantService } from '@test/infrastructure/services/mock-restaurant.service'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function createRestaurantHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed')
  const token = req.cookies[COOKIE_AUTH_KEY]
  if (!token) return res.status(401).send('Unauthorized')
  const { name, domain, location, description, ...rest } = req.body as Record<string, unknown>
  if (
    !name ||
    !domain ||
    !location ||
    !description ||
    typeof name !== 'string' ||
    typeof domain !== 'string' ||
    typeof location !== 'string' ||
    typeof description !== 'string'
  ) {
    return res.status(400).send('Missing name, domain, location or description')
  }
  if (Object.keys(rest).length !== 0) return res.status(400).send('Invalid body')

  const RestaurantService: RestaurantService = new MockRestaurantService()

  try {
    const restaurant = await RestaurantService.createRestaurant(token, {
      name,
      domain,
      location,
      description,
    })
    return res.status(201).json({ restaurant })
  } catch (error) {
    return res.status(500).end()
  }
}
