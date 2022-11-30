import type { JSONSchema7Object, JSONSchema7TypeName } from 'json-schema'

export const DeleteCategorySchema: JSONSchema7Object = {
  $id: 'DeleteCategoryDTO',
  type: 'object' as JSONSchema7TypeName,
  properties: {
    id: { type: 'string' as JSONSchema7TypeName },
  },
  required: ['id'],
  additionalProperties: false,
}

export type DeleteCategoryDTO = {
  id: string
}
