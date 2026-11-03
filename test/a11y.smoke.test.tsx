/* eslint-disable jest/expect-expect -- the check() helper calls expect()
   inside an async axe() await; the linter can't trace it but every test
   does assert toHaveNoViolations. */
import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
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
} from '../src/components';
import { ThemeProvider } from '../src/components/theme/ThemeProvider';

const renderWithTheme = (ui: React.ReactElement) => render(<ThemeProvider>{ui}</ThemeProvider>);
const check = async (ui: React.ReactElement) => {
  const { container } = renderWithTheme(ui);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
};

// Comprehensive a11y smoke test — every exported component rendered in a
// minimal default state. Catches gross violations across the full surface
// (the 5 size-outlier components have dedicated a11y suites; this covers
// the rest). Pre-1.0 gate.
describe('a11y smoke — all components', () => {
  it('Button', async () => check(<Button>Click</Button>));
  it('Badge', async () => check(<Badge>3</Badge>));
  it('Avatar', async () => check(<Avatar>A</Avatar>));
  it('Breadcrumb', async () =>
    check(<Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Page' }]} />));
  it('Card', async () => check(<Card>Content</Card>));
  it('Checkbox', async () => check(<Checkbox label="Accept" />));
  it('Divider', async () => check(<Divider />));
  it('Label', async () => check(<Label>Field</Label>));
  it('Progress', async () => check(<Progress value={50} />));
  it('Skeleton', async () => check(<Skeleton />));
  it('Spinner', async () => check(<Spinner />));
  it('Stepper', async () =>
    check(<Stepper steps={[{ label: 'One' }, { label: 'Two' }]} currentStep={0} />));
  it('Switch', async () => check(<Switch />));
  it('Toggle', async () => check(<Toggle />));
  it('Alert', async () => check(<Alert variant="info">Info message</Alert>));
  it('Tooltip (visible)', async () =>
    check(
      <Tooltip content="Tip" isVisible>
        <button>Hover</button>
      </Tooltip>,
    ));
  it('RadioGroup', async () =>
    check(
      <RadioGroup
        name="color"
        options={[
          { label: 'Red', value: 'red' },
          { label: 'Blue', value: 'blue' },
        ]}
      />,
    ));
  it('Slider', async () => check(<Slider defaultValue={50} />));
  it('Pagination', async () => check(<Pagination totalItems={100} currentPage={1} />));
  it('Tabs', async () =>
    check(
      <Tabs
        items={[
          { label: 'Tab 1', content: 'One' },
          { label: 'Tab 2', content: 'Two' },
        ]}
      />,
    ));
  it('Drawer (closed)', async () =>
    check(
      <Drawer isOpen={false} onClose={() => {}}>
        Content
      </Drawer>,
    ));
  it('Drawer (open)', async () =>
    check(
      <Drawer isOpen onClose={() => {}}>
        Content
      </Drawer>,
    ));
  it('Combobox', async () =>
    check(
      <Combobox
        options={[
          { label: 'Apple', value: 'apple' },
          { label: 'Banana', value: 'banana' },
        ]}
      />,
    ));
  it('DatePicker', async () => check(<DatePicker />));
  it('Form', async () =>
    check(
      <Form>
        <input type="text" aria-label="Name" />
      </Form>,
    ));
});
