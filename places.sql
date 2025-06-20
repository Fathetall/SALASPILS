create table places (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  type text,
  lat double precision,
  lng double precision,
  address text
);