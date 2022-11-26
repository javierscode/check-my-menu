import type { JSONSchema7Object, JSONSchema7TypeName } from 'json-schema'

export const DeleteRestaurantSchema: JSONSchema7Object = {
  $id: 'DeleteRestaurantDTO',
  type: 'object' as JSONSchema7TypeName,
  properties: {
    id: { type: 'string' as JSONSchema7TypeName },
  },
  required: ['id'],
  additionalProperties: false,
}

export type DeleteRestaurantDTO = {
  id: string
}
