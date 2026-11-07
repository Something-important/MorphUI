import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Accordion, Button } from '../../index';

export default {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A highly customizable accordion component with support for variants, sizes, colors, gradients, animations, and advanced theming. Perfect for collapsible content sections, FAQs, and information organization.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'ghost', 'outline'],
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    color: {
      control: { type: 'color' },
    },
    gradient: {
      control: { type: 'select' },
      options: ['none', 'to-r', 'to-l', 'to-t', 'to-b', 'to-tr', 'to-tl', 'to-br', 'to-bl'],
    },
    textColor: {
      control: { type: 'color' },
    },
    borderColor: {
      control: { type: 'color' },
    },
    backgroundColor: {
      control: { type: 'color' },
    },
    headerBackgroundColor: {
      control: { type: 'color' },
    },
    contentBackgroundColor: {
      control: { type: 'color' },
    },
    titleTextColor: {
      control: { type: 'color' },
    },
    contentTextColor: {
      control: { type: 'color' },
    },
    secondaryTextColor: {
      control: { type: 'color' },
    },
    mutedTextColor: {
      control: { type: 'color' },
    },
    shadow: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
    animation: {
      control: { type: 'boolean' },
    },
    iconPosition: {
      control: { type: 'select' },
      options: ['left', 'right'],
    },
    animationDuration: {
      control: { type: 'range', min: 100, max: 1000, step: 50 },
    },
  },
} as Meta<typeof Accordion>;

type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  args: {
    title: 'Default Accordion',
    children: (
      <div style={{ padding: '16px' }}>
        <p>
          This is the default accordion content. It demonstrates the basic functionality and
          styling.
        </p>
      </div>
    ),
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
      <Accordion title="Primary" variant="primary">
        <div style={{ padding: '16px' }}>
          <p>Primary variant with enhanced styling and visual prominence.</p>
        </div>
      </Accordion>

      <Accordion title="Secondary" variant="secondary">
        <div style={{ padding: '16px' }}>
          <p>Secondary variant with subtle styling.</p>
        </div>
      </Accordion>

      <Accordion title="Success" variant="success">
        <div style={{ padding: '16px' }}>
          <p>Success variant with green accent colors.</p>
        </div>
      </Accordion>

      <Accordion title="Warning" variant="warning">
        <div style={{ padding: '16px' }}>
          <p>Warning variant with yellow accent colors.</p>
        </div>
      </Accordion>

      <Accordion title="Danger" variant="danger">
        <div style={{ padding: '16px' }}>
          <p>Danger variant with red accent colors.</p>
        </div>
      </Accordion>

      <Accordion title="Info" variant="info">
        <div style={{ padding: '16px' }}>
          <p>Info variant with blue accent colors.</p>
        </div>
      </Accordion>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
      <Accordion title="Extra Small" size="xs">
        <div style={{ padding: '8px' }}>
          <p>Extra small accordion with minimal padding and compact styling.</p>
        </div>
      </Accordion>

      <Accordion title="Small" size="sm">
        <div style={{ padding: '12px' }}>
          <p>Small accordion with reduced padding and compact styling.</p>
        </div>
      </Accordion>

      <Accordion title="Medium" size="md">
        <div style={{ padding: '16px' }}>
          <p>Medium accordion with standard padding and balanced styling.</p>
        </div>
      </Accordion>

      <Accordion title="Large" size="lg">
        <div style={{ padding: '20px' }}>
          <p>Large accordion with increased padding and spacious styling.</p>
        </div>
      </Accordion>

      <Accordion title="Extra Large" size="xl">
        <div style={{ padding: '24px' }}>
          <p>Extra large accordion with maximum padding and generous styling.</p>
        </div>
      </Accordion>
    </div>
  ),
};

