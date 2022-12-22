import type { JSONSchema7Object, JSONSchema7TypeName } from 'json-schema'

export const GetRestaurantByIdSchema: JSONSchema7Object = {
  $id: 'GetRestaurantByIdDTO',
  type: 'object' as JSONSchema7TypeName,
  properties: {
    id: { type: 'string' as JSONSchema7TypeName },
  },
  required: ['id'],
  additionalProperties: false,
}

export type GetRestaurantByIdDTO = {
  id: string
}
