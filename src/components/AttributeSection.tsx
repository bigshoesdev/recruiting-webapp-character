import React from "react";
import { calculateModifier } from "../utils/utils";

type AttributeSectionProps = {
  attributes: Record<string, number>;
  handleIncrement: (attribute: string) => void;
  handleDecrement: (attribute: string) => void;
  maxReached: boolean;
};

const AttributeSection: React.FC<AttributeSectionProps> = ({
  attributes,
  handleIncrement,
  handleDecrement,
  maxReached,
}) => {
  return (
    <div>
      <h2>Attributes</h2>
      {Object.keys(attributes).map((attribute) => (
        <div key={attribute} style={{ marginBottom: "10px" }}>
          <label>{attribute}: </label>
          <button
            onClick={() => handleIncrement(attribute)}
            disabled={attributes[attribute] >= 70 || maxReached}
          >
            +
          </button>
          <span>{attributes[attribute]}</span>
          <button
            onClick={() => handleDecrement(attribute)}
            disabled={attributes[attribute] <= 0}
          >
            -
          </button>
          <span> (Modifier: {calculateModifier(attributes[attribute])})</span>
        </div>
      ))}
    </div>
  );
};

export default AttributeSection;
