// Dashboard Page - Main landing page with KPI cards
// Why: Dashboard focuses on TODAY's data only to keep it simple and interview-explainable
// KPIs are calculated client-side to avoid complex SQL and keep backend logic minimal
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Dashboard() {
    // State for dashboard data
    const [employees, setEmployees] = useState([])
    const [attendance, setAttendance] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Store today's date in state to avoid hydration mismatch
    // Why: Date.now() differs between server and client, causing React hydration errors
    const [today, setToday] = useState('')
    const [displayDate, setDisplayDate] = useState('')

    // Set today's date on client-side only to avoid hydration mismatch
    useEffect(() => {
        const now = new Date()
        setToday(now.toISOString().split('T')[0])
        setDisplayDate(now.toLocaleDateString())
    }, [])

    // Fetch data after today is set
    useEffect(() => {
        if (today) {
            fetchDashboardData()
        }
    }, [today])

    const fetchDashboardData = async () => {
        try {
            setLoading(true)
            setError(null)

            // Fetch employees and attendance in parallel using existing APIs
            const [empRes, attRes] = await Promise.all([
                fetch('/api/employees'),
                fetch('/api/attendance')
            ])

            const empData = await empRes.json()
            const attData = await attRes.json()

            if (!empRes.ok) throw new Error(empData.error || 'Failed to fetch employees')
            if (!attRes.ok) throw new Error(attData.error || 'Failed to fetch attendance')

            setEmployees(empData)
            setAttendance(attData)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    // Calculate KPIs - simple client-side filtering
    // Why client-side: Avoids adding new API endpoints, keeps it simple for interviews
    const totalEmployees = employees.length

    // Filter today's attendance records
    const todayAttendance = attendance.filter(record => record.date === today)
    const todayPresent = todayAttendance.filter(record => record.status === 'Present').length
    const todayAbsent = todayAttendance.filter(record => record.status === 'Absent').length

    // Calculate attendance rate (avoid division by zero)
    const attendanceRate = totalEmployees > 0
        ? Math.round((todayPresent / totalEmployees) * 100)
        : 0

    // KPI card configuration for easy rendering
    const kpiCards = [
        { label: 'Total Employees', value: totalEmployees, color: 'blue', icon: '👥' },
        { label: 'Today Present', value: todayPresent, color: 'green', icon: '✓' },
        { label: 'Today Absent', value: todayAbsent, color: 'red', icon: '✗' },
        { label: 'Attendance Rate', value: `${attendanceRate}%`, color: 'purple', icon: '📊' },
    ]

    // Color mapping for KPI cards
    const colorClasses = {
        blue: 'bg-blue-50 border-blue-200 text-blue-700',
        green: 'bg-green-50 border-green-200 text-green-700',
        red: 'bg-red-50 border-red-200 text-red-700',
        purple: 'bg-purple-50 border-purple-200 text-purple-700',
    }

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-4xl mx-auto px-4 py-6">
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-600 mt-1">
                        Today&apos;s Overview {displayDate ? `- ${displayDate}` : ''}
                    </p>
                </div>
            </header>

            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Loading State */}
                {loading && (
                    <div className="text-center text-gray-500 py-8">
                        Loading dashboard...
                    </div>
                )}

                {/* Error State */}
                {error && !loading && (
                    <div className="text-center py-8">
                        <p className="text-red-600 mb-4">{error}</p>
                        <button
                            onClick={fetchDashboardData}
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {/* Dashboard Content */}
                {!loading && !error && (
                    <>
                        {/* KPI Cards */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                            {kpiCards.map((kpi) => (
                                <div
                                    key={kpi.label}
                                    className={`p-4 rounded-lg border ${colorClasses[kpi.color]}`}
                                >
                                    <div className="text-2xl mb-1">{kpi.icon}</div>
                                    <div className="text-2xl font-bold">{kpi.value}</div>
                                    <div className="text-sm opacity-80">{kpi.label}</div>
                                </div>
                            ))}
                        </div>

                        {/* Quick Actions */}
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            {/* Add Employee */}
                            <Link href="/employees" className="block">
                                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        ➕ Add Employee
                                    </h3>
                                    <p className="text-gray-600">
                                        Add new employees to the system
                                    </p>
                                </div>
                            </Link>

                            {/* Mark Attendance */}
                            <Link href="/attendance" className="block">
                                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        🕒 Mark Attendance
                                    </h3>
                                    <p className="text-gray-600">
                                        Record daily attendance for employees
                                    </p>
                                </div>
                            </Link>
                        </div>

                        {/* Info Section */}
                        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
                            <h3 className="font-medium text-blue-900 mb-2">About This Dashboard</h3>
                            <p className="text-blue-800 text-sm">
                                This dashboard shows today&apos;s attendance data only.
                                KPIs are calculated in real-time from your employee and attendance records.
                                For historical data, check individual employee records.
                            </p>
                        </div>
                    </>
                )}
            </div>
        </main>
    )
}
