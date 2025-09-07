import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { 
  SidebarRoot, 
  SidebarHeader, 
  SidebarContent, 
  SidebarFooter, 
  SidebarGroup,
  SidebarItemComponent as SidebarItem,
  SidebarSection,
  SidebarSeparator,
  SidebarToggle,
} from './index';
import {
  Button,
  Badge,
  Dropdown,
  Checkbox,
  Input,
  ThemeProvider,
  themes
} from '../../index';

// Mock icons for stories
const HomeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9,22 9,12 15,12 15,22"/>
  </svg>
);

const UsersIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const SettingsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3"/>
    <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
  </svg>
);

const FolderIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
  </svg>
);

const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
  </svg>
);

const ChartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/>
  </svg>
);

const BellIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);

export default {
  title: 'Components/Sidebar',
  component: SidebarRoot,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A highly customizable sidebar component with support for composition patterns, themes, gradients, collapsible states, and advanced theming. Built with maximum flexibility in mind, supporting both simple navigation and complex enterprise layouts.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'ghost', 'outline'],
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    color: {
      control: { type: 'color' },
    },
    gradient: {
      control: { type: 'text' },
    },
    textColor: {
      control: { type: 'color' },
    },
    borderColor: {
      control: { type: 'color' },
    },
    backgroundColor: {
      control: { type: 'color' },
    },
    backgroundGradient: {
      control: { type: 'text' },
    },
    shadow: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg', 'xl'],
    },
    rounded: {
      control: { type: 'boolean' },
    },
    glassmorphism: {
      control: { type: 'boolean' },
    },
    position: {
      control: { type: 'select' },
      options: ['left', 'right'],
    },
    overlay: {
      control: { type: 'boolean' },
    },
    backdrop: {
      control: { type: 'boolean' },
    },
    collapsible: {
      control: { type: 'boolean' },
    },
    animated: {
      control: { type: 'boolean' },
    },
  },
} as Meta<typeof SidebarRoot>;

type Story = StoryObj<typeof SidebarRoot>;

