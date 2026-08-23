# Node.js Revision Notes

This folder is your theory-first revision companion for the project roadmap.
The goal is not to memorize definitions, but to understand when and why each
concept is used in production systems.

How to use this notes system:
1. Read the day folder before coding that day.
2. After coding, update the same file with your own mistakes and fixes.
3. At the end of each day, revise the "Common production mistakes" sections.
4. Before interviews, revise only the "Quick recall" bullets in each file.

What these notes contain:
- Core theory in simple language.
- Practical implementation patterns.
- Production pitfalls and safe defaults.
- Small examples that connect directly to your project.

## Day-wise map
- Day 1: Runtime, modules, core modules, CLI and JSON processing
- Day 2: HTTP, REST and Express API basics
- Day 3: Middleware, validation, error handling, configuration
- Day 4: API documentation, external API consumption, auth/authz
- Day 5: Logging, resilience and testing
- Day 6: Event loop, concurrency, worker threads, streams
- Day 7: Caching, profiling, CI/CD and production readiness
- Optional: Database, Redis, Docker, observability, cloud

## Revision framework for every topic
For each topic, be able to answer all 6:
1. What problem does this solve?
2. What is the minimum safe implementation?
3. What are the common mistakes?
4. How does it fail in production?
5. How do we monitor/debug it?
6. What tradeoff are we making?

## How to keep notes high quality
- Write your own example command/API request in each file.
- Add one "mistake I made" bullet after every session.
- Keep jargon low and reasoning clear.
- If a concept is unclear, add a "Revisit" marker.
