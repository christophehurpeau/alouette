import { type ReactNode } from "react";
import type { PressableBoxProps } from "../actions/PressableBox";
import type { SVGIconElement } from "../primitives/Icon";
import { type SurfaceProps } from "./Surface";
export interface EditableSurfaceProps extends Pick<SurfaceProps, "accent" | "className" | "shadow" | "size" | "variant"> {
    /** Heading of the section, and the label of the region for assistive tech. */
    title: string;
    /**
     * Rendered beside the title — a Badge, or anything short. It stays out of
     * the region's accessible name, which is the title alone.
     */
    titleBadge?: ReactNode;
    /** Muted helper text under the title. */
    details?: ReactNode;
    /** Names the edit button for assistive tech — it has no visible text. */
    editAriaLabel: string;
    editIcon?: SVGIconElement;
    /** Variant of the edit IconButton — `variant` belongs to the Surface. */
    editIconVariant?: PressableBoxProps["variant"];
    disabled?: boolean;
    onEdit: () => void;
    /** The read-only body: as many blocks as the section needs. */
    children: ReactNode;
}
/**
 * A Surface holding a block of read-only content behind a single edit
 * affordance. Where EditableItem is one label with a summary that fits beside
 * it, this is a titled section whose value spans several lines. Owns no
 * editor: pair it with FormEditableSurface for a react-hook-form modal, or
 * compose your own Modal from `onEdit`.
 */
export declare function EditableSurface({ title, titleBadge, details, editAriaLabel, editIcon, editIconVariant, accent, className, shadow, size, variant, disabled, onEdit, children, }: EditableSurfaceProps): ReactNode;
//# sourceMappingURL=EditableSurface.d.ts.map