#!/usr/bin/env node

/**
 * HRMS Setup Helper
 *
 * This script guides you through setting up the HRMS application.
 * It checks prerequisites and provides instructions for manual steps.
 *
 * Run: node setup-helper.js
 */

const fs = require('fs')
const path = require('path')
const readline = require('readline')

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  blue: '\x1b[34m',
}

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

function section(title) {
  console.log('')
  log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`, 'cyan')
  log(`  ${title}`, 'bright')
  log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`, 'cyan')
  console.log('')
}

function success(message) {
  log(`✅ ${message}`, 'green')
}

function warning(message) {
  log(`⚠️  ${message}`, 'yellow')
}

function error(message) {
  log(`❌ ${message}`, 'red')
}

function checkFile(filePath, fileName) {
  const fullPath = path.join(process.cwd(), filePath)
  if (fs.existsSync(fullPath)) {
    success(`${fileName} found`)
    return true
  } else {
    error(`${fileName} not found`)
    return false
  }
}

function checkEnvVariable(envVar) {
  if (process.env[envVar]) {
    success(`${envVar} is set`)
    return true
  } else {
    warning(`${envVar} is not set`)
    return false
  }
}

async function prompt(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  return new Promise((resolve) => {
    rl.question(`\n${colors.bright}${question}${colors.reset}\n> `, (answer) => {
      rl.close()
      resolve(answer)
    })
  })
}

