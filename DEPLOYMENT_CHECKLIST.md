# 🚀 HRMS Deployment Checklist

Complete this checklist before deploying to production.

---

## 📋 Pre-Deployment (Local)

### Code Quality

- [ ] Run tests: `npm test` - all passing ✅
- [ ] Check linting: `npm run lint` - no errors ✅
- [ ] Run type check: `npm run typecheck` - no errors ✅
- [ ] Format code: `npm run format` - all formatted ✅

### Local Testing

- [ ] Development server: `npm run dev` - starts without errors
- [ ] Visit http://localhost:3000 - page loads
- [ ] Navigate to `/employees` - page renders
- [ ] Navigate to `/attendance` - page renders
- [ ] Add new employee - form submits successfully
- [ ] New employee appears in table
- [ ] Delete employee - removes from table
- [ ] Mark attendance - updates successfully
- [ ] View attendance history - displays correctly

### Environment Variables ✅

- [ ] `.env.local` file exists
- [ ] `NEXT_PUBLIC_SUPABASE_URL` is set
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` is set
- [ ] `.env.local` is in `.gitignore` ✅

### Database ✅

- [ ] Supabase project created
- [ ] Tables created (`employees`, `attendance`)
- [ ] SQL indexes created
- [ ] RLS disabled OR policies configured
- [ ] Test data added (optional)

---

## 🔐 Security Checks

### Secrets & Credentials

- [ ] No secrets in `.env.local.example`
- [ ] No API keys in code comments
- [ ] No passwords in code
- [ ] Environment variables properly named with `NEXT_PUBLIC_` prefix

### Dependencies

- [ ] Run security scan: `npm run security:snyk`
- [ ] Fix high/critical vulnerabilities
- [ ] Update dependencies: `npm update`
- [ ] Check for outdated packages: `npm outdated`

### Code Security

- [ ] No `console.log()` of sensitive data
- [ ] Error messages don't expose sensitive info
- [ ] Zod validation on all API endpoints
- [ ] Type safety enforced (no `any` types)

---

## 📦 Build & Bundle

### Production Build

- [ ] Build succeeds: `npm run build`
  ```bash
  npm run build
  # Expected: ✓ Compiled successfully
  ```

### Bundle Analysis

- [ ] Check bundle size: `npm run build:analyze`
- [ ] No suspicious large dependencies
- [ ] Minification working correctly

---

## 🌐 Vercel Deployment

### Before Pushing

- [ ] Git commits are clean: `git status`
  ```bash
  git status
  # Expected: "nothing to commit"
  ```
- [ ] All changes committed: `git log -1`
- [ ] Correct branch: `git branch`
  ```bash
  git branch
  # Expected: * master
  ```

### Fix GitHub Authentication

- [ ] Choose auth method:
  - [ ] **Option A**: SSH Key (Recommended)
    - Generate: `ssh-keygen -t ed25519 -C "your-email@gmail.com"`
    - Add to GitHub: https://github.com/settings/keys
    - Configure remote: `git remote set-url origin git@github.com:Mohit-cmd-jpg/hrms-lite.git`
  - [ ] **Option B**: Personal Access Token
    - Generate: https://github.com/settings/tokens
    - Configure credential helper: `git config --global credential.helper manager-core`
    - Clear old credentials in Windows Credential Manager

### Push to GitHub

- [ ] Test authentication: `git push origin master --dry-run`
- [ ] Push commits: `git push origin master`
  ```bash
  git push origin master
  # Expected: [master abc1234] feat: ...
  ```
- [ ] Verify on GitHub: https://github.com/Mohit-cmd-jpg/hrms-lite

### Deploy on Vercel

1. [ ] Go to https://vercel.com/dashboard
2. [ ] Click "Add New" → "Project"
3. [ ] Import from GitHub → "Mohit-cmd-jpg/hrms-lite"
4. [ ] Framework: "Next.js 16" (auto-detected)
5. [ ] Root Directory: "./" (default)
6. [ ] Build Command: "npm run build" (default)
7. [ ] Install Command: "npm install" (default)

### Environment Variables in Vercel

1. [ ] Go to Project Settings → Environment Variables
2. [ ] Add Variable:
   - Name: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: (from Supabase Project Settings > API)
   - Environments: ✓ Production, ✓ Preview, ✓ Development
3. [ ] Add Variable:
   - Name: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Value: (from Supabase Project Settings > API)
   - Environments: ✓ Production, ✓ Preview, ✓ Development
4. [ ] Click "Save"

### Verify Vercel Deployment

- [ ] Deployment starts automatically
- [ ] Vercel builds successfully (check Deployments tab)
- [ ] Preview URL generated
- [ ] Visit preview URL - app loads correctly

---

## ✅ Production Testing

### Access Live Deployment

1. [ ] Visit: `https://[your-vercel-domain].vercel.app`
2. [ ] Page loads without errors
3. [ ] No 404 errors in console

