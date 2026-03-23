# To set up your HRMS with a working database:

1. Go to https://supabase.com and create a free account
2. Create a new project with these settings:
   - Region: US East (Virginia)
   - Database password: (choose a strong password)
3. After creation, go to Project Settings > API
4. Copy the following:
   - URL (under Project URL)
   - anon public key (under Project API keys)

5. Add these to Vercel environment variables:
   - NEXT_PUBLIC_SUPABASE_URL = [your Supabase URL]
   - NEXT_PUBLIC_SUPABASE_ANON_KEY = [your anon key]

6. Run this SQL in the Supabase SQL Editor:

CREATE TABLE IF NOT EXISTS employees (
id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
employee_id TEXT UNIQUE NOT NULL,
full_name TEXT NOT NULL,
email TEXT NOT NULL,
department TEXT NOT NULL,
created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS attendance (
id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
employee_id TEXT NOT NULL REFERENCES employees(employee_id) ON DELETE CASCADE,
date DATE NOT NULL,
status TEXT NOT NULL CHECK (status IN ('Present', 'Absent')),
created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
UNIQUE(employee_id, date)
);

CREATE INDEX IF NOT EXISTS idx_attendance_employee_date ON attendance(employee_id, date);
CREATE INDEX IF NOT EXISTS idx_employees_employee_id ON employees(employee_id);

7. Redeploy in Vercel
