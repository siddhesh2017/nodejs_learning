# Day 3 - Middleware and Validation

## 1) Middleware concept

Middleware is a function that runs in the request pipeline before final
response is sent. It is one of the most important concepts in Express.

Each middleware can:
- Read request data.
- Add values to request context (for example requestId, user).
- Reject request early (for example auth/validation failure).
- Forward to next middleware using next().

## 2) Why middleware matters in production

Middleware centralizes repeated logic such as:
- Logging
- Authentication
- Request tracing
- Validation
- Error normalization

Without middleware, these concerns are duplicated in every route, which causes
inconsistency and hidden bugs.

## 3) Recommended execution order

1. request id middleware
2. request logger middleware
3. body parser middleware
4. authentication middleware
5. authorization middleware (if role-based)
6. validation middleware
7. route handlers
8. not found handler
9. centralized error handler

Order is critical. A wrong order can log incomplete info, bypass auth,
or swallow useful error metadata.

## 4) Validation strategy

Validate all external inputs at API boundary:
- request body
- path params
- query params
- headers if required

Validation should check:
- required fields
- type correctness
- value constraints (range, enum, format)
- business constraints if they belong at boundary

## 5) Validation response quality

A useful 400 response should include:
- stable error code
- short top-level message
- list of field errors when possible

Example style:
- code: INVALID_INPUT
- message: Request validation failed
- details: [{ field: "email", message: "Invalid email format" }]

## 6) Common production mistakes

- Validating only body, ignoring query/path params.
- Throwing generic 500 for client validation errors.
- Logging request body with secrets/tokens.
- Placing error handler before routes.

## 7) Quick recall

- Middleware is your cross-cutting architecture layer.
- Validation belongs at boundary, not deep in data layer only.
- Middleware order determines behavior correctness.

## My Notes
- 