### Test Core Features

- [ ] Navigate to `/employees`
  - [ ] Page loads
  - [ ] "Add New Employee" form visible
  - [ ] Employee table renders (empty or with data)
- [ ] Create Employee
  - [ ] Fill form: name, email, department
  - [ ] Click "Add Employee"
  - [ ] Toast notification appears
  - [ ] New employee appears in table
- [ ] Navigate to `/attendance`
  - [ ] Page loads
  - [ ] Employee dropdown populated
  - [ ] Can select date and status
  - [ ] Can mark attendance
- [ ] View Existing Data
  - [ ] Employees list shows all records
  - [ ] Attendance history displays correctly
  - [ ] Filter by employee works

### Error Handling

- [ ] Test with invalid data:
  - [ ] Empty employee form → Error shown
  - [ ] Invalid email → Error shown
  - [ ] Missing required fields → Error shown
- [ ] Test API errors:
  - [ ] Network error → Handled gracefully
  - [ ] Database error → User-friendly message

### Performance

- [ ] Page load time < 3 seconds
- [ ] No console errors (press F12)
- [ ] Network requests show 200 status
- [ ] No 404 errors for assets

---

## 🔍 Browser Testing

Test on different browsers and devices:

### Desktop Browsers

- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari
- [ ] Edge

### Mobile Testing

- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)
- [ ] Responsive Design (DevTools)
  - [ ] Mobile (375px)
  - [ ] Tablet (768px)
  - [ ] Desktop (1920px)

### DevTools Checks

- [ ] Console: No errors or warnings ✅
- [ ] Network: All requests successful (200 status)
- [ ] Performance: Lighthouse score > 80
- [ ] Accessibility: No ARIA violations

---

## 📊 Monitoring Setup

### Sentry (Error Tracking)

- [ ] Sentry account created
- [ ] DSN configured in environment
- [ ] Test error tracking
- [ ] Set up alerts

### Vercel Analytics (Optional)

- [ ] Enable in Vercel project settings
- [ ] Monitor Core Web Vitals
- [ ] Check error logs

---

## 📝 Documentation

- [ ] README.md updated with:
  - [ ] Live deployment URL
  - [ ] Setup instructions
  - [ ] Troubleshooting guide
  - [ ] Technology stack
- [ ] GITHUB_AUTHENTICATION_GUIDE.md reviewed
- [ ] PROJECT_ANALYSIS_AND_FIX.md reviewed
- [ ] API documentation complete
- [ ] DEPLOYMENT_CHECKLIST.md follow

---

## 🎉 Post-Deployment

### Announce Deployment

- [ ] Update GitHub repository description
- [ ] Update GitHub README with live URL
- [ ] Pin deployment link
- [ ] Share with stakeholders

### Maintenance

- [ ] Set up daily backups (if applicable)
- [ ] Monitor error rates in Sentry
- [ ] Check Vercel analytics regularly
- [ ] Update dependencies monthly

### Future Improvements

- [ ] Add user authentication
- [ ] Implement role-based access
- [ ] Add more features
- [ ] Optimize performance

---

## ✅ Sign-Off

- [ ] **Deployment Date**: ******\_******
- [ ] **Deployed By**: ******\_******
- [ ] **Vercel URL**: ******\_******
- [ ] **All Checks Passed**: ✅

---

## 🆘 Troubleshooting

### Vercel Build Fails

1. Check build logs in Vercel
2. Verify all environment variables are set
3. Check `.env.local.example` for required vars
4. Run `npm run build` locally to replicate error

### Page Shows "Cannot Find"

1. Verify database tables exist in Supabase
2. Check RLS isn't blocking access
3. Verify environment variables in Vercel
4. Redeploy in Vercel

### 404 on API Endpoints

1. Check next.config.ts for API routes
2. Verify route file names (route.ts)
3. Check HTTP method (GET, POST, DELETE)
4. View Vercel function logs

### No Data Displayed

1. Execute SQL in Supabase
2. Disable RLS or add policy
3. Test with manual Supabase query
4. Check browser console for errors

### Authentication Issues

- See [GITHUB_AUTHENTICATION_GUIDE.md](./GITHUB_AUTHENTICATION_GUIDE.md)

---

**Checklist Version**: 1.0  
**Last Updated**: March 2026  
**Status**: Ready for Deployment ✅
