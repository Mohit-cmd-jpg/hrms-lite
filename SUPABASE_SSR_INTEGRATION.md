# Supabase SSR Integration Guide

This guide shows how to integrate the new Supabase SSR (Server-Side Rendering) pattern into your HRMS application.

## ✅ What's Been Set Up

### 1. **Environment Variables**

Updated `.env.local` with the new Supabase credentials:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` (new format)

### 2. **Supabase Client Utilities**

#### Server Client (`utils/supabase/server.ts`)

Use in Server Components and Server Actions:

```typescript
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function MyPage() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data } = await supabase.from('employees').select()

  return <div>{/* use data */}</div>
}
```

#### Client Client (`utils/supabase/client.ts`)

Use in Client Components:

```typescript
'use client'
import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'

export default function MyComponent() {
  const supabase = createClient()
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from('employees').select()
      setData(data)
    }
    fetchData()
  }, [supabase])

  return <div>{/* use data */}</div>
}
```

#### Middleware (`utils/supabase/middleware.ts` + `middleware.ts`)

Automatically refreshes user sessions and keeps auth state up-to-date.

## 🔄 Migration Guide

### Option 1: Gradually Migrate API Routes (Recommended)

Your existing API routes can now use the new Supabase client directly:

**Before** (`app/api/employees/route.ts`):

```typescript
import { initSupabase } from '@/lib/supabase'

export async function GET() {
  const client = initSupabase()
  const { data, error } = await client.from('employees').select('*')
  // ...
}
```

**After** (using SSR pattern):

```typescript
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  try {
    const { data, error } = await supabase.from('employees').select('*')
    if (error) throw error
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
```

### Option 2: Use in Server Components

Convert pages from Client Components to Server Components for better performance:

**Before** (`app/page.tsx` - Client Component):

```typescript
'use client'
import { useEffect, useState } from 'react'

export default function Page() {
  const [employees, setEmployees] = useState([])

  useEffect(() => {
    fetch('/api/employees').then(r => r.json()).then(setEmployees)
  }, [])

  return <div>{/* ... */}</div>
}
```

**After** (Server Component):

```typescript
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: employees } = await supabase
    .from('employees')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div>
      {employees?.map((emp) => (
        <div key={emp.id}>{emp.full_name}</div>
      ))}
    </div>
  )
}
```

## 📊 Benefits of SSR Pattern

1. **Better Session Management**: Middleware automatically keeps auth sessions fresh
2. **Improved Performance**: Direct database queries from servers (no round trip)
3. **Better Security**: Sensitive operations stay server-side
4. **Type Safety**: Full TypeScript support with database types

## 🚀 Quick Start Example

Here's a simple example using the new pattern:

```typescript
// app/employees-list/page.tsx
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function EmployeesList() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: employees, error } = await supabase
    .from('employees')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div>
      <h1>Employees</h1>
      <ul>
        {employees?.map((employee) => (
          <li key={employee.id}>
            <strong>{employee.full_name}</strong>
            <p>{employee.email}</p>
            <p>{employee.department}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
```

## 📝 Your Current Setup

Your existing implementation in `lib/supabase.ts` is still valid and can coexist with this new pattern. You have two options:

1. **Keep both**: Use legacy approach for gradual migration
2. **Migrate fully**: Replace old pattern with SSR approach for better performance

## 🔧 Configuration Files Created

### `middleware.ts` (Root Level)

Routes user session refresh requests. Runs on every request to keep auth state current.

### `utils/supabase/server.ts`

Server-side client for Server Components and API routes.

### `utils/supabase/client.ts`

Browser client for Client Components with interactivity.

### `utils/supabase/middleware.ts`

Internal middleware configuration.

## ✨ Advanced: Using with Authentication

When you add authentication, this pattern will automatically:

- Refresh tokens when expired
- Keep session data in cookies
- Maintain auth state across requests

```typescript
// Example: Protected page
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function ProtectedPage() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return <div>Welcome, {user.email}!</div>
}
```

## 📚 Next Steps

1. **Review your existing code**: Identify components that would benefit from SSR
2. **Migrate gradually**: Update one API route or page at a time
3. **Test thoroughly**: Ensure data fetching and caching work correctly
4. **Monitor performance**: Use Vercel analytics to track improvements

## 🆘 Troubleshooting

### Issue: "Supabase environment variables not configured"

**Solution**: Ensure `.env.local` has both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`

### Issue: Type errors in TypeScript

**Solution**: Install Supabase CLI and generate types:

```bash
npm install -g supabase
supabase gen types typescript --project-id uxfelonxthuxjdwmwdvr > types/supabase.ts
```

### Issue: Sessions not refreshing

**Solution**: Ensure `middleware.ts` is at the root level and properly configured

---

**Note**: Your existing implementation in `lib/supabase.ts` still works perfectly. This new pattern is for gradual modernization and better SSR support.

For more details, see: https://supabase.com/docs/guides/auth/server-side-rendering
