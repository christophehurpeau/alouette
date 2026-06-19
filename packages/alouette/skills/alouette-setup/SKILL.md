---
name: alouette-setup
description: >
  Wire alouette into an Expo / React Native app: withAlouetteConfig metro
  plugin, import alouette/global.css with @source globs, AlouetteProvider,
  SafeAreaProvider, and loading Sora / Chivo Mono font weights. Load when
  bootstrapping a project, when alouette classes render unstyled, or when
  fonts/bold weights look wrong. Covers ios, android and web.
type: lifecycle
library: alouette
library_version: "19.0.0-beta.1"
sources:
  - "christophehurpeau/alouette:packages/storybook-native-app/metro.config.cjs"
  - "christophehurpeau/alouette:packages/storybook-native-app/src/global.css"
  - "christophehurpeau/alouette:packages/storybook-native-app/src/App.tsx"
  - "christophehurpeau/alouette:packages/alouette/src/core/AlouetteProvider.tsx"
  - "christophehurpeau/alouette:packages/alouette/metro.cjs"
---

# alouette — Setup

alouette is styled with NativeWind v5 / Tailwind CSS v4. An app needs four
things wired before any component renders correctly: the metro plugin, the CSS
entry with source globs, the provider, and the fonts. Everything targets
ios/android/web from the same code.

## Setup

`metro.config.cjs`:

```js
const { withAlouetteConfig } = require("alouette/metro");
const { getDefaultConfig } = require("expo/metro-config.js");

const config = getDefaultConfig(__dirname);

module.exports = withAlouetteConfig(config);
```

`src/global.css` (imported once, at the app entry):

```css
@import "alouette/global.css";

@source "../node_modules/alouette/src";
```

App entry — load fonts (native), then wrap the tree in `AlouetteProvider`:

```tsx
import "./global.css";
import {
  Sora_400Regular as SoraRegular,
  Sora_700Bold as SoraBold,
  Sora_800ExtraBold as SoraExtraBold,
  useFonts,
} from "@expo-google-fonts/sora";
import { AlouetteProvider } from "alouette";

export function App() {
  // Native font loading. On web, load the same fonts via a Google Fonts
  // <link> instead (see "Web: load fonts from Google Fonts" below).
  const [fontsLoaded] = useFonts({ SoraRegular, SoraBold, SoraExtraBold });
  if (!fontsLoaded) return null;

  return (
    <AlouetteProvider>
      <Screen />
    </AlouetteProvider>
  );
}
```

`AlouetteProvider` reads the OS color scheme (`useColorScheme`) and applies
`light` or `dark` as the root theme, so base tokens resolve app-wide.

Sora (body + heading) is the only required font. Add Chivo Mono **only if** the
app uses `font-mono` utilities:

```tsx
import {
  ChivoMono_400Regular as ChivoMonoRegular,
  ChivoMono_700Bold as ChivoMonoBold,
  ChivoMono_800ExtraBold as ChivoMonoExtraBold,
} from "@expo-google-fonts/chivo-mono";

useFonts({
  SoraRegular, SoraBold, SoraExtraBold,
  ChivoMonoRegular, ChivoMonoBold, ChivoMonoExtraBold,
});
```

### SafeAreaProvider (only if needed)

Don't add `SafeAreaProvider` preemptively — many setups (e.g. expo-router)
already provide one. Add it only if a component throws a safe-area context error:

```tsx
import { SafeAreaProvider } from "alouette";

<SafeAreaProvider>
  <AlouetteProvider>
    <Screen />
  </AlouetteProvider>
</SafeAreaProvider>;
```

### Web: load fonts from Google Fonts

On web, prefer a Google Fonts stylesheet over `useFonts`. With Expo Router, add
`app/+html.tsx`:

```tsx
import { ScrollViewStyleReset } from "expo-router/html";
import type { PropsWithChildren } from "react";

export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Sora:wght@400;700;800&display=swap"
        />
        <ScrollViewStyleReset />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

Append `&family=Chivo+Mono:wght@400;700;800` to the URL if you use `font-mono`.

## Common Mistakes

### CRITICAL global.css missing @source for alouette source

Wrong:

```css
@import "alouette/global.css";
```

Correct:

```css
@import "alouette/global.css";

@source "../node_modules/alouette/src";
```

Tailwind v4 only emits classes it finds in scanned files. Without an `@source`
covering alouette's source, every alouette utility class is purged and
components render unstyled.

Source: packages/storybook-native-app/src/global.css

### CRITICAL Metro config omits withAlouetteConfig

Wrong:

```js
const { getDefaultConfig } = require("expo/metro-config.js");
module.exports = getDefaultConfig(__dirname);
```

Correct:

```js
const { withAlouetteConfig } = require("alouette/metro");
const { getDefaultConfig } = require("expo/metro-config.js");
module.exports = withAlouetteConfig(getDefaultConfig(__dirname));
```

`withAlouetteConfig` enables the NativeWind / react-native-css transform; without
it, `className` styles never compile on native.

Source: packages/storybook-native-app/metro.config.cjs, packages/alouette/metro.cjs

### CRITICAL App tree not wrapped in AlouetteProvider

Wrong:

```tsx
export function App() {
  return <Screen />;
}
```

Correct:

```tsx
import { AlouetteProvider } from "alouette";
export function App() {
  return (
    <AlouetteProvider>
      <Screen />
    </AlouetteProvider>
  );
}
```

`AlouetteProvider` applies the OS light/dark scheme as the root `ScopedTheme`.
Without it, base tokens (`bg-surface`, `text-sharp`, `text-accent`) have no
resolved values and components render with missing colors.

Source: packages/alouette/src/core/AlouetteProvider.tsx

### HIGH Bold / extrabold fonts not loaded

Wrong:

```tsx
useFonts({ SoraRegular: Sora_400Regular });
```

Correct:

```tsx
useFonts({
  SoraRegular: Sora_400Regular,
  SoraBold: Sora_700Bold,
  SoraExtraBold: Sora_800ExtraBold,
});
```

On native, bold and extrabold are distinct font files. If only the regular
weight is loaded, `font-body-bold` / `font-heading-extrabold` silently fall back
to regular. (Load the matching Chivo Mono weights too, but only if the app uses
`font-mono`.)

Source: packages/storybook-native-app/src/App.tsx

See also: alouette-theming/SKILL.md — once setup is done, the token/accent model
is what you style with.
