// ULNode.tsx
import React from "react";
import BaseNode from "../BaseNode";
import { NodeProps } from "reactflow";

const ULNode: React.FC<NodeProps> = (props) => {
  return (
    <BaseNode {...props}>
      {({ nodeData, handleInputChange }) => (
        <div style={nodeData.styles}>
          <ul style={styles.ul}>
            {(nodeData.items || []).map((item: string, index: number) => (
              <li key={index} style={styles.li}>
                <input
                  type="text"
                  value={item}
                  onChange={(e) => {
                    const updatedItems = [...nodeData.items];
                    updatedItems[index] = e.target.value;
                    handleInputChange("items", updatedItems);
                  }}
                  style={styles.input}
                />
              </li>
            ))}
          </ul>
          <button
            onClick={() =>
              handleInputChange("items", [
                ...(nodeData.items || []),
                "New Item",
              ])
            }
            style={styles.button}
          >
            Add Item
          </button>
        </div>
      )}
    </BaseNode>
  );
};

export const renderUL = (
  data: any,
  childContent: React.ReactNode,
  innerChildContent: React.ReactNode,
  id: any,
) => (
  <>
    <ul className={`node-${id}`} style={{ ...data.styles }}>
      {data.items.map((item: string, index: number) => (
        <li key={index}>{item}</li>
      ))}
      {innerChildContent}
    </ul>
    {childContent}
  </>
);

const styles = {
  ul: {
    listStyleType: "disc",
    paddingLeft: "20px",
  },
  li: {
    marginBottom: "5px",
  },
  input: {
    width: "100%",
    padding: "5px",
  },
  button: {
    marginTop: "10px",
    padding: "5px 10px",
    cursor: "pointer",
  },
};

export default ULNode;
