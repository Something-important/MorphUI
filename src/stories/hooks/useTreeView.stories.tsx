import type { Meta, StoryObj } from '@storybook/react';
import { useTreeView, type UseTreeNode } from '../../hooks';
import { Demo, Stack, ThemeGrid } from '../_shared';

const meta: Meta = {
  title: 'Hooks/useTreeView',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Headless tree-view behavior: expand/collapse state, selection, visible-node flattening, and keyboard navigation (roving-tabindex pattern). Extracted from the TreeView component (PR #111).',
      },
    },
  },
};
export default meta;
type Story = StoryObj;

const nodes: UseTreeNode[] = [
  { id: 'root', label: 'Root' },
  {
    id: 'folder1',
    label: 'Folder 1',
    children: [
      { id: 'file1', label: 'File 1' },
      { id: 'file2', label: 'File 2' },
    ],
  },
  {
    id: 'folder2',
    label: 'Folder 2',
    children: [{ id: 'nested', label: 'Nested', children: [{ id: 'deep', label: 'Deep' }] }],
  },
];

const TreeViewDemo = () => {
  const { expandedSet, selectedId, visibleNodes, toggleExpand, selectNode, itemRefs } = useTreeView(
    {
      nodes,
      defaultExpandedNodeIds: ['folder1'],
      onSelect: (id, node) => console.log('Selected:', id, node?.label),
    },
  );

  return (
    <Demo title="useTreeView — click to expand/select, hook manages all state">
      <Stack gap={12}>
        <div style={{ fontFamily: 'monospace', fontSize: '13px' }}>
          {visibleNodes.map(({ node, depth }) => {
            const hasChildren = !!(node.children && node.children.length > 0);
            const isExpanded = expandedSet.has(node.id);
            const isSelected = selectedId === node.id;

            return (
              <div
                key={node.id}
                ref={(el) => {
                  if (el) itemRefs.current.set(node.id, el);
                  else itemRefs.current.delete(node.id);
                }}
                onClick={() => {
                  selectNode(node.id);
                  if (hasChildren) toggleExpand(node.id);
                }}
                style={{
                  padding: '4px 8px',
                  paddingLeft: `${depth * 20 + 8}px`,
                  cursor: 'pointer',
                  background: isSelected
                    ? 'var(--color-background-hover, rgba(0,0,0,0.05))'
                    : 'transparent',
                  borderRadius: '4px',
                  color: isSelected
                    ? 'var(--color-primary, #0070f3)'
                    : 'var(--color-text, #111827)',
                  fontWeight: isSelected ? 600 : 400,
                }}
              >
                {hasChildren ? (isExpanded ? '▾' : '▸') : '·'} {node.label}
              </div>
            );
          })}
        </div>
        <div style={{ fontSize: '12px', color: 'var(--color-text-secondary, #6b7280)' }}>
          Selected: {selectedId ?? 'none'} | Expanded:{' '}
          {Array.from(expandedSet).join(', ') || 'none'}
        </div>
      </Stack>
    </Demo>
  );
};

export const Default: Story = {
  render: () => <TreeViewDemo />,
};

export const AllThemes: Story = {
  render: () => (
    <Demo title="useTreeView trigger across all 5 preset themes">
      <ThemeGrid>
        <div style={{ padding: '8px', fontFamily: 'monospace', fontSize: '12px' }}>
          <div>▸ Folder</div>
          <div style={{ paddingLeft: '16px' }}>· File</div>
        </div>
      </ThemeGrid>
    </Demo>
  ),
};
