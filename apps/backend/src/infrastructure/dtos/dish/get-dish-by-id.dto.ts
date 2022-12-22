import type { JSONSchema7Object, JSONSchema7TypeName } from 'json-schema'

export const GetDishByIdSchema: JSONSchema7Object = {
  $id: 'GetDishByIdDTO',
  type: 'object' as JSONSchema7TypeName,
  properties: {
    id: { type: 'string' as JSONSchema7TypeName },
  },
  required: ['id'],
  additionalProperties: false,
}

export type GetDishByIdDTO = {
  id: string
}
