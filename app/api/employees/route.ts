import { supabase, initSupabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const createEmployeeSchema = z.object({
    full_name: z.string().min(1, 'Full name is required'),
    email: z.string().email('Invalid email format'),
    department: z.string().min(1, 'Department is required')
})

export async function GET() {
    try {
        const client = initSupabase()
        if (!client) {
            return NextResponse.json({ error: 'Supabase not configured. Check environment variables.' }, { status: 500 })
        }

        const { data, error } = await supabase
            .from('employees')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json(data)
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to fetch employees'
        return NextResponse.json({ error: message }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const client = initSupabase()
        if (!client) {
            return NextResponse.json({ error: 'Supabase not configured. Check environment variables.' }, { status: 500 })
        }

        const body = await request.json()
        const result = createEmployeeSchema.safeParse(body)

        if (!result.success) {
            const errors = result.error.issues.map(i => i.message).join(', ')
            return NextResponse.json({ error: errors }, { status: 400 })
        }

        const { full_name, email, department } = result.data

        const timestamp = Date.now().toString(36).toUpperCase()
        const random = Math.random().toString(36).substring(2, 6).toUpperCase()
        const employee_id = `EMP-${timestamp.slice(-4)}${random}`

        const { data, error } = await supabase
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
        const message = error instanceof Error ? error.message : 'Failed to create employee'
        return NextResponse.json({ error: message }, { status: 500 })
    }
}

export async function DELETE(request: Request) {
    try {
        const client = initSupabase()
        if (!client) {
            return NextResponse.json({ error: 'Supabase not configured. Check environment variables.' }, { status: 500 })
        }

        const { searchParams } = new URL(request.url)
        const employee_id = searchParams.get('employee_id')

        if (!employee_id) {
            return NextResponse.json({ error: 'employee_id is required' }, { status: 400 })
        }

        const { error } = await supabase
            .from('employees')
            .delete()
            .eq('employee_id', employee_id)

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json({ message: 'Employee deleted successfully' })
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to delete employee'
        return NextResponse.json({ error: message }, { status: 500 })
    }
}
