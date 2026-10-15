-- ==========================================================
-- TeacherOS PostgreSQL Schema for Supabase (100% Free Tier)
-- ==========================================================

-- 1. Profiles Table (Teachers & Students)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  role text check (role in ('teacher', 'student')) default 'student',
  full_name text not null,
  email text,
  telegram_username text,
  avatar_url text,
  created_at timestamptz default timezone('utc'::text, now()) not null
);

-- 2. Curriculums Table (Generated Lesson Plans & Slides)
create table if not exists public.curriculums (
  id text primary key,
  teacher_id uuid references public.profiles(id) on delete set null,
  topic text not null,
  level text not null,
  data jsonb not null,
  created_at timestamptz default timezone('utc'::text, now()) not null
);

-- 3. Student Submissions & Mastery Progress
create table if not exists public.student_submissions (
  id uuid default gen_random_uuid() primary key,
  student_id uuid references public.profiles(id) on delete set null,
  student_name text not null,
  syllabus_level text not null check (syllabus_level in ('A1', 'A2', 'B1', 'B2', 'C1')),
  topic_id integer not null,
  topic_title text not null,
  score integer not null,
  total_questions integer not null,
  percent integer not null,
  mistakes jsonb default '[]'::jsonb,
  created_at timestamptz default timezone('utc'::text, now()) not null
);

-- 4. Enable Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.curriculums enable row level security;
alter table public.student_submissions enable row level security;

-- Policies for Profiles
create policy "Public profiles are viewable by everyone" 
  on public.profiles for select using (true);

create policy "Users can update their own profile" 
  on public.profiles for update using (auth.uid() = id);

create policy "Users can insert their own profile" 
  on public.profiles for insert with check (auth.uid() = id);

-- Policies for Curriculums
create policy "Anyone can read curriculums" 
  on public.curriculums for select using (true);

create policy "Authenticated users can insert curriculums" 
  on public.curriculums for insert with check (auth.role() = 'authenticated');

-- Policies for Student Submissions
create policy "Anyone can insert submissions" 
  on public.student_submissions for insert with check (true);

create policy "Submissions are viewable by authenticated users or teachers" 
  on public.student_submissions for select using (true);

-- Indexes for performance
create index if not exists idx_submissions_student_name on public.student_submissions(student_name);
create index if not exists idx_submissions_topic on public.student_submissions(syllabus_level, topic_id);
create index if not exists idx_submissions_created_at on public.student_submissions(created_at desc);
create index if not exists idx_curriculums_teacher on public.curriculums(teacher_id);
