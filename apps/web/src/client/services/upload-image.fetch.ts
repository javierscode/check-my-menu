import { SupabaseClientFactory } from '@server/infrastructure/services/images/supabase'
const isDevelopment = process.env.NODE_ENV === 'development'
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL as string

export async function uploadImage(
  image: File,
  type: 'category' | 'dish'
): Promise<string | undefined> {
  const path = `${type}/${Date.now().toString()}_${image.name}`

  const bucket = isDevelopment ? 'dev-images' : 'images'

  const supabase = SupabaseClientFactory.create()

  const { data, error } = await supabase.storage.from(bucket).upload(path, image)

  if (error) {
    console.error(error)
    return undefined
  }

  return `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${data.path}`
}
