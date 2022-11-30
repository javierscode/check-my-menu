import type { JSONSchema7Object, JSONSchema7TypeName } from 'json-schema'

export const GetCategoriesByRestaurantSchema: JSONSchema7Object = {
  $id: 'GetCategoriesByRestaurantDTO',
  type: 'object' as JSONSchema7TypeName,
  properties: {
    restaurantId: { type: 'string' as JSONSchema7TypeName },
  },
  required: ['restaurantId'],
  additionalProperties: false,
}

export type GetCategoriesByRestaurantDTO = {
  restaurantId: string
}
