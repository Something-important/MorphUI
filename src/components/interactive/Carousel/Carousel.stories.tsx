import type { Meta, StoryObj } from '@storybook/react';
import { Carousel } from './Carousel';
import { Demo, Stack, ThemeGrid } from '../../../stories/_shared';

const meta: Meta<typeof Carousel> = {
  title: 'Patterns/Carousel',
  component: Carousel,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Carousel renders a slide viewer with prev/next arrows, dots, autoplay, and loop. 4 variants, controlled/uncontrolled slide index.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

const slides = [
  <div
    key="1"
    style={{
      background: '#0070f3',
      color: '#fff',
      padding: '40px',
      textAlign: 'center',
      borderRadius: '8px',
    }}
  >
    Slide 1
  </div>,
  <div
    key="2"
    style={{
      background: '#10b981',
      color: '#fff',
      padding: '40px',
      textAlign: 'center',
      borderRadius: '8px',
    }}
  >
    Slide 2
  </div>,
  <div
    key="3"
    style={{
      background: '#f59e0b',
      color: '#fff',
      padding: '40px',
      textAlign: 'center',
      borderRadius: '8px',
    }}
  >
    Slide 3
  </div>,
  <div
    key="4"
    style={{
      background: '#ef4444',
      color: '#fff',
      padding: '40px',
      textAlign: 'center',
      borderRadius: '8px',
    }}
  >
    Slide 4
  </div>,
];

export const Default: Story = {
  args: {
    slides,
    style: { width: '400px' },
  },
};

export const Variants: Story = {
  render: () => (
    <Demo title="All variants">
      <Stack gap={16}>
        {(['primary', 'secondary', 'ghost', 'outline'] as const).map((v) => (
          <Carousel key={v} slides={slides} variant={v} style={{ width: '400px' }} />
        ))}
      </Stack>
    </Demo>
  ),
};

export const States: Story = {
  render: () => (
    <Demo title="No arrows, no dots, no loop">
      <Stack gap={16}>
        <Carousel slides={slides} showArrows={false} style={{ width: '400px' }} />
        <Carousel slides={slides} showDots={false} style={{ width: '400px' }} />
        <Carousel slides={slides} loop={false} style={{ width: '400px' }} />
      </Stack>
    </Demo>
  ),
};

export const Customization: Story = {
  render: () => (
    <Demo title="Autoplay & interval">
      <Stack gap={16}>
        <Carousel slides={slides} autoplay autoplayInterval={2000} style={{ width: '400px' }} />
      </Stack>
    </Demo>
  ),
};

export const Controlled: Story = {
  render: () => (
    <Demo title="Controlled vs uncontrolled">
      <Stack gap={16}>
        <Carousel slides={slides} defaultSlide={0} style={{ width: '400px' }} />
        <Carousel
          slides={slides}
          currentSlide={2}
          onSlideChange={() => {}}
          style={{ width: '400px' }}
        />
      </Stack>
    </Demo>
  ),
};

export const AllThemes: Story = {
  render: () => (
    <Demo title="Carousel across all 5 preset themes">
      <ThemeGrid>
        <Carousel slides={slides.slice(0, 2)} style={{ width: '100%' }} />
      </ThemeGrid>
    </Demo>
  ),
};

export const EdgeCases: Story = {
  render: () => (
    <Demo title="Edge cases — single slide, many slides">
      <Stack gap={16}>
        <Carousel slides={[slides[0]]} style={{ width: '400px' }} />
        <Carousel
          slides={Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              style={{
                background: '#667eea',
                color: '#fff',
                padding: '40px',
                textAlign: 'center',
                borderRadius: '8px',
              }}
            >
              Slide {i + 1}
            </div>
          ))}
          style={{ width: '400px' }}
        />
      </Stack>
    </Demo>
  ),
};

// Extra: Autoplay story (justified per plan Part 4 — Carousel has unique autoplay behavior)
export const Autoplay: Story = {
  render: () => (
    <Demo
      title="Autoplay with 1.5s interval"
      description="Extra story — Carousel's autoplay is a unique feature worth its own demo"
    >
      <Carousel slides={slides} autoplay autoplayInterval={1500} style={{ width: '400px' }} />
    </Demo>
  ),
};
