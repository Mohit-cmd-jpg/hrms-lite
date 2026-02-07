// Attendance Page - Track daily attendance for employees
// Features: Select employee, pick date, mark present/absent, view records
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function AttendancePage() {
    // State for employees, attendance, and form
    const [employees, setEmployees] = useState([])
    const [attendance, setAttendance] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [formError, setFormError] = useState(null)
    const [submitting, setSubmitting] = useState(false)

    // Filter state - which employee's attendance to view
    const [filterEmployee, setFilterEmployee] = useState('')

    // Form state for marking attendance
    const [formData, setFormData] = useState({
        employee_id: '',
        date: new Date().toISOString().split('T')[0], // Today's date
        status: 'Present'
    })

    // Fetch employees and attendance on page load
    useEffect(() => {
        fetchEmployees()
        fetchAttendance()
    }, [])

    // Refetch attendance when filter changes
    useEffect(() => {
        fetchAttendance()
    }, [filterEmployee])

    const fetchEmployees = async () => {
        try {
            const res = await fetch('/api/employees')
            const data = await res.json()
            if (res.ok) {
                setEmployees(data)
            }
        } catch (err) {
            console.error('Failed to fetch employees:', err)
        }
    }

    const fetchAttendance = async () => {
        try {
            setLoading(true)
            setError(null)

            // Build URL with optional filter
            let url = '/api/attendance'
            if (filterEmployee) {
                url += `?employee_id=${filterEmployee}`
            }

            const res = await fetch(url)
            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.error || 'Failed to fetch attendance')
            }

            setAttendance(data)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    // Handle form input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormError(null)
        setSubmitting(true)

        try {
            const res = await fetch('/api/attendance', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.error || 'Failed to mark attendance')
            }

            // Reset form and refresh list
            setFormData({
                employee_id: '',
                date: new Date().toISOString().split('T')[0],
                status: 'Present'
            })
            fetchAttendance()
        } catch (err) {
            setFormError(err.message)
        } finally {
            setSubmitting(false)
        }
    }

    // Get employee name by ID for display
    const getEmployeeName = (employee_id) => {
        const emp = employees.find((e) => e.employee_id === employee_id)
        return emp ? emp.full_name : employee_id
    }

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-4xl mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Attendance</h1>
                            <p className="text-gray-600 mt-1">Track daily attendance</p>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Mark Attendance Form */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Mark Attendance</h2>

                    {employees.length === 0 ? (
                        <p className="text-gray-500">
                            No employees found. <Link href="/employees" className="text-blue-600 hover:underline">Add employees first</Link>.
                        </p>
                    ) : (
                        <>
                            {formError && (
                                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">
                                    {formError}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="grid md:grid-cols-4 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Employee
                                    </label>
                                    <select
                                        name="employee_id"
                                        value={formData.employee_id}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Select Employee</option>
                                        {employees.map((emp) => (
                                            <option key={emp.id} value={emp.employee_id}>
                                                {emp.full_name} ({emp.employee_id})
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Date
                                    </label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Status
                                    </label>
                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="Present">Present</option>
                                        <option value="Absent">Absent</option>
                                    </select>
                                </div>

                                <div className="flex items-end">
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="w-full px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
                                    >
                                        {submitting ? 'Saving...' : 'Mark Attendance'}
                                    </button>
                                </div>
                            </form>
                        </>
                    )}
                </div>

                {/* Attendance Records */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="px-6 py-4 border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <h2 className="text-lg font-semibold text-gray-800">Attendance Records</h2>

                        {/* Filter by Employee */}
                        <div className="flex items-center gap-2">
                            <label className="text-sm text-gray-600">Filter by:</label>
                            <select
                                value={filterEmployee}
                                onChange={(e) => setFilterEmployee(e.target.value)}
                                className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">All Employees</option>
                                {employees.map((emp) => (
                                    <option key={emp.id} value={emp.employee_id}>
                                        {emp.full_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Loading State */}
                    {loading && (
                        <div className="p-8 text-center text-gray-500">
                            Loading attendance records...
                        </div>
                    )}

                    {/* Error State */}
                    {error && !loading && (
                        <div className="p-8 text-center">
                            <p className="text-red-600 mb-4">{error}</p>
                            <button
                                onClick={fetchAttendance}
                                className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                            >
                                Try Again
                            </button>
                        </div>
                    )}

                    {/* Empty State */}
                    {!loading && !error && attendance.length === 0 && (
                        <div className="p-8 text-center text-gray-500">
                            No attendance records found.
                        </div>
                    )}

                    {/* Table */}
                    {!loading && !error && attendance.length > 0 && (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Employee
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Date
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {attendance.map((record) => (
                                        <tr key={record.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                {getEmployeeName(record.employee_id)}
                                                <span className="text-gray-500 ml-2">({record.employee_id})</span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900">
                                                {new Date(record.date).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                <span
                                                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${record.status === 'Present'
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-red-100 text-red-800'
                                                        }`}
                                                >
                                                    {record.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </main>
    )
}
