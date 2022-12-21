import { CategoryService } from '@server/domain/services/category.service'
import { InMemoryCategoryService } from '@server/infrastructure/services/inmemory/inmemory-category.service'
import { COOKIE_AUTH_KEY } from '@shared/infrastructure/constants'
import { NextApiRequest, NextApiResponse } from 'next'

type TypedBody = {
  name: string
  description: string
  image: string
  restaurantId: string
}

export default async function createCategoryHandler(req: NextApiRequest, res: NextApiResponse) {
  validationMiddleware(req, res)

  const token = req.cookies[COOKIE_AUTH_KEY] as string
  const { name, description, image, restaurantId } = req.body as TypedBody

  const CategoryService: CategoryService = new InMemoryCategoryService()

  try {
    const category = await CategoryService.createCategory(token, {
      name,
      description,
      image,
      restaurantId,
    })

    return res.status(201).json({ category })
  } catch (error) {
    return res.status(500).end()
  }
}

function validationMiddleware(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed')
  const token = req.cookies[COOKIE_AUTH_KEY]
  if (!token) return res.status(401).send('Unauthorized')
  const { name, description, image, restaurantId, ...rest } = req.body as Record<string, unknown>
  if (
    !name ||
    !description ||
    !image ||
    !restaurantId ||
    typeof name !== 'string' ||
    typeof description !== 'string' ||
    typeof image !== 'string' ||
    typeof restaurantId !== 'string'
  ) {
    return res.status(400).send('Missing name, description or image')
  }
  if (Object.keys(rest).length !== 0) return res.status(400).send('Invalid body')
}
