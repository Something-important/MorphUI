import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Carousel } from '../src/components/interactive/Carousel';
import { ThemeProvider } from '../src/components/theme/ThemeProvider';

const renderWithTheme = (ui: React.ReactElement) => render(<ThemeProvider>{ui}</ThemeProvider>);

const slides = [
  <div key="1" data-testid="slide-1">
    Slide 1
  </div>,
  <div key="2" data-testid="slide-2">
    Slide 2
  </div>,
  <div key="3" data-testid="slide-3">
    Slide 3
  </div>,
];

describe('Carousel Component', () => {
  describe('Basic Rendering', () => {
    it('renders the carousel with slides', () => {
      renderWithTheme(<Carousel slides={slides} />);
      expect(screen.getByTestId('slide-1')).toBeInTheDocument();
      expect(screen.getByText('Slide 1')).toBeInTheDocument();
    });

    it('renders arrows by default', () => {
      renderWithTheme(<Carousel slides={slides} />);
      expect(screen.getByLabelText('Previous slide')).toBeInTheDocument();
      expect(screen.getByLabelText('Next slide')).toBeInTheDocument();
    });

    it('renders dots by default', () => {
      renderWithTheme(<Carousel slides={slides} />);
      const dots = screen.getAllByRole('tab');
      expect(dots).toHaveLength(3);
    });

    it('does not render arrows when showArrows is false', () => {
      renderWithTheme(<Carousel slides={slides} showArrows={false} />);
      expect(screen.queryByLabelText('Previous slide')).not.toBeInTheDocument();
    });

    it('does not render dots when showDots is false', () => {
      renderWithTheme(<Carousel slides={slides} showDots={false} />);
      expect(screen.queryAllByRole('tab')).toHaveLength(0);
    });

    it('renders nothing when slides array is empty', () => {
      const { container } = renderWithTheme(<Carousel slides={[]} />);
      expect(container.querySelector('.carousel-component')).toBeNull();
    });
  });

  describe('Navigation', () => {
    it('goes to next slide on next arrow click', () => {
      const onSlideChange = jest.fn();
      renderWithTheme(<Carousel slides={slides} onSlideChange={onSlideChange} />);
      fireEvent.click(screen.getByLabelText('Next slide'));
      expect(onSlideChange).toHaveBeenCalledWith(1);
    });

    it('goes to previous slide on prev arrow click', () => {
      const onSlideChange = jest.fn();
      renderWithTheme(<Carousel slides={slides} defaultSlide={1} onSlideChange={onSlideChange} />);
      // Slide 2 (index 1) is current
      expect(screen.getByLabelText('Slide 2 of 3')).not.toHaveAttribute('aria-hidden', 'true');
      // Click prev → should go to slide 1 (index 0)
      fireEvent.click(screen.getByLabelText('Previous slide'));
      expect(onSlideChange).toHaveBeenCalledWith(0);
    });

    it('goes to specific slide on dot click', () => {
      const onSlideChange = jest.fn();
      renderWithTheme(<Carousel slides={slides} onSlideChange={onSlideChange} />);
      const dots = screen.getAllByRole('tab');
      fireEvent.click(dots[2]); // third dot → slide 3
      expect(onSlideChange).toHaveBeenCalledWith(2);
    });

    it('loops to last slide when going prev from first (loop=true)', () => {
      const onSlideChange = jest.fn();
      renderWithTheme(<Carousel slides={slides} onSlideChange={onSlideChange} loop />);
      fireEvent.click(screen.getByLabelText('Previous slide'));
      expect(onSlideChange).toHaveBeenCalledWith(2); // last slide (index 2)
    });

    it('disables prev arrow at first slide when loop is false', () => {
      renderWithTheme(<Carousel slides={slides} loop={false} />);
      expect(screen.getByLabelText('Previous slide')).toBeDisabled();
    });

    it('disables next arrow at last slide when loop is false', () => {
      renderWithTheme(<Carousel slides={slides} loop={false} defaultSlide={2} />);
      expect(screen.getByLabelText('Next slide')).toBeDisabled();
    });
  });

  describe('Keyboard', () => {
    it('goes next on ArrowRight', () => {
      const onSlideChange = jest.fn();
      const { container } = renderWithTheme(
        <Carousel slides={slides} onSlideChange={onSlideChange} />,
      );
      const region = container.querySelector('[role="region"]') as HTMLElement;
      fireEvent.keyDown(region, { key: 'ArrowRight' });
      expect(onSlideChange).toHaveBeenCalledWith(1);
    });

    it('goes prev on ArrowLeft', () => {
      const onSlideChange = jest.fn();
      const { container } = renderWithTheme(
        <Carousel slides={slides} onSlideChange={onSlideChange} defaultSlide={1} />,
      );
      const region = container.querySelector('[role="region"]') as HTMLElement;
      fireEvent.keyDown(region, { key: 'ArrowLeft' });
      expect(onSlideChange).toHaveBeenCalledWith(0);
    });
  });

  describe('Controlled/Uncontrolled', () => {
    it('initializes from defaultSlide', () => {
      renderWithTheme(<Carousel slides={slides} defaultSlide={1} />);
      // Slide 2 should be current (aria-hidden=false)
      expect(screen.getByLabelText('Slide 2 of 3')).not.toHaveAttribute('aria-hidden', 'true');
      // Slide 1 should be hidden
      expect(screen.getByLabelText('Slide 1 of 3')).toHaveAttribute('aria-hidden', 'true');
    });

    it('controlled currentSlide wins over defaultSlide', () => {
      renderWithTheme(<Carousel slides={slides} currentSlide={2} defaultSlide={0} />);
      expect(screen.getByLabelText('Slide 3 of 3')).not.toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Children', () => {
    it('accepts slides as children', () => {
      renderWithTheme(
        <Carousel>
          <div data-testid="child-slide">Child Slide</div>
          <div>Second</div>
        </Carousel>,
      );
      expect(screen.getByTestId('child-slide')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('renders role="region" with aria-label', () => {
      renderWithTheme(<Carousel slides={slides} ariaLabel="Product gallery" />);
      const region = screen.getByRole('region');
      expect(region).toHaveAttribute('aria-label', 'Product gallery');
    });

    it('marks non-current slides as aria-hidden', () => {
      renderWithTheme(<Carousel slides={slides} defaultSlide={1} />);
      expect(screen.getByLabelText('Slide 1 of 3')).toHaveAttribute('aria-hidden', 'true');
      expect(screen.getByLabelText('Slide 2 of 3')).toHaveAttribute('aria-hidden', 'false');
      expect(screen.getByLabelText('Slide 3 of 3')).toHaveAttribute('aria-hidden', 'true');
    });
  });
});
