// Employee API Route - Handles all employee CRUD operations
// Endpoints: GET (list all), POST (create), DELETE (remove)
import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

// GET - Fetch all employees
export async function GET() {
    try {
        const { data, error } = await supabase
            .from('employees')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json(data)
    } catch (err) {
        return NextResponse.json({ error: 'Failed to fetch employees' }, { status: 500 })
    }
}

// POST - Create a new employee
export async function POST(request) {
    try {
        const body = await request.json()
        const { full_name, email, department } = body

        // Validate required fields (employee_id is now auto-generated)
        if (!full_name || !email || !department) {
            return NextResponse.json(
                { error: 'All fields are required: full_name, email, department' },
                { status: 400 }
            )
        }

        // Validate email format using simple regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
        }

        // Auto-generate employee_id in format EMP-XXXX
        const timestamp = Date.now().toString(36).toUpperCase()
        const random = Math.random().toString(36).substring(2, 6).toUpperCase()
        const employee_id = `EMP-${timestamp.slice(-4)}${random}`

        // Insert the employee
        const { data, error } = await supabase
            .from('employees')
            .insert([{ employee_id, full_name, email, department }])
            .select()
            .single()

        if (error) {
            // Check if it's a duplicate employee_id error (retry with new ID)
            if (error.code === '23505') {
                return NextResponse.json({ error: 'Please try again' }, { status: 409 })
            }
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json(data, { status: 201 })
    } catch (err) {
        return NextResponse.json({ error: 'Failed to create employee' }, { status: 500 })
    }
}

// DELETE - Remove an employee by employee_id
export async function DELETE(request) {
    try {
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
    } catch (err) {
        return NextResponse.json({ error: 'Failed to delete employee' }, { status: 500 })
    }
}
