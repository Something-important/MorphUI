import { renderHook, act } from '@testing-library/react';
import { useTreeView } from '../src/hooks/useTreeView';
import type { TreeNode } from '../src/hooks/useTreeView';
import type { KeyboardEvent } from 'react';

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

  describe('focusItem', () => {
    it('clamps negative indices to 0', () => {
      const { result } = renderHook(() => useTreeView({ nodes: mockTree }));
      act(() => result.current.focusItem(-5));
      expect(result.current.focusIndexRef.current).toBe(0);
    });

    it('clamps beyond-the-end indices to the last visible node', () => {
      const { result } = renderHook(() => useTreeView({ nodes: mockTree }));
      act(() => result.current.focusItem(99));
      // 4 visible nodes when nothing expanded: root, folder1, folder2, disabled
      expect(result.current.focusIndexRef.current).toBe(3);
    });

    it('focuses the DOM element registered in itemRefs', () => {
      const { result } = renderHook(() => useTreeView({ nodes: mockTree }));
      const el = { focus: jest.fn() };
      result.current.itemRefs.current.set('folder1', el as unknown as HTMLDivElement);
      act(() => result.current.focusItem(1));
      expect(result.current.focusIndexRef.current).toBe(1);
      expect(el.focus).toHaveBeenCalledTimes(1);
    });

    it('updates the index but does not throw when no element is registered', () => {
      const { result } = renderHook(() => useTreeView({ nodes: mockTree }));
      act(() => result.current.focusItem(2));
      expect(result.current.focusIndexRef.current).toBe(2);
    });

    it('handles an empty tree without throwing', () => {
      const { result } = renderHook(() => useTreeView({ nodes: [] }));
      act(() => result.current.focusItem(0));
      expect(result.current.focusIndexRef.current).toBe(0);
    });
  });

  describe('handleKeyDown — roving tabindex navigation', () => {
    const keyEvent = (key: string) =>
      ({ key, preventDefault: jest.fn() }) as unknown as KeyboardEvent;

    it('ArrowDown moves focus to the next visible node and prevents default', () => {
      const { result } = renderHook(() => useTreeView({ nodes: mockTree }));
      result.current.focusIndexRef.current = 0; // root
      const ev = keyEvent('ArrowDown');
      act(() => result.current.handleKeyDown(ev));
      expect(result.current.focusIndexRef.current).toBe(1); // folder1
      expect(ev.preventDefault).toHaveBeenCalledTimes(1);
    });

    it('ArrowUp moves focus to the previous visible node', () => {
      const { result } = renderHook(() => useTreeView({ nodes: mockTree }));
      result.current.focusIndexRef.current = 2; // folder2
      act(() => result.current.handleKeyDown(keyEvent('ArrowUp')));
      expect(result.current.focusIndexRef.current).toBe(1); // folder1
    });

    it('ArrowUp clamps at the first node', () => {
      const { result } = renderHook(() => useTreeView({ nodes: mockTree }));
      result.current.focusIndexRef.current = 0; // root
      act(() => result.current.handleKeyDown(keyEvent('ArrowUp')));
      expect(result.current.focusIndexRef.current).toBe(0);
    });

    it('ArrowRight expands a collapsed parent', () => {
      const onExpandChange = jest.fn();
      const { result } = renderHook(() => useTreeView({ nodes: mockTree, onExpandChange }));
      result.current.focusIndexRef.current = 1; // folder1, collapsed
      act(() => result.current.handleKeyDown(keyEvent('ArrowRight')));
      expect(result.current.expandedSet.has('folder1')).toBe(true);
      expect(onExpandChange).toHaveBeenCalledWith(['folder1']);
    });

    it('ArrowRight moves focus into an already-expanded parent', () => {
      const { result } = renderHook(() =>
        useTreeView({ nodes: mockTree, defaultExpandedNodeIds: ['folder1'] }),
      );
      // visible: root(0), folder1(1), file1(2), file2(3), folder2(4), disabled(5)
      result.current.focusIndexRef.current = 1; // folder1, expanded
      act(() => result.current.handleKeyDown(keyEvent('ArrowRight')));
      expect(result.current.focusIndexRef.current).toBe(2); // first child
      expect(result.current.visibleNodes[2].node.id).toBe('file1');
    });

    it('ArrowRight does nothing on a leaf node', () => {
      const onExpandChange = jest.fn();
      const { result } = renderHook(() => useTreeView({ nodes: mockTree, onExpandChange }));
      result.current.focusIndexRef.current = 0; // root (no children)
      act(() => result.current.handleKeyDown(keyEvent('ArrowRight')));
      expect(result.current.focusIndexRef.current).toBe(0);
      expect(onExpandChange).not.toHaveBeenCalled();
    });

    it('ArrowLeft collapses an expanded parent', () => {
      const onExpandChange = jest.fn();
      const { result } = renderHook(() =>
        useTreeView({
          nodes: mockTree,
          defaultExpandedNodeIds: ['folder1'],
          onExpandChange,
        }),
      );
      result.current.focusIndexRef.current = 1; // folder1, expanded
      act(() => result.current.handleKeyDown(keyEvent('ArrowLeft')));
      expect(result.current.expandedSet.has('folder1')).toBe(false);
      expect(onExpandChange).toHaveBeenCalledWith([]);
    });

    it('ArrowLeft on a leaf moves focus to its parent', () => {
      const { result } = renderHook(() =>
        useTreeView({
          nodes: mockTree,
          defaultExpandedNodeIds: ['folder2', 'nested'],
        }),
      );
      // visible: root(0), folder1(1), folder2(2), nested(3), deep(4), disabled(5)
      result.current.focusIndexRef.current = 4; // deep, depth 2
      act(() => result.current.handleKeyDown(keyEvent('ArrowLeft')));
      expect(result.current.focusIndexRef.current).toBe(3); // nested, depth 1
      expect(result.current.visibleNodes[3].node.id).toBe('nested');
    });

    it('ArrowLeft on a depth-1 leaf walks up to the depth-0 parent', () => {
      const { result } = renderHook(() =>
        useTreeView({ nodes: mockTree, defaultExpandedNodeIds: ['folder1'] }),
      );
      // visible: root(0), folder1(1), file1(2), file2(3), folder2(4), disabled(5)
      result.current.focusIndexRef.current = 3; // file2, depth 1
      act(() => result.current.handleKeyDown(keyEvent('ArrowLeft')));
      expect(result.current.focusIndexRef.current).toBe(1); // folder1, depth 0
    });

    it('ArrowLeft does nothing on a top-level leaf', () => {
      const onExpandChange = jest.fn();
      const { result } = renderHook(() => useTreeView({ nodes: mockTree, onExpandChange }));
      result.current.focusIndexRef.current = 0; // root: depth 0, no children
      act(() => result.current.handleKeyDown(keyEvent('ArrowLeft')));
      expect(result.current.focusIndexRef.current).toBe(0);
      expect(onExpandChange).not.toHaveBeenCalled();
    });

    it('Enter selects the focused node and prevents default', () => {
      const onSelect = jest.fn();
      const { result } = renderHook(() => useTreeView({ nodes: mockTree, onSelect }));
      result.current.focusIndexRef.current = 0; // root
      const ev = keyEvent('Enter');
      act(() => result.current.handleKeyDown(ev));
      expect(result.current.selectedId).toBe('root');
      expect(onSelect).toHaveBeenCalledWith('root', expect.objectContaining({ id: 'root' }));
      expect(ev.preventDefault).toHaveBeenCalledTimes(1);
    });

    it('Space selects the focused node too', () => {
      const { result } = renderHook(() => useTreeView({ nodes: mockTree }));
      result.current.focusIndexRef.current = 2; // folder2
      act(() => result.current.handleKeyDown(keyEvent(' ')));
      expect(result.current.selectedId).toBe('folder2');
    });

    it('Enter does not select a disabled node', () => {
      const onSelect = jest.fn();
      const { result } = renderHook(() => useTreeView({ nodes: mockTree, onSelect }));
      result.current.focusIndexRef.current = 3; // disabled node
      act(() => result.current.handleKeyDown(keyEvent('Enter')));
      expect(result.current.selectedId).toBeNull();
      expect(onSelect).not.toHaveBeenCalled();
    });

    it('Home focuses the first visible node', () => {
      const { result } = renderHook(() => useTreeView({ nodes: mockTree }));
      result.current.focusIndexRef.current = 2;
      act(() => result.current.handleKeyDown(keyEvent('Home')));
      expect(result.current.focusIndexRef.current).toBe(0);
    });

    it('End focuses the last visible node', () => {
      const { result } = renderHook(() =>
        useTreeView({ nodes: mockTree, defaultExpandedNodeIds: ['folder1'] }),
      );
      // visible: root(0), folder1(1), file1(2), file2(3), folder2(4), disabled(5)
      result.current.focusIndexRef.current = 0;
      act(() => result.current.handleKeyDown(keyEvent('End')));
      expect(result.current.focusIndexRef.current).toBe(5);
    });

    it('ignores keys outside the navigation set (no preventDefault)', () => {
      const onSelect = jest.fn();
      const { result } = renderHook(() => useTreeView({ nodes: mockTree, onSelect }));
      result.current.focusIndexRef.current = 0;
      const ev = keyEvent('a');
      act(() => result.current.handleKeyDown(ev));
      expect(ev.preventDefault).not.toHaveBeenCalled();
      expect(result.current.focusIndexRef.current).toBe(0);
      expect(onSelect).not.toHaveBeenCalled();
    });

    it('returns early when the focus index is out of range', () => {
      const { result } = renderHook(() => useTreeView({ nodes: mockTree }));
      result.current.focusIndexRef.current = 99; // no such visible node
      const ev = keyEvent('ArrowDown');
      act(() => result.current.handleKeyDown(ev));
      expect(ev.preventDefault).not.toHaveBeenCalled();
      expect(result.current.focusIndexRef.current).toBe(99); // untouched
    });
  });
});
