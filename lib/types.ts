export interface Employee {
    id: number
    employee_id: string
    full_name: string
    email: string
    department: string
    created_at: string
}

export interface Attendance {
    id: number
    employee_id: string
    date: string
    status: 'Present' | 'Absent'
    created_at?: string
}

export interface CreateEmployeeInput {
    full_name: string
    email: string
    department: string
}

export interface CreateAttendanceInput {
    employee_id: string
    date: string
    status: 'Present' | 'Absent'
}

export interface ApiError {
    error: string
}

export interface ApiResponse<T> {
    data?: T
    error?: string
}
