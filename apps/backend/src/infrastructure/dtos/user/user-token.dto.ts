import type { JSONSchema7Object, JSONSchema7TypeName } from 'json-schema'

export const UserTokenSchema: JSONSchema7Object = {
  $id: 'UserTokenDTO',
  type: 'object' as JSONSchema7TypeName,
  properties: {
    id: { type: 'string' as JSONSchema7TypeName },
  },
  required: ['id'],
  additionalProperties: false,
}

export type UserTokenDTO = { id: string }
