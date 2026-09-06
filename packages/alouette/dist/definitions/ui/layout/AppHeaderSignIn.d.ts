import type { ReactNode } from "react";
import { type ButtonProps } from "../actions/Button";
export interface AppHeaderSignInProps extends Omit<ButtonProps, "text"> {
    /** The app's own wording — "Log in", "Sign up", … */
    label: string;
}
/**
 * End slot of an `AppHeader`, signed out: the sign-in call to action, in the
 * bar itself. The counterpart of `AppHeaderAccount` — a session the user does
 * not have yet has exactly one action, so it must stay one press away, never
 * folded into a "Guest" avatar menu that hides it behind a second one.
 *
 * Pass it straight as the header's `actions`, or beside a second one (a
 * `variant="outlined"` "Sign up") inside an `AppHeaderActions`. `href` links it
 * in-app; a destination outside the app on native takes an `ExternalLinkButton`
 * in the slot instead.
 */
export declare function AppHeaderSignIn({ label, size, ...buttonProps }: AppHeaderSignInProps): ReactNode;
//# sourceMappingURL=AppHeaderSignIn.d.ts.map