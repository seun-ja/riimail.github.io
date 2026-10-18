---
title: Troubleshooting
description: Diagnose common RiiMail setup, login, model, sync, and Keychain problems.
section: Reference · Chapter 9
prev_url: /developers/testing/
prev_title: Testing & packaging
next_url: /contributing/
next_title: Contributing
---

# Troubleshooting

Start with the symptom below. When you need more detail during development, set `RUST_LOG=debug`, reproduce the problem once, and inspect the resulting logs without sharing message content or credentials.

## Setup or login does not complete

Confirm the IMAP hostname and secure port with your provider. Then check whether the provider requires an app password or blocks third-party IMAP access for the account.

If the local onboarding state is inconsistent, quit RiiMail, remove its app configuration directory, and relaunch. This resets setup and requires you to connect the account again.

## Keychain prompts return after restart

RiiMail stores the mailbox password as a generic Apple Keychain item. Choose **Always Allow** if you want macOS to remember access for the current application identity. Choosing **Allow** approves only the current request.

Development executables may change identity between builds and cause additional prompts. If the same address was previously stored with different capitalization, quit RiiMail, open Keychain Access, remove the stale casing variant, and sign in again.

## The inbox shows only part of the mailbox

The first screen is intentionally paginated. Scroll to request more locally cached messages. A background initial sync may also still be filling SQLite after the first usable page appears.

If local cache population was interrupted and does not recover, clearing the app data and signing in again triggers a clean bootstrap. This removes the locally cached copy, so use it only when necessary.

## The model is missing

The build expects `local-model/config.json` and the actual `model.safetensors` file. If the latter is only a tiny text file, Git LFS downloaded a pointer instead of the model data.

```bash
git lfs install
git lfs pull
ls -lh local-model/model.safetensors
```

The model directory must be directly under the repository root, not nested inside another `local-model` directory.

## Direct Tauri development fails to link Python

Run `npm run dev`, not `cargo tauri dev`. The project wrapper prepares the runtime and supplies the PyO3 link settings that a direct Tauri command does not have.

## A packaged app is blocked by macOS

The local DMG is ad-hoc signed. Builds distributed to other users need Developer ID signing and notarization. Gatekeeper warnings are expected when an unnotarized build is downloaded from the internet.

## Still stuck?

Search the [issue tracker](https://github.com/seun-ja/rii-mail/issues) for the error message. If it is new, open an issue with your macOS version, the RiiMail commit or release, steps to reproduce, expected behavior, and sanitized logs.
