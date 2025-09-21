declare const defaultHeadingFontSizes: {
    xxl: number;
    xl: number;
    lg: number;
    md: number;
    sm: number;
    xs: number;
};
declare const defaultBodyFontSizes: {
    xxl: number;
    xl: number;
    lg: number;
    md: number;
    sm: number;
    xs: number;
};
export interface AlouetteFontsOptions {
    headingFontFamily?: string;
    headingFontSizes?: typeof defaultHeadingFontSizes;
    bodyFontFamily?: string;
    bodyFontSizes?: typeof defaultBodyFontSizes;
    monospaceFontFamily?: string;
    monospaceFontSizes?: typeof defaultBodyFontSizes;
}
export declare const createAlouetteFonts: ({ headingFontFamily, headingFontSizes, bodyFontFamily, bodyFontSizes, monospaceFontFamily, monospaceFontSizes, }?: AlouetteFontsOptions) => {
    monospace?: {
        family: string;
        weight: {
            regular: string;
            bold: string;
            extraBold: string;
        };
        face: {
            400: {
                normal: string;
            };
            700: {
                normal: string;
            };
            800: {
                normal: string;
            };
        };
        size: {
            xxl: number;
            xl: number;
            lg: number;
            md: number;
            sm: number;
            xs: number;
        };
        lineHeight: {
            xxl: number;
            xl: number;
            lg: number;
            md: number;
            sm: number;
            xs: number;
        };
    } | undefined;
    heading: {
        family: string;
        weight: {
            regular: string;
            bold: string;
            extraBold: string;
        };
        face: {
            400: {
                normal: string;
            };
            700: {
                normal: string;
            };
            800: {
                normal: string;
            };
        };
        size: {
            xxl: number;
            xl: number;
            lg: number;
            md: number;
            sm: number;
            xs: number;
        };
        lineHeight: {
            xxl: number;
            xl: number;
            lg: number;
            md: number;
            sm: number;
            xs: number;
        };
    };
    body: {
        family: string;
        weight: {
            regular: string;
            bold: string;
            extraBold: string;
        };
        face: {
            400: {
                normal: string;
            };
            700: {
                normal: string;
            };
            800: {
                normal: string;
            };
        };
        size: {
            xxl: number;
            xl: number;
            lg: number;
            md: number;
            sm: number;
            xs: number;
        };
        lineHeight: {
            xxl: number;
            xl: number;
            lg: number;
            md: number;
            sm: number;
            xs: number;
        };
    };
};
export {};
//# sourceMappingURL=createAlouetteFonts.d.ts.map