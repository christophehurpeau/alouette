import { createTokens } from "@tamagui/core";
import type { IntRange } from "type-fest";
import type {
  AlouetteColorScaleNumber,
  AlouetteColorScales,
} from "./colorScales";

type AlouetteSize = IntRange<0, 64>;
type NegativeAlouetteSize = `-${AlouetteSize}`;
type AlouetteSizeRecord = Record<AlouetteSize, number>;
type NegativeAlouetteSizeRecord = Record<NegativeAlouetteSize, number>;

const createAlouetteSizes = <const N extends boolean>(
  spacing: number,
  negative: N,
): N extends true ? NegativeAlouetteSizeRecord : AlouetteSizeRecord => {
  const MAX_SIZE = 64;
  const sizes: Partial<
    N extends true ? NegativeAlouetteSizeRecord : AlouetteSizeRecord
  > = {};
  for (let size = 0; size <= MAX_SIZE; size++) {
    (sizes as any)[negative ? `-${size}` : `${size}`] = size * spacing;
  }
  return sizes as N extends true
    ? NegativeAlouetteSizeRecord
    : AlouetteSizeRecord;
};

type ColorScaleTokens<ColorScales extends AlouetteColorScales> = {
  [K in string &
    keyof ColorScales as `${K}.${AlouetteColorScaleNumber}`]: string; //(typeof colorScales)[K][AlouetteColorScaleNumber];
};

const transformColorScalesToTokens = <ColorScales extends AlouetteColorScales>(
  colorScales: ColorScales,
): ColorScaleTokens<ColorScales> => {
  return Object.fromEntries(
    Object.entries(colorScales).flatMap(([colorName, colorScale]) => {
      return Object.entries(colorScale).map(([scaleNumber, colorValue]) => {
        return [`${colorName}.${scaleNumber}`, colorValue];
      });
    }),
  ) as ColorScaleTokens<ColorScales>;
};

export interface AlouetteTokensOptions {
  spacing?: number;
}

export const createAlouetteTokens = <
  const ColorScales extends AlouetteColorScales,
>(
  colorScales: ColorScales,
  { spacing = 4 }: AlouetteTokensOptions = {},
) => {
  const sizes: AlouetteSizeRecord = createAlouetteSizes(spacing, false);
  const negativeSizes: NegativeAlouetteSizeRecord = createAlouetteSizes(
    -spacing,
    true,
  );

  return createTokens({
    color: {
      black: "#000000",
      white: "#ffffff",
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
