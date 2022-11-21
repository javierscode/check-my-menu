import { FromSchema } from 'json-schema-to-ts'

export const UserRegisterSchema = {
  $id: 'UserRegisterDTO',
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    lastname: { type: 'string' },
    email: { type: 'string' },
    password: { type: 'string' },
  },
  required: ['id', 'name', 'lastname', 'email', 'password'],
  additionalProperties: false,
} as const

export type UserRegisterDTO = FromSchema<typeof UserRegisterSchema>
