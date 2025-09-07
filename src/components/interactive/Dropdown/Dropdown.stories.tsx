import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown, DropdownOption, DropdownOptionGroup, Button, ThemeProvider, themes } from '../../index';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible dropdown component with support for single/multi-select, search, theming, and positioning.',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size of the dropdown',
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'outline', 'ghost'],
      description: 'Visual variant of the dropdown',
    },
    color: {
      control: { type: 'text' },
      description: 'Custom background color (hex, rgb, theme key)',
    },
    textColor: {
      control: { type: 'text' },
      description: 'Custom text color',
    },
    borderColor: {
      control: { type: 'text' },
      description: 'Custom border color',
    },
    labelColor: {
      control: { type: 'text' },
      description: 'Custom label color',
    },
    descriptionColor: {
      control: { type: 'text' },
      description: 'Custom description color',
    },
    position: {
      control: { type: 'select' },
      options: ['bottom', 'top', 'left', 'right'],
      description: 'Position of the dropdown list',
    },
    width: {
      control: { type: 'text' },
      description: 'Custom width of the dropdown',
    },
    maxHeight: {
      control: { type: 'text' },
      description: 'Maximum height of the dropdown list',
    },
    searchable: {
      control: { type: 'boolean' },
      description: 'Enable search functionality',
    },
    clearable: {
      control: { type: 'boolean' },
      description: 'Show clear button when value is selected',
    },
    multiSelect: {
      control: { type: 'boolean' },
      description: 'Enable multiple selection',
    },
    maxSelections: {
      control: { type: 'number' },
      description: 'Maximum number of selections (multi-select only)',
    },
    hoverEffect: {
      control: { type: 'select' },
      options: ['none', 'lift', 'glow', 'scale'],
      description: 'Hover effect type',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disable the dropdown',
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
      <div style={{ padding: '2rem', minHeight: '400px' }}>
        <Story />
      </div>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

// Sample options
const sampleOptions: DropdownOption[] = [
  { label: 'Apple', value: 'apple', icon: '🍎' },
  { label: 'Banana', value: 'banana', icon: '🍌' },
  { label: 'Cherry', value: 'cherry', icon: '🍒' },
  { label: 'Date', value: 'date', icon: '📅' },
  { label: 'Elderberry', value: 'elderberry', icon: '🫐' },
  { label: 'Fig', value: 'fig', icon: '🌿' },
  { label: 'Grape', value: 'grape', icon: '🍇' },
  { label: 'Honeydew', value: 'honeydew', icon: '🍈' },
];

const countries: DropdownOption[] = [
  { label: 'United States', value: 'us', description: 'North America' },
  { label: 'Canada', value: 'ca', description: 'North America' },
  { label: 'United Kingdom', value: 'uk', description: 'Europe' },
  { label: 'Germany', value: 'de', description: 'Europe' },
  { label: 'France', value: 'fr', description: 'Europe' },
  { label: 'Japan', value: 'jp', description: 'Asia' },
  { label: 'Australia', value: 'au', description: 'Oceania' },
  { label: 'Brazil', value: 'br', description: 'South America' },
];

// ============================================================================
// BASIC FUNCTIONALITY STORIES
// ============================================================================

export const Basic: Story = {
  args: {
    options: sampleOptions,
    placeholder: 'Select a fruit...',
  },
};



export const MultiSelect: Story = {
  render: () => {
    const [values, setValues] = useState<string[]>([]);
    
    return (
      <Dropdown
        options={sampleOptions}
        value={values}
        onChange={(val) => setValues(val as string[])}
        placeholder="Select multiple fruits"
        multiSelect
        showOptionCount
      />
    );
  },
};

export const Searchable: Story = {
  render: () => {
    const [value, setValue] = useState<string>('');
    
    return (
      <Dropdown
        options={countries}
        value={value}
        onChange={(val) => setValue(val as string)}
        placeholder="Search countries..."
        searchable
        showOptionCount
      />
    );
  },
};

// ============================================================================
// VISUAL VARIANT STORIES
// ============================================================================

export const SizeVariants: Story = {
  render: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Dropdown
          options={sampleOptions}
          placeholder="Small dropdown"
          size="sm"
        onChange={() => {}}
        />
        <Dropdown
          options={sampleOptions}
        placeholder="Medium dropdown (default)"
          size="md"
        onChange={() => {}}
        />
        <Dropdown
          options={sampleOptions}
          placeholder="Large dropdown"
          size="lg"
        onChange={() => {}}
        />
      </div>
  ),
};

export const VisualVariants: Story = {
  render: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Dropdown
          options={sampleOptions}
          placeholder="Default variant"
          variant="default"
        onChange={() => {}}
        />
        <Dropdown
          options={sampleOptions}
          placeholder="Outline variant"
          variant="outline"
        onChange={() => {}}
        />
        <Dropdown
          options={sampleOptions}
          placeholder="Ghost variant"
          variant="ghost"
        onChange={() => {}}
        />
      </div>
  ),
};

export const Positioning: Story = {
  render: () => {
    const [value1, setValue1] = useState<string>('');
    const [value2, setValue2] = useState<string>('');
    const [value3, setValue3] = useState<string>('');
    const [value4, setValue4] = useState<string>('');
    
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem', alignItems: 'start' }}>
        <div>
          <h4 style={{ marginBottom: '0.5rem', fontSize: '14px', fontWeight: '500' }}>Bottom (default)</h4>
          <Dropdown
            options={sampleOptions}
            value={value1}
            onChange={(val) => setValue1(val as string)}
            placeholder="Bottom position"
            position="bottom"
          />
        </div>
        
        <div>
          <h4 style={{ marginBottom: '0.5rem', fontSize: '14px', fontWeight: '500' }}>Top</h4>
          <Dropdown
            options={sampleOptions}
            value={value2}
            onChange={(val) => setValue2(val as string)}
            placeholder="Top position"
            position="top"
          />
        </div>
        
        <div>
          <h4 style={{ marginBottom: '0.5rem', fontSize: '14px', fontWeight: '500' }}>Left</h4>
          <Dropdown
            options={sampleOptions}
            value={value3}
            onChange={(val) => setValue3(val as string)}
            placeholder="Left position"
            position="left"
          />
        </div>
        
        <div>
          <h4 style={{ marginBottom: '0.5rem', fontSize: '14px', fontWeight: '500' }}>Right</h4>
          <Dropdown
            options={sampleOptions}
            value={value4}
            onChange={(val) => setValue4(val as string)}
            placeholder="Right position"
            position="right"
          />
        </div>
      </div>
    );
  },
};

// ============================================================================
// ADVANCED FEATURE STORIES
// ============================================================================

export const CustomColors: Story = {
  render: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Dropdown
          options={sampleOptions}
          placeholder="Custom background color"
        gradient="#10b981"
        textColor="white"
        borderColor="#059669"
        onChange={() => {}}
        />
        <Dropdown
          options={sampleOptions}
          placeholder="Custom text color"
        textColor="#7c3aed"
        borderColor="#7c3aed"
        onChange={() => {}}
        />
        <Dropdown
          options={sampleOptions}
          placeholder="Custom border color"
        borderColor="#f59e0b"
        onChange={() => {}}
        />
      </div>
  ),
};

