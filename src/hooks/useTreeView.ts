import { useState, useCallback, useRef, useMemo } from 'react';

/**
 * Re-export TreeNode so consumers of the hook don't need to import
 * from the component file.
 */
export interface TreeNode<T = unknown> {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  children?: TreeNode<T>[];
  data?: T;
}

/** Flatten the tree into a visible node list (only expanded nodes' children
 *  are included). Returns nodes in depth-first order with their depth. */
function flattenVisible<T>(
  nodes: TreeNode<T>[],
  expanded: Set<string>,
): Array<{ node: TreeNode<T>; depth: number }> {
  const result: Array<{ node: TreeNode<T>; depth: number }> = [];
  const walk = (list: TreeNode<T>[], depth: number) => {
    for (const node of list) {
      result.push({ node, depth });
      if (node.children && node.children.length > 0 && expanded.has(node.id)) {
        walk(node.children, depth + 1);
      }
    }
  };
  walk(nodes, 0);
  return result;
}

/** Find a node by id in the tree. Returns the node or null. */
function findNode<T>(nodes: TreeNode<T>[], id: string): TreeNode<T> | null {
  for (const node of nodes) {
    if (node.id === id) return node;
    if (node.children) {
      const found = findNode(node.children, id);
      if (found) return found;
    }
  }
  return null;
}

export interface UseTreeViewOptions<T = unknown> {
  /** Tree data (recursive). */
  nodes: TreeNode<T>[];
  /** Controlled expanded node ids. */
  expandedNodeIds?: string[];
  /** Uncontrolled initial expanded node ids. */
  defaultExpandedNodeIds?: string[];
  /** Called when the expanded set changes. */
  onExpandChange?: (expandedNodeIds: string[]) => void;
  /** Controlled selected node id (single-select). */
  selectedNodeId?: string | null;
  /** Uncontrolled initial selected node id. */
  defaultSelectedNodeId?: string | null;
  /** Called when the selection changes. */
  onSelect?: (nodeId: string | null, node: TreeNode<T> | null) => void;
}

export interface UseTreeViewResult<T = unknown> {
  /** Currently expanded node ids (controlled or internal). */
  expandedIds: string[];
  /** Set of expanded node ids (for O(1) lookup). */
  expandedSet: Set<string>;
  /** Currently selected node id (controlled or internal). */
  selectedId: string | null;
  /** Whether expansion is controlled. */
  isControlledExpanded: boolean;
  /** Whether selection is controlled. */
  isControlledSelected: boolean;
  /** Flattened list of visible nodes with depths (only expanded children shown). */
  visibleNodes: Array<{ node: TreeNode<T>; depth: number }>;
  /** Toggle a node's expand/collapse state. */
  toggleExpand: (nodeId: string) => void;
  /** Expand a specific node. */
  expandNode: (nodeId: string) => void;
  /** Collapse a specific node. */
  collapseNode: (nodeId: string) => void;
  /** Select a node by id (respects disabled). */
  selectNode: (nodeId: string | null) => void;
  /** Find a node by id in the tree. */
  findNodeById: (id: string) => TreeNode<T> | null;
  /** Ref to the focus index (for roving-tabindex keyboard nav). */
  focusIndexRef: React.MutableRefObject<number>;
  /** Ref map of node id → DOM element (for focus management). */
  itemRefs: React.MutableRefObject<Map<string, HTMLDivElement>>;
  /** Focus a specific visible node by index. */
  focusItem: (index: number) => void;
  /** Handle keyboard events (ArrowUp/Down/Left/Right, Enter/Space, Home/End). */
  handleKeyDown: (e: React.KeyboardEvent) => void;
}

/**
 * Headless tree-view behavior: expand/collapse state, selection,
 * visible-node flattening, and keyboard navigation (roving-tabindex
 * pattern with ArrowUp/Down/Left/Right, Enter/Space, Home/End).
 *
 * The component handles rendering, styling, ARIA attributes, and
 * connector lines; this hook handles all the behavior.
 *
 * @example
 * const {
 *   expandedSet, selectedId, visibleNodes, toggleExpand, selectNode,
 *   handleKeyDown, focusIndexRef, itemRefs,
 * } = useTreeView({ nodes, defaultExpandedNodeIds: ['root'] });
 */
