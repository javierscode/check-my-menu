const defaultHeaders = {
  'Content-Type': 'application/json',
}

type fetchOptions = {
  authToken?: string
  body?: Record<string, unknown>
}

type fetchResponse<T> =
  | { error: string; data: undefined }
  | { data: T; error: undefined }
  | { data: undefined; error: undefined }

const genericFetch = async <T>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  options?: fetchOptions
): Promise<fetchResponse<T>> => {
  return fetch(url, {
    method,
    headers: {
      ...defaultHeaders,
      Authorization: options?.authToken ? `Bearer ${options.authToken}` : '',
    },
    body: options?.body ? JSON.stringify(options.body) : undefined,
  }).then(async res => {
    if (!res.ok) return { error: res.statusText, data: undefined }

    try {
      const data = (await res.json()) as T
      return { data, error: undefined }
    } catch {
      return { error: undefined, data: undefined }
    }
  })
}

export const Fetcher = {
  get: <T>(url: string, options?: fetchOptions): Promise<fetchResponse<T>> =>
    genericFetch('GET', url, options),
  post: <T>(url: string, options?: fetchOptions): Promise<fetchResponse<T>> =>
    genericFetch('POST', url, options),
  put: <T>(url: string, options?: fetchOptions): Promise<fetchResponse<T>> =>
    genericFetch('PUT', url, options),
  delete: <T>(url: string, options?: fetchOptions): Promise<fetchResponse<T>> =>
    genericFetch('DELETE', url, options),
}