export const Default: Story = {
  render: () => (
    <div style={{ height: '500px', display: 'flex' }}>
      <SidebarRoot width="280px">
        <SidebarHeader>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <HomeIcon />
            <span style={{ fontWeight: '600', fontSize: '1.125rem' }}>MorphUI</span>
          </div>
        </SidebarHeader>
        
        <SidebarContent>
          <SidebarItem id="dashboard" active>
            <HomeIcon />
            Dashboard
          </SidebarItem>
          <SidebarItem id="analytics">
            <ChartIcon />
            Analytics
          </SidebarItem>
          <SidebarItem id="users">
            <UsersIcon />
            Users
          </SidebarItem>
          <SidebarItem id="settings">
            <SettingsIcon />
            Settings
          </SidebarItem>
        </SidebarContent>
      </SidebarRoot>
      
      <div style={{ flex: 1, padding: '2rem', backgroundColor: '#f8fafc' }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '600' }}>Default Sidebar</h1>
        <p style={{ margin: '0.5rem 0 0 0', color: '#6b7280' }}>
          A clean, simple sidebar with basic navigation items.
        </p>
      </div>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {(['primary', 'secondary', 'success', 'warning', 'danger', 'info'] as const).map((variant) => (
        <div key={variant}>
          <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600', textTransform: 'capitalize' }}>
            {variant} Variant
          </h3>
          <div style={{ height: '200px', display: 'flex', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
            <SidebarRoot width="200px" variant={variant} size="sm">
              <SidebarContent>
                <SidebarItem id="home" active>
                  <HomeIcon />
                  Home
                </SidebarItem>
                <SidebarItem id="docs">
                  <FolderIcon />
                  Docs
                </SidebarItem>
                <SidebarItem id="settings">
                  <SettingsIcon />
                  Settings
                </SidebarItem>
              </SidebarContent>
            </SidebarRoot>
            <div style={{ flex: 1, padding: '1rem', backgroundColor: '#f9fafb' }}>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                {variant.charAt(0).toUpperCase() + variant.slice(1)} variant with {variant} accent colors.
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <div key={size}>
          <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600', textTransform: 'uppercase' }}>
            {size} Size
          </h3>
          <div style={{ height: '180px', display: 'flex', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
            <SidebarRoot width="220px" size={size}>
              <SidebarContent>
                <SidebarItem id="dashboard" active>
                  <HomeIcon />
                  Dashboard
                </SidebarItem>
                <SidebarItem id="analytics">
                  <ChartIcon />
                  Analytics
                </SidebarItem>
                <SidebarItem id="users">
                  <UsersIcon />
                  Users
                </SidebarItem>
              </SidebarContent>
            </SidebarRoot>
            <div style={{ flex: 1, padding: '1rem', backgroundColor: '#f9fafb' }}>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                {size.toUpperCase()} size with {size === 'xs' ? 'minimal' : size === 'xl' ? 'generous' : 'balanced'} spacing and typography.
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
};

export const CollapsibleSidebar: Story = {
  render: () => (
    <div style={{ height: '500px', display: 'flex' }}>
      <SidebarRoot width="280px" collapsible animated>
        <SidebarHeader>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <HomeIcon />
            <span style={{ fontWeight: '600', fontSize: '1.125rem' }}>Collapsible</span>
          </div>
          <SidebarToggle persistent collapseIcon="☰" expandIcon="☰" />
        </SidebarHeader>
        
        <SidebarContent>
          <SidebarItem id="dashboard" active>
            <HomeIcon />
            Dashboard
          </SidebarItem>
          <SidebarItem id="analytics" badge="5" badgeVariant="info">
            <ChartIcon />
            Analytics
          </SidebarItem>
          <SidebarItem id="notifications" badge="New" badgeVariant="success">
            <BellIcon />
            Notifications
          </SidebarItem>
          
          <SidebarSeparator />
          
          <SidebarGroup id="admin" title="Admin" icon={<SettingsIcon />}>
            <SidebarItem id="users">
              <UsersIcon />
              User Management
            </SidebarItem>
            <SidebarItem id="settings">
              <SettingsIcon />
              System Settings
            </SidebarItem>
          </SidebarGroup>
        </SidebarContent>
        
        <SidebarFooter>
          <div style={{ 
            padding: '0.75rem', 
            fontSize: '0.75rem', 
            color: 'var(--color-text-secondary)',
            textAlign: 'center'
          }}>
            v2.1.0
          </div>
        </SidebarFooter>
      </SidebarRoot>
      
      <div style={{ flex: 1, padding: '2rem', backgroundColor: '#f8fafc' }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '600' }}>✅ Collapsible Sidebar</h1>
        <div style={{ margin: '1rem 0', padding: '1rem', backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#374151' }}>How it works:</h3>
          <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#6b7280' }}>
            <li>🔘 <strong>Click the toggle button</strong> (→/←) in the header to collapse/expand</li>
            <li>📏 <strong>When collapsed:</strong> Sidebar shrinks to 60px width, shows only the toggle icon</li>
            <li>🔄 <strong>Toggle remains visible:</strong> Centered as a round button when collapsed</li>
            <li>🎯 <strong>Non-overlay mode:</strong> Sidebar pushes content, doesn't overlay it</li>
          </ul>
        </div>
        <p style={{ color: '#059669', fontWeight: '500' }}>
          ✅ FIXED: Toggle button now remains visible and clickable when collapsed!
        </p>
      </div>
    </div>
  ),
};

export const FloatingToggleDemo: Story = {
  render: () => (
    <div style={{ height: '500px', display: 'flex', position: 'relative' }}>
      <SidebarRoot 
        width="280px" 
        collapsible 
        animated 
        overlay 
        backdrop
        keyboardNavigation
        defaultCollapsed={true}
        position="left"
      >
        <SidebarHeader>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <HomeIcon />
            <span style={{ fontWeight: '600', fontSize: '1.125rem' }}>Overlay Sidebar</span>
          </div>
          <SidebarToggle floating position="left" />
        </SidebarHeader>
        
        <SidebarContent>
          <SidebarItem id="dashboard" active>
            <HomeIcon />
            Dashboard
          </SidebarItem>
          <SidebarItem id="analytics" badge="5" badgeVariant="info">
            <ChartIcon />
            Analytics
          </SidebarItem>
          <SidebarItem id="users" badge="24">
            <UsersIcon />
            Users
          </SidebarItem>
          
          <SidebarSeparator />
          
          <SidebarGroup id="settings" title="Settings" icon={<SettingsIcon />}>
            <SidebarItem id="preferences">
              <SettingsIcon />
              Preferences
            </SidebarItem>
            <SidebarItem id="security">
              🔒 Security
            </SidebarItem>
          </SidebarGroup>
        </SidebarContent>
      </SidebarRoot>
      
      <div style={{ flex: 1, padding: '2rem', backgroundColor: '#f8fafc' }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '600' }}>✅ Floating Toggle Demo</h1>
        <div style={{ margin: '1rem 0', padding: '1rem', backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#374151' }}>How to interact:</h3>
          <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#6b7280' }}>
            <li>👀 <strong>Look for floating toggle:</strong> Should appear as a round button in top-left corner</li>
            <li>🔘 <strong>Click the floating toggle</strong> to open the overlay sidebar</li>
            <li>⌨️ <strong>Press ESC key</strong> to toggle sidebar open/closed</li>
            <li>🖱️ <strong>Click backdrop</strong> (dark area) to close when open</li>
            <li>📱 <strong>Overlay behavior:</strong> Sidebar appears over content, not pushing it</li>
          </ul>
        </div>
        <div style={{ 
          padding: '12px 16px', 
          backgroundColor: '#059669', 
          color: 'white', 
          borderRadius: '6px',
          fontSize: '14px',
          fontWeight: '500'
        }}>
          ✅ FIXED: Floating toggle now renders correctly using React Portal when sidebar starts collapsed!
        </div>
      </div>
    </div>
  ),
};

export const ToggleBehaviorShowcase: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h2 style={{ marginBottom: '24px', fontSize: '24px', fontWeight: '700', color: '#111827' }}>
          🎛️ Toggle Behavior Showcase
        </h2>
        <p style={{ marginBottom: '32px', fontSize: '16px', color: '#6b7280', lineHeight: '1.6' }}>
          Comprehensive demonstration of all sidebar toggle modes and behaviors. Each example shows how users can reopen collapsed sidebars.
        </p>
      </div>

      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '600', color: '#333' }}>
          🔄 Persistent Toggle (Non-Overlay Mode)
        </h3>
        <p style={{ marginBottom: '16px', fontSize: '14px', color: '#6b7280' }}>
          Toggle remains visible as a centered round button when sidebar is collapsed. No floating elements.
        </p>
        <div style={{ height: '280px', display: 'flex', border: '2px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden' }}>
          <SidebarRoot width="280px" collapsible animated defaultCollapsed={false}>
            <SidebarHeader>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <HomeIcon />
                <span style={{ fontWeight: '600' }}>Persistent Toggle</span>
              </div>
              <SidebarToggle persistent collapseIcon="←" expandIcon="→" />
            </SidebarHeader>
            
            <SidebarContent>
              <SidebarItem id="home" active>
                <HomeIcon />
                Home
              </SidebarItem>
              <SidebarItem id="projects" badge="3">
                <FolderIcon />
                Projects
              </SidebarItem>
              <SidebarItem id="settings">
                <SettingsIcon />
                Settings
              </SidebarItem>
            </SidebarContent>
          </SidebarRoot>
          
          <div style={{ flex: 1, padding: '1rem', backgroundColor: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', fontWeight: '600' }}>Persistent Mode</h4>
              <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>
                ✅ <strong>Click toggle to collapse</strong><br/>
                ✅ <strong>Toggle becomes round button</strong><br/>
                ✅ <strong>Click round button to expand</strong>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '600', color: '#333' }}>
          🌐 Floating Toggle (Overlay Mode)
        </h3>
        <p style={{ marginBottom: '16px', fontSize: '14px', color: '#6b7280' }}>
          When collapsed in overlay mode, a floating toggle appears via React Portal. Sidebar slides in/out over content.
        </p>
        <div style={{ height: '280px', display: 'flex', border: '2px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden' }}>
          <SidebarRoot width="280px" overlay backdrop collapsible animated keyboardNavigation defaultCollapsed={true}>
            <SidebarHeader>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <HomeIcon />
                <span style={{ fontWeight: '600' }}>Floating Toggle</span>
              </div>
              <SidebarToggle floating position="left" />
            </SidebarHeader>
            
            <SidebarContent>
              <SidebarItem id="dashboard" active>
                <HomeIcon />
                Dashboard
              </SidebarItem>
              <SidebarItem id="analytics" badge="7">
                <ChartIcon />
                Analytics
              </SidebarItem>
              <SidebarItem id="profile">
                👤 Profile
              </SidebarItem>
            </SidebarContent>
          </SidebarRoot>
          
          <div style={{ flex: 1, padding: '1rem', backgroundColor: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', fontWeight: '600' }}>Overlay + Floating</h4>
              <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>
                ✅ <strong>Floating toggle appears when collapsed</strong><br/>
                ✅ <strong>Sidebar slides over content</strong><br/>
                ✅ <strong>Press ESC or click backdrop to close</strong>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '600', color: '#333' }}>
          ➡️ Right-Side Floating Toggle
        </h3>
        <p style={{ marginBottom: '16px', fontSize: '14px', color: '#6b7280' }}>
          Floating toggle positioned on the right side for right-positioned sidebars.
        </p>
        <div style={{ height: '280px', display: 'flex', border: '2px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden' }}>
          <div style={{ flex: 1, padding: '1rem', backgroundColor: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', fontWeight: '600' }}>Right Position</h4>
              <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>
                ✅ <strong>Floating toggle on right side</strong><br/>
                ✅ <strong>Sidebar slides from right</strong><br/>
                ✅ <strong>All keyboard shortcuts work</strong>
              </p>
            </div>
          </div>
          
          <SidebarRoot width="280px" position="right" overlay backdrop collapsible animated keyboardNavigation defaultCollapsed={true}>
            <SidebarHeader>
              <SidebarToggle floating position="right" />
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontWeight: '600' }}>Right Sidebar</span>
                <HomeIcon />
              </div>
            </SidebarHeader>
            
            <SidebarContent>
              <SidebarItem id="tools" active>
                <SettingsIcon />
                Tools
              </SidebarItem>
              <SidebarItem id="reports" badge="2">
                <ChartIcon />
                Reports
              </SidebarItem>
              <SidebarItem id="help">
                ❓ Help
              </SidebarItem>
            </SidebarContent>
          </SidebarRoot>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '600', color: '#333' }}>
          🎮 Interactive Comparison
        </h3>
        <p style={{ marginBottom: '16px', fontSize: '14px', color: '#6b7280' }}>
          Side-by-side comparison of both toggle modes in action.
        </p>
        <div style={{ display: 'flex', gap: '16px', height: '280px' }}>
          {/* Persistent Toggle Demo */}
          <div style={{ flex: 1, border: '2px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden', display: 'flex' }}>
            <SidebarRoot width="200px" collapsible animated defaultCollapsed={false}>
              <SidebarHeader>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '14px' }}>
                  <HomeIcon />
                  <span style={{ fontWeight: '600' }}>Persistent</span>
                </div>
                <SidebarToggle persistent size="xs" collapseIcon="←" expandIcon="→" />
              </SidebarHeader>
              
              <SidebarContent>
                <SidebarItem id="item1" active>
                  <HomeIcon />
                  Item 1
                </SidebarItem>
                <SidebarItem id="item2">
                  <FolderIcon />
                  Item 2
                </SidebarItem>
              </SidebarContent>
            </SidebarRoot>
            
            <div style={{ flex: 1, padding: '0.5rem', backgroundColor: '#f0f9ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ textAlign: 'center', fontSize: '12px' }}>
                <strong>Persistent Toggle</strong>
                <p style={{ margin: '4px 0', color: '#6b7280' }}>Always visible</p>
              </div>
            </div>
          </div>
          
          {/* Floating Toggle Demo */}
          <div style={{ flex: 1, border: '2px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden', display: 'flex' }}>
            <SidebarRoot width="200px" overlay backdrop collapsible animated keyboardNavigation defaultCollapsed={true}>
              <SidebarHeader>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '14px' }}>
                  <HomeIcon />
                  <span style={{ fontWeight: '600' }}>Floating</span>
                </div>
                <SidebarToggle floating position="left" size="xs" />
              </SidebarHeader>
              
              <SidebarContent>
                <SidebarItem id="item3" active>
                  <HomeIcon />
                  Item 1
                </SidebarItem>
                <SidebarItem id="item4">
                  <FolderIcon />
                  Item 2
                </SidebarItem>
              </SidebarContent>
            </SidebarRoot>
            
            <div style={{ flex: 1, padding: '0.5rem', backgroundColor: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ textAlign: 'center', fontSize: '12px' }}>
                <strong>Floating Toggle</strong>
                <p style={{ margin: '4px 0', color: '#6b7280' }}>Portal-rendered</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ 
        padding: '24px', 
        background: '#f0fdf4', 
        borderRadius: '12px', 
        border: '1px solid #bbf7d0' 
      }}>
        <h4 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '600', color: '#15803d' }}>
          ✅ Toggle Issues - COMPLETELY RESOLVED!
        </h4>
        <div style={{ fontSize: '14px', color: '#166534', lineHeight: '1.6' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <p style={{ margin: '0 0 12px 0' }}>
                <strong>🔄 Persistent Toggle Mode:</strong>
              </p>
              <ul style={{ margin: 0, paddingLeft: '20px' }}>
                <li>Toggle stays visible when collapsed</li>
                <li>Becomes centered round button at 40px</li>
                <li>Always clickable and accessible</li>
                <li>No floating elements needed</li>
              </ul>
            </div>
            <div>
              <p style={{ margin: '0 0 12px 0' }}>
                <strong>🌐 Floating Toggle Mode:</strong>
              </p>
              <ul style={{ margin: 0, paddingLeft: '20px' }}>
                <li>Renders via React Portal to document.body</li>
                <li>Positioned fixed on left or right side</li>
                <li>Appears automatically when sidebar collapsed</li>
                <li>Works with overlay backdrop system</li>
              </ul>
            </div>
          </div>
          <div style={{ marginTop: '16px', padding: '12px', background: '#dcfce7', borderRadius: '8px' }}>
            <p style={{ margin: 0, fontWeight: '600' }}>
              🎯 Both original issues fixed: ✅ Can always reopen collapsed sidebars ✅ Full left/right positioning support
            </p>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const PositioningShowcase: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>📍 Left-Side Positioning</h3>
        <div style={{ height: '300px', display: 'flex', border: '2px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden' }}>
          <SidebarRoot width="240px" position="left" collapsible animated overlay backdrop keyboardNavigation>
            <SidebarHeader>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <HomeIcon />
                <span style={{ fontWeight: '600' }}>Left Sidebar</span>
              </div>
              <SidebarToggle floating position="left" />
            </SidebarHeader>
            
            <SidebarContent>
              <SidebarItem id="home" active>
                <HomeIcon />
                Home
              </SidebarItem>
              <SidebarItem id="projects" badge="3">
                <FolderIcon />
                Projects
              </SidebarItem>
              <SidebarItem id="settings">
                <SettingsIcon />
                Settings
              </SidebarItem>
            </SidebarContent>
          </SidebarRoot>
          
          <div style={{ flex: 1, padding: '1rem', backgroundColor: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', fontWeight: '600' }}>Left-Side Position</h4>
              <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>
                Sidebar appears from the left. Toggle button appears on the left when collapsed.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>📍 Right-Side Positioning</h3>
        <div style={{ height: '300px', display: 'flex', border: '2px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden' }}>
          <div style={{ flex: 1, padding: '1rem', backgroundColor: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', fontWeight: '600' }}>Right-Side Position</h4>
              <p style={{ margin: 0, color: '#6b7280', fontSize: '14px' }}>
                Sidebar appears from the right. Toggle button appears on the right when collapsed.
              </p>
            </div>
          </div>
          
          <SidebarRoot width="240px" position="right" collapsible animated overlay backdrop keyboardNavigation>
            <SidebarHeader>
              <SidebarToggle floating position="right" />
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontWeight: '600' }}>Right Sidebar</span>
                <HomeIcon />
              </div>
            </SidebarHeader>
            
            <SidebarContent>
              <SidebarItem id="dashboard" active>
                <HomeIcon />
                Dashboard
              </SidebarItem>
              <SidebarItem id="analytics" badge="5">
                <ChartIcon />
                Analytics
              </SidebarItem>
              <SidebarItem id="profile">
                👤 Profile
              </SidebarItem>
            </SidebarContent>
          </SidebarRoot>
        </div>
      </div>
      
      <div style={{ 
        padding: '20px', 
        background: '#f0f9ff', 
        borderRadius: '8px', 
        border: '1px solid #bae6fd' 
      }}>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600', color: '#0369a1' }}>
          🎮 Interactive Features
        </h4>
        <div style={{ fontSize: '14px', color: '#0c4a6e', lineHeight: '1.6' }}>
          <p style={{ margin: '0 0 8px 0' }}>
            <strong>✨ Floating Toggle:</strong> When collapsed, a floating toggle button appears to reopen the sidebar.
          </p>
          <p style={{ margin: '0 0 8px 0' }}>
            <strong>⌨️ Keyboard Support:</strong> Press ESC to toggle sidebar in overlay mode.
          </p>
          <p style={{ margin: '0 0 8px 0' }}>
            <strong>🖱️ Backdrop Click:</strong> Click outside to close overlay sidebars.
          </p>
          <p style={{ margin: '0' }}>
            <strong>📱 Mobile Ready:</strong> Perfect responsive behavior on all screen sizes.
          </p>
        </div>
      </div>
    </div>
  ),
};

export const ConfigurationShowcase: Story = {
  render: () => {
    const sampleItems = [
      { icon: <HomeIcon />, label: 'Dashboard', id: 'dashboard' },
      { icon: <ChartIcon />, label: 'Analytics', id: 'analytics', badge: '5' },
      { icon: <UsersIcon />, label: 'Users', id: 'users' },
      { icon: <SettingsIcon />, label: 'Settings', id: 'settings' }
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#1f2937', margin: '0 0 1rem 0' }}>
            🎯 Sidebar Configuration Matrix
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#6b7280', margin: 0 }}>
            Comprehensive showcase of all sidebar configurations and their toggle behaviors
          </p>
        </div>

        {/* Header/Footer Combinations */}
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#374151' }}>
            📋 Header & Footer Combinations
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            
            {/* Header Only */}
            <div style={{ border: '2px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden', background: '#fff' }}>
              <div style={{ padding: '12px 16px', background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                <h3 style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: '#374151' }}>Header Only</h3>
              </div>
              <div style={{ height: '300px', display: 'flex' }}>
                <SidebarRoot width="200px" collapsible animated>
                  <SidebarHeader>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <HomeIcon />
                      <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>App Name</span>
                    </div>
                    <SidebarToggle persistent collapseIcon="☰" expandIcon="☰" />
                  </SidebarHeader>
                  <SidebarContent>
                    {sampleItems.map(item => (
                      <SidebarItem key={item.id} id={item.id} badge={item.badge}>
                        {item.icon}
                        {item.label}
                      </SidebarItem>
                    ))}
                  </SidebarContent>
                </SidebarRoot>
                <div style={{ flex: 1, padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
                  <div style={{ textAlign: 'center', color: '#6b7280' }}>
                    <p style={{ margin: 0, fontSize: '0.85rem' }}>Header with logo/title</p>
                    <p style={{ margin: '4px 0 0 0', fontSize: '0.75rem' }}>Toggle stays visible when collapsed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Only */}
            <div style={{ border: '2px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden', background: '#fff' }}>
              <div style={{ padding: '12px 16px', background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                <h3 style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: '#374151' }}>Footer Only</h3>
              </div>
              <div style={{ height: '300px', display: 'flex' }}>
                <SidebarRoot width="200px" collapsible animated>
                  <SidebarContent>
                    {sampleItems.map(item => (
                      <SidebarItem key={item.id} id={item.id} badge={item.badge}>
                        {item.icon}
                        {item.label}
                      </SidebarItem>
                    ))}
                  </SidebarContent>
                  <SidebarFooter>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                      <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>v2.1.0</span>
                      <SidebarToggle persistent collapseIcon="☰" expandIcon="☰" />
                    </div>
                  </SidebarFooter>
                </SidebarRoot>
                <div style={{ flex: 1, padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
                  <div style={{ textAlign: 'center', color: '#6b7280' }}>
                    <p style={{ margin: 0, fontSize: '0.85rem' }}>Footer with version/toggle</p>
                    <p style={{ margin: '4px 0 0 0', fontSize: '0.75rem' }}>Clean header-less design</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Header + Footer */}
            <div style={{ border: '2px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden', background: '#fff' }}>
              <div style={{ padding: '12px 16px', background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                <h3 style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: '#374151' }}>Header + Footer</h3>
              </div>
              <div style={{ height: '300px', display: 'flex' }}>
                <SidebarRoot width="200px" collapsible animated>
                  <SidebarHeader>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <HomeIcon />
                      <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>Full Layout</span>
                    </div>
                    <SidebarToggle persistent collapseIcon="☰" expandIcon="☰" />
                  </SidebarHeader>
                  <SidebarContent>
                    {sampleItems.map(item => (
                      <SidebarItem key={item.id} id={item.id} badge={item.badge}>
                        {item.icon}
                        {item.label}
                      </SidebarItem>
                    ))}
                  </SidebarContent>
                  <SidebarFooter>
                    <div style={{ fontSize: '0.75rem', color: '#6b7280', textAlign: 'center' }}>
                      © 2024 Company
                    </div>
                  </SidebarFooter>
                </SidebarRoot>
                <div style={{ flex: 1, padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
                  <div style={{ textAlign: 'center', color: '#6b7280' }}>
                    <p style={{ margin: 0, fontSize: '0.85rem' }}>Complete sidebar layout</p>
                    <p style={{ margin: '4px 0 0 0', fontSize: '0.75rem' }}>Header + Content + Footer</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Minimal (Content Only) */}
            <div style={{ border: '2px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden', background: '#fff' }}>
              <div style={{ padding: '12px 16px', background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                <h3 style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: '#374151' }}>Minimal (Content Only)</h3>
              </div>
              <div style={{ height: '300px', display: 'flex' }}>
                <SidebarRoot width="200px" collapsible animated>
                  <SidebarContent>
                    <div style={{ padding: '0.5rem', borderBottom: '1px solid #e5e7eb' }}>
                      <SidebarToggle persistent collapseIcon="☰" expandIcon="☰" />
                    </div>
                    {sampleItems.map(item => (
                      <SidebarItem key={item.id} id={item.id} badge={item.badge}>
                        {item.icon}
                        {item.label}
                      </SidebarItem>
                    ))}
                  </SidebarContent>
                </SidebarRoot>
                <div style={{ flex: 1, padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
                  <div style={{ textAlign: 'center', color: '#6b7280' }}>
                    <p style={{ margin: 0, fontSize: '0.85rem' }}>Ultra-minimal design</p>
                    <p style={{ margin: '4px 0 0 0', fontSize: '0.75rem' }}>Toggle embedded in content</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Toggle Behavior Demonstrations */}
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#374151' }}>
            🎮 Toggle Behavior Matrix
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            
            {/* Persistent Toggle (Non-overlay) */}
            <div style={{ border: '2px solid #10b981', borderRadius: '12px', overflow: 'hidden', background: '#fff' }}>
              <div style={{ padding: '12px 16px', background: '#d1fae5', borderBottom: '1px solid #10b981' }}>
                <h3 style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: '#065f46' }}>✅ Persistent Toggle</h3>
              </div>
              <div style={{ height: '300px', display: 'flex' }}>
                <SidebarRoot width="200px" collapsible animated>
                  <SidebarHeader>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <HomeIcon />
                      <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>Always Visible</span>
                    </div>
                    <SidebarToggle persistent collapseIcon="☰" expandIcon="☰" />
                  </SidebarHeader>
                  <SidebarContent>
                    {sampleItems.slice(0, 3).map(item => (
                      <SidebarItem key={item.id} id={item.id}>
                        {item.icon}
                        {item.label}
                      </SidebarItem>
                    ))}
                  </SidebarContent>
                </SidebarRoot>
                <div style={{ flex: 1, padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
                  <div style={{ textAlign: 'center', color: '#065f46' }}>
                    <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: '500' }}>✅ FIXED!</p>
                    <p style={{ margin: '4px 0 0 0', fontSize: '0.75rem' }}>Toggle always visible when collapsed</p>
                    <p style={{ margin: '4px 0 0 0', fontSize: '0.75rem' }}>Becomes round button at 60px width</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Toggle (Overlay) */}
            <div style={{ border: '2px solid #3b82f6', borderRadius: '12px', overflow: 'hidden', background: '#fff' }}>
              <div style={{ padding: '12px 16px', background: '#dbeafe', borderBottom: '1px solid #3b82f6' }}>
                <h3 style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: '#1e40af' }}>✅ Floating Toggle</h3>
              </div>
              <div style={{ height: '300px', display: 'flex' }}>
                <SidebarRoot width="200px" collapsible animated overlay backdrop defaultCollapsed keyboardNavigation>
                  <SidebarHeader>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <HomeIcon />
                      <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>Overlay Mode</span>
                    </div>
                    <SidebarToggle floating position="left" />
                  </SidebarHeader>
                  <SidebarContent>
                    {sampleItems.slice(0, 3).map(item => (
                      <SidebarItem key={item.id} id={item.id}>
                        {item.icon}
                        {item.label}
                      </SidebarItem>
                    ))}
                  </SidebarContent>
                </SidebarRoot>
                <div style={{ flex: 1, padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
                  <div style={{ textAlign: 'center', color: '#1e40af' }}>
                    <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: '500' }}>✅ FIXED!</p>
                    <p style={{ margin: '4px 0 0 0', fontSize: '0.75rem' }}>Floating toggle in top-left corner</p>
                    <p style={{ margin: '4px 0 0 0', fontSize: '0.75rem' }}>Press ESC to toggle</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Best Practices */}
        <div style={{ 
          padding: '24px', 
          background: '#f0f9ff', 
          borderRadius: '12px', 
          border: '1px solid #bae6fd' 
        }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '1.25rem', fontWeight: '600', color: '#0369a1' }}>
            💡 Configuration Best Practices
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
            <div>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '1rem', fontWeight: '600', color: '#0c4a6e' }}>
                🏢 Admin Dashboards
              </h4>
              <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.9rem', color: '#0c4a6e' }}>
                <li>Header with logo + persistent toggle</li>
                <li>Rich content with sections/groups</li>
                <li>Footer with user info</li>
              </ul>
            </div>
            <div>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '1rem', fontWeight: '600', color: '#0c4a6e' }}>
                📱 Mobile Apps
              </h4>
              <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.9rem', color: '#0c4a6e' }}>
                <li>Overlay mode with floating toggle</li>
                <li>Backdrop for easy closing</li>
                <li>ESC key support</li>
              </ul>
            </div>
            <div>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '1rem', fontWeight: '600', color: '#0c4a6e' }}>
                📚 Documentation
              </h4>
              <ul style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '0.9rem', color: '#0c4a6e' }}>
                <li>Minimal header-less design</li>
                <li>Content-focused layout</li>
                <li>Persistent toggle for easy access</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const WithBadges: Story = {
  render: () => (
    <div style={{ height: '500px', display: 'flex' }}>
      <SidebarRoot width="280px">
        <SidebarHeader>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <BellIcon />
            <span style={{ fontWeight: '600', fontSize: '1.125rem' }}>Notifications</span>
          </div>
        </SidebarHeader>
        
        <SidebarContent>
          <SidebarSection title="Dashboard">
            <SidebarItem id="overview" active>
              <HomeIcon />
              Overview
            </SidebarItem>
            <SidebarItem id="analytics" badge="12" badgeVariant="primary">
              <ChartIcon />
              Analytics
            </SidebarItem>
            <SidebarItem id="reports" badge="New" badgeVariant="success">
              <FolderIcon />
              Reports
            </SidebarItem>
          </SidebarSection>
          
          <SidebarSection title="Management">
            <SidebarItem id="users" badge="24" badgeVariant="info">
              <UsersIcon />
              Users
            </SidebarItem>
            <SidebarItem id="alerts" badge="!" badgeVariant="warning">
              <BellIcon />
              Alerts
            </SidebarItem>
            <SidebarItem id="errors" badge="3" badgeVariant="danger">
              <SettingsIcon />
              System Errors
            </SidebarItem>
          </SidebarSection>
          
          <SidebarSection title="Other">
            <SidebarItem id="favorites" badge="♥" badgeVariant="secondary">
              <StarIcon />
              Favorites
            </SidebarItem>
            <SidebarItem id="archive" badge="128" badgeVariant="secondary">
              <FolderIcon />
              Archive
            </SidebarItem>
          </SidebarSection>
        </SidebarContent>
      </SidebarRoot>
      
      <div style={{ flex: 1, padding: '2rem', backgroundColor: '#f8fafc' }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '600' }}>Sidebar with Badges</h1>
        <p style={{ margin: '0.5rem 0 0 0', color: '#6b7280' }}>
          Badges help users quickly identify items that need attention or show important counts.
        </p>
      </div>
    </div>
  ),
};

