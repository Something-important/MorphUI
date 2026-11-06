import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import {
  FileUpload,
  formatFileSize,
  type UploadedFile,
} from '../src/components/interactive/FileUpload';
import { ThemeProvider } from '../src/components/theme/ThemeProvider';

const renderWithTheme = (ui: React.ReactElement) => render(<ThemeProvider>{ui}</ThemeProvider>);

const createFile = (name: string, size: number, type = 'text/plain'): File => {
  const content = new Array(size).fill('x').join('');
  return new File([content], name, { type });
};

describe('FileUpload Component', () => {
  describe('Basic Rendering', () => {
    it('renders a drop zone with label', () => {
      renderWithTheme(<FileUpload />);
      expect(screen.getByText('Drop files here or click to browse')).toBeInTheDocument();
    });

    it('renders a hint when provided', () => {
      renderWithTheme(<FileUpload hint="PNG, JPG up to 5MB" />);
      expect(screen.getByText('PNG, JPG up to 5MB')).toBeInTheDocument();
    });

    it('renders role="button" drop zone', () => {
      renderWithTheme(<FileUpload ariaLabel="Upload files" />);
      expect(screen.getByRole('button', { name: /drop files/i })).toBeInTheDocument();
    });
  });

  describe('File Selection', () => {
    it('adds files on input change', () => {
      const onFilesChange = jest.fn();
      renderWithTheme(<FileUpload onFilesChange={onFilesChange} />);
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      const file = createFile('test.txt', 100);
      fireEvent.change(input, { target: { files: [file] } });
      expect(onFilesChange).toHaveBeenCalledTimes(1);
      const added = onFilesChange.mock.calls[0][0];
      expect(added).toHaveLength(1);
      expect(added[0].file.name).toBe('test.txt');
    });

    it('adds multiple files when multiple is true (default)', () => {
      const onFilesChange = jest.fn();
      renderWithTheme(<FileUpload onFilesChange={onFilesChange} />);
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      fireEvent.change(input, {
        target: { files: [createFile('a.txt', 50), createFile('b.txt', 60)] },
      });
      const added = onFilesChange.mock.calls[0][0];
      expect(added).toHaveLength(2);
    });

    it('replaces files when multiple is false', () => {
      const onFilesChange = jest.fn();
      renderWithTheme(<FileUpload multiple={false} onFilesChange={onFilesChange} />);
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      fireEvent.change(input, {
        target: { files: [createFile('first.txt', 50)] },
      });
      fireEvent.change(input, {
        target: { files: [createFile('second.txt', 60)] },
      });
      // Second call should have only 1 file (the second one)
      const lastCall = onFilesChange.mock.calls[onFilesChange.mock.calls.length - 1][0];
      expect(lastCall).toHaveLength(1);
      expect(lastCall[0].file.name).toBe('second.txt');
    });
  });

  describe('File List', () => {
    it('renders the file list when files exist', () => {
      const files: UploadedFile[] = [
        { id: '1', file: createFile('doc.txt', 1024), status: 'success' },
      ];
      renderWithTheme(<FileUpload files={files} />);
      expect(screen.getByText('doc.txt')).toBeInTheDocument();
      expect(screen.getByText('1.0 KB')).toBeInTheDocument();
    });

    it('does not render file list when showFileList is false', () => {
      const files: UploadedFile[] = [
        { id: '1', file: createFile('doc.txt', 100), status: 'success' },
      ];
      renderWithTheme(<FileUpload files={files} showFileList={false} />);
      expect(screen.queryByText('doc.txt')).not.toBeInTheDocument();
    });

    it('renders remove button for each file', () => {
      const files: UploadedFile[] = [
        { id: '1', file: createFile('a.txt', 100), status: 'success' },
        { id: '2', file: createFile('b.txt', 100), status: 'success' },
      ];
      renderWithTheme(<FileUpload files={files} />);
      expect(screen.getByLabelText('Remove a.txt')).toBeInTheDocument();
      expect(screen.getByLabelText('Remove b.txt')).toBeInTheDocument();
    });

    it('removes a file when remove button is clicked', () => {
      const onFilesChange = jest.fn();
      const files: UploadedFile[] = [
        { id: '1', file: createFile('a.txt', 100), status: 'success' },
        { id: '2', file: createFile('b.txt', 100), status: 'success' },
      ];
      renderWithTheme(<FileUpload files={files} onFilesChange={onFilesChange} />);
      fireEvent.click(screen.getByLabelText('Remove a.txt'));
      const remaining = onFilesChange.mock.calls[0][0];
      expect(remaining).toHaveLength(1);
      expect(remaining[0].file.name).toBe('b.txt');
    });
  });

  describe('Validation', () => {
    it('marks files exceeding maxSize as error', () => {
      const onFilesChange = jest.fn();
      renderWithTheme(<FileUpload maxSize={100} onFilesChange={onFilesChange} />);
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      fireEvent.change(input, {
        target: { files: [createFile('big.txt', 200)] },
      });
      const added = onFilesChange.mock.calls[0][0];
      expect(added[0].status).toBe('error');
      expect(added[0].error).toContain('max size');
    });

    it('marks files with wrong type as error', () => {
      const onFilesChange = jest.fn();
      renderWithTheme(<FileUpload accept="image/*" onFilesChange={onFilesChange} />);
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      fireEvent.change(input, {
        target: { files: [createFile('doc.txt', 100, 'text/plain')] },
      });
      const added = onFilesChange.mock.calls[0][0];
      expect(added[0].status).toBe('error');
      expect(added[0].error).toContain('type not accepted');
    });

    it('accepts files matching the accept pattern', () => {
      const onFilesChange = jest.fn();
      renderWithTheme(<FileUpload accept="image/*" onFilesChange={onFilesChange} />);
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      fireEvent.change(input, {
        target: { files: [createFile('photo.png', 100, 'image/png')] },
      });
      const added = onFilesChange.mock.calls[0][0];
      expect(added[0].status).toBe('pending');
      expect(added[0].error).toBeUndefined();
    });

    it('enforces maxFiles limit', () => {
      const onFilesChange = jest.fn();
      renderWithTheme(<FileUpload maxFiles={2} onFilesChange={onFilesChange} />);
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      // Add 3 files
      fireEvent.change(input, {
        target: {
          files: [createFile('a.txt', 50), createFile('b.txt', 50), createFile('c.txt', 50)],
        },
      });
      const added = onFilesChange.mock.calls[0][0];
      expect(added).toHaveLength(2); // capped at maxFiles
    });
  });

  describe('Controlled/Uncontrolled', () => {
    it('initializes from defaultFiles', () => {
      const files: UploadedFile[] = [
        { id: '1', file: createFile('initial.txt', 100), status: 'success' },
      ];
      renderWithTheme(<FileUpload defaultFiles={files} />);
      expect(screen.getByText('initial.txt')).toBeInTheDocument();
    });

    it('controlled files win over defaultFiles', () => {
      const controlled: UploadedFile[] = [
        { id: '1', file: createFile('controlled.txt', 100), status: 'success' },
      ];
      const defaults: UploadedFile[] = [
        { id: '2', file: createFile('default.txt', 100), status: 'success' },
      ];
      renderWithTheme(<FileUpload files={controlled} defaultFiles={defaults} />);
      expect(screen.getByText('controlled.txt')).toBeInTheDocument();
      expect(screen.queryByText('default.txt')).not.toBeInTheDocument();
    });
  });

  describe('Disabled', () => {
    it('does not add files when disabled', () => {
      const onFilesChange = jest.fn();
      renderWithTheme(<FileUpload disabled onFilesChange={onFilesChange} />);
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      fireEvent.change(input, {
        target: { files: [createFile('test.txt', 100)] },
      });
      expect(onFilesChange).not.toHaveBeenCalled();
    });

    it('renders disabled class on the dropzone', () => {
      const { container } = renderWithTheme(<FileUpload disabled />);
      expect(container.querySelector('.fileupload-component')).toHaveClass(
        'fileupload-component--disabled',
      );
    });
  });

  describe('formatFileSize helper', () => {
    it('formats bytes correctly', () => {
      expect(formatFileSize(500)).toBe('500 B');
      expect(formatFileSize(1024)).toBe('1.0 KB');
      expect(formatFileSize(1024 * 1024)).toBe('1.0 MB');
      expect(formatFileSize(1024 * 1024 * 1024)).toBe('1.0 GB');
    });
  });
});
