import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TreeView, type TreeNode } from '../src/components/interactive/TreeView';
import { ThemeProvider } from '../src/components/theme/ThemeProvider';

const renderWithTheme = (ui: React.ReactElement) => render(<ThemeProvider>{ui}</ThemeProvider>);

const tree: TreeNode[] = [
  {
    id: 'root',
    label: 'Root',
    children: [
      { id: 'child1', label: 'Child 1' },
      {
        id: 'child2',
        label: 'Child 2',
        children: [
          { id: 'grandchild1', label: 'Grandchild 1' },
          { id: 'grandchild2', label: 'Grandchild 2' },
        ],
      },
      { id: 'child3', label: 'Child 3', disabled: true },
    ],
  },
  { id: 'standalone', label: 'Standalone' },
];

describe('TreeView Component', () => {
  describe('Basic Rendering', () => {
    it('renders top-level nodes', () => {
      renderWithTheme(<TreeView nodes={tree} />);
      expect(screen.getByText('Root')).toBeInTheDocument();
      expect(screen.getByText('Standalone')).toBeInTheDocument();
    });

    it('does not render children of collapsed nodes', () => {
      renderWithTheme(<TreeView nodes={tree} />);
      expect(screen.queryByText('Child 1')).not.toBeInTheDocument();
      expect(screen.queryByText('Grandchild 1')).not.toBeInTheDocument();
    });

    it('renders children when node is expanded via defaultExpandedNodeIds', () => {
      renderWithTheme(<TreeView nodes={tree} defaultExpandedNodeIds={['root', 'child2']} />);
      expect(screen.getByText('Child 1')).toBeInTheDocument();
      expect(screen.getByText('Grandchild 1')).toBeInTheDocument();
    });

    it('renders empty message when nodes array is empty', () => {
      renderWithTheme(<TreeView nodes={[]} />);
      expect(screen.getByText('No items')).toBeInTheDocument();
    });
  });

  describe('Expand/Collapse', () => {
    it('expands a node on toggle click', () => {
      renderWithTheme(<TreeView nodes={tree} />);
      // Child 1 not visible initially
      expect(screen.queryByText('Child 1')).not.toBeInTheDocument();
      // Click the toggle for Root
      const rootToggle = screen
        .getByText('Root')
        .closest('.treeview-component__node')
        ?.querySelector('.treeview-component__toggle');
      if (rootToggle) fireEvent.click(rootToggle);
      // Child 1 now visible
      expect(screen.getByText('Child 1')).toBeInTheDocument();
    });

    it('collapses a node on toggle click when expanded', () => {
      renderWithTheme(<TreeView nodes={tree} defaultExpandedNodeIds={['root']} />);
      expect(screen.getByText('Child 1')).toBeInTheDocument();
      const rootToggle = screen
        .getByText('Root')
        .closest('.treeview-component__node')
        ?.querySelector('.treeview-component__toggle');
      if (rootToggle) fireEvent.click(rootToggle);
      expect(screen.queryByText('Child 1')).not.toBeInTheDocument();
    });

    it('calls onExpandChange when a node is toggled', () => {
      const onExpandChange = jest.fn();
      renderWithTheme(<TreeView nodes={tree} onExpandChange={onExpandChange} />);
      const rootToggle = screen
        .getByText('Root')
        .closest('.treeview-component__node')
        ?.querySelector('.treeview-component__toggle');
      if (rootToggle) fireEvent.click(rootToggle);
      expect(onExpandChange).toHaveBeenCalledWith(['root']);
    });

    it('sets aria-expanded correctly', () => {
      renderWithTheme(<TreeView nodes={tree} defaultExpandedNodeIds={['root']} />);
      const rootItem = screen.getByText('Root').closest('[role="treeitem"]');
      expect(rootItem).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('Selection', () => {
    it('selects a node on click and calls onSelect', () => {
      const onSelect = jest.fn();
      renderWithTheme(<TreeView nodes={tree} onSelect={onSelect} />);
      fireEvent.click(screen.getByText('Standalone'));
      expect(onSelect).toHaveBeenCalledTimes(1);
      expect(onSelect.mock.calls[0][0]).toBe('standalone');
    });

    it('initializes from defaultSelectedNodeId', () => {
      renderWithTheme(<TreeView nodes={tree} defaultSelectedNodeId="standalone" />);
      const item = screen.getByText('Standalone').closest('[role="treeitem"]');
      expect(item).toHaveClass('treeview-component__node--selected');
      expect(item).toHaveAttribute('aria-selected', 'true');
    });

    it('does not select disabled nodes', () => {
      const onSelect = jest.fn();
      renderWithTheme(
        <TreeView nodes={tree} defaultExpandedNodeIds={['root']} onSelect={onSelect} />,
      );
      fireEvent.click(screen.getByText('Child 3'));
      expect(onSelect).not.toHaveBeenCalled();
    });

    it('controlled selectedNodeId wins over defaultSelectedNodeId', () => {
      renderWithTheme(
        <TreeView nodes={tree} selectedNodeId="standalone" defaultSelectedNodeId="root" />,
      );
      const standalone = screen.getByText('Standalone').closest('[role="treeitem"]');
      expect(standalone).toHaveClass('treeview-component__node--selected');
    });
  });

  describe('Accessibility', () => {
    it('renders role="tree" with aria-label', () => {
      renderWithTheme(<TreeView nodes={tree} ariaLabel="File explorer" />);
      const tree_el = screen.getByRole('tree');
      expect(tree_el).toHaveAttribute('aria-label', 'File explorer');
    });

    it('renders role="treeitem" for each visible node', () => {
      renderWithTheme(<TreeView nodes={tree} defaultExpandedNodeIds={['root', 'child2']} />);
      const items = screen.getAllByRole('treeitem');
      // Root + Child1 + Child2 + Grandchild1 + Grandchild2 + Child3 + Standalone = 7
      expect(items).toHaveLength(7);
    });

    it('sets aria-level based on depth', () => {
      renderWithTheme(<TreeView nodes={tree} defaultExpandedNodeIds={['root', 'child2']} />);
      const root = screen.getByText('Root').closest('[role="treeitem"]');
      expect(root).toHaveAttribute('aria-level', '1');
      const grandchild = screen.getByText('Grandchild 1').closest('[role="treeitem"]');
      expect(grandchild).toHaveAttribute('aria-level', '3');
    });

    it('sets aria-disabled on disabled nodes', () => {
      renderWithTheme(<TreeView nodes={tree} defaultExpandedNodeIds={['root']} />);
      const disabled = screen.getByText('Child 3').closest('[role="treeitem"]');
      expect(disabled).toHaveAttribute('aria-disabled', 'true');
    });
  });

  describe('Icons', () => {
    it('renders an icon when provided', () => {
      const nodesWithIcons: TreeNode[] = [
        { id: 'node1', label: 'With Icon', icon: <span data-testid="icon">📁</span> },
      ];
      renderWithTheme(<TreeView nodes={nodesWithIcons} />);
      expect(screen.getByTestId('icon')).toBeInTheDocument();
    });
  });
});
