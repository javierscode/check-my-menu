/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import formidable from 'formidable'
import PersistentFile from 'formidable/PersistentFile'
import fs from 'fs/promises'
import { NextApiHandler, NextApiRequest } from 'next'
import path from 'path'

export const config = {
  api: {
    bodyParser: false,
  },
}

const readFile = (req: NextApiRequest, options: formidable.Options) => {
  const form = formidable(options)
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err)
      resolve({ fields, files })
    })
  })
}

const handler: NextApiHandler = async (req, res) => {
  const type = req.query.type

  if (!type || typeof type !== 'string') return res.status(400).send('Missing type')

  const uploadDir = path.join(process.cwd() + '/public', '/images', '/' + type)

  try {
    await fs.readdir(uploadDir)
  } catch (error) {
    await fs.mkdir(uploadDir)
  }

  const options: formidable.Options = {}
  options.uploadDir = uploadDir
  options.filename = (name, ext, path, _) => {
    return Date.now().toString() + '_' + path.originalFilename
  }
  options.maxFileSize = 4000 * 1024 * 1024

  const { files } = (await readFile(req, options)) as Record<string, Record<string, unknown>>
  const image = files.image as Record<string, string> & PersistentFile

  res.json({ url: `/images/${type}/${image.newFilename}` })
}

export default handler
