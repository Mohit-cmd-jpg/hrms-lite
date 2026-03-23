import { z } from 'zod'

import { formatZodError, generateEmployeeId, getErrorMessage } from '@/lib/apiUtils'

describe('apiUtils', () => {
  it('generates deterministic employee ID when seeds are provided', () => {
    const id = generateEmployeeId(1700000000000, 0.123456)

    expect(id).toMatch(/^EMP-/)
    expect(id.length).toBeGreaterThanOrEqual(12)
  })

  it('formats zod validation errors into a readable message', () => {
    const schema = z.object({ name: z.string().min(1, 'Name is required') })
    const result = schema.safeParse({ name: '' })

    expect(result.success).toBe(false)
    if (result.success) {
      throw new Error('Expected schema validation to fail')
    }

    expect(formatZodError(result.error)).toContain('Name is required')
  })

  it('returns fallback for unknown errors', () => {
    expect(getErrorMessage('oops', 'fallback')).toBe('fallback')
  })

  it('returns message for Error instances', () => {
    expect(getErrorMessage(new Error('boom'), 'fallback')).toBe('boom')
  })
})
