---
title: Contributing
description: Report issues and contribute changes to RiiMail.
section: Reference · Chapter 10
prev_url: /reference/troubleshooting/
prev_title: Troubleshooting
next_url: /security/
next_title: Security
---

# Contributing

RiiMail is open source and welcomes focused bug reports, documentation improvements, tests, and code changes. The best contribution begins with a clear description of the problem it solves.

## Report a bug

Open an issue and include:

- a concise description of the behavior;
- reliable steps to reproduce it;
- what you expected and what happened instead;
- your macOS and RiiMail versions;
- screenshots or sanitized logs when they help.

Do not put passwords, full email messages, model inputs, or other private mailbox data in an issue.

## Propose an improvement

Describe the user problem before prescribing an implementation. Explain who benefits, what changes in their workflow, and any privacy or compatibility constraints the change introduces.

## Submit a pull request

1. Fork and clone the repository.
2. Create a focused branch for the change.
3. Follow the existing Rust and JavaScript module boundaries.
4. Add or update tests for changed behavior.
5. Run the relevant test suites and `cargo fmt`.
6. Push the branch and open a pull request with a clear summary and verification notes.

Rust code should follow conventional `snake_case` function naming and `PascalCase` type naming. Keep frontend changes accessible and avoid putting credentials or sensitive mail content into browser storage.

## Useful links

- [RiiMail source](https://github.com/seun-ja/rii-mail)
- [Issue tracker](https://github.com/seun-ja/rii-mail/issues)
- [Project contribution guide](https://github.com/seun-ja/rii-mail/blob/main/CONTRIBUTING.md)
- [MIT license](https://github.com/seun-ja/rii-mail/blob/main/LICENSE.md)

