// Root Layout - Basic HTML structure for all pages
import './globals.css'

export const metadata = {
    title: 'HRMS Lite',
    description: 'Simple HR Management System',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}
