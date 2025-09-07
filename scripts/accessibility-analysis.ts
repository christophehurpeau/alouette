import convert from "color-convert";
import { defaultColorScales } from "../packages/alouette/src/config/defaultColorScales";

// WCAG contrast ratio requirements
const WCAG_AA_NORMAL = 4.5; // Normal text
const WCAG_AA_LARGE = 3.0; // Large text (18pt+ or 14pt+ bold)
const WCAG_AAA_NORMAL = 7.0; // Enhanced contrast
const WCAG_AAA_LARGE = 4.5; // Enhanced contrast large text

type ColorScale = Record<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10, string>;

// Dark mode scale inversion mapping
const darkModeScaleNumbers: Record<number, number> = {
  1: 10,
  2: 9,
  3: 8,
  4: 7,
  5: 6,
  6: 5,
  7: 4,
  8: 3,
  9: 2,
  10: 1,
};
const hexToRgb = (hex: string) => {
  const [r, g, b] = convert.hex.rgb(hex);
  return [r / 255, g / 255, b / 255];
};

const getLuminance = (hex: string) => {
  const [r, g, b] = hexToRgb(hex);
  const [rs, gs, bs] = [r, g, b].map((c) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4),
  );
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
};

const getContrastRatio = (color1: string, color2: string) => {
  const lum1 = getLuminance(color1);
  const lum2 = getLuminance(color2);

  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);

  return (brightest + 0.05) / (darkest + 0.05);
};

const getContrastGrade = (ratio: number) => {
  if (ratio >= WCAG_AAA_NORMAL) return "AAA";
  if (ratio >= WCAG_AA_NORMAL) return "AA";
  if (ratio >= WCAG_AA_LARGE) return "AA Large";
  return "FAIL";
};

const analyzeColorScale = (name: string, scale: ColorScale) => {
  console.log(`\n🔍 ${name.toUpperCase()} ACCESSIBILITY ANALYSIS`);
  console.log("=".repeat(50));

  // Light Mode Analysis
  console.log(`\n📋 LIGHT MODE:`);
  console.log("Step | Color     | Test Combination | Ratio | Grade | Usage");
  console.log(
    "-----|-----------|------------------|-------|-------|------------------",
  );

  Object.entries(scale).forEach(([step, color]) => {
    const stepNum = parseInt(step);
    const usage = getUsageDescription(stepNum);

    let testDesc = "";
    let ratio = 0;

    if (stepNum <= 3) {
      // Steps 1-3: Light backgrounds - test with black text
      testDesc = `Black text on ${color}`;
      ratio = getContrastRatio("#000000", color);
    } else if (stepNum >= 4 && stepNum <= 6) {
      // Steps 4-6: Medium backgrounds - test with white text
      testDesc = `White text on ${color}`;
      ratio = getContrastRatio("#FFFFFF", color);
    } else {
      // Steps 7-10: Text colors - test with white background
      testDesc = `${color} text on white background`;
      ratio = getContrastRatio(color, "#FFFFFF");
    }

    const grade = getContrastGrade(ratio);
    const status = grade === "FAIL" ? "❌" : grade === "AA Large" ? "⚠️" : "✅";

    console.log(
      `${step.padStart(4)} | ${color} | ${testDesc.padStart(16)} | ${ratio.toFixed(2).padStart(5)} | ${grade.padStart(5)} | ${status} ${usage}`,
    );
  });

  // Dark Mode Analysis (with scale inversion)
  console.log(`\n🌙 DARK MODE (Scale Inverted):`);
  console.log("Step | Color     | Test Combination | Ratio | Grade | Usage");
  console.log(
    "-----|-----------|------------------|-------|-------|------------------",
  );

  Object.entries(scale).forEach(([step, color]) => {
    const stepNum = parseInt(step);
    const darkStep = darkModeScaleNumbers[stepNum];
    const darkUsage = getUsageDescription(darkStep);

    let testDesc = "";
    let ratio = 0;

    if (darkStep <= 3) {
      // In dark mode, steps 1-3 become background colors - test with white text
      testDesc = `White text on ${color}`;
      ratio = getContrastRatio("#FFFFFF", color);
    } else if (darkStep >= 4 && darkStep <= 6) {
      // In dark mode, steps 4-6 become background colors - test with black text
      testDesc = `Black text on ${color}`;
      ratio = getContrastRatio("#000000", color);
    } else {
      // Steps 7-10: Text colors in dark mode - test with black background
      testDesc = `${color} text on black background`;
      ratio = getContrastRatio(color, "#000000");
    }

    const grade = getContrastGrade(ratio);
    const status = grade === "FAIL" ? "❌" : grade === "AA Large" ? "⚠️" : "✅";

    console.log(
      `${step.padStart(4)} | ${color} | ${testDesc.padStart(16)} | ${ratio.toFixed(2).padStart(5)} | ${grade.padStart(5)} | ${status} ${darkUsage}`,
    );
  });
};