export function useTreeView<T = unknown>({
  nodes,
  expandedNodeIds: controlledExpanded,
  defaultExpandedNodeIds = [],
  onExpandChange,
  selectedNodeId: controlledSelected,
  defaultSelectedNodeId = null,
  onSelect,
}: UseTreeViewOptions<T>): UseTreeViewResult<T> {
  const isControlledExpanded = controlledExpanded !== undefined;
  const isControlledSelected = controlledSelected !== undefined;
  const [internalExpanded, setInternalExpanded] = useState<string[]>(defaultExpandedNodeIds);
  const [internalSelected, setInternalSelected] = useState<string | null>(defaultSelectedNodeId);

  const expandedIds = isControlledExpanded ? controlledExpanded! : internalExpanded;
  const expandedSet = useMemo(() => new Set(expandedIds), [expandedIds]);
  const selectedId = isControlledSelected ? controlledSelected! : internalSelected;

  const visibleNodes = useMemo(() => flattenVisible(nodes, expandedSet), [nodes, expandedSet]);

  const focusIndexRef = useRef(0);
  const itemRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const toggleExpand = useCallback(
    (nodeId: string) => {
      const isExpanded = expandedSet.has(nodeId);
      const newExpanded = isExpanded
        ? expandedIds.filter((id) => id !== nodeId)
        : [...expandedIds, nodeId];
      if (!isControlledExpanded) {
        setInternalExpanded(newExpanded);
      }
      onExpandChange?.(newExpanded);
    },
    [expandedSet, expandedIds, isControlledExpanded, onExpandChange],
  );

  const expandNode = useCallback(
    (nodeId: string) => {
      if (expandedSet.has(nodeId)) return;
      toggleExpand(nodeId);
    },
    [expandedSet, toggleExpand],
  );

  const collapseNode = useCallback(
    (nodeId: string) => {
      if (!expandedSet.has(nodeId)) return;
      toggleExpand(nodeId);
    },
    [expandedSet, toggleExpand],
  );

  const findNodeById = useCallback((id: string) => findNode(nodes, id), [nodes]);

  const selectNode = useCallback(
    (nodeId: string | null) => {
      const node = nodeId ? findNode(nodes, nodeId) : null;
      if (nodeId && node?.disabled) return;
      if (!isControlledSelected) {
        setInternalSelected(nodeId);
      }
      onSelect?.(nodeId, node);
    },
    [nodes, isControlledSelected, onSelect],
  );

  const focusItem = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, visibleNodes.length - 1));
      focusIndexRef.current = clamped;
      const node = visibleNodes[clamped];
      if (node) {
        const el = itemRefs.current.get(node.node.id);
        el?.focus();
      }
    },
    [visibleNodes],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const current = visibleNodes[focusIndexRef.current];
      if (!current) return;
      const { node, depth } = current;
      const hasChildren = !!(node.children && node.children.length > 0);
      const isExpanded = expandedSet.has(node.id);

      switch (e.key) {
        case 'ArrowDown': {
          e.preventDefault();
          focusItem(focusIndexRef.current + 1);
          break;
        }
        case 'ArrowUp': {
          e.preventDefault();
          focusItem(focusIndexRef.current - 1);
          break;
        }
        case 'ArrowRight': {
          e.preventDefault();
          if (hasChildren && !isExpanded) {
            toggleExpand(node.id);
          } else if (hasChildren && isExpanded) {
            focusItem(focusIndexRef.current + 1);
          }
          break;
        }
        case 'ArrowLeft': {
          e.preventDefault();
          if (hasChildren && isExpanded) {
            toggleExpand(node.id);
          } else if (depth > 0) {
            for (let i = focusIndexRef.current - 1; i >= 0; i--) {
              if (visibleNodes[i].depth === depth - 1) {
                focusItem(i);
                break;
              }
            }
          }
          break;
        }
        case 'Enter':
        case ' ': {
          e.preventDefault();
          if (!node.disabled) {
            selectNode(node.id);
          }
          break;
        }
        case 'Home': {
          e.preventDefault();
          focusItem(0);
          break;
        }
        case 'End': {
          e.preventDefault();
          focusItem(visibleNodes.length - 1);
          break;
        }
      }
    },
    [visibleNodes, expandedSet, toggleExpand, selectNode, focusItem],
  );

  return {
    expandedIds,
    expandedSet,
    selectedId,
    isControlledExpanded,
    isControlledSelected,
    visibleNodes,
    toggleExpand,
    expandNode,
    collapseNode,
    selectNode,
    findNodeById,
    focusIndexRef,
    itemRefs,
    focusItem,
    handleKeyDown,
  };
}
