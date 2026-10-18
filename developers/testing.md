---
title: Testing & packaging
description: Run RiiMail tests and create the self-contained macOS package.
section: For developers · Chapter 8
prev_url: /developers/architecture/
prev_title: Architecture
next_url: /reference/troubleshooting/
next_title: Troubleshooting
---

# Testing & packaging

RiiMail’s test suite covers the frontend modules, Rust backend, local provider, and Python inference adapter. Packaging adds runtime auditing and an offline inference check.

## Run all tests

After the pinned Python runtime has been prepared, run the full suite from the repository root:

```bash
npm run test:all
```

You can run the layers independently:

```bash
npm run test:frontend
npm run test:backend
npm run test:llm
npm run test:python
```

## What is covered

The current suites include:

- frontend state, mailbox helpers, cache behavior, DOM wiring, and rating messages;
- Rust error mapping, email transformation, fetch helpers, and configuration;
- SQLite initialization, serialization, pagination, sync state, and cleanup;
- local runtime path validation and provider behavior;
- mocked Python model caching, device selection, warmup, inference, out-of-memory handling, and cleanup.

The Python tests use mocks and do not load the full trained model.

## Build the macOS package

Download the local model first, then run:

```bash
npm run build:macos-arm64
```

The build wrapper stages the pinned runtime and wheels, links PyO3 to the bundled Python library, builds the app, signs it, audits Mach-O dependencies, runs real offline inference from the packaged resources, and verifies the DMG checksum.

The resulting file is written under:

```text
src-tauri/target/aarch64-apple-darwin/release/bundle/dmg/
```

The development package is ad-hoc signed for local testing. Public distribution still requires an Apple Developer ID signing identity and Apple notarization to avoid Gatekeeper warnings on downloaded builds.

