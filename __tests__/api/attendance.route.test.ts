/** @jest-environment node */

import { GET, POST } from '@/app/api/attendance/route'
import { initSupabase } from '@/lib/supabase'

jest.mock('@/lib/supabase', () => ({
  initSupabase: jest.fn(),
}))

const mockedInitSupabase = initSupabase as jest.Mock

describe('attendance route', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('returns attendance records for GET', async () => {
    const order = jest.fn().mockResolvedValue({ data: [{ employee_id: 'EMP-1' }], error: null })
    const select = jest.fn(() => ({ order }))
    const from = jest.fn(() => ({ select }))

    mockedInitSupabase.mockReturnValue({ from })

    const request = new Request('http://localhost/api/attendance')
    const response = await GET(request)
    const body = await response.json()

    expect(response.status).toBe(200)
    expect(body).toEqual([{ employee_id: 'EMP-1' }])
  })

  it('filters by employee_id for GET', async () => {
    const query: {
      order: jest.Mock
      eq: jest.Mock
    } = {
      order: jest.fn(),
      eq: jest.fn(),
    }
    query.order.mockReturnValue(query)
    query.eq.mockResolvedValue({ data: [{ employee_id: 'EMP-2' }], error: null })
    const from = jest.fn(() => ({
      select: jest.fn(() => query),
    }))

    mockedInitSupabase.mockReturnValue({ from })

    const request = new Request('http://localhost/api/attendance?employee_id=EMP-2')
    const response = await GET(request)
    const body = await response.json()

    expect(response.status).toBe(200)
    expect(body).toEqual([{ employee_id: 'EMP-2' }])
    expect(query.eq).toHaveBeenCalledWith('employee_id', 'EMP-2')
  })

  it('validates payload on POST', async () => {
    mockedInitSupabase.mockReturnValue({ from: jest.fn() })

    const request = new Request('http://localhost/api/attendance', {
      method: 'POST',
      body: JSON.stringify({ employee_id: '', date: '', status: 'Present' }),
    })

    const response = await POST(request)
    const body = await response.json()

    expect(response.status).toBe(400)
    expect(body.error).toContain('Employee ID is required')
  })

  it('creates attendance record on valid POST', async () => {
    const single = jest.fn().mockResolvedValue({
      data: { employee_id: 'EMP-1', status: 'Present' },
      error: null,
    })
    const select = jest.fn(() => ({ single }))
    const upsert = jest.fn(() => ({ select }))
    const from = jest.fn(() => ({ upsert }))

    mockedInitSupabase.mockReturnValue({ from })

    const request = new Request('http://localhost/api/attendance', {
      method: 'POST',
      body: JSON.stringify({ employee_id: 'EMP-1', date: '2026-03-15', status: 'Present' }),
    })

    const response = await POST(request)
    const body = await response.json()

    expect(response.status).toBe(201)
    expect(body.employee_id).toBe('EMP-1')
  })
})
