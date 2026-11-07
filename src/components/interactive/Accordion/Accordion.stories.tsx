import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from './Accordion';
import { Demo, Stack, ThemeGrid } from '../../../stories/_shared';

const meta: Meta<typeof Accordion> = {
  title: 'Patterns/Accordion',
  component: Accordion,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Accordion renders a collapsible content section. Supports 8 variants, 5 sizes, shadows, hover effects, animations, and rich content.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Click to expand',
    children: 'This is the accordion content. Click the header to toggle.',
    defaultOpen: true,
  },
};

export const Variants: Story = {
  render: () => (
    <Demo title="All variants">
      <Stack gap={8} style={{ maxWidth: '500px' }}>
        {(
          [
            'primary',
            'secondary',
            'success',
            'warning',
            'info',
            'danger',
            'ghost',
            'outline',
          ] as const
        ).map((v) => (
          <Accordion key={v} variant={v} title={`${v} variant`}>
            Content for the {v} accordion.
          </Accordion>
        ))}
      </Stack>
    </Demo>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Demo title="All sizes">
      <Stack gap={8} style={{ maxWidth: '500px' }}>
        {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((s) => (
          <Accordion key={s} size={s} title={`${s} size`}>
            Content for the {s} accordion.
          </Accordion>
        ))}
      </Stack>
    </Demo>
  ),
};

export const States: Story = {
  render: () => (
    <Demo title="Disabled, default open/closed">
      <Stack gap={8} style={{ maxWidth: '500px' }}>
        <Accordion title="Default open" defaultOpen>
          Starts expanded.
        </Accordion>
        <Accordion title="Default closed">Starts collapsed.</Accordion>
        <Accordion title="Disabled" disabled>
          Cannot be toggled.
        </Accordion>
      </Stack>
    </Demo>
  ),
};

export const Customization: Story = {
  render: () => (
    <Demo title="Shadows, hover effects, custom colors, animations">
      <Stack gap={8} style={{ maxWidth: '500px' }}>
        <Accordion title="Shadow XL" shadow="xl">
          Elevated accordion.
        </Accordion>
        <Accordion title="Hover lift" hoverEffect="lift">
          Lifts on hover.
        </Accordion>
        <Accordion title="Custom color" color="#ff0055" textColor="#fff">
          Custom background.
        </Accordion>
        <Accordion
          title="Gradient"
          gradient="linear-gradient(135deg, #667eea, #764ba2)"
          textColor="#fff"
        >
          Gradient background.
        </Accordion>
        <Accordion title="Scale animation" animation="scale">
          Animates with scale.
        </Accordion>
      </Stack>
    </Demo>
  ),
};

export const AllThemes: Story = {
  render: () => (
    <Demo title="Accordion across all 5 preset themes">
      <ThemeGrid>
        <Accordion title="Theme" defaultOpen>
          Themed content
        </Accordion>
      </ThemeGrid>
    </Demo>
  ),
};

export const EdgeCases: Story = {
  render: () => (
    <Demo title="Edge cases — long title, long content, rich content">
      <Stack gap={8} style={{ maxWidth: '500px' }}>
        <Accordion title="This is a very long accordion title that might wrap or truncate depending on the container width">
          Content
        </Accordion>
        <Accordion title="Long content">
          {`This accordion contains a very long body message that should wrap gracefully across multiple lines without breaking the accordion's layout or alignment.

          It even has multiple paragraphs to test how the accordion handles rich content with varied spacing.`}
        </Accordion>
        <Accordion title="Rich content">
          <div>
            <p>Paragraph one.</p>
            <ul>
              <li>List item A</li>
              <li>List item B</li>
            </ul>
          </div>
        </Accordion>
      </Stack>
    </Demo>
  ),
};
