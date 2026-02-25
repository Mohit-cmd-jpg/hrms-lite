'use client'

import { useState, useCallback } from 'react'
import type { Attendance, Employee, CreateAttendanceInput, ApiError } from '@/lib/types'

interface UseAttendanceReturn {
    attendance: Attendance[]
    employees: Employee[]
    loading: boolean
    error: string | null
    fetchAttendance: (employeeId?: string) => Promise<void>
    fetchEmployees: () => Promise<void>
    markAttendance: (data: CreateAttendanceInput) => Promise<Attendance | null>
}

export function useAttendance(): UseAttendanceReturn {
    const [attendance, setAttendance] = useState<Attendance[]>([])
    const [employees, setEmployees] = useState<Employee[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchEmployees = useCallback(async () => {
        try {
            const res = await fetch('/api/employees')
            const data = await res.json()
            if (res.ok) {
                setEmployees(data)
            }
        } catch (err) {
            console.error('Failed to fetch employees:', err)
        }
    }, [])

    const fetchAttendance = useCallback(async (employeeId?: string) => {
        try {
            setLoading(true)
            setError(null)

            let url = '/api/attendance'
            if (employeeId) {
                url += `?employee_id=${employeeId}`
            }

            const res = await fetch(url)
            const data = await res.json()

            if (!res.ok) {
                throw new Error((data as ApiError).error || 'Failed to fetch attendance')
            }

            setAttendance(data)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch attendance')
        } finally {
            setLoading(false)
        }
    }, [])

    const markAttendance = useCallback(async (data: CreateAttendanceInput): Promise<Attendance | null> => {
        const res = await fetch('/api/attendance', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })

        const result = await res.json()

        if (!res.ok) {
            throw new Error((result as ApiError).error || 'Failed to mark attendance')
        }

        return result as Attendance
    }, [])

    return { attendance, employees, loading, error, fetchAttendance, fetchEmployees, markAttendance }
}
