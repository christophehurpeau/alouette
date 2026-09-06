import type { StoryObj } from "@storybook/react-vite";
import { type ReactNode } from "react";
import type { EditableSurfaceProps } from "../containers/EditableSurface";
import { type FormEditableSurfaceProps } from "./FormEditableSurface";
interface EventFormValues {
    date: string;
    notes: string;
}
interface EventSectionProps extends Partial<Pick<FormEditableSurfaceProps<EventFormValues>, "accent" | "details" | "disabled" | "editIconVariant" | "modalSize" | "modalTitle" | "size" | "title" | "variant">> {
    editAriaLabel?: string;
    editIcon?: EditableSurfaceProps["editIcon"];
    initialDate?: string;
    initialNotes?: string;
    /** Makes onSubmit reject, so the modal stays open on the error. */
    failing?: boolean;
}
/**
 * Stateful demo: the saved values drive the body, so the play function can tell
 * a discarded edit from a saved one by reading the section.
 */
declare function EventSection({ title, editAriaLabel, initialDate, initialNotes, failing, ...surfaceProps }: EventSectionProps): ReactNode;
type ThisStory = StoryObj<typeof EventSection>;
declare const _default: {
    title: string;
    component: typeof EventSection;
    parameters: {
        componentSubtitle: string;
    };
    argTypes: {
        title: {
            control: "text";
        };
        modalTitle: {
            control: "text";
        };
        details: {
            control: "text";
        };
        size: {
            control: "select";
            options: string[];
        };
        modalSize: {
            control: "select";
            options: string[];
        };
        accent: {
            control: "select";
            options: import("../..").Accent[];
        };
        editIconVariant: {
            control: "select";
            options: string[];
        };
        disabled: {
            control: "boolean";
        };
    };
};
export default _default;
export declare const FormEditableSurfacePreviewStory: ThisStory;
export declare const FormEditableSurfaceVariantsStory: ThisStory;
export declare const FormEditableSurfaceTestsStory: ThisStory;
//# sourceMappingURL=FormEditableSurface.stories.d.ts.map