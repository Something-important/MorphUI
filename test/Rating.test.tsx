import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Rating } from '../src/components/interactive/Rating';
import { ThemeProvider } from '../src/components/theme/ThemeProvider';

const renderWithTheme = (ui: React.ReactElement) => render(<ThemeProvider>{ui}</ThemeProvider>);

describe('Rating Component', () => {
  it('renders the correct number of stars', () => {
    const { container } = renderWithTheme(<Rating max={5} />);
    const stars = container.querySelectorAll('.rating-component__star');
    expect(stars).toHaveLength(5);
  });

  it('renders 3 stars when max is 3', () => {
    const { container } = renderWithTheme(<Rating max={3} />);
    expect(container.querySelectorAll('.rating-component__star')).toHaveLength(3);
  });

  it('fills stars based on value', () => {
    const { container } = renderWithTheme(<Rating value={3} max={5} />);
    const filled = container.querySelectorAll('.rating-component__star--filled');
    expect(filled).toHaveLength(3);
  });

  it('calls onChange when a star is clicked', () => {
    const onChange = jest.fn();
    const { container } = renderWithTheme(<Rating onChange={onChange} max={5} />);
    const stars = container.querySelectorAll('.rating-component__star-wrapper');
    fireEvent.click(stars[2]); // click 3rd star → value 3
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it('initializes from defaultValue', () => {
    const { container } = renderWithTheme(<Rating defaultValue={4} max={5} />);
    const filled = container.querySelectorAll('.rating-component__star--filled');
    expect(filled).toHaveLength(4);
  });

  it('does not call onChange when readonly', () => {
    const onChange = jest.fn();
    const { container } = renderWithTheme(<Rating readonly onChange={onChange} max={5} />);
    const stars = container.querySelectorAll('.rating-component__star-wrapper');
    fireEvent.click(stars[2]);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('does not call onChange when disabled', () => {
    const onChange = jest.fn();
    const { container } = renderWithTheme(<Rating disabled onChange={onChange} max={5} />);
    const stars = container.querySelectorAll('.rating-component__star-wrapper');
    fireEvent.click(stars[2]);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('renders role="slider" with aria attributes', () => {
    renderWithTheme(<Rating value={3} max={5} ariaLabel="Product rating" />);
    const slider = screen.getByRole('slider');
    expect(slider).toHaveAttribute('aria-valuenow', '3');
    expect(slider).toHaveAttribute('aria-valuemin', '0');
    expect(slider).toHaveAttribute('aria-valuemax', '5');
  });

  it('increases value on ArrowRight', () => {
    const onChange = jest.fn();
    renderWithTheme(<Rating value={2} max={5} onChange={onChange} />);
    const slider = screen.getByRole('slider');
    fireEvent.keyDown(slider, { key: 'ArrowRight' });
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it('decreases value on ArrowLeft', () => {
    const onChange = jest.fn();
    renderWithTheme(<Rating value={3} max={5} onChange={onChange} />);
    const slider = screen.getByRole('slider');
    fireEvent.keyDown(slider, { key: 'ArrowLeft' });
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it('does not exceed max on ArrowRight', () => {
    const onChange = jest.fn();
    renderWithTheme(<Rating value={5} max={5} onChange={onChange} />);
    fireEvent.keyDown(screen.getByRole('slider'), { key: 'ArrowRight' });
    expect(onChange).toHaveBeenCalledWith(5);
  });

  it('does not go below 0 on ArrowLeft', () => {
    const onChange = jest.fn();
    renderWithTheme(<Rating value={0} max={5} onChange={onChange} />);
    fireEvent.keyDown(screen.getByRole('slider'), { key: 'ArrowLeft' });
    expect(onChange).toHaveBeenCalledWith(0);
  });
});
