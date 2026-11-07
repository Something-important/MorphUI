#!/usr/bin/env python3
"""Generate src/stories/foundations/DesignTokens.stories.tsx from theme.css.

Mirrors scripts/generate_theme_css.py — the established pattern of
auto-generating derived artifacts from the theme single-source-of-truth
so they can never drift.

Source: src/components/theme/theme.css (which is itself auto-generated
        from src/components/theme/themes/lightTheme.ts by
        generate_theme_css.py — so this script is two hops from the
        presets, but parsing theme.css avoids depending on TS syntax)

Output: src/stories/foundations/DesignTokens.stories.tsx

The generated story renders every token grouped by family, split across
multiple category stories to stay under Chromatic's 25M px screenshot
limit (a single all-tokens story was 3198x20444px = ~65M px).

Stories emitted:
  - Overview (summary counts, no token rows)
  - Colors (color-*, gradient-*)
  - Typography (font-*, letter-spacing, line-height, text-decoration)
  - Spacing & Layout (spacing-*, width-*, height-*, max-width-*, min-width-*, container-*, breakpoint-*)
  - Borders, Shadows & Effects (border-radius, shadow-*, backdrop-blur, opacity, transform, filter)
  - Animation (duration-*, delay-*, ease-*, transition-*)
  - Component Tokens (input-*, checkbox-*, radio-*, switch-*, nav-*, sidebar-*, header-*, modal-*, z-*, color-option, color-content)

Each category story renders only the families in its group, with
appropriate visualizations:
  - color-* / gradient-*  → swatch box + hex/rgba value
  - spacing-* / font-size-* / width-* / height-* / max-width-* /
    min-width-* / border-radius-* / sidebar-* / modal-* / header-* /
    nav-* / checkbox-* / radio-* / switch-* / input-* → size bar
  - font-family-* → text preview in that family
  - font-weight-* → "The quick brown fox" preview at that weight
  - line-height-* → two-line text preview at that line-height
  - letter-spacing-* → "AVBWCF" preview at that spacing
  - duration-* / delay-* → numeric value only
  - ease-* / transition-* → numeric value only
  - shadow-* → box-shadow preview on a square
  - backdrop-blur-* → blur preview on a square over a gradient
  - opacity-* → opacity preview on a colored square
  - z-* → numeric value only
  - everything else → raw value text

Usage: python3 scripts/generate_tokens_story.py
       (run from repo root or anywhere; paths resolve from script location)

CI regenerates and diffs this file to enforce that DesignTokens.stories.tsx
stays in sync with theme.css. If a token is added to lightTheme.ts but the
script isn't re-run, CI fails with a helpful message.
"""
import json
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent.parent
THEME_CSS = ROOT / 'src' / 'components' / 'theme' / 'theme.css'
OUT = ROOT / 'src' / 'stories' / 'foundations' / 'DesignTokens.stories.tsx'
OUT.parent.mkdir(parents=True, exist_ok=True)

src = THEME_CSS.read_text()

# Parse `:root { --key: value; ... }` from theme.css.
# Tokens are written one per line; multi-line wrapping (when value > 100 cols)
# uses the form `--key:\n    value;` per generate_theme_css.py.
root_match = re.search(r':root\s*\{(.*)\}', src, re.S)
if not root_match:
    raise SystemExit('could not locate :root block in theme.css')

root_body = root_match.group(1)

# Match either `--key: value;` (single line) or `--key:\n    value;` (wrapped)
token_re = re.compile(r'^\s*--([a-z0-9-]+):\s*\n?\s*([^;]+);', re.M)
entries = []
for m in token_re.finditer(root_body):
    key = m.group(1)
    value = m.group(2).strip()
    # Normalize prettier's single-quote wrapping back to double quotes for
    # font-family values that contain quoted names (e.g. 'Segoe UI' → "Segoe UI")
    value = value.replace("'", '"')
    entries.append((key, value))

if len(entries) < 300:
    raise SystemExit(f'parsed too few tokens ({len(entries)}); aborting')


# Group by family, preserving first-appearance order — same logic as
# generate_theme_css.py so the families match between theme.css and the story.
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


