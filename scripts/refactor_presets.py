#!/usr/bin/env python3
"""One-time refactor: rewrite each non-light theme preset as
`{ ...lightTheme, <overrides> }`, keeping only the tokens that differ
from lightTheme and preserving the original section comments.

Idempotent: re-running on already-refactored files is a no-op (it
parses the override object and re-emits it the same way).
"""
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent.parent
THEMES = ROOT / 'src' / 'components' / 'theme' / 'themes'

PRESETS = ['darkTheme', 'coolTheme', 'warmTheme', 'purpleTheme']

# Parse a flat `'key': 'value'` object body into an ordered list of
# (key, value) pairs.
ENTRY_RE = re.compile(r"'([a-z0-9-]+)'\s*:\s*'((?:[^'\\]|\\.)*)'")


def parse_light():
    src = (THEMES / 'lightTheme.ts').read_text()
    m = re.search(r'export const lightTheme[^=]*=\s*\{(.*)\};', src, re.S)
    return dict(ENTRY_RE.findall(m.group(1)))


def parse_preset_lines(name):
    """Return the raw lines of the object body (between the outer braces)."""
    src = (THEMES / f'{name}.ts').read_text()
    m = re.search(r'export const \w+[^=]*=\s*\{(.*)\};', src, re.S)
    if not m:
        raise SystemExit(f'could not locate object in {name}.ts')
    return m.group(1).split('\n')


def refactor_preset(name, light):
    """Build the new file text for a preset, keeping only differing tokens
    under their original section comments."""
    lines = parse_preset_lines(name)
    # Walk the lines, tracking the current section comment, and collect
    # (section, key, value) for tokens whose value differs from light.
    overrides = []  # list of (section_comment, key, value)
    current_section = None
    for line in lines:
        stripped = line.strip()
        if not stripped:
            continue
        if stripped.startswith('//'):
            current_section = stripped
            continue
        em = ENTRY_RE.match(stripped.rstrip(','))
        if not em:
            continue
        k, v = em.group(1), em.group(2)
        if light.get(k) != v:
            overrides.append((current_section, k, v))

    # Emit the new file.
    out = []
    out.append("import { lightTheme } from './lightTheme';")
    out.append("import type { Theme } from '.';")
    out.append('')
    out.append(f'export const {name}: Theme = {{')
    out.append('  ...lightTheme,')
    out.append('')
    out.append('  // Only the tokens that differ from lightTheme are listed below.')
    out.append('  // Everything else is inherited from the base via the spread above.')
    out.append('')

    last_section = object()
    for section, k, v in overrides:
        if section is not None and section != last_section:
            out.append(f'  {section}')
            last_section = section
        out.append(f"  '{k}': '{v}',")

    out.append('};')
    out.append('')
    return '\n'.join(out), len(overrides)


def main():
    light = parse_light()
    print(f'lightTheme: {len(light)} tokens (the base)')
    for name in PRESETS:
        text, n = refactor_preset(name, light)
        path = THEMES / f'{name}.ts'
        path.write_text(text)
        print(f'  {name}: {n} overrides written ({path})')


if __name__ == '__main__':
    main()
