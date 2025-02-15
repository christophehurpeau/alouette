/**
 * Calculates contrast ratio between two colors
 * Returns ratio between 1 and 21
 */
export declare const getContrastRatio: (color1: string, color2: string) => number;
/**
 * Checks if contrast ratio meets WCAG requirements
 */
export declare const checkContrast: (foreground: string, background: string, level?: "AA" | "AAA") => {
    ratio: number;
    passes: boolean;
    minimumRatio: number;
};
/**
 * Development warning for contrast issues
 */
export declare const warnOnContrastIssues: (themeName: string, textColor: string, backgroundColor: string) => void;
//# sourceMappingURL=colorContrast.d.ts.map