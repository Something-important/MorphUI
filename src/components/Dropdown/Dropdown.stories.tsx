import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown, DropdownOption, DropdownOptionGroup } from './Dropdown';
import { ThemeProvider } from '../theme/ThemeProvider';

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

export const SingleSelect: Story = {
  render: () => {
    const [value, setValue] = useState<string>('');
    
    return (
      <Dropdown
        options={sampleOptions}
        value={value}
        onChange={(val) => setValue(val as string)}
        placeholder="Choose your favorite fruit"
      />
    );
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
    const [customColor, setCustomColor] = useState('#10b981');
    const [customGradient, setCustomGradient] = useState('linear-gradient(90deg, #f43f5e 0%, #3b82f6 100%)');
    const [gradientType, setGradientType] = useState('linear');
    const [gradientDirection, setGradientDirection] = useState('90deg');
    const [gradientColors, setGradientColors] = useState(['#f43f5e', '#3b82f6']);
    const [selectedValues, setSelectedValues] = useState<Record<string, string>>({});
    
    // Theme definitions
    const themes = {
      default: {},
      dark: {
        '--color-background': '#1f2937',
        '--color-text': '#f9fafb',
        '--color-border': '#374151',
        '--color-primary': '#3b82f6',
        '--color-success': '#10b981',
        '--color-warning': '#f59e0b',
        '--color-danger': '#ef4444',
        '--color-info': '#06b6d4',
        '--color-secondary': '#6b7280',
      },
      warm: {
        '--color-background': '#fef3c7',
        '--color-text': '#92400e',
        '--color-border': '#f59e0b',
        '--color-primary': '#ea580c',
        '--color-success': '#16a34a',
        '--color-warning': '#d97706',
        '--color-danger': '#dc2626',
        '--color-info': '#0891b2',
        '--color-secondary': '#a16207',
      },
      cool: {
        '--color-background': '#dbeafe',
        '--color-text': '#1e40af',
        '--color-border': '#3b82f6',
        '--color-primary': '#2563eb',
        '--color-success': '#059669',
        '--color-warning': '#d97706',
        '--color-danger': '#dc2626',
        '--color-info': '#0891b2',
        '--color-secondary': '#475569',
      },
    };

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
      const theme = themes[themeName as keyof typeof themes];
        Object.entries(theme).forEach(([key, value]) => {
          document.documentElement.style.setProperty(key, value);
        });
        setCurrentTheme(themeName);
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
      if (gradientColors.length < 2) return;
      const gradient = `${gradientType}-gradient(${gradientDirection}, ${gradientColors.join(', ')})`;
      setCustomGradient(gradient);
    };

    const defaultOptions = [
      { label: 'Option 1', value: 'option1', description: 'First option with description' },
      { label: 'Option 2', value: 'option2', description: 'Second option with description' },
      { label: 'Option 3', value: 'option3', description: 'Third option with description' },
    ];
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>🎨 Interactive Theme Builder</h3>
        
        {/* Theme Switcher */}
        <div>
          <h4 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '500', color: '#555' }}>🎯 Theme Switcher</h4>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            {Object.keys(themes).map((themeName) => (
              <button
                key={themeName}
                onClick={() => applyTheme(themeName)}
                style={{
                  padding: '8px 16px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  background: currentTheme === themeName ? '#0070f3' : '#fff',
                  color: currentTheme === themeName ? '#fff' : '#333',
                  cursor: 'pointer',
                  fontSize: '14px',
                  textTransform: 'capitalize',
                }}
              >
                {themeName}
              </button>
            ))}
        </div>
        
          {/* Theme Component Showcase */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            <div style={{ padding: '16px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
              <h5 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#666' }}>
                Theme Colors
              </h5>
            <Dropdown
                options={defaultOptions}
                value={selectedValues['theme-colors']}
                onChange={(value) => setSelectedValues(prev => ({ ...prev, 'theme-colors': value as string }))}
                placeholder="Theme Colors"
                variant="default"
              />
            </div>
            <div style={{ padding: '16px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
              <h5 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#666' }}>
                Theme Gradients
              </h5>
            <Dropdown
                options={defaultOptions}
                value={selectedValues['theme-gradients']}
                onChange={(value) => setSelectedValues(prev => ({ ...prev, 'theme-gradients': value as string }))}
                placeholder="Theme Gradients"
                background="linear-gradient(135deg, var(--color-primary) 0%, var(--color-success) 100%)"
            />
          </div>
          </div>
        </div>
        
        {/* Advanced Gradient Builder */}
        <div>
          <h4 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '500', color: '#555' }}>🔧 Advanced Gradient Builder</h4>
          
          {/* Gradient Type */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <label style={{ fontSize: '14px', minWidth: '80px' }}>Type:</label>
            <select 
              value={gradientType} 
              onChange={(e) => setGradientType(e.target.value)}
              style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px' }}
            >
              <option value="linear">Linear</option>
              <option value="radial">Radial</option>
              <option value="conic">Conic</option>
            </select>
            </div>
          </div>
            
          {/* Gradient Direction */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <label style={{ fontSize: '14px', minWidth: '80px' }}>Direction:</label>
            <input
              type="text"
              value={gradientDirection}
              onChange={(e) => setGradientDirection(e.target.value)}
              style={{ width: '80px', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px' }}
              placeholder="90deg"
            />
            </div>
          </div>
          
          {/* Color Management */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <label style={{ fontSize: '14px', minWidth: '80px' }}>Colors:</label>
              <button
                onClick={addColor}
                style={{
                  padding: '4px 8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  background: '#fff',
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
                    style={{ width: '40px', height: '30px', border: '1px solid #ddd', borderRadius: '4px' }}
                  />
                  <button
                    onClick={() => removeColor(index)}
                    style={{
                      padding: '2px 6px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      background: '#fff',
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
          
          {/* Generate Button */}
          <div style={{ marginBottom: '16px' }}>
            <button
              onClick={generateGradient}
              style={{
                padding: '8px 16px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                background: '#0070f3',
                color: '#fff',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Generate Gradient
            </button>
          </div>
          
          {/* Custom Gradient Input */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '14px', display: 'block', marginBottom: '4px' }}>Custom Gradient:</label>
            <input
              type="text"
              value={customGradient}
              onChange={(e) => setCustomGradient(e.target.value)}
              style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px' }}
              placeholder="linear-gradient(90deg, #f43f5e 0%, #3b82f6 100%)"
            />
          </div>
          
          {/* Gradient Preview */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '14px', display: 'block', marginBottom: '4px' }}>Preview:</label>
            <div 
              style={{ 
                width: '100%', 
                height: '60px', 
                background: customGradient, 
                border: '1px solid #ddd', 
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '12px',
                textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
              }}
            >
              {customGradient}
            </div>
          </div>
          
          {/* Generated Dropdowns */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
            <div style={{ padding: '16px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
              <h5 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#666' }}>
                Custom Gradient
              </h5>
            <Dropdown
                options={defaultOptions}
                value={selectedValues['custom-gradient']}
                onChange={(value) => setSelectedValues(prev => ({ ...prev, 'custom-gradient': value as string }))}
                placeholder="Custom Gradient"
              background={customGradient}
            />
            </div>
            <div style={{ padding: '16px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
              <h5 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#666' }}>
                Rounded + Shadow
              </h5>
            <Dropdown
                options={defaultOptions}
                value={selectedValues['rounded-shadow']}
                onChange={(value) => setSelectedValues(prev => ({ ...prev, 'rounded-shadow': value as string }))}
                placeholder="Rounded + Shadow"
              background={customGradient}
                borderRadius={12}
              shadow="lg"
            />
            </div>
            <div style={{ padding: '16px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
              <h5 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#666' }}>
                All Effects
              </h5>
            <Dropdown
                options={defaultOptions}
                value={selectedValues['all-effects']}
                onChange={(value) => setSelectedValues(prev => ({ ...prev, 'all-effects': value as string }))}
                placeholder="All Effects"
              background={customGradient}
                borderRadius={20}
                shadow="xl"
                hoverEffect="lift"
              />
            </div>
          </div>
        </div>
        
        {/* Custom Color Builder */}
        <div>
          <h4 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '500', color: '#555' }}>🎨 Custom Color Builder</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <label style={{ fontSize: '14px', minWidth: '80px' }}>Custom Color:</label>
              <input
                type="color"
                value={customColor}
                onChange={(e) => setCustomColor(e.target.value)}
                style={{ width: '50px', height: '30px', border: '1px solid #ddd', borderRadius: '4px' }}
              />
              <span style={{ fontSize: '14px', color: '#666' }}>{customColor}</span>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
            <div style={{ padding: '16px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
              <h5 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#666' }}>
                Custom Color
              </h5>
            <Dropdown
                options={defaultOptions}
                value={selectedValues['custom-color']}
                onChange={(value) => setSelectedValues(prev => ({ ...prev, 'custom-color': value as string }))}
                placeholder="Custom Color"
                background={customColor}
            />
          </div>
            <div style={{ padding: '16px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
              <h5 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#666' }}>
                Custom + Effects
              </h5>
          <Dropdown
                options={defaultOptions}
                value={selectedValues['custom-effects']}
                onChange={(value) => setSelectedValues(prev => ({ ...prev, 'custom-effects': value as string }))}
                placeholder="Custom + Effects"
                background={customColor}
          borderRadius={12}
          shadow="lg"
        />
      </div>
          </div>
      </div>
      </div>
    );
  },
};