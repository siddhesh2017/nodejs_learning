# Node.js + TypeScript Learning Roadmap Checklist

How to use:
- Mark completed items with [x].
- Keep unfinished items as [ ].
- Mark skipped items with [skipped].
- Follow in order, but you can skip and return anytime.

## Week Plan Overview
- [ ] Day 1: Node.js fundamentals, runtime, modules, config, JSON file processing CLI (in progress)
- [ ] Day 2: HTTP fundamentals + Express API + CRUD
- [ ] Day 3: Middleware, validation, centralized error handling, environment config
- [ ] Day 4: OpenAPI docs, external API consumption, auth basics, role-based access
- [ ] Day 5: Logging, tracing, resilience basics, unit testing
- [ ] Day 6: Event loop practicals, concurrency, worker threads, streams/buffers
- [ ] Day 7: Caching, profiling, CI/CD, production-readiness review

---

## Day 1: Node.js Fundamentals + CLI Mini Project

### 1) Setup and project basics
- [x] Verify Node.js and npm versions
- [x] Verify Git setup
- [x] Initialize project with package.json
- [x] Configure TypeScript for Node.js (ES modules)
- [x] Add scripts: dev, build, start, typecheck
- [x] Create baseline folders (src, data, reports)

### 2) Runtime model and process
- [x] Understand process.argv usage
- [x] Understand process.env usage
- [x] Handle missing environment variables cleanly
- [x] Use process exit codes for failures

### 3) CommonJS vs ES Modules
- [✅] Understand difference between CJS and ESM
- [✅] Use ESM in project (type: module)
- [✅] Use correct import paths for Node ESM output

### 4) Node core modules (hands-on)
- [✅] Use node:fs/promises for file read/write
- [✅] Use node:path for safe path handling
- [✅] Use node:os for runtime info
- [✅] Use node:crypto for checksum/hash basics
- [✅] Use node:events for event-driven flow basics

### 5) Day 1 mini project tasks
- [✅] Build CLI entry point
- [✅] Read config from environment variables
- [✅] Read JSON file from provided path/default path
- [✅] Parse JSON and print summary
- [✅] Generate summary report file in reports/
- [x] Handle missing file and malformed JSON errors
- [skipped] Add strict TypeScript schema validation for parsed JSON

### 6) Day 1 quality checks
- [✅] Add .env and .env.example
- [✅] Ensure .env is in .gitignore
- [✅] Run typecheck without errors
- [✅] Run dev command successfully
- [✅] Run build and start successfully

---

## Day 2: HTTP + REST + Express (Customer API)

### 1) HTTP fundamentals
- [ ] Understand request/response lifecycle
- [ ] Understand methods: GET, POST, PUT/PATCH, DELETE
- [ ] Understand status codes: 200, 201, 204, 400, 404, 409, 500
- [ ] Understand headers, query params, path params, request body

### 2) Express setup
- [ ] Install Express and TypeScript types
- [ ] Create server entry file
- [ ] Add /health endpoint
- [ ] Add JSON body parser

### 3) Customer CRUD API
- [ ] Create in-memory customer store
- [ ] GET /customers
- [ ] GET /customers/:id
- [ ] POST /customers
- [ ] PUT or PATCH /customers/:id
- [ ] DELETE /customers/:id

### 4) API design basics
- [ ] Return consistent JSON shape
- [ ] Use proper status codes per endpoint
- [ ] Add simple pagination/filtering for list endpoint

---

## Day 3: Middleware + Validation + Errors + Configuration

### 1) Middleware
- [ ] Understand middleware execution order
- [ ] Add request logger middleware
- [ ] Add request ID middleware
- [ ] Add auth placeholder middleware

### 2) Validation
- [ ] Validate request body for create/update
- [ ] Validate path/query params
- [ ] Return clear 400 responses for invalid input

