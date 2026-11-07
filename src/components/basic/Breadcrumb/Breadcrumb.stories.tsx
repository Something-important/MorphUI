import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumb } from './Breadcrumb';
import { Demo, Stack, ThemeGrid } from '../../../stories/_shared';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Primitives/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Breadcrumb renders a navigation trail. Supports custom separators, variants, sizes, and icons per item.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

const defaultItems = [
  { label: 'Home', href: '#' },
  { label: 'Section', href: '#' },
  { label: 'Page', href: '#' },
];

export const Default: Story = {
  args: {
    items: defaultItems,
  },
};

export const Variants: Story = {
  render: () => (
    <Demo title="All variants">
      <Stack gap={12}>
        <Breadcrumb items={defaultItems} variant="primary" />
        <Breadcrumb items={defaultItems} variant="secondary" />
        <Breadcrumb items={defaultItems} variant="ghost" />
        <Breadcrumb items={defaultItems} variant="outline" />
      </Stack>
    </Demo>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Demo title="All sizes">
      <Stack gap={12}>
        <Breadcrumb items={defaultItems} size="xs" />
        <Breadcrumb items={defaultItems} size="sm" />
        <Breadcrumb items={defaultItems} size="md" />
        <Breadcrumb items={defaultItems} size="lg" />
      </Stack>
    </Demo>
  ),
};

export const Customization: Story = {
  render: () => (
    <Demo title="Custom separators & colors">
      <Stack gap={12}>
        <Breadcrumb items={defaultItems} separator=">" />
        <Breadcrumb items={defaultItems} separator="•" />
        <Breadcrumb items={defaultItems} separator="→" />
        <Breadcrumb items={defaultItems} separator="·" color="#ff0055" activeColor="#10b981" />
      </Stack>
    </Demo>
  ),
};

export const AllThemes: Story = {
  render: () => (
    <Demo title="Breadcrumb across all 5 preset themes">
      <ThemeGrid>
        <Breadcrumb items={defaultItems} />
      </ThemeGrid>
    </Demo>
  ),
};

export const EdgeCases: Story = {
  render: () => (
    <Demo title="Edge cases — single item, long labels, many items">
      <Stack gap={12}>
        <Breadcrumb items={[{ label: 'Only One', href: '#' }]} />
        <Breadcrumb
          items={[
            { label: 'Home', href: '#' },
            { label: 'Very long section name that might wrap', href: '#' },
            { label: 'Current Page', href: '#' },
          ]}
        />
        <Breadcrumb
          items={[
            { label: 'A', href: '#' },
            { label: 'B', href: '#' },
            { label: 'C', href: '#' },
            { label: 'D', href: '#' },
            { label: 'E', href: '#' },
            { label: 'F', href: '#' },
          ]}
        />
      </Stack>
    </Demo>
  ),
};

export const Accessibility: Story = {
  render: () => (
    <Demo title="Accessibility — custom aria-label, semantic nav">
      <Breadcrumb items={defaultItems} ariaLabel="Site navigation trail" />
    </Demo>
  ),
};
