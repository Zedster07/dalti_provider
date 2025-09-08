# RTL (Right-to-Left) Support Guidelines

## 🌍 Overview

The Dalti Provider application supports Arabic language with full RTL (Right-to-Left) layout support. This document outlines the implementation guidelines for maintaining proper RTL functionality in the React Native version.

## 📱 Current RTL Implementation

### Supported Languages
- **Arabic (ar)** - Primary RTL language
- **English (en)** - LTR reference language
- **French (fr)** - LTR secondary language

### RTL Features in Current App
1. **Automatic Layout Mirroring** - UI elements flip horizontally
2. **Text Direction** - Proper text alignment and reading direction
3. **Icon Orientation** - Directional icons flip appropriately
4. **Navigation Flow** - Back/forward navigation respects RTL flow
5. **Form Layouts** - Input fields and labels align correctly

## 🔧 React Native RTL Implementation

### 1. RTL Configuration

#### Enable RTL Support
```typescript
// App.tsx
import { I18nManager } from 'react-native';

// Enable RTL support globally
I18nManager.allowRTL(true);

// Force RTL for Arabic locale
const isRTL = I18nManager.isRTL;
```

#### Platform-Specific Setup

**Android Configuration** (`android/app/src/main/AndroidManifest.xml`):
```xml
<application
  android:supportsRtl="true"
  android:name=".MainApplication">
  <!-- Other configuration -->
</application>
```

**iOS Configuration** (`ios/YourApp/Info.plist`):
```xml
<key>CFBundleDevelopmentRegion</key>
<string>en</string>
<key>CFBundleLocalizations</key>
<array>
  <string>en</string>
  <string>ar</string>
  <string>fr</string>
</array>
```

### 2. Layout Implementation

#### Logical Properties
Use logical properties instead of physical directions:

```typescript
// ❌ Avoid physical properties
const styles = StyleSheet.create({
  container: {
    marginLeft: 16,
    paddingRight: 20,
    borderLeftWidth: 1,
  },
});

// ✅ Use logical properties
const styles = StyleSheet.create({
  container: {
    marginStart: 16,      // Left in LTR, Right in RTL
    paddingEnd: 20,       // Right in LTR, Left in RTL
    borderStartWidth: 1,  // Left border in LTR, Right in RTL
  },
});
```

#### Flexbox RTL Handling
```typescript
// Flexbox automatically handles RTL
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row', // Automatically reverses in RTL
    justifyContent: 'flex-start', // Aligns to start (left in LTR, right in RTL)
  },
});
```

### 3. Text Direction

#### Text Alignment
```typescript
import { I18nManager } from 'react-native';

const styles = StyleSheet.create({
  text: {
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr',
  },
});
```

#### Input Fields
```typescript
const TextInput = ({ value, onChangeText, ...props }) => {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      textAlign={I18nManager.isRTL ? 'right' : 'left'}
      {...props}
    />
  );
};
```

### 4. Icon Handling

#### Directional Icons
```typescript
interface IconProps {
  name: string;
  size?: number;
  color?: string;
  flipRTL?: boolean; // Whether to flip in RTL
}

const Icon = ({ name, flipRTL = false, ...props }: IconProps) => {
  const iconName = flipRTL && I18nManager.isRTL 
    ? getFlippedIconName(name) 
    : name;
    
  return <IconComponent name={iconName} {...props} />;
};

// Icon mapping for RTL
const getFlippedIconName = (iconName: string): string => {
  const iconMap: Record<string, string> = {
    'arrow-left': 'arrow-right',
    'arrow-right': 'arrow-left',
    'chevron-left': 'chevron-right',
    'chevron-right': 'chevron-left',
    // Add more directional icons as needed
  };
  
  return iconMap[iconName] || iconName;
};
```

### 5. Navigation RTL Support

#### React Navigation RTL
```typescript
import { NavigationContainer } from '@react-navigation/native';
import { I18nManager } from 'react-native';

const App = () => {
  return (
    <NavigationContainer>
      {/* Navigation automatically handles RTL */}
    </NavigationContainer>
  );
};
```

