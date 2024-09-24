CREATE EXTENSION IF NOT EXISTS pgcrypto;

SET
  LOCAL statement_timeout = '30s';

SELECT
  pg_advisory_xact_lock(
    (
      'x' || md5(current_database() || '.pgboss.pgboss')
    ) :: bit(64) :: bigint
  );

CREATE SCHEMA IF NOT EXISTS pgboss;

CREATE TABLE pgboss.version (
  version int primary key,
  maintained_on timestamp with time zone,
  cron_on timestamp with time zone
);

CREATE TYPE pgboss.job_state AS ENUM (
  'created',
  'retry',
  'active',
  'completed',
  'expired',
  'cancelled',
  'failed'
);

CREATE TABLE pgboss.job (
  id uuid primary key not null default gen_random_uuid(),
  name text not null,
  priority integer not null default(0),
  data jsonb,
  state pgboss.job_state not null default('created'),
  retryLimit integer not null default(0),
  retryCount integer not null default(0),
  retryDelay integer not null default(0),
  retryBackoff boolean not null default false,
  startAfter timestamp with time zone not null default now(),
  startedOn timestamp with time zone,
  singletonKey text,
  singletonOn timestamp without time zone,
  expireIn interval not null default interval '15 minutes',
  createdOn timestamp with time zone not null default now(),
  completedOn timestamp with time zone,
  keepUntil timestamp with time zone NOT NULL default now() + interval '14 days',
  on_complete boolean not null default false,
  output jsonb
);

CREATE TABLE pgboss.archive (LIKE pgboss.job);

CREATE TABLE pgboss.schedule (
  name text primary key,
  cron text not null,
  timezone text,
  data jsonb,
  options jsonb,
  created_on timestamp with time zone not null default now(),
  updated_on timestamp with time zone not null default now()
);

CREATE TABLE pgboss.subscription (
  event text not null,
  name text not null,
  created_on timestamp with time zone not null default now(),
  updated_on timestamp with time zone not null default now(),
  PRIMARY KEY(event, name)
);

CREATE INDEX archive_id_idx ON pgboss.archive(id);

ALTER TABLE
  pgboss.archive
ADD
  archivedOn timestamptz NOT NULL DEFAULT now();

CREATE INDEX archive_archivedon_idx ON pgboss.archive(archivedon);

CREATE INDEX job_name ON pgboss.job (name text_pattern_ops);

CREATE INDEX job_fetch ON pgboss.job (name text_pattern_ops, startAfter)
WHERE
  state < 'active';

CREATE UNIQUE INDEX job_singletonOn ON pgboss.job (name, singletonOn)
WHERE
  state < 'expired'
  AND singletonKey IS NULL;

CREATE UNIQUE INDEX job_singletonKeyOn ON pgboss.job (name, singletonOn, singletonKey)
WHERE
  state < 'expired';

CREATE UNIQUE INDEX job_singletonKey ON pgboss.job (name, singletonKey)
WHERE
  state < 'completed'
  AND singletonOn IS NULL
  AND NOT singletonKey LIKE '\_\_pgboss\_\_singleton\_queue%';

CREATE UNIQUE INDEX job_singleton_queue ON pgboss.job (name, singletonKey)
WHERE
  state < 'active'
  AND singletonOn IS NULL
  AND singletonKey LIKE '\_\_pgboss\_\_singleton\_queue%';

INSERT INTO
  pgboss.version(version)
VALUES
  ('20');