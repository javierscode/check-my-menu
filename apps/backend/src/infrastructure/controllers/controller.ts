export interface Controller {
  run(req: unknown, res: unknown, next: unknown): unknown
}
