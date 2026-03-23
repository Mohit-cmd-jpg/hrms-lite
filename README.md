# 🏢 HRMS - Human Resource Management System

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://hrms-mohit.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E)](https://supabase.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6)](https://www.typescriptlang.org/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black)](https://vercel.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

A **production-ready** Human Resource Management System built with Next.js 16, React 19, TypeScript, and Supabase. Features comprehensive employee management, attendance tracking, and enterprise-grade quality standards.

---

## 🚀 Recent Updates

✅ **Latest Improvements (March 2026)**

- **Fixed Database Errors**: Resolved "TypeError: fetch failed" by fixing Supabase environment variable compatibility
- **Implemented Supabase SSR**: Added Server-Side Rendering pattern with automatic session refresh
- **Cleaned Repository**: Single commit with full implementation history - fresh start for development
- **Enhanced Compatibility**: Support for both `PUBLISHABLE_DEFAULT_KEY` and `ANON_KEY` formats
- **Improved Error Messages**: Better diagnostics for missing Supabase configuration
- **Git User Configuration**: All commits attributed to Mohit-cmd-jpg

---

## 📲 Live Deployment

- **Production**: [https://hrms-mohit.vercel.app](https://hrms-mohit.vercel.app)
- **Repository**: [github.com/Mohit-cmd-jpg/hrms-lite](https://github.com/Mohit-cmd-jpg/hrms-lite)

---

## ✨ Features

### 👥 Employee Management

- **Create**: Add new employees with full details (name, email, department)
- **Read**: View all employees in a responsive table
- **Delete**: Remove employees with confirmation
- **Search**: Filter employees by department
- **Validation**: Zod schema validation for data integrity

### 📅 Attendance Tracking

- **Mark Attendance**: Present/Absent status for each date
- **Employee Filter**: View attendance by specific employee
- **Date Picker**: Easy date selection
- **Unique Constraints**: Prevent duplicate attendance records
- **History**: View complete attendance history

### 🎨 User Experience

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Loading States**: Visual feedback during data fetching
- **Error Handling**: User-friendly error messages
- **Empty States**: Clear guidance when no data exists
- **Toast Notifications**: Real-time success/error feedback
- **Dark Mode Ready**: Tailwind CSS 4 configuration

### 🔒 Security & Quality

- **Type Safety**: 100% TypeScript with strict mode
- **Request Validation**: Zod schemas for all endpoints
- **Error Tracking**: Sentry integration
- **Security Scanning**: Snyk vulnerability analysis
- **Testing**: Jest unit + Playwright E2E tests
- **CI/CD**: GitHub Actions automation

---

## 🛠️ Tech Stack

| Layer          | Technology            | Purpose                |
| -------------- | --------------------- | ---------------------- |
| **Frontend**   | React 19 + Next.js 16 | UI & App Shell         |
| **Language**   | TypeScript 5          | Type Safety            |
| **Styling**    | Tailwind CSS 4        | Responsive Design      |
| **API Routes** | Next.js App Router    | Backend                |
| **Database**   | Supabase (PostgreSQL) | Data Storage           |
| **Validation** | Zod 4.3.6             | Schema Validation      |
| **Testing**    | Jest + Playwright     | QA                     |
| **Monitoring** | Sentry                | Error Tracking         |
| **Security**   | Snyk                  | Vulnerability Scanning |
| **Deployment** | Vercel                | Hosting                |

---

## � Screenshots

### Dashboard Overview

The dashboard provides real-time insights with key metrics and quick actions:

- Total employees count
- Daily attendance statistics
- Absence tracking
- Quick access to employee management and attendance marking

![Dashboard Screenshot](/public/screenshots/dashboard.png)

### Employee Management

Complete employee lifecycle management with form validation:

- Add new employees (Full Name, Email, Department)
- View all employees in a responsive table
- Employee ID auto-generation
- Quick delete action with confirmation
- Department filtering and search

![Employees Management Screenshot](/public/screenshots/employees.png)

### Attendance Tracking

Daily attendance management system:

- Mark employee attendance (Present/Absent)
- Date picker for flexible entry
- View attendance history
- Filter by employee
- Real-time attendance records

![Attendance Tracking Screenshot](/public/screenshots/attendance.png)

---

## �📦 Project Structure

```
hrms/
├── app/                              # Next.js App Directory
│   ├── api/
│   │   ├── employees/route.ts       # Employee CRUD endpoints
│   │   └── attendance/route.ts      # Attendance endpoints
│   ├── employees/
│   │   ├── page.tsx                 # Employee list & create form
│   │   └── [id]/page.tsx           # Employee detail page
│   ├── attendance/
│   │   └── page.tsx                 # Attendance tracker
│   ├── layout.tsx                   # Root layout
│   ├── page.tsx                     # Home page
│   ├── Sidebar.tsx                  # Navigation sidebar
│   └── globals.css                  # Global styles
│
├── lib/                             # Shared Utilities
│   ├── supabase.ts                 # Supabase client initialization
│   ├── types.ts                    # TypeScript interfaces
│   ├── apiUtils.ts                 # API helper functions
│   ├── useEmployees.ts             # Employee data hook
│   └── useAttendance.ts            # Attendance data hook
│
├── components/                      # Reusable Components
│   ├── ui.tsx                      # UI component library
│   ├── Table.tsx                   # Data table component
│   ├── Toast.tsx                   # Notification component
│   └── ui.stories.tsx              # Storybook stories
│
├── __tests__/                       # Unit Tests
│   ├── api/
│   │   ├── employees.route.test.ts
│   │   └── attendance.route.test.ts
│   └── lib/
│       └── apiUtils.test.ts
│
├── e2e/                            # End-to-End Tests
│   └── app.spec.ts                 # Playwright tests
│
├── .github/                        # GitHub Configuration
│   ├── workflows/                  # CI/CD pipelines
│   └── copilot-instructions.md    # Copilot guidelines
│
├── docs/                           # Documentation
├── setup-database.sql              # Database schema
├── .env.local.example              # Environment template
├── jest.config.ts                  # Jest configuration
├── playwright.config.ts            # Playwright configuration
├── next.config.ts                  # Next.js configuration
├── tsconfig.json                   # TypeScript configuration
└── package.json                    # Dependencies
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- A Supabase account (free tier available)
- Git

### 1️⃣ Clone Repository

```bash
git clone https://github.com/Mohit-cmd-jpg/hrms-lite.git
cd hrms-lite
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Set Up Supabase

#### Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project (free tier)
3. Note your Project URL and Anon Key

#### Initialize Database

Go to **SQL Editor** in your Supabase dashboard and run:

```sql
-- Employees table
CREATE TABLE IF NOT EXISTS employees (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  department TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Attendance table
CREATE TABLE IF NOT EXISTS attendance (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id TEXT NOT NULL REFERENCES employees(employee_id) ON DELETE CASCADE,
  date DATE NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('Present', 'Absent')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(employee_id, date)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_attendance_employee_date ON attendance(employee_id, date);
CREATE INDEX IF NOT EXISTS idx_employees_employee_id ON employees(employee_id);
```

#### Disable RLS (for development)

1. In Supabase, go to **Authentication > Policies**
2. For `employees` table: Disable "Row Level Security" OR Create policy:
   ```sql
   CREATE POLICY "Enable read access" ON employees FOR SELECT USING (true);
   ```
3. Repeat for `attendance` table

### 4️⃣ Environment Variables

Create `.env.local` in the project root:

```env
# Supabase Configuration (Required)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co

# Use ONE of two formats:
# 1. For SSR pattern (recommended for Next.js 16+):
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your-publishable-key-here

# 2. For legacy client-side usage:
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**Important**: You can use either key format - the application automatically detects and uses the correct one.

**Get these from Supabase**:

1. Open [Supabase Dashboard](https://app.supabase.com)
2. Go to **Project Settings > API**
3. Copy your **Project URL**
4. Copy the **Publishable Key** (or **Anon Key** for legacy support)

### 5️⃣ Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## � Troubleshooting Database Errors

### Error: "TypeError: fetch failed" or "Supabase not configured"

**Cause**: Supabase environment variables are missing or invalid.

**Solution**:

1. **Verify Supabase Credentials**

   ```bash
   # Check your .env.local file
   cat .env.local
   ```

   Both variables must be present:
   - `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
   - Either `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` or `NEXT_PUBLIC_SUPABASE_ANON_KEY`

2. **Restart Development Server**

   ```bash
   npm run dev
   ```

3. **Verify Database Tables**
   - Go to Supabase Dashboard > SQL Editor
   - Run the database initialization script (see Setup section above)
   - Ensure tables exist: `employees`, `attendance`

4. **Check RLS Policies**
   - If using Row-Level Security, ensure policies allow SELECT/INSERT/DELETE or disable RLS for testing:
     ```sql
     ALTER TABLE employees DISABLE ROW LEVEL SECURITY;
     ALTER TABLE attendance DISABLE ROW LEVEL SECURITY;
     ```

5. **View Error Logs**
   - Open browser console (Press F12)
   - Check Network tab for failed API requests
   - Look for detailed error messages in Console tab

---

## 🚀 Supabase SSR Integration

This project now includes **Server-Side Rendering (SSR)** pattern for better performance and security:

### Using Server Components (Recommended for Data Fetching)

```typescript
// app/employees/page.tsx (Server Component)
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function EmployeesPage() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data } = await supabase
    .from('employees')
    .select('*')

  return <div>Employees: {data?.length || 0}</div>
}
```

### Using Client Components (For Interactivity)

```typescript
// components/EmployeeForm.tsx (Client Component)
'use client'
import { createClient } from '@/utils/supabase/client'
import { useState } from 'react'

export function EmployeeForm() {
  const supabase = createClient()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase
      .from('employees')
      .insert([{ full_name: 'John Doe', email: 'john@example.com' }])

    setLoading(false)
  }

  return <form onSubmit={handleSubmit}>{/* form fields */}</form>
}
```

**Key Benefits**:

- ✅ Automatic session refresh via middleware
- ✅ No client-side data fetching needed
- ✅ Faster page loads
- ✅ Better SEO
- ✅ Secure API calls from server

---

```bash
# Development
npm run dev              # Start development server (http://localhost:3000)
npm run build           # Build for production
npm start               # Start production server

# Testing
npm run test            # Run jest tests
npm run test:watch      # Watch mode for tests
npm run test:e2e        # Run Playwright E2E tests
npm run test:e2e:ui     # E2E tests with UI

# Code Quality
npm run lint            # Run ESLint
npm run lint:fix        # Fix ESLint issues
npm run format          # Format with Prettier
npm run typecheck       # TypeScript type checking

# Analysis
npm run build:analyze   # Bundle analysis
npm run perf:budget     # Performance budget check
npm run security:snyk   # Security vulnerability scan

# Documentation
npm run storybook       # Start Storybook (component docs)
npm run build-storybook # Build Storybook
```

---

## 🌐 Deployment

### Vercel (Recommended)

1. **Push to GitHub**

   ```bash
   git push origin master
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project" > "Import Git Repository"
   - Select your `hrms-lite` repository
   - Under "Environment Variables", add:
     ```
     NEXT_PUBLIC_SUPABASE_URL = https://your-project.supabase.co
     NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY = your_key_here
     ```
   - Click "Deploy"

3. **Supabase Setup** (if not done locally)
   - Execute SQL script (see Setup section above)
   - Disable RLS policies for testing

### Custom Domain Setup (Vercel)

1. **Go to Project Settings**
   - Visit [https://vercel.com/dashboard](https://vercel.com/dashboard)
   - Select your `hrms-lite` project
   - Click "Settings" > "Domains"

2. **Add Custom Domain**
   - Enter your domain (e.g., `hrms.yourdomain.com`)
   - Choose between:
     - **Nameserver**: Update your domain's DNS provider with Vercel's nameservers (easiest)
     - **CNAME**: Add a CNAME record pointing to Vercel (manual)

3. **Verify Domain**
   - Wait for DNS propagation (usually 24-48 hours)
   - Vercel will show a green checkmark when verified
   - Your app is now live at your custom domain!

4. **SSL Certificate**
   - Vercel automatically provisions a free SSL certificate
   - Your site will be secure (HTTPS)

5. **Redirect Default Domain**
   - Optional: Set up redirect from `vercel.app` domain to your custom domain
   - Go to "Domains" > "visit" to manage redirects

### Environment Variables for Production

Ensure these are set in Vercel Project Settings:

| Variable                                       | Value                         | Example                   |
| ---------------------------------------------- | ----------------------------- | ------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`                     | Your Supabase Project URL     | `https://xyz.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` | Publishable Key from Supabase | `sb_publishable_xxxxx`    |

**Security Note**: Never commit `.env.local` to version control. Vercel's environment variables are secure and isolated.

---

## 🧪 Testing

### Run All Tests

```bash
npm test
```

### Run Specific Test Suite

```bash
npm run test:api        # API route tests
```

### E2E Testing

```bash
npm run test:e2e        # Headless
npm run test:e2e:ui     # With browser UI
```

### View Test Coverage

```bash
npm test -- --coverage
```

---

## 🐛 Troubleshooting

### Database Shows No Data

**Problem**: Pages load but employee list is empty

**Solutions**:

1. ✅ Execute SQL script in Supabase (see Quick Start Step 3)
2. ✅ Disable RLS or add read policies
3. ✅ Verify credentials in `.env.local`

### "Supabase not configured" Error

**Problem**: Error message or blank pages due to missing Supabase configuration

**Solution**:

- Verify `.env.local` file exists and contains:
  ```env
  NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_key_here
  ```
- Both variables are **required**
- Restart dev server: `npm run dev`
- Check browser console (F12) for detailed error messages

### "TypeError: fetch failed" Error

**Problem**: Supabase requests fail with network error

**Solution**:

1. Verify Supabase credentials are correct
2. Check firewall/proxy isn't blocking Supabase domain
3. Ensure `NEXT_PUBLIC_SUPABASE_URL` uses HTTPS
4. Try in an incognito/private browser window
5. Check network tab in browser DevTools (F12) for blocked requests

The application automatically supports both key formats:

- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY` (recommended for SSR)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` (legacy support)

### Permission Denied on GitHub Push

**Solution**:

- See [GITHUB_AUTHENTICATION_GUIDE.md](./GITHUB_AUTHENTICATION_GUIDE.md)
- Use SSH key or Personal Access Token

### Tests Failing

**Solution**:

```bash
npm install              # Update dependencies
npm run test            # Run tests
npm run format          # Auto-fix formatting
npm run lint:fix        # Auto-fix lint issues
```

### API Returns 404

**Solution**:

- Ensure `.env.local` has correct credentials
- Check Supabase tables exist
- Verify tables are accessible (RLS disabled or policy exists)

---

## 📚 Documentation

- **[QUICK_START.md](./QUICK_START.md)** - Quick reference guide
- **[PROJECT_ANALYSIS_AND_FIX.md](./PROJECT_ANALYSIS_AND_FIX.md)** - Complete setup guide
- **[GITHUB_AUTHENTICATION_GUIDE.md](./GITHUB_AUTHENTICATION_GUIDE.md)** - Git auth solutions
- **[PROJECT_STATUS_REPORT.md](./PROJECT_STATUS_REPORT.md)** - Technical analysis
- **[setup-database.sql](./setup-database.sql)** - Database schema
- **[.env.local.example](./.env.local.example)** - Environment template

---

## 🔍 API Endpoints

### Employees API

| Method | Endpoint                       | Body                             | Description         |
| ------ | ------------------------------ | -------------------------------- | ------------------- |
| GET    | `/api/employees`               | -                                | Fetch all employees |
| POST   | `/api/employees`               | `{full_name, email, department}` | Create employee     |
| DELETE | `/api/employees?employee_id=X` | -                                | Delete employee     |

### Attendance API

| Method | Endpoint                        | Body                          | Description             |
| ------ | ------------------------------- | ----------------------------- | ----------------------- |
| GET    | `/api/attendance`               | -                             | Fetch all attendance    |
| GET    | `/api/attendance?employee_id=X` | -                             | Get employee attendance |
| POST   | `/api/attendance`               | `{employee_id, date, status}` | Mark attendance         |

---

## 🔐 Security

- ✅ **Input Validation**: Zod schemas on all endpoints
- ✅ **Type Safety**: TypeScript strict mode
- ✅ **Error Handling**: Safe error messages (no data leaks)
- ✅ **HTTPS Only**: Vercel provides SSL/TLS
- ✅ **Environment Variables**: Secrets not in code
- ✅ **Security Scanning**: Snyk integration
- ✅ **Dependency Updates**: Dependabot configured

### Best Practices

- Use environment variables for secrets
- Keep `.env.local` in `.gitignore`
- Never commit `NEXT_PUBLIC_` vars with real values
- Use Supabase Row Level Security in production
- Monitor errors with Sentry

---

## 📊 Performance

- **TypeScript**: Full type safety
- **Tailwind CSS**: Minimal CSS output
- **Next.js**: Built-in optimization
- **Database Indexes**: Indexed queries
- **Error Tracking**: Sentry monitoring
- **Bundle Analysis**: Monitor bundle size

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/name`
3. Make your changes
4. Run tests: `npm test`
5. Commit: `git commit -m "feat: description"`
6. Push: `git push origin feature/name`
7. Create a Pull Request

---

## 📜 License

This project is licensed under the MIT License - see [LICENSE](./LICENSE) file for details.

---

## 👨‍💻 Author

**Mohit** - [GitHub Profile](https://github.com/Mohit-cmd-jpg)

---

## 🚀 What's Next?

- [ ] Add user authentication
- [ ] Implement permission roles (Admin, Manager, Employee)
- [ ] Add salary management module
- [ ] Implement leave management
- [ ] Add reports and analytics
- [ ] Mobile app with React Native

---

## 💡 Support

For issues and questions:

1. Check [Troubleshooting](##-troubleshooting) section
2. Review [PROJECT_ANALYSIS_AND_FIX.md](./PROJECT_ANALYSIS_AND_FIX.md)
3. Open an issue on GitHub

---

**Last Updated**: March 2026 | **Status**: Production Ready ✅

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open** [http://localhost:3000](http://localhost:3000)

## 🔐 Environment Variables

| Variable                      | Description                   |
| ----------------------------- | ----------------------------- |
| NEXT_PUBLIC_SUPABASE_URL      | Your Supabase project URL     |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | Your Supabase anon/public key |
| NEXT_PUBLIC_SENTRY_DSN        | Public Sentry DSN (optional)  |
| SENTRY_DSN                    | Server Sentry DSN (optional)  |

### CI Secrets

- `SENTRY_AUTH_TOKEN`
- `SENTRY_ORG`
- `SENTRY_PROJECT`
- `SNYK_TOKEN`
- `CHROMATIC_PROJECT_TOKEN`

## 📝 API Endpoints

### Employees

| Method | Endpoint                       | Description       |
| ------ | ------------------------------ | ----------------- |
| GET    | `/api/employees`               | Get all employees |
| POST   | `/api/employees`               | Create employee   |
| DELETE | `/api/employees?employee_id=X` | Delete employee   |

### Attendance

| Method | Endpoint                        | Description                |
| ------ | ------------------------------- | -------------------------- |
| GET    | `/api/attendance`               | Get all attendance         |
| GET    | `/api/attendance?employee_id=X` | Get attendance by employee |
| POST   | `/api/attendance`               | Mark attendance            |

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

## ✅ Production Workflow Enhancements

This repository now includes a professional engineering workflow:

- **Code Quality**: ESLint + Prettier + EditorConfig + format-on-save VS Code settings
- **AI Tooling**: VS Code extension recommendations for GitHub Copilot, Codeium, and Tabnine
- **Testing**: Jest (unit) + Playwright (E2E) + initial test suites
- **API Test Generation**: Keploy configuration and scripts
- **Static Analysis**: SonarLint workspace settings + Sonar project config
- **Security**: CodeQL, Dependabot, Snyk
- **CI/CD**: GitHub Actions pipeline for lint/type/test/build/e2e/security scans
- **Debugging**: VS Code launch configs (server, Chrome, full stack) + Postman collection
- **Monitoring**: Sentry integration scaffolding for client/server/edge
- **UI Development**: Storybook setup and initial component stories

## 🧪 Quality Commands

```bash
npm run lint
npm run lint:fix
npm run format
npm run format:check
npm run typecheck
npm run test
npm run test:api
npm run test:e2e
npm run perf:budget
npm run build:analyze
```

## 🧩 Storybook

```bash
npm run storybook
```

## 🔒 Security

```bash
npm run security:snyk
npm audit --audit-level=high
```

CodeQL and Dependabot are configured in `.github/workflows` and `.github/dependabot.yml`.

## 🐞 Debugging

Use VS Code Run and Debug profiles from `.vscode/launch.json`:

- Next.js: debug server
- Next.js: debug in Chrome
- Next.js: full stack

## 📮 API Debugging / QA

Import Postman collection from `postman/HRMS.postman_collection.json`.

## 📊 Observability

Sentry config files are included:

- `instrumentation-client.ts`
- `sentry.server.config.ts`
- `sentry.edge.config.ts`

Set Sentry environment variables in `.env.local` to activate monitoring.

## 👁️ Visual Regression

Visual regression is configured with Chromatic via `.github/workflows/visual-regression.yml`.

```bash
npm run visual:test
```

Set `CHROMATIC_PROJECT_TOKEN` in repository secrets.

## 🌿 Branch Protection

Branch protection guidance is documented in `docs/branch-protection.md`.
Enable required checks in GitHub Settings -> Branches for production merge enforcement.
