import { randomIntFromInterval } from '@server/infrastructure/utils/math'

describe('randomIntFromInterval', () => {
  it('should return a random number between min and max', () => {
    const min = 1
    const max = 10
    const result = randomIntFromInterval(min, max)
    expect(result).toBeGreaterThanOrEqual(min)
    expect(result).toBeLessThanOrEqual(max)
  })
})
