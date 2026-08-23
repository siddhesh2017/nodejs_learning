# Day 1 - Core Modules and CLI Basics

## 1) Why Node core modules matter

Before installing npm packages, check if Node core already provides what you
need. Core modules are stable, well-tested, and reduce dependency overhead.

Core-first mindset:
- Fewer dependencies means smaller attack surface.
- Less version conflict and maintenance work.
- Better understanding of underlying runtime behavior.

## 2) fs/promises

What it solves:
- Non-blocking file operations using async/await.

Use cases in this project:
- Read JSON input files.
- Write generated summary/report files.

Safe usage rules:
- Always specify encoding for text files (utf-8).
- Wrap file I/O in try/catch.
- Avoid synchronous fs methods in API request paths.

## 3) path

What it solves:
- Cross-platform path building (Windows vs Linux separators).

Use cases:
- Build report paths safely.
- Resolve relative inputs against project root.

Safe usage:
- Use path.resolve() for absolute normalized paths.
- Use path.join() for path composition.
- Never manually concatenate with "/" or "\\".

## 4) os

What it solves:
- Access runtime environment metadata.

Useful fields:
- os.platform()
- os.cpus().length
- os.totalmem()

Use carefully:
- Good for diagnostics and startup logs.
- Do not hardcode behavior solely based on platform checks.

## 5) crypto

What it solves:
- Data integrity and security primitives.

For your current stage:
- Create a file checksum (for example SHA-256) from raw JSON text.
- Useful to detect if input changed.

Important distinction:
- Hashing is one-way fingerprinting, not encryption.

## 6) events

What it solves:
- Decouples process stages from side effects.

Example pattern for CLI:
- Emit processing:start
- Emit processing:fileRead
- Emit processing:summaryReady
- Emit processing:error

Benefit:
- Logging/metrics can subscribe without polluting business logic.

## 7) CLI architecture pattern

Simple reliable flow:
1. Read argv and env.
2. Validate required inputs.
3. Read source data.
4. Parse and validate shape.
5. Compute summary.
6. Output result or save report.
7. Set process.exitCode on failure.

## 8) Common production mistakes

- Using fs.readFileSync in server endpoints.
- Assuming env vars always exist.
- Printing full stack traces for user-facing CLI output.
- Coupling path logic to one operating system.

## 9) Quick recall

- Start with Node core modules first.
- Keep CLI errors clear and deterministic.
- Use async I/O and explicit input validation.

## My Notes
- 
