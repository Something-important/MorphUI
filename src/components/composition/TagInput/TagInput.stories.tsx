import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TagInput } from './TagInput';

const meta: Meta<typeof TagInput> = {
  title: 'Components/TagInput',
  component: TagInput,
  parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj<typeof TagInput>;

export const Default: Story = {
  render: () => (
    <div style={{ width: 400 }}>
      <TagInput defaultTags={['react', 'typescript', 'ui']} placeholder="Add tag…" />
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [tags, setTags] = React.useState<string[]>(['design', 'system']);
    return (
      <div style={{ width: 400 }}>
        <TagInput tags={tags} onTagsChange={setTags} placeholder="Add tag…" />
        <p style={{ marginTop: 12, fontSize: 14 }}>
          {tags.length} tags: {tags.join(', ')}
        </p>
      </div>
    );
  },
};

export const MaxTags: Story = {
  render: () => (
    <div style={{ width: 400 }}>
      <TagInput defaultTags={['a', 'b', 'c']} maxTags={5} placeholder="Max 5 tags" />
    </div>
  ),
};
