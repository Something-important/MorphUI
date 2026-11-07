import type { Meta, StoryObj } from '@storybook/react';
import { FileUpload } from './FileUpload';
import { Demo, Stack, ThemeGrid } from '../../../stories/_shared';

const meta: Meta<typeof FileUpload> = {
  title: 'Patterns/FileUpload',
  component: FileUpload,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'FileUpload renders a drag-and-drop file upload zone with file list, size limits, type filtering, and controlled/uncontrolled state. 4 variants, 3 sizes.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Upload files',
    hint: 'Drag and drop or click to browse',
  },
};

export const Variants: Story = {
  render: () => (
    <Demo title="All variants">
      <Stack gap={12} style={{ width: '400px' }}>
        {(['primary', 'secondary', 'ghost', 'outline'] as const).map((v) => (
          <FileUpload key={v} variant={v} label={v} hint="Drag and drop" />
        ))}
      </Stack>
    </Demo>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Demo title="All sizes">
      <Stack gap={12} style={{ width: '400px' }}>
        {(['sm', 'md', 'lg'] as const).map((s) => (
          <FileUpload key={s} size={s} label={`${s} size`} hint="Drag and drop" />
        ))}
      </Stack>
    </Demo>
  ),
};

export const States: Story = {
  render: () => (
    <Demo title="Disabled, single file, max size, accept filter">
      <Stack gap={12} style={{ width: '400px' }}>
        <FileUpload disabled label="Disabled" hint="Cannot upload" />
        <FileUpload multiple={false} label="Single file only" hint="One file at a time" />
        <FileUpload maxSize={1048576} label="Max 1MB" hint="Files over 1MB rejected" />
        <FileUpload accept="image/*" label="Images only" hint="PNG, JPG, GIF" />
      </Stack>
    </Demo>
  ),
};

export const Controlled: Story = {
  render: () => (
    <Demo title="Controlled vs uncontrolled">
      <Stack gap={12} style={{ width: '400px' }}>
        <FileUpload defaultFiles={[]} label="Uncontrolled" hint="defaultFiles=[]" />
        <FileUpload
          files={[]}
          onFilesChange={() => {}}
          label="Controlled"
          hint="files=[] + onFilesChange"
        />
      </Stack>
    </Demo>
  ),
};

export const Customization: Story = {
  render: () => (
    <Demo title="Max files & custom label/hint">
      <Stack gap={12} style={{ width: '400px' }}>
        <FileUpload maxFiles={3} label="Max 3 files" hint="Up to 3 files" />
        <FileUpload color="#ff0055" label="Custom accent" hint="Pink accent" />
      </Stack>
    </Demo>
  ),
};

export const AllThemes: Story = {
  render: () => (
    <Demo title="FileUpload across all 5 preset themes">
      <ThemeGrid>
        <FileUpload label="Upload" hint="Drag and drop" size="sm" />
      </ThemeGrid>
    </Demo>
  ),
};

export const EdgeCases: Story = {
  render: () => (
    <Demo title="Edge cases — long label, no hint, minimal">
      <Stack gap={12} style={{ width: '400px' }}>
        <FileUpload label="This is a very long upload label that might wrap or truncate depending on the drop zone width" />
        <FileUpload label="No hint" />
      </Stack>
    </Demo>
  ),
};