export const Shadows: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
      <Accordion title="No Shadow" shadow="none">
        <div style={{ padding: '16px' }}>
          <p>Accordion without any shadow for a flat appearance.</p>
        </div>
      </Accordion>

      <Accordion title="Small Shadow" shadow="sm">
        <div style={{ padding: '16px' }}>
          <p>Accordion with a subtle small shadow for gentle depth.</p>
        </div>
      </Accordion>

      <Accordion title="Medium Shadow" shadow="md">
        <div style={{ padding: '16px' }}>
          <p>Accordion with a medium shadow for balanced depth.</p>
        </div>
      </Accordion>

      <Accordion title="Large Shadow" shadow="lg">
        <div style={{ padding: '16px' }}>
          <p>Accordion with a large shadow for prominent depth.</p>
        </div>
      </Accordion>

      <Accordion title="Extra Large Shadow" shadow="xl">
        <div style={{ padding: '16px' }}>
          <p>Accordion with an extra large shadow for dramatic depth.</p>
        </div>
      </Accordion>

      <Accordion title="2X Large Shadow" shadow="2xl">
        <div style={{ padding: '16px' }}>
          <p>Accordion with a 2X large shadow for maximum depth.</p>
        </div>
      </Accordion>
    </div>
  ),
};

export const IconPositions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
      <Accordion title="Icon on the Left" iconPosition="left">
        <div style={{ padding: '16px' }}>
          <p>Accordion with the expand/collapse icon positioned on the left side.</p>
        </div>
      </Accordion>

      <Accordion title="Icon on the Right" iconPosition="right">
        <div style={{ padding: '16px' }}>
          <p>Accordion with the expand/collapse icon positioned on the right side.</p>
        </div>
      </Accordion>
    </div>
  ),
};

export const RichContent: Story = {
  args: {
    title: 'Rich Content Accordion',
    children: (
      <div style={{ padding: '20px' }}>
        <h3 style={{ marginBottom: '12px', fontSize: '18px', fontWeight: '600' }}>
          Welcome to Rich Content
        </h3>
        <p style={{ marginBottom: '16px', lineHeight: '1.6' }}>
          This accordion demonstrates how to include rich content with multiple elements, including
          headings, paragraphs, lists, and interactive components.
        </p>

        <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
          <li>Feature 1: Comprehensive theming support</li>
          <li>Feature 2: Multiple size variants</li>
          <li>Feature 3: Customizable animations</li>
          <li>Feature 4: Icon position control</li>
        </ul>

        <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
          <Button size="sm" variant="primary">
            Learn More
          </Button>
          <Button size="sm" variant="outline">
            Documentation
          </Button>
        </div>
      </div>
    ),
  },
};

