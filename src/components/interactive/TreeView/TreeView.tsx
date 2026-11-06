// TreeView.tsx
import React, { forwardRef, useState, useCallback, useRef, useId, useMemo } from 'react';
import { resolveThemeValue, getAriaProps } from '../../../utils';
import './TreeView.css';

export type TreeViewVariant = 'primary' | 'secondary' | 'ghost' | 'outline';
export type TreeViewSize = 'sm' | 'md' | 'lg';

export interface TreeNode<T = unknown> {
  /** Unique id for this node. */
  id: string;
  /** Display label (string or ReactNode). */
  label: React.ReactNode;
  /** Optional icon rendered before the label. */
  icon?: React.ReactNode;
  /** Whether the node is disabled (not selectable, not expandable). */
  disabled?: boolean;
  /** Child nodes (recursive). When present, the node is expandable. */
  children?: TreeNode<T>[];
  /** Consumer-defined payload data for this node. */
  data?: T;
}

export interface TreeViewProps<T = unknown> {
  /** Tree data (recursive). */
  nodes: TreeNode<T>[];
  /** Controlled expanded node ids. */
  expandedNodeIds?: string[];
  /** Uncontrolled initial expanded node ids. */
  defaultExpandedNodeIds?: string[];
  onExpandChange?: (expandedNodeIds: string[]) => void;
  /** Controlled selected node id (single-select). */
  selectedNodeId?: string | null;
  /** Uncontrolled initial selected node id. */
  defaultSelectedNodeId?: string | null;
  onSelect?: (nodeId: string | null, node: TreeNode<T> | null) => void;
  /** Show tree connector lines (vertical guides). Default: true. */
  showLines?: boolean;
  /** Variant. */
  variant?: TreeViewVariant;
  /** Size. */
  size?: TreeViewSize;
  /** Theme override for the selected node accent + focus ring. */
  color?: string;
  /** Text color override. */
  textColor?: string;
  /** Border color override. */
  borderColor?: string;
  /** Border radius override. */
  borderRadius?: string | number;
  /** Shadow level. */
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  style?: React.CSSProperties;
  /** Accessibility label for the tree. */
  ariaLabel?: string;
  id?: string;
}

/* ---------- helpers ---------- */

/** Flatten the tree into a visible node list (only expanded nodes' children
 *  are included). Returns nodes in depth-first order with their depth. */
const flattenVisible = <T,>(
  nodes: TreeNode<T>[],
  expanded: Set<string>,
): Array<{ node: TreeNode<T>; depth: number }> => {
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
};

/** Find a node by id in the tree. Returns the node or null. */
const findNode = <T,>(nodes: TreeNode<T>[], id: string): TreeNode<T> | null => {
  for (const node of nodes) {
    if (node.id === id) return node;
    if (node.children) {
      const found = findNode(node.children, id);
      if (found) return found;
    }
  }
  return null;
};

/* ---------- component ---------- */

export const TreeView = forwardRef<HTMLDivElement, TreeViewProps>(
  <T,>(props: TreeViewProps<T>, ref: React.Ref<HTMLDivElement>) => {
    const {
      nodes,
      expandedNodeIds: controlledExpanded,
      defaultExpandedNodeIds = [],
      onExpandChange,
      selectedNodeId: controlledSelected,
      defaultSelectedNodeId = null,
      onSelect,
      showLines = true,
      variant = 'primary',
      size = 'md',
      color,
      textColor,
      borderColor,
      borderRadius,
      shadow,
      className = '',
      style,
      ariaLabel = 'Tree view',
      id,
      ...rest
    } = props;

    const generatedId = useId();

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

    // Theme resolution
    const resolvedColor = resolveThemeValue(color);
    const resolvedTextColor = resolveThemeValue(textColor);
    const resolvedBorderColor = resolveThemeValue(borderColor);
    const resolvedShadow = shadow !== undefined ? resolveThemeValue(`shadow-${shadow}`) : undefined;

    const componentStyle: React.CSSProperties & Record<string, string> = {
      ...(resolvedColor && { '--treeview-custom-accent': resolvedColor }),
      ...(resolvedTextColor && { '--treeview-custom-text-color': resolvedTextColor }),
      ...(resolvedBorderColor && { '--treeview-custom-border': resolvedBorderColor }),
      ...(borderRadius !== undefined && {
        '--treeview-custom-border-radius':
          typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
      }),
      ...(resolvedShadow && { '--treeview-custom-shadow': resolvedShadow }),
    };

    const mergedStyle = style ? { ...componentStyle, ...style } : componentStyle;
    const ariaProps = getAriaProps({ label: ariaLabel });

    const classes = [
      'treeview-component',
      `treeview-component--${variant}`,
      `treeview-component--${size}`,
      showLines && 'treeview-component--lined',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        id={id || generatedId}
        className={classes}
        style={mergedStyle}
        role="tree"
        {...ariaProps}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        {visibleNodes.map(({ node, depth }, index) => {
          const hasChildren = !!(node.children && node.children.length > 0);
          const isExpanded = expandedSet.has(node.id);
          const isSelected = selectedId === node.id;
          const isFocused = index === focusIndexRef.current;

          return (
            <div
              key={node.id}
              ref={(el) => {
                if (el) itemRefs.current.set(node.id, el);
                else itemRefs.current.delete(node.id);
              }}
              role="treeitem"
              tabIndex={isFocused ? 0 : -1}
              aria-expanded={hasChildren ? isExpanded : undefined}
              aria-selected={isSelected || undefined}
              aria-disabled={node.disabled || undefined}
              aria-level={depth + 1}
              className={[
                'treeview-component__node',
                isSelected && 'treeview-component__node--selected',
                node.disabled && 'treeview-component__node--disabled',
              ]
                .filter(Boolean)
                .join(' ')}
              style={{ '--treeview-depth': depth } as React.CSSProperties}
              onClick={() => {
                if (!node.disabled) {
                  selectNode(node.id);
                  if (hasChildren) toggleExpand(node.id);
                }
              }}
            >
              <div
                className="treeview-component__row"
                style={{
                  paddingLeft: `calc(${depth} * var(--treeview-indent, 20px))`,
                }}
              >
                {hasChildren ? (
                  <button
                    type="button"
                    className="treeview-component__toggle"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!node.disabled) toggleExpand(node.id);
                    }}
                    tabIndex={-1}
                    aria-hidden="true"
                  >
                    <span
                      className={`treeview-component__toggle-icon ${
                        isExpanded ? 'treeview-component__toggle-icon--expanded' : ''
                      }`}
                    >
                      ▶
                    </span>
                  </button>
                ) : (
                  <span className="treeview-component__toggle-placeholder" aria-hidden="true" />
                )}
                {node.icon && <span className="treeview-component__icon">{node.icon}</span>}
                <span className="treeview-component__label">{node.label}</span>
              </div>
            </div>
          );
        })}
        {visibleNodes.length === 0 && <div className="treeview-component__empty">No items</div>}
      </div>
    );
  },
) as (<T>(props: TreeViewProps<T>) => React.ReactElement) & {
  displayName?: string;
};

(TreeView as { displayName?: string }).displayName = 'TreeView';
