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
import { Demo, Row, Stack, Grid, ThemeGrid } from '../_shared';

const meta: Meta = {
  title: 'Foundations/Theme Showcase',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Every MorphUI component, rendered once per preset theme (light / dark / warm / cool / purple) side-by-side. This is the single canonical "all components" page — use it to verify that components look correct in every theme. Built from scratch on the shared demo kit (`src/stories/_shared/`); the old `src/stories/ThemeShowcase.stories.tsx` is deleted in PR 3 (Phase 10).',
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
