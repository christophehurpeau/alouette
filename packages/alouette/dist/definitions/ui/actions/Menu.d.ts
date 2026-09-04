import { type ReactNode, type Ref } from "react";
import type { View as RNView } from "react-native";
import type { Accent } from "../../core/AlouetteConfig";
export interface MenuTriggerParams {
    ref: Ref<RNView>;
    onPress: () => void;
    "aria-haspopup": "menu";
    "aria-expanded": boolean;
}
export interface MenuProps {
    /** Renders the pressable that opens the menu; spread the params onto it. */
    render: (params: MenuTriggerParams) => ReactNode;
    /** Names the menu for assistive tech. */
    label: string;
    /**
     * Rendered above the items, outside the `menu` element — an identity row, a
     * section title. A menu owns menu items only, so a loose text node inside it
     * is announced as one.
     */
    header?: ReactNode;
    accent?: Accent;
    onOpenChange?: (open: boolean) => void;
    children: ReactNode;
}
/**
 * A pressable that opens a list of actions: anchored under its trigger on web,
 * an overlay on native. Prefer it over a row of buttons for actions that are
 * secondary, rare or destructive.
 */
export declare function Menu({ render, label, header, accent, onOpenChange, children, }: MenuProps): ReactNode;
//# sourceMappingURL=Menu.d.ts.map