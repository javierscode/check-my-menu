import jwt, { type SignOptions } from 'jsonwebtoken'

const jwtSecret = 'secret'

const signOptions: SignOptions = {
  algorithm: 'HS512',
  expiresIn: '7d',
}

export const sign = (payload: string | object | Buffer) =>
  new Promise<string>((resolve, reject) => {
    jwt.sign(payload, jwtSecret, signOptions, (err, token) => {
      if (err) reject(err)
      else resolve(token as string)
    })
  })

export const verify = (token: string) =>
  new Promise<string | object | Buffer>((resolve, reject) => {
    jwt.verify(token, jwtSecret, (err, payload) => {
      if (err) reject(err)
      else resolve(payload as string | object | Buffer)
    })
  })
