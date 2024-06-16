import { createTokens } from "@tamagui/core";
import type { IntRange } from "type-fest";
import type {
  AlouetteColorScaleNames,
  AlouetteColorScaleNumber,
  AlouetteColorScales,
} from "./colorScales";

type AlouetteSize = IntRange<0, 64>;
type NegativeAlouetteSize = `-${AlouetteSize}`;
type AlouetteSizeRecord = Record<AlouetteSize, number>;
type NegativeAlouetteSizeRecord = Record<NegativeAlouetteSize, number>;

const createAlouetteSizes = <N extends boolean>(
  spacing: number,
  negative: N,
): N extends true ? AlouetteSizeRecord : NegativeAlouetteSizeRecord => {
  const MAX_SIZE = 64;
  const sizes = {} as Partial<
    N extends true ? AlouetteSizeRecord : NegativeAlouetteSizeRecord
  >;
  for (let size = 0; size <= MAX_SIZE; size++) {
    (sizes as any)[negative ? `-${size}` : `${size}`] = size * spacing;
  }
  return sizes as N extends true
    ? AlouetteSizeRecord
    : NegativeAlouetteSizeRecord;
};

type ColorScaleTokens = {
  [K in AlouetteColorScaleNames as `${K}.${AlouetteColorScaleNumber}`]: string; //(typeof colorScales)[K][AlouetteColorScaleNumber];
};

const transformColorScalesToTokens = (
  colorScales: AlouetteColorScales,
): ColorScaleTokens => {
  return Object.fromEntries(
    Object.entries(colorScales).flatMap(([colorName, colorScale]) => {
      return Object.entries(colorScale).map(([scaleNumber, colorValue]) => {
        return [`${colorName}.${scaleNumber}`, colorValue];
      });
    }),
  ) as ColorScaleTokens;
};

export interface AlouetteTokensOptions {
  spacing?: number;
}

export const createAlouetteTokens = (
  colorScales: AlouetteColorScales,
  { spacing = 4 }: AlouetteTokensOptions = {},
) => {
  const sizes = createAlouetteSizes(spacing, false);
  const negativeSizes = createAlouetteSizes(-spacing, true);

  return createTokens({
    color: {
      black: "#000000",
      white: "#ffffff",
      disabled: colorScales.grayscale[3],
      contrastDisabled: colorScales.grayscale[7],
      ...transformColorScalesToTokens(colorScales),
    },
    radius: {
      ...sizes,
      xs: spacing * 2,
      sm: spacing * 4,
      md: spacing * 8,
    },
    space: {
      ...sizes,
      ...negativeSizes,
      xs: spacing * 2,
      sm: spacing * 4,
      md: spacing * 8,
    },
    size: { ...sizes },
    zIndex: {},
  } as const);
};
