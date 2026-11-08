import { renderHook, act } from '@testing-library/react';
import { useTreeView } from '../src/hooks/useTreeView';
import type { TreeNode } from '../src/hooks/useTreeView';

const mockTree: TreeNode[] = [
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
  { id: 'disabled', label: 'Disabled', disabled: true },
];

describe('useTreeView', () => {
  describe('Initial state', () => {
    it('starts with no expansion and no selection', () => {
      const { result } = renderHook(() => useTreeView({ nodes: mockTree }));
      expect(result.current.expandedIds).toEqual([]);
      expect(result.current.selectedId).toBeNull();
    });

    it('uses defaultExpandedNodeIds', () => {
      const { result } = renderHook(() =>
        useTreeView({ nodes: mockTree, defaultExpandedNodeIds: ['folder1'] }),
      );
      expect(result.current.expandedIds).toEqual(['folder1']);
      expect(result.current.expandedSet.has('folder1')).toBe(true);
    });

    it('uses defaultSelectedNodeId', () => {
      const { result } = renderHook(() =>
        useTreeView({ nodes: mockTree, defaultSelectedNodeId: 'root' }),
      );
      expect(result.current.selectedId).toBe('root');
    });

    it('uses controlled expandedNodeIds', () => {
      const { result } = renderHook(() =>
        useTreeView({ nodes: mockTree, expandedNodeIds: ['folder2'] }),
      );
      expect(result.current.isControlledExpanded).toBe(true);
      expect(result.current.expandedIds).toEqual(['folder2']);
    });

    it('uses controlled selectedNodeId', () => {
      const { result } = renderHook(() =>
        useTreeView({ nodes: mockTree, selectedNodeId: 'file1' }),
      );
      expect(result.current.isControlledSelected).toBe(true);
      expect(result.current.selectedId).toBe('file1');
    });
  });

  describe('visibleNodes', () => {
    it('shows only top-level nodes when nothing is expanded', () => {
      const { result } = renderHook(() => useTreeView({ nodes: mockTree }));
      expect(result.current.visibleNodes).toHaveLength(4); // root, folder1, folder2, disabled
      expect(result.current.visibleNodes[0].node.id).toBe('root');
      expect(result.current.visibleNodes[0].depth).toBe(0);
    });

    it('shows children when a node is expanded', () => {
      const { result } = renderHook(() =>
        useTreeView({ nodes: mockTree, defaultExpandedNodeIds: ['folder1'] }),
      );
      expect(result.current.visibleNodes).toHaveLength(6); // root, folder1, file1, file2, folder2, disabled
      expect(result.current.visibleNodes[1].node.id).toBe('folder1');
      expect(result.current.visibleNodes[2].node.id).toBe('file1');
      expect(result.current.visibleNodes[2].depth).toBe(1);
    });

    it('shows deeply nested children when all ancestors are expanded', () => {
      const { result } = renderHook(() =>
        useTreeView({
          nodes: mockTree,
          defaultExpandedNodeIds: ['folder2', 'nested'],
        }),
      );
      // root, folder1, folder2, nested, deep, disabled
      expect(result.current.visibleNodes).toHaveLength(6);
      expect(result.current.visibleNodes[4].node.id).toBe('deep');
      expect(result.current.visibleNodes[4].depth).toBe(2);
    });
  });

  describe('toggleExpand', () => {
    it('expands a collapsed node', () => {
      const { result } = renderHook(() => useTreeView({ nodes: mockTree }));
      act(() => result.current.toggleExpand('folder1'));
      expect(result.current.expandedSet.has('folder1')).toBe(true);
    });

    it('collapses an expanded node', () => {
      const { result } = renderHook(() =>
        useTreeView({ nodes: mockTree, defaultExpandedNodeIds: ['folder1'] }),
      );
      act(() => result.current.toggleExpand('folder1'));
      expect(result.current.expandedSet.has('folder1')).toBe(false);
    });

    it('fires onExpandChange', () => {
      const onExpandChange = jest.fn();
      const { result } = renderHook(() => useTreeView({ nodes: mockTree, onExpandChange }));
      act(() => result.current.toggleExpand('folder1'));
      expect(onExpandChange).toHaveBeenCalledWith(['folder1']);
    });
  });

  describe('expandNode / collapseNode', () => {
    it('expandNode only expands (no-op if already expanded)', () => {
      const onExpandChange = jest.fn();
      const { result } = renderHook(() =>
        useTreeView({
          nodes: mockTree,
          defaultExpandedNodeIds: ['folder1'],
          onExpandChange,
        }),
      );
      act(() => result.current.expandNode('folder1'));
      expect(onExpandChange).not.toHaveBeenCalled(); // already expanded
      act(() => result.current.expandNode('folder2'));
      expect(onExpandChange).toHaveBeenCalledWith(['folder1', 'folder2']);
    });

    it('collapseNode only collapses (no-op if already collapsed)', () => {
      const onExpandChange = jest.fn();
      const { result } = renderHook(() =>
        useTreeView({
          nodes: mockTree,
          defaultExpandedNodeIds: ['folder1'],
          onExpandChange,
        }),
      );
      act(() => result.current.collapseNode('folder2')); // already collapsed
      expect(onExpandChange).not.toHaveBeenCalled();
      act(() => result.current.collapseNode('folder1'));
      expect(onExpandChange).toHaveBeenCalledWith([]);
    });
  });

  describe('selectNode', () => {
    it('selects a node (uncontrolled)', () => {
      const { result } = renderHook(() => useTreeView({ nodes: mockTree }));
      act(() => result.current.selectNode('root'));
      expect(result.current.selectedId).toBe('root');
    });

    it('fires onSelect with node object', () => {
      const onSelect = jest.fn();
      const { result } = renderHook(() => useTreeView({ nodes: mockTree, onSelect }));
      act(() => result.current.selectNode('folder1'));
      expect(onSelect).toHaveBeenCalledWith('folder1', expect.objectContaining({ id: 'folder1' }));
    });

    it('does not select disabled nodes', () => {
      const onSelect = jest.fn();
      const { result } = renderHook(() => useTreeView({ nodes: mockTree, onSelect }));
      act(() => result.current.selectNode('disabled'));
      expect(result.current.selectedId).toBeNull();
      expect(onSelect).not.toHaveBeenCalled();
    });

    it('deselects when called with null', () => {
      const { result } = renderHook(() =>
        useTreeView({ nodes: mockTree, defaultSelectedNodeId: 'root' }),
      );
      act(() => result.current.selectNode(null));
      expect(result.current.selectedId).toBeNull();
    });
  });

  describe('findNodeById', () => {
    it('finds a top-level node', () => {
      const { result } = renderHook(() => useTreeView({ nodes: mockTree }));
      expect(result.current.findNodeById('root')?.label).toBe('Root');
    });

    it('finds a deeply nested node', () => {
      const { result } = renderHook(() => useTreeView({ nodes: mockTree }));
      expect(result.current.findNodeById('deep')?.label).toBe('Deep');
    });

    it('returns null for non-existent id', () => {
      const { result } = renderHook(() => useTreeView({ nodes: mockTree }));
      expect(result.current.findNodeById('nonexistent')).toBeNull();
    });
  });
});
