import { Fetcher } from '@shared/infrastructure/fetcher'

export function generateQr(text: string): Promise<string> {
  return Fetcher.get<{ qr: string }>(`/api/qr-generator?text=${text}`).then(({ error, data }) => {
    if (error || !data) {
      throw new Error(error)
    }
    return data.qr
  })
}
