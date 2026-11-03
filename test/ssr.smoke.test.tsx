/* eslint-disable jest/expect-expect -- ssr() throws on crash; no explicit expect needed
/**
 * @jest-environment node
 *
 * SSR smoke test — renders every exported component with React's
 * renderToString (server-side). Catches any browser-only API usage
 * (window, document, createPortal without an isMounted guard) that
 * would crash during server-side rendering (e.g., Next.js).
 */
import React from 'react';
import { renderToString } from 'react-dom/server';
import {
  Button,
  Badge,
  Avatar,
  Breadcrumb,
  Card,
  Checkbox,
  Divider,
  Label,
  Progress,
  Skeleton,
  Spinner,
  Stepper,
  Switch,
  Toggle,
  Alert,
  Tooltip,
  RadioGroup,
  Slider,
  Pagination,
  Tabs,
  Drawer,
  Combobox,
  DatePicker,
  Form,
  Table,
  Modal,
  Dropdown,
  Sidebar,
  Toast,
  ToastProvider,
  ContextMenu,
} from '../src/components';
import { ThemeProvider } from '../src/components/theme/ThemeProvider';

const items = [{ label: 'Home', value: 'home' }];
const opts = [{ label: 'A', value: 'a' }];
const tableData = [{ id: 1, name: 'Test' }];
const tableCols = [{ key: 'name', label: 'Name' }];

function ssr(ui: React.ReactElement): string {
  return renderToString(<ThemeProvider>{ui}</ThemeProvider>);
}

describe('SSR smoke — all components render without crashing', () => {
  it('Button', () => expect(ssr(<Button>Click</Button>)).toContain('button'));
  it('Badge', () => expect(ssr(<Badge>3</Badge>)).toBeTruthy());
  it('Avatar', () => expect(ssr(<Avatar>A</Avatar>)).toBeTruthy());
  it('Breadcrumb', () => expect(ssr(<Breadcrumb items={items} />)).toBeTruthy());
  it('Card', () => expect(ssr(<Card>Content</Card>)).toBeTruthy());
  it('Checkbox', () => expect(ssr(<Checkbox label="OK" />)).toBeTruthy());
  it('Divider', () => expect(ssr(<Divider />)).toBeTruthy());
  it('Label', () => expect(ssr(<Label>Field</Label>)).toBeTruthy());
  it('Progress', () => expect(ssr(<Progress value={50} />)).toBeTruthy());
  it('Skeleton', () => expect(ssr(<Skeleton />)).toBeTruthy());
  it('Spinner', () => expect(ssr(<Spinner />)).toBeTruthy());
  it('Stepper', () =>
    expect(ssr(<Stepper steps={[{ label: 'One' }]} currentStep={0} />)).toBeTruthy());
  it('Switch', () => expect(ssr(<Switch />)).toBeTruthy());
  it('Toggle', () => expect(ssr(<Toggle />)).toBeTruthy());
  it('Alert', () => expect(ssr(<Alert variant="info">Msg</Alert>)).toBeTruthy());
  it('Tooltip (visible)', () =>
    expect(
      ssr(
        <Tooltip content="Tip" isVisible>
          <button>H</button>
        </Tooltip>,
      ),
    ).toBeTruthy());
  it('RadioGroup', () => expect(ssr(<RadioGroup name="c" options={opts} />)).toBeTruthy());
  it('Slider', () => expect(ssr(<Slider defaultValue={50} />)).toBeTruthy());
  it('Pagination', () => expect(ssr(<Pagination totalItems={100} currentPage={1} />)).toBeTruthy());
  it('Tabs', () => expect(ssr(<Tabs items={[{ label: 'T', content: 'C' }]} />)).toBeTruthy());
  it('Drawer (closed)', () => {
    ssr(
      <Drawer isOpen={false} onClose={() => {}}>
        C
      </Drawer>,
    );
  });
  it('Combobox', () => expect(ssr(<Combobox options={opts} />)).toBeTruthy());
  it('DatePicker', () => expect(ssr(<DatePicker />)).toBeTruthy());
  it('Form', () =>
    expect(
      ssr(
        <Form>
          <input aria-label="N" />
        </Form>,
      ),
    ).toBeTruthy());
  it('Table', () => expect(ssr(<Table data={tableData} columns={tableCols} />)).toBeTruthy());
  it('Modal (closed)', () => {
    ssr(
      <Modal isOpen={false} onClose={() => {}}>
        C
      </Modal>,
    );
  });
  it('Dropdown', () => expect(ssr(<Dropdown options={opts} onChange={() => {}} />)).toBeTruthy());
  it('Sidebar', () => expect(ssr(<Sidebar items={items} />)).toBeTruthy());
  it('Toast + ToastProvider', () =>
    expect(
      ssr(
        <ToastProvider>
          <div>App</div>
        </ToastProvider>,
      ),
    ).toBeTruthy());
  it('ContextMenu (closed)', () =>
    expect(
      ssr(
        <ContextMenu items={[{ label: 'Item', onClick: () => {} }]}>
          <button>Menu</button>
        </ContextMenu>,
      ),
    ).toBeTruthy());
  it('ThemeProvider (nested)', () =>
    expect(
      ssr(
        <ThemeProvider theme={{ 'color-primary': '#f00' }}>
          <div>X</div>
        </ThemeProvider>,
      ),
    ).toBeTruthy());
});
