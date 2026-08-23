# Day 5 - Resilience Basics and Testing

## 1) Why resilience matters

Every external dependency can fail. Good backend systems assume this from day 1.

Failure types:
- Network timeout
- DNS/connectivity issue
- Dependency returns 5xx
- Dependency returns malformed payload
- Rate limit responses (429)

## 2) Minimum outbound call protections

Timeout:
- Required on every call.
- Prevents request hangs and resource exhaustion.

Bounded retry:
- Retry only a limited number of times.
- Prefer exponential backoff.
- Retry only retryable failure types.

Fallback:
- Return cached/default/degraded response where acceptable.
- Must be explicit and measurable.

## 3) Avoiding retry storms

Retry storms happen when many requests retry aggressively together.

Prevention:
- Retry limits.
- Backoff with jitter.
- Do not retry validation/auth failures.
- Use circuit breaker for repeated dependency failures.

## 4) Circuit breaker basics

States:
- Closed: traffic flows normally.
- Open: requests fail fast without calling dependency.
- Half-open: limited probe calls test recovery.

Benefit:
- Protects your service from cascading latency/failure.

## 5) Unit testing strategy

Test behavior, not implementation details.

Good unit tests verify:
- Expected output for valid input.
- Validation and error paths.
- Correct mapping of dependency failures.

Use mocks/fakes for:
- repository layer
- external API clients
- clock/time-dependent logic if needed

## 6) Common testing mistakes

- Over-mocking internal functions and coupling to refactors.
- Only testing happy path.
- Not testing timeout/retry/fallback behavior.
- No assertions on error code/status mapping.

## 7) Quick recall

- Resilience is planned behavior under dependency failure.
- Tests should prove correctness of both success and failure paths.

## My Notes
- 
