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

| Technology              | Purpose               |
| ----------------------- | --------------------- |
| Next.js 16 (App Router) | Frontend + API Routes |
| TypeScript              | Type safety           |
| Supabase                | PostgreSQL Database   |
| Tailwind CSS            | Styling               |
| Zod                     | API validation        |
| Vercel                  | Deployment            |

## 📦 Project Structure

```
/hrms
├── app/
│   ├── api/
│   │   ├── employees/route.ts   # Employee CRUD API
│   │   └── attendance/route.ts  # Attendance API
│   ├── employees/page.tsx       # Employee management UI
│   ├── attendance/page.tsx      # Attendance tracking UI
│   └── page.tsx                # Home page
├── components/                 # Reusable UI components
├── lib/
│   ├── supabase.ts             # Supabase client
│   ├── types.ts                # TypeScript interfaces
│   ├── useEmployees.ts         # Employee data hook
│   └── useAttendance.ts       # Attendance data hook
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
