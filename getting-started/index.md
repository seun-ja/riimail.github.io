---
title: Getting started
description: Requirements and installation instructions for RiiMail on macOS.
section: Start here · Chapter 2
prev_url: /
prev_title: Welcome to RiiMail
next_url: /guide/first-run/
next_title: Your first run
---

# Getting started

RiiMail currently supports Apple Silicon Macs running macOS 14 or newer. You can use a packaged release when one is available, or run the project from source.

## Before you begin

For a development build you need:

- an Apple Silicon Mac with macOS 14 or newer;
- the stable Rust toolchain and Xcode Command Line Tools;
- the Tauri CLI;
- Node.js and npm;
- Git LFS or the Hugging Face CLI to download the local model.

End users of the packaged macOS build do **not** need to install Python, PyTorch, Transformers, Homebrew, or a virtual environment. Those runtime components are bundled with the application.

## Clone the project

```bash
git clone https://github.com/seun-ja/rii-mail.git
cd rii-mail
npm install
```

Install the Tauri CLI if it is not already available:

```bash
cargo install tauri-cli
```

## Download the local model

The model is intentionally kept out of the Git repository because of its size. From the project root, clone it into a directory named `local-model`:

```bash
git lfs install
git clone https://huggingface.co/seuun/spam-rater-local-model local-model
```

You can use the Hugging Face CLI instead:

```bash
hf download seuun/spam-rater-local-model --local-dir local-model
```

Verify that you downloaded the actual model rather than small Git LFS pointer files:

```bash
test -f local-model/config.json
test -f local-model/model.safetensors
ls -lh local-model/model.safetensors
```

`model.safetensors` should be hundreds of megabytes. If `local-model` already exists, move or remove it before cloning so you do not accidentally create a nested model directory.

## Configure the environment

Copy the example environment file:

```bash
cp .env.example .env
```

The default development settings are:

```dotenv
RUST_LOG=info
TELEMETRY_OPT_IN=false
OTLP_COLLECTOR_ENDPOINT=http://0.0.0.0:4317
```

Telemetry export remains off unless `TELEMETRY_OPT_IN` is explicitly set to `true`.

## Run the app

```bash
npm run dev
```

Use this command instead of invoking `cargo tauri dev` directly. The wrapper prepares the pinned Python runtime, configures PyO3, exposes the correct Python library to the executable, and then starts Tauri. The first run downloads the pinned runtime and wheels; later runs reuse them.

When the window opens, continue to [Your first run]({{ '/guide/first-run/' | relative_url }}) to connect a mailbox.

