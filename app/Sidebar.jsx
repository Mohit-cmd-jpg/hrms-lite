// Sidebar Component - Global navigation for all pages
// Why: Provides consistent navigation across the app with active tab highlighting
// Mobile: Shows hamburger menu, sidebar slides in from left
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// Navigation items - kept simple, no nested menus
const navItems = [
    { href: '/', label: 'Dashboard', icon: '📊' },
    { href: '/employees', label: 'Employees', icon: '👥' },
    { href: '/attendance', label: 'Attendance', icon: '📅' },
]

export default function Sidebar() {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)

    // Check if current path matches nav item (handles nested routes like /employees/[id])
    const isActive = (href) => {
        if (href === '/') return pathname === '/'
        return pathname.startsWith(href)
    }

    // Close sidebar when navigating on mobile
    const handleNavClick = () => {
        setIsOpen(false)
    }

    return (
        <>
            {/* Mobile Header with Hamburger */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 rounded-md hover:bg-gray-100"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? (
                            <span className="text-xl">✕</span>
                        ) : (
                            <span className="text-xl">☰</span>
                        )}
                    </button>
                    <h1 className="text-lg font-bold text-gray-900">HRMS Lite</h1>
                </div>
            </div>

            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed lg:static inset-y-0 left-0 z-50
                    w-64 bg-white border-r border-gray-200 min-h-screen flex-shrink-0
                    transform transition-transform duration-200 ease-in-out
                    ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                `}
            >
                {/* Logo/Brand */}
                <div className="px-4 py-6 border-b border-gray-200">
                    <h1 className="text-xl font-bold text-gray-900">HRMS Lite</h1>
                    <p className="text-xs text-gray-500 mt-1">HR Management System</p>
                </div>

                {/* Navigation Links */}
                <nav className="p-4">
                    <ul className="space-y-2">
                        {navItems.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    onClick={handleNavClick}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive(item.href)
                                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                        }`}
                                >
                                    <span className="text-lg">{item.icon}</span>
                                    <span>{item.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>

            {/* Spacer for mobile header */}
            <div className="lg:hidden h-14" />
        </>
    )
}
