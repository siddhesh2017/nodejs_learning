# AI Handoff Context - Node.js Learning Project

Last updated: 2026-08-23

## Purpose
This file helps any new AI continue the learning journey without losing context.
Use this as the source of truth for current progress, skipped items, and next steps.

## Workspace
- Root: C:/Users/siddh/Desktop/Coding/WebDev/NodeJs Learning
- Language: TypeScript (Node.js runtime)
- Module system: ES Modules
- Learning model: project-first, step-by-step, one task at a time

## User learning preferences
- Wants practical learning by building, not theory-only.
- Wants full roadmap/checklist tracking.
- Wants skipped items marked inline as [skipped], not in separate section.
- Wants detailed notes for revision (not short notes).
- Is okay skipping some tasks temporarily and continuing forward.

## Main tracker files
- Roadmap checklist: NODEJS_WEEKLY_ROADMAP_CHECKLIST.md
- Detailed notes root: notes/README.md
- Day-wise notes available under notes/Day-*/

## Current project technical state

### package.json highlights
- "type": "module"
- Scripts:
  - dev: node --env-file=.env --import=tsx src/index.ts
  - build: tsc
  - start: node --env-file=.env dist/index.js
  - typecheck: tsc --noEmit

### Current CLI behavior (src/index.ts)
- Reads APP_NAME from env.
- Reads userName from argv[2], defaults to Anonymous.
- Reads filePath from argv[3], defaults to data/customers.json.
- Reads JSON file using node:fs/promises readFile.
- Parses and prints file content, total count, and active count.
- Error path prints file-read error.

### Existing files/folders of interest
- src/index.ts
- src/runtime-info.ts
- data/customers.json
- .env, .env.example, .gitignore
- notes/ (detailed revision notes)

## Progress summary (based on checklist)

### Day 1 completed items (high confidence)
- Setup completed (Node/npm/git verification, package.json, TS config, scripts, folders)
- process.argv and process.env usage
- Missing env handling
- Exit code usage
- ESM project configuration and ESM import style
- node:fs/promises usage
- node:os usage
- CLI entry + env config + JSON read + summary + basic file error path
- .env and .env.example setup
- typecheck/dev/build/start all run

### Day 1 pending items
- node:path for safer cross-platform path handling
- node:crypto checksum basics
- node:events event-driven flow basics
- Inactive count output and cleaner summary formatting (optional cleanup)

### Day 1 skipped items (intentionally)
- [skipped] Generate summary report file in reports/
- [skipped] Strict TypeScript schema validation for parsed JSON

## Known inconsistencies to normalize later
1. Checklist currently uses [✅] for the CommonJS/ESM section instead of [x].
   - Preferred style in checklist usage note is [x], [ ], [skipped].
2. src/index.ts has extra commented legacy snippets that can be cleaned later.
3. JSON parse currently assumes shape via type assertion; strict validation is skipped for now.

## Recommended immediate next step for any new AI
Proceed with Day 1 remaining core module topics in this order:
1. Introduce node:path in src/index.ts for input/report path normalization.
2. Add node:crypto SHA-256 checksum of raw input file.
3. Add node:events EventEmitter for start/read/parsed/success/error events.

Keep it simple and incremental:
- one small task at a time
- avoid deep optional theory unless user asks
- show where each concept appears in code

## Ready-to-send next prompt (for continuity)
Use this exact prompt if needed:
"Continue from AI_HANDOFF_CONTEXT.md. Start with Day 1 remaining core modules only. Give one small task: add node:path usage to normalize file input path in src/index.ts and show output."

## Commands used most often
- npm run typecheck
- npm run dev -- Siddhesh data/customers.json
- npm run build
- npm start -- Siddhesh

## Safety and style reminders for next AI
- Do not reset or revert unrelated changes.
- Preserve user's checklist conventions.
- Keep instructions practical and concise during coding.
- Keep theory detailed inside notes files.
