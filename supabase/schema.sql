-- Run this in Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)

create table if not exists clicks (
  id           uuid        default gen_random_uuid() primary key,
  program_id   text        not null,
  program_name text        not null,
  category     text,
  referrer     text        default 'direct',
  page         text,
  created_at   timestamptz default now()
);

-- Index for fast queries by date
create index if not exists clicks_created_at_idx on clicks (created_at desc);
create index if not exists clicks_program_id_idx on clicks (program_id);

-- Row Level Security
alter table clicks enable row level security;

-- Anyone can insert (track a click from the public site)
create policy "public_insert" on clicks
  for insert
  with check (true);

-- Only authenticated users can read (your admin cabinet)
create policy "auth_select" on clicks
  for select
  using (auth.uid() is not null);
