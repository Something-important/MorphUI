import { useRef, useState, type CSSProperties, type ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Button,
  Badge,
  Input,
  Switch,
  Checkbox,
  Avatar,
  Spinner,
  Progress,
  Card,
  Alert,
  Breadcrumb,
  Divider,
  Label,
  Toggle,
  Stepper,
  RadioGroup,
  Rating,
  Slider,
  Pagination,
  TagInput,
} from '../../components';
import { ThemeProvider, themes, type Theme, type ThemeName } from '../../components/theme';
import { Demo, Row, Stack, Grid, ThemeGrid, themeNames } from '../_shared';

const meta: Meta = {
  title: 'Foundations/Theme Showcase',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Every MorphUI component, rendered once per preset theme (light / dark / warm / cool / purple) side-by-side, plus a Custom Theme story that restores the interactive theme-builder capability the PR #85 rewrite dropped: pick a base preset, override a handful of tokens live, and copy or download the generated theme file. Built on the shared demo kit (`src/stories/_shared/`); the old `src/stories/ThemeShowcase.stories.tsx` is deleted in PR 3 (Phase 10).',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <Demo title={title}>
    <ThemeGrid>{children}</ThemeGrid>
  </Demo>
);

export const AllThemes: Story = {
  render: () => (
    <div
      style={{
        padding: '32px 48px',
        background: 'var(--color-background, #fff)',
        color: 'var(--color-text, #111827)',
        minHeight: '100vh',
      }}
    >
      <header style={{ marginBottom: '32px' }}>
        <h1
          style={{
            margin: '0 0 8px 0',
            fontSize: 'var(--font-size-3xl, 24px)',
            fontWeight: 'var(--font-weight-bold, 700)',
            color: 'var(--color-heading-primary, #111827)',
          }}
        >
          Theme Showcase
        </h1>
        <p style={{ color: 'var(--color-text-secondary, #6b7280)', margin: 0 }}>
          All 5 preset themes side-by-side, demonstrating that every component responds correctly to
          the CSS custom properties set by <code>ThemeProvider</code>.
        </p>
      </header>

      <Stack gap={32}>
        <Section title="Buttons">
          <Row gap={8} wrap>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="success">Success</Button>
            <Button variant="warning">Warning</Button>
            <Button variant="info">Info</Button>
          </Row>
        </Section>

        <Section title="Badges">
          <Row gap={8} wrap>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="danger">Danger</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="light">Light</Badge>
            <Badge variant="dark">Dark</Badge>
          </Row>
        </Section>

        <Section title="Form inputs">
          <Stack gap={12}>
            <Input placeholder="Text input" style={{ width: '100%' }} />
            <Row gap={16}>
              <Switch defaultChecked />
              <Checkbox defaultChecked label="Checkbox" />
              <Toggle defaultChecked label="Toggle" />
              <Label>Label</Label>
            </Row>
          </Stack>
        </Section>

        <Section title="Avatars & indicators">
          <Row gap={16} align="center">
            <Avatar size="md" name="Jane Doe" />
            <Avatar size="md" name="Bob Smith" status="online" />
            <Spinner size="md" />
            <Progress value={65} style={{ width: '160px' }} />
          </Row>
        </Section>

        <Section title="Card">
          <Card style={{ padding: '16px', width: '100%' }}>
            <strong style={{ display: 'block', marginBottom: '4px' }}>Card title</strong>
            <span
              style={{
                color: 'var(--color-text-secondary, #6b7280)',
                fontSize: 'var(--font-size-sm, 12px)',
              }}
            >
              Card body text — should be readable in every theme.
            </span>
          </Card>
        </Section>

        <Section title="Alert">
          <Alert variant="info" title="Information">
            This is an informational alert.
          </Alert>
        </Section>

        <Section title="Divider & Breadcrumb">
          <Stack gap={12}>
            <Breadcrumb
              items={[
                { label: 'Home', href: '#' },
                { label: 'Section', href: '#' },
                { label: 'Page', href: '#' },
              ]}
            />
            <Divider />
            <span>Content below the divider</span>
          </Stack>
        </Section>

        <Section title="Stepper">
          <Stepper
            steps={[
              { id: '1', label: 'Account', completed: true },
              { id: '2', label: 'Profile' },
              { id: '3', label: 'Confirm' },
              { id: '4', label: 'Done' },
            ]}
            activeStep={2}
          />
        </Section>

        <Section title="RadioGroup">
          <RadioGroup
            name="r"
            options={[
              { label: 'Option A', value: 'a' },
              { label: 'Option B', value: 'b' },
              { label: 'Option C', value: 'c' },
            ]}
            defaultValue="a"
          />
        </Section>

        <Section title="Rating & Slider">
          <Stack gap={12}>
            <Rating defaultValue={3} />
            <Slider defaultValue={40} style={{ width: '240px' }} />
          </Stack>
        </Section>

        <Section title="Pagination">
          <Pagination totalItems={100} pageSize={10} currentPage={3} />
        </Section>

        <Section title="TagInput">
          <TagInput
            defaultTags={['react', 'typescript', 'design-system']}
            placeholder="Add tag..."
          />
        </Section>
      </Stack>
    </div>
  ),
};

