export type FontWeight = 400 | 600;

export interface TextStyleSpec {
  fontFamily: string;
  fontWeight: FontWeight;
  fontSize: number;
  lineHeight: 'auto' | number;
}

export interface TypographyTokens {
  heading: {
    xxlarge: TextStyleSpec;
    xlarge: TextStyleSpec;
    large: TextStyleSpec;
    medium: TextStyleSpec;
    small: TextStyleSpec;
    xsmall: TextStyleSpec;
    label: TextStyleSpec; // label for button
  };
  body: {
    large: TextStyleSpec;
    medium: TextStyleSpec;
    small: TextStyleSpec;
    xsmall: TextStyleSpec;
  };
}

const baseFontFamily = '"IBM Plex Sans", system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif';

export const typography: TypographyTokens = {
  heading: {
    // Semibold 600
    xxlarge: { fontFamily: baseFontFamily, fontWeight: 600, fontSize: 28, lineHeight: 'auto' },
    xlarge:  { fontFamily: baseFontFamily, fontWeight: 600, fontSize: 24, lineHeight: 'auto' },
    large:   { fontFamily: baseFontFamily, fontWeight: 600, fontSize: 20, lineHeight: 'auto' },
    medium:  { fontFamily: baseFontFamily, fontWeight: 600, fontSize: 16, lineHeight: 'auto' },
    small:   { fontFamily: baseFontFamily, fontWeight: 600, fontSize: 14, lineHeight: 'auto' },
    xsmall:  { fontFamily: baseFontFamily, fontWeight: 600, fontSize: 12, lineHeight: 'auto' },
    label:   { fontFamily: baseFontFamily, fontWeight: 600, fontSize: 14, lineHeight: 16 },
  },
  body: {
    // Regular 400
    large:  { fontFamily: baseFontFamily, fontWeight: 400, fontSize: 16, lineHeight: 'auto' },
    medium: { fontFamily: baseFontFamily, fontWeight: 400, fontSize: 14, lineHeight: 20 },
    small:  { fontFamily: baseFontFamily, fontWeight: 400, fontSize: 12, lineHeight: 'auto' },
    xsmall: { fontFamily: baseFontFamily, fontWeight: 400, fontSize: 10, lineHeight: 14 },
  },
};

export default typography;

