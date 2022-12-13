import type { JSONSchema7Object, JSONSchema7TypeName } from 'json-schema'

export const GetDishesByRestaurantSchema: JSONSchema7Object = {
  $id: 'GetDishesByRestaurantDTO',
  type: 'object' as JSONSchema7TypeName,
  properties: {
    restaurantId: { type: 'string' as JSONSchema7TypeName },
  },
  required: ['restaurantId'],
  additionalProperties: false,
}

export type GetDishesByRestaurantDTO = {
  restaurantId: string
}
