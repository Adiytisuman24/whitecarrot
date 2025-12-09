# 🚀 Quick Start Guide

## Get Up and Running in 5 Minutes!

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

### Step 3: Open Browser
```
http://localhost:3000
```

## 🎯 Test the Platform

### As Recruiter

1. **Login**
   ```
   URL: http://localhost:3000/recruiter/login
   Email: hr@umbrellacorp.com
   ```

2. **View Dashboard**
   - See company badge: "Umbrella Corp"
   - Welcome message: "Welcome, David Kim"

3. **Manage Jobs**
   - Click "Job Listings" tab
   - Click "Manage" on "Full Stack Engineer"
   - See eligible candidates (80%+ match)
   - See rejected candidates

4. **Create DSA Question**
   - Click "DSA Questions" tab
   - Click "Add New Question"
   - Fill in details
   - Click eye icon to preview

### As Candidate

1. **Login**
   ```
   URL: http://localhost:3000/candidate/login
   Email: john.doe@example.com
   ```

2. **Optimize Resume**
   - Click "Resume AI" tab
   - Upload resume (any PDF/DOCX)
   - Select target company (e.g., "Google")
   - Click "Generate Optimized Resume"
   - Download optimized version

3. **Take DSA Test**
   ```
   URL: http://localhost:3000/dsa-test?questionId=dsa-1&candidateId=test
   ```
   - Click "Enable Camera & Start Test"
   - Write code
   - Run test cases
   - Submit

## 🔑 Login Credentials

### Recruiters
| Email | Company | Name |
|-------|---------|------|
| hr@umbrellacorp.com | Umbrella Corp | David Kim |
| hr@acmecorp.com | Acme Corp | Sarah Johnson |
| hr@globex.com | Globex Corp | Michael Chen |
| hr@soylentcorp.com | Soylent Corp | Emily Rodriguez |

### Candidates
| Email | Name |
|-------|------|
| john.doe@example.com | John Doe |
| jane.smith@example.com | Jane Smith |

## ✨ Key Features to Try

### 1. AI Resume Matching
- Login as recruiter
- Go to "Job Listings"
- See candidates with match scores
- Notice auto-rejection for <80% match

### 2. Camera Proctoring
- Go to DSA test URL
- Enable camera
- Try looking down → See CRITICAL alert
- Try having someone join → See alert
- After 3 violations → Auto-rejected

### 3. Resume Optimizer
- Login as candidate
- Upload resume
- Select company
- Download optimized version

### 4. DSA Questions
- Login as recruiter
- Create question with hints
- Add test cases
- Preview as candidate

## 🐛 Common Issues

### Port 3000 Busy
```bash
Stop-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess -Force
npm run dev
```

### Login Not Working
```bash
# Clear cache
Ctrl + Shift + Delete

# Clear localStorage (in browser console)
localStorage.clear()

# Hard refresh
Ctrl + Shift + R
```

### Resume Download Not Working
**Fixed!** Should work now. If not, check browser console for errors.

## 📚 Next Steps

1. Read full [README.md](./README.md)
2. Check [AI_PROCTORING_SYSTEM.md](./AI_PROCTORING_SYSTEM.md)
3. Review [DSA_TESTING_SYSTEM.md](./DSA_TESTING_SYSTEM.md)
4. Explore [GOLANG_BACKEND_GUIDE.md](./GOLANG_BACKEND_GUIDE.md)

## 🎉 You're All Set!

The platform is ready to use. Explore all features and enjoy! 🚀
