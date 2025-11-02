# Git Hooks Setup

This project uses **Husky** and **lint-staged** to automatically:

- ✅ Format code with Prettier on commit
- ✅ Run ESLint with auto-fix on staged files
- ✅ Validate formatting and types before pushing

## How it works

1. **Pre-commit hook** (`.husky/pre-commit`):
   - Runs `lint-staged` before every commit
   - Only processes files that are staged (`git add`)
   - Auto-fixes formatting and linting issues
   - Prevents committing unformatted code

2. **Pre-push hook** (`.husky/pre-push`):
   - Runs `format:check` to ensure all files are formatted
   - Runs TypeScript typecheck
   - Prevents pushing code with formatting or type errors

3. **lint-staged** (`.lintstagedrc.json`):
   - TypeScript files (`.ts`, `.tsx`): Prettier + ESLint auto-fix
   - Source files (non-stories): ESLint with max 100 warnings
   - Config files (`.json`, `.css`, `.md`, `.yml`, `.cjs`, `.js`): Prettier only

## What this prevents

- ❌ Committing unformatted code (CI will fail)
- ❌ Committing code with ESLint errors (CI will fail)
- ❌ Accidentally breaking tests

## Manual commands

If you need to bypass hooks (not recommended):

```bash
git commit --no-verify
```

To format all files manually:

```bash
npm run format
```

To check formatting without fixing:

```bash
npm run format:check
```
