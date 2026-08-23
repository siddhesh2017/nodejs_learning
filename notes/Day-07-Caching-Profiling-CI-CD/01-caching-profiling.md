# Day 7 - Caching and Profiling

## 1) Why caching exists

Caching reduces repeated expensive operations and improves response latency.

Typical cached targets:
- Frequently requested metadata
- Expensive aggregations
- External API responses with acceptable staleness

## 2) Core cache concepts

Key:
- Identifier for stored value.

TTL (time to live):
- Expiration duration for cache entry.

Invalidation:
- Logic to evict/update cache when source data changes.

Without good invalidation, caches become a stale-data bug source.

## 3) Cache patterns

Read-through pattern:
- Read cache first.
- On miss, load source and populate cache.

Write-through/write-around patterns exist but start with read-through for clarity.

## 4) In-memory vs shared cache

In-memory cache:
- Fast and simple.
- Exists per process only.
- Not shared across multiple app instances.

Shared cache (for example Redis):
- Centralized cache for all instances.
- Better consistency across scaled deployments.

## 5) Profiling fundamentals

Profile when:
- Endpoint latency is unexpectedly high.
- CPU usage spikes.
- Memory usage grows over time.

Measure:
- Request timing per endpoint.
- Repeated DB/external calls.
- Blocking code in event loop.
- Heap growth patterns.

## 6) Optimization approach

1. Measure baseline.
2. Identify bottleneck.
3. Apply targeted optimization.
4. Re-measure and compare.

Never optimize based on guesswork only.

## 7) Common production mistakes

- Caching everything without invalidation strategy.
- Caching sensitive data without controls.
- Optimizing before measuring.
- Ignoring memory impact of cache growth.

## 8) Quick recall

- Cache improves speed but adds consistency complexity.
- Profiling is evidence-driven performance work.

## My Notes
- 
