import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './Pagination';
import { Demo, Stack, ThemeGrid } from '../../../stories/_shared';

const meta: Meta<typeof Pagination> = {
  title: 'Patterns/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Pagination renders page navigation. Supports page numbers, first/last, prev/next, page-size selector, total count, and 4 variants.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    totalItems: 100,
    pageSize: 10,
    currentPage: 3,
  },
};

export const Variants: Story = {
  render: () => (
    <Demo title="All variants">
      <Stack gap={12}>
        {(['primary', 'secondary', 'outline', 'ghost'] as const).map((v) => (
          <Pagination key={v} totalItems={100} pageSize={10} currentPage={3} variant={v} />
        ))}
      </Stack>
    </Demo>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Demo title="All sizes">
      <Stack gap={12}>
        {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((s) => (
          <Pagination key={s} totalItems={100} pageSize={10} currentPage={3} size={s} />
        ))}
      </Stack>
    </Demo>
  ),
};

export const States: Story = {
  render: () => (
    <Demo title="First page, last page, single page">
      <Stack gap={12}>
        <Pagination totalItems={100} pageSize={10} currentPage={1} />
        <Pagination totalItems={100} pageSize={10} currentPage={10} />
        <Pagination totalItems={5} pageSize={10} currentPage={1} />
      </Stack>
    </Demo>
  ),
};

export const Controlled: Story = {
  render: () => (
    <Demo title="Controlled vs uncontrolled">
      <Stack gap={12}>
        <Pagination totalItems={100} pageSize={10} currentPage={5} onPageChange={() => {}} />
        <Pagination totalItems={100} pageSize={10} defaultPage={5} />
      </Stack>
    </Demo>
  ),
};

export const Customization: Story = {
  render: () => (
    <Demo title="Display options — page numbers, first/last, page size, total">
      <Stack gap={12}>
        <Pagination
          totalItems={250}
          pageSize={10}
          currentPage={5}
          showPageNumbers
          showFirstLast
          showPrevNext
          showPageSize
          showTotal
          pageSizeOptions={[10, 25, 50, 100]}
        />
        <Pagination
          totalItems={250}
          pageSize={10}
          currentPage={5}
          showPageNumbers={false}
          showFirstLast
          showPrevNext
        />
      </Stack>
    </Demo>
  ),
};

export const AllThemes: Story = {
  render: () => (
    <Demo title="Pagination across all 5 preset themes">
      <ThemeGrid>
        <Pagination totalItems={50} pageSize={10} currentPage={3} size="sm" />
      </ThemeGrid>
    </Demo>
  ),
};

export const EdgeCases: Story = {
  render: () => (
    <Demo title="Edge cases — many pages, zero items, sibling count">
      <Stack gap={12}>
        <Pagination totalItems={1000} pageSize={10} currentPage={50} siblingCount={1} />
        <Pagination totalItems={0} pageSize={10} currentPage={1} />
      </Stack>
    </Demo>
  ),
};
