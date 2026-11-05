import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FileUpload } from './FileUpload';
import { ThemeProvider } from '../../theme';

const meta: Meta<typeof FileUpload> = {
  title: 'Components/FileUpload',
  component: FileUpload,
  parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj<typeof FileUpload>;

export const Default: Story = {
  render: () => (
    <ThemeProvider>
      <div style={{ width: 400 }}>
        <FileUpload hint="PNG, JPG, PDF up to 10MB" />
      </div>
    </ThemeProvider>
  ),
};

export const WithFiles: Story = {
  render: () => (
    <ThemeProvider>
      <div style={{ width: 400 }}>
        <FileUpload
          hint="PNG, JPG, PDF up to 10MB"
          defaultFiles={[
            {
              id: '1',
              file: new File([''], 'photo.png', { type: 'image/png' }),
              status: 'success',
            },
            {
              id: '2',
              file: new File([''], 'document.pdf', { type: 'application/pdf' }),
              status: 'error',
              error: 'File type not accepted',
            },
          ]}
        />
      </div>
    </ThemeProvider>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [files, setFiles] = React.useState<
      Array<{ id: string; file: File; status: 'pending' | 'success' | 'error' }>
    >([]);
    return (
      <ThemeProvider>
        <div style={{ width: 400 }}>
          <FileUpload files={files} onFilesChange={setFiles} hint="Any file type" />
          <p style={{ marginTop: 12, fontSize: 14 }}>{files.length} file(s) selected</p>
        </div>
      </ThemeProvider>
    );
  },
};

export const SingleFile: Story = {
  render: () => (
    <ThemeProvider>
      <div style={{ width: 400 }}>
        <FileUpload multiple={false} hint="Select one file" />
      </div>
    </ThemeProvider>
  ),
};

export const Disabled: Story = {
  render: () => (
    <ThemeProvider>
      <div style={{ width: 400 }}>
        <FileUpload disabled hint="Upload disabled" />
      </div>
    </ThemeProvider>
  ),
};
