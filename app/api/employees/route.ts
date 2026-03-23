import { NextResponse } from 'next/server'
import { z } from 'zod'

import { formatZodError, generateEmployeeId, getErrorMessage } from '@/lib/apiUtils'
import { initSupabase } from '@/lib/supabase'

const createEmployeeSchema = z.object({
  full_name: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email format'),
  department: z.string().min(1, 'Department is required'),
})

export async function GET() {
  try {
    const client = initSupabase()
    if (!client) {
      return NextResponse.json(
        { error: 'Supabase not configured. Check environment variables.' },
        { status: 500 },
      )
    }

    const { data, error } = await client
      .from('employees')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error, 'Failed to fetch employees') },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    const client = initSupabase()
    if (!client) {
      return NextResponse.json(
        { error: 'Supabase not configured. Check environment variables.' },
        { status: 500 },
      )
    }

    const body = await request.json()
    const result = createEmployeeSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json({ error: formatZodError(result.error) }, { status: 400 })
    }

    const { full_name, email, department } = result.data

    const employee_id = generateEmployeeId()

    const { data, error } = await client
      .from('employees')
      .insert([{ employee_id, full_name, email, department }])
      .select()
      .single()

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ error: 'Please try again' }, { status: 409 })
      }
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error, 'Failed to create employee') },
      { status: 500 },
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const client = initSupabase()
    if (!client) {
      return NextResponse.json(
        { error: 'Supabase not configured. Check environment variables.' },
        { status: 500 },
      )
    }

    const { searchParams } = new URL(request.url)
    const employee_id = searchParams.get('employee_id')

    if (!employee_id) {
      return NextResponse.json({ error: 'employee_id is required' }, { status: 400 })
    }

    const { error } = await client.from('employees').delete().eq('employee_id', employee_id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ message: 'Employee deleted successfully' })
  } catch (error) {
    return NextResponse.json(
      { error: getErrorMessage(error, 'Failed to delete employee') },
      { status: 500 },
    )
  }
}
