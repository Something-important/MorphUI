// Stepper.tsx
import React, { ReactNode, forwardRef } from 'react';
import { resolveThemeValue, getAriaProps } from '../../../utils';
import './Stepper.css';

export interface StepperStep {
  id: string;
  label: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
  error?: boolean;
  completed?: boolean;
}

export interface StepperProps {
  steps: StepperStep[];
  activeStep?: number | string; // Can be index or step id
  orientation?: 'horizontal' | 'vertical';
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  color?: string;
  gradient?: string;
  activeColor?: string;
  completedColor?: string;
  errorColor?: string;
  textColor?: string;
  showLabels?: boolean;
  showDescriptions?: boolean;
  clickable?: boolean;
  onStepClick?: (stepId: string, index: number) => void;
  className?: string;
  style?: React.CSSProperties;
  ariaLabel?: string;
  id?: string;
}

export const Stepper = forwardRef<HTMLDivElement, StepperProps>(
  (
    {
      steps,
      activeStep,
      orientation = 'horizontal',
      variant = 'primary',
      size = 'md',
      color,
      gradient,
      activeColor,
      completedColor,
      errorColor,
      textColor,
      showLabels = true,
      showDescriptions = false,
      clickable = false,
      onStepClick,
      className = '',
      style,
      ariaLabel = 'Stepper navigation',
      id,
      ...rest
    },
    ref,
  ) => {
    if (!steps || steps.length === 0) return null;

    // Resolve theme values
    const resolvedColor = resolveThemeValue(color);
    const resolvedGradient = resolveThemeValue(gradient);
    const resolvedActiveColor = resolveThemeValue(activeColor);
    const resolvedCompletedColor = resolveThemeValue(completedColor);
    const resolvedErrorColor = resolveThemeValue(errorColor);
    const resolvedTextColor = resolveThemeValue(textColor);

    // Check for gradients
    const isColorGradient =
      resolvedGradient &&
      (resolvedGradient.includes('linear-gradient') ||
        resolvedGradient.includes('radial-gradient') ||
        resolvedGradient.includes('conic-gradient'));

    // Determine active step index
    const activeIndex =
      typeof activeStep === 'number'
        ? activeStep
        : typeof activeStep === 'string'
          ? steps.findIndex((s) => s.id === activeStep)
          : 0;

    // Classes
    const classes = [
      'stepper-component',
      `stepper-component--${orientation}`,
      `stepper-component--${variant}`,
      `stepper-component--${size}`,
      isColorGradient && 'stepper-component--gradient',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Build component style object with CSS custom properties
    const componentStyle: React.CSSProperties & Record<string, string> = {
      ...(resolvedGradient && {
        '--stepper-custom-color': resolvedGradient,
        '--stepper-color': resolvedGradient,
      }),
      ...(resolvedColor &&
        !resolvedGradient && {
          '--stepper-custom-color': resolvedColor,
          '--stepper-color': resolvedColor,
        }),
      ...(resolvedActiveColor && {
        '--stepper-custom-active-color': resolvedActiveColor,
        '--stepper-active-color': resolvedActiveColor,
      }),
      ...(resolvedCompletedColor && {
        '--stepper-custom-completed-color': resolvedCompletedColor,
        '--stepper-completed-color': resolvedCompletedColor,
      }),
      ...(resolvedErrorColor && {
        '--stepper-custom-error-color': resolvedErrorColor,
        '--stepper-error-color': resolvedErrorColor,
      }),
      ...(resolvedTextColor && {
        '--stepper-custom-text-color': resolvedTextColor,
        '--stepper-text-color': resolvedTextColor,
      }),
    };

    // Explicitly merge with user's style prop (user style takes precedence)
    const mergedStyle = style ? { ...componentStyle, ...style } : componentStyle;

    // ARIA attributes
    const ariaProps = getAriaProps({
      label: ariaLabel,
    });

    // Handle step click
    const handleStepClick = (step: StepperStep, index: number) => {
      if (clickable && onStepClick && !step.disabled) {
        onStepClick(step.id, index);
      }
    };

    return (
      <div
        ref={ref}
        id={id}
        className={classes}
        style={mergedStyle}
        role="navigation"
        aria-label={ariaLabel}
        {...ariaProps}
        {...rest}
      >
        <ol className="stepper-component__list">
          {steps.map((step, index) => {
            const isActive = index === activeIndex;
            const isCompleted = step.completed || index < activeIndex;
            const isError = step.error;
            const isDisabled = step.disabled;
            const isClickable = clickable && !isDisabled && onStepClick;

            const stepClasses = [
              'stepper-component__step',
              isActive && 'stepper-component__step--active',
              isCompleted && 'stepper-component__step--completed',
              isError && 'stepper-component__step--error',
              isDisabled && 'stepper-component__step--disabled',
              isClickable && 'stepper-component__step--clickable',
            ]
              .filter(Boolean)
              .join(' ');

            return (
              <li key={step.id} className={stepClasses}>
                {/* Connector line (before step) */}
                {index > 0 && (
                  <div
                    className={`stepper-component__connector ${
                      isCompleted ? 'stepper-component__connector--completed' : ''
                    }`}
                    aria-hidden="true"
                  />
                )}

                {/* Step content */}
                <div
                  className="stepper-component__step-content"
                  onClick={() => handleStepClick(step, index)}
                  role={isClickable ? 'button' : undefined}
                  tabIndex={isClickable ? 0 : undefined}
                  aria-current={isActive ? 'step' : undefined}
                  aria-disabled={isDisabled}
                  onKeyDown={(e) => {
                    if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
                      e.preventDefault();
                      handleStepClick(step, index);
                    }
                  }}
                >
                  {/* Step indicator (circle/number/icon) */}
                  <div className="stepper-component__indicator">
                    {isError ? (
                      <span className="stepper-component__error-icon">✕</span>
                    ) : isCompleted ? (
                      <span className="stepper-component__check-icon">✓</span>
                    ) : step.icon ? (
                      <span className="stepper-component__icon">{step.icon}</span>
                    ) : (
                      <span className="stepper-component__number">{index + 1}</span>
                    )}
                  </div>

                  {/* Step label and description */}
                  {(showLabels || showDescriptions) && (
                    <div className="stepper-component__label-container">
                      {showLabels && step.label && (
                        <div className="stepper-component__label">{step.label}</div>
                      )}
                      {showDescriptions && step.description && (
                        <div className="stepper-component__description">{step.description}</div>
                      )}
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    );
  },
);

Stepper.displayName = 'Stepper';
