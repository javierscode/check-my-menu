import type { JSONSchema7Object, JSONSchema7TypeName } from 'json-schema'

export const GetRestaurantByOwnerSchema: JSONSchema7Object = {
  $id: 'GetRestaurantByOwnerDTO',
  type: 'object' as JSONSchema7TypeName,
  properties: {
    ownerId: { type: 'string' as JSONSchema7TypeName },
  },
  required: ['ownerId'],
  additionalProperties: false,
}

export type GetRestaurantByOwnerDTO = {
  ownerId: string
}
