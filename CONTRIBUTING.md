# Contributing to Go Utils Playground

Thanks for your interest in contributing! This guide will help you get started with submitting pull requests.

## Fork and Setup

1. Visit https://github.com/kashifkhan0771/utils-playground and click the fork button
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/utils-playground.git
   cd utils-playground
   ```
3. Create a feature branch:
   ```bash
   git checkout -b my-new-feature main
   ```

## Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Make your changes:
   - **Go WASM**: Edit files in `wasm/main.go`
   - **TypeScript UI**: Edit files in `src/*.ts`
   - **Styles**: Edit CSS files in `docs/css/`

3. Build and test locally:
   ```bash
   # Build WASM and compile TypeScript
   make build

   # Start local development server
   make serve
   ```

4. Test your changes thoroughly in the browser before submitting

## Before Submitting

- Add documentation for new features (update README.md or inline comments)
- Consolidate commits into one per feature using:
  ```bash
  git rebase -i main
  ```
- Rebase against main to ensure clean history:
  ```bash
  git rebase main
  ```
- Build successfully with `make build`

## Submitting Your PR

1. Push your branch:
   ```bash
   git push origin my-new-feature
   ```

2. Create a pull request on GitHub with a clear description of your changes

3. Your patch will get reviewed. You might get asked to fix some things — just update your branch and force-push:
   ```bash
   git push --force-with-lease origin my-new-feature
   ```

## Adding Dependencies

### npm packages (TypeScript)
```bash
npm install package-name
npm install package-name@version
```

### Go packages (WASM)
```bash
go get github.com/username/package
go get github.com/username/package@version
```

## Questions?

If you have questions, feel free to open an issue or reach out to the maintainers.
