import { useMemo, useState, type CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Button,
  Input,
  Card,
  Badge,
  Avatar,
  Switch,
  Checkbox,
  Progress,
  Spinner,
  ThemeProvider,
  themes,
  type Theme,
  type ThemeName,
} from '../../components';
import { Row, Stack } from '../_shared';

const meta: Meta = {
  title: 'Foundations/Token Builder',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The single interactive theme playground for MorphUI. Tweak any of the 355 CSS custom properties, see the changes live on a curated grid of representative primitives, then export your customized theme as a `.ts` file matching the `Theme` type for copy-paste. This replaces the 15 per-component `InteractiveThemeBuilder` stories deleted in PR #83 — one tool, not fifteen.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

// ---- the curated preview grid (right panel) ----

const PreviewGrid = () => (
  <Stack gap={16}>
    <Row gap={8}>
      <Button variant="primary">Primary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
    </Row>
    <Row gap={8} align="start">
      <Input placeholder="Text input" style={{ width: '200px' }} />
      <Switch defaultChecked />
      <Checkbox defaultChecked label="Check me" />
    </Row>
    <Row gap={8} align="start">
      <Badge variant="primary">Primary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="danger">Danger</Badge>
    </Row>
    <Row gap={8} align="start">
      <Avatar size="md" name="Jane Doe" />
      <Spinner size="md" />
      <Progress value={60} style={{ width: '160px' }} />
    </Row>
    <Card style={{ padding: '16px', width: '100%' }}>
      <strong style={{ display: 'block', marginBottom: '4px' }}>Card preview</strong>
      <span
        style={{
          color: 'var(--color-text-secondary, #6b7280)',
          fontSize: 'var(--font-size-sm, 12px)',
        }}
      >
        Body text in --color-text-secondary, font-size-sm.
      </span>
    </Card>
  </Stack>
);

// ---- token grouping (mirrors generate_tokens_story.py family()) ----

const FAMILY_PREFIXES = [
  'color-gray',
  'color-background',
  'color-text',
  'color-border',
  'color-primary',
  'color-secondary',
  'color-success',
  'color-warning',
  'color-danger',
  'color-info',
  'color-option',
  'color-content',
  'color-heading',
  'color-link',
  'color-white',
  'color-black',
  'gradient-',
  'font-family',
  'font-size',
  'font-weight',
  'letter-spacing',
  'line-height',
  'spacing-',
  'border-radius',
  'shadow-',
  'transition-',
  'duration-',
  'ease-',
  'delay-',
  'backdrop-blur',
  'breakpoint-',
  'container-',
  'z-',
  'opacity-',
  'transform-',
  'filter-',
  'text-decoration',
  'max-width',
  'min-width',
  'width-',
  'height-',
  'sidebar-',
  'switch-',
  'checkbox-',
  'radio-',
  'input-',
  'modal-',
  'header-',
  'nav-',
];

const familyOf = (key: string): string => {
  for (const prefix of FAMILY_PREFIXES) {
    if (key.startsWith(prefix)) return prefix.replace(/-$/, '');
  }
  return key.split('-')[0];
};

const inputTypeFor = (key: string, value: string): 'color' | 'number' | 'text' => {
  // Color tokens: --color-* with hex/rgba value
  if (
    (key.startsWith('color-') || key.startsWith('gradient-')) &&
    (value.startsWith('#') || value.startsWith('rgb') || value.startsWith('linear'))
  ) {
    return 'color';
  }
  // Numeric tokens (spacing, sizes, durations, opacities, z-index) — slider
  if (
    /^[\d.]+(px|rem|em|ms|s|%|vh|vw)?$/.test(value.trim()) ||
    key.startsWith('spacing-') ||
    key.startsWith('font-size-') ||
    key.startsWith('font-weight-') ||
    key.startsWith('line-height-') ||
    key.startsWith('letter-spacing-') ||
    key.startsWith('opacity-') ||
    key.startsWith('z-') ||
    key.startsWith('duration-') ||
    key.startsWith('delay-') ||
    key.startsWith('border-radius-') ||
    key.startsWith('sidebar-') ||
    key.startsWith('switch-') ||
    key.startsWith('checkbox-') ||
    key.startsWith('radio-') ||
    key.startsWith('input-') ||
    key.startsWith('modal-') ||
    key.startsWith('header-') ||
    key.startsWith('nav-')
  ) {
    return 'number';
  }
  return 'text';
};

// ---- token editor ----

const TokenEditor = ({
  tokenKey,
  value,
  onChange,
}: {
  tokenKey: string;
  value: string;
  onChange: (v: string) => void;
}) => {
  const inputType = inputTypeFor(tokenKey, value);
  const labelStyle: CSSProperties = {
    fontFamily: 'var(--font-family-mono, monospace)',
    fontSize: 'var(--font-size-xs, 10px)',
    color: 'var(--color-text-secondary, #6b7280)',
    display: 'block',
    marginBottom: '2px',
  };
  const rowStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr) 140px',
    gap: '8px',
    alignItems: 'center',
    padding: '4px 0',
  };

  if (inputType === 'color') {
    // Try to extract a hex color for the native color picker; fall back to text
    const hexMatch = value.match(/#[0-9a-fA-F]{3,8}/);
    return (
      <div style={rowStyle}>
        <label style={labelStyle} title={value}>
          --{tokenKey}
        </label>
        <span style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          {hexMatch && (
            <input
              type="color"
              value={hexMatch[0]}
              onChange={(e) => onChange(value.replace(hexMatch[0], e.target.value))}
              style={{
                width: '32px',
                height: '24px',
                padding: 0,
                border: 'none',
                background: 'none',
              }}
            />
          )}
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            style={{
              fontFamily: 'var(--font-family-mono, monospace)',
              fontSize: 'var(--font-size-xs, 10px)',
              width: hexMatch ? '100px' : '140px',
              padding: '2px 4px',
              border: '1px solid var(--color-border, #d1d5db)',
              borderRadius: 'var(--border-radius-sm, 4px)',
              background: 'var(--color-background, #fff)',
              color: 'var(--color-text, #111827)',
            }}
          />
        </span>
      </div>
    );
  }

  return (
    <div style={rowStyle}>
      <label style={labelStyle} title={value}>
        --{tokenKey}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          fontFamily: 'var(--font-family-mono, monospace)',
          fontSize: 'var(--font-size-xs, 10px)',
          width: '140px',
          padding: '2px 4px',
          border: '1px solid var(--color-border, #d1d5db)',
          borderRadius: 'var(--border-radius-sm, 4px)',
          background: 'var(--color-background, #fff)',
          color: 'var(--color-text, #111827)',
        }}
      />
    </div>
  );
};

