import { FromSchema } from 'json-schema-to-ts'

export const UserLoginSchema = {
  $id: 'UserLoginDTO',
  type: 'object',
  properties: {
    email: { type: 'string' },
    password: { type: 'string' },
  },
  required: ['email', 'password'],
  additionalProperties: false,
} as const

export type UserLoginDTO = FromSchema<typeof UserLoginSchema>
