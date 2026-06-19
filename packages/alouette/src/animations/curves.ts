// Replaces the Tamagui named-animation registry. Four named curves used by
// alouette's interactive primitives. Web reads these via Tailwind's duration-*
// utilities; native reads them via useTransition.
export const TRANSITION_DURATION = {
  fast: 150,
  formElement: 200,
  medium: 300,
  slow: 450,
} as const;

export type TransitionName = keyof typeof TRANSITION_DURATION;
