---
title: Privacy & local data
description: Where RiiMail stores messages and credentials, and when data leaves the device.
section: Using RiiMail · Chapter 5
prev_url: /guide/spam-detection/
prev_title: Spam & phishing checks
next_url: /developers/setup/
next_title: Development setup
---

# Privacy & local data

RiiMail’s privacy model is straightforward: mail must travel to and from your email provider, but classification happens on your device. Local data is kept in application storage, and observability export is opt-in.

## Data flow

The active application uses these boundaries:

1. RiiMail opens a TLS connection to your provider’s IMAP service.
2. It fetches Inbox and Sent messages and caches them in local SQLite storage.
3. When you rate a message, its content is passed to the bundled model inside the app process.
4. RiiMail displays the resulting risk signal in the interface.

No cloud AI key is required for local spam and phishing classification, and message content is not sent to a third-party inference service for that feature.

## What is stored where

| Data | Location | Purpose |
|---|---|---|
| App configuration | Tauri app config directory, `config.json` | Provider, ports, accounts, and app settings |
| Cached mail | `data/` under the app config directory | Responsive reading, pagination, and sync state |
| Password | Apple Keychain on macOS | Returning-user authentication |
| Model and runtime | Inside the packaged application | Offline local inference |

The exact base path for application configuration is resolved by Tauri for the current macOS user.

## Credentials and Keychain prompts

macOS controls access to the Keychain item. Choosing **Allow** approves only the current attempt, while **Always Allow** can remember access for the current application identity.

Development builds may prompt more often because their executable or signing identity can change. A packaged build should still be tested independently; code signing does not guarantee that a prompt will never appear.

## Telemetry

Telemetry export defaults to off. The development environment uses:

```dotenv
TELEMETRY_OPT_IN=false
```

Setting it to `true` enables trace export to the configured `OTLP_COLLECTOR_ENDPOINT`. Review the endpoint and your organization’s data handling expectations before opting in.

## Your provider still matters

Local inference does not make email an offline-only system. RiiMail connects to the provider that already hosts your mailbox, and that provider’s security, retention, and privacy policies still apply. Network access is also needed to synchronize new mail and send messages.
