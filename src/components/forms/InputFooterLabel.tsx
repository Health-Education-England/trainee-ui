import React from "react";

interface InputFooterLabelProps {
  label: string;
}

const InputFooterLabel: React.FC<InputFooterLabelProps> = ({ label }) => (
  <>
    {label ? (
      <div style={{ color: "#900", fontSize: "9pt", paddingTop: "10px" }}>
        {label}
      </div>
    ) : null}
  </>
);

export default InputFooterLabel;
