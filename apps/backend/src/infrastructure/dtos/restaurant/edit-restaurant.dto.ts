import type { JSONSchema7Object, JSONSchema7TypeName } from 'json-schema'

export const EditRestaurantSchema: JSONSchema7Object = {
  $id: 'EditRestaurantDTO',
  type: 'object' as JSONSchema7TypeName,
  properties: {
    id: { type: 'string' as JSONSchema7TypeName },
    name: { type: 'string' as JSONSchema7TypeName },
    domain: { type: 'string' as JSONSchema7TypeName },
    location: { type: 'string' as JSONSchema7TypeName },
    description: { type: 'string' as JSONSchema7TypeName },
  },
  required: ['id', 'name', 'domain', 'location', 'description', 'ownerId'],
  additionalProperties: false,
}

export type EditRestaurantDTO = {
  id: string
  name: string
  domain: string
  location: string
  description: string
}
