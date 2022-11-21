import { FromSchema } from 'json-schema-to-ts'

export const UserTokenSchema = {
  $id: 'UserTokenDTO',
  type: 'object',
  properties: {
    id: { type: 'string' },
  },
  required: ['id'],
  additionalProperties: false,
} as const

export type UserTokenDTO = FromSchema<typeof UserTokenSchema>
