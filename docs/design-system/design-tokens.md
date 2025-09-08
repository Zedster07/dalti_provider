# Design System - Design Tokens

## 🎨 Color Palette

### Primary Colors

```css
/* Dalti Brand Colors */
--color-primary: #15424e; /* Stormy Sea - Main brand color */
--color-primary-variant: #0d3339; /* Darker variant for depth */
--color-secondary: #4ecdc4; /* Teal Breeze - Secondary accent */
--color-accent: #ffe66d; /* Golden Yellow - Highlight color */
```

### Neutral Colors

```css
/* Light Theme Neutrals */
--color-surface: #fafafa; /* Light gray surface */
--color-background: #ffffff; /* Pure white background */
--color-error: #e74c3c; /* Error red */
--color-success: #27ae60; /* Success green */
--color-warning: #f39c12; /* Warning orange */
```

### Text Colors

```css
/* Text Color Hierarchy */
--color-text-primary: #2c3e50; /* Primary text - dark gray */
--color-text-secondary: #7f8c8d; /* Secondary text - medium gray */
--color-text-on-primary: #ffffff; /* Text on primary backgrounds */
```

### Dark Theme Colors

```css
/* Dark Theme Palette */
--color-dark-background: #0f1419; /* Very dark blue-gray */
--color-dark-surface: #1c2127; /* Card backgrounds */
--color-dark-surface-variant: #242a30; /* Elevated elements */
--color-dark-surface-container: #2a3038; /* Container backgrounds */
--color-dark-surface-container-high: #323a42; /* High emphasis containers */

/* Dark Theme Primary Colors */
--color-dark-primary: #257587; /* Primary teal for buttons */
--color-dark-primary-container: #1a3a42; /* Dark container for primary */
--color-dark-secondary: #3abab3; /* Secondary teal variant */

/* Dark Theme Text Colors */
--color-dark-on-surface: #f8f9fa; /* Primary white text */
--color-dark-on-surface-variant: #b8bcc8; /* Secondary gray text */
--color-dark-on-surface-secondary: #6c7278; /* Tertiary gray text */
--color-dark-on-primary: #ffffff; /* White text on teal */
--color-dark-on-primary-container: #b8f5ff; /* Light text on primary container */

/* Additional Dark Theme Colors */
--color-dark-inactive-element: #3a4048; /* Inactive elements */
--color-dark-progress-background: #2a3038; /* Progress bar backgrounds */
```

### Status Colors

```css
/* Status Indicators */
--color-status-active: #27ae60; /* Active/online status */
--color-status-inactive: #f39c12; /* Inactive/away status */
--color-status-blocked: #e74c3c; /* Blocked/error status */
--color-status-pending: #3498db; /* Pending/processing status */
```

### Gradient Colors

```css
/* Brand Gradients */
--gradient-primary: linear-gradient(135deg, #15424e 0%, #0d3339 100%);
--gradient-secondary: linear-gradient(135deg, #4ecdc4 0%, #3abab3 100%);
```

## 📝 Typography

### Font Family

```css
/* Primary Font - Changa (Arabic-friendly) */
--font-family-primary: 'Changa', 'Helvetica Neue', 'Arial', sans-serif;
--font-family-fallback: 'Helvetica Neue', 'Arial', sans-serif;
```

### Font Weights

```css
--font-weight-light: 300;
--font-weight-regular: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
--font-weight-extrabold: 800;
```

### Font Sizes & Line Heights

```css
/* Display Styles */
--font-size-display-large: 32px;
--line-height-display-large: 40px;
--font-weight-display-large: 700;

--font-size-display-medium: 28px;
--line-height-display-medium: 36px;
--font-weight-display-medium: 600;

--font-size-display-small: 24px;
--line-height-display-small: 32px;
--font-weight-display-small: 600;

/* Headline Styles */
--font-size-headline-large: 22px;
--line-height-headline-large: 28px;
--font-weight-headline-large: 600;

--font-size-headline-medium: 20px;
--line-height-headline-medium: 26px;
--font-weight-headline-medium: 600;

--font-size-headline-small: 18px;
--line-height-headline-small: 24px;
--font-weight-headline-small: 600;

/* Title Styles */
--font-size-title-large: 16px;
--line-height-title-large: 22px;
--font-weight-title-large: 600;

--font-size-title-medium: 14px;
--line-height-title-medium: 20px;
--font-weight-title-medium: 600;

--font-size-title-small: 12px;
--line-height-title-small: 18px;
--font-weight-title-small: 600;

/* Body Styles */
--font-size-body-large: 16px;
--line-height-body-large: 24px;
--font-weight-body-large: 400;

--font-size-body-medium: 14px;
--line-height-body-medium: 20px;
--font-weight-body-medium: 400;

--font-size-body-small: 12px;
--line-height-body-small: 18px;
--font-weight-body-small: 400;

/* Label Styles */
--font-size-label-large: 14px;
--line-height-label-large: 20px;
--font-weight-label-large: 600;

--font-size-label-medium: 12px;
--line-height-label-medium: 18px;
--font-weight-label-medium: 600;

--font-size-label-small: 10px;
--line-height-label-small: 16px;
--font-weight-label-small: 600;
```

