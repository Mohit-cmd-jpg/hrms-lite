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
        const { employee_id, full_name, email, department } = body

        // Validate required fields
        if (!employee_id || !full_name || !email || !department) {
            return NextResponse.json(
                { error: 'All fields are required: employee_id, full_name, email, department' },
                { status: 400 }
            )
        }

        // Validate email format using simple regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
        }

        // Insert the employee (Supabase will handle unique constraint for employee_id)
        const { data, error } = await supabase
            .from('employees')
            .insert([{ employee_id, full_name, email, department }])
            .select()
            .single()

        if (error) {
            // Check if it's a duplicate employee_id error
            if (error.code === '23505') {
                return NextResponse.json({ error: 'Employee ID already exists' }, { status: 409 })
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
