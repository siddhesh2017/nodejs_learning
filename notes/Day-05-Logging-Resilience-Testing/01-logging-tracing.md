# Day 5 - Logging and Request Tracing

## 1) Why logging is an engineering feature

Logging is not just for debugging after failure. It is a runtime observability
tool that helps answer:
- What happened?
- For which request/user?
- How long did it take?
- Where did it fail?

## 2) Structured logging

Prefer JSON-like structured logs over free-form sentences.

Minimum log fields:
- timestamp
- level
- message
- requestId/correlationId
- method/path/status
- durationMs

Optional useful fields:
- userId (if safe)
- service/component name
- external dependency name

## 3) Log level strategy

- debug: verbose local troubleshooting.
- info: normal business flow milestones.
- warn: recoverable anomaly.
- error: operation failed.

Production defaults typically avoid debug noise unless incident mode is enabled.

## 4) Request tracing basics

Attach a request id at request entry and include it in every downstream log.

Flow example:
API ingress -> service method -> external API call -> error handler

If all logs include the same id, incident investigation is significantly faster.

## 5) Sensitive data safety

Never log:
- passwords
- token values
- API secrets
- full PII payloads

If needed, log masked values only.

## 6) Common production mistakes

- Plain text logs with inconsistent format.
- No request id in multi-request systems.
- Logging stack traces for expected validation errors at error level.
- Excessive logs that hide real incidents.

## 7) Quick recall

- Logs are for humans and machines.
- Consistency beats verbosity.
- Correlation ids are mandatory for distributed debugging.

## My Notes
- 
