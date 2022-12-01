import type { JSONSchema7Object, JSONSchema7TypeName } from 'json-schema'

export const DeleteDishSchema: JSONSchema7Object = {
  $id: 'DeleteDishDTO',
  type: 'object' as JSONSchema7TypeName,
  properties: {
    id: { type: 'string' as JSONSchema7TypeName },
  },
  required: ['id'],
  additionalProperties: false,
}

export type DeleteDishDTO = {
  id: string
}
