// Native only, through useTransition: web animates with Tailwind's transition
// utilities instead.
export const TRANSITION_DURATION = {
  fast: 150,
  formElement: 200,
  medium: 300,
  slow: 450,
} as const;

export type TransitionName = keyof typeof TRANSITION_DURATION;
