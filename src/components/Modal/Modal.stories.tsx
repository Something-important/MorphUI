// Modal.stories.tsx
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import { Button } from '../Button/Button';
import { ThemeProvider } from '../theme/ThemeProvider';

export default {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A highly customizable modal component with support for variants, sizes, colors, gradients, animations, positioning, and advanced theming.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'info', 'danger', 'ghost', 'outline'],
      description: 'Visual variant of the modal',
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'full'],
      description: 'Size of the modal',
    },
    backdrop: {
      control: { type: 'select' },
      options: ['dark', 'light', 'blur', 'none'],
      description: 'Backdrop style',
    },
    position: {
      control: { type: 'select' },
      options: ['center', 'top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left', 'bottom-right'],
      description: 'Position of the modal',
    },
    animation: {
      control: { type: 'select' },
      options: ['fade', 'slide', 'scale', 'slide-up', 'slide-down', 'slide-left', 'slide-right'],
      description: 'Animation type',
    },
    shadow: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg', 'xl'],
      description: 'Shadow size',
    },
    fullscreen: { 
      control: { type: 'boolean' },
      description: 'Make modal fullscreen',
    },
    draggable: { 
      control: { type: 'boolean' },
      description: 'Allow modal to be dragged',
    },
    resizable: { 
      control: { type: 'boolean' },
      description: 'Allow modal to be resized',
    },
    closeOnEsc: { 
      control: { type: 'boolean' },
      description: 'Close modal on Escape key',
    },
    closeOnOverlayClick: { 
      control: { type: 'boolean' },
      description: 'Close modal on backdrop click',
    },
    closeOnFocusLoss: { 
      control: { type: 'boolean' },
      description: 'Close modal on focus loss',
    },
    showCloseButton: { 
      control: { type: 'boolean' },
      description: 'Show close button',
    },
    glassmorphism: { 
      control: { type: 'boolean' },
      description: 'Apply glassmorphism effect',
    },
    maxWidth: { 
      control: { type: 'text' },
      description: 'Maximum width of the modal',
    },
    maxHeight: { 
      control: { type: 'text' },
      description: 'Maximum height of the modal',
    },
    minWidth: { 
      control: { type: 'text' },
      description: 'Minimum width of the modal',
    },
    minHeight: { 
      control: { type: 'text' },
      description: 'Minimum height of the modal',
    },
    textColor: {
      control: { type: 'text' },
      description: 'Custom text color for the modal content',
    },
    zIndex: { 
      control: { type: 'number' },
      description: 'Z-index of the modal',
    },
  },
  decorators: [
    (Story: any) => (
      <div style={{ padding: '20px', maxWidth: '1200px' }}>
        <Story />
      </div>
    ),
  ],
};

// Default story
export const Default: StoryObj<typeof Modal> = {
  args: {
    isOpen: true,
    onClose: () => {},
    title: 'Welcome to MorphUI',
    description: 'This is a modern, customizable modal component.',
    children: (
      <div>
        <p>This modal demonstrates the basic functionality with a title, description, and content area.</p>
        <p>You can customize colors, sizes, animations, and more!</p>
      </div>
    ),
  },
  render: (args: any) => {
    const [isOpen, setIsOpen] = useState(args.isOpen);
    return (
      <div>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      </div>
    );
  },
};

// Variants
export const Variants: StoryObj<typeof Modal> = {
  render: () => {
    const [openVariant, setOpenVariant] = useState<string | null>(null);
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['primary', 'secondary', 'success', 'warning', 'info', 'danger', 'ghost', 'outline'].map((variant) => (
            <Button
              key={variant}
              variant={variant as any}
              onClick={() => setOpenVariant(variant)}
            >
              {variant.charAt(0).toUpperCase() + variant.slice(1)} Modal
            </Button>
          ))}
        </div>
        
        {openVariant && (
          <Modal
            isOpen={true}
            onClose={() => setOpenVariant(null)}
            variant={openVariant as any}
            title={`${openVariant.charAt(0).toUpperCase() + openVariant.slice(1)} Modal`}
            description={`This is a ${openVariant} variant modal`}
          >
            <div>
              <p>This modal uses the <strong>{openVariant}</strong> variant.</p>
              <p>Notice how the colors and styling adapt to the selected variant.</p>
            </div>
          </Modal>
        )}
      </div>
    );
  },
};

// Sizes
export const Sizes: StoryObj<typeof Modal> = {
  render: () => {
    const [openSize, setOpenSize] = useState<string | null>(null);
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['xs', 'sm', 'md', 'lg', 'xl', 'full'].map((size) => (
            <Button
              key={size}
              onClick={() => setOpenSize(size)}
            >
              {size.toUpperCase()} Size
            </Button>
          ))}
        </div>
        
        {openSize && (
          <Modal
            isOpen={true}
            onClose={() => setOpenSize(null)}
            size={openSize as any}
            title={`${openSize.toUpperCase()} Size Modal`}
            description={`This modal uses the ${openSize} size`}
          >
            <div>
              <p>This modal is sized as <strong>{openSize}</strong>.</p>
              <p>Try different sizes to see how the modal dimensions change.</p>
            </div>
          </Modal>
        )}
      </div>
    );
  },
};

