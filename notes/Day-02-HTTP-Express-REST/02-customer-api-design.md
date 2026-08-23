# Day 2 - Customer API Design Notes

## 1) Resource modeling and naming

Use resource-oriented naming, not action-oriented naming.

Recommended:
- /customers for collection operations
- /customers/:id for single-resource operations

Avoid names like:
- /getCustomers
- /createCustomer

Reason:
- HTTP method already describes action.
- Cleaner, predictable API for frontend and external consumers.

## 2) CRUD route mapping

- GET /customers
	- List customers, optionally with filters and pagination.
- GET /customers/:id
	- Fetch one customer by unique id.
- POST /customers
	- Create customer.
- PUT /customers/:id or PATCH /customers/:id
	- Update customer.
- DELETE /customers/:id
	- Delete customer.

## 3) Request and response contract consistency

Consistency reduces frontend bugs and improves debuggability.

Example response pattern:
- Success:
	- success: true
	- data: payload
- Failure:
	- success: false
	- error: { code, message, details? }

You do not have to use this exact shape, but once chosen,
keep it stable across all endpoints.

## 4) Validation boundaries

Validate input at controller boundary:
- Path params (id format)
- Query params (page, limit)
- Body fields (required and type checks)

Do not rely on frontend validation.

## 5) Pagination and filtering basics

Common query params:
- page (1-based)
- limit
- search
- status/active

Safety rules:
- Parse strings to numbers explicitly.
- Enforce max limit to protect API performance.

## 6) In-memory first, repository abstraction always

For learning speed, start with in-memory storage.
Still keep a repository interface/abstraction so you can swap in
PostgreSQL later without breaking service/controller logic.

## 7) Common production mistakes

- Leaking internal error objects directly in API response.
- No duplicate/conflict check on create.
- Returning different response shapes across endpoints.
- Over-fetching large lists without pagination.

## 8) Quick recall

- Think in resources, not actions.
- Keep contract stable.
- Validate at boundaries.
- Separate transport, business, and persistence layers.

## My Notes
- 