# Token rendering strategy — pick the appropriate widget per family.
def render_strategy(fam):
    """Return the rendering strategy name for a family."""
    if fam in ('color-primary', 'color-secondary', 'color-success', 'color-warning',
               'color-danger', 'color-info', 'color-gray', 'color-background',
               'color-text', 'color-border', 'color-option', 'color-content',
               'color-heading', 'color-link', 'color-white', 'color-black'):
        return 'swatch'
    if fam == 'gradient':
        return 'gradient-swatch'
    if fam == 'font-family':
        return 'font-family'
    if fam == 'font-size':
        return 'font-size'
    if fam == 'font-weight':
        return 'font-weight'
    if fam == 'line-height':
        return 'line-height'
    if fam == 'letter-spacing':
        return 'letter-spacing'
    if fam == 'spacing':
        return 'size-bar'
    if fam == 'border-radius':
        return 'radius-preview'
    if fam == 'shadow':
        return 'shadow-preview'
    if fam == 'backdrop-blur':
        return 'blur-preview'
    if fam == 'opacity':
        return 'opacity-preview'
    if fam in ('width', 'height', 'max-width', 'min-width', 'container', 'sidebar',
               'switch', 'checkbox', 'radio', 'input', 'modal', 'header', 'nav'):
        return 'size-bar'
    if fam in ('duration', 'delay', 'ease', 'transition', 'z', 'transform',
               'filter', 'text-decoration', 'breakpoint'):
        return 'raw'
    return 'raw'


