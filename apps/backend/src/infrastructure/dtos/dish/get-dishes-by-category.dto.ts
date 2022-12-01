import type { JSONSchema7Object, JSONSchema7TypeName } from 'json-schema'

export const GetDishesByCategorySchema: JSONSchema7Object = {
  $id: 'GetDishesByCategoryDTO',
  type: 'object' as JSONSchema7TypeName,
  properties: {
    categoryId: { type: 'string' as JSONSchema7TypeName },
  },
  required: ['categoryId'],
  additionalProperties: false,
}

export type GetDishesByCategoryDTO = {
  categoryId: string
}
