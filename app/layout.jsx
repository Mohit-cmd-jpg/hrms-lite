// Root Layout - Basic HTML structure for all pages
// Updated: Added global Sidebar for navigation across all pages
import './globals.css'
import Sidebar from './Sidebar'

export const metadata = {
    title: 'HRMS Lite',
    description: 'Simple HR Management System',
}

export default function RootLayout({ children }) {
    return (
        // suppressHydrationWarning: Prevents hydration errors from browser extensions
        // that inject classes into html/body tags (common with font/theme extensions)
        <html lang="en" suppressHydrationWarning>
            <body className="flex min-h-screen" suppressHydrationWarning>
                {/* Global Sidebar - visible on all pages */}
                <Sidebar />
                {/* Main content area */}
                <div className="flex-1">
                    {children}
                </div>
            </body>
        </html>
    )
}
