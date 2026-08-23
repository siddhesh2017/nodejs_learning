# Day 2 - HTTP, REST and Express Basics

## 1) HTTP request and response fundamentals

Every API interaction is an HTTP request followed by an HTTP response.

Request contains:
- Method: GET, POST, PUT, PATCH, DELETE
- URL: path + query string
- Headers: metadata such as content-type and authorization
- Optional body: mostly for POST/PUT/PATCH

Response contains:
- Status code
- Headers
- Optional response body (usually JSON for APIs)

## 2) Semantics of common HTTP methods

- GET: read data, should not modify server state.
- POST: create a new resource.
- PUT: full update or replace resource.
- PATCH: partial update.
- DELETE: remove resource.

Understanding method semantics improves client compatibility,
caching behavior, and API clarity.

## 3) Status codes you will use frequently

- 200 OK: successful read/update with response body.
- 201 Created: successful creation, often returns created resource.
- 204 No Content: success with no response body.
- 400 Bad Request: invalid input from client.
- 401 Unauthorized: missing/invalid authentication.
- 403 Forbidden: authenticated but not allowed.
- 404 Not Found: resource does not exist.
- 409 Conflict: duplicate or business conflict.
- 500 Internal Server Error: unexpected server failure.

## 4) What Express gives you

Express is a minimal web framework that provides:
- Routing by method and path.
- Middleware pipeline for cross-cutting concerns.
- Utilities for request parsing and response formatting.
- Cleaner organization than raw node:http server code.

Express does not replace good architecture by itself. You still need to
separate route handling, business logic, and data access.

## 5) Recommended API flow in this project

Client -> Router -> Controller -> Service -> Repository -> Response

Responsibilities:
- Router: path/method mapping.
- Controller: input/output wiring.
- Service: business rules.
- Repository: data storage abstraction.

## 6) Common production mistakes

- Returning 200 for everything, including failures.
- Mixing business logic directly inside route handlers.
- Trusting request body/query without validation.
- Returning inconsistent error response shapes.

## 7) Quick recall

- Method + status code + response shape form the API contract.
- Express handles transport concerns, not business correctness.

## My Notes
- 