export const CustomWidth: Story = {
  render: () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Dropdown
          options={sampleOptions}
          placeholder="Narrow dropdown"
          width={150}
        onChange={() => {}}
      />
      <Dropdown
        options={sampleOptions}
        placeholder="Medium dropdown (default)"
        width={200}
        onChange={() => {}}
        />
        <Dropdown
          options={sampleOptions}
          placeholder="Wide dropdown"
        width={350}
        onChange={() => {}}
        />
        <Dropdown
          options={sampleOptions}
          placeholder="Full width dropdown"
          width="100%"
        onChange={() => {}}
        />
      </div>
  ),
};

export const CustomTrigger: Story = {
  render: () => {
    const [value, setValue] = useState<string>('');
    
    return (
      <Dropdown
        options={sampleOptions}
        value={value}
        onChange={(val) => setValue(val as string)}
        trigger={
          <div style={{ 
            padding: '12px 16px', 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
            color: 'white',
            borderRadius: '8px',
            cursor: 'pointer',
            textAlign: 'center',
            fontWeight: '500'
          }}>
            🎨 Custom Trigger Button
          </div>
        }
      />
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Dropdown
        options={sampleOptions}
        placeholder="Disabled dropdown"
        disabled
        onChange={() => {}}
      />
      <Dropdown
        options={sampleOptions}
        placeholder="Enabled dropdown"
        onChange={() => {}}
      />
    </div>
  ),
};

export const WithIconsAndDescriptions: Story = {
  render: () => {
    const [value, setValue] = useState<string>('');
    
    return (
      <Dropdown
        options={countries}
        value={value}
        onChange={(val) => setValue(val as string)}
        placeholder="Select a country with descriptions"
        showOptionCount
      />
    );
  },
};

// ============================================================================
// MULTI-SELECT AND ADVANCED FUNCTIONALITY STORIES
// ============================================================================

export const LimitedSelection: Story = {
  render: () => {
    const [values, setValues] = useState<string[]>([]);
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Dropdown
          options={sampleOptions}
          value={values}
          onChange={(val) => setValues(val as string[])}
          placeholder="Select up to 3 fruits"
          multiSelect
          maxSelections={3}
          showOptionCount
        />
        <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
          Try selecting more than 3 options - you'll see the limit in action!
        </p>
      </div>
    );
  },
};

export const OptionGroups: Story = {
  render: () => {
    const [value, setValue] = useState<string>('');
    
    const groupedOptions: DropdownOptionGroup[] = [
      {
        label: 'Fruits',
        value: 'fruits',
        options: [
          { label: 'Apple', value: 'apple', icon: '🍎' },
          { label: 'Banana', value: 'banana', icon: '🍌' },
          { label: 'Cherry', value: 'cherry', icon: '🍒' },
        ]
      },
      {
        label: 'Vegetables',
        value: 'vegetables',
        options: [
          { label: 'Carrot', value: 'carrot', icon: '🥕' },
          { label: 'Broccoli', value: 'broccoli', icon: '🥦' },
          { label: 'Spinach', value: 'spinach', icon: '🥬' },
        ]
      },
      {
        label: 'Grains',
        value: 'grains',
        options: [
          { label: 'Rice', value: 'rice', icon: '🍚' },
          { label: 'Bread', value: 'bread', icon: '🍞' },
          { label: 'Pasta', value: 'pasta', icon: '🍝' },
        ]
      }
    ];
    
    return (
      <Dropdown
        options={[]}
        optionGroups={groupedOptions}
        value={value}
        onChange={(val) => setValue(val as string)}
        placeholder="Select from grouped options"
        showOptionCount
      />
    );
  },
};

export const RandomSelectorAndSmartSelectAll: Story = {
  render: () => {
    const [selectedValues, setSelectedValues] = useState<Record<string, Array<string | number>>>({});
    
    const handleChange = (key: string) => (value: string | number | Array<string | number>) => {
      if (Array.isArray(value)) {
        setSelectedValues(prev => ({ ...prev, [key]: value }));
      }
    };

    // Extended options for better demonstration
    const extendedOptions: DropdownOption[] = [
      { label: 'Apple', value: 'apple', icon: '🍎' },
      { label: 'Banana', value: 'banana', icon: '🍌' },
      { label: 'Cherry', value: 'cherry', icon: '🍒' },
      { label: 'Date', value: 'date', icon: '📅' },
      { label: 'Elderberry', value: 'elderberry', icon: '🫐' },
      { label: 'Fig', value: 'fig', icon: '🌿' },
      { label: 'Grape', value: 'grape', icon: '🍇' },
      { label: 'Honeydew', value: 'honeydew', icon: '🍈' },
      { label: 'Kiwi', value: 'kiwi', icon: '🥝' },
      { label: 'Lemon', value: 'lemon', icon: '🍋' },
      { label: 'Mango', value: 'mango', icon: '🥭' },
      { label: 'Orange', value: 'orange', icon: '🍊' },
    ];
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>🎲 Random Selector & Smart Select All</h3>
        
        {/* No Selection Limit - Shows "Select All" */}
        <div>
          <h4 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '500', color: '#555' }}>No Selection Limit</h4>
          <div style={{ padding: '16px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
            <h5 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#666' }}>
              Shows "Select All" + "Random 3" (default)
            </h5>
            <Dropdown
              options={extendedOptions}
              value={selectedValues['no-limit'] || []}
              onChange={handleChange('no-limit')}
              placeholder="Select fruits (no limit)"
              multiSelect
              showOptionCount
              gradient="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
              textColor="white"
              shadow="md"
            />
          </div>
        </div>

        {/* Selection Limit - Shows "Select Top N" */}
        <div>
          <h4 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '500', color: '#555' }}>Selection Limit</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
            {[3, 5, 7].map((limit) => (
              <div key={limit} style={{ padding: '16px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
                <h5 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#666' }}>
                  Max {limit} selections
                </h5>
                <Dropdown
                  options={extendedOptions}
                  value={selectedValues[`limit-${limit}`] || []}
                  onChange={handleChange(`limit-${limit}`)}
                  placeholder={`Select up to ${limit} fruits`}
                  multiSelect
                  maxSelections={limit}
                  showOptionCount
                  background="linear-gradient(135deg, #ff6b6b 0%, #feca57 50%, #ff9ff3 100%)"
                  textColor="white"
                  shadow="md"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Random Selector Showcase */}
        <div>
          <h4 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '500', color: '#555' }}>🎲 Random Selector Features</h4>
          <div style={{ padding: '16px', border: '1px solid #e5e7eb', borderRadius: '8px', background: '#f8fafc' }}>
            <h5 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#666' }}>
              How Random Selector Works
            </h5>
            <div style={{ fontSize: '14px', color: '#475569', lineHeight: '1.5', marginBottom: '16px' }}>
              <p style={{ margin: '0 0 8px 0' }}>
                <strong>🎯 Smart Selection:</strong> Random selector automatically respects maxSelections limits
              </p>
              <p style={{ margin: '0 0 8px 0' }}>
                <strong>🎲 True Randomness:</strong> Uses Fisher-Yates shuffle algorithm for unbiased selection
              </p>
              <p style={{ margin: '0 0 8px 0' }}>
                <strong>⚡ Performance:</strong> Efficient random selection without affecting existing selections
              </p>
              <p style={{ margin: '0 0 0 0' }}>
                <strong>🔒 Disabled Options:</strong> Automatically excludes disabled options from random selection
              </p>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
              <Dropdown
                options={extendedOptions}
                value={selectedValues['random-demo'] || []}
                onChange={handleChange('random-demo')}
                placeholder="Try random selection!"
                multiSelect
                maxSelections={4}
                showOptionCount
                background="linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
                textColor="white"
                shadow="lg"
              />
            </div>
          </div>
        </div>

        {/* Button Logic Explanation */}
        <div>
          <h4 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '500', color: '#555' }}>🔍 Button Logic</h4>
          <div style={{ padding: '16px', border: '1px solid #e5e7eb', borderRadius: '8px', background: '#fef3c7' }}>
            <h5 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#92400e' }}>
              Smart Button Display Logic
            </h5>
            <div style={{ fontSize: '14px', color: '#92400e', lineHeight: '1.5' }}>
              <p style={{ margin: '0 0 8px 0' }}>
                <strong>✅ "Select All":</strong> Only shown when all options can be selected (no limit or limit ≥ total options)
              </p>
              <p style={{ margin: '0 0 8px 0' }}>
                <strong>🎯 "Select Top N":</strong> Shown when there's a selection limit and total options &gt; limit
              </p>
              <p style={{ margin: '0 0 8px 0' }}>
                <strong>🎲 "Random N":</strong> Always shown, automatically adjusts to maxSelections or defaults to 3
              </p>
              <p style={{ margin: '0 0 0 0' }}>
                <strong>🧹 "Clear All" & "Done":</strong> Always shown for multi-select dropdowns
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

