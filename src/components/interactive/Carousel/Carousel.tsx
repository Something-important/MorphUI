// Carousel.tsx
import React, { forwardRef, useState, useCallback, useEffect, useRef, useId, useMemo } from 'react';
import { resolveThemeValue, getAriaProps } from '../../../utils';
import './Carousel.css';

export type CarouselVariant = 'primary' | 'secondary' | 'ghost' | 'outline';

export interface CarouselProps {
  /** Slides as ReactNode array (each is one slide). */
  slides?: React.ReactNode[];
  /** Or pass slides as children. */
  children?: React.ReactNode;
  /** Controlled current slide index (0-based). */
  currentSlide?: number;
  /** Uncontrolled initial slide index. */
  defaultSlide?: number;
  onSlideChange?: (index: number) => void;
  /** Show prev/next arrow buttons. Default: true. */
  showArrows?: boolean;
  /** Show navigation dots. Default: true. */
  showDots?: boolean;
  /** Loop back to the first slide after the last. Default: true. */
  loop?: boolean;
  /** Auto-advance slides. Default: false. */
  autoplay?: boolean;
  /** Autoplay interval in ms. Default: 4000. */
  autoplayInterval?: number;
  /** Pause autoplay on hover. Default: true. */
  pauseOnHover?: boolean;
  /** Variant. */
  variant?: CarouselVariant;
  /** Theme override for arrows + dots accent. */
  color?: string;
  /** Text color override. */
  textColor?: string;
  /** Border color override. */
  borderColor?: string;
  /** Border radius override. */
  borderRadius?: string | number;
  /** Shadow level. */
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  style?: React.CSSProperties;
  ariaLabel?: string;
}

export const Carousel = forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      slides: slidesProp,
      children,
      currentSlide: controlled,
      defaultSlide = 0,
      onSlideChange,
      showArrows = true,
      showDots = true,
      loop = true,
      autoplay = false,
      autoplayInterval = 4000,
      pauseOnHover = true,
      variant = 'primary',
      color,
      textColor,
      borderColor,
      borderRadius,
      shadow,
      className = '',
      style,
      ariaLabel = 'Carousel',
      ...rest
    },
    ref,
  ) => {
    const generatedId = useId();

    const slides = useMemo(() => {
      if (slidesProp) return slidesProp;
      if (children) return Array.isArray(children) ? children : [children];
      return [];
    }, [slidesProp, children]);

    // Import useMemo
    const count = slides.length;

    const isControlled = controlled !== undefined;
    const [internalSlide, setInternalSlide] = useState(
      Math.min(defaultSlide, Math.max(count - 1, 0)),
    );
    const current = isControlled ? controlled! : internalSlide;

    const [isHovering, setIsHovering] = useState(false);
    const touchStartX = useRef<number | null>(null);

    const goTo = useCallback(
      (index: number) => {
        if (count === 0) return;
        let next = index;
        if (loop) {
          next = ((index % count) + count) % count;
        } else {
          next = Math.max(0, Math.min(index, count - 1));
        }
        if (!isControlled) setInternalSlide(next);
        onSlideChange?.(next);
      },
      [count, loop, isControlled, onSlideChange],
    );

    const goNext = useCallback(() => goTo(current + 1), [goTo, current]);
    const goPrev = useCallback(() => goTo(current - 1), [goTo, current]);

    // Autoplay
    useEffect(() => {
      if (!autoplay || count <= 1) return;
      if (pauseOnHover && isHovering) return;
      const timer = setInterval(() => {
        goNext();
      }, autoplayInterval);
      return () => clearInterval(timer);
    }, [autoplay, count, pauseOnHover, isHovering, autoplayInterval, goNext]);

    // Keyboard nav
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          goPrev();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          goNext();
        }
      },
      [goPrev, goNext],
    );

    // Touch/swipe
    const handleTouchStart = useCallback((e: React.TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
    }, []);

    const handleTouchEnd = useCallback(
      (e: React.TouchEvent) => {
        if (touchStartX.current === null) return;
        const delta = e.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(delta) > 50) {
          if (delta > 0) goPrev();
          else goNext();
        }
        touchStartX.current = null;
      },
      [goPrev, goNext],
    );

    // Theme resolution
    const resolvedColor = resolveThemeValue(color);
    const resolvedTextColor = resolveThemeValue(textColor);
    const resolvedBorderColor = resolveThemeValue(borderColor);
    const resolvedShadow = shadow !== undefined ? resolveThemeValue(`shadow-${shadow}`) : undefined;

    const componentStyle: React.CSSProperties & Record<string, string> = {
      ...(resolvedColor && { '--carousel-custom-accent': resolvedColor }),
      ...(resolvedTextColor && { '--carousel-custom-text-color': resolvedTextColor }),
      ...(resolvedBorderColor && { '--carousel-custom-border': resolvedBorderColor }),
      ...(borderRadius !== undefined && {
        '--carousel-custom-border-radius':
          typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
      }),
      ...(resolvedShadow && { '--carousel-custom-shadow': resolvedShadow }),
    };

    const mergedStyle = style ? { ...componentStyle, ...style } : componentStyle;
    const ariaProps = getAriaProps({ label: ariaLabel });

    const classes = ['carousel-component', `carousel-component--${variant}`, className]
      .filter(Boolean)
      .join(' ');

    if (count === 0) return null;

    const translateX = `calc(${current} * -100%)`;

    return (
      // Carousel is a custom widget: the region needs to be focusable so
      // users can navigate between slides with the arrow keys. The standard
      // ARIA carousel pattern (region + aria-roledescription) is intentionally
      // preserved here.
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
      <div
        ref={ref}
        id={generatedId}
        className={classes}
        style={mergedStyle}
        role="region"
        {...ariaProps}
        onKeyDown={handleKeyDown}
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        {...rest}
      >
        <div className="carousel-component__viewport">
          <div
            className="carousel-component__track"
            style={{ transform: `translateX(${translateX})` }}
            role="list"
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className="carousel-component__slide"
                role="listitem"
                aria-hidden={index !== current}
                aria-label={`Slide ${index + 1} of ${count}`}
              >
                {slide}
              </div>
            ))}
          </div>
        </div>

        {showArrows && count > 1 && (
          <>
            <button
              type="button"
              className="carousel-component__arrow carousel-component__arrow--prev"
              onClick={goPrev}
              disabled={!loop && current === 0}
              aria-label="Previous slide"
            >
              ‹
            </button>
            <button
              type="button"
              className="carousel-component__arrow carousel-component__arrow--next"
              onClick={goNext}
              disabled={!loop && current === count - 1}
              aria-label="Next slide"
            >
              ›
            </button>
          </>
        )}

        {showDots && count > 1 && (
          <div className="carousel-component__dots" role="tablist">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                className={`carousel-component__dot ${
                  index === current ? 'carousel-component__dot--active' : ''
                }`}
                onClick={() => goTo(index)}
                role="tab"
                aria-selected={index === current}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    );
  },
);

Carousel.displayName = 'Carousel';
