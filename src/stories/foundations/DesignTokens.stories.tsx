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

const TokenRow = ({
  name,
  value,
  children,
}: {
  name: string;
  value: string;
  children?: ReactNode;
}) => (
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
    The quick brown fox
    <br />
    jumps over the lazy dog
  </div>
);

const LetterSpacingPreview = ({ value }: { value: string }) => (
  <span style={{ letterSpacing: value, fontSize: 'var(--font-size-lg, 16px)' }}>AVBWCF</span>
);

const TokenSection = ({
  title,
  family,
  tokens,
}: {
  title: string;
  family: string;
  tokens: Array<[string, string]>;
}) => {
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
const STRATEGIES: Record<string, string> = {
  'color-primary': 'swatch',
  'color-secondary': 'swatch',
  'color-danger': 'swatch',
  'color-success': 'swatch',
  'color-warning': 'swatch',
  'color-info': 'swatch',
  'color-white': 'swatch',
  'color-black': 'swatch',
  'color-gray': 'swatch',
  'color-background': 'swatch',
  'color-option': 'swatch',
  'color-text': 'swatch',
  'color-heading': 'swatch',
  'color-content': 'swatch',
  'color-link': 'swatch',
  'color-border': 'swatch',
  gradient: 'gradient-swatch',
  'font-family': 'font-family',
  'font-size': 'font-size',
  'font-weight': 'font-weight',
  'line-height': 'line-height',
  'letter-spacing': 'letter-spacing',
  'text-decoration': 'raw',
  spacing: 'size-bar',
  width: 'size-bar',
  height: 'size-bar',
  'min-width': 'size-bar',
  'max-width': 'size-bar',
  breakpoint: 'raw',
  container: 'size-bar',
  'border-radius': 'radius-preview',
  shadow: 'shadow-preview',
  'backdrop-blur': 'blur-preview',
  filter: 'raw',
  opacity: 'opacity-preview',
  transform: 'raw',
  duration: 'raw',
  delay: 'raw',
  ease: 'raw',
  transition: 'raw',
  input: 'size-bar',
  checkbox: 'size-bar',
  radio: 'size-bar',
  switch: 'size-bar',
  nav: 'size-bar',
  sidebar: 'size-bar',
  header: 'size-bar',
  modal: 'size-bar',
  z: 'raw',
};

export const AllTokens: Story = {
  render: () => (
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
          Design Tokens
        </h1>
        <p style={{ color: 'var(--color-text-secondary, #6b7280)', margin: 0 }}>
          {353} CSS custom properties across {49} families. Switch themes via the toolbar to see how
          each preset overrides the defaults.
        </p>
      </header>
      {
        <TokenSection
          title="color-primary"
          family="color-primary"
          tokens={[
            ['color-primary', '#0070f3'],
            ['color-primary-hover', '#0051cc'],
            ['color-primary-active', '#003d99'],
            ['color-primary-light', 'rgba(0, 112, 243, 0.1)'],
            ['color-primary-rgb', '0, 112, 243'],
            ['color-primary-10', 'rgba(0, 112, 243, 0.1)'],
            ['color-primary-20', 'rgba(0, 112, 243, 0.2)'],
            ['color-primary-30', 'rgba(0, 112, 243, 0.3)'],
            ['color-primary-40', 'rgba(0, 112, 243, 0.4)'],
            ['color-primary-50', 'rgba(0, 112, 243, 0.5)'],
            ['color-primary-60', 'rgba(0, 112, 243, 0.6)'],
            ['color-primary-70', 'rgba(0, 112, 243, 0.7)'],
            ['color-primary-80', 'rgba(0, 112, 243, 0.8)'],
            ['color-primary-90', 'rgba(0, 112, 243, 0.9)'],
          ]}
        />
      }
      {
        <TokenSection
          title="color-secondary"
          family="color-secondary"
          tokens={[
            ['color-secondary', '#6b7280'],
            ['color-secondary-hover', '#4b5563'],
            ['color-secondary-active', '#374151'],
            ['color-secondary-light', 'rgba(107, 114, 128, 0.1)'],
            ['color-secondary-rgb', '107, 114, 128'],
            ['color-secondary-10', 'rgba(107, 114, 128, 0.1)'],
            ['color-secondary-20', 'rgba(107, 114, 128, 0.2)'],
            ['color-secondary-30', 'rgba(107, 114, 128, 0.3)'],
            ['color-secondary-40', 'rgba(107, 114, 128, 0.4)'],
            ['color-secondary-50', 'rgba(107, 114, 128, 0.5)'],
            ['color-secondary-60', 'rgba(107, 114, 128, 0.6)'],
            ['color-secondary-70', 'rgba(107, 114, 128, 0.7)'],
            ['color-secondary-80', 'rgba(107, 114, 128, 0.8)'],
            ['color-secondary-90', 'rgba(107, 114, 128, 0.9)'],
          ]}
        />
      }
      {
        <TokenSection
          title="color-danger"
          family="color-danger"
          tokens={[
            ['color-danger', '#ef4444'],
            ['color-danger-hover', '#dc2626'],
            ['color-danger-active', '#b91c1c'],
            ['color-danger-light', 'rgba(239, 68, 68, 0.1)'],
            ['color-danger-rgb', '239, 68, 68'],
          ]}
        />
      }
      {
        <TokenSection
          title="color-success"
          family="color-success"
          tokens={[
            ['color-success', '#10b981'],
            ['color-success-hover', '#059669'],
            ['color-success-active', '#047857'],
            ['color-success-light', 'rgba(16, 185, 129, 0.1)'],
            ['color-success-rgb', '16, 185, 129'],
          ]}
        />
      }
      {
        <TokenSection
          title="color-warning"
          family="color-warning"
          tokens={[
            ['color-warning', '#f59e0b'],
            ['color-warning-hover', '#d97706'],
            ['color-warning-active', '#b45309'],
            ['color-warning-light', 'rgba(245, 158, 11, 0.1)'],
            ['color-warning-rgb', '245, 158, 11'],
          ]}
        />
      }
      {
        <TokenSection
          title="color-info"
          family="color-info"
          tokens={[
            ['color-info', '#3b82f6'],
            ['color-info-hover', '#2563eb'],
            ['color-info-active', '#1d4ed8'],
            ['color-info-light', 'rgba(6, 182, 212, 0.1)'],
            ['color-info-rgb', '59, 130, 246'],
          ]}
        />
      }
      {
        <TokenSection
          title="color-white"
          family="color-white"
          tokens={[['color-white', '#ffffff']]}
        />
      }
      {
        <TokenSection
          title="color-black"
          family="color-black"
          tokens={[['color-black', '#000000']]}
        />
      }
      {
        <TokenSection
          title="color-gray"
          family="color-gray"
          tokens={[
            ['color-gray-50', '#f9fafb'],
            ['color-gray-100', '#f3f4f6'],
            ['color-gray-200', '#e5e7eb'],
            ['color-gray-300', '#d1d5db'],
            ['color-gray-400', '#9ca3af'],
            ['color-gray-500', '#6b7280'],
            ['color-gray-600', '#4b5563'],
            ['color-gray-700', '#374151'],
            ['color-gray-800', '#1f2937'],
            ['color-gray-900', '#111827'],
          ]}
        />
      }
      {
        <TokenSection
          title="color-background"
          family="color-background"
          tokens={[
            ['color-background', '#ffffff'],
            ['color-background-secondary', '#f9fafb'],
            ['color-background-tertiary', '#f3f4f6'],
            ['color-background-hover', 'rgba(0, 0, 0, 0.05)'],
            ['color-background-disabled', '#f5f5f5'],
            ['color-background-light', '#f9f9f9'],
          ]}
        />
      }
      {
        <TokenSection
          title="color-option"
          family="color-option"
          tokens={[
            ['color-option-background', 'transparent'],
            ['color-option-background-hover', 'rgba(0, 0, 0, 0.05)'],
            ['color-option-background-selected', 'rgba(0, 112, 243, 0.1)'],
          ]}
        />
      }
      {
        <TokenSection
          title="color-text"
          family="color-text"
          tokens={[
            ['color-text', '#111827'],
            ['color-text-primary', '#333333'],
            ['color-text-secondary', '#6b7280'],
            ['color-text-muted', '#9ca3af'],
            ['color-text-disabled', '#999999'],
            ['color-text-inverse', '#ffffff'],
            ['color-text-success', '#059669'],
            ['color-text-warning', '#d97706'],
            ['color-text-error', '#dc2626'],
            ['color-text-info', '#2563eb'],
          ]}
        />
      }
      {
        <TokenSection
          title="color-heading"
          family="color-heading"
          tokens={[
            ['color-heading-primary', '#111827'],
            ['color-heading-secondary', '#374151'],
            ['color-heading-tertiary', '#4b5563'],
            ['color-heading-muted', '#6b7280'],
          ]}
        />
      }
      {
        <TokenSection
          title="color-content"
          family="color-content"
          tokens={[
            ['color-content-primary', '#374151'],
            ['color-content-secondary', '#4b5563'],
            ['color-content-muted', '#6b7280'],
            ['color-content-light', '#9ca3af'],
          ]}
        />
      }
      {
        <TokenSection
          title="color-link"
          family="color-link"
          tokens={[
            ['color-link', '#0070f3'],
            ['color-link-hover', '#0051cc'],
            ['color-link-active', '#003d99'],
            ['color-link-visited', '#7c3aed'],
          ]}
        />
      }
      {
        <TokenSection
          title="color-border"
          family="color-border"
          tokens={[
            ['color-border', '#d1d5db'],
            ['color-border-hover', '#9ca3af'],
            ['color-border-focus', '#3b82f6'],
            ['color-border-light', '#eeeeee'],
          ]}
        />
      }
      {
        <TokenSection
          title="gradient"
          family="gradient"
          tokens={[
            ['gradient-primary', 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'],
            ['gradient-secondary', 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'],
            ['gradient-success', 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'],
            ['gradient-warning', 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'],
            ['gradient-danger', 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)'],
            ['gradient-info', 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'],
            ['gradient-sunset', 'linear-gradient(135deg, #ff6b6b 0%, #feca57 50%, #ff9ff3 100%)'],
            ['gradient-ocean', 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'],
            ['gradient-forest', 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'],
            ['gradient-sunrise', 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'],
            ['gradient-purple', 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'],
            ['gradient-gold', 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'],
          ]}
        />
      }
      {
        <TokenSection
          title="font-family"
          family="font-family"
          tokens={[
            [
              'font-family',
              'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            ],
            ['font-family-mono', 'JetBrains Mono, Fira Code, Consolas, monospace'],
            ['font-family-serif', 'Georgia, Cambria, "Times New Roman", Times, serif'],
            [
              'font-family-display',
              'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            ],
          ]}
        />
      }
      {
        <TokenSection
          title="font-size"
          family="font-size"
          tokens={[
            ['font-size-xs', '10px'],
            ['font-size-sm', '12px'],
            ['font-size-md', '14px'],
            ['font-size-lg', '16px'],
            ['font-size-xl', '18px'],
            ['font-size-2xl', '20px'],
            ['font-size-3xl', '24px'],
            ['font-size-4xl', '30px'],
            ['font-size-5xl', '36px'],
            ['font-size-6xl', '48px'],
            ['font-size-7xl', '60px'],
            ['font-size-8xl', '72px'],
            ['font-size-9xl', '96px'],
          ]}
        />
      }
      {
        <TokenSection
          title="font-weight"
          family="font-weight"
          tokens={[
            ['font-weight-thin', '100'],
            ['font-weight-light', '300'],
            ['font-weight-normal', '400'],
            ['font-weight-medium', '500'],
            ['font-weight-semibold', '600'],
            ['font-weight-bold', '700'],
            ['font-weight-extrabold', '800'],
            ['font-weight-black', '900'],
          ]}
        />
      }
      {
        <TokenSection
          title="line-height"
          family="line-height"
          tokens={[
            ['line-height-none', '1'],
            ['line-height-tight', '1.25'],
            ['line-height-snug', '1.375'],
            ['line-height-normal', '1.5'],
            ['line-height-relaxed', '1.625'],
            ['line-height-loose', '2'],
          ]}
        />
      }
      {
        <TokenSection
          title="letter-spacing"
          family="letter-spacing"
          tokens={[
            ['letter-spacing-tighter', '-0.05em'],
            ['letter-spacing-tight', '-0.025em'],
            ['letter-spacing-normal', '0em'],
            ['letter-spacing-wide', '0.025em'],
            ['letter-spacing-wider', '0.05em'],
            ['letter-spacing-widest', '0.1em'],
          ]}
        />
      }
      {
        <TokenSection
          title="text-decoration"
          family="text-decoration"
          tokens={[
            ['text-decoration-underline', 'underline'],
            ['text-decoration-overline', 'overline'],
            ['text-decoration-line-through', 'line-through'],
            ['text-decoration-none', 'none'],
          ]}
        />
      }
      {
        <TokenSection
          title="spacing"
          family="spacing"
          tokens={[
            ['spacing-xs', '0.25rem'],
            ['spacing-sm', '0.5rem'],
            ['spacing-md', '1rem'],
            ['spacing-lg', '1.5rem'],
            ['spacing-xl', '2rem'],
            ['spacing-2xl', '3rem'],
            ['spacing-3xl', '4rem'],
            ['spacing-4xl', '5rem'],
            ['spacing-5xl', '6rem'],
            ['spacing-6xl', '8rem'],
            ['spacing-7xl', '10rem'],
            ['spacing-8xl', '12rem'],
            ['spacing-9xl', '16rem'],
          ]}
        />
      }
      {
        <TokenSection
          title="width"
          family="width"
          tokens={[
            ['width-auto', 'auto'],
            ['width-full', '100%'],
            ['width-screen', '100vw'],
            ['width-min', 'min-content'],
            ['width-max', 'max-content'],
            ['width-fit', 'fit-content'],
          ]}
        />
      }
      {
        <TokenSection
          title="height"
          family="height"
          tokens={[
            ['height-auto', 'auto'],
            ['height-full', '100%'],
            ['height-screen', '100vh'],
            ['height-min', 'min-content'],
            ['height-max', 'max-content'],
            ['height-fit', 'fit-content'],
          ]}
        />
      }
      {
        <TokenSection
          title="min-width"
          family="min-width"
          tokens={[
            ['min-width-0', '0px'],
            ['min-width-full', '100%'],
            ['min-width-min', 'min-content'],
            ['min-width-max', 'max-content'],
            ['min-width-fit', 'fit-content'],
          ]}
        />
      }
      {
        <TokenSection
          title="max-width"
          family="max-width"
          tokens={[
            ['max-width-none', 'none'],
            ['max-width-xs', '20rem'],
            ['max-width-sm', '24rem'],
            ['max-width-md', '28rem'],
            ['max-width-lg', '32rem'],
            ['max-width-xl', '36rem'],
            ['max-width-2xl', '42rem'],
            ['max-width-3xl', '48rem'],
            ['max-width-4xl', '56rem'],
            ['max-width-5xl', '64rem'],
            ['max-width-6xl', '72rem'],
            ['max-width-7xl', '80rem'],
            ['max-width-full', '100%'],
            ['max-width-min', 'min-content'],
            ['max-width-max', 'max-content'],
            ['max-width-fit', 'fit-content'],
            ['max-width-prose', '65ch'],
            ['max-width-screen-sm', '640px'],
            ['max-width-screen-md', '768px'],
            ['max-width-screen-lg', '1024px'],
            ['max-width-screen-xl', '1280px'],
            ['max-width-screen-2xl', '1536px'],
          ]}
        />
      }
      {
        <TokenSection
          title="breakpoint"
          family="breakpoint"
          tokens={[
            ['breakpoint-sm', '640px'],
            ['breakpoint-md', '768px'],
            ['breakpoint-lg', '1024px'],
            ['breakpoint-xl', '1280px'],
            ['breakpoint-2xl', '1536px'],
          ]}
        />
      }
      {
        <TokenSection
          title="container"
          family="container"
          tokens={[
            ['container-sm', '640px'],
            ['container-md', '768px'],
            ['container-lg', '1024px'],
            ['container-xl', '1280px'],
            ['container-2xl', '1536px'],
            ['container-3xl', '1728px'],
            ['container-4xl', '1920px'],
            ['container-5xl', '2048px'],
            ['container-6xl', '2304px'],
            ['container-7xl', '2560px'],
            ['container-full', '100%'],
          ]}
        />
      }
      {
        <TokenSection
          title="border-radius"
          family="border-radius"
          tokens={[
            ['border-radius', '6px'],
            ['border-radius-sm', '4px'],
            ['border-radius-md', '8px'],
            ['border-radius-lg', '12px'],
            ['border-radius-xl', '16px'],
            ['border-radius-full', '9999px'],
          ]}
        />
      }
      {
        <TokenSection
          title="shadow"
          family="shadow"
          tokens={[
            ['shadow-sm', '0 1px 2px 0 rgba(0, 0, 0, 0.05)'],
            ['shadow-md', '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'],
            [
              'shadow-lg',
              '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            ],
            [
              'shadow-xl',
              '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            ],
            ['shadow-2xl', '0 25px 50px -12px rgba(0, 0, 0, 0.25)'],
            ['shadow-inner', 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)'],
            ['shadow-none', '0 0 #0000'],
          ]}
        />
      }
      {
        <TokenSection
          title="backdrop-blur"
          family="backdrop-blur"
          tokens={[
            ['backdrop-blur-none', 'blur(0)'],
            ['backdrop-blur-sm', 'blur(4px)'],
            ['backdrop-blur-md', 'blur(8px)'],
            ['backdrop-blur-lg', 'blur(16px)'],
            ['backdrop-blur-xl', 'blur(24px)'],
            ['backdrop-blur-2xl', 'blur(40px)'],
            ['backdrop-blur-3xl', 'blur(64px)'],
          ]}
        />
      }
      {
        <TokenSection
          title="filter"
          family="filter"
          tokens={[
            ['filter-brightness-50', 'brightness(0.5)'],
            ['filter-brightness-75', 'brightness(0.75)'],
            ['filter-brightness-90', 'brightness(0.9)'],
            ['filter-brightness-95', 'brightness(0.95)'],
            ['filter-brightness-100', 'brightness(1)'],
            ['filter-brightness-105', 'brightness(1.05)'],
            ['filter-brightness-110', 'brightness(1.1)'],
            ['filter-brightness-125', 'brightness(1.25)'],
            ['filter-brightness-150', 'brightness(1.5)'],
            ['filter-brightness-200', 'brightness(2)'],
          ]}
        />
      }
      {
        <TokenSection
          title="opacity"
          family="opacity"
          tokens={[
            ['opacity-0', '0'],
            ['opacity-5', '0.05'],
            ['opacity-10', '0.1'],
            ['opacity-20', '0.2'],
            ['opacity-25', '0.25'],
            ['opacity-30', '0.3'],
            ['opacity-40', '0.4'],
            ['opacity-50', '0.5'],
            ['opacity-60', '0.6'],
            ['opacity-70', '0.7'],
            ['opacity-75', '0.75'],
            ['opacity-80', '0.8'],
            ['opacity-90', '0.9'],
            ['opacity-95', '0.95'],
            ['opacity-100', '1'],
          ]}
        />
      }
      {
        <TokenSection
          title="transform"
          family="transform"
          tokens={[
            ['transform-scale-0', 'scale(0)'],
            ['transform-scale-50', 'scale(0.5)'],
            ['transform-scale-75', 'scale(0.75)'],
            ['transform-scale-90', 'scale(0.9)'],
            ['transform-scale-95', 'scale(0.95)'],
            ['transform-scale-100', 'scale(1)'],
            ['transform-scale-105', 'scale(1.05)'],
            ['transform-scale-110', 'scale(1.1)'],
            ['transform-scale-125', 'scale(1.25)'],
            ['transform-scale-150', 'scale(1.5)'],
            ['transform-rotate-0', 'rotate(0deg)'],
            ['transform-rotate-1', 'rotate(1deg)'],
            ['transform-rotate-2', 'rotate(2deg)'],
            ['transform-rotate-3', 'rotate(3deg)'],
            ['transform-rotate-6', 'rotate(6deg)'],
            ['transform-rotate-12', 'rotate(12deg)'],
            ['transform-rotate-45', 'rotate(45deg)'],
            ['transform-rotate-90', 'rotate(90deg)'],
            ['transform-rotate-180', 'rotate(180deg)'],
          ]}
        />
      }
      {
        <TokenSection
          title="duration"
          family="duration"
          tokens={[
            ['duration-75', '75ms'],
            ['duration-100', '100ms'],
            ['duration-150', '150ms'],
            ['duration-200', '200ms'],
            ['duration-300', '300ms'],
            ['duration-500', '500ms'],
            ['duration-700', '700ms'],
            ['duration-1000', '1000ms'],
          ]}
        />
      }
      {
        <TokenSection
          title="delay"
          family="delay"
          tokens={[
            ['delay-75', '75ms'],
            ['delay-100', '100ms'],
            ['delay-150', '150ms'],
            ['delay-200', '200ms'],
            ['delay-300', '300ms'],
            ['delay-500', '500ms'],
            ['delay-700', '700ms'],
            ['delay-1000', '1000ms'],
          ]}
        />
      }
      {
        <TokenSection
          title="ease"
          family="ease"
          tokens={[
            ['ease-linear', 'linear'],
            ['ease-in', 'cubic-bezier(0.4, 0, 1, 1)'],
            ['ease-out', 'cubic-bezier(0, 0, 0.2, 1)'],
            ['ease-in-out', 'cubic-bezier(0.4, 0, 0.2, 1)'],
            ['ease-bounce', 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'],
            ['ease-elastic', 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'],
          ]}
        />
      }
      {
        <TokenSection
          title="transition"
          family="transition"
          tokens={[
            ['transition-fast', '0.15s ease-in-out'],
            ['transition-normal', '0.2s ease-in-out'],
            ['transition-slow', '0.3s ease-in-out'],
            ['transition-all', 'all 0.2s ease-in-out'],
            [
              'transition-colors',
              'color 0.2s ease-in-out, background-color 0.2s ease-in-out, border-color 0.2s ease-in-out',
            ],
            ['transition-opacity', 'opacity 0.2s ease-in-out'],
            ['transition-transform', 'transform 0.2s ease-in-out'],
            ['transition-shadow', 'box-shadow 0.2s ease-in-out'],
          ]}
        />
      }
      {
        <TokenSection
          title="input"
          family="input"
          tokens={[
            ['input-height-xs', '28px'],
            ['input-height-sm', '32px'],
            ['input-height-md', '40px'],
            ['input-height-lg', '48px'],
            ['input-height-xl', '56px'],
          ]}
        />
      }
      {
        <TokenSection
          title="checkbox"
          family="checkbox"
          tokens={[
            ['checkbox-size-sm', '16px'],
            ['checkbox-size-md', '20px'],
            ['checkbox-size-lg', '24px'],
          ]}
        />
      }
      {
        <TokenSection
          title="radio"
          family="radio"
          tokens={[
            ['radio-size-sm', '16px'],
            ['radio-size-md', '20px'],
            ['radio-size-lg', '24px'],
          ]}
        />
      }
      {
        <TokenSection
          title="switch"
          family="switch"
          tokens={[
            ['switch-width-sm', '36px'],
            ['switch-width-md', '44px'],
            ['switch-width-lg', '52px'],
            ['switch-height-sm', '20px'],
            ['switch-height-md', '24px'],
            ['switch-height-lg', '28px'],
          ]}
        />
      }
      {
        <TokenSection
          title="nav"
          family="nav"
          tokens={[
            ['nav-height-sm', '48px'],
            ['nav-height-md', '56px'],
            ['nav-height-lg', '64px'],
          ]}
        />
      }
      {
        <TokenSection
          title="sidebar"
          family="sidebar"
          tokens={[
            ['sidebar-width-sm', '200px'],
            ['sidebar-width-md', '240px'],
            ['sidebar-width-lg', '280px'],
          ]}
        />
      }
      {
        <TokenSection
          title="header"
          family="header"
          tokens={[
            ['header-height-sm', '48px'],
            ['header-height-md', '56px'],
            ['header-height-lg', '64px'],
            ['header-height-xl', '72px'],
          ]}
        />
      }
      {
        <TokenSection
          title="modal"
          family="modal"
          tokens={[
            ['modal-max-width-sm', '400px'],
            ['modal-max-width-md', '500px'],
            ['modal-max-width-lg', '600px'],
            ['modal-max-width-xl', '700px'],
            ['modal-max-width-2xl', '800px'],
            ['modal-max-width-3xl', '900px'],
            ['modal-max-width-4xl', '1000px'],
            ['modal-max-width-5xl', '1100px'],
            ['modal-max-width-6xl', '1200px'],
            ['modal-max-width-7xl', '1300px'],
            ['modal-max-width-full', '95vw'],
            ['modal-max-width-screen', '95vw'],
          ]}
        />
      }
      {
        <TokenSection
          title="z"
          family="z"
          tokens={[
            ['z-dropdown', '1000'],
            ['z-modal', '1050'],
            ['z-tooltip', '1100'],
            ['z-toast', '1150'],
          ]}
        />
      }
    </div>
  ),
};
