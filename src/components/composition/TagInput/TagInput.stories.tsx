import type { Meta, StoryObj } from '@storybook/react';
import { TagInput } from './TagInput';
import { Demo, Stack, ThemeGrid } from '../../../stories/_shared';

const meta: Meta<typeof TagInput> = {
  title: 'Composition/TagInput',
  component: TagInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'TagInput renders an input where typed values become removable tags. Supports max tags, duplicates control, custom delimiters, and controlled/uncontrolled usage. 4 variants, 3 sizes.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Add a tag...',
    defaultTags: ['react', 'typescript', 'design-system'],
  },
};

export const Variants: Story = {
  render: () => (
    <Demo title="All variants">
      <Stack gap={8} style={{ width: '400px' }}>
        <TagInput variant="primary" placeholder="Primary" defaultTags={['a']} />
        <TagInput variant="secondary" placeholder="Secondary" defaultTags={['b']} />
        <TagInput variant="ghost" placeholder="Ghost" defaultTags={['c']} />
        <TagInput variant="outline" placeholder="Outline" defaultTags={['d']} />
      </Stack>
    </Demo>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Demo title="All sizes">
      <Stack gap={8} style={{ width: '400px' }}>
        <TagInput size="sm" placeholder="Small" defaultTags={['sm']} />
        <TagInput size="md" placeholder="Medium" defaultTags={['md']} />
        <TagInput size="lg" placeholder="Large" defaultTags={['lg']} />
      </Stack>
    </Demo>
  ),
};

export const States: Story = {
  render: () => (
    <Demo title="Disabled, max tags, duplicates">
      <Stack gap={8} style={{ width: '400px' }}>
        <TagInput disabled placeholder="Disabled" defaultTags={['nope']} />
        <TagInput maxTags={3} placeholder="Max 3 tags" defaultTags={['one', 'two']} />
        <TagInput allowDuplicates placeholder="Duplicates allowed" defaultTags={['dup', 'dup']} />
      </Stack>
    </Demo>
  ),
};

export const Controlled: Story = {
  render: () => (
    <Demo title="Controlled vs uncontrolled">
      <Stack gap={8} style={{ width: '400px' }}>
        <TagInput defaultTags={['uncontrolled']} placeholder="Uncontrolled" />
        <TagInput tags={['controlled']} onTagsChange={() => {}} placeholder="Controlled" />
      </Stack>
    </Demo>
  ),
};

export const AllThemes: Story = {
  render: () => (
    <Demo title="TagInput across all 5 preset themes">
      <ThemeGrid>
        <TagInput defaultTags={['theme']} placeholder="Add tag..." />
      </ThemeGrid>
    </Demo>
  ),
};

export const EdgeCases: Story = {
  render: () => (
    <Demo title="Edge cases — empty, many tags, long tag text">
      <Stack gap={8} style={{ width: '400px' }}>
        <TagInput placeholder="No tags yet" />
        <TagInput
          defaultTags={Array.from({ length: 12 }, (_, i) => `tag${i + 1}`)}
          placeholder="Many tags..."
        />
        <TagInput
          defaultTags={['a-very-long-tag-label-that-might-wrap']}
          placeholder="Long tag..."
        />
      </Stack>
    </Demo>
  ),
};