// Positions
export const Positions: StoryObj<typeof Modal> = {
  render: () => {
    const [openPosition, setOpenPosition] = useState<string | null>(null);
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['center', 'top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left', 'bottom-right'].map((position) => (
            <Button
              key={position}
              onClick={() => setOpenPosition(position)}
            >
              {position.charAt(0).toUpperCase() + position.slice(1)}
            </Button>
          ))}
        </div>
        
        <div style={{ 
          padding: '20px', 
          background: '#f8fafc', 
          border: '2px dashed #cbd5e1', 
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <h4 style={{ margin: '0 0 16px 0', color: '#475569' }}>🎯 Position Testing Guide</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', maxWidth: '400px', margin: '0 auto' }}>
            <div style={{ padding: '8px', background: '#e2e8f0', borderRadius: '4px', fontSize: '12px' }}>Top-Left</div>
            <div style={{ padding: '8px', background: '#e2e8f0', borderRadius: '4px', fontSize: '12px' }}>Top</div>
            <div style={{ padding: '8px', background: '#e2e8f0', borderRadius: '4px', fontSize: '12px' }}>Top-Right</div>
            <div style={{ padding: '8px', background: '#e2e8f0', borderRadius: '4px', fontSize: '12px' }}>Left</div>
            <div style={{ padding: '8px', background: '#3b82f6', borderRadius: '4px', fontSize: '12px', color: 'white' }}>Center</div>
            <div style={{ padding: '8px', background: '#e2e8f0', borderRadius: '4px', fontSize: '12px' }}>Right</div>
            <div style={{ padding: '8px', background: '#e2e8f0', borderRadius: '4px', fontSize: '12px' }}>Bottom-Left</div>
            <div style={{ padding: '8px', background: '#e2e8f0', borderRadius: '4px', fontSize: '12px' }}>Bottom</div>
            <div style={{ padding: '8px', background: '#e2e8f0', borderRadius: '4px', fontSize: '12px' }}>Bottom-Right</div>
          </div>
          <p style={{ margin: '16px 0 0 0', fontSize: '14px', color: '#64748b' }}>
            Click a position button above to test where the modal appears. The modal should appear at the corresponding location.
          </p>
        </div>
        
        {openPosition && (
          <Modal
            isOpen={true}
            onClose={() => setOpenPosition(null)}
            position={openPosition as any}
            title={`${openPosition.charAt(0).toUpperCase() + openPosition.slice(1)} Position`}
            description={`This modal is positioned at ${openPosition}. Close this modal and try other positions!`}
            size="sm"
          >
            <div>
              <p>This modal is positioned at <strong>{openPosition}</strong>.</p>
              <p>Notice how the modal appears in different screen locations.</p>
              <p><strong>Expected behavior:</strong></p>
              <ul>
                <li><strong>Center:</strong> Modal appears in the center (default)</li>
                <li><strong>Top:</strong> Modal appears at the top center</li>
                <li><strong>Bottom:</strong> Modal appears at the bottom center</li>
                <li><strong>Left:</strong> Modal appears at the left center</li>
                <li><strong>Right:</strong> Modal appears at the right center</li>
                <li><strong>Top-Left:</strong> Modal appears at the top-left corner</li>
                <li><strong>Top-Right:</strong> Modal appears at the top-right corner</li>
                <li><strong>Bottom-Left:</strong> Modal appears at the bottom-left corner</li>
                <li><strong>Bottom-Right:</strong> Modal appears at the bottom-right corner</li>
              </ul>
            </div>
          </Modal>
        )}
      </div>
    );
  },
};



