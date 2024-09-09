<h3 align="center">
  alouette
</h3>

<p align="center">
  tamagui-based design system with configurable defaults
</p>

<p align="center">
  <a href="https://npmjs.org/package/alouette"><img src="https://img.shields.io/npm/v/alouette.svg?style=flat-square"></a>
  <a href="https://npmjs.org/package/alouette"><img src="https://img.shields.io/npm/dw/alouette.svg?style=flat-square"></a>
  <a href="https://npmjs.org/package/alouette"><img src="https://img.shields.io/node/v/alouette.svg?style=flat-square"></a>
  <a href="https://npmjs.org/package/alouette"><img src="https://img.shields.io/npm/types/alouette.svg?style=flat-square"></a>
</p>

## Install

```bash
npm install --save alouette
```

## Usage

> tamagui.config.ts

```ts
import {
  createAlouetteTamagui,
  defaultColorScales,
} from "alouette/createAlouetteTamagui";

const tokens = createAlouetteTokens(defaultColorScales);
const config = createAlouetteTamagui(tokens, createAlouetteThemes(tokens));
export default config;
```