# Generate the story file. We emit a self-contained .stories.tsx with inline
# React components (no shared kit dependency — Phase 3 hasn't landed yet, and
# the Design Tokens page should be portable).
HEADER = """\
// AUTO-GENERATED from src/components/theme/theme.css by scripts/generate_tokens_story.py
// do not edit by hand. Regenerate with: npm run tokens:story:generate
// CI enforces this file matches the script output (drift check in workflows/ci.yml).

import type { Meta, StoryObj } from '@storybook/react';
import type { ReactNode } from 'react';

const meta: Meta = {
  title: 'Foundations/Design Tokens',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Every CSS custom property defined in `theme.css`, grouped by family and rendered with an appropriate visualization. Switch themes via the toolbar to see how each preset overrides the defaults. This page is auto-generated — to add or change a token, edit `src/components/theme/themes/lightTheme.ts` and run `npm run tokens:story:generate`.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

// ---- rendering helpers (inlined so the file is self-contained) ----

const TokenRow = ({ name, value, children }: { name: string; value: string; children?: ReactNode }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'minmax(220px, 1fr) minmax(180px, 1.2fr) minmax(120px, 2fr)',
      gap: '12px',
      alignItems: 'center',
      padding: '8px 12px',
      borderBottom: '1px solid var(--color-border-light, #eee)',
      fontSize: 'var(--font-size-md, 14px)',
    }}
  >
    <code style={{ color: 'var(--color-text-secondary, #6b7280)' }}>--{name}</code>
    <code style={{ color: 'var(--color-text, #111827)' }}>{value}</code>
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>{children}</div>
  </div>
);

const Swatch = ({ value }: { value: string }) => (
  <div
    style={{
      width: '32px',
      height: '32px',
      borderRadius: 'var(--border-radius-sm, 4px)',
      background: value,
      border: '1px solid var(--color-border, #d1d5db)',
      flexShrink: 0,
    }}
  />
);

const SizeBar = ({ value }: { value: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
    <div
      style={{
        height: '16px',
        width: value,
        background: 'var(--color-primary, #0070f3)',
        borderRadius: 'var(--border-radius-sm, 4px)',
        maxWidth: '100%',
        opacity: 0.85,
      }}
    />
  </div>
);

const RadiusPreview = ({ value }: { value: string }) => (
  <div
    style={{
      width: '48px',
      height: '48px',
      borderRadius: value,
      background: 'var(--color-primary, #0070f3)',
      opacity: 0.85,
    }}
  />
);

const ShadowPreview = ({ value }: { value: string }) => (
  <div
    style={{
      width: '48px',
      height: '48px',
      background: 'var(--color-background, #fff)',
      boxShadow: value,
      borderRadius: 'var(--border-radius-sm, 4px)',
    }}
  />
);

const OpacityPreview = ({ value }: { value: string }) => (
  <div style={{ position: 'relative', width: '48px', height: '48px' }}>
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'var(--color-primary, #0070f3)',
        opacity: Number(value),
      }}
    />
  </div>
);

const FontFamilyPreview = ({ value }: { value: string }) => (
  <span style={{ fontFamily: value, fontSize: 'var(--font-size-lg, 16px)' }}>
    The quick brown fox
  </span>
);

const FontSizePreview = ({ value }: { value: string }) => (
  <span style={{ fontSize: value }}>Aa</span>
);

const FontWeightPreview = ({ value }: { value: string }) => (
  <span style={{ fontWeight: Number(value), fontSize: 'var(--font-size-md, 14px)' }}>
    The quick brown fox
  </span>
);

const LineHeightPreview = ({ value }: { value: string }) => (
  <div style={{ lineHeight: value, fontSize: 'var(--font-size-sm, 12px)', maxWidth: '160px' }}>
    The quick brown fox<br />jumps over the lazy dog
  </div>
);

const LetterSpacingPreview = ({ value }: { value: string }) => (
  <span style={{ letterSpacing: value, fontSize: 'var(--font-size-lg, 16px)' }}>AVBWCF</span>
);

const TokenSection = ({ title, family, tokens }: { title: string; family: string; tokens: Array<[string, string]> }) => {
  const renderPreview = (value: string) => {
    const strategy = STRATEGIES[family] || 'raw';
    switch (strategy) {
      case 'swatch':
      case 'gradient-swatch':
        return <Swatch value={value} />;
      case 'size-bar':
        return <SizeBar value={value} />;
      case 'radius-preview':
        return <RadiusPreview value={value} />;
      case 'shadow-preview':
        return <ShadowPreview value={value} />;
      case 'opacity-preview':
        return <OpacityPreview value={value} />;
      case 'font-family':
        return <FontFamilyPreview value={value} />;
      case 'font-size':
        return <FontSizePreview value={value} />;
      case 'font-weight':
        return <FontWeightPreview value={value} />;
      case 'line-height':
        return <LineHeightPreview value={value} />;
      case 'letter-spacing':
        return <LetterSpacingPreview value={value} />;
      default:
        return null;
    }
  };
  return (
    <section style={{ marginBottom: '40px' }}>
      <h2
        style={{
          fontSize: 'var(--font-size-xl, 18px)',
          fontWeight: 'var(--font-weight-semibold, 600)',
          color: 'var(--color-heading-primary, #111827)',
          margin: '0 0 12px 0',
          paddingBottom: '8px',
          borderBottom: '2px solid var(--color-border, #d1d5db)',
          textTransform: 'capitalize',
        }}
      >
        {title}{' '}
        <span
          style={{
            fontSize: 'var(--font-size-sm, 12px)',
            fontWeight: 'var(--font-weight-normal, 400)',
            color: 'var(--color-text-muted, #9ca3af)',
            marginLeft: '8px',
          }}
        >
          ({tokens.length} token{tokens.length === 1 ? '' : 's'})
        </span>
      </h2>
      <div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(220px, 1fr) minmax(180px, 1.2fr) minmax(120px, 2fr)',
            gap: '12px',
            padding: '8px 12px',
            background: 'var(--color-background-secondary, #f9fafb)',
            fontSize: 'var(--font-size-xs, 10px)',
            fontWeight: 'var(--font-weight-semibold, 600)',
            color: 'var(--color-text-muted, #9ca3af)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          <div>Token</div>
          <div>Value</div>
          <div>Preview</div>
        </div>
        {tokens.map(([name, value]) => (
          <TokenRow key={name} name={name} value={value}>
            {renderPreview(value)}
          </TokenRow>
        ))}
      </div>
    </section>
  );
};

// Map family → strategy, populated at generation time.
const STRATEGIES: Record<string, string> = __STRATEGIES_JSON__;

// ---- story wrapper (shared layout) ----

const StoryWrapper = ({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) => (
  <div
    style={{
      padding: '32px 48px',
      maxWidth: '1200px',
      margin: '0 auto',
      background: 'var(--color-background, #fff)',
      color: 'var(--color-text, #111827)',
      minHeight: '100vh',
    }}
  >
    <header style={{ marginBottom: '32px' }}>
      <h1
        style={{
          fontSize: 'var(--font-size-3xl, 24px)',
          fontWeight: 'var(--font-weight-bold, 700)',
          color: 'var(--color-heading-primary, #111827)',
          margin: '0 0 8px 0',
        }}
      >
        {title}
      </h1>
      <p style={{ color: 'var(--color-text-secondary, #6b7280)', margin: 0 }}>
        {subtitle}
      </p>
    </header>
    {children}
  </div>
);

__STORIES__
"""

# Build the strategies JSON: family → strategy
strategies_map = {fam: render_strategy(fam) for fam in seen_families}

