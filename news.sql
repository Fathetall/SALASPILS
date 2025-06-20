create table news (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  content text,
  created_at timestamptz default now()
);