-- ==============================================================================
-- BRICS-CLIMATY: Supabase Database Schema
-- Run this SQL in your Supabase SQL Editor (Dashboard -> SQL Editor -> New Query)
-- ==============================================================================

-- 1. Feedback & Inquiries Table
create table if not exists public.feedback (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  email text not null,
  organization text,
  category text default 'General Feedback',
  rating integer default 5,
  nps_score integer default 9,
  subject text,
  message text not null,
  subscribe_newsletter boolean default true,
  status text default 'new' -- 'new', 'reviewed', 'resolved'
);

-- 2. Consultation & Energy Audit Inquiries Table
create table if not exists public.contact_inquiries (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  email text not null,
  company text,
  service text,
  energy_bill text,
  message text,
  status text default 'new' -- 'new', 'contacted', 'in-progress', 'closed'
);

-- 3. Newsletter Subscribers Table
create table if not exists public.newsletter_subscribers (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  email text unique not null,
  status text default 'active'
);

-- ==============================================================================
-- Row Level Security (RLS) Policies
-- Enables safe direct inserts from the web frontend without exposing write/delete
-- ==============================================================================

alter table public.feedback enable row level security;
alter table public.contact_inquiries enable row level security;
alter table public.newsletter_subscribers enable row level security;

-- Allow anonymous users to submit feedback
create policy "Allow public insert to feedback"
on public.feedback
for insert
to anon, authenticated
with check (true);

-- Allow anonymous users to submit contact/audit requests
create policy "Allow public insert to contact_inquiries"
on public.contact_inquiries
for insert
to anon, authenticated
with check (true);

-- Allow anonymous users to subscribe to newsletter
create policy "Allow public insert to newsletter_subscribers"
on public.newsletter_subscribers
for insert
to anon, authenticated
with check (true);
