const BACKEND_URL = process.env.BACKEND_URL as string

const defaultHeaders = {
  'Content-Type': 'application/json',
}

type fetchOptions = {
  authToken?: string
  body?: Record<string, unknown>
}

const genericFetch = async <T>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  options?: fetchOptions
): Promise<T> => {
  return fetch(BACKEND_URL + url, {
    method,
    headers: {
      ...defaultHeaders,
      Authorization: options?.authToken ? `Bearer ${options.authToken}` : '',
    },
    body: options?.body ? JSON.stringify(options.body) : undefined,
  }).then(res => res.json() as T)
}

export const Fetcher = {
  get: <T>(url: string, options?: fetchOptions): Promise<T> => genericFetch('GET', url, options),
  post: <T>(url: string, options?: fetchOptions): Promise<T> => genericFetch('POST', url, options),
  put: <T>(url: string, options?: fetchOptions): Promise<T> => genericFetch('PUT', url, options),
  delete: <T>(url: string, options?: fetchOptions): Promise<T> =>
    genericFetch('DELETE', url, options),
}