### 3) Error handling
- [ ] Create custom error classes
- [ ] Add centralized error middleware
- [ ] Handle async errors cleanly
- [ ] Avoid leaking internal stack traces in responses

### 4) Configuration management
- [ ] Load config from environment
- [ ] Add config validation at startup
- [ ] Separate dev/test/prod behavior via env values

---

## Day 4: API Documentation + External API + Auth Concepts

### 1) API documentation
- [ ] Learn OpenAPI basics
- [ ] Document customer endpoints
- [ ] Expose Swagger UI

### 2) External API consumption
- [ ] Use fetch/HTTP client to call public API
- [ ] Set headers and handle status codes
- [ ] Add timeout handling
- [ ] Transform external response to internal model

### 3) Authentication and authorization
- [ ] Understand API key vs JWT vs OAuth concepts
- [ ] Implement simple auth flow for learning
- [ ] Add role-based access checks (example: user/admin)
- [ ] Keep credentials and secrets secure

---

## Day 5: Logging + Tracing + Resilience + Unit Testing

### 1) Logging and tracing
- [ ] Add structured logging format
- [ ] Add log levels (info/warn/error)
- [ ] Include request ID/correlation ID in logs
- [ ] Avoid logging sensitive data

### 2) External API resilience basics
- [ ] Handle timeout errors
- [ ] Handle non-2xx errors
- [ ] Handle malformed external responses
- [ ] Add bounded retry logic
- [ ] Add fallback behavior where reasonable

### 3) Unit testing
- [ ] Setup test framework
- [ ] Write service-level unit tests
- [ ] Mock repository/external API calls
- [ ] Test success and failure paths

---

## Day 6: Event Loop + Concurrency + Worker Threads + Streams

### 1) Event loop practical understanding
- [ ] Understand blocking vs non-blocking behavior
- [ ] Create small examples to observe impact
- [ ] Measure effect on concurrent requests

### 2) Concurrency patterns
- [ ] Use Promise.all for independent operations
- [ ] Keep sequential execution where dependency exists
- [ ] Compare execution times (sequential vs parallel)

### 3) CPU-intensive work
- [ ] Simulate CPU-heavy task
- [ ] Move CPU-heavy task to worker thread
- [ ] Compare responsiveness before/after

### 4) Streams and buffers
- [ ] Understand readable and writable streams
- [ ] Use pipe and backpressure concepts
- [ ] Build endpoint that streams large file/data

---

## Day 7: Caching + Profiling + CI/CD + Production Readiness

### 1) Caching
- [ ] Add simple TTL cache for frequent reads
- [ ] Handle cache invalidation basics
- [ ] Measure cached vs uncached performance

### 2) Performance profiling
- [ ] Introduce intentional bottleneck
- [ ] Detect bottleneck with logs/profiling
- [ ] Document findings and fix

### 3) CI/CD and quality gates
- [ ] Add linting and formatting scripts
- [ ] Ensure tests run in CI
- [ ] Add vulnerability scan step
- [ ] Create CI workflow for install, lint, test, build

### 4) Production readiness checklist
- [ ] Add health and readiness endpoints
- [ ] Add graceful shutdown handling
- [ ] Finalize README setup and runbook notes
- [ ] Review security and error-handling basics

---

## Optional Extensions (After Week)
- [ ] Migrate to PostgreSQL + migrations
- [ ] Add Redis cache layer
- [ ] Add Docker setup and deployment workflow
- [ ] Integrate real OAuth/OIDC provider
- [ ] Add rate limiting and security headers
- [ ] Add OpenTelemetry metrics/traces
- [ ] Add load testing and optimization pass
- [ ] Deploy to cloud environment

---

## Progress Log
- [x] Week started
- [ ] Day 1 completed
- [ ] Day 2 completed
- [ ] Day 3 completed
- [ ] Day 4 completed
- [ ] Day 5 completed
- [ ] Day 6 completed
- [ ] Day 7 completed
- [ ] Optional extensions started
