/** @jest-environment node */

import { DELETE, GET, POST } from '@/app/api/employees/route'
import { initSupabase } from '@/lib/supabase'

jest.mock('@/lib/supabase', () => ({
  initSupabase: jest.fn(),
}))

jest.mock('@/lib/apiUtils', () => {
  const actual = jest.requireActual('@/lib/apiUtils')
  return {
    ...actual,
    generateEmployeeId: jest.fn(() => 'EMP-TEST1234'),
  }
})

const mockedInitSupabase = initSupabase as jest.Mock

describe('employees route', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('returns 500 when supabase is not configured', async () => {
    mockedInitSupabase.mockReturnValue(null)

    const response = await GET()
    const body = await response.json()

    expect(response.status).toBe(500)
    expect(body.error).toContain('Supabase not configured')
  })

  it('returns employees for GET', async () => {
    const order = jest.fn().mockResolvedValue({ data: [{ employee_id: 'EMP-1' }], error: null })
    const select = jest.fn(() => ({ order }))
    const from = jest.fn(() => ({ select }))

    mockedInitSupabase.mockReturnValue({ from })

    const response = await GET()
    const body = await response.json()

    expect(response.status).toBe(200)
    expect(body).toEqual([{ employee_id: 'EMP-1' }])
  })

  it('validates payload on POST', async () => {
    mockedInitSupabase.mockReturnValue({ from: jest.fn() })

    const request = new Request('http://localhost/api/employees', {
      method: 'POST',
      body: JSON.stringify({ full_name: '' }),
    })

    const response = await POST(request)
    const body = await response.json()

    expect(response.status).toBe(400)
    expect(body.error).toContain('Full name is required')
  })

  it('creates employee on valid POST', async () => {
    const single = jest.fn().mockResolvedValue({
      data: { employee_id: 'EMP-TEST1234', full_name: 'Jane Doe' },
      error: null,
    })
    const select = jest.fn(() => ({ single }))
    const insert = jest.fn(() => ({ select }))
    const from = jest.fn(() => ({ insert }))

    mockedInitSupabase.mockReturnValue({ from })

    const request = new Request('http://localhost/api/employees', {
      method: 'POST',
      body: JSON.stringify({
        full_name: 'Jane Doe',
        email: 'jane@example.com',
        department: 'Engineering',
      }),
    })

    const response = await POST(request)
    const body = await response.json()

    expect(response.status).toBe(201)
    expect(body.employee_id).toBe('EMP-TEST1234')
  })

  it('requires employee_id on DELETE', async () => {
    mockedInitSupabase.mockReturnValue({ from: jest.fn() })

    const request = new Request('http://localhost/api/employees', { method: 'DELETE' })
    const response = await DELETE(request)
    const body = await response.json()

    expect(response.status).toBe(400)
    expect(body.error).toContain('employee_id is required')
  })
})
