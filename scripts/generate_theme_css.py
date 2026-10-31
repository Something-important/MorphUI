#!/usr/bin/env python3
"""Generate src/components/theme/theme.css :root from themes/lightTheme.ts.

Single source of truth: the theme presets. The old hand-written theme.css
defined only 71 of the 347 tokens the presets (and components) use; the
remaining 282 were undefined unless a ThemeProvider was mounted.

Usage: python3 scripts/generate_theme_css.py  (run from repo root or anywhere;
paths are resolved from this script's location).

The output is Prettier-stable (singleQuote, 100-col wrapping) so that
`npx prettier --check` passes without reformatting. CI regenerates and diffs
this file to enforce that presets remain the only place tokens are defined.
"""
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent.parent
LIGHT = ROOT / 'src' / 'components' / 'theme' / 'themes' / 'lightTheme.ts'
OUT = ROOT / 'src' / 'components' / 'theme' / 'theme.css'

src = LIGHT.read_text()

# capture the object body of `export const lightTheme = { ... };`
m = re.search(r'export const lightTheme[^=]*=\s*\{(.*)\};', src, re.S)
if not m:
    raise SystemExit('could not locate lightTheme object')

body = m.group(1)

# tokenize entries: 'key': 'value',
entries = []
for em in re.finditer(r"'([a-z0-9-]+)'\s*:\s*'((?:[^'\\]|\\.)*)'", body):
    entries.append((em.group(1), em.group(2)))

if len(entries) < 300:
    raise SystemExit(f'parsed too few entries ({len(entries)}); aborting')

# group keys by family for readable output, preserving first-appearance order
def family(key):
    for prefix in ('color-gray', 'color-background', 'color-text', 'color-border',
                   'color-primary', 'color-secondary', 'color-success', 'color-warning',
                   'color-danger', 'color-info', 'color-option', 'color-content',
                   'color-heading', 'color-link', 'color-white', 'color-black',
                   'gradient-', 'font-family', 'font-size', 'font-weight',
                   'letter-spacing', 'line-height', 'spacing-', 'border-radius',
                   'shadow-', 'transition-', 'duration-', 'ease-', 'delay-',
                   'backdrop-blur', 'breakpoint-', 'container-', 'z-', 'opacity-',
                   'transform-', 'filter-', 'text-decoration', 'max-width',
                   'min-width', 'width-', 'height-', 'sidebar-', 'switch-',
                   'checkbox-', 'radio-', 'input-', 'modal-', 'header-', 'nav-'):
        if key.startswith(prefix):
            return prefix.rstrip('-')
    return key.split('-')[0]

seen_families = []
groups = {}
for k, v in entries:
    f = family(k)
    groups.setdefault(f, []).append((k, v))
    if f not in seen_families:
        seen_families.append(f)

lines = [
    '/*',
    ' * MorphUI default theme tokens (CSS custom properties).',
    ' *',
    ' * AUTO-GENERATED from src/components/theme/themes/lightTheme.ts —',
    ' * do not edit by hand. Regenerate with:',
    ' *   python3 scripts/generate_theme_css.py',
    ' *',
    ' * These are the no-ThemeProvider defaults. ThemeProvider mounts presets',
    ' * (light/dark/warm/cool/purple) by setting the same variables inline on',
    ' * :root, which override these values.',
    ' */',
    ':root {',
]
for f in seen_families:
    lines.append(f'  /* {f} */')
    for k, v in groups[f]:
        # Prettier (singleQuote) normalizes double quotes in CSS values to
        # single quotes; emit that form so the generated file is format-stable.
        v = v.replace('"', "'")
        if len(f'  --{k}: {v};') > 100:
            # match prettier's wrapping for over-width declarations
            lines.append(f'  --{k}:\n    {v};')
        else:
            lines.append(f'  --{k}: {v};')
    lines.append('')

# trim trailing blank line before closing brace
while lines and lines[-1] == '':
    lines.pop()
lines.append('}')

OUT.write_text('\n'.join(lines) + '\n')
print(f'wrote src/components/theme/theme.css with {len(entries)} tokens '
      f'across {len(seen_families)} families')
