-- 1) Rename companies -> departments (if needed)
do $$
begin
  if exists (select 1 from information_schema.tables where table_schema='public' and table_name='companies')
     and not exists (select 1 from information_schema.tables where table_schema='public' and table_name='departments') then
    execute 'alter table public.companies rename to departments';
  end if;
end$$;

-- Ensure departments exists (safety)
create table if not exists departments (
  id   bigserial primary key,
  name text not null
);

-- If departments still has old column name, rename it
do $$
begin
  if exists (
      select 1 from information_schema.columns
      where table_schema='public' and table_name='departments' and column_name='company_name'
  ) then
    execute 'alter table public.departments rename column company_name to name';
  end if;
end$$;

-- 2) Rename "Tasks" (quoted) -> tasks (lowercase)
do $$
begin
  if exists (select 1 from information_schema.tables where table_schema='public' and table_name='Tasks') then
    if not exists (select 1 from information_schema.tables where table_schema='public' and table_name='tasks') then
      execute 'alter table public."Tasks" rename to tasks';
    else
      -- both exist: move rows then drop old
      execute 'insert into public.tasks (id, emp_id, task_name)
               select id, emp_id, task_name from public."Tasks"
               on conflict do nothing';
      execute 'drop table public."Tasks"';
    end if;
  end if;
end$$;

-- 3) Clean orphans BEFORE adding FKs (tutorial-safe choice)
-- Remove employees that point to missing departments
delete from public.employees e
where not exists (select 1 from public.departments d where d.id = e.comp_id);

-- Remove tasks that point to missing employees
delete from public.tasks t
where not exists (select 1 from public.employees e where e.id = t.emp_id);

-- 4) Add FKs (if not existing)
do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'fk_employees_comp_id') then
    execute '
      alter table public.employees
      add constraint fk_employees_comp_id
      foreign key (comp_id) references public.departments(id)
      on update cascade
      on delete restrict
    ';
  end if;
end$$;

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'fk_tasks_emp_id') then
    execute '
      alter table public.tasks
      add constraint fk_tasks_emp_id
      foreign key (emp_id) references public.employees(id)
      on update cascade
      on delete cascade
    ';
  end if;
end$$;

-- 5) Unique (case-insensitive) email for employees
do $$
declare dup_count integer;
begin
  select count(*) into dup_count from (
    select lower(email_id) as e, count(*) from public.employees group by lower(email_id) having count(*) > 1
  ) s;

  if dup_count = 0 then
    if not exists (select 1 from pg_indexes where schemaname='public' and indexname='uq_employees_email_lower') then
      execute 'create unique index uq_employees_email_lower on public.employees (lower(email_id))';
    end if;
  else
    raise notice 'Skipping unique email index: found % duplicate email(s). Resolve duplicates and create the index manually.', dup_count;
  end if;
end$$;
