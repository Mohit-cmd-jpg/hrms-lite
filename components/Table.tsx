'use client'

import React from 'react'

interface Column<T> {
  key: string
  header: string
  render?: (item: T) => React.ReactNode
}

interface TableProps<T> {
  data: T[]
  columns: Column<T>[]
  keyField: keyof T
  actions?: (item: T) => React.ReactNode
}

export function Table<T extends Record<string, unknown>>({
  data,
  columns,
  keyField,
  actions,
}: TableProps<T>) {
  return (
    <div className="hidden lg:block overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
              >
                {col.header}
              </th>
            ))}
            {actions && (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((item) => (
            <tr key={String(item[keyField])} className="hover:bg-gray-50">
              {columns.map((col) => (
                <td key={col.key} className="px-6 py-4 text-sm text-gray-900">
                  {col.render ? col.render(item) : String(item[col.key] ?? '')}
                </td>
              ))}
              {actions && <td className="px-6 py-4 text-sm space-x-3">{actions(item)}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

interface CardListProps<T> {
  data: T[]
  keyField: keyof T
  renderCard: (item: T) => React.ReactNode
}

export function CardList<T>({ data, keyField, renderCard }: CardListProps<T>) {
  return (
    <div className="lg:hidden divide-y divide-gray-200">
      {data.map((item) => (
        <div key={String(item[keyField])} className="p-4">
          {renderCard(item)}
        </div>
      ))}
    </div>
  )
}

interface PageHeaderProps {
  title: string
  description?: string
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-4 lg:py-6">
        <h1 className="text-xl lg:text-2xl font-bold text-gray-900">{title}</h1>
        {description && <p className="text-sm lg:text-base text-gray-600 mt-1">{description}</p>}
      </div>
    </header>
  )
}
