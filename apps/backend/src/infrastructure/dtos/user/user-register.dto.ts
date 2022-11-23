import type { JSONSchema7Object, JSONSchema7TypeName } from 'json-schema'

export const UserRegisterSchema: JSONSchema7Object = {
  $id: 'UserRegisterDTO',
  type: 'object' as JSONSchema7TypeName,
  properties: {
    id: { type: 'string' as JSONSchema7TypeName },
    name: { type: 'string' as JSONSchema7TypeName },
    lastname: { type: 'string' as JSONSchema7TypeName },
    email: { type: 'string' as JSONSchema7TypeName },
    password: { type: 'string' as JSONSchema7TypeName },
  },
  required: ['id', 'name', 'lastname', 'email', 'password'],
  additionalProperties: false,
}

export type UserRegisterDTO = {
  id: string
  name: string
  lastname: string
  email: string
  password: string
}
