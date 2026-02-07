# HRMS Lite

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://hrms-eta-five.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E)](https://supabase.com/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black)](https://vercel.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

A minimal, production-ready Human Resource Management System built with Next.js and Supabase.

## 🔗 Live Demo

**🌐 [https://hrms-eta-five.vercel.app](https://hrms-eta-five.vercel.app)**

## 🎯 Features

- **Employee Management**: Add, view, and delete employee records
- **Attendance Tracking**: Mark daily attendance (Present/Absent) for employees
- **Clean UI**: Professional interface with loading, empty, and error states

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 16 (App Router) | Frontend + API Routes |
| Supabase | PostgreSQL Database |
| Tailwind CSS | Styling |
| Vercel | Deployment |

## 📦 Project Structure

```
/hrms
├── app/
│   ├── api/
│   │   ├── employees/route.js   # Employee CRUD API
│   │   └── attendance/route.js  # Attendance API
│   ├── employees/page.jsx       # Employee management UI
│   ├── attendance/page.jsx      # Attendance tracking UI
│   └── page.jsx                 # Home page
├── lib/
│   └── supabase.js              # Supabase client
└── README.md
```

## 🗄️ Database Setup

Run this SQL in your Supabase SQL Editor:

```sql
-- Employees table
CREATE TABLE employees (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  department TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Attendance table
CREATE TABLE attendance (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id TEXT REFERENCES employees(employee_id) ON DELETE CASCADE,
  date DATE NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('Present', 'Absent')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(employee_id, date)
);
```

## 🚀 Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/Mohit-cmd-jpg/hrms-lite.git
   cd hrms-lite
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create `.env.local` in the root directory:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open** [http://localhost:3000](http://localhost:3000)

## 🔐 Environment Variables

| Variable | Description |
|----------|-------------|
| NEXT_PUBLIC_SUPABASE_URL | Your Supabase project URL |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | Your Supabase anon/public key |

## 📝 API Endpoints

### Employees

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/employees` | Get all employees |
| POST | `/api/employees` | Create employee |
| DELETE | `/api/employees?employee_id=X` | Delete employee |

### Attendance

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/attendance` | Get all attendance |
| GET | `/api/attendance?employee_id=X` | Get attendance by employee |
| POST | `/api/attendance` | Mark attendance |

## 🏗️ Architecture Decisions

### Why Next.js API Routes instead of a separate backend?
- **Simplicity**: Single deployment, single codebase
- **Cost**: No extra server to manage
- **Performance**: API routes run on the same edge network as the frontend

### Why Supabase instead of a raw database?
- **Quick setup**: Database ready in minutes
- **Built-in client**: No ORM needed, simple JS client
- **Free tier**: Generous limits for small projects

### Why no authentication?
- **Requirement**: Task explicitly said no auth
- **Simplicity**: Keeps the codebase minimal and interview-friendly
- **Trade-off**: Only suitable for internal/trusted environments

### Why simple state management?
- **React useState**: Sufficient for this scale
- **No Redux**: Adds complexity without benefit for small apps
- **Fetch on demand**: Simple pattern, easy to understand

## ⚠️ Assumptions & Limitations

1. **No authentication** - Anyone with access can modify data
2. **Single admin** - Not designed for multi-user/role scenarios
3. **No pagination** - All records loaded at once (fine for small datasets)
4. **No edit functionality** - Only add and delete for employees
5. **Date-based attendance** - One record per employee per day

## 🚀 Deployment to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

Built for interview assessment purposes. Keep it simple.
