import type { JSONSchema7Object, JSONSchema7TypeName } from 'json-schema'

export const CreateCategorySchema: JSONSchema7Object = {
  $id: 'CreateCategoryDTO',
  type: 'object' as JSONSchema7TypeName,
  properties: {
    id: { type: 'string' as JSONSchema7TypeName },
    name: { type: 'string' as JSONSchema7TypeName },
    description: { type: 'string' as JSONSchema7TypeName },
    image: { type: 'string' as JSONSchema7TypeName },
    restaurantId: { type: 'string' as JSONSchema7TypeName },
  },
  required: ['id', 'name', 'description', 'image', 'restaurantId'],
  additionalProperties: false,
}

export type CreateCategoryDTO = {
  id: string
  name: string
  description: string
  image: string
  restaurantId: string
}
