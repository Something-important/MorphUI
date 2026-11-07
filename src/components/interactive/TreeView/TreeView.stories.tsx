import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TreeView, type TreeNode } from './TreeView';

const fileTree: TreeNode[] = [
  {
    id: 'src',
    label: 'src',
    icon: '📁',
    children: [
      {
        id: 'components',
        label: 'components',
        icon: '📁',
        children: [
          { id: 'button', label: 'Button.tsx', icon: '📄' },
          { id: 'input', label: 'Input.tsx', icon: '📄' },
        ],
      },
      { id: 'index', label: 'index.ts', icon: '📄' },
    ],
  },
  { id: 'readme', label: 'README.md', icon: '📄' },
  { id: 'package', label: 'package.json', icon: '📄' },
];

const meta: Meta<typeof TreeView> = {
  title: 'Components/TreeView',
  component: TreeView,
  parameters: {
    layout: 'centered',
  },
};
export default meta;
type Story = StoryObj<typeof TreeView>;

export const Default: Story = {
  render: () => (
    <div style={{ width: 300 }}>
      <TreeView nodes={fileTree} defaultExpandedNodeIds={['src', 'components']} />
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div style={{ width: 300 }}>
      <TreeView nodes={fileTree} defaultExpandedNodeIds={['src']} />
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<string | null>('button');
    const [expanded, setExpanded] = React.useState<string[]>(['src', 'components']);
    return (
      <div style={{ width: 300 }}>
        <TreeView
          nodes={fileTree}
          selectedNodeId={selected}
          onSelect={(id) => setSelected(id)}
          expandedNodeIds={expanded}
          onExpandChange={setExpanded}
        />
        <p style={{ marginTop: 12, fontSize: 14 }}>Selected: {selected ?? '(none)'}</p>
      </div>
    );
  },
};

export const Outline: Story = {
  render: () => (
    <div style={{ width: 300 }}>
      <TreeView nodes={fileTree} variant="outline" defaultExpandedNodeIds={['src']} shadow="sm" />
    </div>
  ),
};

export const NoLines: Story = {
  render: () => (
    <div style={{ width: 300 }}>
      <TreeView nodes={fileTree} showLines={false} defaultExpandedNodeIds={['src']} />
    </div>
  ),
};
