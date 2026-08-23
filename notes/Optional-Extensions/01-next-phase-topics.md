# Optional Extensions - Next Phase Topics

## 1) Data and persistence next step

When moving from in-memory storage to production persistence:
- Add PostgreSQL repository layer.
- Create migration strategy for schema evolution.
- Add indexes for common query paths.
- Use transactions where multiple writes must stay consistent.

What to study deeply:
- Connection pooling
- Query plans and performance tuning
- Data integrity constraints

## 2) Platform and deployment

Containerization and deployment topics:
- Dockerfile with minimal runtime image.
- Multi-environment configuration strategy.
- Secrets management through vault/cloud secret manager.

Deployment quality goals:
- Reproducible builds
- Fast rollback
- Environment parity

## 3) Observability maturity

Beyond logs:
- Metrics (latency, throughput, error rate, saturation)
- Tracing (request journey across services)
- Alerts based on SLO/SLA targets

Tools and standards:
- OpenTelemetry for traces/metrics/log correlation.

## 4) Reliability and performance growth

Advanced reliability patterns:
- Queue-based async processing for heavy/slow work.
- Distributed cache with Redis.
- Capacity planning and load testing.
- Failure injection/chaos style drills for confidence.

## 5) Security hardening track

Security upgrades after baseline implementation:
- Rate limiting and abuse controls
- Security headers and CORS hardening
- Dependency vulnerability policy and patch cadence
- Threat modeling for critical flows
- Audit and incident response runbooks

## 6) Suggested learning order for extensions

1. PostgreSQL + migrations
2. Docker + deployment basics
3. Redis + queue
4. Observability stack
5. Security hardening and load testing

## My Notes
- 