#### Custom Navigation Components
```typescript
const BackButton = ({ onPress }) => {
  const iconName = I18nManager.isRTL ? 'arrow-right' : 'arrow-left';
  
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon name={iconName} size={24} />
    </TouchableOpacity>
  );
};
```

### 6. Component RTL Guidelines

#### Card Components
```typescript
const Card = ({ children, ...props }) => {
  return (
    <View style={[styles.card, I18nManager.isRTL && styles.cardRTL]} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingStart: 16,
    paddingEnd: 16,
    borderStartWidth: 4,
    borderStartColor: '#15424E',
  },
  cardRTL: {
    // Additional RTL-specific styles if needed
  },
});
```

#### List Items
```typescript
const ListItem = ({ title, subtitle, leftIcon, rightIcon, onPress }) => {
  return (
    <TouchableOpacity style={styles.listItem} onPress={onPress}>
      {leftIcon && (
        <View style={styles.leftIcon}>
          <Icon name={leftIcon} />
        </View>
      )}
      
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
      
      {rightIcon && (
        <View style={styles.rightIcon}>
          <Icon name={rightIcon} flipRTL />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  leftIcon: {
    marginEnd: 12,
  },
  content: {
    flex: 1,
  },
  rightIcon: {
    marginStart: 12,
  },
  title: {
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
  subtitle: {
    textAlign: I18nManager.isRTL ? 'right' : 'left',
  },
});
```

## 🎨 Design Considerations

### 1. Layout Mirroring
- **Automatic**: Most layouts mirror automatically with flexbox
- **Manual**: Some components may need explicit RTL handling
- **Testing**: Test all screens in both LTR and RTL modes

### 2. Typography
- **Font Support**: Ensure Changa font supports Arabic characters
- **Line Height**: Adjust line height for Arabic text if needed
- **Text Alignment**: Always use logical alignment

### 3. Images and Media
- **UI Images**: Mirror interface elements (arrows, etc.)
- **Content Images**: Don't mirror photos or content images
- **Icons**: Mirror directional icons, keep symbolic icons unchanged

## 🧪 Testing RTL Implementation

### 1. Development Testing
```typescript
// Force RTL for testing
import { I18nManager } from 'react-native';

// In development, toggle RTL
const toggleRTL = () => {
  I18nManager.forceRTL(!I18nManager.isRTL);
  // Restart app to apply changes
};
```

### 2. Testing Checklist
- [ ] All text aligns correctly (right-aligned in RTL)
- [ ] Navigation flows work properly (back button behavior)
- [ ] Icons flip appropriately (directional icons only)
- [ ] Forms and inputs align correctly
- [ ] Lists and cards display properly
- [ ] Animations and transitions work in both directions
- [ ] Touch targets remain accessible

### 3. Common RTL Issues
1. **Hardcoded Margins**: Using `marginLeft` instead of `marginStart`
2. **Text Alignment**: Not setting proper text alignment
3. **Icon Direction**: Not flipping directional icons
4. **Animation Direction**: Animations not respecting RTL flow
5. **Absolute Positioning**: Using `left` instead of `start`

## 📋 RTL Implementation Checklist

### Core Components
- [ ] Button components support RTL
- [ ] Input fields align correctly
- [ ] Cards and containers mirror properly
- [ ] Navigation components work in RTL
- [ ] List items display correctly

### Screens
- [ ] Authentication screens
- [ ] Dashboard layout
- [ ] Forms and settings
- [ ] Calendar and appointments
- [ ] Profile and business management

### Features
- [ ] Text input and editing
- [ ] Navigation and routing
- [ ] Animations and transitions
- [ ] Touch gestures and interactions
- [ ] Accessibility features

## 🔄 Language Switching

### Dynamic Language Change
```typescript
import { I18nManager } from 'react-native';
import RNRestart from 'react-native-restart';

const changeLanguage = async (languageCode: string) => {
  // Update language in storage
  await AsyncStorage.setItem('language', languageCode);
  
  // Update RTL setting
  const isRTL = languageCode === 'ar';
  I18nManager.forceRTL(isRTL);
  
  // Restart app to apply RTL changes
  RNRestart.Restart();
};
```

This comprehensive RTL support ensures that Arabic-speaking users have a native, properly-oriented experience that feels natural and intuitive.
