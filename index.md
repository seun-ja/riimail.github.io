---
title: Welcome to RiiMail
description: A private, intelligent desktop email client for macOS.
section: Start here · Chapter 1
next_url: /getting-started/
next_title: Getting started
---

# Email intelligence that stays with you

RiiMail is an open-source desktop email client for macOS. It brings your inbox, local caching, and phishing and spam detection into one focused application—without sending message content to a cloud AI service.

<div class="callout">
  <strong>Private by design</strong>
  <p>The classification model, Python runtime, and inference stack run inside the app on your Mac.</p>
</div>

## What this book covers

This book is both a user guide and a map of the project. Start with installation and your first mailbox connection, learn what happens to your messages, or jump into the Rust and Tauri architecture.

<div class="chapter-cards">
  <a class="chapter-card" href="{{ '/getting-started/' | relative_url }}"><span>CHAPTER 2</span><strong>Get RiiMail running</strong><small>Requirements, installation, and the first launch.</small></a>
  <a class="chapter-card" href="{{ '/guide/first-run/' | relative_url }}"><span>CHAPTER 3</span><strong>Connect your inbox</strong><small>IMAP configuration, login, and mailbox sync.</small></a>
  <a class="chapter-card" href="{{ '/guide/privacy/' | relative_url }}"><span>CHAPTER 5</span><strong>Understand your data</strong><small>Local storage, credentials, inference, and telemetry.</small></a>
  <a class="chapter-card" href="{{ '/developers/architecture/' | relative_url }}"><span>CHAPTER 7</span><strong>Explore the architecture</strong><small>How the webview, Rust backend, worker, and model fit together.</small></a>
</div>

## Why RiiMail exists

Useful email tools increasingly depend on remote services that receive or process message content. RiiMail takes a different path: it uses encrypted IMAP for mailbox access, caches mail on your device, and evaluates suspicious messages with a bundled local model.

That gives you a few practical properties:

- **Local threat detection.** Spam and phishing checks run on your Mac.
- **Responsive mailbox access.** SQLite keeps fetched messages close at hand.
- **Protected credentials.** macOS credentials are stored with Apple Keychain.
- **A lightweight desktop shell.** Tauri pairs a web interface with a Rust backend.
- **Explicit observability.** Telemetry export is disabled unless you opt in.

## The shape of the app

RiiMail currently targets **Apple Silicon Macs running macOS 14 or newer**. It connects to IMAP-compatible accounts, including Gmail, Yahoo Mail, Outlook, and other providers that expose IMAP access. Some providers require an application-specific password.

The active mailbox flow synchronizes Inbox and Sent mail, stores it locally, and presents messages in a native desktop window. When you ask RiiMail to rate a message, local inference produces a risk signal you can use as one input when deciding whether to trust it.

> A model score is a helpful signal, not a guarantee. Treat unexpected requests for passwords, payments, codes, or urgent action with care.

## The project at a glance

| Layer | Technology | Responsibility |
|---|---|---|
| Desktop shell | Tauri 2 | Windows, IPC, bundling, and native integration |
| Backend | Rust | App state, mail access, commands, and orchestration |
| Mail | async-imap + TLS | Encrypted mailbox synchronization |
| Local storage | SQLite + sqlx | Cached mail and synchronization state |
| Interface | HTML, CSS, JavaScript | Setup, login, and the mailbox experience |
| Local inference | PyO3, PyTorch, Transformers | On-device spam and phishing classification |
| Credentials | Apple Keychain | Password storage on macOS |

Ready to begin? Continue to [Getting started]({{ '/getting-started/' | relative_url }}).

