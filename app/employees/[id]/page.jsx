// Employee Records Page - Detail view for individual employee
// Shows employee info, attendance KPIs, and full attendance history
// KPIs calculated client-side for simplicity - just simple counts, not analytics
'use client'

import { useState, useEffect, use } from 'react'
import Link from 'next/link'

export default function EmployeeRecordsPage({ params }) {
    // Unwrap params promise (Next.js 16+ requirement)
    const { id } = use(params)

    // State for employee and attendance data
    const [employee, setEmployee] = useState(null)
    const [attendance, setAttendance] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Fetch employee and attendance on page load
    useEffect(() => {
        fetchEmployeeData()
    }, [id])

    const fetchEmployeeData = async () => {
        try {
            setLoading(true)
            setError(null)

            // Fetch employees and attendance in parallel using existing APIs
            const [empRes, attRes] = await Promise.all([
                fetch('/api/employees'),
                fetch(`/api/attendance?employee_id=${id}`)
            ])

            const empData = await empRes.json()
            const attData = await attRes.json()

            if (!empRes.ok) throw new Error(empData.error || 'Failed to fetch employees')
            if (!attRes.ok) throw new Error(attData.error || 'Failed to fetch attendance')

            // Find the specific employee by employee_id
            const emp = empData.find(e => e.employee_id === id)
            if (!emp) {
                throw new Error('Employee not found')
            }

            setEmployee(emp)
            setAttendance(attData)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    // Calculate simple KPIs - just counts, not complex analytics
    // Why client-side: Keeps backend simple, no new API endpoints needed
    const totalDaysMarked = attendance.length
    const totalPresent = attendance.filter(r => r.status === 'Present').length
    const totalAbsent = attendance.filter(r => r.status === 'Absent').length

    // KPI card configuration
    const kpiCards = [
        { label: 'Total Days', value: totalDaysMarked, color: 'blue', icon: '📅' },
        { label: 'Present', value: totalPresent, color: 'green', icon: '✓' },
        { label: 'Absent', value: totalAbsent, color: 'red', icon: '✗' },
    ]

    const colorClasses = {
        blue: 'bg-blue-50 border-blue-200 text-blue-700',
        green: 'bg-green-50 border-green-200 text-green-700',
        red: 'bg-red-50 border-red-200 text-red-700',
    }

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-4xl mx-auto px-4 py-4 lg:py-6">
                    <div className="flex items-center justify-between">
                        <div className="min-w-0 flex-1">
                            <h1 className="text-xl lg:text-2xl font-bold text-gray-900 truncate">
                                {loading ? 'Loading...' : employee?.full_name || 'Employee Records'}
                            </h1>
                            <p className="text-sm lg:text-base text-gray-600 mt-1">Employee attendance history</p>
                        </div>
                        <Link
                            href="/employees"
                            className="text-sm lg:text-base text-blue-600 hover:text-blue-800 ml-4 whitespace-nowrap"
                        >
                            ← Back
                        </Link>
                    </div>
                </div>
            </header>

            <div className="max-w-4xl mx-auto px-4 py-4 lg:py-8">
                {/* Loading State */}
                {loading && (
                    <div className="text-center text-gray-500 py-8">
                        Loading employee records...
                    </div>
                )}

                {/* Error State */}
                {error && !loading && (
                    <div className="text-center py-8">
                        <p className="text-red-600 mb-4">{error}</p>
                        <Link
                            href="/employees"
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                        >
                            Back to Employees
                        </Link>
                    </div>
                )}

                {/* Employee Data */}
                {!loading && !error && employee && (
                    <>
                        {/* Employee Info Card */}
                        <div className="bg-white p-4 lg:p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
                            <h2 className="text-base lg:text-lg font-semibold text-gray-800 mb-4">Employee Information</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs lg:text-sm text-gray-500">Employee ID</p>
                                    <p className="text-sm lg:text-base text-gray-900 font-medium">{employee.employee_id}</p>
                                </div>
                                <div>
                                    <p className="text-xs lg:text-sm text-gray-500">Full Name</p>
                                    <p className="text-sm lg:text-base text-gray-900 font-medium">{employee.full_name}</p>
                                </div>
                                <div>
                                    <p className="text-xs lg:text-sm text-gray-500">Email</p>
                                    <p className="text-sm lg:text-base text-gray-900 font-medium break-all">{employee.email}</p>
                                </div>
                                <div>
                                    <p className="text-xs lg:text-sm text-gray-500">Department</p>
                                    <p className="text-sm lg:text-base text-gray-900 font-medium">{employee.department}</p>
                                </div>
                            </div>
                        </div>

                        {/* KPI Cards */}
                        <h2 className="text-base lg:text-lg font-semibold text-gray-800 mb-3 lg:mb-4">Attendance Summary</h2>
                        <div className="grid grid-cols-3 gap-3 lg:gap-4 mb-6">
                            {kpiCards.map((kpi) => (
                                <div
                                    key={kpi.label}
                                    className={`p-3 lg:p-4 rounded-lg border ${colorClasses[kpi.color]}`}
                                >
                                    <div className="text-xl lg:text-2xl mb-1">{kpi.icon}</div>
                                    <div className="text-xl lg:text-2xl font-bold">{kpi.value}</div>
                                    <div className="text-xs lg:text-sm opacity-80">{kpi.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Attendance Table */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                            <div className="px-4 lg:px-6 py-4 border-b border-gray-200">
                                <h2 className="text-base lg:text-lg font-semibold text-gray-800">Attendance History</h2>
                            </div>

                            {attendance.length === 0 ? (
                                <div className="p-8 text-center text-gray-500">
                                    No attendance records found for this employee.
                                </div>
                            ) : (
                                <>
                                    {/* Mobile: Compact list */}
                                    <div className="lg:hidden divide-y divide-gray-200">
                                        {attendance.map((record) => (
                                            <div key={record.id} className="p-4 flex justify-between items-center">
                                                <span className="text-sm text-gray-900">
                                                    {new Date(record.date).toLocaleDateString('en-US', {
                                                        weekday: 'short',
                                                        month: 'short',
                                                        day: 'numeric'
                                                    })}
                                                </span>
                                                <span
                                                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${record.status === 'Present'
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-red-100 text-red-800'
                                                        }`}
                                                >
                                                    {record.status}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Desktop: Table */}
                                    <div className="hidden lg:block overflow-x-auto">
                                        <table className="w-full">
                                            <thead className="bg-gray-50">
                                                <tr>
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
                                                            {new Date(record.date).toLocaleDateString('en-US', {
                                                                weekday: 'short',
                                                                year: 'numeric',
                                                                month: 'short',
                                                                day: 'numeric'
                                                            })}
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
                                </>
                            )}
                        </div>
                    </>
                )}
            </div>
        </main>
    )
}
