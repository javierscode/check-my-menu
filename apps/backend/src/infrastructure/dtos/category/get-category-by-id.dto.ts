import type { JSONSchema7Object, JSONSchema7TypeName } from 'json-schema'

export const GetCategoryByIdSchema: JSONSchema7Object = {
  $id: 'GetCategoryByIdDTO',
  type: 'object' as JSONSchema7TypeName,
  properties: {
    id: { type: 'string' as JSONSchema7TypeName },
  },
  required: ['id'],
  additionalProperties: false,
}

export type GetCategoryByIdDTO = {
  id: string
}
