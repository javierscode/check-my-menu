import { CategoryService } from '@server/domain/services/category.service'
import { FetchCategoryService } from '@server/infrastructure/services/fetch/fetch-category.service'
import { COOKIE_AUTH_KEY } from '@shared/infrastructure/constants'
import { NextApiRequest, NextApiResponse } from 'next'

type TypedBody = {
  id: string
}

export default async function deleteCategoryHandler(req: NextApiRequest, res: NextApiResponse) {
  validationMiddleware(req, res)

  const token = req.cookies[COOKIE_AUTH_KEY] as string
  const { id } = req.body as TypedBody

  const CategoryService: CategoryService = new FetchCategoryService()

  try {
    await CategoryService.deleteCategory(token, id)

    return res.status(201).send('Restaurant deleted')
  } catch (error) {
    return res.status(500).end()
  }
}

function validationMiddleware(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed')
  const token = req.cookies[COOKIE_AUTH_KEY]
  if (!token) return res.status(401).send('Unauthorized')
  const { id, ...rest } = req.body as Record<string, unknown>
  if (!id || typeof id !== 'string') {
    return res.status(400).send('Missing id')
  }
  if (Object.keys(rest).length !== 0) return res.status(400).send('Invalid body')
}
