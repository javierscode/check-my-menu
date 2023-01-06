/* eslint-disable @typescript-eslint/no-explicit-any */
export function mockOfFunction<T extends (...args: any[]) => any>(f: T): jest.Mock<ReturnType<T>> {
  return f as unknown as jest.Mock<ReturnType<T>>
}
