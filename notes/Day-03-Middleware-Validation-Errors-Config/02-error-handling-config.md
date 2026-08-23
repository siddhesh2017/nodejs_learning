# Day 3 - Error Handling and Configuration

## 1) Error handling goals

Good backend error handling should:
- Return correct HTTP status code.
- Keep response format predictable.
- Preserve debugging value in logs.
- Avoid leaking internal details to clients.

## 2) Error classes and semantics

Create domain-specific errors instead of generic Error everywhere.

Common examples:
- ValidationError -> 400
- UnauthorizedError -> 401
- ForbiddenError -> 403
- NotFoundError -> 404
- ConflictError -> 409
- ExternalServiceError -> 502/503

Centralized mapping keeps route code clean and avoids repeated
if/else status logic.

## 3) Centralized error middleware

One final middleware should:
- Inspect error type/code.
- Map to status and response body.
- Log details with request id.
- Hide stack traces in production responses.

Benefits:
- Consistency across endpoints.
- Faster incident debugging.
- Lower chance of accidental data leakage.

## 4) Sync vs async failures

Sync failure examples:
- JSON parse failure in a normal function
- direct throw in service method

Async failure examples:
- Promise reject from DB call
- timeout from external API call

Rule:
- Every async call must be awaited and wrapped/forwarded.
- Unhandled promise rejections should be treated as defects.

## 5) Configuration management strategy

Config should be environment-driven, not hardcoded.

Typical env values:
- PORT
- NODE_ENV
- LOG_LEVEL
- DATABASE_URL
- API keys/tokens

Startup validation:
- Fail fast if required config missing or invalid.
- Print clear startup error.

Environment separation:
- development: verbose logs, local dependencies.
- test: deterministic setup, isolated resources.
- production: secure defaults, minimal noise.

## 6) Secret safety basics

- Never commit .env with real secrets.
- Commit .env.example only.
- Rotate credentials periodically.
- Use cloud secret manager in production.

## 7) Common production mistakes

- Returning stack trace to client.
- Catching error but not setting failure status.
- Silent fallback that hides real failures.
- Missing startup config validation.

## 8) Quick recall

- Error design is API design.
- Fail fast on bad configuration.
- Log rich internals, return safe externals.

## My Notes
- 
