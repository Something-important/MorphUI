// Stepper.stories.tsx
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Stepper } from './Stepper';
import { Button } from '../Button';
import { ThemeProvider, themes, type ThemeName } from '../../theme';

export default {
  title: 'Components/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A step-by-step navigation component that guides users through a multi-step process. Perfect for forms, wizards, and workflows. Supports horizontal and vertical orientations, custom icons, error states, and clickable steps.',
      },
    },
  },
  argTypes: {
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'ghost', 'outline'],
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Stepper>;

type Story = StoryObj<typeof Stepper>;

const defaultSteps = [
  { id: '1', label: 'Account', description: 'Create your account' },
  { id: '2', label: 'Profile', description: 'Set up your profile' },
  { id: '3', label: 'Preferences', description: 'Configure preferences' },
  { id: '4', label: 'Review', description: 'Review and confirm' },
];

// Default
export const Default: Story = {
  args: {
    steps: defaultSteps,
    activeStep: 1,
  },
};

// Orientations
export const Orientations: Story = {
  render: () => {
    const steps = [
      { id: '1', label: 'Step 1' },
      { id: '2', label: 'Step 2' },
      { id: '3', label: 'Step 3' },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        <div>
          <h3 style={{ marginBottom: '1rem' }}>Horizontal</h3>
          <Stepper steps={steps} activeStep={1} orientation="horizontal" />
        </div>
        <div>
          <h3 style={{ marginBottom: '1rem' }}>Vertical</h3>
          <Stepper steps={steps} activeStep={1} orientation="vertical" />
        </div>
      </div>
    );
  },
};

// Sizes
export const Sizes: Story = {
  render: () => {
    const steps = [
      { id: '1', label: 'Small' },
      { id: '2', label: 'Medium' },
      { id: '3', label: 'Large' },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h3 style={{ marginBottom: '1rem' }}>Extra Small (xs)</h3>
          <Stepper steps={steps} activeStep={1} size="xs" />
        </div>
        <div>
          <h3 style={{ marginBottom: '1rem' }}>Small (sm)</h3>
          <Stepper steps={steps} activeStep={1} size="sm" />
        </div>
        <div>
          <h3 style={{ marginBottom: '1rem' }}>Medium (md)</h3>
          <Stepper steps={steps} activeStep={1} size="md" />
        </div>
        <div>
          <h3 style={{ marginBottom: '1rem' }}>Large (lg)</h3>
          <Stepper steps={steps} activeStep={1} size="lg" />
        </div>
      </div>
    );
  },
};

// With descriptions
export const WithDescriptions: Story = {
  args: {
    steps: defaultSteps,
    activeStep: 1,
    showDescriptions: true,
  },
};

// With icons
export const WithIcons: Story = {
  args: {
    steps: [
      { id: '1', label: 'Account', icon: '👤' },
      { id: '2', label: 'Profile', icon: '📝' },
      { id: '3', label: 'Preferences', icon: '⚙️' },
      { id: '4', label: 'Review', icon: '✓' },
    ],
    activeStep: 1,
  },
};

// Completed steps
export const CompletedSteps: Story = {
  args: {
    steps: [
      { id: '1', label: 'Step 1', completed: true },
      { id: '2', label: 'Step 2', completed: true },
      { id: '3', label: 'Step 3' },
      { id: '4', label: 'Step 4' },
    ],
    activeStep: 2,
  },
};

// Error state
export const ErrorState: Story = {
  args: {
    steps: [
      { id: '1', label: 'Step 1', completed: true },
      { id: '2', label: 'Step 2', error: true },
      { id: '3', label: 'Step 3' },
    ],
    activeStep: 1,
  },
};

// Clickable steps
export const ClickableSteps: Story = {
  render: () => {
    const [activeStep, setActiveStep] = useState(1);
    const steps = [
      { id: '1', label: 'Step 1' },
      { id: '2', label: 'Step 2' },
      { id: '3', label: 'Step 3' },
      { id: '4', label: 'Step 4' },
    ];

    return (
      <div>
        <p style={{ marginBottom: '1rem' }}>
          Active step: {activeStep + 1} (Click any step to navigate)
        </p>
        <Stepper
          steps={steps}
          activeStep={activeStep}
          clickable
          onStepClick={(stepId, index) => setActiveStep(index)}
        />
      </div>
    );
  },
};