export const CustomColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>🎨 Custom Color Examples</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
          
          <div style={{ height: '200px', display: 'flex', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
            <SidebarRoot width="180px" color="#10b981" size="sm">
              <SidebarContent>
                <SidebarItem id="home" active>
                  <HomeIcon />
                  Custom Green
                </SidebarItem>
                <SidebarItem id="docs">
                  <FolderIcon />
                  Documentation
                </SidebarItem>
              </SidebarContent>
            </SidebarRoot>
            <div style={{ flex: 1, padding: '1rem', backgroundColor: '#f0fdf4', color: '#065f46' }}>
              <p style={{ fontSize: '12px', margin: 0 }}>Custom green color: #10b981</p>
            </div>
          </div>
          
          <div style={{ height: '200px', display: 'flex', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
            <SidebarRoot width="180px" color="#f59e0b" textColor="#ffffff" size="sm">
              <SidebarContent>
                <SidebarItem id="home" active>
                  <HomeIcon />
                  Custom Orange
                </SidebarItem>
                <SidebarItem id="settings">
                  <SettingsIcon />
                  Settings
                </SidebarItem>
              </SidebarContent>
            </SidebarRoot>
            <div style={{ flex: 1, padding: '1rem', backgroundColor: '#fffbeb', color: '#92400e' }}>
              <p style={{ fontSize: '12px', margin: 0 }}>Orange with white text</p>
            </div>
          </div>
          
          <div style={{ height: '200px', display: 'flex', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
            <SidebarRoot width="180px" color="#8b5cf6" borderColor="#7c3aed" size="sm">
              <SidebarContent>
                <SidebarItem id="home" active>
                  <HomeIcon />
                  Custom Purple
                </SidebarItem>
                <SidebarItem id="analytics">
                  <ChartIcon />
                  Analytics
                </SidebarItem>
              </SidebarContent>
            </SidebarRoot>
            <div style={{ flex: 1, padding: '1rem', backgroundColor: '#faf5ff', color: '#6b21a8' }}>
              <p style={{ fontSize: '12px', margin: 0 }}>Purple with custom border</p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  ),
};

export const GradientShowcase: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>🌈 Beautiful Gradient Sidebars</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div style={{ height: '200px', display: 'flex', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
            <SidebarRoot 
              width="220px" 
              backgroundGradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)" 
              textColor="#ffffff"
              size="sm"
            >
              <SidebarHeader>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <StarIcon />
                  <span style={{ fontWeight: '600' }}>Ocean Gradient</span>
                </div>
              </SidebarHeader>
              <SidebarContent>
                <SidebarItem id="dashboard" active variant="ghost">
                  <HomeIcon />
                  Dashboard
                </SidebarItem>
                <SidebarItem id="analytics" variant="ghost">
                  <ChartIcon />
                  Analytics
                </SidebarItem>
              </SidebarContent>
            </SidebarRoot>
            <div style={{ flex: 1, padding: '1rem', backgroundColor: '#f0f4ff' }}>
              <p style={{ fontSize: '12px', margin: 0, color: '#4338ca' }}>
                Linear gradient from purple to blue with white text
              </p>
            </div>
          </div>
          
          <div style={{ height: '200px', display: 'flex', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
            <SidebarRoot 
              width="220px" 
              backgroundGradient="radial-gradient(circle at 30% 20%, #ff6b6b, #4ecdc4, #45b7d1)" 
              textColor="#ffffff"
              size="sm"
            >
              <SidebarHeader>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <StarIcon />
                  <span style={{ fontWeight: '600' }}>Radial Magic</span>
                </div>
              </SidebarHeader>
              <SidebarContent>
                <SidebarItem id="home" active variant="ghost">
                  <HomeIcon />
                  Home
                </SidebarItem>
                <SidebarItem id="users" variant="ghost" badge="24">
                  <UsersIcon />
                  Users
                </SidebarItem>
              </SidebarContent>
            </SidebarRoot>
            <div style={{ flex: 1, padding: '1rem', backgroundColor: '#fef7f7' }}>
              <p style={{ fontSize: '12px', margin: 0, color: '#dc2626' }}>
                Radial gradient with multiple color stops
              </p>
            </div>
          </div>
          
          <div style={{ height: '200px', display: 'flex', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
            <SidebarRoot 
              width="220px" 
              backgroundGradient="conic-gradient(from 45deg, #ff6b6b, #4ecdc4, #45b7d1, #ff6b6b)" 
              textColor="#ffffff"
              shadow="lg"
              size="sm"
            >
              <SidebarHeader>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <StarIcon />
                  <span style={{ fontWeight: '600' }}>Conic Wonder</span>
                </div>
              </SidebarHeader>
              <SidebarContent>
                <SidebarItem id="dashboard" active variant="ghost">
                  <HomeIcon />
                  Dashboard
                </SidebarItem>
                <SidebarItem id="settings" variant="ghost">
                  <SettingsIcon />
                  Settings
                </SidebarItem>
              </SidebarContent>
            </SidebarRoot>
            <div style={{ flex: 1, padding: '1rem', backgroundColor: '#f0fdfa' }}>
              <p style={{ fontSize: '12px', margin: 0, color: '#047857' }}>
                Conic gradient creating a rainbow effect with shadow
              </p>
            </div>
          </div>
          
        </div>
      </div>
      
      <div style={{ 
        padding: '20px', 
        background: '#f8fafc', 
        borderRadius: '8px', 
        border: '1px solid #e2e8f0' 
      }}>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600', color: '#334155' }}>
          🚀 How to Use Gradients
        </h4>
        <div style={{ fontSize: '14px', color: '#475569', lineHeight: '1.5' }}>
          <p style={{ margin: '0 0 8px 0' }}>
            <strong>Linear Gradients:</strong> Use <code>backgroundGradient="linear-gradient(direction, color1, color2, ...)"</code>
          </p>
          <p style={{ margin: '0 0 8px 0' }}>
            <strong>Radial Gradients:</strong> Use <code>backgroundGradient="radial-gradient(shape at position, color1, color2, ...)"</code>
          </p>
          <p style={{ margin: '0 0 8px 0' }}>
            <strong>Conic Gradients:</strong> Use <code>backgroundGradient="conic-gradient(from angle, color1, color2, ...)"</code>
          </p>
          <p style={{ margin: '0 0 0 0' }}>
            <strong>Pro Tip:</strong> Combine gradients with <code>textColor</code>, <code>shadow</code>, and <code>glassmorphism</code> for stunning effects!
          </p>
        </div>
      </div>
    </div>
  ),
};

export const InteractiveThemeBuilder: StoryObj<typeof SidebarRoot> = {
  render: () => {
    const [currentTheme, setCurrentTheme] = useState('light');
    const [variant, setVariant] = useState<'primary' | 'secondary' | 'success' | 'warning' | 'info' | 'danger' | 'ghost' | 'outline'>('primary');
    const [size, setSize] = useState<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md');
    const [shadow, setShadow] = useState<'none' | 'sm' | 'md' | 'lg' | 'xl'>('md');
    const [position, setPosition] = useState<'left' | 'right'>('left');
    const [collapsible, setCollapsible] = useState(true);
    const [animated, setAnimated] = useState(true);
    const [overlay, setOverlay] = useState(false);
    const [glassmorphism, setGlassmorphism] = useState(false);
    
    // Background color controls
    const [backgroundColor, setBackgroundColor] = useState('');
    const [backgroundGradient, setBackgroundGradient] = useState('');
    const [textColor, setTextColor] = useState('');
    const [borderColor, setBorderColor] = useState('');
    
    // Gradient builder states
    const [gradientType, setGradientType] = useState('linear');
    const [gradientDirection, setGradientDirection] = useState('135deg');
    const [gradientColors, setGradientColors] = useState(['#667eea', '#764ba2']);
    const [activeGradientBuilder, setActiveGradientBuilder] = useState<string | null>(null);
    
    // New component configuration states
    const [showHeader, setShowHeader] = useState(true);
    const [showFooter, setShowFooter] = useState(false);
    const [headerContent, setHeaderContent] = useState('App Name');
    const [footerContent, setFooterContent] = useState('v2.1.0');
    const [toggleMode, setToggleMode] = useState<'auto' | 'persistent' | 'floating' | 'none'>('auto');
    const [contentComplexity, setContentComplexity] = useState<'minimal' | 'standard' | 'rich'>('standard');
    
    // Use centralized themes from the theme system
    const availableThemes = themes;
    
    const applyTheme = (themeName: string) => {
      const theme = availableThemes[themeName as keyof typeof availableThemes];
      if (theme) {
        Object.entries(theme).forEach(([key, value]) => {
          document.documentElement.style.setProperty(`--${key}`, String(value));
        });
        setCurrentTheme(themeName);
      }
    };

    // Gradient builder functions
    const generateGradient = () => {
      let gradient = '';
      if (gradientType === 'linear') {
        gradient = `linear-gradient(${gradientDirection}, ${gradientColors.join(', ')})`;
      } else if (gradientType === 'radial') {
        gradient = `radial-gradient(circle, ${gradientColors.join(', ')})`;
      } else if (gradientType === 'conic') {
        gradient = `conic-gradient(from ${gradientDirection}, ${gradientColors.join(', ')})`;
      }
      return gradient;
    };

    const applyGradientToTarget = (target: string) => {
      const gradient = generateGradient();
      switch (target) {
        case 'backgroundColor':
          setBackgroundGradient(gradient);
          break;
        default:
          setBackgroundGradient(gradient);
      }
      setActiveGradientBuilder(null);
    };

    const addColor = () => {
      setGradientColors([...gradientColors, '#000000']);
    };

    // Content generators based on complexity
    const generateContent = () => {
      const minimal = [
        { icon: <HomeIcon />, label: 'Home', id: 'home' },
        { icon: <ChartIcon />, label: 'Data', id: 'data' },
        { icon: <SettingsIcon />, label: 'Settings', id: 'settings' }
      ];
      
      const standard = [
        { icon: <HomeIcon />, label: 'Dashboard', id: 'dashboard' },
        { icon: <ChartIcon />, label: 'Analytics', id: 'analytics', badge: '5' },
        { icon: <UsersIcon />, label: 'Users', id: 'users' },
        { icon: <FolderIcon />, label: 'Projects', id: 'projects', badge: '12' },
        { icon: <SettingsIcon />, label: 'Settings', id: 'settings' }
      ];
      
      if (contentComplexity === 'minimal') return minimal;
      if (contentComplexity === 'standard') return standard;
      
      // Rich content with groups
      return (
        <>
          <SidebarSection title="Main">
            {standard.slice(0, 2).map(item => (
              <SidebarItem key={item.id} id={item.id} badge={item.badge} active={item.id === 'dashboard'}>
                {item.icon}
                {item.label}
              </SidebarItem>
            ))}
          </SidebarSection>
          <SidebarSeparator />
          <SidebarGroup id="management" title="Management" icon={<UsersIcon />}>
            {standard.slice(2, 4).map(item => (
              <SidebarItem key={item.id} id={item.id} badge={item.badge}>
                {item.icon}
                {item.label}
              </SidebarItem>
            ))}
          </SidebarGroup>
          <SidebarSeparator />
          <SidebarSection title="System">
            <SidebarItem id="settings">
              <SettingsIcon />
              Settings
            </SidebarItem>
          </SidebarSection>
        </>
      );
    };

    // Determine toggle props based on mode
    const getToggleProps = () => {
      if (toggleMode === 'none') return null;
      if (toggleMode === 'persistent') return { persistent: true };
      if (toggleMode === 'floating') return { floating: true, position };
      // Auto mode: floating for overlay, persistent for non-overlay
      return overlay ? { floating: true, position } : { persistent: true };
    };

    const removeColor = (index: number) => {
      setGradientColors(gradientColors.filter((_, i) => i !== index));
    };

    const updateColor = (index: number, color: string) => {
      const newColors = [...gradientColors];
      newColors[index] = color;
      setGradientColors(newColors);
    };

    return (
      <ThemeProvider theme={availableThemes[currentTheme as keyof typeof availableThemes]}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', minHeight: '800px' }}>
          
          {/* Theme Switcher */}
          <div style={{ 
            background: 'var(--color-background)', 
            padding: '20px', 
            borderRadius: '12px', 
            border: '1px solid var(--color-border)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{ margin: '0 0 16px 0', color: 'var(--color-text)' }}>🎨 Theme Switcher</h3>
            <p style={{ margin: '0 0 16px 0', color: 'var(--color-text)' }}>
              Current theme: <strong style={{ color: 'var(--color-primary)' }}>{currentTheme}</strong>
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {Object.keys(availableThemes).map(themeName => (
                <button
                  key={themeName}
                  onClick={() => applyTheme(themeName)}
                  style={{
                    padding: '8px 16px',
                    border: '1px solid var(--color-border)',
                    borderRadius: '6px',
                    background: currentTheme === themeName ? 'var(--color-primary)' : 'var(--color-background)',
                    color: currentTheme === themeName ? 'var(--color-background)' : 'var(--color-text)',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Themed Sidebar Preview */}
          <div style={{ 
            background: backgroundGradient.trim() || backgroundColor.trim() || 'var(--color-background)', 
            padding: '20px', 
            borderRadius: '12px', 
            border: '1px solid var(--color-border)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            transition: 'background 0.3s ease',
            height: '500px',
            display: 'flex'
          }}>
            <h3 style={{ 
              position: 'absolute', 
              top: '10px', 
              left: '20px', 
              margin: 0, 
              color: 'var(--color-text)',
              zIndex: 10,
              background: 'var(--color-background)',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '14px'
            }}>
              🎭 Themed Sidebar
            </h3>
            
            <SidebarRoot
              variant={variant}
              size={size}
              shadow={shadow}
              position={position}
              collapsible={collapsible}
              animated={animated}
              overlay={overlay}
              glassmorphism={glassmorphism}
              backgroundColor={backgroundColor.trim() || undefined}
              backgroundGradient={backgroundGradient.trim() || undefined}
              textColor={textColor.trim() || undefined}
              borderColor={borderColor.trim() || undefined}
              keyboardNavigation={true}
              width="280px"
            >
              {showHeader && (
                <SidebarHeader>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <HomeIcon />
                    <span style={{ fontWeight: '600', fontSize: '1.125rem' }}>{headerContent}</span>
                  </div>
                  {collapsible && toggleMode !== 'none' && getToggleProps() && <SidebarToggle {...getToggleProps()} />}
                </SidebarHeader>
              )}
              
              <SidebarContent>
                <SidebarSection title="Navigation">
                  <SidebarItem id="dashboard" active>
                    <HomeIcon />
                    Dashboard
                  </SidebarItem>
                  <SidebarItem id="analytics" badge="5" badgeVariant="info">
                    <ChartIcon />
                    Analytics
                  </SidebarItem>
                  <SidebarItem id="users" badge="24">
                    <UsersIcon />
                    Users
                  </SidebarItem>
                </SidebarSection>
                
                <SidebarSeparator />
                
                <SidebarGroup id="admin" title="Administration" icon={<SettingsIcon />}>
                  <SidebarItem id="settings">
                    <SettingsIcon />
                    Settings
                  </SidebarItem>
                  <SidebarItem id="notifications" badge="New" badgeVariant="success">
                    <BellIcon />
                    Notifications
                  </SidebarItem>
                </SidebarGroup>
              </SidebarContent>
              
              {showFooter && (
                <SidebarFooter>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{footerContent}</span>
                    {!showHeader && collapsible && toggleMode !== 'none' && getToggleProps() && <SidebarToggle {...getToggleProps()} />}
                  </div>
                </SidebarFooter>
              )}
            </SidebarRoot>
            
            <div style={{ flex: 1, padding: '2rem', minWidth: '200px' }}>
              <h2 style={{ margin: '0 0 1rem 0', color: 'var(--color-text)' }}>Themed Content</h2>
              <p style={{ color: 'var(--color-text)', lineHeight: 1.6 }}>
                This content area shows how the sidebar adapts to different themes and customizations. 
                The sidebar automatically inherits theme colors and responds to your customizations.
              </p>
              
              <div style={{ marginTop: '2rem' }}>
                <h3 style={{ margin: '0 0 1rem 0', color: 'var(--color-primary)' }}>✨ Theme Features</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', textAlign: 'left' }}>
                  <div>
                    <h4 style={{ color: 'var(--color-primary)', marginBottom: '8px' }}>🎨 Colors</h4>
                    <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: 'var(--color-text)' }}>
                      <li>Primary colors</li>
                      <li>Background colors</li>
                      <li>Text colors</li>
                      <li>Border colors</li>
                    </ul>
                  </div>
                  <div>
                    <h4 style={{ color: 'var(--color-primary)', marginBottom: '8px' }}>🌟 Effects</h4>
                    <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: 'var(--color-text)' }}>
                      <li>Shadows</li>
                      <li>Animations</li>
                      <li>Typography</li>
                      <li>Spacing</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Customization Controls */}
          <div style={{ 
            background: 'var(--color-background)', 
            padding: '20px', 
            borderRadius: '12px', 
            border: '1px solid var(--color-border)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{ margin: '0 0 16px 0', color: 'var(--color-text)' }}>🔧 Sidebar Customization</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              {/* Variant Control */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Variant:</label>
                <Dropdown
                  value={variant}
                  onChange={(value) => setVariant(value as any)}
                  options={[
                    { value: 'primary', label: 'Primary' },
                    { value: 'secondary', label: 'Secondary' },
                    { value: 'success', label: 'Success' },
                    { value: 'warning', label: 'Warning' },
                    { value: 'info', label: 'Info' },
                    { value: 'danger', label: 'Danger' },
                    { value: 'ghost', label: 'Ghost' },
                    { value: 'outline', label: 'Outline' }
                  ]}
                  placeholder="Select variant"
                  size="sm"
                />
              </div>

              {/* Size Control */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Size:</label>
                <Dropdown
                  value={size}
                  onChange={(value) => setSize(value as any)}
                  options={[
                    { value: 'xs', label: 'Extra Small' },
                    { value: 'sm', label: 'Small' },
                    { value: 'md', label: 'Medium' },
                    { value: 'lg', label: 'Large' },
                    { value: 'xl', label: 'Extra Large' }
                  ]}
                  placeholder="Select size"
                  size="sm"
                />
              </div>

              {/* Shadow Control */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Shadow:</label>
                <Dropdown
                  value={shadow}
                  onChange={(value) => setShadow(value as any)}
                  options={[
                    { value: 'none', label: 'None' },
                    { value: 'sm', label: 'Small' },
                    { value: 'md', label: 'Medium' },
                    { value: 'lg', label: 'Large' },
                    { value: 'xl', label: 'Extra Large' }
                  ]}
                  placeholder="Select shadow"
                  size="sm"
                />
              </div>

              {/* Position Control */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Position:</label>
                <Dropdown
                  value={position}
                  onChange={(value) => setPosition(value as any)}
                  options={[
                    { value: 'left', label: 'Left' },
                    { value: 'right', label: 'Right' }
                  ]}
                  placeholder="Select position"
                  size="sm"
                />
              </div>
            </div>

            {/* Behavior Controls */}
            <div style={{ marginTop: '24px' }}>
              <h4 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600', color: 'var(--color-text)' }}>
                ⚙️ Behavior Options
              </h4>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
                <Checkbox
                  checked={collapsible}
                  onChange={(checked) => setCollapsible(checked)}
                  label="Collapsible"
                />
                <Checkbox
                  checked={animated}
                  onChange={(checked) => setAnimated(checked)}
                  label="Animated"
                />
                <Checkbox
                  checked={overlay}
                  onChange={(checked) => setOverlay(checked)}
                  label="Overlay Mode"
                />
                <Checkbox
                  checked={glassmorphism}
                  onChange={(checked) => setGlassmorphism(checked)}
                  label="Glassmorphism"
                />
              </div>
            </div>

            {/* Component Configuration */}
            <div style={{ marginTop: '24px' }}>
              <h4 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600', color: 'var(--color-text)' }}>
                🏗️ Component Structure
              </h4>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                {/* Header/Footer Controls */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <Checkbox
                    checked={showHeader}
                    onChange={(checked) => setShowHeader(checked)}
                    label="Show Header"
                  />
                  <Checkbox
                    checked={showFooter}
                    onChange={(checked) => setShowFooter(checked)}
                    label="Show Footer"
                  />
                </div>

                {/* Toggle Mode Control */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Toggle Mode:</label>
                  <Dropdown
                    value={toggleMode}
                    onChange={(value) => setToggleMode(value as any)}
                    options={[
                      { value: 'auto', label: '🎯 Auto (Recommended)' },
                      { value: 'persistent', label: '📌 Always Visible' },
                      { value: 'floating', label: '🎈 Floating Portal' },
                      { value: 'none', label: '❌ No Toggle' }
                    ]}
                    placeholder="Select toggle behavior"
                    size="sm"
                  />
                </div>

                {/* Content Complexity */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Content:</label>
                  <Dropdown
                    value={contentComplexity}
                    onChange={(value) => setContentComplexity(value as any)}
                    options={[
                      { value: 'minimal', label: '📋 Minimal (3 items)' },
                      { value: 'standard', label: '📊 Standard (5 items)' },
                      { value: 'rich', label: '🎨 Rich (Groups & Sections)' }
                    ]}
                    placeholder="Select content complexity"
                    size="sm"
                  />
                </div>
              </div>

              {/* Content Text Inputs */}
              {(showHeader || showFooter) && (
                <div style={{ marginTop: '16px', display: 'grid', gridTemplateColumns: showHeader && showFooter ? '1fr 1fr' : '1fr', gap: '16px' }}>
                  {showHeader && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Header Text:</label>
                      <Input
                        value={headerContent}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setHeaderContent(e.target.value)}
                        placeholder="Enter header text"
                        size="sm"
                      />
                    </div>
                  )}
                  {showFooter && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Footer Text:</label>
                      <Input
                        value={footerContent}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFooterContent(e.target.value)}
                        placeholder="Enter footer text"
                        size="sm"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Color Controls */}
            <div style={{ marginTop: '24px' }}>
              <h4 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600', color: 'var(--color-text)' }}>
                🎨 Color Customization
              </h4>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                {/* Background Color */}
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
                      onClick={() => setBackgroundColor('')}
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

                {/* Text Color */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Text Color:</label>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <input 
                      type="color" 
                      value={textColor || '#000000'} 
                      onChange={(e) => setTextColor(e.target.value)}
                      style={{ width: '40px', height: '32px', border: '1px solid var(--color-border)', borderRadius: '4px', cursor: 'pointer' }}
                    />
                    <input 
                      type="text" 
                      value={textColor} 
                      onChange={(e) => setTextColor(e.target.value)}
                      placeholder="e.g., #ffffff or white"
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
                      onClick={() => setTextColor('')}
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

                {/* Border Color */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Border Color:</label>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <input 
                      type="color" 
                      value={borderColor || '#e5e7eb'} 
                      onChange={(e) => setBorderColor(e.target.value)}
                      style={{ width: '40px', height: '32px', border: '1px solid var(--color-border)', borderRadius: '4px', cursor: 'pointer' }}
                    />
                    <input 
                      type="text" 
                      value={borderColor} 
                      onChange={(e) => setBorderColor(e.target.value)}
                      placeholder="e.g., #e5e7eb or gray"
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
                      onClick={() => setBorderColor('')}
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

            {/* Gradient Builder Section */}
            <div style={{ 
              background: 'var(--color-background)', 
              border: '1px solid var(--color-border)', 
              borderRadius: '8px', 
              padding: '20px',
              marginTop: '24px'
            }}>
              <h4 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600', color: 'var(--color-text)' }}>
                🌈 Advanced Gradient Builder
              </h4>
              
              {/* Gradient Type Selector */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <label style={{ fontSize: '14px', minWidth: '80px', color: 'var(--color-text)' }}>Type:</label>
                <select 
                  value={gradientType} 
                  onChange={(e) => setGradientType(e.target.value)}
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
                    width: '80px', 
                    padding: '8px', 
                    border: '1px solid var(--color-border)', 
                    borderRadius: '4px', 
                    fontSize: '14px',
                    background: 'var(--color-background)',
                    color: 'var(--color-text)'
                  }}
                  placeholder="135deg"
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
                    background: generateGradient(), 
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
                  {generateGradient()}
                </div>
              </div>
              
              {/* Apply to Target */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '14px', display: 'block', marginBottom: '8px', color: 'var(--color-text)' }}>Apply to:</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  <button
                    onClick={() => applyGradientToTarget('backgroundColor')}
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
                    Sidebar Background
                  </button>
                </div>
              </div>
              
              {/* Manual Gradient Input */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '14px', display: 'block', marginBottom: '4px', color: 'var(--color-text)' }}>Manual Gradient:</label>
                <input
                  type="text"
                  value={backgroundGradient}
                  onChange={(e) => setBackgroundGradient(e.target.value)}
                  placeholder="e.g., linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid var(--color-border)',
                    borderRadius: '4px',
                    background: 'var(--color-background)',
                    color: 'var(--color-text)',
                    fontSize: '14px'
                  }}
                />
              </div>
            </div>

            {/* Reset Button */}
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <Button 
                onClick={() => {
                  setVariant('primary');
                  setSize('md');
                  setShadow('md');
                  setPosition('left');
                  setCollapsible(true);
                  setAnimated(true);
                  setOverlay(false);
                  setGlassmorphism(false);
                  setBackgroundColor('');
                  setBackgroundGradient('');
                  setTextColor('');
                  setBorderColor('');
                  setGradientType('linear');
                  setGradientDirection('135deg');
                  setGradientColors(['#667eea', '#764ba2']);
                }}
                variant="primary"
                size="md"
              >
                Reset to Defaults
              </Button>
            </div>
          </div>
        </div>
      </ThemeProvider>
    );
  },
};

export const AdvancedComposition: Story = {
  render: () => (
    <div style={{ height: '600px', display: 'flex' }}>
      <SidebarRoot width="320px" collapsible animated shadow="lg">
        <SidebarHeader gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)" textColor="#ffffff">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <StarIcon />
            <span style={{ fontWeight: '600', fontSize: '1.125rem' }}>Advanced Demo</span>
          </div>
          <SidebarToggle persistent collapseIcon="☰" expandIcon="☰" />
        </SidebarHeader>
        
        <SidebarContent>
          {/* Quick Actions */}
          <div style={{ padding: '0.75rem' }}>
            <Button variant="primary" size="sm" fullWidth>
              ➕ New Project
            </Button>
          </div>
          
          <SidebarSeparator />
          
          {/* Main Navigation */}
          <SidebarSection title="Main Navigation">
            <SidebarItem id="dashboard" active>
              <HomeIcon />
              Dashboard
              <Badge variant="success" size="sm">Live</Badge>
            </SidebarItem>
            <SidebarItem id="analytics" badge="12" badgeVariant="info">
              <ChartIcon />
              Analytics
            </SidebarItem>
            <SidebarItem id="users" badge="1.2k">
              <UsersIcon />
              Users
            </SidebarItem>
          </SidebarSection>
          
          <SidebarSeparator />
          
          {/* Collapsible Groups */}
          <SidebarGroup id="projects" title="Projects" icon={<FolderIcon />} defaultExpanded>
            <SidebarItem id="web-app">
              🌐 Web Application
            </SidebarItem>
            <SidebarItem id="mobile-app" badge="iOS">
              📱 Mobile App
            </SidebarItem>
            <SidebarItem id="api" badge="v2.1" badgeVariant="info">
              🔌 API Service
            </SidebarItem>
          </SidebarGroup>
          
          <SidebarGroup id="admin" title="Administration" icon={<SettingsIcon />}>
            <SidebarItem id="settings">
              <SettingsIcon />
              System Settings
            </SidebarItem>
            <SidebarItem id="billing" badge="!" badgeVariant="warning">
              💳 Billing & Plans
            </SidebarItem>
            <SidebarItem id="audit">
              📋 Audit Logs
            </SidebarItem>
          </SidebarGroup>
          
          <SidebarSeparator />
          
          {/* Custom Widget */}
          <div style={{ 
            margin: '0.5rem',
            padding: '1rem', 
            background: 'linear-gradient(135deg, #667eea20, #764ba220)',
            borderRadius: '8px',
            border: '1px solid var(--color-border)'
          }}>
            <div style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--color-text)' }}>
              📊 Quick Stats
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
              <div>• Active Users: <strong>24,573</strong></div>
              <div>• Revenue: <strong>$127.4K</strong></div>
              <div>• Uptime: <strong>99.9%</strong></div>
            </div>
          </div>
          
          <SidebarSeparator />
          
          {/* Help Section */}
          <SidebarSection title="Support">
            <SidebarItem id="help">
              ❓ Help Center
            </SidebarItem>
            <SidebarItem id="docs">
              📚 Documentation
            </SidebarItem>
            <SidebarItem id="feedback" badge="New" badgeVariant="success">
              💬 Send Feedback
            </SidebarItem>
          </SidebarSection>
        </SidebarContent>
        
        <SidebarFooter backgroundColor="var(--color-background-secondary)">
          <div style={{ padding: '0.75rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>
              Logged in as
            </div>
            <div style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--color-text)' }}>
              John Doe
            </div>
          </div>
        </SidebarFooter>
      </SidebarRoot>
      
      <div style={{ flex: 1, padding: '2rem', backgroundColor: '#f8fafc' }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '600' }}>Advanced Composition</h1>
        <p style={{ margin: '0.5rem 0', color: '#6b7280', lineHeight: 1.6 }}>
          This advanced example showcases the full power of the composition API:
        </p>
        <ul style={{ color: '#6b7280', lineHeight: 1.8, paddingLeft: '1.5rem' }}>
          <li>🎨 <strong>Custom themed header</strong> with gradient background</li>
          <li>⚡ <strong>Quick action button</strong> integrated seamlessly</li>
          <li>📱 <strong>Mixed content types</strong> - navigation, groups, widgets</li>
          <li>🏷️ <strong>Rich badges and indicators</strong> for status information</li>
          <li>📊 <strong>Custom widgets</strong> like the stats display</li>
          <li>👤 <strong>User information</strong> in the footer</li>
          <li>🔄 <strong>Collapsible groups</strong> for organization</li>
        </ul>
        <p style={{ margin: '1rem 0 0 0', color: '#6b7280', fontStyle: 'italic' }}>
          💡 Try collapsing the sidebar to see how all elements adapt gracefully!
        </p>
      </div>
    </div>
  ),
};

export const ThemeIntegration: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>🎨 Using Theme Colors</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div style={{ height: '180px', display: 'flex', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
            <SidebarRoot width="200px" color="color-success" size="sm">
              <SidebarContent>
                <SidebarItem id="home" active>Theme Success Color</SidebarItem>
                <SidebarItem id="docs">Documentation</SidebarItem>
              </SidebarContent>
            </SidebarRoot>
            <div style={{ flex: 1, padding: '1rem', backgroundColor: '#f0fdf4' }}>
              <p style={{ fontSize: '12px', margin: 0, color: '#065f46' }}>Using theme key: color-success</p>
            </div>
          </div>
          
          <div style={{ height: '180px', display: 'flex', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
            <SidebarRoot width="200px" gradient="gradient-primary" size="sm">
              <SidebarContent>
                <SidebarItem id="home" active variant="ghost">Theme Primary Gradient</SidebarItem>
                <SidebarItem id="settings" variant="ghost">Settings</SidebarItem>
              </SidebarContent>
            </SidebarRoot>
            <div style={{ flex: 1, padding: '1rem', backgroundColor: '#f0f4ff' }}>
              <p style={{ fontSize: '12px', margin: 0, color: '#4338ca' }}>Using theme gradient: gradient-primary</p>
            </div>
          </div>
          
          <div style={{ height: '180px', display: 'flex', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
            <SidebarRoot width="200px" color="--color-warning" size="sm">
              <SidebarContent>
                <SidebarItem id="home" active>CSS Variable Warning</SidebarItem>
                <SidebarItem id="alerts">System Alerts</SidebarItem>
              </SidebarContent>
            </SidebarRoot>
            <div style={{ flex: 1, padding: '1rem', backgroundColor: '#fffbeb' }}>
              <p style={{ fontSize: '12px', margin: 0, color: '#92400e' }}>Using CSS variable: --color-warning</p>
            </div>
          </div>
          
        </div>
      </div>
      
      <div style={{ 
        padding: '16px', 
        background: '#f8fafc', 
        borderRadius: '8px', 
        border: '1px solid #e2e8f0' 
      }}>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600', color: '#334155' }}>
          🚀 How to Use Theme Integration
        </h4>
        <div style={{ fontSize: '14px', color: '#475569', lineHeight: '1.5' }}>
          <p style={{ margin: '0 0 8px 0' }}>
            <strong>1. Theme Keys:</strong> Use <code>color="color-success"</code> to reference theme colors directly.
          </p>
          <p style={{ margin: '0 0 8px 0' }}>
            <strong>2. Theme Gradients:</strong> Use <code>gradient="gradient-primary"</code> for predefined gradients.
          </p>
          <p style={{ margin: '0 0 8px 0' }}>
            <strong>3. CSS Variables:</strong> Use <code>color="--color-warning"</code> for CSS custom properties.
          </p>
          <p style={{ margin: '0 0 0 0' }}>
            <strong>4. Auto-Adaptation:</strong> All theme-based colors automatically adapt when themes change!
          </p>
        </div>
      </div>
    </div>
  ),
};

export const ResponsiveLayouts: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>📱 Mobile-First Design</h3>
        <div style={{ height: '400px', display: 'flex', border: '2px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden' }}>
          <SidebarRoot width="240px" overlay backdrop position="left" size="sm" keyboardNavigation>
            <SidebarHeader>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <HomeIcon />
                <span style={{ fontWeight: '600' }}>Mobile App</span>
              </div>
              <SidebarToggle floating position="left" />
            </SidebarHeader>
            
            <SidebarContent>
              <SidebarItem id="home" active>
                <HomeIcon />
                Home
              </SidebarItem>
              <SidebarItem id="explore">
                🔍 Explore
              </SidebarItem>
              <SidebarItem id="notifications" badge="5" badgeVariant="danger">
                <BellIcon />
                Notifications
              </SidebarItem>
              <SidebarItem id="profile">
                👤 Profile
              </SidebarItem>
              
              <SidebarSeparator />
              
              <SidebarItem id="settings">
                <SettingsIcon />
                Settings
              </SidebarItem>
            </SidebarContent>
          </SidebarRoot>
          
          <div style={{ flex: 1, padding: '1rem', backgroundColor: '#f9fafb', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <h2 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem', fontWeight: '600' }}>📱 Mobile Layout</h2>
            <p style={{ margin: 0, color: '#6b7280', textAlign: 'center', lineHeight: 1.6 }}>
              In mobile mode, the sidebar appears as an overlay with backdrop. 
              Perfect for responsive applications that need to work on all screen sizes.
            </p>
            <p style={{ margin: '1rem 0 0 0', color: '#6b7280', fontSize: '14px', fontStyle: 'italic' }}>
              💡 Try toggling the sidebar to see the overlay effect!
            </p>
          </div>
        </div>
      </div>
      
      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>🖥️ Desktop Layout</h3>
        <div style={{ height: '300px', display: 'flex', border: '2px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden' }}>
          <SidebarRoot width="280px" collapsible animated size="md" shadow="sm">
            <SidebarHeader>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <HomeIcon />
                <span style={{ fontWeight: '600', fontSize: '1.125rem' }}>Desktop App</span>
              </div>
              <SidebarToggle persistent collapseIcon="☰" expandIcon="☰" />
            </SidebarHeader>
            
            <SidebarContent>
              <SidebarSection title="Navigation">
                <SidebarItem id="dashboard" active>
                  <HomeIcon />
                  Dashboard
                </SidebarItem>
                <SidebarItem id="projects" badge="8">
                  <FolderIcon />
                  Projects
                </SidebarItem>
                <SidebarItem id="team">
                  <UsersIcon />
                  Team
                </SidebarItem>
              </SidebarSection>
              
              <SidebarSection title="Tools">
                <SidebarItem id="analytics">
                  <ChartIcon />
                  Analytics
                </SidebarItem>
                <SidebarItem id="settings">
                  <SettingsIcon />
                  Settings
                </SidebarItem>
              </SidebarSection>
            </SidebarContent>
          </SidebarRoot>
          
          <div style={{ flex: 1, padding: '2rem', backgroundColor: '#f9fafb', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <h2 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem', fontWeight: '600' }}>🖥️ Desktop Layout</h2>
            <p style={{ margin: 0, color: '#6b7280', textAlign: 'center', lineHeight: 1.6 }}>
              Desktop layout with persistent sidebar that can be collapsed for more content space. 
              Features smooth animations and proper spacing for desktop interactions.
            </p>
          </div>
        </div>
      </div>
      
      <div style={{ 
        padding: '20px', 
        background: '#f8fafc', 
        borderRadius: '8px', 
        border: '1px solid #e2e8f0' 
      }}>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600', color: '#334155' }}>
          📐 Responsive Design Tips
        </h4>
        <div style={{ fontSize: '14px', color: '#475569', lineHeight: '1.5' }}>
          <p style={{ margin: '0 0 8px 0' }}>
            <strong>Mobile:</strong> Use <code>overlay={true}</code> and <code>backdrop={true}</code> for overlay behavior.
          </p>
          <p style={{ margin: '0 0 8px 0' }}>
            <strong>Tablet:</strong> Consider using <code>collapsible={true}</code> with smaller widths.
          </p>
          <p style={{ margin: '0 0 8px 0' }}>
            <strong>Desktop:</strong> Use persistent sidebars with <code>collapsible={true}</code> for flexibility.
          </p>
          <p style={{ margin: '0 0 0 0' }}>
            <strong>Pro Tip:</strong> Combine with CSS media queries for fully responsive behavior!
          </p>
        </div>
      </div>
    </div>
  ),
};

export const InteractivePlayground: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    collapsible: true,
    animated: true,
    shadow: 'md',
    rounded: false,
    glassmorphism: false,
    overlay: false,
    backdrop: true,
    position: 'left',
  },
  render: (args) => (
    <div style={{ height: '500px', display: 'flex' }}>
      <SidebarRoot {...args} width="280px">
        <SidebarHeader>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <HomeIcon />
            <span style={{ fontWeight: '600', fontSize: '1.125rem' }}>Interactive Playground</span>
          </div>
          {args.collapsible && <SidebarToggle persistent={!args.overlay} floating={args.overlay} position={args.position} />}
        </SidebarHeader>
        
        <SidebarContent>
          <SidebarSection title="Main">
            <SidebarItem id="dashboard" active>
              <HomeIcon />
              Dashboard
            </SidebarItem>
            <SidebarItem id="analytics" badge="12" badgeVariant="info">
              <ChartIcon />
              Analytics
            </SidebarItem>
            <SidebarItem id="users" badge="1.2k">
              <UsersIcon />
              Users
            </SidebarItem>
          </SidebarSection>
          
          <SidebarSeparator />
          
          <SidebarGroup id="admin" title="Administration" icon={<SettingsIcon />}>
            <SidebarItem id="settings">
              <SettingsIcon />
              Settings
            </SidebarItem>
            <SidebarItem id="billing" badge="!" badgeVariant="warning">
              💳 Billing
            </SidebarItem>
          </SidebarGroup>
        </SidebarContent>
        
        <SidebarFooter>
          <div style={{ 
            padding: '0.75rem', 
            fontSize: '0.75rem', 
            color: 'var(--color-text-secondary)',
            textAlign: 'center'
          }}>
            Playground Mode
          </div>
        </SidebarFooter>
      </SidebarRoot>
      
      <div style={{ flex: 1, padding: '2rem', backgroundColor: '#f8fafc' }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '600' }}>Interactive Playground</h1>
        <p style={{ margin: '0.5rem 0 0 0', color: '#6b7280' }}>
          Use the controls in the Storybook panel to experiment with different sidebar configurations.
        </p>
      </div>
    </div>
  ),
};

export const LayoutPatterns: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      <div>
        <h2 style={{ marginBottom: '24px', fontSize: '28px', fontWeight: '700', color: '#111827' }}>
          🏗️ Real-World Layout Patterns
        </h2>
        <p style={{ marginBottom: '32px', fontSize: '16px', color: '#6b7280', lineHeight: '1.6' }}>
          Production-ready sidebar layouts commonly used in modern applications. Each pattern demonstrates proper toggle implementation and responsive behavior.
        </p>
      </div>

      <div>
        <h3 style={{ marginBottom: '20px', fontSize: '22px', fontWeight: '600', color: '#374151' }}>
          📊 Admin Dashboard Layout
        </h3>
        <p style={{ marginBottom: '16px', fontSize: '14px', color: '#6b7280' }}>
          Classic admin interface with navigation hierarchy, user profile, and collapsible sections.
        </p>
        <div style={{ height: '500px', border: '2px solid #e5e7eb', borderRadius: '16px', overflow: 'hidden', display: 'flex' }}>
          <SidebarRoot width="280px" collapsible animated>
            <SidebarHeader>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ 
                  width: '32px', 
                  height: '32px', 
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: '600',
                  fontSize: '14px'
                }}>
                  A
                </div>
                <span style={{ fontWeight: '600', fontSize: '16px' }}>AdminPro</span>
              </div>
              <SidebarToggle persistent collapseIcon="☰" expandIcon="☰" />
            </SidebarHeader>
            
            <SidebarContent scrollable>
              <SidebarSection title="Overview">
                <SidebarItem id="dashboard" active>
                  <HomeIcon />
                  Dashboard
                </SidebarItem>
                <SidebarItem id="analytics" badge="3">
                  <ChartIcon />
                  Analytics
                </SidebarItem>
                <SidebarItem id="reports">
                  📊 Reports
                </SidebarItem>
              </SidebarSection>

              <SidebarSeparator />

              <SidebarGroup id="content" title="Content Management" icon={<FolderIcon />}>
                <SidebarItem id="posts" badge="12">
                  📝 Posts
                </SidebarItem>
                <SidebarItem id="media">
                  🖼️ Media Library
                </SidebarItem>
                <SidebarItem id="categories">
                  🏷️ Categories
                </SidebarItem>
              </SidebarGroup>

              <SidebarGroup id="users" title="User Management" icon={<UsersIcon />}>
                <SidebarItem id="all-users" badge="1,247">
                  <UsersIcon />
                  All Users
                </SidebarItem>
                <SidebarItem id="roles">
                  👥 Roles & Permissions
                </SidebarItem>
                <SidebarItem id="sessions">
                  🔒 Active Sessions
                </SidebarItem>
              </SidebarGroup>

              <SidebarSeparator />

              <SidebarSection title="System">
                <SidebarItem id="settings">
                  <SettingsIcon />
                  Settings
                </SidebarItem>
                <SidebarItem id="integrations" badge="5">
                  🔌 Integrations
                </SidebarItem>
                <SidebarItem id="logs">
                  📋 System Logs
                </SidebarItem>
              </SidebarSection>
            </SidebarContent>
            
            <SidebarFooter>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 0' }}>
                <div style={{ 
                  width: '28px', 
                  height: '28px', 
                  background: '#10b981',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: '600',
                  fontSize: '12px'
                }}>
                  JD
                </div>
                <div style={{ flex: 1, fontSize: '14px' }}>
                  <div style={{ fontWeight: '500' }}>John Doe</div>
                  <div style={{ fontSize: '12px', color: '#6b7280' }}>Administrator</div>
                </div>
                <SettingsIcon />
              </div>
            </SidebarFooter>
          </SidebarRoot>
          
          <div style={{ flex: 1, backgroundColor: '#f8fafc', display: 'flex', flexDirection: 'column' }}>
            <header style={{ 
              padding: '1.5rem 2rem', 
              background: '#ffffff', 
              borderBottom: '1px solid #e5e7eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '600' }}>Dashboard Overview</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '14px', color: '#6b7280' }}>Last updated: 2 min ago</span>
                <div style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%' }}></div>
              </div>
            </header>
            <main style={{ flex: 1, padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>📊</div>
                <h2 style={{ fontSize: '20px', fontWeight: '600', margin: '0 0 8px 0' }}>Admin Dashboard</h2>
                <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>
                  Complete navigation hierarchy with persistent toggle
                </p>
              </div>
            </main>
          </div>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '20px', fontSize: '22px', fontWeight: '600', color: '#374151' }}>
          💼 SaaS Application Layout
        </h3>
        <p style={{ marginBottom: '16px', fontSize: '14px', color: '#6b7280' }}>
          Modern SaaS interface with floating sidebar overlay for optimal screen space usage.
        </p>
        <div style={{ height: '500px', border: '2px solid #e5e7eb', borderRadius: '16px', overflow: 'hidden', display: 'flex' }}>
          <SidebarRoot 
            width="300px" 
            overlay 
            backdrop 
            collapsible 
            animated 
            keyboardNavigation
            defaultCollapsed={true}
          >
            <SidebarHeader>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ 
                  width: '32px', 
                  height: '32px', 
                  background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: '600',
                  fontSize: '14px'
                }}>
                  S
                </div>
                <span style={{ fontWeight: '600', fontSize: '16px' }}>SaaSPro</span>
              </div>
              <SidebarToggle floating position="left" />
            </SidebarHeader>
            
            <SidebarContent scrollable>
              <SidebarSection title="Workspace">
                <SidebarItem id="projects" active badge="8">
                  <FolderIcon />
                  Projects
                </SidebarItem>
                <SidebarItem id="team" badge="12">
                  <UsersIcon />
                  Team Members
                </SidebarItem>
                <SidebarItem id="tasks" badge="24">
                  ✅ Tasks
                </SidebarItem>
              </SidebarSection>

              <SidebarSeparator />

              <SidebarSection title="Analytics">
                <SidebarItem id="overview">
                  <ChartIcon />
                  Overview
                </SidebarItem>
                <SidebarItem id="performance" badge="new">
                  📈 Performance
                </SidebarItem>
                <SidebarItem id="insights">
                  🔍 Insights
                </SidebarItem>
              </SidebarSection>

              <SidebarSeparator />

              <SidebarGroup id="billing" title="Billing & Usage" icon="💳">
                <SidebarItem id="subscription" badge="Pro">
                  💎 Subscription
                </SidebarItem>
                <SidebarItem id="usage">
                  📊 Usage Stats
                </SidebarItem>
                <SidebarItem id="invoices">
                  🧾 Invoices
                </SidebarItem>
              </SidebarGroup>
            </SidebarContent>
            
            <SidebarFooter>
              <div style={{ 
                padding: '1rem',
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                borderRadius: '8px',
                margin: '0.5rem',
                color: 'white',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '12px', fontWeight: '600', marginBottom: '4px' }}>
                  Pro Plan
                </div>
                <div style={{ fontSize: '11px', opacity: 0.9 }}>
                  14 days remaining
                </div>
              </div>
            </SidebarFooter>
          </SidebarRoot>
          
          <div style={{ flex: 1, backgroundColor: '#ffffff', position: 'relative' }}>
            <header style={{ 
              padding: '1rem 2rem', 
              background: '#ffffff', 
              borderBottom: '1px solid #f1f5f9',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem'
            }}>
              <div style={{ 
                padding: '0.5rem',
                background: '#f8fafc',
                borderRadius: '8px',
                border: '1px solid #e2e8f0'
              }}>
                🔍
              </div>
              <input 
                type="text" 
                placeholder="Search projects, tasks, or team members..." 
                style={{
                  flex: 1,
                  padding: '0.75rem 1rem',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              />
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <div style={{ padding: '0.5rem', background: '#f8fafc', borderRadius: '50%' }}>🔔</div>
                <div style={{ padding: '0.5rem', background: '#f8fafc', borderRadius: '50%' }}>👤</div>
              </div>
            </header>
            <main style={{ padding: '2rem', height: 'calc(100% - 80px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>💼</div>
                <h2 style={{ fontSize: '20px', fontWeight: '600', margin: '0 0 8px 0' }}>SaaS Application</h2>
                <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>
                  Floating sidebar overlay • Press ESC to toggle
                </p>
              </div>
            </main>
          </div>
        </div>
      </div>

      <div style={{ 
        padding: '32px', 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
        borderRadius: '16px',
        color: 'white'
      }}>
        <h4 style={{ margin: '0 0 20px 0', fontSize: '20px', fontWeight: '600' }}>
          🎯 Layout Pattern Benefits
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', fontSize: '14px', lineHeight: '1.6' }}>
          <div>
            <h5 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600' }}>
              📊 Admin Dashboard
            </h5>
            <ul style={{ margin: 0, paddingLeft: '20px', listStyle: 'none' }}>
              <li style={{ marginBottom: '6px' }}>✅ Persistent toggle always accessible</li>
              <li style={{ marginBottom: '6px' }}>✅ Hierarchical content organization</li>
              <li style={{ marginBottom: '6px' }}>✅ User context in footer</li>
              <li style={{ marginBottom: '6px' }}>✅ Perfect for desktop workflows</li>
            </ul>
          </div>
          <div>
            <h5 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600' }}>
              💼 SaaS Application
            </h5>
            <ul style={{ margin: 0, paddingLeft: '20px', listStyle: 'none' }}>
              <li style={{ marginBottom: '6px' }}>✅ Floating toggle via React Portal</li>
              <li style={{ marginBottom: '6px' }}>✅ Overlay preserves screen real estate</li>
              <li style={{ marginBottom: '6px' }}>✅ Keyboard shortcuts (ESC key)</li>
              <li style={{ marginBottom: '6px' }}>✅ Modern SaaS interface patterns</li>
            </ul>
          </div>
        </div>
        <div style={{ 
          marginTop: '24px', 
          padding: '20px', 
          background: 'rgba(255, 255, 255, 0.1)', 
          borderRadius: '12px',
          textAlign: 'center'
        }}>
          <p style={{ margin: '0', fontSize: '16px', fontWeight: '600' }}>
            🚀 All patterns demonstrate the complete solution to sidebar toggle issues:
          </p>
          <p style={{ margin: '8px 0 0 0', fontSize: '14px' }}>
            ✅ Users can always reopen collapsed sidebars ✅ Full left/right positioning support ✅ Production-ready implementations
          </p>
        </div>
      </div>
    </div>
  ),
};