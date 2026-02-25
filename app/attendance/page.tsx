'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAttendance } from '@/lib/useAttendance'
import { useToast } from '@/components/Toast'
import { Input, Select, Button, Card, Loading, ErrorDisplay, EmptyState } from '@/components/ui'

export default function AttendancePage() {
    const { attendance, employees, loading, error, fetchAttendance, fetchEmployees, markAttendance } = useAttendance()
    const { showToast } = useToast()
    const [formLoading, setFormLoading] = useState(false)
    const [formError, setFormError] = useState<string | null>(null)
    const [filterEmployee, setFilterEmployee] = useState('')
    const [formData, setFormData] = useState({
        employee_id: '',
        date: new Date().toISOString().split('T')[0],
        status: 'Present'
    })

    useEffect(() => {
        fetchEmployees()
        fetchAttendance()
    }, [fetchEmployees, fetchAttendance])

    useEffect(() => {
        fetchAttendance(filterEmployee || undefined)
    }, [filterEmployee, fetchAttendance])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setFormError(null)
        setFormLoading(true)

        try {
            await markAttendance({
                employee_id: formData.employee_id,
                date: formData.date,
                status: formData.status as 'Present' | 'Absent'
            })
            setFormData({ employee_id: '', date: new Date().toISOString().split('T')[0], status: 'Present' })
            fetchAttendance(filterEmployee || undefined)
            showToast('Attendance marked successfully', 'success')
        } catch (err) {
            const msg = err instanceof Error ? err.message : 'Failed to mark attendance'
            setFormError(msg)
            showToast(msg, 'error')
        } finally {
            setFormLoading(false)
        }
    }

    const getEmployeeName = (employee_id: string) => {
        const emp = employees.find(e => e.employee_id === employee_id)
        return emp ? emp.full_name : employee_id
    }

    const employeeOptions = [
        { value: '', label: 'Select Employee' },
        ...employees.map(emp => ({ value: emp.employee_id, label: emp.full_name }))
    ]

    const statusOptions = [
        { value: 'Present', label: 'Present' },
        { value: 'Absent', label: 'Absent' }
    ]

    const filterOptions = [
        { value: '', label: 'All Employees' },
        ...employees.map(emp => ({ value: emp.employee_id, label: emp.full_name }))
    ]

    return (
        <main className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm">
                <div className="max-w-4xl mx-auto px-4 py-4 lg:py-6">
                    <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Attendance</h1>
                    <p className="text-sm lg:text-base text-gray-600 mt-1">Track daily attendance</p>
                </div>
            </header>

            <div className="max-w-4xl mx-auto px-4 py-4 lg:py-8">
                <Card className="p-4 lg:p-6 mb-6 lg:mb-8">
                    <h2 className="text-base lg:text-lg font-semibold text-gray-800 mb-4">Mark Attendance</h2>

                    {employees.length === 0 ? (
                        <p className="text-gray-500 text-sm">
                            No employees found. <Link href="/employees" className="text-blue-600 hover:underline">Add employees first</Link>.
                        </p>
                    ) : (
                        <>
                            {formError && (
                                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded text-sm">
                                    {formError}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    <Select
                                        label="Employee"
                                        name="employee_id"
                                        value={formData.employee_id}
                                        onChange={handleChange}
                                        options={employeeOptions}
                                        required
                                    />
                                    <Input
                                        label="Date"
                                        name="date"
                                        type="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                        required
                                    />
                                    <Select
                                        label="Status"
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                        options={statusOptions}
                                        required
                                    />
                                    <div className="flex items-end">
                                        <Button type="submit" disabled={formLoading} className="w-full">
                                            {formLoading ? 'Saving...' : 'Mark'}
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </>
                    )}
                </Card>

                <Card>
                    <div className="px-4 lg:px-6 py-4 border-b border-gray-200">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                            <h2 className="text-base lg:text-lg font-semibold text-gray-800">Attendance Records</h2>
                            <div className="flex items-center gap-2">
                                <label className="text-sm text-gray-600">Filter:</label>
                                <Select
                                    value={filterEmployee}
                                    onChange={(e) => setFilterEmployee(e.target.value)}
                                    options={filterOptions}
                                />
                            </div>
                        </div>
                    </div>

                    {loading && <Loading message="Loading attendance records..." />}

                    {error && !loading && <ErrorDisplay message={error} onRetry={() => fetchAttendance(filterEmployee || undefined)} />}

                    {!loading && !error && attendance.length === 0 && (
                        <EmptyState message="No attendance records found." />
                    )}

                    {!loading && !error && attendance.length > 0 && (
                        <>
                            <div className="lg:hidden divide-y divide-gray-200">
                                {attendance.map((record) => (
                                    <div key={record.id} className="p-4 flex justify-between items-center">
                                        <div>
                                            <p className="font-medium text-gray-900">{getEmployeeName(record.employee_id)}</p>
                                            <p className="text-sm text-gray-500">
                                                {new Date(record.date).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                            record.status === 'Present' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                        }`}>
                                            {record.status}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="hidden lg:block overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
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
                                                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                                        record.status === 'Present' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                    }`}>
                                                        {record.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}
                </Card>
            </div>
        </main>
    )
}
