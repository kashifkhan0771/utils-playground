# Go Utils Playground

Interactive playground for the [Go Utils](https://github.com/kashifkhan0771/utils) library. Try out utility functions right in your browser — powered by **WebAssembly**.

> *"This entire codebase was vibecoded into existence. No mass was harmed, only tokens were burned."*

## What is Go Utils?

[kashifkhan0771/utils](https://github.com/kashifkhan0771/utils) is a collection of reusable Go utility packages — strings, math, maps, slices, pointers, and more. This playground lets you interact with those functions live in the browser by compiling the real Go library to WebAssembly.

## How It Works

```
wasm/main.go      → Go WASM binary wrapping real utils functions
src/*.ts           → TypeScript UI calling Go functions via WASM
docs/              → Static site served by GitHub Pages
```

The browser runs the **actual Go code** — not JS reimplementations.

## Development

```bash
# Install dependencies
npm install

# Build everything (WASM + TypeScript)
make build

# Local preview
make serve
```

## Project Structure

```
├── wasm/main.go              # Go → WASM bridge
├── src/
│   ├── main.ts               # WASM loader, animations
│   ├── strings.ts            # Strings playground UI
│   ├── home.ts               # Home page terminal animation
│   └── gophers.ts            # Contributors page (live GitHub API)
├── docs/                     # Static site (GitHub Pages)
│   ├── index.html
│   ├── playground/strings.html
│   ├── gophers.html
│   ├── css/
│   ├── js/                   # Compiled TS + wasm_exec.js
│   └── utils.wasm
├── .github/workflows/deploy.yml
├── Makefile
├── go.mod
└── tsconfig.json
```

## Deployment

Deploys automatically to GitHub Pages via GitHub Actions on every push to `main`.
