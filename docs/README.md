# MorphUI Knowledge Base

Structured engineering documentation for MorphUI, verified against the
codebase on 2026-11-02 at `morphui-react@0.9.0`.

| Document                                   | Contents                                                                                   |
| ------------------------------------------ | ------------------------------------------------------------------------------------------ |
| [ARCHITECTURE.md](./ARCHITECTURE.md)       | Source layout, theming system, CSS strategy, build & package shape, quality infrastructure |
| [COMPONENTS.md](./COMPONENTS.md)           | Full component inventory with LOC, tests, size outliers, refactor candidates               |
| [ROADMAP.md](./ROADMAP.md)                 | Prioritized short / medium / long-term goals and explicit non-goals                        |
| [../CONTRIBUTING.md](../CONTRIBUTING.md)   | Development workflow, branch model, conventions, definition of done                        |
| [../PUBLISH_SETUP.md](../PUBLISH_SETUP.md) | npm trusted publishing setup and the release pipeline                                      |

User-facing documentation lives in the [README](../README.md) and on the
[Storybook site](https://something-important.github.io/MorphUI/).

## Repository facts

| Field           | Value                                                                 |
| --------------- | --------------------------------------------------------------------- |
| Package         | `morphui-react` (npm, MIT)                                            |
| Current release | 0.9.0 (2026-10-31, OIDC trusted publishing with provenance)           |
| Stack           | React 18/19 (peer), TypeScript 5, Rollup 4, Jest 29, Storybook 9      |
| Components      | 33 — 14 basic / 7 interactive / 12 composition, plus the theme system |
| Source size     | ~14.2k lines of component TSX + ~14.9k lines of component CSS         |
| Tests           | 38 suites / 1,606 tests, all passing (~33s)                           |
| Bundle          | ESM 449 kB + CJS 457 kB + single minified CSS ~300 kB                 |
| Tarball         | 99 files, 487.7 kB packed / 3.2 MB unpacked                           |
| Branches        | `master` (releases) ← `dev` (integration, PR target)                  |

## Keeping this knowledge base honest

These documents are maintained by hand and re-verified against the tree when
they change materially. If a number here contradicts the code, the code wins —
then please fix the document in the same pull request.
