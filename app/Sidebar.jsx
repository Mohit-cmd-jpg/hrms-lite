// Sidebar Component - Global navigation for all pages
// Why: Provides consistent navigation across the app with active tab highlighting
'use client'

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

    // Check if current path matches nav item (handles nested routes like /employees/[id])
    const isActive = (href) => {
        if (href === '/') return pathname === '/'
        return pathname.startsWith(href)
    }

    return (
        <aside className="w-56 bg-white border-r border-gray-200 min-h-screen flex-shrink-0">
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
                                className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    isActive(item.href)
                                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                            >
                                <span>{item.icon}</span>
                                <span>{item.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    )
}
