# Day 1 - Runtime and Modules

## 1) Node.js runtime model

Node.js is a JavaScript runtime built on the V8 engine. It is designed for
I/O-heavy applications such as APIs, gateways, and real-time services.

Key model:
- JavaScript runs on a single main thread.
- Node uses an event loop to schedule callbacks and promise continuations.
- Heavy I/O (file, network, DNS, timers) is coordinated by libuv.

Important implication:
- Fast, non-blocking I/O scales well.
- CPU-heavy synchronous code can block all incoming requests.

## 2) process object essentials

The process object gives runtime context and process-level controls.

Most used properties in this roadmap:
- process.argv
	- Command line args.
	- Index 0 is node executable path, index 1 is script path, user args start at 2.
- process.env
	- Environment variables.
	- Values are strings or undefined, never auto-converted to numbers/booleans.
- process.cwd()
	- Current working directory.
	- Useful for resolving relative files safely.
- process.exitCode
	- Set to non-zero for failure without abrupt process.exit().
	- Preferred for cleaner shutdown and testing.
- process.pid
	- Process id. Useful for debugging and logs.

## 3) CommonJS vs ES Modules (CJS vs ESM)

CommonJS (older Node style):
- Import: const x = require("module")
- Export: module.exports = ...
- File extensions often .cjs or .js in old codebases

ES Modules (modern JS standard):
- Import: import x from "module"
- Export: export const ...
- File extensions .mjs, or .js with package.json type: module

Practical differences:
- ESM has static import/export analysis.
- ESM supports top-level await.
- Tooling and TypeScript integration are generally cleaner with ESM now.
- CJS remains common in legacy packages and some older tutorials.

## 4) Why this project uses ESM

- Better long-term compatibility with modern Node + TypeScript ecosystem.
- Cleaner module boundaries for large backend codebases.
- Easier migration path toward advanced build/test tooling.

## 5) How ESM is confirmed in your project

- package.json has type: module
- tsconfig.json uses module: nodenext
- Relative imports in TS include output extension style:
	- import { printRuntimeInfo } from "./runtime-info.js"

## 6) Common production mistakes

- Mixing CJS and ESM imports without understanding compatibility behavior.
- Forgetting .js extension in relative imports under Node ESM mode.
- Reading env vars as numbers without conversion and validation.
- Using process.exit() deep in application logic.

## 7) Quick recall

- Node is single-threaded for JS execution, not for all I/O work.
- argv gives CLI input, env gives deployment config.
- ESM is the default recommendation for new TypeScript Node projects.

## My Notes
- 
