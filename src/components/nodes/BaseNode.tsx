import React, { useEffect, useState } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';

interface BaseNodeProps extends NodeProps {
  children: (props: any) => React.ReactNode;
}

const BaseNode: React.FC<BaseNodeProps> = ({ id, data, children }) => {
  const [nodeData, setNodeData] = useState(data);

  useEffect(() => {
    setNodeData(data);
  }, [data]);

  const handleInputChange = (key: string, value: any) => {
    setNodeData({ ...nodeData, [key]: value });
    data[key] = value; // Ensure the main data object is updated as well
  };

  return (
    <div style={{ ...styles.container, ...nodeData.styles }}>
      {children({ nodeData, handleInputChange })}
      <Handle type="source" position={Position.Bottom} id="a" />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        style={{ left: '80%' }}
      />
      <Handle type="target" position={Position.Top} />
    </div>
  );
};

const styles = {
  container: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
  },
};

export default BaseNode;
