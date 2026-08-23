# Day 6 - Worker Threads, Streams and Buffers

## 1) Worker threads

Worker threads let you run CPU-heavy JavaScript in separate threads.

Why this matters:
- Main thread stays responsive for incoming requests.
- CPU-heavy work does not block event loop.

Common use cases:
- Image/video transformations
- Large report generation
- Complex text parsing or analytics

## 2) Worker tradeoffs

Benefits:
- Better responsiveness under CPU load.

Costs:
- Thread startup overhead.
- Data transfer/serialization overhead.
- More complexity in error and lifecycle handling.

Use workers only when CPU work is meaningful enough to justify overhead.

## 3) Streams fundamentals

Streams process data in chunks instead of loading everything in memory.

Why this is important:
- Lower memory footprint.
- Better handling of large files and long-lived data flows.

Core stream types:
- Readable: source of data.
- Writable: destination of data.
- Transform: modifies data while streaming.

## 4) Backpressure

Backpressure is flow control between producer and consumer speeds.

If producer is faster than consumer and no backpressure handling exists,
memory usage can grow quickly.

Pipe and stream APIs help handle this safely.

## 5) Buffers

Buffers represent raw binary data in Node.

Useful when:
- Handling non-text file formats.
- Processing network protocol payloads.
- Performing binary transformations.

## 6) Common production mistakes

- Using workers for tiny operations where overhead dominates.
- Loading huge files fully into memory instead of streaming.
- Ignoring stream error events and cleanup.

## 7) Quick recall

- Workers for CPU-heavy tasks.
- Streams for large or continuous I/O.
- Backpressure prevents memory blowups.

## My Notes
- 
