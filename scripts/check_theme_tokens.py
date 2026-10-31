#!/usr/bin/env python3
"""Single-source-of-truth gate for MorphUI theme tokens.

Verifies, without touching any file:
  1. All 5 theme presets define the identical key set (a token present in
     only some presets becomes a stale variable when the user switches
     themes — the worst kind of silent theming bug).
  2. No preset defines a key twice (TS object literal silently keeps the
     last one, which hides copy-paste drift from any diff review).
  3. theme.css :root matches lightTheme exactly — keys AND values
     (quote-style normalized, since Prettier singleQuote rewrites inner
     double quotes on the CSS side).

Exit code 0 = aligned; 1 = drift, with instructions to regenerate.

CI runs this plus a regeneration diff:
    python3 scripts/generate_theme_css.py
    git diff --exit-code src/components/theme/theme.css
"""
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
THEMES = ROOT / 'src' / 'components' / 'theme' / 'themes'
CSS = ROOT / 'src' / 'components' / 'theme' / 'theme.css'
PRESETS = ['lightTheme', 'darkTheme', 'coolTheme', 'warmTheme', 'purpleTheme']

ENTRY_RE = re.compile(r"'([a-z0-9-]+)'\s*:\s*'((?:[^'\\]|\\.)*)'")


def parse_preset(name):
    """Return (ordered key list, dict key->value); duplicate keys recorded."""
    src = (THEMES / f'{name}.ts').read_text()
    m = re.search(r'export const \w+[^=]*=\s*\{(.*)\};', src, re.S)
    if not m:
        sys.exit(f'FATAL: could not locate {name} object')
    keys, values, dupes = [], {}, []
    for em in ENTRY_RE.finditer(m.group(1)):
        k, v = em.group(1), em.group(2)
        if k in values:
            dupes.append(k)
        values[k] = v
        keys.append(k)
    return keys, values, dupes


def parse_css_root():
    css = CSS.read_text()
    m = re.search(r':root\s*\{(.*?)\}', css, re.S)
    if not m:
        sys.exit('FATAL: no :root block in theme.css')
    return dict(re.findall(r'(--[\w-]+)\s*:\s*([^;]+);', m.group(1)))


def norm(v):
    # quote style is normalized on the CSS side (prettier singleQuote);
    # 'x' and "x" are semantically identical in CSS values.
    return v.strip().replace('"', "'")


def main():
    failures = []

    presets = {}
    for name in PRESETS:
        keys, values, dupes = parse_preset(name)
        presets[name] = (set(keys), values)
        if dupes:
            failures.append(f'{name}: duplicate keys {sorted(set(dupes))}')

    # 1. identical key sets across presets
    union = set().union(*(ks for ks, _ in presets.values()))
    for name, (ks, _) in presets.items():
        missing = sorted(union - ks)
        if missing:
            failures.append(
                f'{name}: missing {len(missing)} token(s) other presets define '
                f'(stale-var risk on theme switch): {missing[:10]}'
                + (' ...' if len(missing) > 10 else '')
            )

    # 2. theme.css :root == lightTheme (single source of truth)
    css_vars = parse_css_root()
    css_keys = set(css_vars)
    _, light = presets['lightTheme']
    light_vars = {f'--{k}': v for k, v in light.items()}
    light_keys = set(light_vars)

    extra = sorted(css_keys - light_keys)
    if extra:
        failures.append(
            f'theme.css defines {len(extra)} token(s) not in lightTheme — '
            f'move them into ALL presets, then regenerate: {extra[:10]}'
        )
    missing = sorted(light_keys - css_keys)
    if missing:
        failures.append(
            f'theme.css is stale — {len(missing)} preset token(s) missing '
            f'(run: python3 scripts/generate_theme_css.py): {missing[:10]}'
        )
    for k in sorted(css_keys & light_keys):
        if norm(css_vars[k]) != norm(light_vars[k]):
            failures.append(
                f'theme.css value drift for {k}:\n'
                f'          css = {css_vars[k].strip()!r}\n'
                f'   lightTheme = {light_vars[k].strip()!r}'
            )

    if failures:
        print('FAIL: theme token single-source-of-truth violations:')
        for f in failures:
            print(f'  - {f}')
        print(
            '\nFix: edit src/components/theme/themes/*.ts (all 5 presets), '
            'then run: python3 scripts/generate_theme_css.py'
        )
        sys.exit(1)

    n = len(union)
    print(
        f'OK: {len(PRESETS)} presets aligned ({n} tokens each), '
        f'theme.css :root matches lightTheme (values equal after quote '
        f'normalization).'
    )


if __name__ == '__main__':
    main()
