import type { JSONSchema7Object, JSONSchema7TypeName } from 'json-schema'

export const UserLoginSchema: JSONSchema7Object = {
  $id: 'UserLoginDTO',
  type: 'object' as JSONSchema7TypeName,
  properties: {
    email: { type: 'string' as JSONSchema7TypeName },
    password: { type: 'string' as JSONSchema7TypeName },
  },
  required: ['email', 'password'],
  additionalProperties: false,
}

export type UserLoginDTO = { email: string; password: string }
