# Security Policy

## Supported versions

| Version | Supported |
| ------- | --------- |
| 1.0.x   | ✅        |
| < 1.0   | ❌        |

## Reporting a vulnerability

**Do NOT open a public issue for security vulnerabilities.**

Instead, email the maintainer directly or use GitHub's private vulnerability
reporting:

1. Go to the [Security tab](https://github.com/Something-important/MorphUI/security)
2. Click "Report a vulnerability"
3. Describe the issue with reproduction steps

You will receive a response within 48 hours. If the vulnerability is
confirmed, a fix will be released as a patch version and credited in the
changelog (unless you prefer to remain anonymous).

## Security measures already in place

- **npm provenance**: Every published version is signed with Sigstore
  provenance attestation (SLSA v1). Consumers can verify the package
  was built from the exact GitHub source.
- **OIDC trusted publishing**: No `NPM_TOKEN` secret — publish credentials
  are short-lived OIDC tokens exchanged at publish time.
- **No runtime code injection**: All CSS is extracted at build time; no
  `eval()`, no `innerHTML`, no dynamic script loading.
- **Peer dependency isolation**: React and ReactDOM are peer deps —
  MorphUI never bundles them, preventing version conflicts.
