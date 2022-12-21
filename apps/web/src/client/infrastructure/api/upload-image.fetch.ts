export function uploadImage(image: File, type: 'category' | 'dish'): Promise<string | undefined> {
  const formData = new FormData()
  formData.append('image', image)

  return fetch(`/api/admin/upload-image?type=${type}`, {
    method: 'POST',
    body: formData,
  }).then(async response => {
    try {
      const data = (await response.json()) as { url: string }
      return data.url
    } catch {
      return undefined
    }
  })
}
