# 🏢 HRMS - Human Resource Management System

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://hrms-eta-five.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E)](https://supabase.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6)](https://www.typescriptlang.org/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black)](https://vercel.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

A **production-ready** Human Resource Management System built with Next.js 16, React 19, TypeScript, and Supabase. Features comprehensive employee management, attendance tracking, and enterprise-grade quality standards.

---

## 🚀 Recent Updates
- Cleaned up leftover documentation and deployment artifacts from repository root.
- Updated Supabase environment variables for seamless deployment.
- Fixed GitHub authentication and permissions for automated workflows.

---

## 📲 Live Deployment

- **Production**: [https://hrms-eta-five.vercel.app](https://hrms-eta-five.vercel.app)
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

## 📦 Project Structure

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
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Get these from Supabase: **Project Settings > API > Project URL & Anon Key**

### 5️⃣ Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## 📝 Available Scripts

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
   - Import your GitHub repository
   - Add Environment Variables:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Deploy!

3. **Supabase Setup** (if not done)
   - Execute SQL script (see above)
   - Disable RLS policies

### Environment Variables

In Vercel project settings, add:

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

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

**Solution**:

- Check `.env.local` exists
- Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set
- Restart dev server: `npm run dev`

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
