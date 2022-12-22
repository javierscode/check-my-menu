import { DishService } from '@server/domain/services/dish.service'
import { FetchDishService } from '@server/infrastructure/services/fetch/fetch-dish.service'
import { Allergen } from '@shared/domain/entities/allergen'
import { COOKIE_AUTH_KEY } from '@shared/infrastructure/constants'
import { NextApiRequest, NextApiResponse } from 'next'

type TypedBody = {
  name: string
  description: string
  price: string
  image: string
  allergens: Allergen[]
  categoryIds: string[]
  restaurantId: string
}

export default async function createDishHandler(req: NextApiRequest, res: NextApiResponse) {
  validationMiddleware(req, res)

  const token = req.cookies[COOKIE_AUTH_KEY] as string
  const { name, description, price, image, allergens, categoryIds, restaurantId } =
    req.body as TypedBody

  const DishService: DishService = new FetchDishService()

  try {
    const dish = await DishService.createDish(token, {
      name,
      description,
      price: Number(price),
      image,
      allergens,
      categoryIds,
      restaurantId,
    })

    return res.status(201).json({ dish })
  } catch (error) {
    return res.status(500).end()
  }
}

function validationMiddleware(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed')
  const token = req.cookies[COOKIE_AUTH_KEY]
  if (!token) return res.status(401).send('Unauthorized')
  const { name, description, price, image, allergens, categoryIds, restaurantId, ...rest } =
    req.body as Record<string, unknown>

  if (
    !name ||
    !description ||
    !price ||
    !image ||
    !allergens ||
    !categoryIds ||
    !restaurantId ||
    typeof name !== 'string' ||
    typeof description !== 'string' ||
    typeof price !== 'string' ||
    typeof image !== 'string' ||
    !Array.isArray(allergens) ||
    !Array.isArray(categoryIds) ||
    typeof restaurantId !== 'string'
  ) {
    return res.status(400).send('Missing name, description or image')
  }
  if (Object.keys(rest).length !== 0) return res.status(400).send('Invalid body')
}
