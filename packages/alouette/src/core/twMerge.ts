import {
  type ConfigExtension,
  type DefaultClassGroupIds,
  type DefaultThemeGroupIds,
  extendTailwindMerge,
} from "tailwind-merge";

type AlouetteClassGroupIds =
  | DefaultClassGroupIds
  | "lowered"
  | "surface-popover"
  | "surface-size"
  | "surface";

const paddingAndRadiusGroups = [
  "p",
  "px",
  "py",
  "ps",
  "pe",
  "pbs",
  "pbe",
  "pt",
  "pr",
  "pb",
  "pl",
  "rounded",
  "rounded-s",
  "rounded-e",
  "rounded-t",
  "rounded-r",
  "rounded-b",
  "rounded-l",
  "rounded-ss",
  "rounded-se",
  "rounded-ee",
  "rounded-es",
  "rounded-tl",
  "rounded-tr",
  "rounded-br",
  "rounded-bl",
] as const satisfies readonly DefaultClassGroupIds[];

/**
 * tailwind-merge only knows Tailwind's default scale, so alouette's named
 * spacing (`p-m` / `p-xl`) and custom utilities would otherwise survive side by
 * side and resolve by stylesheet order instead of by the caller's `className`.
 */
export const twMergeConfig: ConfigExtension<
  AlouetteClassGroupIds,
  DefaultThemeGroupIds
> = {
  extend: {
    theme: {
      spacing: [
        "xxs",
        "xs",
        "sm",
        "m", // legacy
        "md",
        "l", // legacy
        "lg",
        "xl",
        "xxl",
        "3xl",
        "4xl",
      ],
      shadow: ["s", "m", "l", "lowered", "bar"],
    },
    classGroups: {
      "font-family": [
        "font-body",
        "font-body-bold",
        "font-body-extrabold",
        "font-heading",
        "font-heading-bold",
        "font-heading-extrabold",
        "font-mono",
        "font-mono-bold",
        "font-mono-extrabold",
      ],
      lowered: ["lowered"],
      surface: ["surface"],
      "surface-size": [{ surface: ["xxs", "xs", "sm", "md", "lg"] }],
      "surface-popover": ["surface-popover"],
    },
    // A group lists what it replaces when written after it. A single class
    // written after one of these utilities never lists them back: it only
    // overrides its own property (the utilities sort ahead of it), so
    // `surface bg-highlight` keeps the padding and `surface-popover surface-lg`
    // keeps the ground.
    conflictingClassGroups: {
      lowered: ["bg-color", "shadow"],
      surface: [
        ...paddingAndRadiusGroups,
        "bg-color",
        "shadow",
        "surface-size",
        "surface-popover",
      ],
      "surface-size": [...paddingAndRadiusGroups],
      "surface-popover": [
        ...paddingAndRadiusGroups,
        "bg-color",
        "shadow",
        "surface",
        "surface-size",
      ],
    },
  },
};

export const twMerge =
  extendTailwindMerge<AlouetteClassGroupIds>(twMergeConfig);
