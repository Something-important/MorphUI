# Publish Setup — npm Trusted Publishing

How `morphui-react` gets from a merged pull request to the npm registry.

Current state: `morphui-react@0.9.0` is live on npm (published 2026-10-31) via
GitHub Actions OIDC trusted publishing, with Sigstore provenance attestation.
There is deliberately **no `NPM_TOKEN` secret** in this repo.

## The release pipeline

```
conventional commits on master
  → release-please opens a release PR (version bump + CHANGELOG)
  → merge the release PR
  → release-please tags v*
  → publish.yml fires on the tag
  → npm publish --provenance (OIDC trusted publishing)
  → package live on npm + GitHub release
```

Manual fallback: Actions tab → **Publish to npm** → Run workflow (the
workflow also fires automatically on `v*` tags).

The workflows involved:

- `release-please.yml` — watches `master`; `release-type: node`,
  `bump-minor-pre-major: true`.
- `publish.yml` — builds with `npm run build:all`, shows the tarball via
  `npm pack --dry-run`, then runs `npm publish --provenance`.
- `semantic-pr.yml` — enforces conventional PR titles.

## Requirement 1: npm CLI >= 11.5.1

npm 10.x can **sign** provenance but cannot perform the **OIDC token
exchange** used for publish authentication. Symptom: `npm publish
--provenance` fails with `404 Not Found - PUT` against a package that
definitely exists (npm returns 404, not 401, to avoid leaking package
existence).

Node 22 ships npm 10, so the workflow sets up Node 22 and then runs
`npm install -g npm@latest` before publishing. Do not remove that step.

Reference: <https://docs.npmjs.com/trusted-publishers>

## Requirement 2: trusted publisher registration on npmjs.com

One-time setup (already done for this package):

- For an existing package: package page → Settings → **Trusted
  Publisher(s)** — a separate section from "Publishing access".
- For a package that does not exist yet: **account** settings → Trusted
  Publishers → Add new (this registers the future package name).

The fields are case-sensitive and compared as strings against the GitHub
OIDC claims:

| Field             | Value for this repo                        |
| ----------------- | ------------------------------------------ |
| Repository owner  | `Something-important`                      |
| Repository name   | `MorphUI`                                  |
| Workflow filename | `publish.yml`                              |
| Environment       | blank — the job declares no `environment:` |

Known npm UI bug: with security-key 2FA, the trusted-publisher form can be
silently cleared by the 2FA modal. Always reload and confirm the entry
persisted before debugging anything else.

## Requirement 3: workflow permissions

`publish.yml` carries `id-token: write` (lets the job request the OIDC JWT
that npm exchanges for short-lived publish credentials) plus
`contents: read`. Both are required; without `id-token: write` the publish
step cannot authenticate.

## Publishing access, 2FA, and why there is no NPM_TOKEN

All "Publishing access" settings are compatible with trusted publishing —
OIDC authenticates without a token, so 2FA rules do not apply to it. The
package currently uses the strictest option (2FA required, bypass tokens
disallowed). A granular `NPM_TOKEN` fallback would need a bypass-capable
token, which that setting blocks — so the workflow intentionally has no
token fallback.

## Gotchas already solved in `publish.yml`

- **No `registry-url` on `actions/setup-node`.** Trusted publishing needs no
  token in `~/.npmrc`; passing `registry-url` makes setup-node write
  `always-auth=true`, which npm 11+ warns about and npm 12 will reject.
- **No `package-manager-cache` input** — removed in newer setup-node v4;
  passing it prints `Warning: Unexpected input(s)`.
- **`repository.url` is `git+https://github.com/Something-important/MorphUI.git`**
  — otherwise npm prints `warn publish "repository.url" was normalized`.
- **A registry 404 does not mean the package is missing** — it means
  authentication or authorization failed. Check the npm CLI version and the
  trusted-publisher registration first.
- On failure the workflow dumps the newest npm debug log — read the tail of
  the failed run before debugging blind.

## Verifying a publish

1. Check the Actions run for "Publish to npm" (green).
2. `npm view morphui-react version` should print the new version.
3. The npm package page shows a provenance attestation linked to the GitHub
   run that produced it.
