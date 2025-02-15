import React from "react";
import {
  Title,
  Subtitle,
  Description,
  Primary,
  Controls,
  Stories,
} from "@storybook/blocks";

const primaryColor = "#1c7193";

const sectionStyle = {
  marginBottom: "24px",
};

const primarySectionStyle = {
  border: `4px solid ${primaryColor}`,
  borderRadius: "8px",
  padding: "16px",
};

export const DocTemplate = () => {
  return (
    <>
      <div style={sectionStyle}>
        <Title />
        <Subtitle />
      </div>

      <div style={primarySectionStyle}>
        <Description />
      </div>

      <div style={sectionStyle}>
        <Primary />
      </div>

      <div style={sectionStyle}>
        <h3>Properties</h3>
        <Controls />
      </div>

      <div style={sectionStyle}>
        <Stories includePrimary={false} />
      </div>
    </>
  );
};