## 📏 Spacing System

### Base Spacing Unit

```css
--spacing-unit: 4px; /* Base unit for all spacing calculations */
```

### Spacing Scale

```css
/* Spacing Tokens (based on 4px grid) */
--spacing-xs: 4px; /* 1 unit */
--spacing-sm: 8px; /* 2 units */
--spacing-md: 12px; /* 3 units */
--spacing-lg: 16px; /* 4 units - Primary spacing */
--spacing-xl: 20px; /* 5 units */
--spacing-2xl: 24px; /* 6 units */
--spacing-3xl: 32px; /* 8 units */
--spacing-4xl: 40px; /* 10 units */
--spacing-5xl: 48px; /* 12 units */
--spacing-6xl: 64px; /* 16 units */
```

### Component-Specific Spacing

```css
/* Padding Tokens */
--padding-button-horizontal: 24px;
--padding-button-vertical: 12px;
--padding-card: 16px;
--padding-screen-horizontal: 16px;
--padding-screen-vertical: 24px;
--padding-input: 16px;

/* Margin Tokens */
--margin-section: 24px;
--margin-component: 16px;
--margin-element: 8px;

/* Gap Tokens */
--gap-small: 8px;
--gap-medium: 16px;
--gap-large: 24px;
```

## 🔲 Border Radius

### Border Radius Scale

```css
/* Border Radius Tokens */
--border-radius-none: 0px;
--border-radius-xs: 2px;
--border-radius-sm: 4px;
--border-radius-md: 8px; /* Primary border radius */
--border-radius-lg: 12px;
--border-radius-xl: 16px;
--border-radius-2xl: 20px;
--border-radius-full: 9999px; /* Fully rounded */
```

### Component-Specific Radius

```css
/* Component Border Radius */
--border-radius-button: 8px;
--border-radius-card: 8px;
--border-radius-input: 8px;
--border-radius-chip: 20px;
--border-radius-fab: 16px;
--border-radius-icon-container: 8px;
--border-radius-icon-container-large: 12px;
```

## 🌊 Elevation & Shadows

### Elevation Levels

```css
/* Material Design 3 Elevation */
--elevation-0: none;
--elevation-1: 0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.24);
--elevation-2: 0px 3px 6px rgba(0, 0, 0, 0.16), 0px 3px 6px rgba(0, 0, 0, 0.23);
--elevation-3: 0px 10px 20px rgba(0, 0, 0, 0.19), 0px 6px 6px rgba(0, 0, 0, 0.23);
--elevation-4: 0px 14px 28px rgba(0, 0, 0, 0.25), 0px 10px 10px rgba(0, 0, 0, 0.22);
--elevation-5: 0px 19px 38px rgba(0, 0, 0, 0.3), 0px 15px 12px rgba(0, 0, 0, 0.22);
```

### Component Shadows

```css
/* Component-Specific Shadows */
--shadow-card: var(--elevation-1);
--shadow-button: var(--elevation-2);
--shadow-fab: var(--elevation-3);
--shadow-modal: var(--elevation-4);
--shadow-drawer: var(--elevation-5);
```

## 📐 Layout Tokens

### Container Sizes

```css
/* Container Widths */
--container-xs: 320px;
--container-sm: 480px;
--container-md: 768px;
--container-lg: 1024px;
--container-xl: 1280px;
--container-2xl: 1536px;
```

### Component Sizes

```css
/* Icon Sizes */
--icon-size-xs: 12px;
--icon-size-sm: 16px;
--icon-size-md: 20px;
--icon-size-lg: 24px;
--icon-size-xl: 32px;
--icon-size-2xl: 48px;

/* Avatar Sizes */
--avatar-size-xs: 24px;
--avatar-size-sm: 32px;
--avatar-size-md: 40px;
--avatar-size-lg: 48px;
--avatar-size-xl: 64px;

/* Button Heights */
--button-height-sm: 32px;
--button-height-md: 40px;
--button-height-lg: 48px;

/* Input Heights */
--input-height: 48px;
--input-height-sm: 40px;
--input-height-lg: 56px;
```

## ⏱️ Animation Tokens

### Duration

```css
/* Animation Durations */
--duration-instant: 0ms;
--duration-fast: 150ms;
--duration-normal: 300ms;
--duration-slow: 500ms;
--duration-slower: 750ms;
```

### Easing Functions

```css
/* Easing Curves */
--easing-linear: linear;
--easing-ease: ease;
--easing-ease-in: ease-in;
--easing-ease-out: ease-out;
--easing-ease-in-out: ease-in-out;
--easing-material: cubic-bezier(0.4, 0, 0.2, 1);
--easing-material-decelerate: cubic-bezier(0, 0, 0.2, 1);
--easing-material-accelerate: cubic-bezier(0.4, 0, 1, 1);
```

This comprehensive design token system ensures consistency across all UI components and provides a
solid foundation for the React Native implementation.
