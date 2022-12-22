import { CategoryService } from '@server/domain/services/category.service'
import { FetchCategoryService } from '@server/infrastructure/services/fetch/fetch-category.service'
import { Category } from '@shared/domain/entities/category'
import { COOKIE_AUTH_KEY } from '@shared/infrastructure/constants'
import { NextApiRequest, NextApiResponse } from 'next'

type TypedBody = Category

export default async function editCategoryHandler(req: NextApiRequest, res: NextApiResponse) {
  validationMiddleware(req, res)

  const token = req.cookies[COOKIE_AUTH_KEY] as string

  const { id, name, description, image, restaurantId } = req.body as TypedBody

  console.log({ id, name, description, image, restaurantId })
  const CategoryService: CategoryService = new FetchCategoryService()

  try {
    const category = await CategoryService.editCategory(token, {
      id,
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
  const { id, name, description, image, restaurantId, ...rest } = req.body as Record<
    string,
    unknown
  >
  if (
    !id ||
    !name ||
    !description ||
    !image ||
    !restaurantId ||
    typeof id !== 'string' ||
    typeof name !== 'string' ||
    typeof description !== 'string' ||
    typeof image !== 'string' ||
    typeof restaurantId !== 'string'
  ) {
    return res.status(400).send('Missing name, description or image')
  }
  if (Object.keys(rest).length !== 0) return res.status(400).send('Invalid body')
}
