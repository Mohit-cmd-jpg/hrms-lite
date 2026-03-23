# 🚀 HRMS Quick Commands Reference

## Navigation

```bash
# Go to project directory
cd c:\Users\HP\OneDrive\Desktop\hrms

# Check current directory
Get-Location
# or
pwd
```

---

## Git Commands

### View Status

```bash
# Check git status
git status

# View recent commits
git log --oneline -10
git log origin/master --oneline -5

# Check what changed
git diff
git diff --staged
```

### Before Pushing (Authentication Fix)

#### Option A: SSH Setup

```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your-email@gmail.com"
# (Press Enter 3 times)

# Copy public key to clipboard
cat ~/.ssh/id_ed25519.pub | clip

# Update Git remote to use SSH
git remote set-url origin git@github.com:Mohit-cmd-jpg/hrms-lite.git

# Test SSH connection
ssh -T git@github.com
# Expected: "Hi Mohit-cmd-jpg!..."

# View current remote
git remote -v
```

#### Option B: Personal Access Token

```bash
# Configure credential helper
git config --global credential.helper manager-core

# Push (will prompt for credentials)
git push origin master
# Username: Mohit-cmd-jpg
# Password: [paste your PAT token]
```

### Push to GitHub

```bash
# List commits to push
git log origin/master..HEAD --oneline

# Push commits
git push origin master

# Verify
git log origin/master --oneline -5
```

---

## NPM Commands

### Installation & Setup

```bash
# Install dependencies
npm install

# Install specific package
npm install package-name

# Update all packages
npm update

# Check for outdated packages
npm outdated
```

### Development

```bash
# Start dev server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run specific test file
npm test -- employees.route.test.ts

# Run E2E tests (headless)
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui

# Generate coverage report
npm test -- --coverage
```

### Code Quality

```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Type check
npm run typecheck

# Format code
npm run format

# Check formatting
npm run format:check

# Security scan
npm run security:snyk
```

### Analysis

```bash
# Build with bundle analysis
npm run build:analyze

# Performance budget check
npm run perf:budget

# Storybook (component docs)
npm run storybook
```

---

## Supabase Commands/URLs

### URLs

```
Dashboard: https://app.supabase.com
Project SQL Editor: https://app.supabase.com/sql/new
API Settings: https://app.supabase.com/project/[project-id]/settings/api
Tables: https://app.supabase.com/project/[project-id]/editor
Policies: https://app.supabase.com/project/[project-id]/auth/policies
```

### SQL Queries

```sql
-- Check if tables exist
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public';

-- Count employees
SELECT COUNT(*) FROM employees;

-- Count attendance records
SELECT COUNT(*) FROM attendance;

-- View all employees
SELECT * FROM employees LIMIT 10;

-- View all attendance
SELECT * FROM attendance LIMIT 10;

-- Delete all data (development only!)
DELETE FROM attendance;
DELETE FROM employees;
```

---

## Environment Variables

### View

```bash
# Show all environment variables
Get-ChildItem env: | Format-Table

# Show specific variable
$env:NEXT_PUBLIC_SUPABASE_URL

# Show all in .env.local
cat .env.local
```

### Edit

```bash
# Use any text editor
code .env.local
# or
notepad .env.local
```

### Required Variables

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

---

## GitHub Commands

### View Configuration

```bash
# Show git config
git config --list --global

# Show current user
git config --global user.name
git config --global user.email

# Show current remote
git remote -v
```

### Change Authentication

```bash
# Switch to SSH
git remote set-url origin git@github.com:Mohit-cmd-jpg/hrms-lite.git

# Switch to HTTPS
git remote set-url origin https://github.com/Mohit-cmd-jpg/hrms-lite.git

# Verify change
git remote -v
```

---

## Vercel Commands/URLs

### URLs

```
Dashboard: https://vercel.com/dashboard
New Project: https://vercel.com/new
Project Settings: https://vercel.com/[project-name]/settings
Deployments: https://vercel.com/[project-name]/deployments
Environment: https://vercel.com/[project-name]/settings/environment-variables
```

### CLI (Optional)

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from command line
vercel --prod

# View projects
vercel projects

# View deployments
vercel deployments
```

---

## File Management

### Navigation

```bash
# List files
Get-ChildItem
# or
ls
# or
dir

# Show hidden files
Get-ChildItem -Force

# Go to specific directory
cd path\to\directory

# Go to parent directory
cd ..

