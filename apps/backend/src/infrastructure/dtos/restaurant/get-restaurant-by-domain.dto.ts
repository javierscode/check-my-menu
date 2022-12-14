import type { JSONSchema7Object, JSONSchema7TypeName } from 'json-schema'

export const getRestaurantByDomainSchema: JSONSchema7Object = {
  $id: 'getRestaurantByDomainDTO',
  type: 'object' as JSONSchema7TypeName,
  properties: {
    domain: { type: 'string' as JSONSchema7TypeName },
  },
  required: ['domain'],
  additionalProperties: false,
}

export type getRestaurantByDomainDTO = {
  domain: string
}
