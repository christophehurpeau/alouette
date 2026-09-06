import type { ReactNode } from "react";
import type { FieldValues } from "react-hook-form";
import { type EditableSurfaceProps } from "../containers/EditableSurface";
import { type FormEditorProps } from "./useFormEditorModal";
export interface FormEditableSurfaceProps<TFieldValues extends FieldValues> extends Pick<EditableSurfaceProps, "accent" | "children" | "className" | "details" | "disabled" | "editAriaLabel" | "editIcon" | "editIconVariant" | "shadow" | "title" | "titleBadge" | "variant">, Omit<FormEditorProps<TFieldValues>, "size" | "title"> {
    /** Size of the editor modal — `size` belongs to the Surface. */
    modalSize?: FormEditorProps<TFieldValues>["size"];
    /** Heading of the editor modal. Defaults to `title`. */
    modalTitle?: string;
    size?: EditableSurfaceProps["size"];
}
/**
 * An EditableSurface whose editor is a modal owning its own Form — see
 * useFormEditorModal for how the edit is kept out of the screen's state. The
 * body stays `children`, so the read-only content is written as plain JSX.
 */
export declare function FormEditableSurface<TFieldValues extends FieldValues>({ title, titleBadge, details, editAriaLabel, editIcon, editIconVariant, accent, className, shadow, size, variant, disabled, modalSize, modalTitle, children, ...editorProps }: FormEditableSurfaceProps<TFieldValues>): ReactNode;
//# sourceMappingURL=FormEditableSurface.d.ts.map