# ---- category groupings ----
# Maps family name → story category. Families not listed here fall into
# "Component Tokens". This splits the 353 tokens across 6 stories so each
# stays under Chromatic's 25M px screenshot limit (was 65M px in one story).
CATEGORIES = {
    'Colors': [
        'color-primary', 'color-secondary', 'color-success', 'color-warning',
        'color-danger', 'color-info', 'color-gray', 'color-background',
        'color-text', 'color-border', 'color-heading', 'color-link',
        'color-white', 'color-black', 'gradient',
    ],
    'Typography': [
        'font-family', 'font-size', 'font-weight',
        'letter-spacing', 'line-height', 'text-decoration',
    ],
    'Spacing & Layout': [
        'spacing', 'width', 'height', 'max-width', 'min-width',
        'container', 'breakpoint',
    ],
    'Borders, Shadows & Effects': [
        'border-radius', 'shadow', 'backdrop-blur',
        'opacity', 'transform', 'filter',
    ],
    'Animation': [
        'duration', 'delay', 'ease', 'transition',
    ],
    'Component Tokens': [
        'input', 'checkbox', 'radio', 'switch', 'nav', 'sidebar',
        'header', 'modal', 'z', 'color-option', 'color-content',
    ],
}

def family_in_category(fam, cat_families):
    """Check if a family belongs to a category (exact match or prefix)."""
    return any(fam == f or fam.startswith(f) for f in cat_families)

# Build per-category family lists (preserving first-appearance order)
category_families = {}
for cat_name, cat_fams in CATEGORIES.items():
    category_families[cat_name] = [f for f in seen_families if family_in_category(f, cat_fams)]

# Build a section JSX string for one family
def build_section_jsx(fam):
    tokens = groups[fam]
    tokens_js = ', '.join(f"['{k}', {json.dumps(v)}]" for k, v in tokens)
    return '{<TokenSection title=' + json.dumps(fam) + ' family=' + json.dumps(fam) + ' tokens={[' + tokens_js + ']} />}'

# Build stories: one Overview + one per category
stories = []

# Overview story (no token rows — just summary counts)
overview_cards = '\n'.join(
    '        <div style={{ padding: 16, border: \'1px solid var(--color-border, #d1d5db)\', borderRadius: 8 }}>'
    '<strong>' + cat + '</strong><br />'
    '<span style={{ color: \'var(--color-text-secondary, #6b7280)\', fontSize: \'var(--font-size-sm, 12px)\' }}>'
    + str(len(category_families[cat])) + ' families</span></div>'
    for cat in CATEGORIES
)
stories.append(f"""export const Overview: Story = {{
  render: () => (
    <StoryWrapper title="Design Tokens" subtitle="{len(entries)} CSS custom properties across {len(seen_families)} families. Switch themes via the toolbar to see how each preset overrides the defaults. Browse individual category stories for full token details.">
      <div style={{{{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}}}>
{overview_cards}
      </div>
    </StoryWrapper>
  ),
}};""")

# Category stories
for cat_name, cat_fams in CATEGORIES.items():
    if not cat_fams:
        continue
    sections = [build_section_jsx(f) for f in cat_fams]
    cat_token_count = sum(len(groups[f]) for f in cat_fams)
    story_export_name = cat_name.replace(' ', '').replace('&', 'And').replace(',', '')
    stories.append(f"""export const {story_export_name}: Story = {{
  render: () => (
    <StoryWrapper title="{cat_name}" subtitle="{cat_token_count} tokens across {len(cat_fams)} families. Switch themes via the toolbar.">
{chr(10).join(f'      {s}' for s in sections)}
    </StoryWrapper>
  ),
}};""")

stories_js = '\n\n'.join(stories)

# Assemble the file
content = HEADER
content = content.replace('__STRATEGIES_JSON__', json.dumps(strategies_map, indent=2))
content = content.replace('__STORIES__', stories_js)

OUT.write_text(content)

# Run prettier on the generated file so its output is format-stable
# (matches what `prettier --write` would produce). This mirrors
# generate_theme_css.py's "Prettier-stable" approach — without it, CI's
# `npm run format:check` would fail because prettier wraps long
# `<TokenSection tokens={[...]} />` calls across multiple lines.
import subprocess
result = subprocess.run(
    ['npx', 'prettier', '--write', str(OUT)],
    cwd=str(ROOT),
    capture_output=True,
    text=True,
    timeout=60,
)
if result.returncode != 0:
    print(f'warning: prettier failed to format {OUT}:\n{result.stderr}')

print(f'wrote {OUT.relative_to(ROOT)} with {len(entries)} tokens across {len(seen_families)} families')
