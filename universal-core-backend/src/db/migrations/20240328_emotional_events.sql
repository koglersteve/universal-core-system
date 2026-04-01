create table emotional_events (
  id uuid primary key default gen_random_uuid(),
  app text not null,
  type text not null,
  ts bigint not null,

  mood text,
  world text,
  trait text,
  agent text,

  physics_momentum float,
  identity_profile text,

  payload jsonb,

  created_at timestamptz default now()
);

create index idx_events_ts on emotional_events(ts);
create index idx_events_app on emotional_events(app);
create index idx_events_world on emotional_events(world);
create index idx_events_mood on emotional_events(mood);
create index idx_events_trait on emotional_events(trait);
create index idx_events_agent on emotional_events(agent);