// Custom colors
export const CustomColors: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h3 style={{ marginBottom: '1rem' }}>Custom Active Color</h3>
          <Stepper steps={defaultSteps} activeStep={1} activeColor="#8b5cf6" />
        </div>
        <div>
          <h3 style={{ marginBottom: '1rem' }}>Custom Completed Color</h3>
          <Stepper
            steps={[
              { id: '1', label: 'Step 1', completed: true },
              { id: '2', label: 'Step 2' },
              { id: '3', label: 'Step 3' },
            ]}
            activeStep={1}
            completedColor="#10b981"
          />
        </div>
        <div>
          <h3 style={{ marginBottom: '1rem' }}>Custom Error Color</h3>
          <Stepper
            steps={[
              { id: '1', label: 'Step 1', completed: true },
              { id: '2', label: 'Step 2', error: true },
              { id: '3', label: 'Step 3' },
            ]}
            activeStep={1}
            errorColor="#f59e0b"
          />
        </div>
      </div>
    );
  },
};

// Gradients
export const Gradients: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h3 style={{ marginBottom: '1rem' }}>Gradient Active Step</h3>
          <Stepper
            steps={defaultSteps}
            activeStep={1}
            gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          />
        </div>
        <div>
          <h3 style={{ marginBottom: '1rem' }}>Gradient with Completed</h3>
          <Stepper
            steps={[
              { id: '1', label: 'Step 1', completed: true },
              { id: '2', label: 'Step 2' },
              { id: '3', label: 'Step 3' },
            ]}
            activeStep={1}
            gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
            completedColor="#10b981"
          />
        </div>
      </div>
    );
  },
};

// Theme switching
export const ThemeSwitching: Story = {
  render: () => {
    const [theme, setTheme] = useState<ThemeName>('light');
    const [activeStep, setActiveStep] = useState(1);

    return (
      <ThemeProvider theme={themes[theme]}>
        <div style={{ padding: '20px' }}>
          <div style={{ marginBottom: '30px' }}>
            <h2 style={{ marginBottom: '15px' }}>Theme Switching Demo</h2>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value as ThemeName)}
              style={{
                padding: '10px 15px',
                fontSize: '16px',
                borderRadius: '6px',
                border: '1px solid #d1d5db',
                cursor: 'pointer',
              }}
            >
              {Object.keys(themes).map((themeName) => (
                <option key={themeName} value={themeName}>
                  {themeName.charAt(0).toUpperCase() + themeName.slice(1)} Theme
                </option>
              ))}
            </select>
            <p style={{ marginTop: '10px', color: '#6b7280' }}>
              Current theme: <strong>{theme}</strong>
            </p>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <Button
              onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
              disabled={activeStep === 0}
            >
              Previous
            </Button>
            <Button
              onClick={() => setActiveStep(Math.min(defaultSteps.length - 1, activeStep + 1))}
              disabled={activeStep === defaultSteps.length - 1}
              style={{ marginLeft: '10px' }}
            >
              Next
            </Button>
          </div>

          <Stepper steps={defaultSteps} activeStep={activeStep} />
        </div>
      </ThemeProvider>
    );
  },
};

// Interactive wizard
export const InteractiveWizard: Story = {
  render: () => {
    const [activeStep, setActiveStep] = useState(0);
    const steps = [
      { id: '1', label: 'Account', description: 'Create your account' },
      { id: '2', label: 'Profile', description: 'Set up your profile' },
      { id: '3', label: 'Preferences', description: 'Configure preferences' },
      { id: '4', label: 'Review', description: 'Review and confirm' },
    ];

    const completedSteps = steps.slice(0, activeStep).map((s) => ({
      ...s,
      completed: true,
    }));
    const currentStep = steps[activeStep];
    const remainingSteps = steps.slice(activeStep + 1);

    const displaySteps = [...completedSteps, currentStep, ...remainingSteps].map((step, index) => ({
      ...step,
      id: step.id,
    }));

    return (
      <div>
        <Stepper
          steps={displaySteps}
          activeStep={activeStep}
          showDescriptions
          clickable
          onStepClick={(stepId, index) => {
            // Only allow clicking completed steps or current step
            const step = displaySteps[index];
            if (step.completed || index === activeStep) {
              setActiveStep(index);
            }
          }}
        />
        <div
          style={{
            marginTop: '2rem',
            padding: '1.5rem',
            background: '#f9fafb',
            borderRadius: '8px',
          }}
        >
          <h3>{currentStep.label}</h3>
          <p>{currentStep.description}</p>
          <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
            <Button
              onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
              disabled={activeStep === 0}
              variant="outline"
            >
              Previous
            </Button>
            <Button
              onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
              disabled={activeStep === steps.length - 1}
            >
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </div>
        </div>
      </div>
    );
  },
};
