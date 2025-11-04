<h1 align="center">
  alouette
</h1>

<p align="center">
  A modern, customizable design system built on top of Tamagui with configurable defaults
</p>

<p align="center">
  <a href="https://npmjs.org/package/alouette"><img src="https://img.shields.io/npm/v/alouette.svg?style=flat-square" alt="npm version"></a>
  <a href="https://npmjs.org/package/alouette"><img src="https://img.shields.io/npm/dw/alouette.svg?style=flat-square" alt="npm downloads"></a>
  <a href="https://npmjs.org/package/alouette"><img src="https://img.shields.io/node/v/alouette.svg?style=flat-square" alt="node version"></a>
  <a href="https://npmjs.org/package/alouette"><img src="https://img.shields.io/npm/types/alouette.svg?style=flat-square" alt="types"></a>
</p>

## 🚀 Getting Started

### Prerequisites

- Node.js >= 20.9.0 (includes Corepack for package management)

### Installation

1. Enable Corepack (if not already enabled):

```bash
corepack enable
```

2. Install the package:

```bash
npm install alouette
# or with yarn
yarn add alouette
```

Note: `alouette-icons` is automatically included as a dependency.

### Configuration

Create or update your `tamagui.config.ts`:

```ts
import {
  createAlouetteTamagui,
  defaultColorScales,
  createAlouetteTokens,
  createAlouetteThemes,
} from "alouette/createAlouetteTamagui";

const tokens = createAlouetteTokens(defaultColorScales);
const config = createAlouetteTamagui(tokens, createAlouetteThemes(tokens));

export default config;
```

## 🎨 Core Features

### Components

Alouette provides a comprehensive set of components following the atomic design pattern:

#### Actions

- `Button`: Primary interaction component with multiple variants
- `IconButton`: Circular button optimized for icon display

#### Containers

- `Box`: Basic layout container with theme support
- `PressableBox`: Interactive container with press states

#### Forms

- `InputText`: Text input with theming and state management

#### Layout

- `Separator`: Visual divider with customizable orientation
- `List`: Structured data display components

#### Typography

- `Typography`: Text component with semantic variants

For detailed examples and API documentation, visit our [Storybook](https://www.chromatic.com/library?appId=679f9e8df3edc5f07975b64a).

### Icons

Icons are provided through the integrated `alouette-icons` package:

```tsx
import { ArrowLeftRegularIcon } from "alouette-icons/phosphor-icons/ArrowLeftRegularIcon";

function MyComponent() {
  return <ArrowLeftRegularIcon />;
}
```

## 🏗️ Architecture

### Core Principles

1. **Universal Design**: Components work seamlessly across web and native platforms
2. **Performance First**: Optimized bundle size and runtime performance through Tamagui
3. **Accessibility**: WCAG 2.1 compliant components with proper ARIA attributes
4. **Customization**: Flexible theming system with sensible defaults
5. **Type Safety**: Built with TypeScript for enhanced developer experience

### Technical Architecture

- **Component Structure**: Atomic design pattern with atoms, molecules, and organisms
- **Styling System**: Tamagui's compile-time styling with runtime fallbacks
- **Theme System**: Token-based design system with support for light/dark modes
- **Responsive Design**: Mobile-first approach with flexible breakpoint system
- **Icon System**: Based on Phosphor Icons with optimized bundle size

## 🎯 Examples

### Basic Button

```tsx
import { Button } from "alouette";

function MyComponent() {
  return (
    <Button
      theme="primary"
      text="Click me"
      onPress={() => console.log("Clicked!")}
    />
  );
}
```

### Button with Icon

```tsx
import { Button } from "alouette";
import { ArrowLeftRegularIcon } from "alouette-icons/phosphor-icons/ArrowLeftRegularIcon";

function MyComponent() {
  return (
    <Button theme="primary" icon={<ArrowLeftRegularIcon />} text="Go Back" />
  );
}
```

### Typography

```tsx
import { Typography } from "alouette";

function MyComponent() {
  return (
    <>
      <Typography variant="h1">Heading 1</Typography>
      <Typography variant="body">Regular text content</Typography>
    </>
  );
}
```

## 📚 Documentation

For more examples and detailed documentation:

- [Component Documentation](https://www.chromatic.com/library?appId=679f9e8df3edc5f07975b64a)
- [GitHub Repository](https://github.com/christophehurpeau/alouette)

## 📄 License

ISC © [Christophe Hurpeau](https://christophe.hurpeau.com)
