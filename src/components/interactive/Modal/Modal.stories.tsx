// Modal.stories.tsx
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal, Button, Dropdown, Checkbox, ThemeProvider, themes } from '../../index';

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
    
    // Advanced color states
    const [backgroundColor, setBackgroundColor] = useState('');
    const [backgroundColorGradient, setBackgroundColorGradient] = useState('');
    const [textColor, setTextColor] = useState('');
    const [textColorGradient, setTextColorGradient] = useState('');
    const [borderColor, setBorderColor] = useState('');
    const [borderColorGradient, setBorderColorGradient] = useState('');
    const [headerBackgroundColor, setHeaderBackgroundColor] = useState('');
    const [headerBackgroundColorGradient, setHeaderBackgroundColorGradient] = useState('');
    const [footerBackgroundColor, setFooterBackgroundColor] = useState('');
    const [footerBackgroundColorGradient, setFooterBackgroundColorGradient] = useState('');
    const [contentBackgroundColor, setContentBackgroundColor] = useState('');
    const [contentBackgroundColorGradient, setContentBackgroundColorGradient] = useState('');
    
    // Gradient builder states
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
    
    // Use centralized themes from the theme system
    const availableThemes = themes;
    
    const applyTheme = (themeName: string) => {
      const theme = availableThemes[themeName as keyof typeof availableThemes];
      if (theme) {
        Object.entries(theme).forEach(([key, value]) => {
          document.documentElement.style.setProperty(`--${key}`, String(value));
        });
        setCurrentTheme(themeName);
      }
    };

    const generateGradient = () => {
      if (gradientColors.length < 2) return '';
      const colors = gradientColors.join(', ');
      
      let gradient = '';
      if (gradientType === 'linear') {
        gradient = `linear-gradient(${gradientDirection}, ${colors})`;
      } else if (gradientType === 'radial') {
        const direction = gradientDirection || 'circle at center';
        gradient = `radial-gradient(${direction}, ${colors})`;
      } else if (gradientType === 'conic') {
        const direction = gradientDirection || 'from 0deg at center';
        gradient = `conic-gradient(${direction}, ${colors})`;
      }
      
      return gradient;
    };

    const applyGradientToTarget = (target: string) => {
      const gradient = generateGradient();
      if (!gradient) return;
      
      switch (target) {
        case 'background':
          setBackgroundColorGradient(gradient);
          setBackgroundColor('');
          break;
        case 'text':
          setTextColorGradient(gradient);
          setTextColor('');
          break;
        case 'border':
          setBorderColorGradient(gradient);
          setBorderColor('');
          break;
        case 'header':
          setHeaderBackgroundColorGradient(gradient);
          setHeaderBackgroundColor('');
          break;
        case 'footer':
          setFooterBackgroundColorGradient(gradient);
          setFooterBackgroundColor('');
          break;
        case 'content':
          setContentBackgroundColorGradient(gradient);
          setContentBackgroundColor('');
          break;
      }
    };

    const resetCustomStyling = () => {
      setBackgroundColor('');
      setBackgroundColorGradient('');
      setTextColor('');
      setTextColorGradient('');
      setBorderColor('');
      setBorderColorGradient('');
      setHeaderBackgroundColor('');
      setHeaderBackgroundColorGradient('');
      setFooterBackgroundColor('');
      setFooterBackgroundColorGradient('');
      setContentBackgroundColor('');
      setContentBackgroundColorGradient('');
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
      <ThemeProvider theme={availableThemes[currentTheme as keyof typeof availableThemes]}>
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
              {Object.keys(availableThemes).map(themeName => (
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
              color={backgroundColorGradient.trim() || backgroundColor.trim() || undefined}
              gradient={backgroundColorGradient.trim() || undefined}
              textColor={textColorGradient.trim() || textColor.trim() || undefined}
              borderColor={borderColorGradient.trim() || borderColor.trim() || undefined}
              headerBackgroundColor={headerBackgroundColorGradient.trim() || headerBackgroundColor.trim() || undefined}
              footerBackgroundColor={footerBackgroundColorGradient.trim() || footerBackgroundColor.trim() || undefined}
              contentBackgroundColor={contentBackgroundColorGradient.trim() || contentBackgroundColor.trim() || undefined}
              title="🎨 Advanced Themed Modal"
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
                <Dropdown
                  value={variant}
                  onChange={(value) => setVariant(value as any)}
                  options={[
                    { value: 'primary', label: 'Primary' },
                    { value: 'secondary', label: 'Secondary' },
                    { value: 'success', label: 'Success' },
                    { value: 'warning', label: 'Warning' },
                    { value: 'info', label: 'Info' },
                    { value: 'danger', label: 'Danger' },
                    { value: 'ghost', label: 'Ghost' },
                    { value: 'outline', label: 'Outline' }
                  ]}
                  placeholder="Select variant"
                  size="sm"
                />
              </div>

              {/* Size Control */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Size:</label>
                <Dropdown
                  value={size}
                  onChange={(value) => setSize(value as any)}
                  options={[
                    { value: 'xs', label: 'Extra Small' },
                    { value: 'sm', label: 'Small' },
                    { value: 'md', label: 'Medium' },
                    { value: 'lg', label: 'Large' },
                    { value: 'xl', label: 'Extra Large' },
                    { value: 'full', label: 'Full' }
                  ]}
                  placeholder="Select size"
                  size="sm"
                />
              </div>

              {/* Backdrop Control */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Backdrop:</label>
                <Dropdown
                  value={backdrop}
                  onChange={(value) => setBackdrop(value as any)}
                  options={[
                    { value: 'dark', label: 'Dark' },
                    { value: 'light', label: 'Light' },
                    { value: 'blur', label: 'Blur' },
                    { value: 'none', label: 'None' }
                  ]}
                  placeholder="Select backdrop"
                  size="sm"
                />
              </div>

              {/* Position Control */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Position:</label>
                <Dropdown
                  value={position}
                  onChange={(value) => setPosition(value as any)}
                  options={[
                    { value: 'center', label: 'Center' },
                    { value: 'top', label: 'Top' },
                    { value: 'bottom', label: 'Bottom' },
                    { value: 'left', label: 'Left' },
                    { value: 'right', label: 'Right' },
                    { value: 'top-left', label: 'Top Left' },
                    { value: 'top-right', label: 'Top Right' },
                    { value: 'bottom-left', label: 'Bottom Left' },
                    { value: 'bottom-right', label: 'Bottom Right' }
                  ]}
                  placeholder="Select position"
                  size="sm"
                />
              </div>

              {/* Animation Control */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Animation:</label>
                <Dropdown
                  value={animation}
                  onChange={(value) => setAnimation(value as any)}
                  options={[
                    { value: 'fade', label: 'Fade' },
                    { value: 'slide', label: 'Slide' },
                    { value: 'scale', label: 'Scale' },
                    { value: 'slide-up', label: 'Slide Up' },
                    { value: 'slide-down', label: 'Slide Down' },
                    { value: 'slide-left', label: 'Slide Left' },
                    { value: 'slide-right', label: 'Slide Right' }
                  ]}
                  placeholder="Select animation"
                  size="sm"
                />
              </div>

              {/* Shadow Control */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Shadow:</label>
                <Dropdown
                  value={shadow}
                  onChange={(value) => setShadow(value as any)}
                  options={[
                    { value: 'none', label: 'None' },
                    { value: 'sm', label: 'Small' },
                    { value: 'md', label: 'Medium' },
                    { value: 'lg', label: 'Large' },
                    { value: 'xl', label: 'Extra Large' }
                  ]}
                  placeholder="Select shadow"
                  size="sm"
                />
              </div>

              {/* Style Controls */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Style Options:</label>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <Checkbox
                    checked={glassmorphism}
                    onChange={(checked) => setGlassmorphism(checked)}
                    label="Glassmorphism"
                  />
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
                  <Button
                    onClick={addColor}
                    size="sm"
                    variant="outline"
                    style={{ fontSize: '12px' }}
                  >
                    + Add Color
                  </Button>
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
                <Button
                  onClick={generateGradient}
                  variant="primary"
                  size="sm"
                >
                  Generate Gradient
                </Button>
              </div>
              
              {/* Apply to Target */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '14px', display: 'block', marginBottom: '8px', color: 'var(--color-text)' }}>Apply to:</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  <button
                    onClick={() => applyGradientToTarget('background')}
                    style={{
                      padding: '6px 12px',
                      border: '1px solid var(--color-border)',
                      borderRadius: '4px',
                      background: 'var(--color-background)',
                      color: 'var(--color-text)',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    Main Background
                  </button>
                  <button
                    onClick={() => applyGradientToTarget('header')}
                    style={{
                      padding: '6px 12px',
                      border: '1px solid var(--color-border)',
                      borderRadius: '4px',
                      background: 'var(--color-background)',
                      color: 'var(--color-text)',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    Header Background
                  </button>
                  <button
                    onClick={() => applyGradientToTarget('footer')}
                    style={{
                      padding: '6px 12px',
                      border: '1px solid var(--color-border)',
                      borderRadius: '4px',
                      background: 'var(--color-background)',
                      color: 'var(--color-text)',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    Footer Background
                  </button>
                  <button
                    onClick={() => applyGradientToTarget('content')}
                    style={{
                      padding: '6px 12px',
                      border: '1px solid var(--color-border)',
                      borderRadius: '4px',
                      background: 'var(--color-background)',
                      color: 'var(--color-text)',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    Content Background
                  </button>
                  <button
                    onClick={() => applyGradientToTarget('text')}
                    style={{
                      padding: '6px 12px',
                      border: '1px solid var(--color-border)',
                      borderRadius: '4px',
                      background: 'var(--color-background)',
                      color: 'var(--color-text)',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    Text Color
                  </button>
                  <button
                    onClick={() => applyGradientToTarget('border')}
                    style={{
                      padding: '6px 12px',
                      border: '1px solid var(--color-border)',
                      borderRadius: '4px',
                      background: 'var(--color-background)',
                      color: 'var(--color-text)',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    Border Color
                  </button>
                </div>
              </div>
              
              {/* Gradient Preview */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '14px', display: 'block', marginBottom: '4px' }}>Preview:</label>
                <div 
                  style={{ 
                    width: '100%', 
                    height: '60px', 
                    background: generateGradient(), 
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
                  {generateGradient()}
                </div>
              </div>
              
            </div>

            {/* Individual Color Controls */}
            <div style={{ 
              background: 'var(--color-background)', 
              padding: '20px', 
              borderRadius: '12px', 
              border: '1px solid var(--color-border)',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              marginTop: '20px'
            }}>
              <h3 style={{ margin: '0 0 16px 0', color: 'var(--color-text)' }}>🎨 Individual Color Controls</h3>
              
              {/* Background Colors */}
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600', color: 'var(--color-text)' }}>
                  🎨 Background Colors
                </h4>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
                  {/* Main Background Color */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Main Background Color:</label>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <input 
                        type="color" 
                        value={backgroundColor || '#ffffff'} 
                        onChange={(e) => setBackgroundColor(e.target.value)}
                        style={{ width: '40px', height: '32px', border: '1px solid var(--color-border)', borderRadius: '4px', cursor: 'pointer' }}
                      />
                      <input 
                        type="text" 
                        value={backgroundColor} 
                        onChange={(e) => setBackgroundColor(e.target.value)}
                        placeholder="e.g., #ff0000 or red"
                        style={{
                          flex: 1,
                          padding: '6px 8px',
                          border: '1px solid var(--color-border)',
                          borderRadius: '4px',
                          background: 'var(--color-background)',
                          color: 'var(--color-text)',
                          fontSize: '12px'
                        }}
                      />
                      <button 
                        onClick={() => setBackgroundColor('')}
                        style={{
                          padding: '6px 8px',
                          border: '1px solid var(--color-border)',
                          borderRadius: '4px',
                          background: 'var(--color-background)',
                          color: 'var(--color-text)',
                          fontSize: '12px',
                          cursor: 'pointer'
                        }}
                      >
                        Reset
                      </button>
              </div>
            </div>
            
                  {/* Main Background Gradient */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Main Background Gradient:</label>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <input 
                        type="text" 
                        value={backgroundColorGradient} 
                        onChange={(e) => setBackgroundColorGradient(e.target.value)}
                        placeholder="e.g., linear-gradient(45deg, #ff0000, #00ff00)"
                        style={{
                          flex: 1,
                          padding: '6px 8px',
                          border: '1px solid var(--color-border)',
                          borderRadius: '4px',
                          background: 'var(--color-background)',
                          color: 'var(--color-text)',
                          fontSize: '12px'
                        }}
                      />
                      <button 
                        onClick={() => setBackgroundColorGradient('')}
                        style={{
                          padding: '6px 8px',
                          border: '1px solid var(--color-border)',
                          borderRadius: '4px',
                          background: 'var(--color-background)',
                          color: 'var(--color-text)',
                          fontSize: '12px',
                          cursor: 'pointer'
                        }}
                      >
                        Reset
                      </button>
                    </div>
                  </div>

                  {/* Header Background Color */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Header Background Color:</label>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <input 
                        type="color" 
                        value={headerBackgroundColor || '#f8f9fa'} 
                        onChange={(e) => setHeaderBackgroundColor(e.target.value)}
                        style={{ width: '40px', height: '32px', border: '1px solid var(--color-border)', borderRadius: '4px', cursor: 'pointer' }}
                      />
                      <input 
                        type="text" 
                        value={headerBackgroundColor} 
                        onChange={(e) => setHeaderBackgroundColor(e.target.value)}
                        placeholder="e.g., #ff0000 or red"
                        style={{
                          flex: 1,
                          padding: '6px 8px',
                          border: '1px solid var(--color-border)',
                          borderRadius: '4px',
                          background: 'var(--color-background)',
                          color: 'var(--color-text)',
                          fontSize: '12px'
                        }}
                      />
                      <button 
                        onClick={() => setHeaderBackgroundColor('')}
                        style={{
                          padding: '6px 8px',
                          border: '1px solid var(--color-border)',
                          borderRadius: '4px',
                          background: 'var(--color-background)',
                          color: 'var(--color-text)',
                          fontSize: '12px',
                          cursor: 'pointer'
                        }}
                      >
                        Reset
                      </button>
                          </div>
                        </div>

                  {/* Header Background Gradient */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Header Background Gradient:</label>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <input 
                        type="text" 
                        value={headerBackgroundColorGradient} 
                        onChange={(e) => setHeaderBackgroundColorGradient(e.target.value)}
                        placeholder="e.g., linear-gradient(45deg, #ff0000, #00ff00)"
                        style={{
                          flex: 1,
                          padding: '6px 8px',
                          border: '1px solid var(--color-border)',
                          borderRadius: '4px',
                          background: 'var(--color-background)',
                          color: 'var(--color-text)',
                          fontSize: '12px'
                        }}
                      />
                      <button 
                        onClick={() => setHeaderBackgroundColorGradient('')}
                        style={{
                          padding: '6px 8px',
                          border: '1px solid var(--color-border)',
                          borderRadius: '4px',
                          background: 'var(--color-background)',
                          color: 'var(--color-text)',
                          fontSize: '12px',
                          cursor: 'pointer'
                        }}
                      >
                        Reset
                      </button>
                    </div>
                </div>

                  {/* Footer Background Color */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Footer Background Color:</label>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <input 
                        type="color" 
                        value={footerBackgroundColor || '#f8f9fa'} 
                        onChange={(e) => setFooterBackgroundColor(e.target.value)}
                        style={{ width: '40px', height: '32px', border: '1px solid var(--color-border)', borderRadius: '4px', cursor: 'pointer' }}
                      />
                      <input 
                        type="text" 
                        value={footerBackgroundColor} 
                        onChange={(e) => setFooterBackgroundColor(e.target.value)}
                        placeholder="e.g., #ff0000 or red"
                        style={{
                          flex: 1,
                          padding: '6px 8px',
                          border: '1px solid var(--color-border)',
                          borderRadius: '4px',
                          background: 'var(--color-background)',
                          color: 'var(--color-text)',
                          fontSize: '12px'
                        }}
                      />
                      <button 
                        onClick={() => setFooterBackgroundColor('')}
                        style={{
                          padding: '6px 8px',
                          border: '1px solid var(--color-border)',
                          borderRadius: '4px',
                          background: 'var(--color-background)',
                          color: 'var(--color-text)',
                          fontSize: '12px',
                          cursor: 'pointer'
                        }}
                      >
                        Reset
                      </button>
                          </div>
                        </div>

                  {/* Footer Background Gradient */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Footer Background Gradient:</label>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <input 
                        type="text" 
                        value={footerBackgroundColorGradient} 
                        onChange={(e) => setFooterBackgroundColorGradient(e.target.value)}
                        placeholder="e.g., linear-gradient(45deg, #ff0000, #00ff00)"
                        style={{
                          flex: 1,
                          padding: '6px 8px',
                          border: '1px solid var(--color-border)',
                          borderRadius: '4px',
                          background: 'var(--color-background)',
                          color: 'var(--color-text)',
                          fontSize: '12px'
                        }}
                      />
                      <button 
                        onClick={() => setFooterBackgroundColorGradient('')}
                        style={{
                          padding: '6px 8px',
                          border: '1px solid var(--color-border)',
                          borderRadius: '4px',
                          background: 'var(--color-background)',
                          color: 'var(--color-text)',
                          fontSize: '12px',
                          cursor: 'pointer'
                        }}
                      >
                        Reset
                      </button>
                    </div>
                </div>

                  {/* Content Background Color */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Content Background Color:</label>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <input 
                        type="color" 
                        value={contentBackgroundColor || '#ffffff'} 
                        onChange={(e) => setContentBackgroundColor(e.target.value)}
                        style={{ width: '40px', height: '32px', border: '1px solid var(--color-border)', borderRadius: '4px', cursor: 'pointer' }}
                      />
                      <input 
                        type="text" 
                        value={contentBackgroundColor} 
                        onChange={(e) => setContentBackgroundColor(e.target.value)}
                        placeholder="e.g., #ff0000 or red"
                        style={{
                          flex: 1,
                          padding: '6px 8px',
                          border: '1px solid var(--color-border)',
                          borderRadius: '4px',
                          background: 'var(--color-background)',
                          color: 'var(--color-text)',
                          fontSize: '12px'
                        }}
                      />
                      <button 
                        onClick={() => setContentBackgroundColor('')}
                        style={{
                          padding: '6px 8px',
                          border: '1px solid var(--color-border)',
                          borderRadius: '4px',
                          background: 'var(--color-background)',
                          color: 'var(--color-text)',
                          fontSize: '12px',
                          cursor: 'pointer'
                        }}
                      >
                        Reset
                      </button>
                            </div>
                          </div>

                  {/* Content Background Gradient */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Content Background Gradient:</label>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <input 
                        type="text" 
                        value={contentBackgroundColorGradient} 
                        onChange={(e) => setContentBackgroundColorGradient(e.target.value)}
                        placeholder="e.g., linear-gradient(45deg, #ff0000, #00ff00)"
                        style={{
                          flex: 1,
                          padding: '6px 8px',
                          border: '1px solid var(--color-border)',
                          borderRadius: '4px',
                          background: 'var(--color-background)',
                          color: 'var(--color-text)',
                          fontSize: '12px'
                        }}
                      />
                      <button 
                        onClick={() => setContentBackgroundColorGradient('')}
                        style={{
                          padding: '6px 8px',
                          border: '1px solid var(--color-border)',
                          borderRadius: '4px',
                          background: 'var(--color-background)',
                          color: 'var(--color-text)',
                          fontSize: '12px',
                          cursor: 'pointer'
                        }}
                      >
                        Reset
                      </button>
                  </div>
                </div>
              </div>
            </div>
            
              {/* Text Colors */}
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600', color: 'var(--color-text)' }}>
                  📝 Text Colors
                </h4>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
                  {/* Text Color */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Text Color:</label>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <input
                    type="color"
                        value={textColor || '#333333'} 
                        onChange={(e) => setTextColor(e.target.value)}
                        style={{ width: '40px', height: '32px', border: '1px solid var(--color-border)', borderRadius: '4px', cursor: 'pointer' }}
                      />
                      <input 
                        type="text" 
                        value={textColor} 
                        onChange={(e) => setTextColor(e.target.value)}
                        placeholder="e.g., #ff0000 or red"
                        style={{
                          flex: 1,
                          padding: '6px 8px',
                          border: '1px solid var(--color-border)',
                          borderRadius: '4px',
                          background: 'var(--color-background)',
                          color: 'var(--color-text)',
                          fontSize: '12px'
                        }}
                      />
                      <button 
                        onClick={() => setTextColor('')}
                        style={{
                          padding: '6px 8px',
                          border: '1px solid var(--color-border)',
                          borderRadius: '4px',
                          background: 'var(--color-background)',
                          color: 'var(--color-text)',
                          fontSize: '12px',
                          cursor: 'pointer'
                        }}
                      >
                        Reset
                      </button>
                </div>
              </div>

                  {/* Text Color Gradient */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Text Color Gradient:</label>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <input 
                        type="text" 
                        value={textColorGradient} 
                        onChange={(e) => setTextColorGradient(e.target.value)}
                        placeholder="e.g., linear-gradient(45deg, #ff0000, #00ff00)"
                        style={{
                          flex: 1,
                          padding: '6px 8px',
                          border: '1px solid var(--color-border)',
                          borderRadius: '4px',
                          background: 'var(--color-background)',
                          color: 'var(--color-text)',
                          fontSize: '12px'
                        }}
                      />
                      <button 
                        onClick={() => setTextColorGradient('')}
                        style={{
                          padding: '6px 8px',
                          border: '1px solid var(--color-border)',
                          borderRadius: '4px',
                          background: 'var(--color-background)',
                          color: 'var(--color-text)',
                          fontSize: '12px',
                          cursor: 'pointer'
                        }}
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Border Colors */}
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600', color: 'var(--color-text)' }}>
                  🔲 Border Colors
                </h4>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
                  {/* Border Color */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Border Color:</label>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <input 
                        type="color" 
                        value={borderColor || '#e5e7eb'} 
                        onChange={(e) => setBorderColor(e.target.value)}
                        style={{ width: '40px', height: '32px', border: '1px solid var(--color-border)', borderRadius: '4px', cursor: 'pointer' }}
                      />
                      <input 
                        type="text" 
                        value={borderColor} 
                        onChange={(e) => setBorderColor(e.target.value)}
                        placeholder="e.g., #ff0000 or red"
                        style={{
                          flex: 1,
                          padding: '6px 8px',
                          border: '1px solid var(--color-border)',
                          borderRadius: '4px',
                          background: 'var(--color-background)',
                          color: 'var(--color-text)',
                          fontSize: '12px'
                        }}
                      />
                      <button 
                        onClick={() => setBorderColor('')}
                        style={{
                          padding: '6px 8px',
                          border: '1px solid var(--color-border)',
                          borderRadius: '4px',
                          background: 'var(--color-background)',
                          color: 'var(--color-text)',
                          fontSize: '12px',
                          cursor: 'pointer'
                        }}
                      >
                        Reset
                      </button>
                    </div>
                  </div>

                  {/* Border Color Gradient */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Border Color Gradient:</label>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <input 
                        type="text" 
                        value={borderColorGradient} 
                        onChange={(e) => setBorderColorGradient(e.target.value)}
                        placeholder="e.g., linear-gradient(45deg, #ff0000, #00ff00)"
                        style={{
                          flex: 1,
                          padding: '6px 8px',
                          border: '1px solid var(--color-border)',
                          borderRadius: '4px',
                          background: 'var(--color-background)',
                          color: 'var(--color-text)',
                          fontSize: '12px'
                        }}
                      />
                      <button 
                        onClick={() => setBorderColorGradient('')}
                        style={{
                          padding: '6px 8px',
                          border: '1px solid var(--color-border)',
                          borderRadius: '4px',
                          background: 'var(--color-background)',
                          color: 'var(--color-text)',
                          fontSize: '12px',
                          cursor: 'pointer'
                        }}
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Reset Button */}
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <Button 
                onClick={() => {
                  setVariant('primary');
                  setSize('md');
                  setBackdrop('dark');
                  setPosition('center');
                  setAnimation('fade');
                  setShadow('lg');
                  setGlassmorphism(false);
                  resetCustomStyling();
                  setGradientType('linear');
                  setGradientDirection('90deg');
                  setGradientColors(['#f43f5e', '#3b82f6']);
                }}
                variant="primary"
                size="md"
              >
                Reset to Defaults
              </Button>
            </div>
          </div>
        </div>
      </ThemeProvider>
    );
  },
};
