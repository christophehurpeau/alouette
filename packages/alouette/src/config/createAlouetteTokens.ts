import { createTokens } from "@tamagui/core";
// import type { IntRange } from "type-fest";
import type {
  AlouetteColorScaleNumber,
  AlouetteColorScales,
} from "./colorScales";

// type AlouetteSize = IntRange<0, 64>;
// type NegativeAlouetteSize = `-${AlouetteSize}`;
// type AlouetteSizeRecord = Record<AlouetteSize, number>;
// type NegativeAlouetteSizeRecord = Record<NegativeAlouetteSize, number>;

// const createAlouetteSizes = <const N extends boolean>(
//   spacing: number,
//   negative: N,
// ): N extends true ? NegativeAlouetteSizeRecord : AlouetteSizeRecord => {
//   const MAX_SIZE = 64;
//   const sizes: Partial<
//     N extends true ? NegativeAlouetteSizeRecord : AlouetteSizeRecord
//   > = {};
//   for (let size = 0; size <= MAX_SIZE; size++) {
//     (sizes as any)[negative ? `-${size}` : `${size}`] = size * spacing;
//   }
//   return sizes as N extends true
//     ? NegativeAlouetteSizeRecord
//     : AlouetteSizeRecord;
// };

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
  { spacing = 16 }: AlouetteTokensOptions = {},
) => {
  // const sizes: AlouetteSizeRecord = createAlouetteSizes(spacing, false);
  // const negativeSizes: NegativeAlouetteSizeRecord = createAlouetteSizes(
  //   -spacing,
  //   true,
  // );

  return createTokens({
    color: {
      blackBackground: "#1f1e1e",
      whiteBackground: "#ffffff",
      // https://github.com/tamagui/tamagui/issues/3601 does not work at the moment
      blackBackgroundTranslucent: "#1f1e1e77",
      whiteBackgroundTranslucent: "#ffffff99",
      blackText: "#000000",
      whiteText: "#fdfdfd",
      transparent: "transparent",
      ...transformColorScalesToTokens(colorScales),
    },
    radius: {
      xs: spacing / 2,
      sm: spacing,
      md: spacing * 2,
      lg: spacing * 3,
    },
    space: {
      "-1.0": -spacing,
      "0.25": spacing / 4,
      "0.5": spacing / 2, // previous $sm or $2
      "0.75": spacing * 0.75, // previous $3
      "1.0": spacing, // previous $md or $4
      "1.25": spacing * 1.25, // previous $5
      "1.5": spacing * 1.5, // previous $6
      "2.0": spacing * 2, // previous $8 or $md
      "3.0": spacing * 3, // previous $12
    },
    // size: { ...sizes },
    size: {},
    zIndex: {},
    opacity: {
      disabled: 0.7,
    },
  } as const);
};