// ============================================================================
// STYLING AND EFFECTS STORIES
// ============================================================================

export const GradientBackgrounds: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Dropdown
        options={sampleOptions}
        placeholder="Sunset gradient"
        gradient="linear-gradient(135deg, #ff6b6b 0%, #feca57 50%, #ff9ff3 100%)"
        textColor="white"
        borderColor="transparent"
        shadow="lg"
        borderRadius={12}
        onChange={() => {}}
      />
      <Dropdown
        options={sampleOptions}
        placeholder="Ocean gradient"
        gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        textColor="white"
        borderColor="transparent"
        shadow="lg"
        borderRadius={12}
        onChange={() => {}}
      />
      <Dropdown
        options={sampleOptions}
        placeholder="Forest gradient"
        gradient="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
        textColor="white"
        borderColor="transparent"
        shadow="lg"
        borderRadius={12}
        onChange={() => {}}
      />
      <Dropdown
        options={sampleOptions}
        placeholder="Sunrise gradient"
        gradient="linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
        textColor="white"
        borderColor="transparent"
        shadow="lg"
        borderRadius={12}
        onChange={() => {}}
      />
      <Dropdown
        options={sampleOptions}
        placeholder="Purple gradient"
        gradient="linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
        textColor="white"
        borderColor="transparent"
        shadow="lg"
        borderRadius={12}
        onChange={() => {}}
      />
      <Dropdown
        options={sampleOptions}
        placeholder="Gold gradient"
        gradient="linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)"
        textColor="white"
        borderColor="transparent"
        shadow="lg"
        borderRadius={12}
        onChange={() => {}}
      />
    </div>
  ),
};

export const AdvancedStyling: Story = {
  render: () => {
    const [value1, setValue1] = useState<string>('');
    const [value2, setValue2] = useState<string>('');
    const [value3, setValue3] = useState<string>('');
    
    const handleChange1 = (value: string | number | Array<string | number>) => {
      if (typeof value === 'string') setValue1(value);
    };
    const handleChange2 = (value: string | number | Array<string | number>) => {
      if (typeof value === 'string') setValue2(value);
    };
    const handleChange3 = (value: string | number | Array<string | number>) => {
      if (typeof value === 'string') setValue3(value);
    };
    
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Dropdown
            options={sampleOptions}
          placeholder="Custom background image..."
          backgroundImage="linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%), linear-gradient(-45deg, rgba(255,255,255,0.1) 25%, transparent 25%)"
          backgroundBlend="overlay"
          textColor="white"
          borderColor="rgba(255,255,255,0.3)"
          shadow="2xl"
          borderRadius={20}
          backdropBlur
            value={value1}
            onChange={handleChange1}
          />
          <Dropdown
            options={sampleOptions}
          placeholder="Custom shadow and border..."
          background="linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)"
          textColor="#8B4513"
          borderColor="#DAA520"
          shadow="2xl"
          borderRadius={25}
          width={300}
            value={value2}
            onChange={handleChange2}
          />
          <Dropdown
            options={sampleOptions}
          placeholder="Minimal with backdrop blur..."
          variant="ghost"
          background="rgba(255,255,255,0.1)"
          textColor="white"
          borderColor="rgba(255,255,255,0.2)"
          shadow="none"
          borderRadius={8}
          backdropBlur
          width={280}
            value={value3}
            onChange={handleChange3}
          />
      </div>
    );
  },
};

