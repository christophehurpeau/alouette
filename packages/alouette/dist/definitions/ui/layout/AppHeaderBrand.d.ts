import type { ReactNode } from "react";
import type { GestureResponderEvent } from "react-native";
export interface AppHeaderBrandProps {
    title: ReactNode;
    subtitle?: ReactNode;
    /** Rendered before the title — typically a `BrandLogo`. */
    brandLogo?: ReactNode;
    /**
     * Home destination. Renders a real `<a href>` on web (native ignores it);
     * expo Router's `<Link asChild>` injects it together with `onPress`.
     *
     * react-native's types have no `href`, but react-native-web forwards it.
     */
    href?: string;
    onPress?: (event: GestureResponderEvent) => void;
    "aria-label"?: string;
}
/**
 * Product identity in the start slot of an `AppHeader`. Given `href` or
 * `onPress` it becomes a pressable with the full interactive state set, instead
 * of a display-only row wrapped in a link.
 */
export declare function AppHeaderBrand({ title, subtitle, brandLogo, href, onPress, ...props }: AppHeaderBrandProps): ReactNode;
//# sourceMappingURL=AppHeaderBrand.d.ts.map