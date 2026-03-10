import { supabase, initSupabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const createAttendanceSchema = z.object({
    employee_id: z.string().min(1, 'Employee ID is required'),
    date: z.string().min(1, 'Date is required'),
    status: z.enum(['Present', 'Absent'])
})

export async function GET(request: Request) {
    try {
        const client = initSupabase()
        if (!client) {
            return NextResponse.json({ error: 'Supabase not configured. Check environment variables.' }, { status: 500 })
        }

        const { searchParams } = new URL(request.url)
        const employee_id = searchParams.get('employee_id')

        let query = supabase
            .from('attendance')
            .select('*')
            .order('date', { ascending: false })

        if (employee_id) {
            query = query.eq('employee_id', employee_id)
        }

        const { data, error } = await query

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json(data)
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to fetch attendance'
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
        const result = createAttendanceSchema.safeParse(body)

        if (!result.success) {
            const errors = result.error.issues.map(i => i.message).join(', ')
            return NextResponse.json({ error: errors }, { status: 400 })
        }

        const { employee_id, date, status } = result.data

        const { data, error } = await supabase
            .from('attendance')
            .upsert([{ employee_id, date, status }], { onConflict: 'employee_id,date' })
            .select()
            .single()

        if (error) {
            if (error.code === '23503') {
                return NextResponse.json({ error: 'Employee not found' }, { status: 404 })
            }
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json(data, { status: 201 })
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to mark attendance'
        return NextResponse.json({ error: message }, { status: 500 })
    }
}