# Go to home directory
cd ~

# View current path
Get-Location
```

### File Operations

```bash
# View file
cat filename.txt
Get-Content filename.txt

# Edit file
code filename.txt
notepad filename.txt

# Copy file
Copy-Item source.txt destination.txt

# Create directory
mkdir dirname
New-Item -ItemType Directory dirname

# Delete file
Remove-Item filename.txt

# Find files
Get-ChildItem -Filter "*.tsx" -Recurse
```

---

## Debugging

### Node.js/npm

```bash
# Clear npm cache
npm cache clean --force

# Verify npm installation
npm --version
npm doctor

# Test network
npm ping
```

### Git Issues

```bash
# Check git installation
git --version

# Check SSH key availability
ssh-add -L
ssh-add ~/.ssh/id_ed25519

# Test SSH connection
ssh -v git@github.com
```

### Project Issues

```bash
# Delete node_modules and reinstall
Remove-Item -Recurse -Force node_modules
npm install

# Delete build artifacts and rebuild
Remove-Item -Recurse -Force .next
npm run build

# Clear git cache (if files shouldn't be tracked)
git rm -r --cached .
git add .
git commit -m "fix: remove files from git tracking"
```

---

## Documentation Files

### View Documentation

```bash
# View README
code README.md
cat README.md

# View quick start
code QUICK_START.md

# View deployment guide
code FINAL_DEPLOYMENT_STEPS.md

# Run setup helper
node setup-helper.js
```

### Create New Documentation

```bash
# Create new markdown file
New-Item -ItemType File -Name "filename.md"
# or
echo $null > filename.md

# Edit with VS Code
code filename.md
```

---

## Project URLs

### Development

```
Local: http://localhost:3000
API: http://localhost:3000/api/employees
     http://localhost:3000/api/attendance
```

### Production

```
Live: https://hrms-eta-five.vercel.app
Repository: https://github.com/Mohit-cmd-jpg/hrms-lite
```

---

## Common Workflows

### Complete Setup & Deploy

```bash
# 1. Navigate to project
cd c:\Users\HP\OneDrive\Desktop\hrms

# 2. Fix GitHub auth (see FINAL_DEPLOYMENT_STEPS.md)
# ... [SSH or PAT setup] ...

# 3. Push to GitHub
git push origin master

# 4. Install dependencies
npm install

# 5. Test locally
npm run dev
# Visit http://localhost:3000

# 6. Deploy via Vercel
# Go to vercel.com/dashboard and import repository

# 7. Add environment variables in Vercel
# NEXT_PUBLIC_SUPABASE_URL
# NEXT_PUBLIC_SUPABASE_ANON_KEY

# 8. Verify deployment
# Visit your Vercel URL
```

### Before Deployment

```bash
# Verify code quality
npm run lint          # No errors
npm run typecheck     # No type errors
npm run test          # All tests pass
npm run build         # Build succeeds

# Check git status
git status            # Nothing to commit
git log --oneline -5  # See recent commits
```

### After Deployment

```bash
# Monitor errors
# Check Sentry: https://sentry.io

# Monitor analytics
# Check Vercel analytics

# View logs
# Check Vercel deployment logs

# Test features
# Visit production URL
# Test employee creation
# Test attendance marking
```

---

## Quick Problem Solving

### Git Permission Error

```bash
# Shows: "Permission denied to [username]"
# Solution: Fix GitHub auth (FINAL_DEPLOYMENT_STEPS.md)

# Verify current remote
git remote -v

# Switch to SSH
git remote set-url origin git@github.com:Mohit-cmd-jpg/hrms-lite.git

# Test
ssh -T git@github.com
```

### Build Errors

```bash
# Delete and reinstall
Remove-Item -Recurse -Force node_modules
npm install

# Clean build
Remove-Item -Recurse -Force .next
npm run build
```

### Database Errors

```bash
# Execute SQL in Supabase
# Go to: https://app.supabase.com → SQL Editor
# Run setup-database.sql

# Check if tables exist
SELECT * FROM employees LIMIT 1;

# Disable RLS if needed
# Go to: Authentication > Policies
```

---

## Terminal Tips

### Colors & Formatting

```bash
# Clear screen
Clear
cls

# Stop running process
Ctrl + C

# Exit terminal
exit

# Previous commands
Up Arrow / Down Arrow

# Get help
Get-Command git -ShowCommandInfo
```

---

**Save this file for quick reference!**

Updated: March 2026
