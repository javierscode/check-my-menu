import type { JSONSchema7Object, JSONSchema7TypeName } from 'json-schema'

export const EditCategorySchema: JSONSchema7Object = {
  $id: 'EditCategoryDTO',
  type: 'object' as JSONSchema7TypeName,
  properties: {
    id: { type: 'string' as JSONSchema7TypeName },
    name: { type: 'string' as JSONSchema7TypeName },
    description: { type: 'string' as JSONSchema7TypeName },
    image: { type: 'string' as JSONSchema7TypeName },
  },
  required: ['id', 'name', 'description', 'image'],
  additionalProperties: false,
}

export type EditCategoryDTO = {
  id: string
  name: string
  description: string
  image: string
}
