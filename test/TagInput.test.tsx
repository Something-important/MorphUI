import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TagInput } from '../src/components/composition/TagInput';
import { ThemeProvider } from '../src/components/theme/ThemeProvider';

const renderWithTheme = (ui: React.ReactElement) => render(<ThemeProvider>{ui}</ThemeProvider>);

describe('TagInput Component', () => {
  it('renders with placeholder when empty', () => {
    renderWithTheme(<TagInput placeholder="Add tags…" />);
    expect(screen.getByPlaceholderText('Add tags…')).toBeInTheDocument();
  });

  it('renders default tags', () => {
    renderWithTheme(<TagInput defaultTags={['react', 'typescript']} />);
    expect(screen.getByText('react')).toBeInTheDocument();
    expect(screen.getByText('typescript')).toBeInTheDocument();
  });

  it('adds a tag on Enter', () => {
    const onTagsChange = jest.fn();
    renderWithTheme(<TagInput onTagsChange={onTagsChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'newtag' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onTagsChange).toHaveBeenCalledWith(['newtag']);
  });

  it('adds a tag on comma', () => {
    const onTagsChange = jest.fn();
    renderWithTheme(<TagInput onTagsChange={onTagsChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'commatag' } });
    fireEvent.keyDown(input, { key: ',' });
    expect(onTagsChange).toHaveBeenCalledWith(['commatag']);
  });

  it('clears input after adding a tag', () => {
    renderWithTheme(<TagInput />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'tag1' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(input.value).toBe('');
  });

  it('removes a tag on remove button click', () => {
    const onTagsChange = jest.fn();
    renderWithTheme(<TagInput defaultTags={['a', 'b', 'c']} onTagsChange={onTagsChange} />);
    fireEvent.click(screen.getByLabelText('Remove b'));
    expect(onTagsChange).toHaveBeenCalledWith(['a', 'c']);
  });

  it('removes last tag on Backspace when input is empty', () => {
    const onTagsChange = jest.fn();
    renderWithTheme(<TagInput defaultTags={['a', 'b']} onTagsChange={onTagsChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.keyDown(input, { key: 'Backspace' });
    expect(onTagsChange).toHaveBeenCalledWith(['a']);
  });

  it('does not add duplicate tags by default', () => {
    const onTagsChange = jest.fn();
    renderWithTheme(<TagInput defaultTags={['existing']} onTagsChange={onTagsChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'existing' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onTagsChange).not.toHaveBeenCalled();
  });

  it('allows duplicates when allowDuplicates is true', () => {
    const onTagsChange = jest.fn();
    renderWithTheme(<TagInput defaultTags={['dup']} allowDuplicates onTagsChange={onTagsChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'dup' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onTagsChange).toHaveBeenCalledWith(['dup', 'dup']);
  });

  it('enforces maxTags limit', () => {
    const onTagsChange = jest.fn();
    renderWithTheme(<TagInput defaultTags={['a', 'b']} maxTags={2} onTagsChange={onTagsChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'c' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onTagsChange).not.toHaveBeenCalled(); // max reached
  });

  it('does not add empty tags', () => {
    const onTagsChange = jest.fn();
    renderWithTheme(<TagInput onTagsChange={onTagsChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onTagsChange).not.toHaveBeenCalled();
  });

  it('controlled tags win over defaultTags', () => {
    renderWithTheme(<TagInput tags={['controlled']} defaultTags={['default']} />);
    expect(screen.getByText('controlled')).toBeInTheDocument();
    expect(screen.queryByText('default')).not.toBeInTheDocument();
  });

  it('does not interact when disabled', () => {
    const onTagsChange = jest.fn();
    renderWithTheme(<TagInput defaultTags={['a']} disabled onTagsChange={onTagsChange} />);
    // Remove button should not exist when disabled
    expect(screen.queryByLabelText('Remove a')).not.toBeInTheDocument();
  });

  it('adds tag on blur', () => {
    const onTagsChange = jest.fn();
    renderWithTheme(<TagInput onTagsChange={onTagsChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'blurtag' } });
    fireEvent.blur(input);
    expect(onTagsChange).toHaveBeenCalledWith(['blurtag']);
  });
});
