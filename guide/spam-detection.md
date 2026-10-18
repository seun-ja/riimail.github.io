---
title: Spam & phishing checks
description: How RiiMail rates suspicious messages using local inference.
section: Using RiiMail · Chapter 4
prev_url: /guide/first-run/
prev_title: Your first run
next_url: /guide/privacy/
next_title: Privacy & local data
---

# Spam & phishing checks

RiiMail can evaluate an email’s subject, sender, and body with a classification model that runs locally. It turns the result into a visible risk signal without sending the message to a remote inference API.

## What “local” means

The macOS bundle contains the components needed for inference:

- the trained classification model;
- `llm/local_inference.py`;
- a checksum-pinned Python 3.12 runtime;
- pinned PyTorch, Transformers, Tokenizers, and Safetensors wheels.

At startup, RiiMail uses only the bundled runtime, restricts Python’s import path to application resources, and enables Hugging Face offline mode. Packaged inference therefore does not need network access.

## How a rating is produced

When a rating is requested, the frontend invokes the Tauri `rater` command with the message subject, sender, and body. The Rust backend passes those inputs to the in-process local provider through PyO3. The model’s output is parsed and returned to the interface as a rating.

The model is cached after it is loaded so subsequent ratings do not need to initialize the full inference stack again.

## Read the result as a signal

Classification models can be wrong. A low-risk result does not prove that a message is safe, and a high-risk result does not prove malicious intent.

Before acting on a sensitive message:

- inspect the sender’s full address, not only the display name;
- avoid following unexpected links to sign-in or payment pages;
- confirm unusual requests through another trusted channel;
- never share a password, recovery code, or one-time code by email;
- use the provider’s reporting tools when a message is clearly malicious.

<div class="callout">
  <strong>Keep the human in the loop</strong>
  <p>RiiMail helps you notice risk. It does not replace careful judgment or your provider’s security controls.</p>
</div>

## Why the model is separate

The model files are much larger than the source repository, so contributors download them from Hugging Face into `local-model/`. The build checks for the required model configuration and stops early when it is missing.