async function runSetup() {
  console.clear()
  log(
    `
  ╔═══════════════════════════════════════════════════════════╗
  ║                    HRMS Setup Helper                       ║
  ║          Production-Ready HRMS Deployment Guide            ║
  ╚═══════════════════════════════════════════════════════════╝
  `,
    'cyan',
  )

  // 1. Check Prerequisites
  section('1️⃣  Prerequisites Check')

  const checks = {
    'Node.js': () => checkEnvVariable('PATH'),
    'package.json': () => checkFile('package.json', 'package.json'),
    '.env.local': () => checkFile('.env.local', '.env.local'),
    'Supabase URL': () => checkEnvVariable('NEXT_PUBLIC_SUPABASE_URL'),
    'Supabase Anon Key': () => checkEnvVariable('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
  }

  let allChecksPassed = true
  for (const [name, check] of Object.entries(checks)) {
    if (!check()) {
      allChecksPassed = false
    }
  }

  if (!allChecksPassed) {
    warning('Some checks failed. Please review the issues above.')
  } else {
    success('All prerequisites are set!')
  }

  // 2. Code Quality Checks
  section('2️⃣  Code Quality Verification')

  log('Run the following commands to verify code quality:')
  console.log(`
  ${colors.bright}npm run lint${colors.reset}        - Check for linting errors
  ${colors.bright}npm run typecheck${colors.reset}   - Check TypeScript types
  ${colors.bright}npm run test${colors.reset}        - Run unit tests
  ${colors.bright}npm run build${colors.reset}      - Build for production
  `)

  // 3. Database Setup
  section('3️⃣  Database Setup (Manual Step)')

  log('Your Supabase project:', 'bright')
  log('  URL: ' + (process.env.NEXT_PUBLIC_SUPABASE_URL || 'NOT SET'))
  console.log('')

  log('Execute this SQL in your Supabase SQL Editor:', 'bright')
  log('  Go to: https://app.supabase.com → SQL Editor → New Query')
  console.log('')
  console.log(`
${colors.yellow}-- Employees table
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
CREATE INDEX IF NOT EXISTS idx_employees_employee_id ON employees(employee_id);${colors.reset}
  `)

  // 4. RLS Configuration
  section('4️⃣  Configure Row-Level Security (RLS)')

  log('In Supabase Dashboard:', 'bright')
  log('  1. Go to Authentication > Policies')
  log('  2. Select "employees" table')
  log('  3. Option A: Disable RLS (for development)')
  log('  4. Option B: Add this policy (for production):')
  console.log(`
${colors.yellow}CREATE POLICY "Enable read access" ON employees
  FOR SELECT USING (true);

CREATE POLICY "Enable insert access" ON employees
  FOR INSERT WITH CHECK (true);${colors.reset}
  `)

  // 5. Local Testing
  section('5️⃣  Test Locally')

  log('Run development server:', 'bright')
  log('  npm run dev')
  log('  Then open http://localhost:3000 in your browser')
  log('  Navigate to /employees and test adding an employee')

  // 6. GitHub Setup
  section('6️⃣  GitHub Authentication Setup')

  const authChoice = await prompt(
    `Choose authentication method:\n  1) SSH Key (Recommended)\n  2) Personal Access Token\n  3) Skip for now\n\nEnter choice (1-3):`,
  )

  if (authChoice === '1') {
    log(`\n📋 SSH Key Setup:`, 'bright')
    console.log(`
${colors.cyan}# Step 1: Generate SSH Key
ssh-keygen -t ed25519 -C "your-email@gmail.com"
# Press Enter for all prompts to use defaults

# Step 2: Add key to GitHub
# Copy the contents of ~/.ssh/id_ed25519.pub
# Go to https://github.com/settings/keys
# Click "New SSH key" and paste

# Step 3: Update git remote
git remote set-url origin git@github.com:Mohit-cmd-jpg/hrms-lite.git

# Step 4: Test connection
ssh -T git@github.com
# Should say: "Hi Mohit-cmd-jpg! You've successfully authenticated..."

# Step 5: Push changes
git push origin master${colors.reset}
    `)
  } else if (authChoice === '2') {
    log(`\n🔐 Personal Access Token Setup:`, 'bright')
    console.log(`
${colors.cyan}# Step 1: Generate PAT
# Go to https://github.com/settings/tokens
# Click "Generate new token" → "Generate new token (classic)"
# Give name: "HRMS Git Push"
# Select scope: ✓ repo
# Click "Generate token" and copy immediately

# Step 2: Configure Git
git config --global credential.helper manager-core

# Step 3: Clear old credentials
# Open Credential Manager (Windows)
# Remove old github.com entries

# Step 4: Push (will prompt for credentials)
git push origin master
# Username: Mohit-cmd-jpg
# Password: [Paste your Personal Access Token]${colors.reset}
    `)
  }

  // 7. Vercel Deployment
  section('7️⃣  Deploy on Vercel')

  log('After pushing to GitHub:', 'bright')
  console.log(`
${colors.cyan}# Step 1: Go to Vercel
https://vercel.com/dashboard

# Step 2: Click "Add New" → "Project"

# Step 3: Select Repository
# GitHub → "Mohit-cmd-jpg/hrms-lite"

# Step 4: Configure Build Settings (auto-detected)
  Build Command: npm run build
  Install Command: npm install
  Root Directory: ./

# Step 5: Add Environment Variables
NEXT_PUBLIC_SUPABASE_URL    = [from Supabase]
NEXT_PUBLIC_SUPABASE_ANON_KEY = [from Supabase]

# Step 6: Click "Deploy"
# Wait for build to complete
# Visit the generated URL${colors.reset}
  `)

  // 8. Final Steps
  section('8️⃣  Final Verification')

  log('After deployment:', 'bright')
  console.log(`
  ✓ Visit your live URL
  ✓ Navigate to /employees
  ✓ Test adding an employee
  ✓ Verify data displays correctly
  ✓ Check browser console (F12) for errors
  ✓ Test responsive design on mobile
  `)

  // 9. Summary
  section('✅ Setup Complete!')

  console.log(`
${colors.green}Your HRMS is now set up and deployed!${colors.reset}

📚 Documentation:
  • README.md - Overview and quick start
  • QUICK_START.md - Quick reference guide
  • PROJECT_ANALYSIS_AND_FIX.md - Troubleshooting
  • DEPLOYMENT_CHECKLIST.md - Deployment steps
  • GITHUB_AUTHENTICATION_GUIDE.md - Git auth help

🚀 Next Steps:
  1. Execute SQL in Supabase
  2. Configure RLS
  3. Set up GitHub authentication
  4. Push to GitHub
  5. Deploy on Vercel
  6. Test live deployment

💡 Need help? Check the documentation files!
  `)

  log('Happy deploying! 🎉', 'green')
  process.exit(0)
}

// Run the setup
runSetup().catch((error) => {
  error('Setup error: ' + error.message)
  process.exit(1)
})
