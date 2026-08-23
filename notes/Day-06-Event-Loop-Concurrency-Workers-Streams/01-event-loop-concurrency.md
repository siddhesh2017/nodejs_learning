# Day 6 - Event Loop and Concurrency

## 1) Event loop mental model

Node executes JavaScript on one main thread. This is why event loop behavior
directly impacts API responsiveness.

Core idea:
- Keep the main thread free for quick request handling.
- Offload I/O and avoid long synchronous CPU operations.

## 2) Task queues at practical level

You mainly need to remember:
- Microtasks (promises) run before next macrotask turn.
- Macrotasks include timers and many callback-based operations.

Why it matters:
- Misunderstanding queue order can create surprising timing bugs.

## 3) Blocking vs non-blocking examples

Blocking examples:
- Large sync loops.
- JSON processing of huge payload synchronously.
- Heavy crypto/compression on main thread.

Non-blocking examples:
- Async file/network operations.
- Parallel independent I/O via Promise.all.

## 4) Concurrency patterns

Use Promise.all when operations are independent:
- Fetch customer profile and customer preferences in parallel.

Use sequential awaits when dependencies exist:
- Fetch order only after validating customer.

Rule of thumb:
- Parallelize independent work.
- Keep ordering where business logic depends on previous result.

## 5) Measuring concurrency impact

When evaluating changes, compare:
- Latency before and after
- Throughput under concurrent requests
- Error rate under load

Without measurement, performance claims are assumptions.

## 6) Common production mistakes

- Running CPU-heavy code inside request handlers.
- Assuming async keyword always means non-blocking.
- Parallelizing calls that should remain sequential due to consistency rules.

## 7) Quick recall

- Node scales best for I/O-heavy patterns.
- Concurrency improves latency only when tasks are truly independent.

## My Notes
- 
