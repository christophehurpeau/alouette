import type { ReactNode } from "react";
import type { SVGIconElement } from "../primitives/Icon";
import { type SegmentedItemProps } from "../selection/SegmentedItem";
export interface RadioButtonProps {
    value: string;
    label: string;
    /** Leading icon, and the only visible content in an icon group. */
    icon?: SVGIconElement;
    /**
     * Replaces `icon` while the button is hovered, focused or pressed, and for as
     * long as it is checked.
     */
    activeIcon?: SVGIconElement;
    /** Accent tinting `activeIcon`, so the glyph changes color as well as weight. */
    activeAccent?: SegmentedItemProps["activeAccent"];
    /**
     * Badge glyph over the chip's top-right, for a secondary state the `label`
     * spells out. Adds to `icon`, and renders in an icon group only.
     */
    indicator?: SVGIconElement;
    disabled?: boolean;
    /**
     * Runs instead of the group's `onValueChange`. A group whose buttons carry
     * `onPress` must be controlled: the internal value never updates.
     */
    onPress?: SegmentedItemProps["onPress"];
}
export declare function RadioButton({ value, label, icon, activeIcon, activeAccent, indicator, disabled, onPress, }: RadioButtonProps): ReactNode;
//# sourceMappingURL=RadioButton.d.ts.map