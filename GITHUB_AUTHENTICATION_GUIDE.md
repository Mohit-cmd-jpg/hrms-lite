# GitHub Authentication Guide

## ⚠️ Current Issue

```
Error: Permission denied (diksha12345612 -> Mohit-cmd-jpg/hrms-lite.git)
```

**Cause**: The current GitHub account (diksha12345612) doesn't have write access to the repository owned by Mohit-cmd-jpg.

## ✅ Solution 1: Use SSH Authentication (Recommended)

### Step 1: Check for Existing SSH Keys

```bash
ls ~/.ssh/
```

### Step 2: Generate SSH Key (if none exists)

```bash
ssh-keygen -t ed25519 -C "your-email@gmail.com"
# Then press Enter for all prompts to use defaults
```

### Step 3: Add SSH Key to GitHub

1. Go to https://github.com/settings/keys
2. Click "New SSH key"
3. Paste the contents of `~/.ssh/id_ed25519.pub`
4. Click "Add SSH key"

### Step 4: Update Git Remote to Use SSH

```bash
cd c:\Users\HP\OneDrive\Desktop\hrms
git remote set-url origin git@github.com:Mohit-cmd-jpg/hrms-lite.git
```

### Step 5: Test Connection

```bash
ssh -T git@github.com
```

Expected output: `Hi Mohit-cmd-jpg! You've successfully authenticated...`

### Step 6: Push Changes

```bash
git push origin master
```

---

## ✅ Solution 2: Use Personal Access Token (PAT)

### Step 1: Generate GitHub Personal Access Token

1. Go to https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Give it a name: "HRMS Git Push"
4. Select scopes: ✓ repo (full control)
5. Click "Generate token"
6. **Copy the token immediately** (you won't see it again)

### Step 2: Configure Git to Use Token

```bash
git config --global credential.helper manager-core
```

### Step 3: Clear Old Credentials

**Windows Git Credentials Manager**:

1. Open "Credential Manager" (Windows Start menu)
2. Click "Windows Credentials" or "Generic Credentials"
3. Find any entries for github.com
4. Delete them

### Step 4: Push Changes

```bash
cd c:\Users\HP\OneDrive\Desktop\hrms
git push origin master
```

When prompted:

- Username: `Mohit-cmd-jpg`
- Password: Paste your Personal Access Token

The system will save these credentials for future use.

---

## ✅ Solution 3: Switch GitHub Account (If You Own the Repo)

If you are Mohit-cmd-jpg (the repo owner):

### Clear Old Credentials

**Windows Credential Manager**:

1. Search "Credential Manager" in Start
2. Click "Manage Windows Credentials" or "Manage Generic Credentials"
3. Remove github.com credentials
4. Remove git:https://github.com credentials

### Re-login with Correct Account

```bash
cd c:\Users\HP\OneDrive\Desktop\hrms
git push origin master
# Follow the login prompt with Mohit-cmd-jpg credentials
```

---

## 🔍 Verify Current Configuration

```bash
# Check git config
git config --list --global

# Check current remote
git remote -v

# Check git credential helper
git config --global credential.helper
```

---

## ✅ After Fixing Authentication

Once authenticated correctly, run:

```bash
cd c:\Users\HP\OneDrive\Desktop\hrms

# Verify you're on master and up to date
git log --oneline -3

# Push the commits
git push origin master

# Verify push was successful
git log origin/master --oneline -3
```

**You should see output like**:

```
[master 7c1f5a2] feat: complete HRMS implementation...
 Your branch is up-to-date with 'origin/master'.
```

---

## 🆘 If You're Still Having Issues

1. **Check SSH key is working**: `ssh -T git@github.com`
2. **Verify correct remote**: `git remote -v`
3. **Try cloning again**:
   ```bash
   cd ~/Desktop
   git clone git@github.com:Mohit-cmd-jpg/hrms-lite.git
   ```

---

**Note**: The commits are already created locally and ready to push. Once you authenticate correctly, use `git push origin master` to upload them.
