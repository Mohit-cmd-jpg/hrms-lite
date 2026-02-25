'use client'

import { useState, useCallback } from 'react'
import type { Employee, CreateEmployeeInput, ApiError } from '@/lib/types'

interface UseEmployeesReturn {
    employees: Employee[]
    loading: boolean
    error: string | null
    fetchEmployees: () => Promise<void>
    addEmployee: (data: CreateEmployeeInput) => Promise<Employee | null>
    deleteEmployee: (employee_id: string) => Promise<boolean>
}

export function useEmployees(): UseEmployeesReturn {
    const [employees, setEmployees] = useState<Employee[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchEmployees = useCallback(async () => {
        try {
            setLoading(true)
            setError(null)
            const res = await fetch('/api/employees')
            const data = await res.json()

            if (!res.ok) {
                throw new Error((data as ApiError).error || 'Failed to fetch employees')
            }

            setEmployees(data)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch employees')
        } finally {
            setLoading(false)
        }
    }, [])

    const addEmployee = useCallback(async (data: CreateEmployeeInput): Promise<Employee | null> => {
        const res = await fetch('/api/employees', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })

        const result = await res.json()

        if (!res.ok) {
            throw new Error((result as ApiError).error || 'Failed to add employee')
        }

        return result as Employee
    }, [])

    const deleteEmployee = useCallback(async (employee_id: string): Promise<boolean> => {
        const res = await fetch(`/api/employees?employee_id=${employee_id}`, {
            method: 'DELETE'
        })

        if (!res.ok) {
            const result = await res.json()
            throw new Error((result as ApiError).error || 'Failed to delete employee')
        }

        return true
    }, [])

    return { employees, loading, error, fetchEmployees, addEmployee, deleteEmployee }
}