export const HoverEffects: Story = {
  render: () => {
    const [selectedValues, setSelectedValues] = useState<Record<string, string>>({});
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>✨ Hover Effects</h3>
        
        {/* Hover Effects */}
        <div>
          <h4 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '500', color: '#555' }}>Hover Effects</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
            {['none', 'lift', 'glow', 'scale'].map((effect) => (
              <div key={effect} style={{ padding: '16px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
                <h5 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#666', textTransform: 'capitalize' }}>
                  {effect} Effect
                </h5>
          <Dropdown
            options={sampleOptions}
                  value={selectedValues[`hover-${effect}`]}
                  onChange={(value) => setSelectedValues(prev => ({ ...prev, [`hover-${effect}`]: value as string }))}
                  placeholder={`${effect.charAt(0).toUpperCase() + effect.slice(1)} Hover Effect`}
                  hoverEffect={effect as any}
                  background="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                  textColor="white"
                  shadow="md"
          />
        </div>
            ))}
          </div>
        </div>

        {/* Shadow Levels with Hover Effects */}
        <div>
          <h4 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '500', color: '#555' }}>Shadow Levels with Hover Effects</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
            {['sm', 'md', 'lg', 'xl'].map((shadow) => (
              <div key={shadow} style={{ padding: '16px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
                <h5 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#666', textTransform: 'uppercase' }}>
                  {shadow} Shadow + Lift Effect
                </h5>
                <Dropdown
                  options={sampleOptions}
                  value={selectedValues[`shadow-${shadow}`]}
                  onChange={(value) => setSelectedValues(prev => ({ ...prev, [`shadow-${shadow}`]: value as string }))}
                  placeholder={`${shadow.toUpperCase()} Shadow + Lift`}
                  hoverEffect="lift"
                  shadow={shadow as any}
                  background="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
                  textColor="white"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Variants with Hover Effects */}
        <div>
          <h4 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '500', color: '#555' }}>Variants with Hover Effects</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
            {['default', 'outline', 'ghost'].map((variant) => (
              <div key={variant} style={{ padding: '16px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
                <h5 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#666', textTransform: 'capitalize' }}>
                  {variant} Variant + Glow Effect
                </h5>
                <Dropdown
                  options={sampleOptions}
                  value={selectedValues[`variant-${variant}`]}
                  onChange={(value) => setSelectedValues(prev => ({ ...prev, [`variant-${variant}`]: value as string }))}
                  placeholder={`${variant.charAt(0).toUpperCase() + variant.slice(1)} + Glow`}
                  variant={variant as any}
                  hoverEffect="glow"
                  shadow="lg"
                  background="linear-gradient(135deg, #ff6b6b 0%, #feca57 50%, #ff9ff3 100%)"
                  textColor="white"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
};

// ============================================================================
// STATE AND UTILITY STORIES
// ============================================================================

export const LoadingAndErrorStates: Story = {
  render: () => {
    const [value1, setValue1] = useState<string>('');
    const [value2, setValue2] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');
    
    const handleChange1 = (value: string | number | Array<string | number>) => {
      if (typeof value === 'string') setValue1(value);
    };
    const handleChange2 = (value: string | number | Array<string | number>) => {
      if (typeof value === 'string') setValue2(value);
    };

    // Simulate loading and error states
    React.useEffect(() => {
      const timer = setTimeout(() => {
        setLoading(false);
        setError('Failed to load options');
      }, 3000);
      return () => clearTimeout(timer);
    }, []);
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Dropdown
          options={sampleOptions}
          placeholder="Loading options..."
          loading={loading}
          showOptionCount
          background="linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
          textColor="white"
          borderColor="transparent"
          shadow="lg"
          borderRadius={12}
          value={value1}
          onChange={handleChange1}
        />
        <Dropdown
          options={sampleOptions}
          placeholder="Error state..."
          error={error}
          showOptionCount
          background="linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)"
          textColor="#8B4513"
          borderColor="transparent"
          shadow="md"
          borderRadius={12}
          value={value2}
          onChange={handleChange2}
        />
      </div>
    );
  },
};

// ============================================================================
// INTERACTIVE THEME BUILDER (ALWAYS LAST)
// ============================================================================

export const InteractiveThemeBuilder: Story = {
  render: () => {
    const [currentTheme, setCurrentTheme] = useState('default');
    const [selectedValues, setSelectedValues] = useState<Record<string, string | string[]>>({});
    
    // Background color states
    const [backgroundColor, setBackgroundColor] = useState('');
    const [backgroundColorGradient, setBackgroundColorGradient] = useState('');
    
    // Text color states
    const [textColor, setTextColor] = useState('');
    const [textColorGradient, setTextColorGradient] = useState('');
    
    // Border color states
    const [borderColor, setBorderColor] = useState('');
    const [borderColorGradient, setBorderColorGradient] = useState('');
    
    // Advanced color states (for Dropdown options)
    const [labelColor, setLabelColor] = useState('');
    const [labelColorGradient, setLabelColorGradient] = useState('');
    const [descriptionColor, setDescriptionColor] = useState('');
    const [descriptionColorGradient, setDescriptionColorGradient] = useState('');
    
    // Option background states
    const [optionBackground, setOptionBackground] = useState('');
    const [optionBackgroundGradient, setOptionBackgroundGradient] = useState('');
    const [optionHoverBackground, setOptionHoverBackground] = useState('');
    const [optionHoverBackgroundGradient, setOptionHoverBackgroundGradient] = useState('');
    const [optionSelectedBackground, setOptionSelectedBackground] = useState('');
    const [optionSelectedBackgroundGradient, setOptionSelectedBackgroundGradient] = useState('');
    
    // Gradient builder states
    const [gradientType, setGradientType] = useState('linear');
    const [gradientDirection, setGradientDirection] = useState('90deg');
    const [gradientColors, setGradientColors] = useState(['#f43f5e', '#3b82f6']);
    
    const availableThemes = themes;

    // Gradient presets
    const gradientPresets = {
      'gradient-sunset': 'linear-gradient(135deg, #ff6b6b 0%, #feca57 50%, #ff9ff3 100%)',
      'gradient-ocean': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'gradient-forest': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'gradient-sunrise': 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      'gradient-purple': 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      'gradient-gold': 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    };

    // Utility functions
    const applyTheme = (themeName: string) => {
      const theme = availableThemes[themeName as keyof typeof availableThemes];
      if (theme) {
        Object.entries(theme).forEach(([key, value]) => {
          document.documentElement.style.setProperty(`--${key}`, String(value));
        });
        setCurrentTheme(themeName);
      }
    };

    const addColor = () => {
      setGradientColors([...gradientColors, '#000000']);
    };

    const removeColor = (index: number) => {
      setGradientColors(gradientColors.filter((_, i) => i !== index));
    };

    const updateColor = (index: number, color: string) => {
      const newColors = [...gradientColors];
      newColors[index] = color;
      setGradientColors(newColors);
    };

    const generateGradient = () => {
      if (gradientColors.length < 2) return '';
      const colors = gradientColors.join(', ');
      
      let gradient = '';
      if (gradientType === 'linear') {
        gradient = `linear-gradient(${gradientDirection}, ${colors})`;
      } else if (gradientType === 'radial') {
        // For radial gradients, direction should be like "circle at center" or "ellipse at top left"
        const direction = gradientDirection || 'circle at center';
        gradient = `radial-gradient(${direction}, ${colors})`;
      } else if (gradientType === 'conic') {
        // For conic gradients, direction should be like "from 0deg at center"
        const direction = gradientDirection || 'from 0deg at center';
        gradient = `conic-gradient(${direction}, ${colors})`;
      }
      
      return gradient;
    };

    const applyGradientToTarget = (target: string) => {
      const gradient = generateGradient();
      if (!gradient) return;
      
      switch (target) {
        case 'background':
          setBackgroundColorGradient(gradient);
          setBackgroundColor('');
          break;
        case 'text':
          setTextColorGradient(gradient);
          setTextColor('');
          break;
        case 'border':
          setBorderColorGradient(gradient);
          setBorderColor('');
          break;
        case 'label':
          setLabelColorGradient(gradient);
          setLabelColor('');
          break;
        case 'description':
          setDescriptionColorGradient(gradient);
          setDescriptionColor('');
          break;
        case 'optionBackground':
          setOptionBackgroundGradient(gradient);
          setOptionBackground('');
          break;
        case 'optionHoverBackground':
          setOptionHoverBackgroundGradient(gradient);
          setOptionHoverBackground('');
          break;
        case 'optionSelectedBackground':
          setOptionSelectedBackgroundGradient(gradient);
          setOptionSelectedBackground('');
          break;
      }
    };

    const resetCustomStyling = () => {
      setBackgroundColor('');
      setBackgroundColorGradient('');
      setTextColor('');
      setTextColorGradient('');
      setBorderColor('');
      setBorderColorGradient('');
      setLabelColor('');
      setLabelColorGradient('');
      setDescriptionColor('');
      setDescriptionColorGradient('');
      setOptionBackground('');
      setOptionBackgroundGradient('');
      setOptionHoverBackground('');
      setOptionHoverBackgroundGradient('');
      setOptionSelectedBackground('');
      setOptionSelectedBackgroundGradient('');
    };

    const advancedOptionGroups = [
      {
        label: 'Frontend Technologies',
        value: 'frontend',
        description: 'Client-side development tools and frameworks',
        icon: '🌐',
        options: [
          { 
            label: 'React', 
            value: 'react', 
            description: 'A JavaScript library for building user interfaces',
            icon: '⚛️'
          },
          { 
            label: 'Vue.js', 
            value: 'vue', 
            description: 'Progressive JavaScript framework',
            icon: '💚'
          },
          { 
            label: 'Angular', 
            value: 'angular', 
            description: 'Platform for building mobile and desktop web applications',
            icon: '🅰️'
          }
        ]
      },
      {
        label: 'Backend Technologies',
        value: 'backend',
        description: 'Server-side development languages and frameworks',
        icon: '⚙️',
        options: [
          { 
            label: 'Node.js', 
            value: 'nodejs', 
            description: 'JavaScript runtime built on Chrome\'s V8 engine',
            icon: '🟢'
          },
          { 
            label: 'Python', 
            value: 'python', 
            description: 'High-level programming language with dynamic semantics',
            icon: '🐍'
          },
          { 
            label: 'Go', 
            value: 'go', 
            description: 'Open source programming language by Google',
            icon: '🐹'
          }
        ]
      },
      {
        label: 'Design Tools',
        value: 'design',
        description: 'UI/UX design and prototyping applications',
        icon: '🎨',
        options: [
          { 
            label: 'Figma', 
            value: 'figma', 
            description: 'Collaborative interface design tool',
            icon: '🎨'
          },
          { 
            label: 'Sketch', 
            value: 'sketch', 
            description: 'Digital design toolkit for Mac',
            icon: '✏️'
          },
          { 
            label: 'Adobe XD', 
            value: 'adobe-xd', 
            description: 'User experience design and prototyping tool',
            icon: '🎯'
          }
        ]
      },
      {
        label: 'Databases',
        value: 'database',
        description: 'Data storage and management systems',
        icon: '🗄️',
        options: [
          { 
            label: 'PostgreSQL', 
            value: 'postgresql', 
            description: 'Advanced open source relational database',
            icon: '🐘'
          },
          { 
            label: 'MongoDB', 
            value: 'mongodb', 
            description: 'Document-oriented NoSQL database',
            icon: '🍃'
          },
          { 
            label: 'Redis', 
            value: 'redis', 
            description: 'In-memory data structure store',
            icon: '🔴'
          }
        ]
      },
      {
        label: 'DevOps & Cloud',
        value: 'devops',
        description: 'Deployment, infrastructure, and cloud services',
        icon: '☁️',
        options: [
          { 
            label: 'Docker', 
            value: 'docker', 
            description: 'Containerization platform',
            icon: '🐳'
          },
          { 
            label: 'Kubernetes', 
            value: 'kubernetes', 
            description: 'Container orchestration system',
            icon: '⚓'
          },
          { 
            label: 'AWS', 
            value: 'aws', 
            description: 'Amazon Web Services cloud platform',
            icon: '☁️'
          }
        ]
      }
    ];
    
    return (
      <ThemeProvider theme={availableThemes[currentTheme as keyof typeof availableThemes]}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: 'var(--color-text)' }}>🎨 Interactive Theme Builder</h3>
        
        {/* Theme Switcher */}
        <div>
          <h4 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '500', color: '#555' }}>🎯 Theme Switcher</h4>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            {Object.keys(availableThemes).map((themeName) => (
              <Button
                key={themeName}
                onClick={() => applyTheme(themeName)}
                variant={currentTheme === themeName ? 'primary' : 'outline'}
                size="sm"
              >
                {themeName}
              </Button>
            ))}
        </div>
        
          {/* Live Preview */}
          <div style={{ marginBottom: '24px' }}>
            <h5 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#666' }}>👁️ Live Preview</h5>
            <div style={{ padding: '16px', border: '1px solid #e5e7eb', borderRadius: '8px', background: '#f9fafb' }}>
              <Dropdown
                optionGroups={advancedOptionGroups}
                value={selectedValues['live-preview']}
                onChange={(value) => setSelectedValues(prev => ({ ...prev, 'live-preview': value as string | string[] }))}
                placeholder="🚀 Advanced Dropdown - Try multiselect, search, and categories!"
                multiSelect={true}
                searchable={true}
                showOptionCount={true}
                background={backgroundColorGradient.trim() || backgroundColor.trim() || undefined}
                textColor={textColorGradient.trim() || textColor.trim() || undefined}
                borderColor={borderColorGradient.trim() || borderColor.trim() || undefined}
                labelColor={labelColorGradient.trim() || labelColor.trim() || undefined}
                descriptionColor={descriptionColorGradient.trim() || descriptionColor.trim() || undefined}
                optionBackground={optionBackgroundGradient.trim() || optionBackground.trim() || undefined}
                optionHoverBackground={optionHoverBackgroundGradient.trim() || optionHoverBackground.trim() || undefined}
                optionSelectedBackground={optionSelectedBackgroundGradient.trim() || optionSelectedBackground.trim() || undefined}
                shadow="md"
                borderRadius={8}
                size="lg"
              />
            </div>
          </div>
        </div>
        
        {/* Advanced Gradient Builder */}
        <div style={{ 
          background: 'var(--color-background)', 
          border: '1px solid var(--color-border)', 
          borderRadius: '8px', 
          padding: '20px',
          marginBottom: '20px'
        }}>
          <h4 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600', color: 'var(--color-text)' }}>
            🌈 Advanced Gradient Builder
          </h4>
          
          {/* Gradient Type Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <label style={{ fontSize: '14px', minWidth: '80px', color: 'var(--color-text)' }}>Type:</label>
            <select 
              value={gradientType} 
              onChange={(e) => {
                const newType = e.target.value;
                setGradientType(newType);
                // Set appropriate default direction for each gradient type
                if (newType === 'linear') {
                  setGradientDirection('90deg');
                } else if (newType === 'radial') {
                  setGradientDirection('circle at center');
                } else if (newType === 'conic') {
                  setGradientDirection('from 0deg at center');
                }
              }}
              style={{ 
                padding: '8px', 
                border: '1px solid var(--color-border)', 
                borderRadius: '4px', 
                fontSize: '14px',
                background: 'var(--color-background)',
                color: 'var(--color-text)'
              }}
            >
              <option value="linear">Linear</option>
              <option value="radial">Radial</option>
              <option value="conic">Conic</option>
            </select>
            
            <label style={{ fontSize: '14px', minWidth: '80px', color: 'var(--color-text)' }}>Direction:</label>
            <input
              type="text"
              value={gradientDirection}
              onChange={(e) => setGradientDirection(e.target.value)}
              style={{ 
                width: '120px', 
                padding: '8px', 
                border: '1px solid var(--color-border)', 
                borderRadius: '4px', 
                fontSize: '14px',
                background: 'var(--color-background)',
                color: 'var(--color-text)'
              }}
              placeholder={
                gradientType === 'linear' ? '90deg' :
                gradientType === 'radial' ? 'circle at center' :
                'from 0deg at center'
              }
            />
          </div>
          
          {/* Color Management */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <label style={{ fontSize: '14px', minWidth: '80px', color: 'var(--color-text)' }}>Colors:</label>
              <button
                onClick={addColor}
                style={{
                  padding: '4px 8px',
                  border: '1px solid var(--color-border)',
                  borderRadius: '4px',
                  background: 'var(--color-background)',
                  color: 'var(--color-text)',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                + Add Color
              </button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
              {gradientColors.map((color, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => updateColor(index, e.target.value)}
                    style={{ width: '40px', height: '30px', border: '1px solid var(--color-border)', borderRadius: '4px' }}
                  />
                  <button
                    onClick={() => removeColor(index)}
                    style={{
                      padding: '2px 6px',
                      border: '1px solid var(--color-border)',
                      borderRadius: '4px',
                      background: 'var(--color-background)',
                      color: 'var(--color-text)',
                      cursor: 'pointer',
                      fontSize: '10px'
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          {/* Gradient Preview */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '14px', display: 'block', marginBottom: '4px', color: 'var(--color-text)' }}>Preview:</label>
            <div 
              style={{ 
                width: '100%', 
                height: '60px', 
                background: generateGradient() || 'linear-gradient(90deg, #f43f5e 0%, #3b82f6 100%)', 
                border: '1px solid var(--color-border)', 
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '12px',
                textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
              }}
            >
              {generateGradient() || 'linear-gradient(90deg, #f43f5e 0%, #3b82f6 100%)'}
            </div>
          </div>
          
          {/* Apply to Target */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '14px', display: 'block', marginBottom: '8px', color: 'var(--color-text)' }}>Apply to:</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              <button
                onClick={() => applyGradientToTarget('background')}
                style={{
                  padding: '6px 12px',
                  border: '1px solid var(--color-border)',
                  borderRadius: '4px',
                  background: 'var(--color-background)',
                  color: 'var(--color-text)',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                Background
              </button>
              <button
                onClick={() => applyGradientToTarget('text')}
                style={{
                  padding: '6px 12px',
                  border: '1px solid var(--color-border)',
                  borderRadius: '4px',
                  background: 'var(--color-background)',
                  color: 'var(--color-text)',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                Text
              </button>
              <button
                onClick={() => applyGradientToTarget('border')}
                style={{
                  padding: '6px 12px',
                  border: '1px solid var(--color-border)',
                  borderRadius: '4px',
                  background: 'var(--color-background)',
                  color: 'var(--color-text)',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                Border
              </button>
              <button
                onClick={() => applyGradientToTarget('label')}
                style={{
                  padding: '6px 12px',
                  border: '1px solid var(--color-border)',
                  borderRadius: '4px',
                  background: 'var(--color-background)',
                  color: 'var(--color-text)',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                Label
              </button>
              <button
                onClick={() => applyGradientToTarget('description')}
                style={{
                  padding: '6px 12px',
                  border: '1px solid var(--color-border)',
                  borderRadius: '4px',
                  background: 'var(--color-background)',
                  color: 'var(--color-text)',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                Description
              </button>
              
              <button
                onClick={() => applyGradientToTarget('optionBackground')}
                style={{
                  padding: '6px 12px',
                  border: '1px solid var(--color-border)',
                  borderRadius: '4px',
                  background: 'var(--color-background)',
                  color: 'var(--color-text)',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                Option Background
              </button>
              
              <button
                onClick={() => applyGradientToTarget('optionHoverBackground')}
                style={{
                  padding: '6px 12px',
                  border: '1px solid var(--color-border)',
                  borderRadius: '4px',
                  background: 'var(--color-background)',
                  color: 'var(--color-text)',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                Option Hover
              </button>
              
              <button
                onClick={() => applyGradientToTarget('optionSelectedBackground')}
                style={{
                  padding: '6px 12px',
                  border: '1px solid var(--color-border)',
                  borderRadius: '4px',
                  background: 'var(--color-background)',
                  color: 'var(--color-text)',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                Option Selected
              </button>
            </div>
          </div>
        </div>
        
        {/* Comprehensive Color Controls */}
        <div style={{ 
          background: 'var(--color-background)', 
          border: '1px solid var(--color-border)', 
          borderRadius: '8px', 
          padding: '20px',
          marginBottom: '20px'
        }}>
          <h4 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600', color: 'var(--color-text)' }}>
            🎨 Comprehensive Color Controls
          </h4>
          
          {/* Background Colors */}
          <div style={{ marginBottom: '24px' }}>
            <h5 style={{ marginBottom: '16px', fontSize: '14px', fontWeight: '600', color: 'var(--color-text)' }}>🎨 Background Colors</h5>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Background Color:</label>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <input
                    type="color"
                    value={backgroundColor || '#ffffff'}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    style={{ width: '40px', height: '32px', border: '1px solid var(--color-border)', borderRadius: '4px', cursor: 'pointer' }}
                  />
                  <input
                    type="text"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    placeholder="e.g., #ff0000 or red"
                    style={{
                      flex: 1,
                      padding: '6px 8px',
                      border: '1px solid var(--color-border)',
                      borderRadius: '4px',
                      background: 'var(--color-background)',
                      color: 'var(--color-text)',
                      fontSize: '12px'
                    }}
                  />
                  <button
                    onClick={() => { setBackgroundColor(''); setBackgroundColorGradient(''); }}
                    style={{
                      padding: '6px 8px',
                      border: '1px solid var(--color-border)',
                      borderRadius: '4px',
                      background: 'var(--color-background)',
                      color: 'var(--color-text)',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    Reset
                  </button>
                </div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Background Gradient:</label>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <input
                    type="text"
                    value={backgroundColorGradient}
                    onChange={(e) => setBackgroundColorGradient(e.target.value)}
                    placeholder="e.g., linear-gradient(45deg, #ff0000, #00ff00)"
                    style={{
                      flex: 1,
                      padding: '6px 8px',
                      border: '1px solid var(--color-border)',
                      borderRadius: '4px',
                      background: 'var(--color-background)',
                      color: 'var(--color-text)',
                      fontSize: '12px'
                    }}
                  />
                  <button
                    onClick={() => setBackgroundColorGradient('')}
                    style={{
                      padding: '6px 8px',
                      border: '1px solid var(--color-border)',
                      borderRadius: '4px',
                      background: 'var(--color-background)',
                      color: 'var(--color-text)',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Text Colors */}
          <div style={{ marginBottom: '24px' }}>
            <h5 style={{ marginBottom: '16px', fontSize: '14px', fontWeight: '600', color: 'var(--color-text)' }}>📝 Text Colors</h5>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Text Color:</label>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <input
                    type="color"
                    value={textColor || '#333333'}
                    onChange={(e) => setTextColor(e.target.value)}
                    style={{ width: '40px', height: '32px', border: '1px solid var(--color-border)', borderRadius: '4px', cursor: 'pointer' }}
                  />
                  <input
                    type="text"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    placeholder="e.g., #ff0000 or red"
                    style={{
                      flex: 1,
                      padding: '6px 8px',
                      border: '1px solid var(--color-border)',
                      borderRadius: '4px',
                      background: 'var(--color-background)',
                      color: 'var(--color-text)',
                      fontSize: '12px'
                    }}
                  />
                  <button
                    onClick={() => { setTextColor(''); setTextColorGradient(''); }}
                    style={{
                      padding: '6px 8px',
                      border: '1px solid var(--color-border)',
                      borderRadius: '4px',
                      background: 'var(--color-background)',
                      color: 'var(--color-text)',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    Reset
                  </button>
                </div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Text Gradient:</label>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <input
                    type="text"
                    value={textColorGradient}
                    onChange={(e) => setTextColorGradient(e.target.value)}
                    placeholder="e.g., linear-gradient(45deg, #ff0000, #00ff00)"
                    style={{
                      flex: 1,
                      padding: '6px 8px',
                      border: '1px solid var(--color-border)',
                      borderRadius: '4px',
                      background: 'var(--color-background)',
                      color: 'var(--color-text)',
                      fontSize: '12px'
                    }}
                  />
                  <button
                    onClick={() => setTextColorGradient('')}
                    style={{
                      padding: '6px 8px',
                      border: '1px solid var(--color-border)',
                      borderRadius: '4px',
                      background: 'var(--color-background)',
                      color: 'var(--color-text)',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    Reset
                  </button>
                </div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Label Color:</label>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <input
                    type="color"
                    value={labelColor || '#333333'}
                    onChange={(e) => setLabelColor(e.target.value)}
                    style={{ width: '40px', height: '32px', border: '1px solid var(--color-border)', borderRadius: '4px', cursor: 'pointer' }}
                  />
                  <input
                    type="text"
                    value={labelColor}
                    onChange={(e) => setLabelColor(e.target.value)}
                    placeholder="e.g., #ff0000 or red"
                    style={{
                      flex: 1,
                      padding: '6px 8px',
                      border: '1px solid var(--color-border)',
                      borderRadius: '4px',
                      background: 'var(--color-background)',
                      color: 'var(--color-text)',
                      fontSize: '12px'
                    }}
                  />
                  <button
                    onClick={() => { setLabelColor(''); setLabelColorGradient(''); }}
                    style={{
                      padding: '6px 8px',
                      border: '1px solid var(--color-border)',
                      borderRadius: '4px',
                      background: 'var(--color-background)',
                      color: 'var(--color-text)',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    Reset
                  </button>
                </div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Label Gradient:</label>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <input
                    type="text"
                    value={labelColorGradient}
                    onChange={(e) => setLabelColorGradient(e.target.value)}
                    placeholder="e.g., linear-gradient(45deg, #ff0000, #00ff00)"
                    style={{
                      flex: 1,
                      padding: '6px 8px',
                      border: '1px solid var(--color-border)',
                      borderRadius: '4px',
                      background: 'var(--color-background)',
                      color: 'var(--color-text)',
                      fontSize: '12px'
                    }}
                  />
                  <button
                    onClick={() => setLabelColorGradient('')}
                    style={{
                      padding: '6px 8px',
                      border: '1px solid var(--color-border)',
                      borderRadius: '4px',
                      background: 'var(--color-background)',
                      color: 'var(--color-text)',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    Reset
                  </button>
                </div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Description Color:</label>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <input
                    type="color"
                    value={descriptionColor || '#666666'}
                    onChange={(e) => setDescriptionColor(e.target.value)}
                    style={{ width: '40px', height: '32px', border: '1px solid var(--color-border)', borderRadius: '4px', cursor: 'pointer' }}
                  />
                  <input
                    type="text"
                    value={descriptionColor}
                    onChange={(e) => setDescriptionColor(e.target.value)}
                    placeholder="e.g., #ff0000 or red"
                    style={{
                      flex: 1,
                      padding: '6px 8px',
                      border: '1px solid var(--color-border)',
                      borderRadius: '4px',
                      background: 'var(--color-background)',
                      color: 'var(--color-text)',
                      fontSize: '12px'
                    }}
                  />
                  <button
                    onClick={() => { setDescriptionColor(''); setDescriptionColorGradient(''); }}
                    style={{
                      padding: '6px 8px',
                      border: '1px solid var(--color-border)',
                      borderRadius: '4px',
                      background: 'var(--color-background)',
                      color: 'var(--color-text)',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    Reset
                  </button>
                </div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Description Gradient:</label>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <input
                    type="text"
                    value={descriptionColorGradient}
                    onChange={(e) => setDescriptionColorGradient(e.target.value)}
                    placeholder="e.g., linear-gradient(45deg, #ff0000, #00ff00)"
                    style={{
                      flex: 1,
                      padding: '6px 8px',
                      border: '1px solid var(--color-border)',
                      borderRadius: '4px',
                      background: 'var(--color-background)',
                      color: 'var(--color-text)',
                      fontSize: '12px'
                    }}
                  />
                  <button
                    onClick={() => setDescriptionColorGradient('')}
                    style={{
                      padding: '6px 8px',
                      border: '1px solid var(--color-border)',
                      borderRadius: '4px',
                      background: 'var(--color-background)',
                      color: 'var(--color-text)',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Option Background Colors */}
          <div style={{ marginBottom: '24px' }}>
            <h5 style={{ marginBottom: '16px', fontSize: '14px', fontWeight: '600', color: 'var(--color-text)' }}>📋 Option Background Colors</h5>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Option Background:</label>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <input
                    type="color"
                    value={optionBackground || '#ffffff'}
                    onChange={(e) => setOptionBackground(e.target.value)}
                    style={{ width: '40px', height: '32px', border: '1px solid var(--color-border)', borderRadius: '4px', cursor: 'pointer' }}
                  />
                  <input
                    type="text"
                    value={optionBackground}
                    onChange={(e) => setOptionBackground(e.target.value)}
                    placeholder="e.g., #ff0000 or red"
                    style={{
                      flex: 1,
                      padding: '6px 8px',
                      border: '1px solid var(--color-border)',
                      borderRadius: '4px',
                      background: 'var(--color-background)',
                      color: 'var(--color-text)',
                      fontSize: '12px'
                    }}
                  />
                  <button
                    onClick={() => { setOptionBackground(''); setOptionBackgroundGradient(''); }}
                    style={{
                      padding: '6px 8px',
                      border: '1px solid var(--color-border)',
                      borderRadius: '4px',
                      background: 'var(--color-background)',
                      color: 'var(--color-text)',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    Reset
                  </button>
                </div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Option Background Gradient:</label>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <input
                    type="text"
                    value={optionBackgroundGradient}
                    onChange={(e) => setOptionBackgroundGradient(e.target.value)}
                    placeholder="e.g., linear-gradient(45deg, #ff0000, #00ff00)"
                    style={{
                      flex: 1,
                      padding: '6px 8px',
                      border: '1px solid var(--color-border)',
                      borderRadius: '4px',
                      background: 'var(--color-background)',
                      color: 'var(--color-text)',
                      fontSize: '12px'
                    }}
                  />
                  <button
                    onClick={() => setOptionBackgroundGradient('')}
                    style={{
                      padding: '6px 8px',
                      border: '1px solid var(--color-border)',
                      borderRadius: '4px',
                      background: 'var(--color-background)',
                      color: 'var(--color-text)',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    Reset
                  </button>
                </div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Option Hover Background:</label>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <input
                    type="color"
                    value={optionHoverBackground || '#f0f0f0'}
                    onChange={(e) => setOptionHoverBackground(e.target.value)}
                    style={{ width: '40px', height: '32px', border: '1px solid var(--color-border)', borderRadius: '4px', cursor: 'pointer' }}
                  />
                  <input
                    type="text"
                    value={optionHoverBackground}
                    onChange={(e) => setOptionHoverBackground(e.target.value)}
                    placeholder="e.g., #ff0000 or red"
                    style={{
                      flex: 1,
                      padding: '6px 8px',
                      border: '1px solid var(--color-border)',
                      borderRadius: '4px',
                      background: 'var(--color-background)',
                      color: 'var(--color-text)',
                      fontSize: '12px'
                    }}
                  />
                  <button
                    onClick={() => { setOptionHoverBackground(''); setOptionHoverBackgroundGradient(''); }}
                    style={{
                      padding: '6px 8px',
                      border: '1px solid var(--color-border)',
                      borderRadius: '4px',
                      background: 'var(--color-background)',
                      color: 'var(--color-text)',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    Reset
                  </button>
                </div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Option Hover Background Gradient:</label>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <input
                    type="text"
                    value={optionHoverBackgroundGradient}
                    onChange={(e) => setOptionHoverBackgroundGradient(e.target.value)}
                    placeholder="e.g., linear-gradient(45deg, #ff0000, #00ff00)"
                    style={{
                      flex: 1,
                      padding: '6px 8px',
                      border: '1px solid var(--color-border)',
                      borderRadius: '4px',
                      background: 'var(--color-background)',
                      color: 'var(--color-text)',
                      fontSize: '12px'
                    }}
                  />
                  <button
                    onClick={() => setOptionHoverBackgroundGradient('')}
                    style={{
                      padding: '6px 8px',
                      border: '1px solid var(--color-border)',
                      borderRadius: '4px',
                      background: 'var(--color-background)',
                      color: 'var(--color-text)',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    Reset
                  </button>
                </div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Option Selected Background:</label>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <input
                    type="color"
                    value={optionSelectedBackground || '#e3f2fd'}
                    onChange={(e) => setOptionSelectedBackground(e.target.value)}
                    style={{ width: '40px', height: '32px', border: '1px solid var(--color-border)', borderRadius: '4px', cursor: 'pointer' }}
                  />
                  <input
                    type="text"
                    value={optionSelectedBackground}
                    onChange={(e) => setOptionSelectedBackground(e.target.value)}
                    placeholder="e.g., #ff0000 or red"
                    style={{
                      flex: 1,
                      padding: '6px 8px',
                      border: '1px solid var(--color-border)',
                      borderRadius: '4px',
                      background: 'var(--color-background)',
                      color: 'var(--color-text)',
                      fontSize: '12px'
                    }}
                  />
                  <button
                    onClick={() => { setOptionSelectedBackground(''); setOptionSelectedBackgroundGradient(''); }}
                    style={{
                      padding: '6px 8px',
                      border: '1px solid var(--color-border)',
                      borderRadius: '4px',
                      background: 'var(--color-background)',
                      color: 'var(--color-text)',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    Reset
                  </button>
                </div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Option Selected Background Gradient:</label>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <input
                    type="text"
                    value={optionSelectedBackgroundGradient}
                    onChange={(e) => setOptionSelectedBackgroundGradient(e.target.value)}
                    placeholder="e.g., linear-gradient(45deg, #ff0000, #00ff00)"
                    style={{
                      flex: 1,
                      padding: '6px 8px',
                      border: '1px solid var(--color-border)',
                      borderRadius: '4px',
                      background: 'var(--color-background)',
                      color: 'var(--color-text)',
                      fontSize: '12px'
                    }}
                  />
                  <button
                    onClick={() => setOptionSelectedBackgroundGradient('')}
                    style={{
                      padding: '6px 8px',
                      border: '1px solid var(--color-border)',
                      borderRadius: '4px',
                      background: 'var(--color-background)',
                      color: 'var(--color-text)',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Border Colors */}
          <div style={{ marginBottom: '24px' }}>
            <h5 style={{ marginBottom: '16px', fontSize: '14px', fontWeight: '600', color: 'var(--color-text)' }}>🔲 Border Colors</h5>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Border Color:</label>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <input
                    type="color"
                    value={borderColor || '#dddddd'}
                    onChange={(e) => setBorderColor(e.target.value)}
                    style={{ width: '40px', height: '32px', border: '1px solid var(--color-border)', borderRadius: '4px', cursor: 'pointer' }}
                  />
                  <input
                    type="text"
                    value={borderColor}
                    onChange={(e) => setBorderColor(e.target.value)}
                    placeholder="e.g., #ff0000 or red"
                    style={{
                      flex: 1,
                      padding: '6px 8px',
                      border: '1px solid var(--color-border)',
                      borderRadius: '4px',
                      background: 'var(--color-background)',
                      color: 'var(--color-text)',
                      fontSize: '12px'
                    }}
                  />
                  <button
                    onClick={() => { setBorderColor(''); setBorderColorGradient(''); }}
                    style={{
                      padding: '6px 8px',
                      border: '1px solid var(--color-border)',
                      borderRadius: '4px',
                      background: 'var(--color-background)',
                      color: 'var(--color-text)',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    Reset
                  </button>
                </div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Border Gradient:</label>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <input
                    type="text"
                    value={borderColorGradient}
                    onChange={(e) => setBorderColorGradient(e.target.value)}
                    placeholder="e.g., linear-gradient(45deg, #ff0000, #00ff00)"
                    style={{
                      flex: 1,
                      padding: '6px 8px',
                      border: '1px solid var(--color-border)',
                      borderRadius: '4px',
                      background: 'var(--color-background)',
                      color: 'var(--color-text)',
                      fontSize: '12px'
                    }}
                  />
                  <button
                    onClick={() => setBorderColorGradient('')}
                    style={{
                      padding: '6px 8px',
                      border: '1px solid var(--color-border)',
                      borderRadius: '4px',
                      background: 'var(--color-background)',
                      color: 'var(--color-text)',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Global Reset Button */}
          <div style={{ marginBottom: '20px', textAlign: 'center' }}>
            <button
              onClick={resetCustomStyling}
              style={{
                padding: '12px 24px',
                border: '1px solid var(--color-border)',
                borderRadius: '6px',
                background: 'var(--color-background)',
                color: '#dc2626',
                fontSize: '14px',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              🔄 Reset All Custom Styling
            </button>
          </div>
        </div>
          

      </div>
      </ThemeProvider>
    );
  },
};