import type { JSONSchema7Object, JSONSchema7TypeName } from 'json-schema'

export const EditDishSchema: JSONSchema7Object = {
  $id: 'EditDishDTO',
  type: 'object' as JSONSchema7TypeName,
  properties: {
    id: { type: 'string' as JSONSchema7TypeName },
    name: { type: 'string' as JSONSchema7TypeName },
    description: { type: 'string' as JSONSchema7TypeName },
    image: { type: 'string' as JSONSchema7TypeName },
    price: { type: 'number' as JSONSchema7TypeName },
    allergens: {
      type: 'array' as JSONSchema7TypeName,
      items: { type: 'string' as JSONSchema7TypeName },
    },
    categoryIds: {
      type: 'array' as JSONSchema7TypeName,
      items: { type: 'string' as JSONSchema7TypeName },
    },
  },
  required: ['id', 'name', 'description', 'image', 'price', 'allergens', 'categoryIds'],
  additionalProperties: false,
}

export type EditDishDTO = {
  id: string
  name: string
  description: string
  image: string
  price: number
  allergens: string[]
  categoryIds: string[]
}