export const Effects: StoryObj<typeof Modal> = {
  render: () => {
    const [openModals, setOpenModals] = useState<Record<string, boolean>>({});
    
    const openModal = (key: string) => setOpenModals(prev => ({ ...prev, [key]: true }));
    const closeModal = (key: string) => setOpenModals(prev => ({ ...prev, [key]: false }));
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Animations */}
        <div>
          <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>🎬 Animations</h3>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>
            Different animation effects for modal entrance and exit:
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {['fade', 'slide', 'scale', 'slide-up', 'slide-down', 'slide-left', 'slide-right'].map((animation) => (
              <Button
                key={animation}
                variant="outline"
                onClick={() => openModal(`animation-${animation}`)}
              >
                {animation.charAt(0).toUpperCase() + animation.slice(1)}
              </Button>
            ))}
          </div>
          
          {['fade', 'slide', 'scale', 'slide-up', 'slide-down', 'slide-left', 'slide-right'].map((animation) => (
            <Modal
              key={animation}
              isOpen={openModals[`animation-${animation}`] || false}
              onClose={() => closeModal(`animation-${animation}`)}
              animation={animation as any}
              title={`${animation.charAt(0).toUpperCase() + animation.slice(1)} Animation`}
              description={`Modal with ${animation} animation effect`}
            >
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <h4 style={{ marginBottom: '12px', color: '#333' }}>✨ {animation.charAt(0).toUpperCase() + animation.slice(1)} Effect</h4>
                <p style={{ color: '#666' }}>
                  This modal uses the <strong>{animation}</strong> animation. 
                  Notice how it enters and exits with a smooth transition!
                </p>
              </div>
            </Modal>
          ))}
        </div>

        {/* Backdrops */}
        <div>
          <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>🌫️ Backdrops</h3>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>
            Different backdrop styles for the modal overlay:
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {['dark', 'light', 'blur', 'none'].map((backdrop) => (
              <Button
                key={backdrop}
                variant="outline"
                onClick={() => openModal(`backdrop-${backdrop}`)}
              >
                {backdrop.charAt(0).toUpperCase() + backdrop.slice(1)} Backdrop
              </Button>
            ))}
          </div>
          
          {['dark', 'light', 'blur', 'none'].map((backdrop) => (
            <Modal
              key={backdrop}
              isOpen={openModals[`backdrop-${backdrop}`] || false}
              onClose={() => closeModal(`backdrop-${backdrop}`)}
              backdrop={backdrop as any}
              title={`${backdrop.charAt(0).toUpperCase() + backdrop.slice(1)} Backdrop`}
              description={`Modal with ${backdrop} backdrop effect`}
            >
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <h4 style={{ marginBottom: '12px', color: '#333' }}>🌫️ {backdrop.charAt(0).toUpperCase() + backdrop.slice(1)} Backdrop</h4>
                <p style={{ color: '#666' }}>
                  This modal uses a <strong>{backdrop}</strong> backdrop. 
                  {backdrop === 'blur' && ' Notice the blur effect behind the modal!'}
                  {backdrop === 'none' && ' Notice there\'s no backdrop overlay!'}
                </p>
              </div>
            </Modal>
          ))}
        </div>

        {/* Shadows */}
        <div>
          <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>✨ Shadows</h3>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>
            Different shadow intensities for the modal:
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {['none', 'sm', 'md', 'lg', 'xl'].map((shadow) => (
              <Button
                key={shadow}
                variant="outline"
                onClick={() => openModal(`shadow-${shadow}`)}
              >
                {shadow === 'none' ? 'No Shadow' : `${shadow.toUpperCase()} Shadow`}
              </Button>
            ))}
          </div>
          
          {['none', 'sm', 'md', 'lg', 'xl'].map((shadow) => (
            <Modal
              key={shadow}
              isOpen={openModals[`shadow-${shadow}`] || false}
              onClose={() => closeModal(`shadow-${shadow}`)}
              shadow={shadow as any}
              title={`${shadow === 'none' ? 'No Shadow' : shadow.toUpperCase() + ' Shadow'}`}
              description={`Modal with ${shadow} shadow effect`}
            >
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <h4 style={{ marginBottom: '12px', color: '#333' }}>✨ {shadow === 'none' ? 'No Shadow' : shadow.toUpperCase() + ' Shadow'}</h4>
                <p style={{ color: '#666' }}>
                  This modal uses <strong>{shadow === 'none' ? 'no shadow' : shadow + ' shadow'}</strong>. 
                  {shadow !== 'none' && ' Notice the depth and elevation effect!'}
                </p>
              </div>
            </Modal>
          ))}
        </div>

        {/* Glassmorphism */}
        <div>
          <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>🪟 Glassmorphism</h3>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>
            <strong>Glassmorphism</strong> is a modern design trend that creates a glass-like effect with:
          </p>
          <ul style={{ fontSize: '14px', color: '#666', marginBottom: '16px', paddingLeft: '20px' }}>
            <li>Translucent/transparent background</li>
            <li>Blur effect behind the element</li>
            <li>Subtle borders and shadows</li>
            <li>Frosted glass appearance</li>
          </ul>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            <Button
              variant="outline"
              onClick={() => openModal('glassmorphism')}
            >
              🪟 Glassmorphism Modal
            </Button>
            <Button
              variant="outline"
              onClick={() => openModal('glassmorphism-blur')}
            >
              🌫️ Glassmorphism + Blur Backdrop
            </Button>
          </div>
          
          <Modal
            isOpen={openModals['glassmorphism'] || false}
            onClose={() => closeModal('glassmorphism')}
            glassmorphism
            backdrop="blur"
            title="🪟 Glassmorphism Effect"
            description="Modal with glassmorphism styling"
          >
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <h4 style={{ marginBottom: '12px', color: '#333' }}>🪟 Glassmorphism Effect</h4>
              <p style={{ color: '#666', marginBottom: '16px' }}>
                Notice the translucent, frosted glass appearance of this modal!
              </p>
              <div style={{ 
                background: 'rgba(255, 255, 255, 0.1)', 
                padding: '16px', 
                borderRadius: '8px', 
                border: '1px solid rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)'
              }}>
                <p style={{ margin: 0, color: '#333', fontSize: '14px' }}>
                  This inner box also has glassmorphism styling to demonstrate the layered effect!
                </p>
              </div>
            </div>
          </Modal>

          <Modal
            isOpen={openModals['glassmorphism-blur'] || false}
            onClose={() => closeModal('glassmorphism-blur')}
            glassmorphism
            backdrop="blur"
            animation="scale"
            title="🌫️ Glassmorphism + Blur"
            description="Combined glassmorphism and blur backdrop effects"
          >
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <h4 style={{ marginBottom: '12px', color: '#333' }}>🌫️ Combined Effects</h4>
              <p style={{ color: '#666' }}>
                This modal combines <strong>glassmorphism</strong> with <strong>blur backdrop</strong> 
                for a modern, sophisticated look. Perfect for modern UI designs!
              </p>
            </div>
          </Modal>
        </div>

        {/* Combined Effects */}
        <div>
          <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>🎭 Combined Effects</h3>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>
            Mix and match different effects for unique modal experiences:
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            <Button
              variant="primary"
              onClick={() => openModal('combined-1')}
            >
              🌟 Premium Effect
            </Button>
            <Button
              variant="secondary"
              onClick={() => openModal('combined-2')}
            >
              🎨 Artistic Effect
            </Button>
          </div>
          
          <Modal
            isOpen={openModals['combined-1'] || false}
            onClose={() => closeModal('combined-1')}
            glassmorphism
            backdrop="blur"
            animation="scale"
            shadow="xl"
            title="🌟 Premium Modal"
            description="Combined glassmorphism, blur, scale animation, and extra large shadow"
          >
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <h4 style={{ marginBottom: '12px', color: '#333' }}>🌟 Premium Effect</h4>
              <p style={{ color: '#666' }}>
                This modal combines <strong>glassmorphism</strong> + <strong>blur backdrop</strong> + 
                <strong> scale animation</strong> + <strong>extra large shadow</strong> for a premium feel!
              </p>
            </div>
          </Modal>

          <Modal
            isOpen={openModals['combined-2'] || false}
            onClose={() => closeModal('combined-2')}
            animation="slide-up"
            backdrop="light"
            shadow="lg"
            title="🎨 Artistic Modal"
            description="Combined slide-up animation, light backdrop, and large shadow"
          >
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <h4 style={{ marginBottom: '12px', color: '#333' }}>🎨 Artistic Effect</h4>
              <p style={{ color: '#666' }}>
                This modal uses <strong>slide-up animation</strong> + <strong>light backdrop</strong> + 
                <strong> large shadow</strong> for an artistic, elegant appearance!
              </p>
            </div>
          </Modal>
        </div>
      </div>
    );
  },
};

