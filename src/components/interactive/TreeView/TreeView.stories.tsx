import type { Meta, StoryObj } from '@storybook/react';
import { TreeView, type TreeNode } from './TreeView';
import { Demo, Stack, ThemeGrid } from '../../../stories/_shared';

const meta: Meta<typeof TreeView> = {
  title: 'Patterns/TreeView',
  component: TreeView,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'TreeView renders a hierarchical tree with expand/collapse and selection. Supports icons, connector lines, controlled/uncontrolled state, 4 variants, 3 sizes.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

const nodes: TreeNode[] = [
  {
    id: '1',
    label: 'Folder 1',
    icon: <span>📁</span>,
    children: [
      { id: '1-1', label: 'File 1-1', icon: <span>📄</span> },
      { id: '1-2', label: 'File 1-2', icon: <span>📄</span> },
    ],
  },
  {
    id: '2',
    label: 'Folder 2',
    icon: <span>📁</span>,
    children: [
      {
        id: '2-1',
        label: 'Subfolder',
        icon: <span>📁</span>,
        children: [{ id: '2-1-1', label: 'Nested file', icon: <span>📄</span> }],
      },
    ],
  },
  { id: '3', label: 'Standalone file', icon: <span>📄</span> },
];

export const Default: Story = {
  args: {
    nodes,
    defaultExpandedNodeIds: ['1', '2'],
  },
};

export const Variants: Story = {
  render: () => (
    <Demo title="All variants">
      <Stack gap={16}>
        {(['primary', 'secondary', 'ghost', 'outline'] as const).map((v) => (
          <TreeView key={v} nodes={nodes} variant={v} defaultExpandedNodeIds={['1', '2']} />
        ))}
      </Stack>
    </Demo>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Demo title="All sizes">
      <Stack gap={16}>
        {(['sm', 'md', 'lg'] as const).map((s) => (
          <TreeView key={s} nodes={nodes} size={s} defaultExpandedNodeIds={['1']} />
        ))}
      </Stack>
    </Demo>
  ),
};

export const States: Story = {
  render: () => (
    <Demo title="No lines, disabled nodes">
      <Stack gap={16}>
        <TreeView nodes={nodes} showLines={false} defaultExpandedNodeIds={['1', '2']} />
        <TreeView
          nodes={[
            ...nodes,
            { id: '4', label: 'Disabled node', icon: <span>🚫</span>, disabled: true },
          ]}
          defaultExpandedNodeIds={['1']}
        />
      </Stack>
    </Demo>
  ),
};

export const Controlled: Story = {
  render: () => (
    <Demo title="Controlled vs uncontrolled">
      <Stack gap={16}>
        <TreeView
          nodes={nodes}
          expandedNodeIds={['1', '2']}
          onExpandChange={() => {}}
          selectedNodeId="1-1"
          onSelect={() => {}}
        />
        <TreeView nodes={nodes} defaultExpandedNodeIds={['1']} defaultSelectedNodeId="2" />
      </Stack>
    </Demo>
  ),
};

export const Customization: Story = {
  render: () => (
    <Demo title="Custom colors & icons">
      <Stack gap={16}>
        <TreeView nodes={nodes} color="#ff0055" defaultExpandedNodeIds={['1']} />
        <TreeView
          nodes={[
            { id: 'a', label: 'Custom icon', icon: <span>⭐</span> },
            { id: 'b', label: 'Another', icon: <span>📌</span> },
          ]}
          defaultExpandedNodeIds={[]}
        />
      </Stack>
    </Demo>
  ),
};

export const AllThemes: Story = {
  render: () => (
    <Demo title="TreeView across all 5 preset themes">
      <ThemeGrid>
        <TreeView nodes={nodes.slice(0, 2)} defaultExpandedNodeIds={['1']} size="sm" />
      </ThemeGrid>
    </Demo>
  ),
};

export const EdgeCases: Story = {
  render: () => (
    <Demo title="Edge cases — single node, deeply nested, empty">
      <Stack gap={16}>
        <TreeView nodes={[{ id: 'only', label: 'Only node' }]} />
        <TreeView
          nodes={[
            {
              id: '1',
              label: 'Level 1',
              children: [
                {
                  id: '2',
                  label: 'Level 2',
                  children: [
                    {
                      id: '3',
                      label: 'Level 3',
                      children: [
                        {
                          id: '4',
                          label: 'Level 4',
                          children: [{ id: '5', label: 'Level 5' }],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ]}
          defaultExpandedNodeIds={['1', '2', '3', '4']}
        />
        <TreeView nodes={[]} />
      </Stack>
    </Demo>
  ),
};
