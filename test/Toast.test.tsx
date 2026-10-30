import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import {
  Toast,
  ToastProvider,
  useToast,
  type ToastOptions,
} from '../src/components/composition/Toast/Toast';

// Mock timers for auto-dismiss tests
jest.useFakeTimers();

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Test rig: a button that fires a toast with the given options when clicked. */
const FireButton: React.FC<{ label?: string; options?: ToastOptions }> = ({
  label = 'fire',
  options,
}) => {
  const { toast } = useToast();
  return (
    <button type="button" onClick={() => toast(options)}>
      {label}
    </button>
  );
};

const rig = (options?: ToastOptions) =>
  render(
    <ToastProvider>
      <FireButton options={options} />
    </ToastProvider>,
  );

// ---------------------------------------------------------------------------
// Standalone presentational Toast
// ---------------------------------------------------------------------------
describe('Toast (standalone)', () => {
  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
  });

  it('renders when open', () => {
    render(<Toast open title="Hello" description="World" />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('World')).toBeInTheDocument();
  });

  it('renders children as message when description is absent', () => {
    render(<Toast open>Plain message</Toast>);
    expect(screen.getByText('Plain message')).toBeInTheDocument();
  });

  it('does not render when open is false', () => {
    render(<Toast open={false} title="Hidden" />);
    expect(screen.queryByText('Hidden')).not.toBeInTheDocument();
  });

  it('renders with defaultOpen', () => {
    render(<Toast defaultOpen title="Default" />);
    expect(screen.getByText('Default')).toBeInTheDocument();
  });

  it('uses role="status" by default and role="alert" for errors', () => {
    const { rerender } = render(<Toast open title="Info toast" variant="info" />);
    expect(screen.getByRole('status')).toBeInTheDocument();
    rerender(<Toast open title="Error toast" variant="error" />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('applies variant classes', () => {
    const variants = ['success', 'warning', 'error', 'info', 'primary', 'secondary'] as const;
    variants.forEach((variant) => {
      const { unmount } = render(
        <Toast open variant={variant}>
          {variant}
        </Toast>,
      );
      const root = screen.getByText(variant).closest('.toast-component');
      expect(root).toHaveClass(`toast-component--${variant}`);
      unmount();
    });
  });

  it('applies size classes', () => {
    const sizes = ['xs', 'sm', 'md', 'lg'] as const;
    sizes.forEach((size) => {
      const { unmount } = render(
        <Toast open size={size}>
          {size}
        </Toast>,
      );
      const root = screen.getByText(size).closest('.toast-component');
      expect(root).toHaveClass(`toast-component--${size}`);
      unmount();
    });
  });

  it('applies animation classes', () => {
    render(
      <Toast open animation="scale" duration={0}>
        animated
      </Toast>,
    );
    expect(screen.getByText('animated').closest('.toast-component')).toHaveClass(
      'toast-component--scale',
    );
  });

  it('hides after auto-dismiss duration and exit animation', () => {
    const onClose = jest.fn();
    render(
      <Toast defaultOpen autoDismiss duration={1000} onClose={onClose}>
        bye
      </Toast>,
    );
    expect(screen.getByText('bye')).toBeInTheDocument();

    // Not dismissed before the duration elapses
    act(() => {
      jest.advanceTimersByTime(999);
    });
    expect(screen.getByText('bye')).toBeInTheDocument();

    // Duration fires -> exit animation starts (still in the DOM)
    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(screen.getByText('bye')).toBeInTheDocument();
    expect(screen.getByText('bye').closest('.toast-component')).toHaveClass(
      'toast-component--exiting',
    );

    // Exit animation finishes -> removed and onClose called
    act(() => {
      jest.advanceTimersByTime(300);
    });
    expect(screen.queryByText('bye')).not.toBeInTheDocument();
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('stays visible when duration is 0', () => {
    render(
      <Toast open autoDismiss duration={0}>
        sticky
      </Toast>,
    );
    act(() => {
      jest.advanceTimersByTime(60000);
    });
    expect(screen.getByText('sticky')).toBeInTheDocument();
  });

  it('does not auto-dismiss when autoDismiss is false', () => {
    render(
      <Toast open autoDismiss={false} duration={1000}>
        manual
      </Toast>,
    );
    act(() => {
      jest.advanceTimersByTime(60000);
    });
    expect(screen.getByText('manual')).toBeInTheDocument();
  });

  it('closes via the dismiss button and calls onClose', () => {
    const onClose = jest.fn();
    render(
      <Toast defaultOpen onClose={onClose}>
        dismissible
      </Toast>,
    );
    fireEvent.click(screen.getByLabelText('Close toast'));

    act(() => {
      jest.advanceTimersByTime(300);
    });
    expect(screen.queryByText('dismissible')).not.toBeInTheDocument();
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('renders no dismiss button when dismissible is false', () => {
    render(
      <Toast open dismissible={false}>
        locked
      </Toast>,
    );
    expect(screen.queryByLabelText('Close toast')).not.toBeInTheDocument();
  });

  it('renders and clicks the action button', () => {
    const onActionClick = jest.fn();
    render(
      <Toast open action="Undo" onActionClick={onActionClick}>
        with action
      </Toast>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Toast action' }));
    expect(onActionClick).toHaveBeenCalledTimes(1);
  });

  it('shows the default variant icon and hides it with showIcon=false', () => {
    const { rerender } = render(
      <Toast open variant="success" title="With icon">
        body
      </Toast>,
    );
    expect(screen.getByText('✓')).toBeInTheDocument();

    rerender(
      <Toast open variant="success" showIcon={false} title="No icon">
        body
      </Toast>,
    );
    expect(screen.queryByText('✓')).not.toBeInTheDocument();
  });

  it('renders a custom icon', () => {
    render(
      <Toast open customIcon="🚀" title="Rocket">
        body
      </Toast>,
    );
    expect(screen.getByText('🚀')).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// Pause on hover
// ---------------------------------------------------------------------------
describe('Toast pause-on-hover', () => {
  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
  });

  it('pauses the countdown while hovered and resumes after', () => {
    render(
      <Toast defaultOpen autoDismiss duration={4000}>
        hoverable
      </Toast>,
    );

    // Burn half the duration
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    // Hover: pause
    fireEvent.mouseEnter(screen.getByText('hoverable'));
    act(() => {
      jest.advanceTimersByTime(5000); // way past the original deadline
    });
    expect(screen.getByText('hoverable')).toBeInTheDocument();

    // Leave: resume with the remaining ~2000ms
    fireEvent.mouseLeave(screen.getByText('hoverable'));
    act(() => {
      jest.advanceTimersByTime(1999);
    });
    expect(screen.getByText('hoverable')).toBeInTheDocument();

    // Countdown completes -> exit -> gone
    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(screen.getByText('hoverable').closest('.toast-component')).toHaveClass(
      'toast-component--exiting',
    );
    act(() => {
      jest.advanceTimersByTime(300);
    });
    expect(screen.queryByText('hoverable')).not.toBeInTheDocument();
  });

  it('does not pause when pauseOnHover is false', () => {
    render(
      <Toast defaultOpen autoDismiss duration={4000} pauseOnHover={false}>
        no pause
      </Toast>,
    );
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    fireEvent.mouseEnter(screen.getByText('no pause'));
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(screen.getByText('no pause').closest('.toast-component')).toHaveClass(
      'toast-component--exiting',
    );
  });
});

// ---------------------------------------------------------------------------
// ToastProvider + useToast
// ---------------------------------------------------------------------------
describe('ToastProvider / useToast', () => {
  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
  });

  it('renders children', () => {
    render(
      <ToastProvider>
        <div>app content</div>
      </ToastProvider>,
    );
    expect(screen.getByText('app content')).toBeInTheDocument();
  });

  it('renders a viewport region', () => {
    render(
      <ToastProvider>
        <div>app</div>
      </ToastProvider>,
    );
    expect(screen.getByRole('region', { name: 'Notifications' })).toBeInTheDocument();
  });

  it('throws when useToast is used outside a provider', () => {
    // Silence the expected error output
    const spy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const Outside: React.FC = () => {
      useToast();
      return null;
    };
    expect(() => render(<Outside />)).toThrow('useToast must be used within a <ToastProvider>');
    spy.mockRestore();
  });

  it('toast() renders a toast and returns an id', () => {
    let capturedId = '';
    const Fire: React.FC = () => {
      const { toast } = useToast();
      return (
        <button
          type="button"
          onClick={() => {
            capturedId = toast({ title: 'From hook' });
          }}
        >
          fire
        </button>
      );
    };
    render(
      <ToastProvider>
        <Fire />
      </ToastProvider>,
    );
    fireEvent.click(screen.getByText('fire'));
    expect(screen.getByText('From hook')).toBeInTheDocument();
    expect(capturedId).toMatch(/^toast-/);
  });

  it('fires variant shortcuts', () => {
    const FireAll: React.FC = () => {
      const { toast } = useToast();
      return (
        <div>
          <button type="button" onClick={() => toast.success('Success toast')}>
            success
          </button>
          <button type="button" onClick={() => toast.error('Error toast')}>
            error
          </button>
          <button type="button" onClick={() => toast.warning('Warning toast')}>
            warning
          </button>
          <button type="button" onClick={() => toast.info('Info toast')}>
            info
          </button>
        </div>
      );
    };
    render(
      <ToastProvider duration={0} maxToasts={0}>
        <FireAll />
      </ToastProvider>,
    );
    fireEvent.click(screen.getByText('success'));
    fireEvent.click(screen.getByText('error'));
    fireEvent.click(screen.getByText('warning'));
    fireEvent.click(screen.getByText('info'));

    expect(screen.getByText('Success toast').closest('.toast-component')).toHaveClass(
      'toast-component--success',
    );
    expect(screen.getByText('Error toast').closest('.toast-component')).toHaveClass(
      'toast-component--error',
    );
    expect(screen.getByText('Warning toast').closest('.toast-component')).toHaveClass(
      'toast-component--warning',
    );
    expect(screen.getByText('Info toast').closest('.toast-component')).toHaveClass(
      'toast-component--info',
    );
  });

  it('dismiss(id) removes the toast immediately', () => {
    const Fire: React.FC = () => {
      const { toast, dismiss } = useToast();
      return (
        <div>
          <button
            type="button"
            onClick={() => {
              const id = toast({ title: 'Dismissible', duration: 0 });
              setTimeout(() => dismiss(id), 50);
            }}
          >
            fire
          </button>
        </div>
      );
    };
    render(
      <ToastProvider>
        <Fire />
      </ToastProvider>,
    );
    fireEvent.click(screen.getByText('fire'));
    expect(screen.getByText('Dismissible')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(50);
    });
    expect(screen.queryByText('Dismissible')).not.toBeInTheDocument();
  });

  it('dismissAll clears every toast', () => {
    const Fire: React.FC = () => {
      const { toast, dismissAll } = useToast();
      return (
        <div>
          <button type="button" onClick={() => toast({ title: 'One', duration: 0 })}>
            one
          </button>
          <button type="button" onClick={() => toast({ title: 'Two', duration: 0 })}>
            two
          </button>
          <button type="button" onClick={dismissAll}>
            clear
          </button>
        </div>
      );
    };
    render(
      <ToastProvider maxToasts={0}>
        <Fire />
      </ToastProvider>,
    );
    fireEvent.click(screen.getByText('one'));
    fireEvent.click(screen.getByText('two'));
    expect(screen.getByText('One')).toBeInTheDocument();
    expect(screen.getByText('Two')).toBeInTheDocument();

    fireEvent.click(screen.getByText('clear'));
    expect(screen.queryByText('One')).not.toBeInTheDocument();
    expect(screen.queryByText('Two')).not.toBeInTheDocument();
  });

  it('limits simultaneous toasts to maxToasts (oldest dropped)', () => {
    const Fire: React.FC = () => {
      const { toast } = useToast();
      return (
        <button
          type="button"
          onClick={() => {
            toast({ title: 'First', duration: 0 });
            toast({ title: 'Second', duration: 0 });
            toast({ title: 'Third', duration: 0 });
            toast({ title: 'Fourth', duration: 0 });
          }}
        >
          fire
        </button>
      );
    };
    render(
      <ToastProvider maxToasts={2}>
        <Fire />
      </ToastProvider>,
    );
    fireEvent.click(screen.getByText('fire'));

    expect(screen.queryByText('First')).not.toBeInTheDocument();
    expect(screen.queryByText('Second')).not.toBeInTheDocument();
    expect(screen.getByText('Third')).toBeInTheDocument();
    expect(screen.getByText('Fourth')).toBeInTheDocument();
  });

  it('auto-dismisses using the provider default duration', () => {
    rig({ title: 'Auto' });
    fireEvent.click(screen.getByText('fire'));

    act(() => {
      jest.advanceTimersByTime(4000);
    });
    expect(screen.getByText('Auto').closest('.toast-component')).toHaveClass(
      'toast-component--exiting',
    );
  });

  it('per-toast duration overrides the provider default', () => {
    rig({ title: 'Quick', duration: 1000 });
    fireEvent.click(screen.getByText('fire'));

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByText('Quick').closest('.toast-component')).toHaveClass(
      'toast-component--exiting',
    );
  });

  it('calls the per-toast onClose callback after closing', () => {
    const onClose = jest.fn();
    rig({ title: 'Callback', duration: 0, onClose });
    fireEvent.click(screen.getByText('fire'));

    fireEvent.click(screen.getByLabelText('Close toast'));
    act(() => {
      jest.advanceTimersByTime(300);
    });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('applies viewport position classes', () => {
    const positions = [
      'top-left',
      'top-center',
      'top-right',
      'bottom-left',
      'bottom-center',
      'bottom-right',
    ] as const;
    positions.forEach((position) => {
      const { unmount } = render(
        <ToastProvider position={position}>
          <div>app</div>
        </ToastProvider>,
      );
      expect(screen.getByRole('region', { name: 'Notifications' })).toHaveClass(
        `toast-viewport--${position}`,
      );
      unmount();
    });
  });

  it('provider defaults flow into toast items', () => {
    rig({ title: 'Defaults' });
    fireEvent.click(screen.getByText('fire'));
    const root = screen.getByText('Defaults').closest('.toast-component');
    expect(root).toHaveClass('toast-component--md');
    expect(root).toHaveClass('toast-component--slide');
  });

  it('per-toast options override provider defaults', () => {
    rig({ title: 'Custom', size: 'lg', animation: 'scale' });
    fireEvent.click(screen.getByText('fire'));
    const root = screen.getByText('Custom').closest('.toast-component');
    expect(root).toHaveClass('toast-component--lg');
    expect(root).toHaveClass('toast-component--scale');
  });

  it('auto-dismiss removes the toast from the provider after the exit animation', async () => {
    rig({ title: 'Ephemeral' });
    fireEvent.click(screen.getByText('fire'));
    expect(screen.getByText('Ephemeral')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(4000 + 300);
    });
    await waitFor(() => expect(screen.queryByText('Ephemeral')).not.toBeInTheDocument());
  });

  it('uses a caller-provided id and dedupes it', () => {
    const FireTwice: React.FC = () => {
      const { toast } = useToast();
      return (
        <button
          type="button"
          onClick={() => {
            toast({ id: 'fixed-id', title: 'Only one', duration: 0 });
            toast({ id: 'fixed-id', title: 'Only one', duration: 0 });
          }}
        >
          fire
        </button>
      );
    };
    render(
      <ToastProvider>
        <FireTwice />
      </ToastProvider>,
    );
    fireEvent.click(screen.getByText('fire'));
    // Re-firing with the same id refreshes in place instead of stacking
    expect(screen.getAllByText('Only one')).toHaveLength(1);
  });
});
