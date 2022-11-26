import type { JSONSchema7Object, JSONSchema7TypeName } from 'json-schema'

export const CreateRestaurantSchema: JSONSchema7Object = {
  $id: 'CreateRestaurantDTO',
  type: 'object' as JSONSchema7TypeName,
  properties: {
    id: { type: 'string' as JSONSchema7TypeName },
    name: { type: 'string' as JSONSchema7TypeName },
    domain: { type: 'string' as JSONSchema7TypeName },
    location: { type: 'string' as JSONSchema7TypeName },
    description: { type: 'string' as JSONSchema7TypeName },
    ownerId: { type: 'string' as JSONSchema7TypeName },
  },
  required: ['id', 'name', 'domain', 'location', 'description', 'ownerId'],
  additionalProperties: false,
}

export type CreateRestaurantDTO = {
  id: string
  name: string
  domain: string
  location: string
  description: string
  ownerId: string
}