const getUsageDescription = (step: number) => {
  const descriptions = {
    1: "Interactive outlined hover/focus",
    2: "Interactive contained press",
    3: "Interactive outlined press",
    4: "Interactive contained hover/focus",
    5: "Interactive contained background",
    6: "Main color",
    7: "Border hover/focus",
    8: "Border color",
    9: "Text/shadow color",
    10: "Bold text color",
  };
  return descriptions[step as keyof typeof descriptions] || "Unknown";
};

const analyzeBackgroundTextCombinations = (name: string, scale: ColorScale) => {
  console.log(`\n🎨 ${name.toUpperCase()} REALISTIC COMBINATIONS`);
  console.log("=".repeat(60));

  console.log("Testing realistic background-text combinations:");
  console.log("Background | Text Color | Ratio | Grade | Status | Description");
  console.log("-----------|------------|-------|-------|--------|------------");

  // Test realistic combinations based on new sequential usage patterns
  const combinations = [
    // Light mode combinations - sequential usage patterns
    {
      bg: 1,
      text: "#000000",
      desc: "Step 1 (lightest) background with black text",
    },
    {
      bg: 2,
      text: "#000000",
      desc: "Step 2 (very light) background with black text",
    },
    {
      bg: 3,
      text: "#000000",
      desc: "Step 3 (light) background with black text",
    },
    {
      bg: 4,
      text: "#FFFFFF",
      desc: "Step 4 (light-medium) background with white text",
    },
    {
      bg: 5,
      text: "#FFFFFF",
      desc: "Step 5 (medium-light) background with white text",
    },
    {
      bg: 6,
      text: "#FFFFFF",
      desc: "Step 6 (medium) background with white text",
    },
    {
      bg: 7,
      text: "#FFFFFF",
      desc: "Step 7 (medium-dark) text on white background",
    },
    { bg: 8, text: "#FFFFFF", desc: "Step 8 (dark) text on white background" },
    {
      bg: 9,
      text: "#FFFFFF",
      desc: "Step 9 (very dark) text on white background",
    },
    {
      bg: 10,
      text: "#FFFFFF",
      desc: "Step 10 (darkest) text on white background",
    },
  ];

  combinations.forEach(({ bg, text, desc }) => {
    const bgColor = scale[bg as keyof ColorScale];
    const textColor =
      typeof text === "string" ? text : scale[text as keyof ColorScale];
    const ratio = getContrastRatio(textColor, bgColor);
    const grade = getContrastGrade(ratio);
    const status = grade === "FAIL" ? "❌" : grade === "AA Large" ? "⚠️" : "✅";

    const bgDisplay =
      typeof text === "string"
        ? `Step ${bg} (${bgColor})`
        : `Step ${bg} (${bgColor})`;
    const textDisplay =
      typeof text === "string" ? text : `Step ${text} (${textColor})`;

    console.log(
      `${bgDisplay.padStart(20)} | ${textDisplay.padStart(11)} | ${ratio.toFixed(2).padStart(5)} | ${grade.padStart(5)} | ${status} | ${desc}`,
    );
  });
};
// Run analysis
console.log("🎨 ALOUETTE COLOR ACCESSIBILITY ANALYSIS");
console.log("=".repeat(60));

const palettes = defaultColorScales;
Object.entries(palettes).forEach(([name, scale]) => {
  analyzeColorScale(name, scale);
  analyzeBackgroundTextCombinations(name, scale);
});

console.log("\n" + "=".repeat(60));
console.log("📊 SUMMARY:");
console.log("✅ = WCAG AA compliant");
console.log("⚠️ = WCAG AA Large text compliant only");
console.log("❌ = Fails WCAG AA");
console.log("\n💡 Key Points:");
