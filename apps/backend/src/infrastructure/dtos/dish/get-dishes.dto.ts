import type { JSONSchema7Object, JSONSchema7TypeName } from 'json-schema'

export const GetDishesSchema: JSONSchema7Object = {
  $id: 'GetDishesDTO',
  type: 'object' as JSONSchema7TypeName,
  properties: {
    restaurantId: { type: 'string' as JSONSchema7TypeName },
    categoryId: { type: 'string' as JSONSchema7TypeName },
  },
  oneOf: [
    {
      required: ['restaurantId'],
    },
    {
      required: ['categoryId'],
    },
  ],
  additionalProperties: false,
}

export type GetDishesDTO = {
  restaurantId?: string
  categoryId?: string
}
