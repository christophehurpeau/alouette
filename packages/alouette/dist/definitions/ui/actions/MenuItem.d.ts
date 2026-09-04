import type { ReactNode } from "react";
import type { GestureResponderEvent } from "react-native";
import type { Accent } from "../../core/AlouetteConfig";
import { type SVGIconElement } from "../primitives/Icon";
export interface MenuItemProps {
    label: string;
    icon?: SVGIconElement;
    /** Colours the row's label and icon — `danger` for a destructive action. */
    accent?: Accent;
    /**
     * Destination. Renders a real `<a href>` on web (native ignores it); expo
     * Router's `<Link asChild>` injects it together with `onPress`.
     */
    href?: string;
    disabled?: boolean;
    onPress?: (event: GestureResponderEvent) => void;
}
/** One action of a {@link Menu}. Pressing it runs `onPress` and closes the menu. */
export declare function MenuItem({ label, icon, accent, href, disabled, onPress, }: MenuItemProps): ReactNode;
//# sourceMappingURL=MenuItem.d.ts.map