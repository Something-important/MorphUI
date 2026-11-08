// TreeView.tsx
import React, { forwardRef, useId } from 'react';
import { resolveThemeValue, getAriaProps } from '../../../utils';
import { useTreeView } from '../../../hooks';
import './TreeView.css';

export type TreeViewVariant = 'primary' | 'secondary' | 'ghost' | 'outline';
export type TreeViewSize = 'sm' | 'md' | 'lg';

// Re-export TreeNode for backward compatibility
export type { TreeNode } from '../../../hooks/useTreeView';
import type { TreeNode } from '../../../hooks/useTreeView';

export interface TreeViewProps<T = unknown> {
  nodes: TreeNode<T>[];
  expandedNodeIds?: string[];
  defaultExpandedNodeIds?: string[];
  onExpandChange?: (expandedNodeIds: string[]) => void;
  selectedNodeId?: string | null;
  defaultSelectedNodeId?: string | null;
  onSelect?: (nodeId: string | null, node: TreeNode<T> | null) => void;
  showLines?: boolean;
  variant?: TreeViewVariant;
  size?: TreeViewSize;
  color?: string;
  textColor?: string;
  borderColor?: string;
  borderRadius?: string | number;
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  style?: React.CSSProperties;
  ariaLabel?: string;
  id?: string;
}

// Generic forwardRef components can't have a static displayName without
// a cast; the cast below preserves the generic signature. The display name
// is set after the cast.
// eslint-disable-next-line react/display-name
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

    // useTreeView handles: expand/collapse, selection, visible-node
    // flattening, keyboard navigation (roving-tabindex), and focus
    // management. The component is purely the UI layer.
    const {
      expandedSet,
      selectedId,
      visibleNodes,
      toggleExpand,
      selectNode,
      focusIndexRef,
      itemRefs,
      handleKeyDown,
    } = useTreeView<T>({
      nodes,
      expandedNodeIds: controlledExpanded,
      defaultExpandedNodeIds,
      onExpandChange,
      selectedNodeId: controlledSelected,
      defaultSelectedNodeId,
      onSelect,
    });

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
        tabIndex={-1}
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
