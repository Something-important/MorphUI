// Toast.tsx
import React, {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { resolveThemeValue, getAriaProps } from '../../../utils';
import './Toast.css';

export type ToastVariant =
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'primary'
  | 'secondary'
  /** @deprecated use 'danger' — kept for backward compatibility */
  | 'error';

export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export type ToastAnimation = 'fade' | 'slide' | 'scale' | 'slide-up' | 'slide-down';

export type ToastSize = 'xs' | 'sm' | 'md' | 'lg';

const EXIT_ANIMATION_DURATION = 300;

let toastCounter = 0;
const generateToastId = (): string => `toast-${Date.now().toString(36)}-${++toastCounter}`;

// ---------------------------------------------------------------------------
// Presentational Toast (single toast item)
// ---------------------------------------------------------------------------

export interface ToastProps {
  /** Message body (same as children) */
  description?: React.ReactNode;
  children?: React.ReactNode;
  title?: React.ReactNode;
  variant?: ToastVariant;
  size?: ToastSize;

  // Visibility
  open?: boolean;
  defaultOpen?: boolean;
  onClose?: () => void;

  // Auto-dismiss
  dismissible?: boolean;
  autoDismiss?: boolean;
  /** Milliseconds before auto-dismiss. 0 disables auto-dismiss for this toast. */
  duration?: number;
  pauseOnHover?: boolean;

  // Styling
  color?: string;
  textColor?: string;
  borderColor?: string;
  backgroundColor?: string;
  borderRadius?: string | number;
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';

  // Icon
  icon?: React.ReactNode;
  showIcon?: boolean;
  customIcon?: React.ReactNode;

  // Animation
  animation?: ToastAnimation;

  // Actions
  action?: React.ReactNode;
  onActionClick?: () => void;

  // Advanced styling
  glassmorphism?: boolean;

  // Accessibility
  ariaLabel?: string;
  ariaDescribedBy?: string;
  id?: string;

  // Hover handlers (merged with pause-on-hover behavior)
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;

  // Styling overrides
  className?: string;
  style?: React.CSSProperties;
}

export const Toast = forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      description,
      children,
      title,
      variant = 'info',
      size = 'md',

      // Visibility
      open: controlledOpen,
      defaultOpen = true,
      onClose,

      // Auto-dismiss
      dismissible = true,
      autoDismiss = false,
      duration = 4000,
      pauseOnHover = true,

      // Styling
      color,
      textColor,
      borderColor,
      backgroundColor,
      borderRadius,
      shadow = 'lg',

      // Icon
      icon,
      showIcon = true,
      customIcon,

      // Animation
      animation = 'slide',

      // Actions
      action,
      onActionClick,

      // Advanced styling
      glassmorphism = false,

      // Accessibility
      ariaLabel,
      ariaDescribedBy,
      id,

      // Styling overrides
      className = '',
      style,

      // Hover handlers are merged with auto-dismiss pause behavior
      onMouseEnter,
      onMouseLeave,
      ...rest
    },
    ref,
  ) => {
    const [internalOpen, setInternalOpen] = useState(defaultOpen);
    const [isExiting, setIsExiting] = useState(false);
    const exitingRef = useRef(false);

    const isControlled = controlledOpen !== undefined;
    const isOpen = isControlled ? controlledOpen : internalOpen;

    // Latest-ref for close handler so timers always call the current closure
    const handleCloseRef = useRef<() => void>(() => undefined);
    const dismissTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const exitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const pauseTimerRef = useRef<(() => void) | null>(null);
    const resumeTimerRef = useRef<(() => void) | null>(null);

    // Clear timers on unmount
    useEffect(
      () => () => {
        if (dismissTimerRef.current) clearTimeout(dismissTimerRef.current);
        if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
      },
      [],
    );

    // Close flow: play exit animation, then hide and notify
    const handleClose = useCallback(() => {
      if (exitingRef.current) return;
      exitingRef.current = true;
      setIsExiting(true);

      if (dismissTimerRef.current) clearTimeout(dismissTimerRef.current);

      exitTimerRef.current = setTimeout(() => {
        if (!isControlled) {
          setInternalOpen(false);
        }
        exitingRef.current = false;
        setIsExiting(false);
        onClose?.();
      }, EXIT_ANIMATION_DURATION);
    }, [isControlled, onClose]);

    handleCloseRef.current = handleClose;

    // Auto-dismiss countdown with pause-on-hover support
    useEffect(() => {
      if (!autoDismiss || !isOpen || isExiting || !duration || duration <= 0) {
        pauseTimerRef.current = null;
        resumeTimerRef.current = null;
        return;
      }

      let remaining = duration;
      let startedAt = Date.now();
      let timer: ReturnType<typeof setTimeout> | null = setTimeout(() => {
        handleCloseRef.current();
      }, remaining);

      const clear = () => {
        if (timer) clearTimeout(timer);
        timer = null;
      };

      pauseTimerRef.current = () => {
        if (!timer) return;
        clear();
        remaining = Math.max(0, remaining - (Date.now() - startedAt));
      };

      resumeTimerRef.current = () => {
        if (timer) return;
        startedAt = Date.now();
        timer = setTimeout(() => {
          handleCloseRef.current();
        }, remaining);
      };

      return () => {
        clear();
        pauseTimerRef.current = null;
        resumeTimerRef.current = null;
      };
    }, [autoDismiss, isOpen, isExiting, duration]);

    // Resolve theme values
    const resolvedColor = resolveThemeValue(color);
    const resolvedTextColor = resolveThemeValue(textColor);
    const resolvedBorderColor = resolveThemeValue(borderColor);
    const resolvedBackgroundColor = resolveThemeValue(backgroundColor);

    // Default icons by variant
    const getDefaultIcon = () => {
      if (customIcon) return customIcon;
      if (!showIcon) return null;
      const icons: Record<ToastVariant, string> = {
        success: '✓',
        danger: '×',
        error: '×',
        warning: '!',
        info: 'i',
        primary: '•',
        secondary: '•',
      };
      return icon || icons[variant];
    };

    const defaultIcon = getDefaultIcon();
    const message = description ?? children;

    // Classes ('error' is the deprecated alias of 'danger')
    const variantClass = variant === 'error' ? 'danger' : variant;
    const classes = [
      'toast-component',
      `toast-component--${variantClass}`,
      `toast-component--${size}`,
      `toast-component--${animation}`,
      isOpen && !isExiting && 'toast-component--open',
      isExiting && 'toast-component--exiting',
      glassmorphism && 'toast-component--glassmorphism',
      dismissible && 'toast-component--dismissible',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Build component style object with CSS custom properties (match Alert pattern)
    const componentStyle: React.CSSProperties & Record<string, string> = {
      ...(resolvedBackgroundColor && {
        '--toast-custom-bg': resolvedBackgroundColor,
      }),
      ...(resolvedColor && {
        '--toast-custom-accent': resolvedColor,
      }),
      ...(resolvedTextColor && {
        '--toast-custom-color': resolvedTextColor,
      }),
      ...(resolvedBorderColor && {
        '--toast-custom-border': resolvedBorderColor,
      }),
      ...(borderRadius && {
        '--toast-custom-border-radius':
          typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
      }),
      ...(shadow &&
        resolveThemeValue(`shadow-${shadow}`) && {
          '--toast-custom-shadow': resolveThemeValue(`shadow-${shadow}`)!,
        }),
    };

    // Explicitly merge with user's style prop (user style takes precedence)
    const mergedStyle = style ? { ...componentStyle, ...style } : componentStyle;

    // ARIA attributes
    const ariaProps = getAriaProps({
      label: ariaLabel || (title ? String(title) : message ? String(message) : 'Toast'),
      describedBy: ariaDescribedBy,
    });

    // Don't render if not open
    if (!isOpen && !isExiting) {
      return null;
    }

    return (
      <div
        ref={ref}
        id={id}
        className={classes}
        style={mergedStyle}
        role={variant === 'error' || variant === 'danger' ? 'alert' : 'status'}
        onMouseEnter={(event) => {
          if (pauseOnHover) pauseTimerRef.current?.();
          onMouseEnter?.(event);
        }}
        onMouseLeave={(event) => {
          if (pauseOnHover) resumeTimerRef.current?.();
          onMouseLeave?.(event);
        }}
        {...ariaProps}
        {...rest}
      >
        {/* Icon */}
        {defaultIcon && (
          <div className="toast-component__icon" aria-hidden="true">
            {defaultIcon}
          </div>
        )}

        {/* Content */}
        <div className="toast-component__content">
          {title && <div className="toast-component__title">{title}</div>}
          {message && <div className="toast-component__message">{message}</div>}
        </div>

        {/* Action */}
        {action && (
          <div className="toast-component__action">
            <button
              type="button"
              className="toast-component__action-button"
              onClick={onActionClick}
              aria-label="Toast action"
            >
              {action}
            </button>
          </div>
        )}

        {/* Dismiss button */}
        {dismissible && (
          <button
            type="button"
            className="toast-component__dismiss"
            onClick={handleClose}
            aria-label="Close toast"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M12 4L4 12M4 4L12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>
    );
  },
);

Toast.displayName = 'Toast';

// ---------------------------------------------------------------------------
// Toast system: ToastProvider + useToast
// ---------------------------------------------------------------------------

/** Options accepted by the imperative `toast()` API. */
export interface ToastOptions
  extends Omit<
    ToastProps,
    | 'open'
    | 'defaultOpen'
    | 'onClose'
    | 'className'
    | 'style'
    | 'ariaLabel'
    | 'ariaDescribedBy'
    | 'id'
  > {
  /** Unique toast id. Auto-generated when omitted. */
  id?: string;
  /** Called after the toast finishes closing. */
  onClose?: () => void;
}

/** The callable `toast` API with per-variant shortcuts. */
export interface ToastFn {
  (options: ToastOptions): string;
  success: (
    title: React.ReactNode,
    description?: React.ReactNode,
    options?: Partial<Omit<ToastOptions, 'variant' | 'title' | 'description'>>,
  ) => string;
  danger: (
    title: React.ReactNode,
    description?: React.ReactNode,
    options?: Partial<Omit<ToastOptions, 'variant' | 'title' | 'description'>>,
  ) => string;
  /** @deprecated use danger() */
  error: (
    title: React.ReactNode,
    description?: React.ReactNode,
    options?: Partial<Omit<ToastOptions, 'variant' | 'title' | 'description'>>,
  ) => string;
  warning: (
    title: React.ReactNode,
    description?: React.ReactNode,
    options?: Partial<Omit<ToastOptions, 'variant' | 'title' | 'description'>>,
  ) => string;
  info: (
    title: React.ReactNode,
    description?: React.ReactNode,
    options?: Partial<Omit<ToastOptions, 'variant' | 'title' | 'description'>>,
  ) => string;
}

export interface ToastContextValue {
  toast: ToastFn;
  /** Dismiss a single toast by id (removes immediately). */
  dismiss: (id: string) => void;
  /** Dismiss all toasts immediately. */
  dismissAll: () => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export interface ToastProviderProps {
  children: React.ReactNode;
  /** Where the toast viewport is anchored on screen. */
  position?: ToastPosition;
  /** Maximum simultaneous toasts. Oldest toasts are dropped. 0 disables the limit. */
  maxToasts?: number;
  /** Default auto-dismiss duration in ms (per-toast `duration` overrides). */
  duration?: number;
  /** Whether toasts auto-dismiss by default. */
  autoDismiss?: boolean;
  /** Default entry/exit animation. */
  animation?: ToastAnimation;
  /** Default toast size. */
  size?: ToastSize;
  /** Whether hovering a toast pauses its auto-dismiss countdown. */
  pauseOnHover?: boolean;
  /** Extra classes for the toast viewport. */
  className?: string;
  /** Inline styles for the toast viewport. */
  style?: React.CSSProperties;
}

interface ToastEntry {
  id: string;
  options: ToastOptions;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  position = 'bottom-right',
  maxToasts = 3,
  duration = 4000,
  autoDismiss = true,
  animation = 'slide',
  size = 'md',
  pauseOnHover = true,
  className = '',
  style,
}) => {
  const [entries, setEntries] = useState<ToastEntry[]>([]);

  const dismiss = useCallback((id: string) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
  }, []);

  const dismissAll = useCallback(() => {
    setEntries([]);
  }, []);

  const toastFn = useMemo<ToastFn>(() => {
    const fn = ((options: ToastOptions = {}) => {
      const id = options.id ?? generateToastId();
      setEntries((prev) => {
        // Re-firing with an existing id refreshes that toast in place
        const existingIndex = prev.findIndex((entry) => entry.id === id);
        if (existingIndex >= 0) {
          const next = [...prev];
          next[existingIndex] = { id, options };
          return next;
        }
        const next = [...prev, { id, options }];
        return typeof maxToasts === 'number' && maxToasts > 0 && next.length > maxToasts
          ? next.slice(next.length - maxToasts)
          : next;
      });
      return id;
    }) as ToastFn;

    const shortcut =
      (variant: ToastVariant) =>
      (
        title: React.ReactNode,
        description?: React.ReactNode,
        options: Partial<Omit<ToastOptions, 'variant' | 'title' | 'description'>> = {},
      ): string =>
        fn({ ...options, title, description, variant });

    fn.success = shortcut('success');
    fn.danger = shortcut('danger');
    /** @deprecated use toast.danger() */
    fn.error = shortcut('danger');
    fn.warning = shortcut('warning');
    fn.info = shortcut('info');
    return fn;
  }, [maxToasts]);

  const contextValue = useMemo(
    () => ({ toast: toastFn, dismiss, dismissAll }),
    [toastFn, dismiss, dismissAll],
  );

  // Bottom positions read newest-first so fresh toasts appear closest to the edge
  const orderedEntries = position.startsWith('bottom') ? [...entries].reverse() : entries;

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <div
        className={['toast-viewport', `toast-viewport--${position}`, className]
          .filter(Boolean)
          .join(' ')}
        style={style}
        role="region"
        aria-label="Notifications"
      >
        {orderedEntries.map(({ id, options }) => (
          <Toast
            key={id}
            open
            title={options.title}
            description={options.description}
            variant={options.variant}
            size={options.size ?? size}
            dismissible={options.dismissible ?? true}
            autoDismiss={options.autoDismiss ?? autoDismiss}
            duration={options.duration ?? duration}
            pauseOnHover={options.pauseOnHover ?? pauseOnHover}
            action={options.action}
            onActionClick={options.onActionClick}
            icon={options.icon}
            showIcon={options.showIcon}
            customIcon={options.customIcon}
            animation={options.animation ?? animation}
            color={options.color}
            textColor={options.textColor}
            borderColor={options.borderColor}
            backgroundColor={options.backgroundColor}
            borderRadius={options.borderRadius}
            shadow={options.shadow}
            glassmorphism={options.glassmorphism}
            onClose={() => {
              options.onClose?.();
              dismiss(id);
            }}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

ToastProvider.displayName = 'ToastProvider';

/** Access the imperative toast API. Must be used inside a `<ToastProvider>`. */
export const useToast = (): ToastContextValue => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a <ToastProvider>');
  }
  return context;
};