// ---- family section (collapsible) ----

const FamilySection = ({
  name,
  tokens,
  values,
  onChange,
}: {
  name: string;
  tokens: string[];
  values: Record<string, string>;
  onChange: (key: string, value: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        borderBottom: '1px solid var(--color-border-light, #eee)',
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        style={{
          width: '100%',
          padding: '8px 12px',
          background: 'none',
          border: 'none',
          textAlign: 'left',
          cursor: 'pointer',
          fontSize: 'var(--font-size-sm, 12px)',
          fontWeight: 'var(--font-weight-semibold, 600)',
          color: 'var(--color-heading-secondary, #374151)',
          textTransform: 'capitalize',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <span>{name}</span>
        <span
          style={{
            color: 'var(--color-text-muted, #9ca3af)',
            fontWeight: 'var(--font-weight-normal, 400)',
          }}
        >
          {tokens.length} {open ? '▾' : '▸'}
        </span>
      </button>
      {open && (
        <div style={{ padding: '0 12px 8px 12px' }}>
          {tokens.map((k) => (
            <TokenEditor
              key={k}
              tokenKey={k}
              value={values[k] ?? ''}
              onChange={(v) => onChange(k, v)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// ---- export to .ts ----

const exportTheme = (theme: Theme, name: string) => {
  const lines = [
    '// Auto-generated by Foundations/Token Builder (Storybook)',
    `// Exported ${new Date().toISOString()}`,
    `import type { Theme } from 'morphui-react';`,
    '',
    `export const ${name}: Theme = {`,
  ];
  // Sort keys for stable output
  for (const k of Object.keys(theme).sort()) {
    const v = theme[k];
    // Escape any single quotes in the value
    const escaped = v.replace(/'/g, "\\'");
    lines.push(`  '${k}': '${escaped}',`);
  }
  lines.push('};');
  const blob = new Blob([lines.join('\n')], { type: 'text/typescript' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${name}.ts`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// ---- the main story ----

export const Builder: Story = {
  render: () => {
    const initialPreset: ThemeName = 'light';
    const [values, setValues] = useState<Theme>(() => ({ ...themes[initialPreset] }));
    const [exportName, setExportName] = useState('myTheme');

    // Group tokens by family for the left-panel tree
    const families = useMemo(() => {
      const groups: Record<string, string[]> = {};
      const order: string[] = [];
      for (const key of Object.keys(values)) {
        const fam = familyOf(key);
        if (!groups[fam]) {
          groups[fam] = [];
          order.push(fam);
        }
        groups[fam].push(key);
      }
      return { groups, order };
    }, [values]);

    const handleChange = (key: string, value: string) => {
      setValues((prev) => ({ ...prev, [key]: value }));
    };

    const loadPreset = (name: ThemeName) => {
      setValues({ ...themes[name] });
    };

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(360px, 1fr) minmax(480px, 1.6fr)',
          gap: '24px',
          padding: '24px',
          minHeight: '100vh',
          background: 'var(--color-background, #fff)',
          color: 'var(--color-text, #111827)',
        }}
      >
        {/* Left: token tree */}
        <div
          style={{
            border: '1px solid var(--color-border, #d1d5db)',
            borderRadius: 'var(--border-radius-md, 8px)',
            overflow: 'auto',
            maxHeight: 'calc(100vh - 48px)',
          }}
        >
          <div
            style={{
              padding: '12px',
              background: 'var(--color-background-secondary, #f9fafb)',
              borderBottom: '1px solid var(--color-border-light, #eee)',
              position: 'sticky',
              top: 0,
              zIndex: 1,
            }}
          >
            <strong style={{ display: 'block', marginBottom: '8px' }}>Tokens</strong>
            <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
              {(['light', 'dark', 'warm', 'cool', 'purple'] as ThemeName[]).map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => loadPreset(n)}
                  style={{
                    padding: '2px 8px',
                    fontSize: 'var(--font-size-xs, 10px)',
                    border: '1px solid var(--color-border, #d1d5db)',
                    borderRadius: 'var(--border-radius-sm, 4px)',
                    background: 'var(--color-background, #fff)',
                    color: 'var(--color-text, #111827)',
                    cursor: 'pointer',
                    textTransform: 'capitalize',
                  }}
                >
                  {n}
                </button>
              ))}
            </div>
            <div style={{ marginTop: '8px', display: 'flex', gap: '4px', alignItems: 'center' }}>
              <input
                type="text"
                value={exportName}
                onChange={(e) => setExportName(e.target.value.replace(/[^a-zA-Z0-9_]/g, ''))}
                placeholder="myTheme"
                style={{
                  padding: '2px 4px',
                  fontSize: 'var(--font-size-xs, 10px)',
                  width: '100px',
                  border: '1px solid var(--color-border, #d1d5db)',
                  borderRadius: 'var(--border-radius-sm, 4px)',
                  fontFamily: 'var(--font-family-mono, monospace)',
                }}
              />
              <Button
                size="sm"
                variant="primary"
                onClick={() => exportTheme(values, exportName || 'myTheme')}
              >
                Export .ts
              </Button>
            </div>
          </div>
          {families.order.map((fam) => (
            <FamilySection
              key={fam}
              name={fam}
              tokens={families.groups[fam]}
              values={values}
              onChange={handleChange}
            />
          ))}
        </div>

        {/* Right: live preview */}
        <div
          style={{
            border: '1px solid var(--color-border, #d1d5db)',
            borderRadius: 'var(--border-radius-md, 8px)',
            padding: '24px',
            background: values['color-background'] ?? '#fff',
            color: values['color-text'] ?? '#111827',
            overflow: 'auto',
            maxHeight: 'calc(100vh - 48px)',
          }}
        >
          <ThemeProvider theme={values}>
            <h2
              style={{
                margin: '0 0 16px 0',
                fontSize: 'var(--font-size-xl, 18px)',
                fontWeight: 'var(--font-weight-semibold, 600)',
                color: 'var(--color-heading-primary, #111827)',
              }}
            >
              Live preview
            </h2>
            <PreviewGrid />
          </ThemeProvider>
        </div>
      </div>
    );
  },
};
