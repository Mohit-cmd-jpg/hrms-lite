// Home Page - Main landing page with navigation
// Simple page that links to Employees and Attendance management
import Link from 'next/link'

export default function Home() {
    return (
        <main className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-4xl mx-auto px-4 py-6">
                    <h1 className="text-2xl font-bold text-gray-900">HRMS Lite</h1>
                    <p className="text-gray-600 mt-1">Simple HR Management System</p>
                </div>
            </header>

            {/* Navigation Cards */}
            <div className="max-w-4xl mx-auto px-4 py-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>

                <div className="grid md:grid-cols-2 gap-4">
                    {/* Employees Card */}
                    <Link href="/employees" className="block">
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all">
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                👥 Employees
                            </h3>
                            <p className="text-gray-600">
                                Add, view, and manage employee records
                            </p>
                        </div>
                    </Link>

                    {/* Attendance Card */}
                    <Link href="/attendance" className="block">
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all">
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                📅 Attendance
                            </h3>
                            <p className="text-gray-600">
                                Mark and track daily attendance
                            </p>
                        </div>
                    </Link>
                </div>

                {/* Info Section */}
                <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <h3 className="font-medium text-blue-900 mb-2">About This System</h3>
                    <p className="text-blue-800 text-sm">
                        HRMS Lite is a minimal human resource management system designed for
                        small teams. It provides essential features for employee management
                        and attendance tracking without unnecessary complexity.
                    </p>
                </div>
            </div>
        </main>
    )
}
