# Day 4 - Authentication and Authorization

## 1) Authentication vs authorization

Authentication answers:
- Who is calling this API?

Authorization answers:
- Is this caller allowed to perform this action?

You need both. Authentication without authorization leads to over-permission.

## 2) Common auth mechanisms

API key:
- Simple, useful for basic service-to-service access.
- Weaker identity model, not user-centric.

JWT access token:
- Signed token carrying claims (for example userId, role, exp).
- Stateless verification possible with signature key.

Refresh token:
- Used to issue new access tokens without full re-login.
- Must be protected and rotated carefully.

OAuth/OIDC:
- Delegated authentication through trusted identity provider.
- Preferred for real production user auth flows.

## 3) Authorization patterns

Role-based access control (RBAC):
- viewer: read operations only
- manager/admin: create/update/delete operations

Policy should be explicit and centralized, not scattered in each route.

## 4) Token safety essentials

- Verify token signature and expiry.
- Validate audience/issuer where applicable.
- Reject tokens with invalid format immediately.
- Never trust role claims without verification.

## 5) Secret handling

- Never hardcode secrets in source.
- Keep secrets in environment or secret manager.
- Rotate compromised/expired keys.
- Use HTTPS to prevent token leakage in transit.

## 6) Logging and auth

Do log:
- auth success/failure status
- request id, user id (if available)

Do not log:
- full tokens
- passwords
- secret keys

## 7) Common production mistakes

- Using long-lived tokens without refresh strategy.
- Storing secrets in plain repository files.
- Returning detailed auth internals to attackers.
- Mixing auth logic in business services with no boundary middleware.

## 8) Quick recall

- AuthN identifies, AuthZ permits.
- Protect tokens like passwords.
- Centralize policy checks.

## My Notes
- 
