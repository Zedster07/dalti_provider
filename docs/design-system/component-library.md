# Component Library Specifications

## 🧩 Core Components

### 1. Button Components

#### Primary Button
```typescript
interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  icon?: IconName;
  iconPosition?: 'left' | 'right';
}
```

**Design Specifications**:
- Background: `--color-primary` (#15424E)
- Text Color: `--color-text-on-primary` (#FFFFFF)
- Border Radius: `--border-radius-button` (8px)
- Padding: `--padding-button-horizontal` (24px) x `--padding-button-vertical` (12px)
- Font: Changa, 16px, weight 600
- Shadow: `--shadow-button`
- Min Height: 48px

#### Secondary Button (Outlined)
```typescript
interface SecondaryButtonProps extends PrimaryButtonProps {
  variant: 'outlined';
}
```

**Design Specifications**:
- Background: Transparent
- Border: 1.5px solid `--color-primary`
- Text Color: `--color-primary`
- Same dimensions as primary button

#### Text Button
```typescript
interface TextButtonProps extends Omit<PrimaryButtonProps, 'fullWidth'> {
  variant: 'text';
}
```

**Design Specifications**:
- Background: Transparent
- Text Color: `--color-primary`
- Padding: 16px horizontal, 8px vertical
- No border or shadow

### 2. Input Components

#### Text Input
```typescript
interface TextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  multiline?: boolean;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  leftIcon?: IconName;
  rightIcon?: IconName;
  onRightIconPress?: () => void;
}
```

**Design Specifications**:
- Background: `--color-surface` (#FAFAFA)
- Border: 1px solid `--color-text-secondary` with 30% opacity
- Border Radius: `--border-radius-input` (8px)
- Padding: `--padding-input` (16px)
- Height: `--input-height` (48px)
- Font: Changa, 14px, weight 400
- Label: Changa, 12px, weight 600, `--color-text-secondary`
- Error Text: Changa, 12px, weight 400, `--color-error`

#### Dropdown/Select
```typescript
interface DropdownProps<T> {
  label: string;
  value: T | null;
  onSelect: (value: T) => void;
  options: DropdownOption<T>[];
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  searchable?: boolean;
  multiSelect?: boolean;
}

interface DropdownOption<T> {
  label: string;
  value: T;
  disabled?: boolean;
}
```

### 3. Card Components

#### Basic Card
```typescript
interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  padding?: number;
  margin?: number;
}
```

**Design Specifications**:
- Background: `--color-background` (#FFFFFF)
- Border Radius: `--border-radius-card` (8px)
- Shadow: `--shadow-card`
- Padding: `--padding-card` (16px)
- Margin: 4px horizontal, 4px vertical

#### Stats Card
```typescript
interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: IconName;
  trend?: {
    value: number;
    direction: 'up' | 'down' | 'neutral';
  };
  color?: string;
}
```

### 4. Navigation Components

#### Icon Container
```typescript
interface IconContainerProps {
  icon: IconName;
  onPress?: () => void;
  size?: 'header' | 'settings' | 'large';
  badge?: {
    count: number;
    color?: string;
  };
  disabled?: boolean;
}
```

**Size Specifications**:
- Header: 36x36px container, 18px icon, 8px border radius
- Settings: 40x40px container, 20px icon, 8px border radius
- Large: 48x48px container, 24px icon, 12px border radius

#### Bottom Tab Bar
```typescript
interface TabBarProps {
  routes: TabRoute[];
  activeIndex: number;
  onTabPress: (index: number) => void;
}

interface TabRoute {
  name: string;
  icon: IconName;
  label: string;
  badge?: number;
}
```

### 5. List Components

#### List Item
```typescript
interface ListItemProps {
  title: string;
  subtitle?: string;
  leftIcon?: IconName;
  rightIcon?: IconName;
  onPress?: () => void;
  disabled?: boolean;
  selected?: boolean;
  avatar?: {
    source: ImageSourcePropType;
    fallback?: string;
  };
}
```

**Design Specifications**:
- Min Height: 56px
- Padding: 16px horizontal, 12px vertical
- Background: Transparent (selected: primary with 10% opacity)
- Border Radius: 8px
- Title: Changa, 16px, weight 600
- Subtitle: Changa, 14px, weight 400, `--color-text-secondary`

### 6. Modal Components

#### Bottom Sheet
```typescript
interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  height?: number | string;
  title?: string;
  showHandle?: boolean;
}
```

#### Dialog
```typescript
interface DialogProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  message?: string;
  actions: DialogAction[];
  type?: 'info' | 'warning' | 'error' | 'success';
}

interface DialogAction {
  label: string;
  onPress: () => void;
  style?: 'default' | 'destructive' | 'cancel';
}
```

### 7. Form Components

#### Form Field Wrapper
```typescript
interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
  helpText?: string;
}
```

#### Checkbox
```typescript
interface CheckboxProps {
  checked: boolean;
  onToggle: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}
```

#### Radio Button
```typescript
interface RadioButtonProps {
  selected: boolean;
  onSelect: () => void;
  label?: string;
  disabled?: boolean;
}
```

### 8. Feedback Components

#### Loading Spinner
```typescript
interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  overlay?: boolean;
}
```

#### Toast/Snackbar
```typescript
interface ToastProps {
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  duration?: number;
  action?: {
    label: string;
    onPress: () => void;
  };
}
```

#### Progress Bar
```typescript
interface ProgressBarProps {
  progress: number; // 0-1
  color?: string;
  backgroundColor?: string;
  height?: number;
  animated?: boolean;
}
```

### 9. Avatar Components

#### User Avatar
```typescript
interface AvatarProps {
  source?: ImageSourcePropType;
  fallback?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  onPress?: () => void;
  badge?: {
    color: string;
    position: 'top-right' | 'bottom-right';
  };
}
```

### 10. Calendar Components

#### Calendar Widget
```typescript
interface CalendarProps {
  selectedDate?: Date;
  onDateSelect: (date: Date) => void;
  events?: CalendarEvent[];
  viewType?: 'month' | 'week' | 'day';
  minDate?: Date;
  maxDate?: Date;
}

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  color?: string;
  duration?: number;
}
```

## 🎨 Component Styling Guidelines

### Consistent Patterns
1. **Spacing**: Use design tokens for all spacing
2. **Colors**: Reference color tokens, never hardcode colors
3. **Typography**: Use typography tokens for consistency
4. **Shadows**: Apply elevation tokens appropriately
5. **Border Radius**: Use border radius tokens

### Accessibility Requirements
1. **Touch Targets**: Minimum 44x44px for interactive elements
2. **Color Contrast**: WCAG 2.1 AA compliance
3. **Screen Reader**: Proper accessibility labels
4. **Focus Indicators**: Clear focus states for keyboard navigation

### Animation Guidelines
1. **Duration**: Use animation duration tokens
2. **Easing**: Apply material design easing curves
3. **Performance**: Optimize for 60 FPS
4. **Reduced Motion**: Respect user preferences

### RTL Support
1. **Layout**: Automatic layout mirroring
2. **Icons**: Directional icon variants
3. **Text Alignment**: Proper text direction
4. **Margins/Padding**: Logical properties usage

This component library provides a comprehensive foundation for building consistent, accessible, and maintainable UI components in the React Native application.
