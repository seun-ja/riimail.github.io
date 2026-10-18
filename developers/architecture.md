---
title: Architecture
description: Understand the frontend, Rust backend, mail worker, storage, and local model.
section: For developers · Chapter 7
prev_url: /developers/setup/
prev_title: Development setup
next_url: /developers/testing/
next_title: Testing & packaging
---

# Architecture

RiiMail is a Tauri application: a webview renders the interface, while a Rust process owns native integration, mailbox connections, persistence, and local inference.

## At a glance

```text
┌─────────────────────────────────────────────┐
│ HTML + CSS + JavaScript                     │
│ setup · login · mailbox · rating UI         │
└──────────────────┬──────────────────────────┘
                   │ Tauri commands + events
┌──────────────────▼──────────────────────────┐
│ Rust backend                                │
│ handlers · app state · fetch manager        │
└───────┬───────────────────┬─────────────────┘
        │                   │
┌───────▼─────────┐  ┌──────▼────────────────┐
│ IMAP worker     │  │ Local inference       │
│ TLS sessions    │  │ PyO3 + Python + model │
└───────┬─────────┘  └───────────────────────┘
        │
┌───────▼─────────┐
│ SQLite cache    │
│ mail + sync UID │
└─────────────────┘
```

## Frontend

The frontend is served from `src/` and uses browser-native HTML, CSS, and JavaScript. `src/main.js` initializes the mailbox application, while modules under `src/mail-app/` divide state, DOM access, rendering, providers, caching, synchronization, and spam-rating behavior.

The interface calls a small set of Tauri commands rather than accessing the filesystem or network directly. Shared error parsing and Tauri helpers live under `src/shared/`.

## Backend and commands

`src-tauri/src/lib.rs` builds the application runtime, registers shared state, starts the IMAP worker, registers commands, and configures the native menu. Important frontend-facing commands include:

- `check_app_status`, `config_setup`, and `login`;
- `fetch_emails` and `refresh_emails_handler`;
- `send_email` and `email_generator`;
- `rater` for local classification.

`src-tauri/src/main.rs` is intentionally thin: it loads environment values, initializes tracing, and starts the library runtime.

## Mail worker and synchronization

The background worker keeps two IMAP sessions so mailbox work can proceed concurrently. Initial population writes messages in batches of 100. The frontend reads pages of 50 messages and requests more as the user scrolls.

Ongoing refresh is incremental. The database records the last mailbox UID, allowing the worker to ask for newer messages instead of rebuilding the entire cache.

## Storage and authentication

SQLite stores cached mail, labels, and synchronization state beneath the Tauri application configuration directory. The application’s configuration lives in `config.json`. Apple Keychain stores the mailbox password on macOS; it is not placed in frontend storage.

## Local inference

The `llm` crate provides the local model integration. Rust calls the packaged Python entrypoint in-process through PyO3. The runtime validates bundled paths, enables offline behavior, loads the model, and returns the classification result to the Tauri handler.

This separation lets the Rust application own orchestration while Python uses the mature PyTorch and Transformers inference stack.

