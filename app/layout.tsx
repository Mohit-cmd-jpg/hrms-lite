import './globals.css'
import Sidebar from './Sidebar'
import { ToastProvider } from '@/components/Toast'

export const metadata = {
    title: 'HRMS Lite',
    description: 'Simple HR Management System',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="flex min-h-screen" suppressHydrationWarning>
                <ToastProvider>
                    <Sidebar />
                    <div className="flex-1 w-full lg:w-auto">
                        {children}
                    </div>
                </ToastProvider>
            </body>
        </html>
    )
}
