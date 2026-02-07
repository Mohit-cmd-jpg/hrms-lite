// Attendance API Route - Handles attendance tracking
// Endpoints: GET (list attendance), POST (mark attendance)
import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

// GET - Fetch attendance records, optionally filtered by employee_id
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url)
        const employee_id = searchParams.get('employee_id')

        let query = supabase
            .from('attendance')
            .select('*')
            .order('date', { ascending: false })

        // Filter by employee if specified
        if (employee_id) {
            query = query.eq('employee_id', employee_id)
        }

        const { data, error } = await query

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json(data)
    } catch (err) {
        return NextResponse.json({ error: 'Failed to fetch attendance' }, { status: 500 })
    }
}

// POST - Mark attendance for an employee
export async function POST(request) {
    try {
        const body = await request.json()
        const { employee_id, date, status } = body

        // Validate required fields
        if (!employee_id || !date || !status) {
            return NextResponse.json(
                { error: 'All fields are required: employee_id, date, status' },
                { status: 400 }
            )
        }

        // Validate status value
        if (status !== 'Present' && status !== 'Absent') {
            return NextResponse.json(
                { error: 'Status must be either "Present" or "Absent"' },
                { status: 400 }
            )
        }

        // Use upsert to handle both new records and updates for same employee+date
        // Why upsert: If attendance for that date exists, update it; otherwise, create new
        const { data, error } = await supabase
            .from('attendance')
            .upsert(
                [{ employee_id, date, status }],
                { onConflict: 'employee_id,date' }
            )
            .select()
            .single()

        if (error) {
            // Check for foreign key violation (employee doesn't exist)
            if (error.code === '23503') {
                return NextResponse.json({ error: 'Employee not found' }, { status: 404 })
            }
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json(data, { status: 201 })
    } catch (err) {
        return NextResponse.json({ error: 'Failed to mark attendance' }, { status: 500 })
    }
}
