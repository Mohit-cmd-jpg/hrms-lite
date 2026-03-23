import { z } from 'zod'

export function generateEmployeeId(now = Date.now(), randomSeed = Math.random()): string {
  const timestamp = now.toString(36).toUpperCase()
  const random = randomSeed.toString(36).slice(2, 6).toUpperCase().padEnd(4, '0')

  return `EMP-${timestamp.slice(-4)}${random}`
}

export function formatZodError(error: z.ZodError): string {
  return error.issues.map((issue) => issue.message).join(', ')
}

export function getErrorMessage(error: unknown, fallback: string): string {
  return error instanceof Error ? error.message : fallback
}