// Interactive Theme Builder
export const InteractiveThemeBuilder: StoryObj<typeof Modal> = {
  render: () => {
    const [currentTheme, setCurrentTheme] = useState('default');
    const [isOpen, setIsOpen] = useState(false);
    const [customColor, setCustomColor] = useState('#10b981');
    const [customGradient, setCustomGradient] = useState('linear-gradient(90deg, #f43f5e 0%, #3b82f6 100%)');
    const [gradientType, setGradientType] = useState('linear');
    const [gradientDirection, setGradientDirection] = useState('90deg');
    const [gradientColors, setGradientColors] = useState(['#f43f5e', '#3b82f6']);
    
    // Modal-specific controls
    const [variant, setVariant] = useState<'primary' | 'secondary' | 'success' | 'warning' | 'info' | 'danger' | 'ghost' | 'outline'>('primary');
    const [size, setSize] = useState<'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'>('md');
    const [backdrop, setBackdrop] = useState<'dark' | 'light' | 'blur' | 'none'>('dark');
    const [position, setPosition] = useState<'center' | 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'>('center');
    const [animation, setAnimation] = useState<'fade' | 'slide' | 'scale' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right'>('fade');
    const [shadow, setShadow] = useState<'none' | 'sm' | 'md' | 'lg' | 'xl'>('lg');
    const [glassmorphism, setGlassmorphism] = useState(false);
    
    const themes: Record<string, Record<string, string>> = {
      default: {
        '--color-primary': '#0070f3',
        '--color-success': '#10b981',
        '--color-warning': '#f59e0b',
        '--color-danger': '#ef4444',
        '--color-info': '#06b6d4',
        '--color-secondary': '#6b7280',
        '--gradient-primary': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        '--gradient-success': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      },
      dark: {
        '--color-primary': '#3b82f6',
        '--color-success': '#10b981',
        '--color-warning': '#f59e0b',
        '--color-danger': '#ef4444',
        '--color-info': '#06b6d4',
        '--color-secondary': '#9ca3af',
        '--gradient-primary': 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
        '--gradient-success': 'linear-gradient(135deg, #065f46 0%, #047857 100%)',
      },
      warm: {
        '--color-primary': '#f97316',
        '--color-success': '#f59e0b',
        '--color-warning': '#dc2626',
        '--color-danger': '#b91c1c',
        '--color-info': '#f97316',
        '--color-secondary': '#f59e0b',
        '--gradient-primary': 'linear-gradient(135deg, #f97316 0%, #dc2626 100%)',
        '--gradient-success': 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
      },
      cool: {
        '--color-primary': '#06b6d4',
        '--color-success': '#3b82f6',
        '--color-warning': '#8b5cf6',
        '--color-danger': '#ec4899',
        '--color-info': '#06b6d4',
        '--color-secondary': '#3b82f6',
        '--gradient-primary': 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
        '--gradient-success': 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
      }
    };
    
    const applyTheme = (themeName: string) => {
      const theme = themes[themeName as keyof typeof themes];
      if (theme) {
        Object.entries(theme).forEach(([key, value]) => {
          document.documentElement.style.setProperty(key, value);
        });
        setCurrentTheme(themeName);
      }
    };

    const generateGradient = () => {
      let gradient = '';
      if (gradientType === 'linear') {
        gradient = `linear-gradient(${gradientDirection}, ${gradientColors.join(', ')})`;
      } else if (gradientType === 'radial') {
        gradient = `radial-gradient(circle, ${gradientColors.join(', ')})`;
      } else if (gradientType === 'conic') {
        gradient = `conic-gradient(from ${gradientDirection}, ${gradientColors.join(', ')})`;
      }
      setCustomGradient(gradient);
    };

    const addColor = () => {
      setGradientColors([...gradientColors, '#000000']);
    };

    const removeColor = (index: number) => {
      setGradientColors(gradientColors.filter((_, i) => i !== index));
    };

    const updateColor = (index: number, color: string) => {
      const newColors = [...gradientColors];
      newColors[index] = color;
      setGradientColors(newColors);
    };

    return (
      <ThemeProvider theme={themes[currentTheme as keyof typeof themes]}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Theme Switcher */}
          <div style={{ 
            background: 'var(--color-background)', 
            padding: '20px', 
            borderRadius: '12px', 
            border: '1px solid var(--color-border)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{ margin: '0 0 16px 0', color: 'var(--color-text)' }}>🎨 Theme Switcher</h3>
            <p style={{ margin: '0 0 16px 0', color: 'var(--color-text)' }}>
              Current theme: <strong style={{ color: 'var(--color-primary)' }}>{currentTheme}</strong>
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {Object.keys(themes).map(themeName => (
                <button
                  key={themeName}
                  onClick={() => applyTheme(themeName)}
                  style={{
                    padding: '8px 16px',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    background: currentTheme === themeName ? '#0070f3' : '#fff',
                    color: currentTheme === themeName ? '#fff' : '#333',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Themed Modal Preview */}
          <div style={{ 
            background: 'var(--color-background)', 
            padding: '20px', 
            borderRadius: '12px', 
            border: '1px solid var(--color-border)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            textAlign: 'center'
          }}>
            <h3 style={{ margin: '0 0 16px 0', color: 'var(--color-text)' }}>🎭 Themed Modal</h3>
            <p style={{ margin: '0 0 16px 0', color: 'var(--color-text)' }}>
              This modal automatically adapts to the selected theme!
            </p>
            
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
              <Button 
                variant={variant}
                onClick={() => setIsOpen(true)}
                style={{ fontSize: '16px', padding: '12px 24px' }}
              >
                Open Themed Modal
              </Button>
            </div>

            <Modal
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              variant={variant}
              size={size}
              backdrop={backdrop}
              position={position}
              animation={animation}
              shadow={shadow}
              glassmorphism={glassmorphism}
              title="🎨 Themed Modal"
              description={`This modal automatically adapts to the selected theme and customization settings! Current position: ${position}`}
              footer={
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                  <Button variant="outline" onClick={() => setIsOpen(false)}>Close</Button>
                  <Button variant={variant} onClick={() => setIsOpen(false)}>Got it!</Button>
                </div>
              }
            >
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <h3 style={{ marginBottom: '16px', color: 'var(--color-text)' }}>✨ Theme Features</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', textAlign: 'left' }}>
                  <div>
                    <h4 style={{ color: 'var(--color-primary)', marginBottom: '8px' }}>🎨 Colors</h4>
                    <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: 'var(--color-text)' }}>
                      <li>Primary colors</li>
                      <li>Background colors</li>
                      <li>Text colors</li>
                      <li>Border colors</li>
                    </ul>
                  </div>
                  <div>
                    <h4 style={{ color: 'var(--color-primary)', marginBottom: '8px' }}>🌟 Effects</h4>
                    <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: 'var(--color-text)' }}>
                      <li>Glassmorphism</li>
                      <li>Shadows</li>
                      <li>Animations</li>
                      <li>Backdrops</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Modal>
          </div>

          {/* Modal Customization Controls */}
          <div style={{ 
            background: 'var(--color-background)', 
            padding: '20px', 
            borderRadius: '12px', 
            border: '1px solid var(--color-border)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{ margin: '0 0 16px 0', color: 'var(--color-text)' }}>🔧 Modal Customization</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              {/* Variant Control */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Variant:</label>
                <select 
                  value={variant} 
                  onChange={(e) => setVariant(e.target.value as any)}
                  style={{ 
                    padding: '8px', 
                    borderRadius: '6px', 
                    border: '1px solid var(--color-border)',
                    background: 'var(--color-background)',
                    color: 'var(--color-text)',
                    fontSize: '14px'
                  }}
                >
                  <option value="primary">Primary</option>
                  <option value="secondary">Secondary</option>
                  <option value="success">Success</option>
                  <option value="warning">Warning</option>
                  <option value="info">Info</option>
                  <option value="danger">Danger</option>
                  <option value="ghost">Ghost</option>
                  <option value="outline">Outline</option>
                </select>
              </div>

              {/* Size Control */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Size:</label>
                <select 
                  value={size} 
                  onChange={(e) => setSize(e.target.value as any)}
                  style={{ 
                    padding: '8px', 
                    borderRadius: '6px', 
                    border: '1px solid var(--color-border)',
                    background: 'var(--color-background)',
                    color: 'var(--color-text)',
                    fontSize: '14px'
                  }}
                >
                  <option value="xs">Extra Small</option>
                  <option value="sm">Small</option>
                  <option value="md">Medium</option>
                  <option value="lg">Large</option>
                  <option value="xl">Extra Large</option>
                  <option value="full">Full</option>
                </select>
              </div>

              {/* Backdrop Control */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Backdrop:</label>
                <select 
                  value={backdrop} 
                  onChange={(e) => setBackdrop(e.target.value as any)}
                  style={{ 
                    padding: '8px', 
                    borderRadius: '6px', 
                    border: '1px solid var(--color-border)',
                    background: 'var(--color-background)',
                    color: 'var(--color-text)',
                    fontSize: '14px'
                  }}
                >
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
                  <option value="blur">Blur</option>
                  <option value="none">None</option>
                </select>
              </div>

              {/* Position Control */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Position:</label>
                <select 
                  value={position} 
                  onChange={(e) => setPosition(e.target.value as any)}
                  style={{ 
                    padding: '8px', 
                    borderRadius: '6px', 
                    border: '1px solid var(--color-border)',
                    background: 'var(--color-background)',
                    color: 'var(--color-text)',
                    fontSize: '14px'
                  }}
                >
                  <option value="center">Center</option>
                  <option value="top">Top</option>
                  <option value="bottom">Bottom</option>
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                  <option value="top-left">Top Left</option>
                  <option value="top-right">Top Right</option>
                  <option value="bottom-left">Bottom Left</option>
                  <option value="bottom-right">Bottom Right</option>
                </select>
              </div>

              {/* Animation Control */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Animation:</label>
                <select 
                  value={animation} 
                  onChange={(e) => setAnimation(e.target.value as any)}
                  style={{ 
                    padding: '8px', 
                    borderRadius: '6px', 
                    border: '1px solid var(--color-border)',
                    background: 'var(--color-background)',
                    color: 'var(--color-text)',
                    fontSize: '14px'
                  }}
                >
                  <option value="fade">Fade</option>
                  <option value="slide">Slide</option>
                  <option value="scale">Scale</option>
                  <option value="slide-up">Slide Up</option>
                  <option value="slide-down">Slide Down</option>
                  <option value="slide-left">Slide Left</option>
                  <option value="slide-right">Slide Right</option>
                </select>
              </div>

              {/* Shadow Control */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Shadow:</label>
                <select 
                  value={shadow} 
                  onChange={(e) => setShadow(e.target.value as any)}
                  style={{ 
                    padding: '8px', 
                    borderRadius: '6px', 
                    border: '1px solid var(--color-border)',
                    background: 'var(--color-background)',
                    color: 'var(--color-text)',
                    fontSize: '14px'
                  }}
                >
                  <option value="none">None</option>
                  <option value="sm">Small</option>
                  <option value="md">Medium</option>
                  <option value="lg">Large</option>
                  <option value="xl">Extra Large</option>
                </select>
              </div>

              {/* Style Controls */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Style Options:</label>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text)' }}>
                    <input 
                      type="checkbox" 
                      checked={glassmorphism} 
                      onChange={(e) => setGlassmorphism(e.target.checked)}
                    />
                    Glassmorphism
                  </label>
                </div>
              </div>
            </div>

            {/* Advanced Gradient Builder */}
            <div style={{ marginTop: '24px' }}>
              <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>🔧 Advanced Gradient Builder</h3>
              
              {/* Gradient Type Selector */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <label style={{ fontSize: '14px', minWidth: '80px' }}>Type:</label>
                <select 
                  value={gradientType} 
                  onChange={(e) => setGradientType(e.target.value)}
                  style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px' }}
                >
                  <option value="linear">Linear</option>
                  <option value="radial">Radial</option>
                  <option value="conic">Conic</option>
                </select>
                
                <label style={{ fontSize: '14px', minWidth: '80px' }}>Direction:</label>
                <input
                  type="text"
                  value={gradientDirection}
                  onChange={(e) => setGradientDirection(e.target.value)}
                  style={{ width: '80px', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px' }}
                  placeholder="90deg"
                />
              </div>
              
              {/* Color Management */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <label style={{ fontSize: '14px', minWidth: '80px' }}>Colors:</label>
                  <button
                    onClick={addColor}
                    style={{
                      padding: '4px 8px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      background: '#fff',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    + Add Color
                  </button>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
                  {gradientColors.map((color, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <input
                        type="color"
                        value={color}
                        onChange={(e) => updateColor(index, e.target.value)}
                        style={{ width: '40px', height: '30px', border: '1px solid #ddd', borderRadius: '4px' }}
                      />
                      <button
                        onClick={() => removeColor(index)}
                        style={{
                          padding: '2px 6px',
                          border: '1px solid #ddd',
                          borderRadius: '4px',
                          background: '#fff',
                          cursor: 'pointer',
                          fontSize: '10px'
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Generate Button */}
              <div style={{ marginBottom: '16px' }}>
                <button
                  onClick={generateGradient}
                  style={{
                    padding: '8px 16px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    background: '#0070f3',
                    color: '#fff',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  Generate Gradient
                </button>
              </div>
              
              {/* Custom Gradient Input */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '14px', display: 'block', marginBottom: '4px' }}>Custom Gradient:</label>
                <input
                  type="text"
                  value={customGradient}
                  onChange={(e) => setCustomGradient(e.target.value)}
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px' }}
                  placeholder="linear-gradient(90deg, #f43f5e 0%, #3b82f6 100%)"
                />
              </div>
              
              {/* Gradient Preview */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '14px', display: 'block', marginBottom: '4px' }}>Preview:</label>
                <div 
                  style={{ 
                    width: '100%', 
                    height: '60px', 
                    background: customGradient, 
                    border: '1px solid #ddd', 
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontSize: '12px',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                  }}
                >
                  {customGradient}
                </div>
              </div>
              
              {/* Generated Modals */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Button 
                  variant="primary"
                  onClick={() => setIsOpen(true)}
                  style={{ background: customGradient, border: 'none' }}
                >
                  Open Gradient Modal
                </Button>
              </div>
            </div>
            
            {/* Custom Color & Gradient Demo */}
            <div style={{ marginTop: '24px' }}>
              <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>🎨 Custom Color & Gradient Demo</h3>
              <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>
                These modals demonstrate that custom colors and gradients override theme colors in real scenarios:
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Custom Color Modal */}
                <div style={{ padding: '16px', border: '1px solid #ddd', borderRadius: '8px', background: '#f9f9f9' }}>
                  <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600' }}>🎨 Custom Color Modal</h4>
                  <p style={{ fontSize: '12px', color: '#666', margin: '0 0 12px 0' }}>
                    This modal uses custom color: <strong>{customColor}</strong> (overrides theme)
                  </p>
                  <Button 
                    variant="primary"
                    onClick={() => {
                      // Open modal with custom color
                      const modal = document.createElement('div');
                      modal.innerHTML = `
                        <div style="
                          position: fixed; 
                          top: 0; 
                          left: 0; 
                          width: 100%; 
                          height: 100%; 
                          background: rgba(0,0,0,0.5); 
                          display: flex; 
                          align-items: center; 
                          justify-content: center; 
                          z-index: 1000;
                        ">
                          <div style="
                            background: ${customColor}; 
                            color: white; 
                            padding: 24px; 
                            border-radius: 12px; 
                            max-width: 400px; 
                            box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1);
                          ">
                            <h3 style="margin: 0 0 16px 0;">🎨 Custom Color Modal</h3>
                            <p style="margin: 0 0 16px 0;">This modal uses the custom color: <strong>${customColor}</strong></p>
                            <p style="margin: 0 0 16px 0; font-size: 12px;">Notice how this overrides the current theme colors!</p>
                            <button onclick="this.parentElement.parentElement.remove()" style="
                              background: white; 
                              color: ${customColor}; 
                              border: none; 
                              padding: 8px 16px; 
                              border-radius: 6px; 
                              cursor: pointer;
                            ">Close</button>
                          </div>
                        </div>
                      `;
                      document.body.appendChild(modal);
                    }}
                    style={{ background: customColor, border: 'none' }}
                  >
                    Open Custom Color Modal
                  </Button>
                </div>

                {/* Custom Gradient Modal */}
                <div style={{ padding: '16px', border: '1px solid #ddd', borderRadius: '8px', background: '#f9f9f9' }}>
                  <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600' }}>🌈 Custom Gradient Modal</h4>
                  <p style={{ fontSize: '12px', color: '#666', margin: '0 0 12px 0' }}>
                    This modal uses custom gradient: <strong>{customGradient}</strong> (overrides theme)
                  </p>
                  <Button 
                    variant="primary"
                    onClick={() => {
                      // Open modal with custom gradient
                      const modal = document.createElement('div');
                      modal.innerHTML = `
                        <div style="
                          position: fixed; 
                          top: 0; 
                          left: 0; 
                          width: 100%; 
                          height: 100%; 
                          background: rgba(0,0,0,0.5); 
                          display: flex; 
                          align-items: center; 
                          justify-content: center; 
                          z-index: 1000;
                        ">
                          <div style="
                            background: ${customGradient}; 
                            color: white; 
                            padding: 24px; 
                            border-radius: 12px; 
                            max-width: 400px; 
                            box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1);
                          ">
                            <h3 style="margin: 0 0 16px 0;">🌈 Custom Gradient Modal</h3>
                            <p style="margin: 0 0 16px 0;">This modal uses the custom gradient:</p>
                            <p style="margin: 0 0 16px 0; font-size: 12px; background: rgba(0,0,0,0.2); padding: 8px; border-radius: 4px;"><code>${customGradient}</code></p>
                            <p style="margin: 0 0 16px 0; font-size: 12px;">Notice how this overrides the current theme colors!</p>
                            <button onclick="this.parentElement.parentElement.remove()" style="
                              background: white; 
                              color: #333; 
                              border: none; 
                              padding: 8px 16px; 
                              border-radius: 6px; 
                              cursor: pointer;
                            ">Close</button>
                          </div>
                        </div>
                      `;
                      document.body.appendChild(modal);
                    }}
                    style={{ background: customGradient, border: 'none' }}
                  >
                    Open Custom Gradient Modal
                  </Button>
                </div>

                {/* Theme vs Custom Comparison */}
                <div style={{ padding: '16px', border: '1px solid #ddd', borderRadius: '8px', background: '#f9f9f9' }}>
                  <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600' }}>⚖️ Theme vs Custom Comparison</h4>
                  <p style={{ fontSize: '12px', color: '#666', margin: '0 0 12px 0' }}>
                    Compare theme-based modal vs custom colored modal:
                  </p>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <Button 
                      variant="primary"
                      onClick={() => setIsOpen(true)}
                    >
                      Theme Modal (Current: {currentTheme})
                    </Button>
                    <Button 
                      variant="primary"
                      onClick={() => {
                        const modal = document.createElement('div');
                        modal.innerHTML = `
                          <div style="
                            position: fixed; 
                            top: 0; 
                            left: 0; 
                            width: 100%; 
                            height: 100%; 
                            background: rgba(0,0,0,0.5); 
                            display: flex; 
                            align-items: center; 
                            justify-content: center; 
                            z-index: 1000;
                          ">
                            <div style="
                              background: ${customColor}; 
                              color: white; 
                              padding: 24px; 
                              border-radius: 12px; 
                              max-width: 400px; 
                              box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1);
                            ">
                              <h3 style="margin: 0 0 16px 0;">🎨 Custom Override</h3>
                              <p style="margin: 0 0 16px 0;">This uses custom color: <strong>${customColor}</strong></p>
                              <p style="margin: 0 0 16px 0; font-size: 12px;">Even though theme is "${currentTheme}", custom color takes precedence!</p>
                              <button onclick="this.parentElement.parentElement.remove()" style="
                                background: white; 
                                color: ${customColor}; 
                                border: none; 
                                padding: 8px 16px; 
                                border-radius: 6px; 
                                cursor: pointer;
                              ">Close</button>
                            </div>
                          </div>
                        `;
                        document.body.appendChild(modal);
                      }}
                      style={{ background: customColor, border: 'none' }}
                    >
                      Custom Color Modal
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Custom Color Builder */}
            <div style={{ marginTop: '24px' }}>
              <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>🎨 Custom Color Builder</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <label style={{ fontSize: '14px', minWidth: '80px' }}>Custom Color:</label>
                  <input
                    type="color"
                    value={customColor}
                    onChange={(e) => setCustomColor(e.target.value)}
                    style={{ width: '50px', height: '30px', border: '1px solid #ddd', borderRadius: '4px' }}
                  />
                  <span style={{ fontSize: '14px', color: '#666' }}>{customColor}</span>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Button 
                  variant="primary"
                  onClick={() => setIsOpen(true)}
                  style={{ background: customColor, border: 'none' }}
                >
                  Open Custom Color Modal
                </Button>
              </div>
            </div>

            {/* Reset Button */}
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <button 
                onClick={() => {
                  setVariant('primary');
                  setSize('md');
                  setBackdrop('dark');
                  setPosition('center');
                  setAnimation('fade');
                  setShadow('lg');
                  setGlassmorphism(false);
                  setCustomColor('#10b981');
                  setCustomGradient('linear-gradient(90deg, #f43f5e 0%, #3b82f6 100%)');
                  setGradientType('linear');
                  setGradientDirection('90deg');
                  setGradientColors(['#f43f5e', '#3b82f6']);
                }}
                style={{
                  padding: '12px 24px',
                  background: 'var(--color-primary)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600'
                }}
              >
                Reset to Defaults
              </button>
            </div>
          </div>
        </div>
      </ThemeProvider>
    );
  },
};
