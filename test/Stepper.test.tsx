import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Stepper } from '../src/components/basic/Stepper/Stepper';
import { ThemeProvider } from '../src/components/theme/ThemeProvider';

describe('Stepper Component', () => {
  const defaultSteps = [
    { id: '1', label: 'Step 1' },
    { id: '2', label: 'Step 2' },
    { id: '3', label: 'Step 3' },
  ];

  // Basic rendering
  describe('Basic Rendering', () => {
    it('renders stepper with steps', () => {
      const { container } = render(<Stepper steps={defaultSteps} activeStep={0} />);
      expect(container.querySelector('.stepper-component')).toBeInTheDocument();
      expect(screen.getByText('Step 1')).toBeInTheDocument();
      expect(screen.getByText('Step 2')).toBeInTheDocument();
      expect(screen.getByText('Step 3')).toBeInTheDocument();
    });

    it('does not render when steps array is empty', () => {
      const { container } = render(<Stepper steps={[]} activeStep={0} />);
      expect(container.querySelector('.stepper-component')).not.toBeInTheDocument();
    });

    it('renders step numbers by default', () => {
      render(<Stepper steps={defaultSteps} activeStep={0} />);
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
    });
  });

  // Orientations
  describe('Orientations', () => {
    it('applies horizontal orientation class', () => {
      const { container } = render(
        <Stepper steps={defaultSteps} activeStep={0} orientation="horizontal" />,
      );
      expect(container.querySelector('.stepper-component--horizontal')).toBeInTheDocument();
    });

    it('applies vertical orientation class', () => {
      const { container } = render(
        <Stepper steps={defaultSteps} activeStep={0} orientation="vertical" />,
      );
      expect(container.querySelector('.stepper-component--vertical')).toBeInTheDocument();
    });
  });

  // Sizes
  describe('Sizes', () => {
    const sizes: Array<'xs' | 'sm' | 'md' | 'lg'> = ['xs', 'sm', 'md', 'lg'];

    sizes.forEach((size) => {
      it(`applies ${size} size class`, () => {
        const { container } = render(<Stepper steps={defaultSteps} activeStep={0} size={size} />);
        expect(container.querySelector(`.stepper-component--${size}`)).toBeInTheDocument();
      });
    });
  });

  // Active step
  describe('Active Step', () => {
    it('marks correct step as active by index', () => {
      const { container } = render(<Stepper steps={defaultSteps} activeStep={1} />);
      const steps = container.querySelectorAll('.stepper-component__step');
      expect(steps[1]).toHaveClass('stepper-component__step--active');
    });

    it('marks correct step as active by step id', () => {
      const { container } = render(<Stepper steps={defaultSteps} activeStep="2" />);
      const steps = container.querySelectorAll('.stepper-component__step');
      expect(steps[1]).toHaveClass('stepper-component__step--active');
    });

    it('has aria-current="step" on active step', () => {
      render(<Stepper steps={defaultSteps} activeStep={1} />);
      const activeStepContent = screen
        .getByText('Step 2')
        .closest('.stepper-component__step-content');
      expect(activeStepContent).toHaveAttribute('aria-current', 'step');
    });
  });

  // Completed steps
  describe('Completed Steps', () => {
    it('marks completed steps correctly', () => {
      const steps = [
        { id: '1', label: 'Step 1', completed: true },
        { id: '2', label: 'Step 2' },
        { id: '3', label: 'Step 3' },
      ];
      const { container } = render(<Stepper steps={steps} activeStep={1} />);
      const stepElements = container.querySelectorAll('.stepper-component__step');
      expect(stepElements[0]).toHaveClass('stepper-component__step--completed');
    });

    it('marks steps before active step as completed', () => {
      const { container } = render(<Stepper steps={defaultSteps} activeStep={2} />);
      const stepElements = container.querySelectorAll('.stepper-component__step');
      expect(stepElements[0]).toHaveClass('stepper-component__step--completed');
      expect(stepElements[1]).toHaveClass('stepper-component__step--completed');
    });

    it('shows check icon for completed steps', () => {
      const steps = [
        { id: '1', label: 'Step 1', completed: true },
        { id: '2', label: 'Step 2' },
      ];
      render(<Stepper steps={steps} activeStep={1} />);
      const checkIcons = screen.getAllByText('✓');
      expect(checkIcons.length).toBeGreaterThan(0);
    });
  });

  // Error state
  describe('Error State', () => {
    it('marks error steps correctly', () => {
      const steps = [
        { id: '1', label: 'Step 1' },
        { id: '2', label: 'Step 2', error: true },
        { id: '3', label: 'Step 3' },
      ];
      const { container } = render(<Stepper steps={steps} activeStep={1} />);
      const stepElements = container.querySelectorAll('.stepper-component__step');
      expect(stepElements[1]).toHaveClass('stepper-component__step--error');
    });

    it('shows error icon for error steps', () => {
      const steps = [
        { id: '1', label: 'Step 1' },
        { id: '2', label: 'Step 2', error: true },
      ];
      render(<Stepper steps={steps} activeStep={1} />);
      expect(screen.getByText('✕')).toBeInTheDocument();
    });
  });

  // Disabled steps
  describe('Disabled Steps', () => {
    it('marks disabled steps correctly', () => {
      const steps = [
        { id: '1', label: 'Step 1' },
        { id: '2', label: 'Step 2', disabled: true },
        { id: '3', label: 'Step 3' },
      ];
      const { container } = render(<Stepper steps={steps} activeStep={0} />);
      const stepElements = container.querySelectorAll('.stepper-component__step');
      expect(stepElements[1]).toHaveClass('stepper-component__step--disabled');
    });

    it('has aria-disabled on disabled steps', () => {
      const steps = [
        { id: '1', label: 'Step 1' },
        { id: '2', label: 'Step 2', disabled: true },
      ];
      render(<Stepper steps={steps} activeStep={0} />);
      const stepContent = screen.getByText('Step 2').closest('.stepper-component__step-content');
      expect(stepContent).toHaveAttribute('aria-disabled', 'true');
    });
  });

  // Icons
  describe('Icons', () => {
    it('renders custom icons when provided', () => {
      const steps = [
        { id: '1', label: 'Step 1', icon: '👤' },
        { id: '2', label: 'Step 2' },
      ];
      render(<Stepper steps={steps} activeStep={0} />);
      expect(screen.getByText('👤')).toBeInTheDocument();
    });

    it('prioritizes error icon over custom icon', () => {
      const steps = [{ id: '1', label: 'Step 1', icon: '👤', error: true }];
      render(<Stepper steps={steps} activeStep={0} />);
      expect(screen.getByText('✕')).toBeInTheDocument();
      expect(screen.queryByText('👤')).not.toBeInTheDocument();
    });

    it('prioritizes completed icon over custom icon', () => {
      const steps = [{ id: '1', label: 'Step 1', icon: '👤', completed: true }];
      render(<Stepper steps={steps} activeStep={0} />);
      expect(screen.getByText('✓')).toBeInTheDocument();
    });
  });

  // Labels and descriptions
  describe('Labels and Descriptions', () => {
    it('shows labels by default', () => {
      render(<Stepper steps={defaultSteps} activeStep={0} />);
      expect(screen.getByText('Step 1')).toBeInTheDocument();
    });

    it('hides labels when showLabels is false', () => {
      render(<Stepper steps={defaultSteps} activeStep={0} showLabels={false} />);
      // Labels should still be in DOM but might be visually hidden
      // We check that the label container exists
      const { container } = render(
        <Stepper steps={defaultSteps} activeStep={0} showLabels={false} />,
      );
      const labelContainers = container.querySelectorAll('.stepper-component__label-container');
      expect(labelContainers.length).toBe(0);
    });

    it('shows descriptions when showDescriptions is true', () => {
      const steps = [
        { id: '1', label: 'Step 1', description: 'Description 1' },
        { id: '2', label: 'Step 2', description: 'Description 2' },
      ];
      render(<Stepper steps={steps} activeStep={0} showDescriptions />);
      expect(screen.getByText('Description 1')).toBeInTheDocument();
      expect(screen.getByText('Description 2')).toBeInTheDocument();
    });

    it('hides descriptions by default', () => {
      const steps = [{ id: '1', label: 'Step 1', description: 'Description 1' }];
      render(<Stepper steps={steps} activeStep={0} />);
      expect(screen.queryByText('Description 1')).not.toBeInTheDocument();
    });
  });

  // Clickable steps
  describe('Clickable Steps', () => {
    it('applies clickable class when clickable is true and onStepClick is provided', () => {
      const onStepClick = jest.fn();
      const { container } = render(
        <Stepper steps={defaultSteps} activeStep={0} clickable onStepClick={onStepClick} />,
      );
      const steps = container.querySelectorAll('.stepper-component__step');
      steps.forEach((step) => {
        expect(step).toHaveClass('stepper-component__step--clickable');
      });
    });

    it('calls onStepClick when step is clicked', () => {
      const onStepClick = jest.fn();
      render(<Stepper steps={defaultSteps} activeStep={0} clickable onStepClick={onStepClick} />);
      const stepContent = screen.getByText('Step 2').closest('.stepper-component__step-content');
      if (stepContent) {
        fireEvent.click(stepContent);
        expect(onStepClick).toHaveBeenCalledWith('2', 1);
      }
    });

    it('does not call onStepClick for disabled steps', () => {
      const steps = [
        { id: '1', label: 'Step 1' },
        { id: '2', label: 'Step 2', disabled: true },
      ];
      const onStepClick = jest.fn();
      render(<Stepper steps={steps} activeStep={0} clickable onStepClick={onStepClick} />);
      const stepContent = screen.getByText('Step 2').closest('.stepper-component__step-content');
      if (stepContent) {
        fireEvent.click(stepContent);
        expect(onStepClick).not.toHaveBeenCalled();
      }
    });

    it('handles keyboard navigation for clickable steps', () => {
      const onStepClick = jest.fn();
      render(<Stepper steps={defaultSteps} activeStep={0} clickable onStepClick={onStepClick} />);
      const stepContent = screen.getByText('Step 2').closest('.stepper-component__step-content');
      if (stepContent) {
        fireEvent.keyDown(stepContent, { key: 'Enter' });
        expect(onStepClick).toHaveBeenCalledWith('2', 1);
      }
    });
  });

  // Custom colors
  describe('Custom Colors', () => {
    it('applies custom activeColor', () => {
      const { container } = render(
        <Stepper steps={defaultSteps} activeStep={1} activeColor="#8b5cf6" />,
      );
      const drawer = container.querySelector('.stepper-component');
      expect(drawer).toHaveStyle({ '--stepper-custom-active-color': '#8b5cf6' });
    });

    it('applies custom completedColor', () => {
      const { container } = render(
        <Stepper steps={defaultSteps} activeStep={1} completedColor="#10b981" />,
      );
      const drawer = container.querySelector('.stepper-component');
      expect(drawer).toHaveStyle({ '--stepper-custom-completed-color': '#10b981' });
    });

    it('applies custom errorColor', () => {
      const steps = [{ id: '1', label: 'Step 1', error: true }];
      const { container } = render(<Stepper steps={steps} activeStep={0} errorColor="#ef4444" />);
      const drawer = container.querySelector('.stepper-component');
      expect(drawer).toHaveStyle({ '--stepper-custom-error-color': '#ef4444' });
    });
  });

  // Gradients
  describe('Gradients', () => {
    it('applies gradient and adds gradient class', () => {
      const gradient = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
      const { container } = render(
        <Stepper steps={defaultSteps} activeStep={1} gradient={gradient} />,
      );
      const drawer = container.querySelector('.stepper-component');
      expect(drawer).toHaveStyle({ '--stepper-custom-color': gradient });
      expect(container.querySelector('.stepper-component--gradient')).toBeInTheDocument();
    });
  });

  // Style prop precedence
  describe('Style Prop Precedence', () => {
    it('merges user style prop with component styles', () => {
      const { container } = render(
        <Stepper steps={defaultSteps} activeStep={0} style={{ margin: '20px', padding: '10px' }} />,
      );
      const stepper = container.querySelector('.stepper-component');
      const styleAttr = stepper?.getAttribute('style') || '';
      expect(styleAttr).toMatch(/margin:\s*20px/i);
      expect(styleAttr).toMatch(/padding:\s*10px/i);
    });

    it('user style prop takes precedence over CSS custom properties', () => {
      const { container } = render(
        <Stepper
          steps={defaultSteps}
          activeStep={1}
          activeColor="#8b5cf6"
          style={{ '--stepper-custom-active-color': 'purple' } as any}
        />,
      );
      const stepper = container.querySelector('.stepper-component');
      const styleAttr = stepper?.getAttribute('style') || '';
      expect(styleAttr).toMatch(/--stepper-custom-active-color:\s*purple/i);
    });
  });

  // Accessibility
  describe('Accessibility', () => {
    it('has role="navigation"', () => {
      render(<Stepper steps={defaultSteps} activeStep={0} />);
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('has aria-label', () => {
      render(<Stepper steps={defaultSteps} activeStep={0} ariaLabel="Wizard steps" />);
      expect(screen.getByLabelText('Wizard steps')).toBeInTheDocument();
    });

    it('uses ordered list structure', () => {
      const { container } = render(<Stepper steps={defaultSteps} activeStep={0} />);
      expect(container.querySelector('ol')).toBeInTheDocument();
      expect(container.querySelectorAll('li')).toHaveLength(3);
    });
  });

  // Theme integration
  describe('Theme Integration', () => {
    it('renders with theme provider', () => {
      render(
        <ThemeProvider>
          <Stepper steps={defaultSteps} activeStep={0} />
        </ThemeProvider>,
      );
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });
  });
});
