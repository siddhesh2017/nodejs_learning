# Day 7 - CI/CD and Production Readiness

## 1) CI/CD purpose

CI/CD ensures code quality checks happen automatically and consistently.

CI (continuous integration):
- Validates every change through automated checks.

CD (continuous delivery/deployment):
- Automates release process with safety controls.

## 2) Minimum CI pipeline for this project

1. Install dependencies using lockfile.
2. Run formatting/lint checks.
3. Run tests.
4. Build the project.
5. Optional vulnerability/dependency scan.

If any step fails, merge should be blocked until fixed.

## 3) Why lockfile matters

Lockfile ensures deterministic dependency versions across developer machines
and CI runners. This reduces "works on my machine" failures.

## 4) Production readiness essentials

Health endpoint:
- Indicates service is alive.

Readiness endpoint:
- Indicates service can handle traffic safely (dependencies ready).

Graceful shutdown:
- On SIGTERM/SIGINT, stop accepting new requests, finish in-flight requests,
  release resources, then exit.

Startup validation:
- Fail fast when required config is missing.

Operational documentation:
- README should include run commands, env vars, troubleshooting basics.

## 5) Security and reliability gates

- Avoid secret leaks in logs.
- Enforce dependency update policy.
- Ensure outbound timeouts exist.
- Ensure error responses are standardized.

## 6) Common production mistakes

- CI green but no meaningful tests.
- No rollback strategy after failed deployment.
- No readiness check, causing traffic to unhealthy pods/instances.
- Deploying with debug-level logging noise by default.

## 7) Quick recall

- CI protects main branch quality.
- Production readiness is mostly about failure handling and operations.

## My Notes
- 
