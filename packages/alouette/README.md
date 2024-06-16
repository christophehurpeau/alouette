<h3 align="center">
  alouette
</h3>

<p align="center">
  tamagui-based design system with configurable defaults
</p>

<p align="center">
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

export default createAlouetteTamagui({ colorScales: defaultColorScales });
```
