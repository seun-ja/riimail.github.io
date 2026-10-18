---
title: Development setup
description: Prepare a local development environment for RiiMail.
section: For developers · Chapter 6
prev_url: /guide/privacy/
prev_title: Privacy & local data
next_url: /developers/architecture/
next_title: Architecture
---

# Development setup

RiiMail combines a JavaScript frontend, a Rust/Tauri backend, and an embedded Python inference runtime. The project scripts keep those layers aligned during development.

## Repository layout

```text
src/                         Frontend HTML, CSS, and JavaScript
  mail-app/                  Mailbox state, rendering, sync, and provider helpers
  shared/                    Shared frontend utilities
src-tauri/
  src/handlers/              Frontend-facing Tauri commands
  src/workers/               Background IMAP worker
  src/db/                    SQLite setup and queries
  src/email_cache/           Fetching and cache population
  src/auth/                  Login and Apple Keychain access
llm/                         Local inference provider and Python entrypoint
packaging/macos-arm64/       Runtime preparation, auditing, signing, and DMG scripts
```

## Install the toolchain

Install the stable Rust toolchain, Xcode Command Line Tools, Node.js, npm, and the Tauri CLI. Then clone the repository and install its JavaScript dependency:

```bash
git clone https://github.com/seun-ja/rii-mail.git
cd rii-mail
npm install
cargo install tauri-cli
```

Follow [Getting started]({{ '/getting-started/' | relative_url }}) to download the model and create `.env`.

## Prepare the runtime

The normal development command prepares or reuses the checksum-pinned Python runtime before Tauri starts:

```bash
npm run dev
```

For backend tests, prepare the runtime explicitly first:

```bash
python3 packaging/macos-arm64/scripts/prepare-runtime.py
npm run test:backend
```

The runtime inputs are pinned in:

- `packaging/macos-arm64/runtime.lock.json`
- `packaging/macos-arm64/requirements.txt`
- `src-tauri/tauri.macos.conf.json`

## Environment variables

Use `RUST_LOG=debug` when you need more detailed local logs. Leave telemetry off unless you intentionally run and trust the configured OTLP collector.

Do not invoke `cargo tauri dev` directly for this project. It skips the PyO3 link configuration supplied by the development wrapper and can accidentally link against a machine-local Python installation.

