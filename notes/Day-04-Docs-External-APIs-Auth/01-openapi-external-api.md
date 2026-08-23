# Day 4 - OpenAPI and External API Consumption

## 1) OpenAPI basics

OpenAPI is a formal contract describing your HTTP API.

It usually defines:
- Endpoint paths and methods.
- Request parameters and body schema.
- Response schemas and status codes.
- Authentication requirements.

Why this matters in teams:
- Backend and frontend build against the same contract.
- API consumers know exactly how to call endpoints.
- Changes become visible and reviewable as contract diffs.

## 2) Documentation quality rules

For each endpoint document:
- Purpose in one sentence.
- Required auth scope/role.
- Required params and body fields.
- All major success and failure responses.

Bad docs increase integration bugs more than bad code comments.

## 3) External API consumption strategy

When calling third-party APIs, treat them as unreliable dependencies.

Minimum safe outbound call pattern:
1. Set request timeout.
2. Add required headers/auth.
3. Handle non-2xx status explicitly.
4. Parse and validate response shape.
5. Map to internal model.
6. Log failures with request correlation metadata.

## 4) Why model mapping is important

Do not expose external API response shape directly to your clients.

Reason:
- Third-party contract changes can break your own API unexpectedly.
- Internal model gives stability and control.

## 5) Common external API failures

- Timeout due to slow dependency.
- DNS or network failures.
- Auth failures (401/403).
- Rate limiting (429).
- Partial/malformed JSON response.

Each failure should map to clear internal error behavior.

## 6) Common production mistakes

- No timeout (request hangs).
- Blindly trusting response structure.
- Retrying every error blindly.
- Leaking third-party raw errors to client.

## 7) Quick recall

- OpenAPI is a contract, not just documentation.
- External APIs are dependencies with failure risk.
- Validate and map all external responses.

## My Notes
- 
