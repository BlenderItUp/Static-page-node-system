// DivNode.tsx
import React from "react";
import BaseNode from "../BaseNode";
import { NodeProps } from "reactflow";

const DivNode: React.FC<NodeProps> = (props) => {
  return (
    <BaseNode {...props}>
      {({ nodeData, handleInputChange }) => (
        <div style={nodeData.styles}>
          <input
            type="text"
            value={nodeData.label || "Div Content"}
            onChange={(e) => handleInputChange("label", e.target.value)}
            style={styles.input}
          />
        </div>
      )}
    </BaseNode>
  );
};

export const renderDiv = (
  data: any,
  childContent: React.ReactNode,
  innerChildContent: React.ReactNode,
  id: any,
) => (
  <>
    <div className={`node-${id}`} style={{ ...data.styles }}>
      {innerChildContent}
    </div>
    {childContent}
  </>
);

const styles = {
  input: {
    width: "100%",
    padding: "5px",
  },
};

export default DivNode;
