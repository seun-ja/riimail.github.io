---
title: Your first run
description: Configure an IMAP account and understand RiiMail's initial sync.
section: Using RiiMail · Chapter 3
prev_url: /getting-started/
prev_title: Getting started
next_url: /guide/spam-detection/
next_title: Spam & phishing checks
---

# Your first run

The first launch is deliberately small: tell RiiMail where your provider accepts IMAP connections, then authenticate your account. The app takes care of creating its local storage and starting mailbox synchronization.

## The startup flow

RiiMail checks its local state before it shows an authentication screen. It chooses one of three routes:

1. **Setup** when no configuration exists yet.
2. **Login** when configuration exists but you are not authenticated.
3. **Signed in** when an existing session can be restored.

The login page stays behind a loading view until this check finishes, which prevents the wrong form from flashing briefly on screen.

## Configure IMAP

On the setup screen, enter your provider’s IMAP server hostname and port. RiiMail uses TLS for the connection.

Common provider settings include:

| Provider | IMAP server | Typical secure port |
|---|---|---:|
| Gmail | `imap.gmail.com` | `993` |
| Yahoo Mail | `imap.mail.yahoo.com` | `993` |
| Outlook | `outlook.office365.com` | `993` |

Provider settings can change, so confirm the current values in your provider’s help center when a connection fails.

## Sign in

Enter the email address and password for the account. Many providers do not accept your ordinary account password from desktop mail clients:

- Gmail and Yahoo may require an **app password**.
- Two-factor authentication may need to be enabled before an app password can be created.
- Your organization may restrict third-party IMAP access.

On macOS, RiiMail stores the password as a generic Apple Keychain item. The application configuration and email address are stored separately in the app’s configuration directory.

## What happens after login

After authentication, the main window opens and a background worker begins populating local storage. The active synchronization flow covers **Inbox** and **Sent** mail.

RiiMail writes messages to SQLite in batches. The interface requests an initial page of 50 messages and loads more as you scroll. Later refreshes use mailbox UIDs to request new mail incrementally rather than reading everything again.

The first useful page can appear before the entire mailbox finishes syncing. A large account may therefore continue doing work after the inbox becomes usable.

## Leaving RiiMail

Logout is available through the native application menu. It ends the active mail session, clears the app’s local state as implemented by the backend, and returns the interface to its setup or login flow.

