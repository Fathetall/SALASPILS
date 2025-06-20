create table events (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  date timestamptz,
  location text
);