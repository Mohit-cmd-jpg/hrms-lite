'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

import { useToast } from '@/components/Toast'
import { Input, Select, Button, Card, Loading, ErrorDisplay, EmptyState } from '@/components/ui'
import { useEmployees } from '@/lib/useEmployees'

const DEFAULT_DEPARTMENTS = ['Engineering', 'HR', 'Sales', 'Marketing', 'Operations']

export default function EmployeesPage() {
  const { employees, loading, error, fetchEmployees, addEmployee, deleteEmployee } = useEmployees()
  const { showToast } = useToast()
  const [formLoading, setFormLoading] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    department: '',
    customDepartment: '',
  })
  const [useCustomDept, setUseCustomDept] = useState(false)

  useEffect(() => {
    fetchEmployees()
  }, [fetchEmployees])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)
    setFormLoading(true)

    const department =
      useCustomDept && formData.customDepartment.trim()
        ? formData.customDepartment.trim()
        : formData.department

    if (!department) {
      setFormError('Please select or enter a department')
      setFormLoading(false)
      return
    }

    try {
      await addEmployee({ full_name: formData.full_name, email: formData.email, department })
      setFormData({ full_name: '', email: '', department: '', customDepartment: '' })
      setUseCustomDept(false)
      fetchEmployees()
      showToast('Employee added successfully', 'success')
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to add employee'
      setFormError(msg)
      showToast(msg, 'error')
    } finally {
      setFormLoading(false)
    }
  }

  const handleDelete = async (employee_id: string) => {
    if (!confirm('Are you sure you want to delete this employee?')) return

    try {
      await deleteEmployee(employee_id)
      fetchEmployees()
      showToast('Employee deleted successfully', 'success')
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to delete employee'
      showToast(msg, 'error')
    }
  }

  const departmentOptions = [
    { value: '', label: 'Select Department' },
    ...DEFAULT_DEPARTMENTS.map((d) => ({ value: d, label: d })),
  ]

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 lg:py-6">
          <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Employees</h1>
          <p className="text-sm lg:text-base text-gray-600 mt-1">Manage employee records</p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-4 lg:py-8">
        <Card className="p-4 lg:p-6 mb-6 lg:mb-8">
          <h2 className="text-base lg:text-lg font-semibold text-gray-800 mb-4">
            Add New Employee
          </h2>

          {formError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded text-sm">
              {formError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                required
                placeholder="Enter full name"
              />
              <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="name@gmail.com"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                options={departmentOptions}
                disabled={useCustomDept}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Or Add Custom
                </label>
                <div className="flex gap-2">
                  <Input
                    name="customDepartment"
                    value={formData.customDepartment}
                    onChange={(e) => {
                      handleChange(e)
                      if (e.target.value.trim()) setUseCustomDept(true)
                    }}
                    onFocus={() => setUseCustomDept(true)}
                    placeholder="Custom department"
                    disabled={!useCustomDept}
                  />
                  {useCustomDept && (
                    <button
                      type="button"
                      onClick={() => {
                        setUseCustomDept(false)
                        setFormData({ ...formData, customDepartment: '' })
                      }}
                      className="px-3 py-2 text-gray-500 hover:text-gray-700"
                    >
                      ✕
                    </button>
                  )}
                </div>
                {useCustomDept && (
                  <p className="text-xs text-blue-600 mt-1">Using custom department</p>
                )}
              </div>
            </div>

            <Button type="submit" disabled={formLoading}>
              {formLoading ? 'Adding...' : 'Add Employee'}
            </Button>
          </form>
        </Card>

        <Card>
          <div className="px-4 lg:px-6 py-4 border-b border-gray-200">
            <h2 className="text-base lg:text-lg font-semibold text-gray-800">All Employees</h2>
          </div>

          {loading && <Loading message="Loading employees..." />}

          {error && !loading && <ErrorDisplay message={error} onRetry={fetchEmployees} />}

          {!loading && !error && employees.length === 0 && (
            <EmptyState message="No employees found. Add your first employee above." />
          )}

          {!loading && !error && employees.length > 0 && (
            <>
              <div className="lg:hidden divide-y divide-gray-200">
                {employees.map((emp) => (
                  <div key={emp.id} className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium text-gray-900">{emp.full_name}</p>
                        <p className="text-xs text-gray-500">{emp.employee_id}</p>
                      </div>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {emp.department}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{emp.email}</p>
                    <div className="flex gap-4">
                      <Link
                        href={`/employees/${emp.employee_id}`}
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        View Details
                      </Link>
                      <button
                        onClick={() => handleDelete(emp.employee_id)}
                        className="text-sm text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Employee ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Full Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Department
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {employees.map((emp) => (
                      <tr key={emp.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-900">{emp.employee_id}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{emp.full_name}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{emp.email}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{emp.department}</td>
                        <td className="px-6 py-4 text-sm space-x-3">
                          <Link
                            href={`/employees/${emp.employee_id}`}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            View
                          </Link>
                          <button
                            onClick={() => handleDelete(emp.employee_id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Delete
                          </button>
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
