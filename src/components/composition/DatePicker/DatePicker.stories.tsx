import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from './DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 280 }}>
      <DatePicker placeholder="Pick a date" />
    </div>
  ),
};

export const WithValue: Story = {
  render: () => (
    <div style={{ maxWidth: 280 }}>
      <DatePicker defaultValue={new Date(2026, 5, 15)} clearable />
    </div>
  ),
};

export const MinMax: Story = {
  render: () => (
    <div style={{ maxWidth: 280 }}>
      <DatePicker
        defaultValue={new Date(2026, 2, 15)}
        min={new Date(2026, 2, 1)}
        max={new Date(2026, 2, 28)}
      />
    </div>
  ),
};

export const WeekStartsMonday: Story = {
  render: () => (
    <div style={{ maxWidth: 280 }}>
      <DatePicker weekStartsOn={1} />
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<Date | null>(new Date(2026, 0, 1));
    return (
      <div style={{ maxWidth: 280 }}>
        <DatePicker value={value} onChange={(v) => setValue(v as Date | null)} clearable />
        <p style={{ marginTop: 12 }}>Selected: {value ? value.toDateString() : '(none)'}</p>
      </div>
    );
  },
};

export const Themed: Story = {
  render: () => (
    <div style={{ maxWidth: 280 }}>
      <DatePicker
        defaultValue={new Date(2026, 5, 15)}
        color="#ff6b6b"
        borderRadius={14}
        shadow="lg"
        clearable
      />
      <p style={{ marginTop: 12 }}>Focus the input to open the themed panel.</p>
    </div>
  ),
};

export const GradientPanel: Story = {
  render: () => (
    <div style={{ maxWidth: 280 }}>
      <DatePicker
        defaultValue={new Date(2026, 5, 15)}
        gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        textColor="#ffffff"
        shadow="xl"
      />
      <p style={{ marginTop: 12 }}>Gradient wins the panel background over color.</p>
    </div>
  ),
};