export const SingleTheme: Story = {
  // Demonstrates a single component grid in just the toolbar's current theme.
  // Useful for seeing one theme in detail without the side-by-side distraction.
  render: () => (
    <div
      style={{
        padding: '32px 48px',
        background: 'var(--color-background, #fff)',
        color: 'var(--color-text, #111827)',
        minHeight: '100vh',
      }}
    >
      <Demo title="All button variants & sizes (current theme only)">
        <Stack gap={16}>
          <Grid cols={4}>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="success">Success</Button>
            <Button variant="warning">Warning</Button>
            <Button variant="info">Info</Button>
          </Grid>
          <Grid cols={5}>
            <Button size="xs">XS</Button>
            <Button size="sm">SM</Button>
            <Button size="md">MD</Button>
            <Button size="lg">LG</Button>
            <Button size="xl">XL</Button>
          </Grid>
        </Stack>
      </Demo>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Custom Theme story — restores the interactive theme-builder capability the
// PR #85 rewrite dropped (the old Theme/Theme Showcase story had a custom
// orange theme + live color controls). This version keeps the modern idiom:
// themes are plain objects, start from a preset spread, override a few tokens.
// For token-by-token editing of all 355 tokens use Foundations → Token Builder.
// ---------------------------------------------------------------------------

/** Teal brand example — deliberately distinct from all 5 presets. */
const brandTheme: Theme = {
  ...themes.light,
  'color-primary': '#0d9488',
  'color-primary-hover': '#0f766e',
  'color-primary-active': '#115e59',
  'color-primary-light': 'rgba(13, 148, 136, 0.1)',
  'border-radius': '10px',
  'font-family': 'Inter, sans-serif',
};

const RECIPE_CODE = `import { lightTheme, type Theme } from 'morphui-react';

const brandTheme: Theme = {
  ...lightTheme,            // start from a preset
  'color-primary': '#0d9488',
  'color-primary-hover': '#0f766e',
  'color-primary-active': '#115e59',
  'color-primary-light': 'rgba(13, 148, 136, 0.1)',
  'border-radius': '10px',
  'font-family': 'Inter, sans-serif',
};`;

const isValidHex = (v: string) => /^#?[0-9a-f]{6}$/i.test(v.trim());

/** Darken a #rrggbb hex by `factor` (0–1). Returns the input unchanged if invalid. */
const shade = (hex: string, factor: number): string => {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return hex;
  const n = parseInt(m[1], 16);
  const r = Math.round(((n >> 16) & 0xff) * factor);
  const g = Math.round(((n >> 8) & 0xff) * factor);
  const b = Math.round((n & 0xff) * factor);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
};

/** Convert a #rrggbb hex to an rgba() string, or null if invalid. */
const hexToRgba = (hex: string, alpha: number): string | null => {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return null;
  const n = parseInt(m[1], 16);
  return `rgba(${(n >> 16) & 0xff}, ${(n >> 8) & 0xff}, ${n & 0xff}, ${alpha})`;
};

const RADIUS_OPTIONS: Record<string, string> = {
  none: '0px',
  sm: '4px',
  md: '6px',
  lg: '10px',
  xl: '16px',
  full: '9999px',
};

const FONT_OPTIONS: Record<string, string> = {
  system: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  inter: 'Inter, sans-serif',
  serif: "Georgia, 'Times New Roman', serif",
  mono: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
};

const labelStyle: CSSProperties = {
  fontSize: 'var(--font-size-sm, 12px)',
  fontWeight: 'var(--font-weight-semibold, 600)',
  color: 'var(--color-text, #111827)',
};

const controlStyle: CSSProperties = {
  padding: '6px 10px',
  border: '1px solid var(--color-border, #d1d5db)',
  borderRadius: 'var(--border-radius-sm, 4px)',
  background: 'var(--color-background, #fff)',
  color: 'var(--color-text, #111827)',
  fontSize: 'var(--font-size-sm, 12px)',
  fontFamily: 'inherit',
};

/**
 * A panel that scopes an arbitrary Theme object to its own subtree via
 * ThemeProvider's `target` prop — same pattern as ThemeGrid's cells, but
 * accepting a Theme object (not just a preset name) so custom themes can
 * be previewed side-by-side with presets.
 */
const ScopedPanel = ({
  label,
  theme,
  children,
}: {
  label: string;
  theme: Theme;
  children: ReactNode;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      style={{
        border: '1px solid var(--color-border, #d1d5db)',
        borderRadius: 'var(--border-radius-md, 8px)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          padding: '6px 10px',
          fontSize: 'var(--font-size-xs, 10px)',
          fontWeight: 'var(--font-weight-semibold, 600)',
          color: '#fff',
          background: theme['color-primary'] ?? '#0070f3',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}
      >
        {label}
      </div>
      <ThemeProvider theme={theme} target={ref}>
        <div
          ref={ref}
          style={{
            padding: '16px',
            background: theme['color-background'] ?? '#fff',
            color: theme['color-text'] ?? '#111827',
            minHeight: '80px',
          }}
        >
          {children}
        </div>
      </ThemeProvider>
    </div>
  );
};

/** Representative component set rendered inside every theme panel. */
const PreviewSet = () => (
  <Stack gap={12}>
    <Row gap={8} wrap>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
    </Row>
    <Row gap={8} wrap>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="danger">Danger</Badge>
    </Row>
    <Row gap={16} wrap align="center">
      <Input placeholder="Text input" style={{ width: '180px' }} />
      <Switch defaultChecked />
      <Avatar size="sm" name="Ada Lovelace" status="online" />
      <Progress value={65} style={{ width: '120px' }} />
      <Spinner size="sm" />
    </Row>
    <Alert variant="info" title="Heads up">
      Backgrounds, borders, text and focus rings all follow the scoped theme.
    </Alert>
  </Stack>
);

/** Code block with Copy + Download actions (same .ts download pattern as Token Builder). */
const CodeBlock = ({ code, fileName }: { code: string; fileName: string }) => {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      // Clipboard API can be unavailable (permissions / non-secure context).
      const ta = document.createElement('textarea');
      ta.value = code;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };
  const download = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  return (
    <div>
      <Row gap={8} style={{ marginBottom: 8 }}>
        <Button size="sm" variant="primary" onClick={copy}>
          {copied ? 'Copied!' : 'Copy code'}
        </Button>
        <Button size="sm" variant="secondary" onClick={download}>
          Download {fileName}
        </Button>
      </Row>
      <pre
        style={{
          margin: 0,
          padding: '12px 16px',
          background: 'var(--color-background-secondary, #f3f4f6)',
          borderRadius: 'var(--border-radius-md, 8px)',
          overflow: 'auto',
          fontSize: '12px',
          lineHeight: 1.6,
        }}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
};

/** Color picker + hex text field pair. Invalid hex is left visible but skipped downstream. */
const ColorField = ({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
}) => (
  <Stack gap={4}>
    <label htmlFor={id} style={labelStyle}>
      {label}
    </label>
    <Row gap={8}>
      <input
        id={id}
        type="color"
        value={isValidHex(value) ? value : '#000000'}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: '40px',
          height: '32px',
          padding: 0,
          border: '1px solid var(--color-border, #d1d5db)',
          borderRadius: 'var(--border-radius-sm, 4px)',
          cursor: 'pointer',
          background: 'transparent',
        }}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="#0d9488"
        aria-label={`${label} hex value`}
        style={{
          ...controlStyle,
          flex: 1,
          borderColor: isValidHex(value) ? undefined : 'var(--color-danger, #ef4444)',
        }}
      />
    </Row>
  </Stack>
);

export const CustomTheme: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Build your own theme: pick a base preset, override a handful of tokens with live controls, compare base vs custom side-by-side, then copy or download the generated theme file. Restores the custom-theme playground the old Theme/Theme Showcase story had before the PR #85 rewrite. For token-by-token editing of all 355 tokens, use Foundations → Token Builder.',
      },
    },
  },
  render: () => {
    const [base, setBase] = useState<ThemeName>('light');
    const [primary, setPrimary] = useState('#0d9488');
    const [derive, setDerive] = useState(true);
    const [background, setBackground] = useState('#ffffff');
    const [radius, setRadius] = useState('lg');
    const [font, setFont] = useState('inter');
    const [exportName, setExportName] = useState('myTheme');

    const primaryValid = isValidHex(primary);
    const backgroundValid = isValidHex(background);

    // Only apply overrides that parse — invalid hex keeps the base value.
    const overrides: Record<string, string> = {};
    if (primaryValid) {
      overrides['color-primary'] = primary.trim();
      if (derive) {
        overrides['color-primary-hover'] = shade(primary, 0.85);
        overrides['color-primary-active'] = shade(primary, 0.72);
        overrides['color-primary-light'] = hexToRgba(primary, 0.1) ?? '';
      }
    }
    if (backgroundValid) overrides['color-background'] = background.trim();
    overrides['border-radius'] = RADIUS_OPTIONS[radius];
    overrides['font-family'] = FONT_OPTIONS[font];

    const customTheme: Theme = { ...themes[base], ...overrides };

    const safeName = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(exportName) ? exportName : 'myTheme';
    const escape = (v: string) => v.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
    const code = [
      `import { ${base}Theme, type Theme } from 'morphui-react';`,
      '',
      `export const ${safeName}: Theme = {`,
      `  ...${base}Theme,`,
      ...Object.keys(overrides).map((k) => `  '${k}': '${escape(overrides[k])}',`),
      '};',
    ].join('\n');

    return (
      <div
        style={{
          padding: '32px 48px',
          background: 'var(--color-background, #fff)',
          color: 'var(--color-text, #111827)',
          minHeight: '100vh',
        }}
      >
        <header style={{ marginBottom: '32px' }}>
          <h1
            style={{
              margin: '0 0 8px 0',
              fontSize: 'var(--font-size-3xl, 24px)',
              fontWeight: 'var(--font-weight-bold, 700)',
              color: 'var(--color-heading-primary, #111827)',
            }}
          >
            Custom themes
          </h1>
          <p style={{ color: 'var(--color-text-secondary, #6b7280)', margin: 0 }}>
            A theme is a plain object of <code>token &rarr; CSS value</code>. Spread a preset,
            override what you need, pass it to <code>ThemeProvider</code> — every component follows.
            See <strong>Getting Started &rarr; Theming Guide</strong> for the full API.
          </p>
        </header>

        <Demo
          title="1 · The recipe — spread a preset, override a few tokens"
          description="Six overridden tokens turn lightTheme into a teal brand theme. Everything else is inherited."
        >
          <Grid cols={2}>
            <ScopedPanel label="light (preset)" theme={themes.light}>
              <PreviewSet />
            </ScopedPanel>
            <ScopedPanel label="brand (custom)" theme={brandTheme}>
              <PreviewSet />
            </ScopedPanel>
          </Grid>
          <div style={{ marginTop: 12 }}>
            <CodeBlock code={RECIPE_CODE} fileName="brandTheme.ts" />
          </div>
        </Demo>

        <Demo
          title="2 · Interactive builder"
          description="Pick a base theme, tweak the knobs, compare base vs yours side-by-side, then copy or download the generated file."
        >
          <Grid cols={3} gap={16}>
            <Stack gap={4}>
              <span style={labelStyle}>Base theme</span>
              <Row gap={6} wrap>
                {themeNames.map((name) => (
                  <Button
                    key={name}
                    size="sm"
                    variant={base === name ? 'primary' : 'secondary'}
                    onClick={() => setBase(name)}
                    style={{ textTransform: 'capitalize' }}
                  >
                    {name}
                  </Button>
                ))}
              </Row>
            </Stack>
            <ColorField
              id="ct-primary"
              label="Primary color"
              value={primary}
              onChange={setPrimary}
            />
            <ColorField
              id="ct-background"
              label="Background"
              value={background}
              onChange={setBackground}
            />
            <Stack gap={4}>
              <label htmlFor="ct-radius" style={labelStyle}>
                Border radius
              </label>
              <select
                id="ct-radius"
                value={radius}
                onChange={(e) => setRadius(e.target.value)}
                style={controlStyle}
              >
                {Object.entries(RADIUS_OPTIONS).map(([k, v]) => (
                  <option key={k} value={k}>
                    {k} ({v})
                  </option>
                ))}
              </select>
            </Stack>
            <Stack gap={4}>
              <label htmlFor="ct-font" style={labelStyle}>
                Font family
              </label>
              <select
                id="ct-font"
                value={font}
                onChange={(e) => setFont(e.target.value)}
                style={controlStyle}
              >
                {Object.keys(FONT_OPTIONS).map((k) => (
                  <option key={k} value={k}>
                    {k}
                  </option>
                ))}
              </select>
            </Stack>
            <Stack gap={4}>
              <label htmlFor="ct-name" style={labelStyle}>
                Export name
              </label>
              <input
                id="ct-name"
                type="text"
                value={exportName}
                onChange={(e) => setExportName(e.target.value)}
                placeholder="myTheme"
                style={controlStyle}
              />
            </Stack>
          </Grid>

          <div style={{ marginTop: 12 }}>
            <Checkbox
              checked={derive}
              onChange={setDerive}
              label="Auto-derive hover / active / tint shades from the primary color"
            />
          </div>

          {(!primaryValid || !backgroundValid) && (
            <p
              style={{
                margin: '8px 0 0 0',
                color: 'var(--color-danger, #ef4444)',
                fontSize: 'var(--font-size-sm, 12px)',
              }}
            >
              Invalid hex value — that override is skipped until it parses as #rrggbb.
            </p>
          )}

          <Grid cols={2} style={{ marginTop: 16 }}>
            <ScopedPanel label={`${base} (base)`} theme={themes[base]}>
              <PreviewSet />
            </ScopedPanel>
            <ScopedPanel label="yours (custom)" theme={customTheme}>
              <PreviewSet />
            </ScopedPanel>
          </Grid>

          <div style={{ marginTop: 16 }}>
            <CodeBlock code={code} fileName={`${safeName}.ts`} />
          </div>
        </Demo>
      </div>
    );
  },
};