export const GradientShowcase: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>
          🌈 Background Gradients
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Accordion
            title="🎨 Linear Gradient Background"
            headerBackgroundColor="linear-gradient(90deg, #f43f5e 0%, #3b82f6 100%)"
            contentBackgroundColor="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          >
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <h4 style={{ marginBottom: '12px', color: '#fff' }}>Beautiful Linear Gradients</h4>
              <p style={{ color: '#fff', lineHeight: '1.6' }}>
                This accordion uses linear gradients for both header and content backgrounds,
                creating a stunning visual effect!
              </p>
            </div>
          </Accordion>

          <Accordion
            title="🌊 Radial Gradient Background"
            headerBackgroundColor="radial-gradient(circle at 30% 20%, #ff6b6b, #4ecdc4, #45b7d1)"
            contentBackgroundColor="radial-gradient(circle at 70% 80%, #96ceb4, #feca57, #ff9ff3)"
          >
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <h4 style={{ marginBottom: '12px', color: '#fff' }}>Radial Gradient Magic</h4>
              <p style={{ color: '#fff', lineHeight: '1.6' }}>
                Radial gradients create beautiful circular color transitions that draw the eye
                naturally!
              </p>
            </div>
          </Accordion>

          <Accordion
            title="🌀 Conic Gradient Background"
            headerBackgroundColor="conic-gradient(from 45deg, #ff6b6b, #4ecdc4, #45b7d1, #ff6b6b)"
            contentBackgroundColor="conic-gradient(from 180deg, #667eea, #764ba2, #f093fb, #667eea)"
          >
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <h4 style={{ marginBottom: '12px', color: '#fff' }}>Conic Gradient Wonder</h4>
              <p style={{ color: '#fff', lineHeight: '1.6' }}>
                Conic gradients create stunning rainbow-like effects that rotate around a center
                point!
              </p>
            </div>
          </Accordion>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>
          ✨ Text Gradients
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Accordion
            title="🎭 Gradient Text Title"
            titleTextColor="linear-gradient(45deg, #ff0000, #00ff00, #0000ff)"
            descriptionTextColor="linear-gradient(90deg, #8b5cf6, #ec4899)"
          >
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <h4
                style={{
                  marginBottom: '12px',
                  background: 'linear-gradient(45deg, #ff0000, #00ff00, #0000ff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Rainbow Text Magic
              </h4>
              <p
                style={{
                  background: 'linear-gradient(90deg, #8b5cf6, #ec4899)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  lineHeight: '1.6',
                }}
              >
                Text gradients create eye-catching effects that make content pop! Perfect for
                headings and special text.
              </p>
            </div>
          </Accordion>

          <Accordion
            title="🔥 Fire Gradient Text"
            titleTextColor="linear-gradient(45deg, #ff6b35, #f7931e, #ffd23f)"
            descriptionTextColor="linear-gradient(135deg, #ff416c, #ff4b2b)"
          >
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <h4
                style={{
                  marginBottom: '12px',
                  background: 'linear-gradient(45deg, #ff6b35, #f7931e, #ffd23f)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Fire & Energy
              </h4>
              <p
                style={{
                  background: 'linear-gradient(135deg, #ff416c, #ff4b2b)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  lineHeight: '1.6',
                }}
              >
                Warm gradient colors create energy and excitement, perfect for call-to-action
                content!
              </p>
            </div>
          </Accordion>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>
          🎨 Combined Effects
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Accordion
            title="🌟 Ultimate Gradient Experience"
            headerBackgroundColor="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            contentBackgroundColor="linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4)"
            titleTextColor="linear-gradient(90deg, #ffffff, #f0f0f0)"
            descriptionTextColor="linear-gradient(45deg, #ffffff, #e0e0e0)"
            shadow="xl"
          >
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <h4
                style={{
                  marginBottom: '12px',
                  background: 'linear-gradient(90deg, #ffffff, #f0f0f0)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Complete Gradient Package
              </h4>
              <p
                style={{
                  background: 'linear-gradient(45deg, #ffffff, #e0e0e0)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  lineHeight: '1.6',
                }}
              >
                When you combine background gradients with text gradients and shadows, you get truly
                spectacular results!
              </p>
            </div>
          </Accordion>

          <Accordion
            title="🌙 Dark Theme Gradients"
            headerBackgroundColor="linear-gradient(135deg, #1e293b 0%, #475569 100%)"
            contentBackgroundColor="linear-gradient(45deg, #0f172a, #1e293b, #334155)"
            titleTextColor="linear-gradient(90deg, #f1f5f9, #cbd5e1)"
            descriptionTextColor="linear-gradient(45deg, #e2e8f0, #94a3b8)"
            shadow="lg"
          >
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <h4
                style={{
                  marginBottom: '12px',
                  background: 'linear-gradient(90deg, #f1f5f9, #cbd5e1)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Dark & Mysterious
              </h4>
              <p
                style={{
                  background: 'linear-gradient(45deg, #e2e8f0, #94a3b8)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  lineHeight: '1.6',
                }}
              >
                Dark gradients create sophisticated, modern looks perfect for professional
                applications!
              </p>
            </div>
          </Accordion>
        </div>
      </div>

      <div
        style={{
          padding: '20px',
          background: '#f8fafc',
          borderRadius: '8px',
          border: '1px solid #e2e8f0',
        }}
      >
        <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600', color: '#334155' }}>
          🚀 How to Use Gradients
        </h4>
        <div style={{ fontSize: '14px', color: '#475569', lineHeight: '1.5' }}>
          <p style={{ margin: '0 0 8px 0' }}>
            <strong>Background Gradients:</strong> Use <code>headerBackgroundColor</code> and{' '}
            <code>contentBackgroundColor</code> props with CSS gradient syntax.
          </p>
          <p style={{ margin: '0 0 8px 0' }}>
            <strong>Text Gradients:</strong> Use <code>titleTextColor</code> and{' '}
            <code>descriptionTextColor</code> props with gradient values.
          </p>
          <p style={{ margin: '0 0 8px 0' }}>
            <strong>CSS Syntax:</strong>{' '}
            <code>linear-gradient(direction, color1, color2, ...)</code>
          </p>
          <p style={{ margin: '0 0 0 0' }}>
            <strong>Precedence:</strong> Gradients override solid colors, which override theme
            defaults.
          </p>
        </div>
      </div>
    </div>
  ),
};
