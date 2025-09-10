-- Baseline schema for existing tutorial app.
-- Uses IF NOT EXISTS so it's safe to run on a DB that already has these tables.

create table if not exists companies (
  id bigserial primary key,
  company_name text not null
);

create table if not exists employees (
  id bigserial primary key,
  first_name text not null,
  last_name text not null,
  email_id text not null,
  comp_id integer not null
);

-- Note: original table name uses capital 'T'
create table if not exists "Tasks" (
  id bigserial primary key,
  emp_id integer not null,
  task_name text not null
);

-- Optional indexes you likely want; IF NOT EXISTS requires Postgres 9.5+ (you have newer)
do $$
begin
  if not exists (select 1 from pg_indexes where schemaname = 'public' and indexname = 'idx_employees_comp_id') then
    execute 'create index idx_employees_comp_id on employees (comp_id)';
  end if;

  if not exists (select 1 from pg_indexes where schemaname = 'public' and indexname = 'idx_tasks_emp_id') then
    execute 'create index idx_tasks_emp_id on "Tasks" (emp_id)';
  end if;
end$$;
